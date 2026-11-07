import { useRef, useState, type ReactNode } from 'react';
import { MILESTONES } from '../data/life/calendar';
import { FIGURES, type FigureInfo } from '../data/life/figures';
import { prefectureById } from '../data/life/prefectures';
import { tr } from '../data/life/types';
import { useT } from '../lib/i18n';
import { SpeakButton } from '../ui/parts';
import './Folk.css';

/* All drawings are original and share one soft style: round shapes, a thin dark outline, small faces. */
const INK = '#4b3340';
const Eye = ({ x, y }: { x: number; y: number }) => <circle cx={x} cy={y} r="2.4" fill={INK} />;
const Blush = ({ x, y }: { x: number; y: number }) => <ellipse cx={x} cy={y} rx="4" ry="2.4" fill="#ff9db6" opacity=".75" />;

function Daruma({ eyes, onEye }: { eyes: number; onEye: () => void }) {
  return (
    <>
      <ellipse cx="50" cy="60" rx="36" ry="40" fill="#e23b3b" stroke={INK} strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="23" ry="22" fill="#ffeeda" stroke={INK} strokeWidth="1.5" />
      <path d="M31 40 Q39 32 46 40 M54 40 Q61 32 69 40" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      <g className="fg-eyes" onClick={(e) => { e.stopPropagation(); onEye(); }}>
        <circle cx="40" cy="49" r="7.5" fill="#fff" stroke={INK} strokeWidth="1.5" />
        <circle cx="60" cy="49" r="7.5" fill="#fff" stroke={INK} strokeWidth="1.5" />
        {eyes > 0 && <circle className="pop" cx="40" cy="49" r="4.6" fill={INK} />}
        {eyes > 1 && <circle className="pop" cx="60" cy="49" r="4.6" fill={INK} />}
      </g>
      <path d="M41 63 Q50 70 59 63" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M36 62 Q50 56 64 62" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity=".5" />
      <text x="50" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffd76a" lang="ja">福</text>
    </>
  );
}

