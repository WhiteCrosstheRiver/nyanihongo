/* The moving pictures behind the visual grammar lessons. Each scene follows the lesson step, and the
   learner can take over at any time: that is the point. Nothing here is a video. */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useT, type Lang } from '../../lib/i18n';
import type { Tr } from '../../data/reading';
import { tr } from '../../data/life/types';

export interface SceneProps { step: number }

/** A setting that follows the lesson step until the learner changes it. */
function useStepped<T>(value: T, step: number) {
  const [v, set] = useState(value);
  useEffect(() => { set(value); }, [step]);
  return [v, set] as const;
}

const calm = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A 0 to 1 clock that loops and can be scrubbed by hand. */
function useClock(ms: number, reset: unknown) {
  const [t, setT] = useState(calm() ? 1 : 0);
  const [playing, setPlaying] = useState(!calm());
  useEffect(() => { if (!calm()) { setT(0); setPlaying(true); } }, [reset]);
  const last = useRef(0);
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    last.current = performance.now();
    const tick = (now: number) => {
      const dt = now - last.current;
      last.current = now;
      setT((x) => (x + dt / ms) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, ms]);
  return { t, playing, setPlaying, scrub: (v: number) => { setPlaying(false); setT(v); } };
}

const Chips = <K extends string>({ items, value, onPick, label }: {
  items: { key: K; label: ReactNode }[]; value: K; onPick: (k: K) => void; label: string;
}) => (
  <div className="chips vg-chips" role="group" aria-label={label}>
    {items.map((x) => (
      <button key={x.key} className={`chip ${value === x.key ? 'on' : ''}`} aria-pressed={value === x.key} onClick={() => onPick(x.key)}>{x.label}</button>
    ))}
  </div>
);

const CH = {
  particles: tr('Particles', 'Particules', 'Partículas', '助词'), verbs: tr('Verbs', 'Verbes', 'Verbos', '动词'),
  level: tr('Politeness level', 'Niveau de politesse', 'Nivel de cortesía', '礼貌程度'), examples: tr('Examples', 'Exemples', 'Ejemplos', '例句'),
};
const J = ({ w, k }: { w: string; k?: string }) => <ruby lang="ja">{w}{k && <rt>{k}</rt>}</ruby>;

/* 1. Particles are name tags ---------------------------------------------------------------- */
const TAGS: Record<string, Tr> = {
  move: tr('Move the blocks', 'Déplacer les blocs', 'Mover los bloques', '移动词块'),
  swap: tr('Swap the tags', 'Échanger les étiquettes', 'Cambiar las etiquetas', '交换标签'),
  catEats: tr('The cat eats the fish.', 'Le chat mange le poisson.', 'El gato come el pescado.', '猫吃鱼。'),
  fishEats: tr('The fish eats the cat!', 'Le poisson mange le chat !', '¡El pescado se come al gato!', '鱼吃猫！'),
  doer: tr('who does it', 'qui agit', 'quién lo hace', '谁来做'),
  target: tr('done to what', 'sur quoi', 'a qué', '对什么做'),
  stays: tr('The verb stays last', 'Le verbe reste à la fin', 'El verbo queda al final', '动词留在句尾'),
};

