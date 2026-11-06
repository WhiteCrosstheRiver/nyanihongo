import { useEffect, useMemo, useState } from 'react';
import { SLOW, speak } from '../lib/audio';
import { useT } from '../lib/i18n';
import { makeListenItem, type ListenItem } from '../lib/listening';
import { toHiragana } from '../lib/romaji';
import { useStore } from '../lib/store';
import { Choices, Feedback, Header, KanaInput, Mascot, Quiz, Ruby, plainWritten, useVoice, type QuizApi } from '../ui/parts';
import type { Nav } from '../App';

const TOTAL = 10;

export function ListenScreen({ go }: { go: Nav }) {
  const { t } = useT();
  const { p } = useStore();
  const voice = useVoice();
  const [seed, setSeed] = useState(0);
  const items = useMemo(
    () => (voice === null ? [] : Array.from({ length: TOTAL }, () => makeListenItem(p.cards, voice))),
    [seed, voice],
  );
  return (
    <div>
      <Header title={t('listen')} onBack={() => go('home')} />
      {voice === null && <div className="card result"><Mascot mood="think" size={96} /></div>}
      {voice === false && <p className="note card" role="status">{t('noVoiceListen')}</p>}
      {voice !== null && (
        <Quiz total={TOTAL} onExit={() => go('home')} onReset={() => setSeed((s) => s + 1)}
          render={(i, api) => <ListenQ key={`${seed}-${i}`} item={items[i]} voice={voice} api={api} />} />
      )}
    </div>
  );
}

const spoken = (item: ListenItem) =>
  item.kind === 'sentence' ? plainWritten(item.line.ja) : item.kind === 'pair' ? item.target : item.word.kana;

export function ListenQ({ item, voice, api }: { item: ListenItem; voice: boolean; api: QuizApi }) {
  const { t, lang } = useT();
  const { score, track } = useStore();
  const text = spoken(item);
  useEffect(() => { if (voice) speak(text); }, []);
  const done = (ok: boolean) => { score('listen', ok); track(`listen:${item.kind}`, ok); };

  const prompt = item.kind === 'dictation' ? t('qDictation')
    : item.kind === 'pair' ? t('qPair')
    : item.kind === 'sentence' ? t('qListenSentence') : t('qListenMeaning');

  return (
    <div className="card q">
      <p className="q-hint">{prompt}</p>
      {voice
        ? <div className="listen-buttons">
            <button className="btn listen-play" aria-label={t('play')} onClick={() => speak(text)}>🔊</button>
            <button className="btn ghost" onClick={() => speak(text, SLOW)}>🐢 {t('slowly')}</button>
          </div>
        : <div className="sentence">{item.kind === 'sentence' ? <Ruby text={item.line.ja} /> : <span lang="ja">{text}</span>}</div>}
      {item.kind === 'meaning' && (
        <Choices options={item.options.map((w) => ({ key: w.id, label: w.meaning[lang] }))} answer={item.word.id} api={api} onPick={done} />
      )}
      {item.kind === 'sentence' && (
        <Choices options={item.options.map((l) => ({ key: l.ja, label: l.tr[lang] }))} answer={item.line.ja} api={api} onPick={done} />
      )}
      {item.kind === 'pair' && (
        <Choices big options={item.pair.map((k) => ({ key: k, label: <span lang="ja">{k}</span> }))} answer={item.target} api={api} onPick={done} />
      )}
      {item.kind === 'dictation' && (
        <KanaInput disabled={api.answered} placeholder={t('romajiHint')} onSubmit={(v) => {
          const ok = toHiragana(v) === toHiragana(item.word.kana) || v === item.word.written;
          api.answer(ok);
          done(ok);
        }} />
      )}
      <Feedback api={api} answer={
        item.kind === 'sentence' ? <Ruby text={item.line.ja} />
        : item.kind === 'pair' ? <span lang="ja">{item.target}</span>
        : <span lang="ja">{item.word.written} ({item.word.kana}) · {item.word.meaning[lang]}</span>
      } />
    </div>
  );
}