const DRAW: Record<string, ReactNode> = {
  maneki: <>
    <path d="M24 98 Q20 56 50 56 Q80 56 76 98 Z" fill="#fff7ee" stroke={INK} strokeWidth="2" />
    <path d="M26 40 L24 16 L42 28 M74 40 L76 16 L58 28" fill="#fff7ee" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    <path d="M28 24 L33 31 M72 24 L67 31" stroke="#ff9db6" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="50" cy="42" rx="28" ry="24" fill="#fff7ee" stroke={INK} strokeWidth="2" />
    <Eye x={40} y={41} /><Eye x={60} y={41} /><Blush x={32} y={49} /><Blush x={68} y={49} />
    <path d="M46 49 Q50 53 54 49" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M30 66 Q50 74 70 66" fill="none" stroke="#e23b3b" strokeWidth="5" />
    <circle cx="50" cy="74" r="5" fill="#ffd76a" stroke={INK} strokeWidth="1.4" />
    <ellipse cx="50" cy="90" rx="13" ry="9" fill="#ffd76a" stroke={INK} strokeWidth="1.4" />
    <g className="fg-part wave"><path d="M74 72 Q90 62 84 44 Q78 36 72 46 Q72 58 66 66" fill="#fff7ee" stroke={INK} strokeWidth="2" strokeLinejoin="round" /></g>
  </>,
  kokeshi: <>
    <path d="M34 54 H66 L70 100 H30 Z" fill="#fde8c8" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    <path d="M34 66 H66 M33 78 H67 M31 90 H69" stroke="#e23b3b" strokeWidth="3" />
    <circle cx="42" cy="72" r="3.4" fill="#2f9c7a" /><circle cx="58" cy="84" r="3.4" fill="#2f9c7a" />
    <g className="fg-part head">
      <circle cx="50" cy="34" r="24" fill="#fde8c8" stroke={INK} strokeWidth="2" />
      <path d="M26 34 Q26 10 50 10 Q74 10 74 34 Q68 22 50 22 Q32 22 26 34 Z" fill={INK} />
      <path d="M38 40 q3 -3 6 0 M56 40 q3 -3 6 0" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M48 47 Q50 49 52 47" stroke="#e23b3b" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Blush x={36} y={46} /><Blush x={64} y={46} />
    </g>
  </>,
  akabeko: <>
    <ellipse cx="58" cy="66" rx="32" ry="20" fill="#d83a3a" stroke={INK} strokeWidth="2" />
    <path d="M36 84 V98 H46 V84 M72 84 V98 H82 V84" fill="#d83a3a" stroke={INK} strokeWidth="2" />
    <circle cx="56" cy="60" r="4" fill={INK} /><circle cx="72" cy="70" r="4" fill={INK} /><path d="M46 72 h10 l-5 8 Z" fill="#ffd76a" />
    <path d="M86 58 q8 4 6 14" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <g className="fg-part head2">
      <path d="M14 34 L8 22 M38 34 L44 22" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="26" cy="50" rx="21" ry="19" fill="#d83a3a" stroke={INK} strokeWidth="2" />
      <ellipse cx="26" cy="60" rx="14" ry="8" fill="#ffeeda" stroke={INK} strokeWidth="1.5" />
      <circle cx="18" cy="44" r="3.2" fill={INK} /><circle cx="34" cy="44" r="3.2" fill={INK} />
      <path d="M21 60 h2 M29 60 h2" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    </g>
  </>,
  tanuki: <>
    <ellipse cx="50" cy="74" rx="32" ry="27" fill="#a87a55" stroke={INK} strokeWidth="2" />
    <ellipse cx="50" cy="78" rx="21" ry="19" fill="#f2dfc2" stroke={INK} strokeWidth="1.5" />
    <circle cx="50" cy="38" r="23" fill="#a87a55" stroke={INK} strokeWidth="2" />
    <path d="M22 28 Q50 2 78 28 Z" fill="#e7c978" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    <ellipse cx="50" cy="28" rx="36" ry="5" fill="#e7c978" stroke={INK} strokeWidth="2" />
    <circle cx="39" cy="40" r="7" fill="#f2dfc2" /><circle cx="61" cy="40" r="7" fill="#f2dfc2" />
    <Eye x={39} y={41} /><Eye x={61} y={41} />
    <ellipse cx="50" cy="50" rx="4" ry="3" fill={INK} />
    <path d="M78 66 l10 2 l-1 18 l-11 -2 Z" fill="#6a4a78" stroke={INK} strokeWidth="1.6" />
    <path d="M12 66 h12 v22 h-12 Z" fill="#fff3d6" stroke={INK} strokeWidth="1.6" />
    <text x="18" y="82" textAnchor="middle" fontSize="11" fill={INK} lang="ja">通</text>
  </>,
  hina: <>
    <path d="M6 98 Q8 60 28 56 Q48 60 50 98 Z" fill="#3a4f8a" stroke={INK} strokeWidth="2" />
    <path d="M50 98 Q52 60 72 56 Q92 60 94 98 Z" fill="#d94f73" stroke={INK} strokeWidth="2" />
    <path d="M56 98 Q60 72 72 66 Q84 72 88 98 Z" fill="#ffd76a" opacity=".85" />
    <path d="M12 98 Q16 72 28 66 Q40 72 44 98 Z" fill="#7fa6e0" opacity=".8" />
    <circle cx="28" cy="42" r="14" fill="#ffeeda" stroke={INK} strokeWidth="1.8" /><circle cx="72" cy="42" r="14" fill="#ffeeda" stroke={INK} strokeWidth="1.8" />
    <path d="M14 40 Q16 26 28 26 Q40 26 42 40 Q34 32 28 32 Q22 32 14 40" fill={INK} /><path d="M58 40 Q60 26 72 26 Q84 26 86 40 Q84 58 88 62 M58 40 Q60 58 56 62" fill={INK} stroke={INK} strokeWidth="2" />
    <rect x="24" y="14" width="8" height="14" rx="3" fill={INK} /><path d="M63 28 L72 16 L81 28 Z" fill="#ffd76a" stroke={INK} strokeWidth="1.5" />
    <Eye x={23} y={44} /><Eye x={33} y={44} /><Eye x={67} y={44} /><Eye x={77} y={44} />
  </>,
  okiagari: <>
    <path d="M28 76 Q28 30 50 30 Q72 30 72 76 Q72 98 50 98 Q28 98 28 76 Z" fill="#d83a3a" stroke={INK} strokeWidth="2" />
    <ellipse cx="50" cy="54" rx="16" ry="15" fill="#ffeeda" stroke={INK} strokeWidth="1.5" />
    <path d="M36 42 Q50 28 64 42 Q50 38 36 42" fill={INK} />
    <Eye x={44} y={54} /><Eye x={56} y={54} /><path d="M47 61 Q50 63 53 61" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M38 78 Q50 86 62 78" fill="none" stroke="#ffd76a" strokeWidth="3" strokeLinecap="round" />
  </>,
  kitsune: <>
    <path d="M34 98 Q30 58 50 54 Q70 58 66 98 Z" fill="#fffaf2" stroke={INK} strokeWidth="2" />
    <path d="M66 94 Q92 92 86 62 Q78 80 62 78" fill="#fffaf2" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    <path d="M34 62 Q50 72 66 62 L50 86 Z" fill="#e23b3b" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
    <g className="fg-part head">
      <path d="M26 42 L24 8 L44 24 M74 42 L76 8 L56 24" fill="#fffaf2" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M26 30 Q50 22 74 30 Q72 50 50 62 Q28 50 26 30 Z" fill="#fffaf2" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M36 37 L44 41 M64 37 L56 41" stroke="#e23b3b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="56" r="3" fill={INK} />
    </g>
  </>,
  shisa: <>
    <path d="M26 98 Q22 62 50 58 Q78 62 74 98 Z" fill="#d98b4a" stroke={INK} strokeWidth="2" />
    <circle cx="50" cy="42" r="28" fill="#c2612f" stroke={INK} strokeWidth="2" />
    <circle cx="50" cy="44" r="20" fill="#e6a262" stroke={INK} strokeWidth="1.5" />
    <circle cx="41" cy="36" r="5.4" fill="#fff" stroke={INK} strokeWidth="1.5" /><circle cx="59" cy="36" r="5.4" fill="#fff" stroke={INK} strokeWidth="1.5" />
    <Eye x={41} y={36} /><Eye x={59} y={36} />
    <path d="M36 50 Q50 66 64 50 Z" fill="#7a2626" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M40 51 l3 5 l3 -5 M54 51 l3 5 l3 -5" fill="#fff" />
    <path d="M26 98 h14 M60 98 h14" stroke={INK} strokeWidth="3" strokeLinecap="round" />
  </>,
  dogu: <>
    <path d="M38 52 Q18 54 14 70 Q24 74 34 66 L32 98 H46 L50 84 L54 98 H68 L66 66 Q76 74 86 70 Q82 54 62 52 Z" fill="#b08968" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    <ellipse cx="50" cy="32" rx="30" ry="22" fill="#b08968" stroke={INK} strokeWidth="2" />
    <ellipse cx="37" cy="33" rx="13" ry="10" fill="#d9c0a0" stroke={INK} strokeWidth="1.8" /><ellipse cx="63" cy="33" rx="13" ry="10" fill="#d9c0a0" stroke={INK} strokeWidth="1.8" />
    <path d="M27 33 H47 M53 33 H73" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    <path d="M40 66 Q50 74 60 66 M40 74 Q50 82 60 74" fill="none" stroke={INK} strokeWidth="1.6" opacity=".7" />
    <path d="M36 12 Q50 2 64 12" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
  </>,
  haniwa: <>
    <path d="M32 44 Q30 96 34 100 H66 Q70 96 68 44 Q50 18 32 44 Z" fill="#d68a5a" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    <path d="M32 58 Q14 54 18 72 M68 58 Q86 40 84 34" fill="none" stroke="#d68a5a" strokeWidth="9" strokeLinecap="round" />
    <path d="M32 58 Q14 54 18 72 M68 58 Q86 40 84 34" fill="none" stroke={INK} strokeWidth="1.2" opacity=".35" />
    <ellipse cx="42" cy="46" rx="4.4" ry="6" fill={INK} /><ellipse cx="58" cy="46" rx="4.4" ry="6" fill={INK} /><ellipse cx="50" cy="62" rx="5" ry="6.6" fill={INK} />
    <path d="M32 84 H68" stroke={INK} strokeWidth="1.6" opacity=".5" />
  </>,
  teruteru: <>
    <path d="M50 2 V22" stroke={INK} strokeWidth="1.6" />
    <path d="M34 54 Q20 84 18 96 Q34 88 42 96 Q50 88 58 96 Q66 88 82 96 Q80 84 66 54 Z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    <circle cx="50" cy="40" r="20" fill="#fff" stroke={INK} strokeWidth="2" />
    <path d="M36 57 Q50 62 64 57" fill="none" stroke="#e23b3b" strokeWidth="3" strokeLinecap="round" />
    <Eye x={43} y={38} /><Eye x={57} y={38} /><path d="M45 45 Q50 50 55 45" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" /><Blush x={37} y={44} /><Blush x={63} y={44} />
  </>,
  koinobori: <>
    <path d="M12 4 V104" stroke="#8a6444" strokeWidth="4" strokeLinecap="round" />
    <circle cx="12" cy="6" r="4" fill="#ffd76a" stroke={INK} strokeWidth="1.5" />
    <path d="M14 14 H70 Q92 28 92 28 Q84 34 92 42 Q70 44 14 40 Z" fill="#3a4f8a" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="26" cy="26" r="5" fill="#fff" stroke={INK} strokeWidth="1.4" /><circle cx="26" cy="26" r="2" fill={INK} />
    <path d="M42 22 q5 4 0 8 M54 22 q5 4 0 8 M66 22 q5 4 0 8" fill="none" stroke="#a9c1ee" strokeWidth="2" />
    <path d="M14 52 H62 Q82 64 82 64 Q74 70 82 76 Q62 78 14 76 Z" fill="#e0476b" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="26" cy="63" r="5" fill="#fff" stroke={INK} strokeWidth="1.4" /><circle cx="26" cy="63" r="2" fill={INK} />
    <path d="M42 59 q5 4 0 8 M54 59 q5 4 0 8" fill="none" stroke="#ffc3d3" strokeWidth="2" />
  </>,
  namahage: <>
    <path d="M18 100 Q6 62 22 34 M82 100 Q94 62 78 34 M30 100 Q20 70 28 44 M70 100 Q80 70 72 44" stroke="#c9a968" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M22 100 Q18 40 50 40 Q82 40 78 100 Z" fill="#c9a968" stroke={INK} strokeWidth="2" />
    <g className="fg-part head2">
      <path d="M30 24 L24 6 L42 18 M70 24 L76 6 L58 18" fill="#f1e2bd" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="50" cy="44" rx="28" ry="28" fill="#cf3b35" stroke={INK} strokeWidth="2" />
      <path d="M30 32 L44 38 M70 32 L56 38" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <circle cx="39" cy="43" r="6" fill="#fff" stroke={INK} strokeWidth="1.5" /><circle cx="61" cy="43" r="6" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <Eye x={39} y={43} /><Eye x={61} y={43} />
      <path d="M34 58 Q50 72 66 58 Z" fill="#5c1c1c" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M38 59 l3 6 l3 -5 M56 59 l3 5 l3 -6" fill="#fff" />
    </g>
  </>,
};