export function TagsScene({ step }: SceneProps) {
  const { lang } = useT();
  const [moved, setMoved] = useStepped(step === 1, step);
  const [swapped, setSwapped] = useStepped(step === 2, step);
  const slot = { cat: moved ? 1 : 0, fish: moved ? 0 : 1 };
  const block = (id: 'cat' | 'fish', word: ReactNode, emoji: string, doer: boolean) => (
    <div className="vg-block" style={{ transform: `translateX(${slot[id] * 100}%)` }}>
      <div className="vg-word"><span aria-hidden="true">{emoji}</span> {word}</div>
      <div key={String(doer)} className={`vg-tag pop ${doer ? 'doer' : 'target'}`}>
        <b lang="ja">{doer ? 'が' : 'を'}</b>
        <small>{(doer ? TAGS.doer : TAGS.target)[lang]}</small>
      </div>
    </div>
  );
  const a = swapped ? '🐟' : '🐱', b = swapped ? '🐱' : '🐟';
  return (
    <>
      <div className={`vg-picture ${swapped ? 'shock' : ''}`} aria-hidden="true">
        <span className="vg-actor">{a}</span><span className="vg-arrow">➜</span><span>{b}</span>
      </div>
      <div className="vg-track">
        {block('cat', <J w="猫" k="ねこ" />, '', !swapped)}
        {block('fish', <J w="魚" k="さかな" />, '', swapped)}
        <div className="vg-block fixed" title={TAGS.stays[lang]}>
          <div className="vg-word"><J w="食" k="た" /><span lang="ja">べる</span></div>
          <div className="vg-tag lock">🔒 <small>{TAGS.stays[lang]}</small></div>
        </div>
      </div>
      <p className="vg-meaning" aria-live="polite">{(swapped ? TAGS.fishEats : TAGS.catEats)[lang]}</p>
      <div className="row vg-actions">
        <button className="btn small" onClick={() => setMoved(!moved)}>🔀 {TAGS.move[lang]}</button>
        <button className="btn small ghost" onClick={() => setSwapped(!swapped)}>🏷️ {TAGS.swap[lang]}</button>
      </div>
    </>
  );
}

/* 2. Particles in space ---------------------------------------------------------------------- */
type P = 'ni' | 'he' | 'de' | 'wo' | 'kara' | 'made' | 'to';
const HOME = [52, 158], SCHOOL = [308, 48];
const SPACE: Record<P, { label: string; ja: ReactNode; text: string; tr: Tr; path: number[][]; friend?: boolean }> = {
  ni: { label: 'に', ja: <><J w="学校" k="がっこう" /><b>に</b><span>行く</span></>, text: '学校に行く', tr: tr('Go to school: the arrow lands on a point.', 'Aller à l’école : la flèche touche un point.', 'Ir a la escuela: la flecha cae en un punto.', '去学校：箭头落在一个点上。'), path: [HOME, SCHOOL] },
  he: { label: 'へ', ja: <><J w="学校" k="がっこう" /><b>へ</b><span>行く</span></>, text: '学校へ行く', tr: tr('Head toward school: only the direction matters.', 'Se diriger vers l’école : seule la direction compte.', 'Ir hacia la escuela: solo importa la dirección.', '朝学校去：重要的只是方向。'), path: [HOME, [190, 98]] },
  de: { label: 'で', ja: <><J w="公園" k="こうえん" /><b>で</b><J w="遊" k="あそ" /><span>ぶ</span></>, text: '公園で遊ぶ', tr: tr('Play in the park: the whole area is the stage.', 'Jouer au parc : toute la zone est la scène.', 'Jugar en el parque: toda la zona es el escenario.', '在公园玩：整个区域就是舞台。'), path: [[150, 90], [215, 80], [205, 128], [145, 120], [150, 90]] },
  wo: { label: 'を', ja: <><J w="公園" k="こうえん" /><b>を</b><J w="歩" k="ある" /><span>く</span></>, text: '公園を歩く', tr: tr('Walk through the park: the place is the route itself.', 'Traverser le parc à pied : le lieu est le trajet lui-même.', 'Caminar por el parque: el lugar es la propia ruta.', '穿过公园走：地点本身就是路线。'), path: [[92, 60], [240, 140]] },
  kara: { label: 'から', ja: <><J w="家" k="いえ" /><b>から</b><span>行く</span></>, text: '家から行く', tr: tr('Leave from home: only the start is marked.', 'Partir de la maison : seul le départ est marqué.', 'Salir de casa: solo se marca el inicio.', '从家出发：只标出起点。'), path: [HOME, SCHOOL] },
  made: { label: 'まで', ja: <><J w="学校" k="がっこう" /><b>まで</b><J w="歩" k="ある" /><span>く</span></>, text: '学校まで歩く', tr: tr('Walk as far as school: the journey covers everything up to the end.', 'Marcher jusqu’à l’école : le trajet couvre tout jusqu’à la fin.', 'Caminar hasta la escuela: el trayecto cubre todo hasta el final.', '走到学校：一路走到终点为止。'), path: [HOME, SCHOOL] },
  to: { label: 'と', ja: <><J w="友" k="とも" /><span>だち</span><b>と</b><span>行く</span></>, text: '友だちと行く', tr: tr('Go with a friend: a partner joins the action.', 'Y aller avec un ami : un partenaire rejoint l’action.', 'Ir con un amigo: alguien se une a la acción.', '和朋友一起去：有同伴加入。'), path: [HOME, SCHOOL], friend: true },
};
const SPACE_ORDER: P[] = ['ni', 'he', 'de', 'wo', 'kara', 'made', 'to'];
const STEP_P: P[] = ['ni', 'he', 'de', 'wo', 'kara'];

