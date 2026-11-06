import { useMemo, useState } from 'react';
import { ADJ_FORM_NAMES, PARTICLES, PARTICLE_ITEMS, PARTICLE_RULES, type ParticleItem } from '../data/grammar';
import { ADJ_FORMS, conjugateAdj, isNa, makeAdjItem, type AdjItem } from '../lib/adjectives';
import { speak } from '../lib/audio';
import { useT } from '../lib/i18n';
import { toHiragana } from '../lib/romaji';
import { useStore } from '../lib/store';
import { Choices, Feedback, Header, KanaInput, Quiz, Ruby, plainWritten, shuffle, type QuizApi } from '../ui/parts';
import type { Nav } from '../App';

const TOTAL = 10;
type Mode = 'menu' | 'particles' | 'adjectives' | 'guide';

export function GrammarScreen({ go }: { go: Nav }) {
  const { t, lang } = useT();
  const [mode, setMode] = useState<Mode>('menu');
  const [seed, setSeed] = useState(0);
  const particles = useMemo(() => shuffle(PARTICLE_ITEMS).slice(0, TOTAL), [seed]);
  const adjectives = useMemo(() => Array.from({ length: TOTAL }, () => makeAdjItem()), [seed]);
  const menu = () => setMode('menu');

  if (mode === 'particles') {
    return (
      <div>
        <Header title={t('particles')} onBack={menu} />
        <Quiz total={TOTAL} onExit={menu} onReset={() => setSeed((s) => s + 1)}
          render={(i, api) => <ParticleQ key={`${seed}-${i}`} item={particles[i]} api={api} />} />
      </div>
    );
  }
  if (mode === 'adjectives') {
    return (
      <div>
        <Header title={t('adjForms')} onBack={menu} />
        <Quiz total={TOTAL} onExit={menu} onReset={() => setSeed((s) => s + 1)}
          render={(i, api) => <AdjQ key={`${seed}-${i}`} item={adjectives[i]} api={api} />} />
      </div>
    );
  }
  if (mode === 'guide') {
    return (
      <div>
        <Header title={t('particleGuide')} onBack={menu} />
        <div className="card table">
          {PARTICLES.map((k) => (
            <div className="table-row" key={k}>
              <b className="particle" lang="ja">{k}</b>
              <span>{PARTICLE_RULES[k][lang]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header title={t('grammar')} onBack={() => go('home')} />
      <button className="lesson-row card" onClick={() => setMode('particles')}>
        <span className="emoji-mid" lang="ja">🧩</span>
        <span><b>{t('particles')}</b><small>{t('particlesDesc')}</small></span>
      </button>
      <button className="lesson-row card" onClick={() => setMode('adjectives')}>
        <span className="emoji-mid">✨</span>
        <span><b>{t('adjForms')}</b><small>{t('adjDesc')}</small></span>
      </button>
      <button className="lesson-row card" onClick={() => setMode('guide')}>
        <span className="emoji-mid">📒</span>
        <span><b>{t('particleGuide')}</b><small>{t('guideDesc')}</small></span>
      </button>
    </div>
  );
}

export function ParticleQ({ item, api }: { item: ParticleItem; api: QuizApi }) {
  const { t, lang } = useT();
  const { score, track } = useStore();
  const options = useMemo(() => shuffle([item.answer, ...item.wrong]).map((k) => ({ key: k, label: <span lang="ja">{k}</span> })), [item]);
  const filled = item.ja.replace('___', item.answer);
  return (
    <div className="card q">
      <p className="q-hint">{t('qParticle')}</p>
      <div className="sentence"><Ruby text={api.answered ? filled : item.ja.replace('___', ' ＿＿ ')} /></div>
      <p className="q-sub">{item.tr[lang]}</p>
      <Choices big options={options} answer={item.answer} api={api} onPick={(ok) => {
        score('grammar', ok);
        track(`particle:${item.answer}`, ok);
        speak(plainWritten(filled));
      }} />
      <Feedback api={api} answer={<span>{PARTICLE_RULES[item.answer][lang]}</span>} />
    </div>
  );
}

export function AdjQ({ item, api }: { item: AdjItem; api: QuizApi }) {
  const { t, lang } = useT();
  const { score, track } = useStore();
  const { word, form, ex } = item;
  const c = conjugateAdj(word, form)!;
  const options = useMemo(() => {
    const others = shuffle(ADJ_FORMS.filter((f) => f !== form && conjugateAdj(word, f))).slice(0, 3);
    return shuffle([form, ...others]).map((f) => ({ key: f, label: ADJ_FORM_NAMES[f][lang] }));
  }, [item, lang]);
  const done = (ok: boolean) => { score('grammar', ok); track(`adj:${form}`, ok); speak(c.kana); };
  const kind = isNa(word) ? t('naAdj') : t('iAdj');
  return (
    <div className="card q">
      <p className="q-hint">{ex === 'type' ? t('qAdjType') : t('qIdentify')}</p>
      {ex === 'type'
        ? <>
            <div className="verb-badge">
              <ruby lang="ja">{word.written}<rt>{word.kana}</rt></ruby>
              <span>{word.meaning[lang]} · {kind}</span>
            </div>
            <div className="form-tag"><b>{ADJ_FORM_NAMES[form][lang]}</b></div>
            <KanaInput disabled={api.answered} placeholder={t('romajiHint')} onSubmit={(v) => {
              const ok = c.accepted.some((a) => toHiragana(a) === toHiragana(v));
              api.answer(ok);
              done(ok);
            }} />
          </>
        : <>
            <div className="q-main"><ruby lang="ja">{c.word}<rt>{c.kana}</rt></ruby></div>
            <p className="q-sub" lang="ja">{word.written} · {word.meaning[lang]} · {kind}</p>
            <Choices options={options} answer={form} api={api} onPick={done} />
          </>}
      <Feedback api={api} answer={<span lang="ja">{c.word} ({c.kana})</span>} />
    </div>
  );
}