const S = {
  shelf: tr('The folk shelf', 'L’étagère folklorique', 'El estante popular', '民俗展架'),
  hint: tr('Tap a figure to wake it up and hear its story.', 'Touche une figurine pour la réveiller et écouter son histoire.', 'Toca una figura para despertarla y oír su historia.', '点一点人偶，唤醒它，听听它的故事。'),
  from: tr('From', 'Origine', 'Origen', '来自'),
  everywhere: tr('All over Japan', 'Partout au Japon', 'Por todo Japón', '日本各地'),
  life: tr('A Japanese life, year by year', 'Une vie japonaise, année après année', 'Una vida japonesa, año a año', '日本人的一生'),
  lifeHint: tr('Drag through the years and stop at each celebration.', 'Parcours les années et arrête-toi à chaque célébration.', 'Recorre los años y detente en cada celebración.', '拖动年龄，看看每个节点的庆祝。'),
  age: tr('Age', 'Âge', 'Edad', '年龄'),
};

function Figure({ info, eyes, onEye, moving }: { info: FigureInfo; eyes: number; onEye: () => void; moving: boolean }) {
  return (
    <svg viewBox="0 0 100 104" className={`fg fg-${info.move} ${moving ? 'go' : ''}`} aria-hidden="true">
      <g className="fg-all">{info.id === 'daruma' ? <Daruma eyes={eyes} onEye={onEye} /> : DRAW[info.id]}</g>
    </svg>
  );
}