function along(path: number[][], t: number) {
  const seg = path.slice(1).map((p, i) => Math.hypot(p[0] - path[i][0], p[1] - path[i][1]));
  let left = t * seg.reduce((a, b) => a + b, 0);
  for (let i = 0; i < seg.length; i++) {
    if (left <= seg[i] || i === seg.length - 1) {
      const f = seg[i] ? Math.min(1, left / seg[i]) : 0;
      return [path[i][0] + (path[i + 1][0] - path[i][0]) * f, path[i][1] + (path[i + 1][1] - path[i][1]) * f];
    }
    left -= seg[i];
  }
  return path[0];
}

const SCRUB = tr('Move through time', 'Avancer dans le temps', 'Avanzar en el tiempo', '拖动时间');
const PLAY = tr('Play', 'Lecture', 'Reproducir', '播放');
const PAUSE = tr('Pause', 'Pause', 'Pausa', '暂停');
const SPACE_LABELS: Record<string, Tr> = {
  home: tr('home', 'maison', 'casa', '家'), park: tr('park', 'parc', 'parque', '公园'), school: tr('school', 'école', 'escuela', '学校'),
};

export function SpaceScene({ step }: SceneProps) {
  const { lang } = useT();
  const [p, setP] = useStepped<P>(STEP_P[step] ?? 'made', step);
  const c = useClock(3200, p);
  const s = SPACE[p];
  const [x, y] = along(s.path, c.t);
  const line = s.path.map((q) => q.join(',')).join(' ');
  return (
    <>
      <svg className="vg-space" viewBox="0 0 360 200" role="img" aria-label={s.tr[lang]}>
        <ellipse className={`vg-park ${p === 'de' ? 'on' : ''}`} cx="180" cy="102" rx={p === 'de' ? 78 : 66} ry={p === 'de' ? 56 : 46} />
        <text className="vg-sym" x="180" y="60" aria-hidden="true">🌳</text>
        <text className="vg-sym" x="52" y="150" aria-hidden="true">🏠</text>
        <text className="vg-sym" x="308" y="40" aria-hidden="true">🏫</text>
        <text className="vg-cap" x="52" y="190">{SPACE_LABELS.home[lang]}</text>
        <text className="vg-cap" x="180" y="165">{SPACE_LABELS.park[lang]}</text>
        <text className="vg-cap" x="308" y="70">{SPACE_LABELS.school[lang]}</text>
        <polyline className="vg-route" points={line} />
        {p === 'he' && <polyline className="vg-route ghost" points={`190,98 ${SCHOOL.join(',')}`} />}
        {p === 'ni' && <circle className="vg-target" cx={SCHOOL[0]} cy={SCHOOL[1]} r="20" />}
        {p === 'kara' && <circle className="vg-start" cx={HOME[0]} cy={HOME[1]} r="20" />}
        {p === 'made' && <line className="vg-end" x1={SCHOOL[0] - 24} y1={SCHOOL[1] + 18} x2={SCHOOL[0] + 12} y2={SCHOOL[1] - 22} />}
        {s.friend && <text className="vg-sym" x={x - 22} y={y + 14} aria-hidden="true">🐶</text>}
        <text className="vg-sym" x={x} y={y + 8} aria-hidden="true">🐱</text>
      </svg>
      <div className="vg-sentence" lang="ja">{s.ja}</div>
      <p className="vg-meaning" aria-live="polite">{s.tr[lang]}</p>
      <div className="vg-scrub">
        <button className="btn small ghost" aria-label={(c.playing ? PAUSE : PLAY)[lang]} onClick={() => c.setPlaying(!c.playing)}>{c.playing ? '⏸' : '▶'}</button>
        <input type="range" min="0" max="1" step="0.01" value={c.t} aria-label={SCRUB[lang]} onChange={(e) => c.scrub(+e.target.value)} />
      </div>
      <Chips label={CH.particles[lang]} value={p} onPick={setP} items={SPACE_ORDER.map((k) => ({ key: k, label: <span lang="ja">{SPACE[k].label}</span> }))} />
    </>
  );
}

