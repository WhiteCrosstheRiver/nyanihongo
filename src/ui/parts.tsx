import { useMemo, useRef, useState, type ReactNode } from 'react';
import { speak, chime } from '../lib/audio';
import { useT } from '../lib/i18n';
import { useStore } from '../lib/store';
import { romajiToKana } from '../lib/romaji';

export type Mood = 'idle' | 'happy' | 'sad' | 'think' | 'sleep';

/** Nyako, the app's original round cat mascot. */
export function Mascot({ mood = 'idle', size = 96 }: { mood?: Mood; size?: number }) {
  const ink = 'var(--ink)';
  return (
    <svg className={`mascot mascot-${mood}`} width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Nyako">
      <path d="M26 46 24 16l24 15h24l24-15-2 30c7 8 10 16 10 25 0 24-23 37-46 37S14 95 14 71c0-9 5-17 12-25z"
        fill="var(--mascot)" stroke={ink} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M29 24l11 8-10 8zM91 24l-11 8 10 8z" fill="var(--pink)" />
      <circle cx="93" cy="27" r="0" />
      <g fill="var(--pink-strong)" transform="translate(84 13)">
        {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="0" cy="-5" rx="3.4" ry="5" transform={`rotate(${r})`} />)}
        <circle r="2" fill="#fff4b8" />
      </g>
      <ellipse cx="32" cy="80" rx="9" ry="5.5" fill="var(--pink)" opacity=".8" />
      <ellipse cx="88" cy="80" rx="9" ry="5.5" fill="var(--pink)" opacity=".8" />
      {mood === 'happy' && <g fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round"><path d="M36 70q7-9 14 0" /><path d="M70 70q7-9 14 0" /><path d="M52 80q8 12 16 0" fill="var(--pink-strong)" /></g>}
      {mood === 'sad' && <g fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round"><path d="M36 66q7 7 14 3" /><path d="M84 66q-7 7-14 3" /><path d="M53 87q7-7 14 0" /><path d="M36 76v6" stroke="#8fd0ee" /></g>}
      {mood === 'think' && <g><circle cx="43" cy="69" r="5.5" fill={ink} /><circle cx="77" cy="69" r="5.5" fill={ink} /><path d="M55 84h10" stroke={ink} strokeWidth="4" strokeLinecap="round" /></g>}
      {mood === 'sleep' && <g fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round"><path d="M36 69h14" /><path d="M70 69h14" /><path d="M55 82q5 5 10 0" /></g>}
      {mood === 'idle' && <g><circle cx="43" cy="69" r="6" fill={ink} /><circle cx="77" cy="69" r="6" fill={ink} /><circle cx="45" cy="67" r="2" fill="#fff" /><circle cx="79" cy="67" r="2" fill="#fff" /><path d="M54 80q6 7 12 0" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" /></g>}
    </svg>
  );
}

/** Renders {漢字|かな} markup as ruby text. */
export function Ruby({ text }: { text: string }) {
  const { p } = useStore();
  const parts = useMemo(() => text.split(/(\{[^}]+\})/), [text]);
  return (
    <span lang="ja">
      {parts.map((part, i) => {
        const m = part.match(/^\{([^|]+)\|([^}]+)\}$/);
        if (!m) return part;
        return p.furigana ? <ruby key={i}>{m[1]}<rt>{m[2]}</rt></ruby> : <span key={i}>{m[1]}</span>;
      })}
    </span>
  );
}

export const plainKana = (text: string) => text.replace(/\{[^|]+\|([^}]+)\}/g, '$1');

export function SpeakButton({ text }: { text: string }) {
  const { t } = useT();
  const [missing, setMissing] = useState(false);
  return (
    <>
      <button className="icon-btn" aria-label={t('play')} onClick={async () => setMissing(!(await speak(text)))}>🔊</button>
      {missing && <p className="note" role="status">{t('voiceMissing')}</p>}
    </>
  );
}