export function FolkShelf() {
  const { lang } = useT();
  const [id, setId] = useState(FIGURES[0].id);
  const [moving, setMoving] = useState(false);
  const [eyes, setEyes] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const info = FIGURES.find((x) => x.id === id)!;
  const pref = info.pref ? prefectureById(info.pref) : null;
  const wake = (next: string) => {
    setId(next);
    setMoving(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMoving(false), 1300);
  };
  return (
    <section className="fs">
      <h2>🪆 {S.shelf[lang]}</h2>
      <p className="note">{S.hint[lang]}</p>
      <div className="fs-layout">
        <div className="fs-case">
          {FIGURES.map((x) => (
            <button key={x.id} className={`fs-slot ${x.id === id ? 'on' : ''}`} aria-pressed={x.id === id} aria-label={x.name[lang]} onClick={() => wake(x.id)}>
              <Figure info={x} eyes={x.id === 'daruma' ? eyes : 0} onEye={() => { setEyes((e) => (e + 1) % 3); wake('daruma'); }} moving={moving && x.id === id} />
            </button>
          ))}
        </div>
        <div className="card fs-card pop" key={id} aria-live="polite">
          <div className="jm-title">
            <div className="jm-name">
              <span className="jm-big"><ruby lang="ja">{info.written}<rt>{info.written === info.kana ? '' : info.kana}</rt></ruby></span>
              <span className="jm-local">{info.name[lang]} · {S.from[lang]}: {pref ? pref.name[lang] : S.everywhere[lang]}</span>
            </div>
            <SpeakButton text={info.kana} />
          </div>
          <p>{info.story[lang]}</p>
        </div>
      </div>
    </section>
  );
}