/* 3. The vowel ladder ------------------------------------------------------------------------ */
export const LADDER_VERBS = [
  { id: 'kaku', stem: '書', stemKana: 'か', dict: '書く', kana: 'かく', row: ['か', 'き', 'く', 'け', 'こ'] },
  { id: 'hanasu', stem: '話', stemKana: 'はな', dict: '話す', kana: 'はなす', row: ['さ', 'し', 'す', 'せ', 'そ'] },
  { id: 'matsu', stem: '待', stemKana: 'ま', dict: '待つ', kana: 'まつ', row: ['た', 'ち', 'つ', 'て', 'と'] },
  { id: 'nomu', stem: '飲', stemKana: 'の', dict: '飲む', kana: 'のむ', row: ['ま', 'み', 'む', 'め', 'も'] },
  { id: 'kau', stem: '買', stemKana: 'か', dict: '買う', kana: 'かう', row: ['わ', 'い', 'う', 'え', 'お'] },
];
export const LADDER_ENDS = ['ない', 'ます', '', 'ば', 'う'];
export const ICHIDAN = { stem: '食べ', stemKana: 'たべ', dict: '食べる', kana: 'たべる', ends: ['ない', 'ます', 'る', 'れば', 'よう'] };
const RUNG: { v: string; tr: Tr }[] = [
  { v: 'a', tr: tr('not', 'négatif', 'negativo', '否定') },
  { v: 'i', tr: tr('polite', 'poli', 'cortés', '礼貌') },
  { v: 'u', tr: tr('dictionary', 'dictionnaire', 'diccionario', '词典形') },
  { v: 'e', tr: tr('if', 'si', 'si', '如果') },
  { v: 'o', tr: tr('let’s', 'allons', 'vamos a', '一起吧') },
];

export function LadderScene({ step }: SceneProps) {
  const { lang } = useT();
  const [id, setId] = useStepped(step >= 3 ? 'taberu' : step === 2 ? 'kau' : 'kaku', step);
  const [rung, setRung] = useStepped(step === 1 || step === 2 ? 0 : 2, step);
  const ichidan = id === 'taberu';
  const v = LADDER_VERBS.find((x) => x.id === id) ?? LADDER_VERBS[0];
  const items = [...LADDER_VERBS.map((x) => ({ key: x.id, label: <span lang="ja">{x.dict}</span> })), { key: 'taberu', label: <span lang="ja">{ICHIDAN.dict}</span> }];
  return (
    <>
      <div className="vg-ladder">
        <div className="vg-rungs" role="group" aria-label="a i u e o">
          {RUNG.map((r, i) => (
            <button key={r.v} className={`vg-rung ${i === rung ? 'on' : ''}`} aria-pressed={i === rung} onClick={() => setRung(i)}>
              <b lang="ja">{ichidan ? '・' : v.row[i]}</b><small>{r.v} · {r.tr[lang]}</small>
            </button>
          ))}
          {!ichidan && <span className="vg-cursor" style={{ transform: `translateY(${rung * 100}%)` }} aria-hidden="true" />}
        </div>
        <div className="vg-result" aria-live="polite" lang="ja">
          {ichidan
            ? <><span className="vg-stem"><J w="食" k="た" />べ</span><span className="vg-end2" key={rung}>{ICHIDAN.ends[rung]}</span></>
            : <><span className="vg-stem"><J w={v.stem} k={v.stemKana} /></span><span className="vg-mov" key={`${id}${rung}`}>{v.row[rung]}</span><span className="vg-end2">{LADDER_ENDS[rung]}</span></>}
        </div>
      </div>
      <input className="vg-wide" type="range" min="0" max="4" step="1" value={rung} aria-label="a i u e o" onChange={(e) => setRung(+e.target.value)} />
      <Chips label={CH.verbs[lang]} value={id} onPick={setId} items={items} />
    </>
  );
}