export function Progress({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  return <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${pct}%` }} /></div>;
}

export function Header({ title, onBack }: { title: string; onBack?: () => void }) {
  const { t } = useT();
  return (
    <header className="page-head">
      {onBack && <button className="icon-btn" aria-label={t('back')} onClick={onBack}>←</button>}
      <h1>{title}</h1>
    </header>
  );
}

export function Confetti() {
  const bits = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 0.6, c: ['🌸', '⭐', '💖', '✨'][i % 4],
  })), []);
  return <div className="confetti" aria-hidden>{bits.map((b, i) => <span key={i} style={{ left: `${b.left}%`, animationDelay: `${b.delay}s` }}>{b.c}</span>)}</div>;
}

export interface QuizApi { answer: (ok: boolean) => void; next: () => void; answered: boolean; correct: boolean | null }

/** Runs a fixed-length quiz: progress, mascot reactions, score screen. */
export function Quiz({ total, onExit, render, onReset }: {
  total: number;
  onExit: () => void;
  render: (index: number, api: QuizApi) => ReactNode;
  onReset?: () => void;
}) {
  const { t } = useT();
  const { p } = useStore();
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [round, setRound] = useState(0);
  const locked = useRef(false);

  const api: QuizApi = {
    answered: correct !== null,
    correct,
    answer: (ok) => {
      if (locked.current) return;
      locked.current = true;
      setCorrect(ok);
      if (ok) setScore((s) => s + 1);
      if (p.sound) chime(ok);
    },
    next: () => { locked.current = false; setCorrect(null); setI((n) => n + 1); },
  };

  if (i >= total) {
    const good = score >= total * 0.7;
    return (
      <div className="result card pop">
        {good && <Confetti />}
        <Mascot mood={good ? 'happy' : 'think'} size={130} />
        <h2>{good ? t('niceJob') : t('keepGoing')}</h2>
        <p className="big">{t('score')}: {score} / {total}</p>
        <div className="row center">
          <button className="btn" onClick={() => { locked.current = false; setI(0); setScore(0); setCorrect(null); setRound((r) => r + 1); onReset?.(); }}>{t('again2')}</button>
          <button className="btn ghost" onClick={onExit}>{t('finish')}</button>
        </div>
      </div>
    );
  }
  return (
    <div className="quiz" key={round}>
      <div className="quiz-top">
        <Mascot mood={correct === null ? 'think' : correct ? 'happy' : 'sad'} size={56} />
        <Progress value={i + (correct === null ? 0 : 1)} max={total} />
        <span className="count">{i + 1}/{total}</span>
      </div>
      {render(i, api)}
    </div>
  );
}

export function Feedback({ api, answer }: { api: QuizApi; answer?: ReactNode }) {
  const { t } = useT();
  if (!api.answered) return null;
  return (
    <div className={`feedback ${api.correct ? 'ok' : 'no'}`} role="status">
      <div>
        <strong>{api.correct ? t('correct') : t('wrong')}</strong>
        {answer && <div>{t('theAnswer')}: {answer}</div>}
      </div>
      <button className="btn" autoFocus onClick={api.next}>{t('next')}</button>
    </div>
  );
}

export function Choices({ options, answer, api, onPick, big }: {
  options: { key: string; label: ReactNode }[];
  answer: string;
  api: QuizApi;
  onPick?: (ok: boolean) => void;
  big?: boolean;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className={`choices ${big ? 'big' : ''}`}>
      {options.map((o) => {
        const state = !api.answered ? '' : o.key === answer ? 'right' : o.key === picked ? 'bad' : 'dim';
        return (
          <button key={o.key} className={`choice ${state}`} disabled={api.answered} onClick={() => {
            setPicked(o.key);
            const ok = o.key === answer;
            api.answer(ok);
            onPick?.(ok);
          }}>{o.label}</button>
        );
      })}
    </div>
  );
}

/** Text input that turns romaji into hiragana while typing, and leaves Japanese IME input alone. */
export function KanaInput({ onSubmit, disabled, placeholder }: { onSubmit: (v: string) => void; disabled: boolean; placeholder: string }) {
  const { t } = useT();
  const [v, setV] = useState('');
  const composing = useRef(false);
  return (
    <form className="kana-form" onSubmit={(e) => { e.preventDefault(); if (!disabled && v.trim()) onSubmit(romajiToKana(v.trim(), true)); }}>
      <input lang="ja" value={v} disabled={disabled} autoFocus placeholder={placeholder} aria-label={placeholder}
        autoCapitalize="none" autoCorrect="off" autoComplete="off" spellCheck={false}
        onCompositionStart={() => { composing.current = true; }}
        onCompositionEnd={(e) => { composing.current = false; setV(e.currentTarget.value); }}
        onChange={(e) => setV(composing.current ? e.target.value : romajiToKana(e.target.value))} />
      <button className="btn" disabled={disabled || !v.trim()}>{t('check')}</button>
    </form>
  );
}

export function shuffle<T>(a: readonly T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
export const pick = <T,>(a: readonly T[]): T => a[Math.floor(Math.random() * a.length)];