export function LifeStages() {
  const { lang } = useT();
  const [i, setI] = useState(0);
  const top = MILESTONES.length - 1;
  const now = MILESTONES[i];
  return (
    <section className="ls">
      <h2>🌱 {S.life[lang]}</h2>
      <p className="note">{S.lifeHint[lang]}</p>
      <div className="card">
        <div className="ls-age"><span>{S.age[lang]}</span> <b>{now.age}</b></div>
        <div className="ls-track">
          <input type="range" min="0" max={top} value={i} aria-label={S.age[lang]} aria-valuetext={`${now.age} ${now.written}`} onChange={(e) => setI(+e.target.value)} />
          <div className="ls-marks">
            {MILESTONES.map((x, n) => (
              <button key={x.written} className={x === now ? 'on' : ''} style={{ left: `${(n / top) * 100}%` }} aria-label={`${x.age} ${x.written}`} onClick={() => setI(n)}>
                <span aria-hidden="true">{x.emoji}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="ls-card pop" key={now.written} aria-live="polite">
          <span className="emoji-big" aria-hidden="true">{now.emoji}</span>
          <div>
            <b className="jm-big"><ruby lang="ja">{now.written}<rt>{now.kana}</rt></ruby></b>
            <SpeakButton text={now.kana} />
            <p>{now.text[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