/* 4. The て-form funnel ----------------------------------------------------------------------- */
export const FUNNEL = [
  { end: 'う', verb: '買う', te: '買って', out: 0 }, { end: 'つ', verb: '待つ', te: '待って', out: 0 }, { end: 'る', verb: '帰る', te: '帰って', out: 0 },
  { end: 'む', verb: '飲む', te: '飲んで', out: 1 }, { end: 'ぶ', verb: '呼ぶ', te: '呼んで', out: 1 }, { end: 'ぬ', verb: '死ぬ', te: '死んで', out: 1 },
  { end: 'く', verb: '書く', te: '書いて', out: 2 }, { end: 'ぐ', verb: '泳ぐ', te: '泳いで', out: 3 }, { end: 'す', verb: '話す', te: '話して', out: 4 },
];
const OUTS = ['って', 'んで', 'いて', 'いで', 'して'];
const FN: Record<string, Tr> = {
  past: tr('Show the past form', 'Voir le passé', 'Ver el pasado', '看过去式'),
  te: tr('Show the て-form', 'Voir la forme て', 'Ver la forma て', '看て形'),
  odd: tr('The one exception', 'L’unique exception', 'La única excepción', '唯一的例外'),
};
const STEP_FUNNEL = [0, 3, 6, 8];

export function FunnelScene({ step }: SceneProps) {
  const { lang } = useT();
  const [i, setI] = useStepped(STEP_FUNNEL[step] ?? 0, step);
  const [past, setPast] = useStepped(false, step);
  const odd = i === 9;
  const it = odd ? { end: 'く', verb: '行く', te: '行って', out: 0 } : FUNNEL[i];
  const y = (n: number, count: number) => 8 + (n + 0.5) * (324 / count);
  const from = odd ? 6 : i;
  const swap = (s: string) => (past ? s.replace(/て$/, 'た').replace(/で$/, 'だ') : s);
  return (
    <>
      <svg className="vg-funnel" viewBox="0 0 360 340" role="group" aria-label={`${it.verb} ${swap(it.te)}`}>
        {FUNNEL.map((f, n) => (
          <path key={n} className={`vg-flow ${f.out === it.out && !odd ? 'on' : ''}`}
            d={`M62 ${y(n, 9)} C180 ${y(n, 9)} 180 ${y(f.out, 5)} 280 ${y(f.out, 5)}`} />
        ))}
        {odd && <path className="vg-flow odd" d={`M62 ${y(6, 9)} C180 ${y(6, 9)} 180 ${y(0, 5)} 280 ${y(0, 5)}`} />}
        {FUNNEL.map((f, n) => (
          <g key={f.verb} className={`vg-node ${n === from ? 'on' : ''}`} role="button" tabIndex={0} aria-pressed={n === from} aria-label={f.verb}
            onClick={() => setI(n)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setI(n); } }}>
            <circle cx="40" cy={y(n, 9)} r="16" />
            <text x="40" y={y(n, 9) + 6} lang="ja">{f.end}</text>
          </g>
        ))}
        {OUTS.map((o, n) => (
          <g key={o} className={`vg-out ${n === it.out ? 'on' : ''}`}>
            <rect x="280" y={y(n, 5) - 20} width="72" height="40" rx="14" />
            <text x="316" y={y(n, 5) + 6} lang="ja">{swap(o)}</text>
          </g>
        ))}
      </svg>
      <div className="vg-sentence" lang="ja" aria-live="polite">{it.verb} <span aria-hidden="true">→</span> <b key={swap(it.te)} className="pop">{swap(it.te)}</b></div>
      <div className="row vg-actions">
        <button className="btn small" onClick={() => setPast(!past)}>{(past ? FN.te : FN.past)[lang]}</button>
        <button className={`btn small ghost`} aria-pressed={odd} onClick={() => setI(9)}><span lang="ja">行く</span> · {FN.odd[lang]}</button>
      </div>
    </>
  );
}

