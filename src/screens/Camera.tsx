import { useEffect, useRef, useState } from 'react';
import { labelText, labelToWord } from '../data/recognition';
import type { Word } from '../data/vocab';
import { useT } from '../lib/i18n';
import { useStore } from '../lib/store';
import { Header, Mascot, SpeakButton } from '../ui/parts';

type Tf = typeof import('@tensorflow/tfjs');
type Model = import('@tensorflow/tfjs').GraphModel;
interface Guess { label: string; score: number; word?: Word }

let loading: Promise<{ tf: Tf; model: Model }> | null = null;
function loadModel() {
  loading ??= (async () => {
    const tf = await import('@tensorflow/tfjs');
    await tf.ready();
    const url = new URL('models/mobilenet/model.json', document.baseURI).href;
    return { tf, model: await tf.loadGraphModel(url) };
  })().catch((e) => { loading = null; throw e; });
  return loading;
}

async function classify(source: HTMLCanvasElement): Promise<Guess[]> {
  const { tf, model } = await loadModel();
  const probs = tf.tidy(() => {
    const img = tf.browser.fromPixels(source).toFloat().div(255).expandDims(0);
    let logits = model.predict(img) as import('@tensorflow/tfjs').Tensor;
    if (logits.shape[1] === 1001) logits = logits.slice([0, 1], [-1, 1000]); // drop background class
    return tf.softmax(logits).squeeze();
  });
  const values = await probs.data();
  probs.dispose();
  return [...values].map((score, i) => ({ score, i })).sort((a, b) => b.score - a.score).slice(0, 8)
    .map(({ score, i }) => ({ score, label: labelText(i), word: labelToWord(i) }));
}

/** Centre-crops any image source to the 224×224 square the model expects. */
function toCanvas(src: CanvasImageSource, w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = c.height = 224;
  const side = Math.min(w, h);
  c.getContext('2d')!.drawImage(src, (w - side) / 2, (h - side) / 2, side, side, 0, 0, 224, 224);
  return c;
}

export function CameraScreen() {
  const { t, lang } = useT();
  const { score, addCard, p } = useStore();
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const [live, setLive] = useState(false);
  const [status, setStatus] = useState<'' | 'model' | 'think'>('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const [guesses, setGuesses] = useState<Guess[]>([]);

  const stop = () => {
    stream.current?.getTracks().forEach((tr) => tr.stop());
    stream.current = null;
    setLive(false);
  };
  useEffect(() => stop, []);

  const run = async (canvas: HTMLCanvasElement) => {
    setError('');
    setPreview(canvas.toDataURL('image/jpeg', 0.8));
    setGuesses([]);
    try {
      setStatus('model');
      await loadModel();
      setStatus('think');
      const res = await classify(canvas);
      setGuesses(res);
      if (res.some((g) => g.word)) score('camera', true);
    } catch (e) {
      console.error(e);
      setError(t('modelError'));
    } finally {
      setStatus('');
    }
  };

  const open = async () => {
    setError('');
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      stream.current = s;
      setLive(true);
      requestAnimationFrame(() => { if (video.current) { video.current.srcObject = s; video.current.play().catch(() => {}); } });
    } catch {
      setError(t('cameraError'));
    }
  };

  const capture = () => {
    const v = video.current;
    if (v?.videoWidth) run(toCanvas(v, v.videoWidth, v.videoHeight));
  };

  const onFile = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { run(toCanvas(img, img.naturalWidth, img.naturalHeight)); URL.revokeObjectURL(url); };
    img.onerror = () => { setError(t('modelError')); URL.revokeObjectURL(url); };
    img.src = url;
  };

  // Several model classes can map to one word (tabby + Persian → 猫), so add their scores.
  const totals = new Map<string, Guess>();
  for (const g of guesses) {
    if (!g.word) continue;
    const seen = totals.get(g.word.id);
    totals.set(g.word.id, seen ? { ...seen, score: seen.score + g.score } : g);
  }
  const ranked = [...totals.values()].sort((a, b) => b.score - a.score);
  const unique = ranked.filter((g, i) => i === 0 || g.score >= 0.05).slice(0, 3); // hide noise
  const unsure = guesses.length > 0 && guesses[0].score < 0.12;

  return (
    <div>
      <Header title={t('cameraTitle')} />
      <div className="camera-layout">
        <div className="card cam">
          <p className="q-hint">{t('cameraHint')}</p>
          <div className="viewport">
            {live && <video ref={video} playsInline muted />}
            {!live && preview && <img src={preview} alt="" />}
            {!live && !preview && <Mascot mood="sleep" size={120} />}
          </div>
          <div className="row center">
            {live
              ? <><button className="btn" onClick={capture}>✨ {t('capture')}</button><button className="btn ghost" onClick={stop}>{t('stopCamera')}</button></>
              : <button className="btn" onClick={open}>📷 {t('startCamera')}</button>}
            <label className="btn ghost">
              🖼️ {t('upload')}
              <input data-testid="photo" type="file" accept="image/*" hidden onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = ''; }} />
            </label>
          </div>
          {status && <p className="note" role="status">{status === 'model' ? t('loadingModel') : t('thinking')}</p>}
          {error && <p className="note err" role="alert">{error}</p>}
        </div>
        <div className="cam-results">
          {guesses.length > 0 && <h3>{t('topGuesses')}</h3>}
          {unsure && <p className="note">{t('noMatch')}</p>}
          {unique.map((g) => {
            const w = g.word!;
            const added = !!p.cards[w.id];
            return (
              <div className="card guess pop" key={w.id}>
                <div className="emoji-mid">{w.emoji}</div>
                <div className="guess-text">
                  <div className="guess-word" lang="ja">{w.written}</div>
                  <div lang="ja">{w.kana}</div>
                  <div>{w.meaning[lang]} · {Math.round(g.score * 100)}%</div>
                </div>
                <SpeakButton text={w.kana} />
                <button className="btn small" disabled={added} onClick={() => addCard(w.id)}>{added ? t('added') : t('addReview')}</button>
              </div>
            );
          })}
          {guesses.length > 0 && unique.length === 0 && (
            <div className="card">
              <p>{t('notInList')}</p>
              <ul>{guesses.slice(0, 3).map((g) => <li key={g.label}>{g.label} · {Math.round(g.score * 100)}%</li>)}</ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