/* 5. The timeline ---------------------------------------------------------------------------- */
const TIME: Record<string, Tr> = {
  now: tr('Drag “now” along time', 'Fais glisser « maintenant »', 'Arrastra «ahora»', '拖动“现在”'),
  nowTag: tr('now', 'maintenant', 'ahora', '现在'),
  eat: tr('eating (an action that lasts)', 'manger (une action qui dure)', 'comer (una acción que dura)', '吃（持续的动作）'),
  marry: tr('marrying (a change)', 'se marier (un changement)', 'casarse (un cambio)', '结婚（一次变化）'),
  willEat: tr('will eat, has not started', 'va manger, pas encore commencé', 'va a comer, aún no empieza', '将要吃，还没开始'),
  eating: tr('is eating right now', 'est en train de manger', 'está comiendo ahora', '正在吃'),
  ate: tr('ate, it is over', 'a mangé, c’est fini', 'comió, ya acabó', '吃过了，已结束'),
  willMarry: tr('will marry', 'va se marier', 'se va a casar', '将要结婚'),
  married: tr('married: the moment just happened', 'marié : le moment vient d’arriver', 'se casó: acaba de ocurrir', '结婚了：那一刻刚发生'),
  isMarried: tr('is married: the result continues', 'est marié : le résultat continue', 'está casado: el resultado continúa', '已婚：结果在持续'),
};
export const TIMELINE = {
  eat: { dict: '食べる', during: '食べている', after: '食べた' },
  marry: { dict: '結婚する', moment: '結婚した', after: '結婚している' },
};

export function TimeScene({ step }: SceneProps) {
  const { lang } = useT();
  const [verb, setVerb] = useStepped<'eat' | 'marry'>(step >= 2 ? 'marry' : 'eat', step);
  const [now, setNow] = useStepped(step === 0 ? 15 : step === 1 ? 50 : step === 2 ? 50 : 80, step);
  const eat = verb === 'eat';
  const [form, note] = eat
    ? now < 35 ? [TIMELINE.eat.dict, TIME.willEat] : now <= 65 ? [TIMELINE.eat.during, TIME.eating] : [TIMELINE.eat.after, TIME.ate]
    : now < 47 ? [TIMELINE.marry.dict, TIME.willMarry] : now <= 53 ? [TIMELINE.marry.moment, TIME.married] : [TIMELINE.marry.after, TIME.isMarried];
  const zone = (x0: number, x1: number, cls: string) => <div className={`vg-zone ${cls}`} style={{ left: `${x0}%`, width: `${x1 - x0}%` }} />;
  return (
    <>
      <div className="vg-big" lang="ja" aria-live="polite"><span key={form} className="pop">{form}</span></div>
      <p className="vg-meaning">{note[lang]}</p>
      <div className="vg-line">
        {eat ? zone(35, 65, 'act') : <>{zone(50, 100, 'state')}{zone(49, 51, 'act')}</>}
        <div className="vg-now" style={{ left: `${now}%` }}><span>{TIME.nowTag[lang]}</span></div>
        <span className="vg-emoji" style={{ left: eat ? '50%' : '50%' }} aria-hidden="true">{eat ? '🍙' : '💍'}</span>
      </div>
      <input className="vg-wide" type="range" min="0" max="100" value={now} aria-label={TIME.now[lang]} onChange={(e) => setNow(+e.target.value)} />
      <Chips label={CH.verbs[lang]} value={verb} onPick={setVerb} items={[{ key: 'eat', label: TIME.eat[lang] }, { key: 'marry', label: TIME.marry[lang] }]} />
    </>
  );
}

/* 6. Nesting: everything grows to the left ---------------------------------------------------- */
export const NEST: { add: ReactNode; text: string; tr: Tr }[] = [
  { add: <J w="本" k="ほん" />, text: '本', tr: tr('a book', 'un livre', 'un libro', '书') },
  { add: <><J w="面白" k="おもしろ" />い</>, text: '面白い本', tr: tr('an interesting book', 'un livre intéressant', 'un libro interesante', '有趣的书') },
  { add: <><J w="昨日" k="きのう" /><J w="買" k="か" />った</>, text: '昨日買った面白い本', tr: tr('an interesting book I bought yesterday', 'un livre intéressant acheté hier', 'un libro interesante que compré ayer', '昨天买的有趣的书') },
  { add: <><J w="友" k="とも" />だちが</>, text: '友だちが昨日買った面白い本', tr: tr('an interesting book a friend bought yesterday', 'un livre intéressant qu’un ami a acheté hier', 'un libro interesante que un amigo compró ayer', '朋友昨天买的有趣的书') },
];
const NEST_LABEL = tr('Add detail', 'Ajouter un détail', 'Añadir detalle', '增加细节');

export function NestScene({ step }: SceneProps) {
  const { lang } = useT();
  const [depth, setDepth] = useStepped(Math.min(step, 3), step);
  let box: ReactNode = <span className="vg-head">{NEST[0].add}</span>;
  for (let i = 1; i <= depth; i++) {
    box = <span className={`vg-nest n${i}`} key={i}><span className="vg-add pop">{NEST[i].add}</span>{box}</span>;
  }
  return (
    <>
      <div className="vg-nest-wrap" lang="ja">{box}</div>
      <p className="vg-meaning" aria-live="polite">{NEST[depth].tr[lang]}</p>
      <input className="vg-wide" type="range" min="0" max="3" step="1" value={depth} aria-label={NEST_LABEL[lang]} onChange={(e) => setDepth(+e.target.value)} />
    </>
  );
}

/* 7. Politeness: who stands higher? ----------------------------------------------------------- */
type Level = 'plain' | 'polite' | 'up' | 'down';
export const KEIGO: { id: string; forms: Record<Level, string>; tr: Tr }[] = [
  { id: 'eat', forms: { plain: '食べる', polite: '食べます', up: '召し上がります', down: 'いただきます' }, tr: tr('eat', 'manger', 'comer', '吃') },
  { id: 'go', forms: { plain: '行く', polite: '行きます', up: 'いらっしゃいます', down: '参ります' }, tr: tr('go', 'aller', 'ir', '去') },
  { id: 'say', forms: { plain: '言う', polite: '言います', up: 'おっしゃいます', down: '申します' }, tr: tr('say', 'dire', 'decir', '说') },
  { id: 'see', forms: { plain: '見る', polite: '見ます', up: 'ご覧になります', down: '拝見します' }, tr: tr('see', 'voir', 'ver', '看') },
];
const LV: Record<Level, Tr> = {
  plain: tr('Casual', 'Familier', 'Informal', '简体'),
  polite: tr('Polite', 'Poli', 'Cortés', '礼貌体'),
  up: tr('Respectful: raise them', 'Respectueux : l’élever', 'Respetuoso: elevar al otro', '尊敬语：抬高对方'),
  down: tr('Humble: lower yourself', 'Humble : s’abaisser', 'Humilde: bajarse uno', '谦让语：放低自己'),
};
const LV_OTHER = tr('They do it', 'L’autre le fait', 'Lo hace el otro', '对方做');
const LV_ME = tr('You do it', 'Toi, tu le fais', 'Lo haces tú', '自己做');
const LV_STEP: Level[] = ['plain', 'polite', 'up', 'down'];

export function KeigoScene({ step }: SceneProps) {
  const { lang } = useT();
  const [lv, setLv] = useStepped<Level>(LV_STEP[step] ?? 'up', step);
  const [id, setId] = useStepped('eat', step);
  const k = KEIGO.find((x) => x.id === id)!;
  const me = lv === 'down' ? 34 : 0, them = lv === 'up' ? -34 : 0;
  return (
    <>
      <div className="vg-stage-keigo" aria-hidden="true">
        <div className="vg-level" />
        <span className="vg-person" style={{ transform: `translateY(${me}px) rotate(${lv === 'plain' ? 0 : lv === 'polite' ? 10 : 22}deg)` }}>🐱<small>{lv === 'down' ? LV_ME[lang] : ' '}</small></span>
        <span className="vg-person" style={{ transform: `translateY(${them}px)` }}>🦉<small>{lv === 'up' ? LV_OTHER[lang] : ' '}</small></span>
      </div>
      <div className="vg-big" lang="ja" aria-live="polite"><span key={k.forms[lv]} className="pop">{k.forms[lv]}</span></div>
      <p className="vg-meaning">{k.tr[lang]} · {LV[lv][lang]}</p>
      <Chips label={CH.level[lang]} value={lv} onPick={setLv} items={LV_STEP.map((x) => ({ key: x, label: LV[x][lang] }))} />
      <Chips label={CH.verbs[lang]} value={id} onPick={setId} items={KEIGO.map((x) => ({ key: x.id, label: <span lang="ja">{x.forms.plain}</span> }))} />
    </>
  );
}

/* 8. は and が: where is the spotlight? --------------------------------------------------------- */
const SPOT: { key: string; q: string; parts: { t: ReactNode; lit?: boolean }[]; tr: Tr; note: Tr }[] = [
  { key: 'ga', q: 'だれが来ましたか。', parts: [{ t: <><J w="田中" k="たなか" />さん<b>が</b></>, lit: true }, { t: <><J w="来" k="き" />ました。</> }],
    tr: tr('Who came? Tanaka did.', 'Qui est venu ? C’est Tanaka.', '¿Quién vino? Vino Tanaka.', '谁来了？是田中来了。'),
    note: tr('The person is the new news.', 'La personne est la nouveauté.', 'La persona es la novedad.', '“人”是新信息。') },
  { key: 'wa', q: '田中さんは？', parts: [{ t: <><J w="田中" k="たなか" />さん<b>は</b></> }, { t: <><J w="来" k="き" />ました。</>, lit: true }],
    tr: tr('And Tanaka? Tanaka came.', 'Et Tanaka ? Tanaka est venu.', '¿Y Tanaka? Tanaka vino.', '田中呢？田中来了。'),
    note: tr('Tanaka is already known. What happened is the news.', 'Tanaka est déjà connu. La nouveauté, c’est ce qui s’est passé.', 'Tanaka ya se conoce. La novedad es lo que pasó.', '田中是已知的，新信息是发生了什么。') },
  { key: 'both', q: '象について', parts: [{ t: <><J w="象" k="ぞう" /><b>は</b></> }, { t: <><J w="鼻" k="はな" /><b>が</b><J w="長" k="なが" />い。</>, lit: true }],
    tr: tr('As for elephants, their noses are long.', 'Quant aux éléphants, leur nez est long.', 'En cuanto a los elefantes, su trompa es larga.', '说到大象，鼻子很长。'),
    note: tr('は sets the stage, then が works inside it.', 'は pose le décor, puis が agit à l’intérieur.', 'は pone el escenario y が actúa dentro.', 'は 搭好舞台，が 在舞台里发挥作用。') },
  { key: 'contrast', q: 'お肉と魚は？', parts: [{ t: <><J w="肉" k="にく" /><b>は</b><J w="食" k="た" />べますが、</>, lit: true }, { t: <><J w="魚" k="さかな" /><b>は</b><J w="食" k="た" />べません。</>, lit: true }],
    tr: tr('I eat meat, but not fish.', 'Je mange de la viande, mais pas de poisson.', 'Como carne, pero no pescado.', '我吃肉，但不吃鱼。'),
    note: tr('Two は side by side make a contrast.', 'Deux は côte à côte créent un contraste.', 'Dos は juntos crean un contraste.', '两个 は 并列，形成对比。') },
];
const QA = tr('Question', 'Question', 'Pregunta', '问题');

export function SpotScene({ step }: SceneProps) {
  const { lang } = useT();
  const [key, setKey] = useStepped(SPOT[Math.min(step, 3)].key, step);
  const s = SPOT.find((x) => x.key === key)!;
  return (
    <>
      <p className="vg-ask" lang="ja"><small>{QA[lang]}</small> {s.q}</p>
      <div className="vg-spot" lang="ja" key={key}>
        {s.parts.map((p, i) => <span key={i} className={p.lit ? 'lit' : 'dim'}>{p.t}</span>)}
      </div>
      <p className="vg-meaning" aria-live="polite">{s.tr[lang]}</p>
      <p className="note">💡 {s.note[lang]}</p>
      <Chips label={CH.examples[lang]} value={key} onPick={setKey} items={SPOT.map((x, i) => ({ key: x.key, label: `${i + 1}` }))} />
    </>
  );
}

export type { Lang };
