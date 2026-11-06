import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import geo from '../data/life/japan-map.json';
import { PREFECTURES, REGION_LIST, prefectureById, type Prefecture, type RegionId } from '../data/life/prefectures';
import { useT, type Lang } from '../lib/i18n';
import { useStore } from '../lib/store';
import { Feedback, Mascot, Quiz, SpeakButton, shuffle, type QuizApi } from '../ui/parts';
import './JapanMap.css';

interface Shape { c: number[]; b: number[]; d: string }
const MAP = geo as { width: number; height: number; inset: { x: number; y: number; w: number; h: number }; prefectures: Record<string, Shape> };

const ROUNDS = 10;
const MAX_ZOOM = 5;

const S: Record<string, Record<Lang, string>> = {
  map: {
    en: 'Map of the 47 prefectures of Japan. Arrow keys move between prefectures, Enter chooses one.',
    fr: 'Carte des 47 préfectures du Japon. Les flèches passent d\'une préfecture à l\'autre, Entrée en choisit une.',
    es: 'Mapa de las 47 prefecturas de Japón. Las flechas mueven entre prefecturas y Enter elige una.',
    zh: '日本47个都道府县地图。用方向键移动，按回车键选择。',
  },
  regions: { en: 'Regions', fr: 'Régions', es: 'Regiones', zh: '地方' },
  all: { en: 'All Japan', fr: 'Tout le Japon', es: 'Todo Japón', zh: '全日本' },
  hint: {
    en: 'Tap a prefecture to meet it.',
    fr: 'Touche une préfecture pour la découvrir.',
    es: 'Toca una prefectura para conocerla.',
    zh: '点击地图上的一个地方来认识它。',
  },
  tip: {
    en: 'Tiny prefecture? Pick a region to zoom in.',
    fr: 'Préfecture minuscule ? Choisis une région pour zoomer.',
    es: '¿Prefectura diminuta? Elige una región para acercar.',
    zh: '地方太小？选择一个地区来放大。',
  },
  simplified: {
    en: 'This is a simplified study map, not a statement about borders. Some smaller and outlying islands are left out, including the Northern Territories (Southern Kurils), Takeshima (Dokdo), the Senkaku Islands (Diaoyu Islands), Amami and Ogasawara. Okinawa is moved into a box and its shape is only a sketch.',
    fr: "Ceci est une carte d'étude simplifiée, pas une prise de position sur les frontières. Certaines petites îles et îles éloignées n'y figurent pas, dont les Territoires du Nord (Kouriles du Sud), Takeshima (Dokdo), les îles Senkaku (îles Diaoyu), Amami et Ogasawara. Okinawa est placée dans un encadré et sa forme n'est qu'une esquisse.",
    es: 'Este es un mapa de estudio simplificado, no una declaración sobre fronteras. Se omiten algunas islas pequeñas y alejadas, entre ellas los Territorios del Norte (Kuriles del Sur), Takeshima (Dokdo), las islas Senkaku (islas Diaoyu), Amami y Ogasawara. Okinawa aparece en un recuadro y su forma es solo un esbozo.',
    zh: '这是一张简化的学习地图，不代表对边界的任何立场。图中省略了部分较小和偏远的岛屿，包括北方领土（南千岛群岛）、竹岛（独岛）、尖阁诸岛（钓鱼岛）、奄美群岛和小笠原群岛。冲绳被移到方框内，形状仅为示意。',
  },
  region: { en: 'Region', fr: 'Région', es: 'Región', zh: '地区' },
  capital: { en: 'Capital', fr: 'Chef-lieu', es: 'Capital', zh: '首府' },
  known: { en: 'Known for', fr: 'Connue pour', es: 'Conocida por', zh: '著名之处' },
  list: { en: 'List of prefectures', fr: 'Liste des préfectures', es: 'Lista de prefecturas', zh: '都道府县列表' },
  game: { en: 'Find it!', fr: 'Trouve-la !', es: '¡Encuéntrala!', zh: '找一找！' },
  gameDesc: {
    en: 'Read the name, then tap the place on the map. 10 rounds.',
    fr: 'Lis le nom, puis touche le bon endroit sur la carte. 10 manches.',
    es: 'Lee el nombre y toca el lugar en el mapa. 10 rondas.',
    zh: '看名字，然后在地图上点击对应的位置。共10轮。',
  },
  find: { en: 'Find this place', fr: 'Trouve cet endroit', es: 'Encuentra este lugar', zh: '找到这个地方' },
};

const shape = (id: string) => MAP.prefectures[id];

/** Move and scale the map so one region fills the view. Works on the drawing, so it can animate. */
function zoomOn(region: RegionId | null) {
  if (!region) return 'translate(0px, 0px) scale(1)';
  const boxes = PREFECTURES.filter((x) => x.region === region).map((x) => shape(x.id).b);
  const pad = 22;
  const x0 = Math.min(...boxes.map((b) => b[0])) - pad, y0 = Math.min(...boxes.map((b) => b[1])) - pad;
  const x1 = Math.max(...boxes.map((b) => b[2])) + pad, y1 = Math.max(...boxes.map((b) => b[3])) + pad;
  const s = Math.min(MAP.width / (x1 - x0), MAP.height / (y1 - y0), MAX_ZOOM);
  const tx = (MAP.width - (x1 - x0) * s) / 2 - x0 * s;
  const ty = (MAP.height - (y1 - y0) * s) / 2 - y0 * s;
  return `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${s.toFixed(3)})`;
}

/** The prefecture whose centre lies best in the direction of the arrow key. */
function nextInDirection(from: string, key: string, ids: string[]) {
  const [dx, dy] = ({ ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] } as Record<string, number[]>)[key];
  const [x, y] = shape(from).c;
  let best: string | null = null;
  let bestScore = Infinity;
  for (const id of ids) {
    if (id === from) continue;
    const vx = shape(id).c[0] - x, vy = shape(id).c[1] - y;
    const along = vx * dx + vy * dy;
    if (along <= 0) continue;
    const score = along + 2 * Math.abs(vx * dy - vy * dx);
    if (score < bestScore) { bestScore = score; best = id; }
  }
  return best;
}

function MapView({ region, selected, good, bad, onPick }: {
  region: RegionId | null;
  selected?: string | null;
  good?: string | null;
  bad?: string | null;
  onPick: (id: string) => void;
}) {
  const { lang } = useT();
  const nodes = useRef(new Map<string, SVGPathElement>());
  const [focused, setFocused] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const reachable = PREFECTURES.filter((x) => !region || x.region === region).map((x) => x.id);
  const tabStop = [cursor, selected].find((id) => id && reachable.includes(id)) ?? reachable[0];

  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(id); return; }
    if (!e.key.startsWith('Arrow')) return;
    e.preventDefault();
    const to = nextInDirection(id, e.key, reachable);
    if (to) { setCursor(to); nodes.current.get(to)?.focus(); }
  };
  const overlay = (id: string | null | undefined, kind: string) =>
    id ? <path className={`jm-over jm-${kind}`} d={shape(id).d} aria-hidden="true" /> : null;

  return (
    <div className="jm-map">
      <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} role="group" aria-label={S.map[lang]}>
        <g className="jm-zoom" style={{ transform: zoomOn(region) }}>
          <g className={region && region !== 'kyushu' ? 'jm-dim' : undefined} aria-hidden="true">
            <rect className="jm-inset" x={MAP.inset.x} y={MAP.inset.y} width={MAP.inset.w} height={MAP.inset.h} rx="20" />
            <text className="jm-inset-label" x={MAP.inset.x + 14} y={MAP.inset.y + 36} lang="ja">沖縄</text>
          </g>
          {PREFECTURES.map((x) => (
            <path key={x.id} ref={(n) => { if (n) nodes.current.set(x.id, n); else nodes.current.delete(x.id); }}
              className={`jm-p jm-r-${x.region}${region && x.region !== region ? ' jm-dim' : ''}`}
              d={shape(x.id).d} role="button" tabIndex={x.id === tabStop ? 0 : -1}
              aria-label={`${x.name[lang]}, ${x.written}`} aria-pressed={selected === x.id}
              onClick={() => { setCursor(x.id); onPick(x.id); }}
              onKeyDown={(e) => onKey(e, x.id)}
              onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) setFocused(x.id); }}
              onBlur={() => setFocused(null)} />
          ))}
          {overlay(selected, 'selected')}
          {overlay(good, 'good')}
          {overlay(bad, 'bad')}
          {overlay(focused, 'focus')}
        </g>
      </svg>
    </div>
  );
}

function RegionChips({ region, onChange }: { region: RegionId | null; onChange: (r: RegionId | null) => void }) {
  const { lang } = useT();
  return (
    <div className="chips jm-chips" role="group" aria-label={S.regions[lang]}>
      <button className={`chip ${region === null ? 'on' : ''}`} aria-pressed={region === null} onClick={() => onChange(null)}>{S.all[lang]}</button>
      {REGION_LIST.map((r) => (
        <button key={r.id} className={`chip ${region === r.id ? 'on' : ''}`} aria-pressed={region === r.id} onClick={() => onChange(r.id)}>
          <span className={`jm-dot jm-r-${r.id}`} aria-hidden="true" />{r.name[lang]}
        </button>
      ))}
    </div>
  );
}

const Name = ({ x }: { x: { written: string; kana: string } }) => (
  <ruby lang="ja">{x.written}<rt>{x.kana}</rt></ruby>
);

function Detail({ pref }: { pref: Prefecture | null }) {
  const { lang } = useT();
  if (!pref) {
    return (
      <div className="card jm-detail jm-empty" aria-live="polite">
        <Mascot mood="idle" size={64} />
        <p>{S.hint[lang]}</p>
      </div>
    );
  }
  const region = REGION_LIST.find((r) => r.id === pref.region)!;
  return (
    <div className="card jm-detail" aria-live="polite">
      <div className="jm-title">
        <span className="emoji-mid" aria-hidden="true">{pref.emoji}</span>
        <div className="jm-name">
          <span className="jm-big"><Name x={pref} /></span>
          <span className="jm-local">{pref.name[lang]}</span>
        </div>
        <SpeakButton text={pref.kana} />
      </div>
      <dl className="jm-facts">
        <div>
          <dt>{S.region[lang]}</dt>
          <dd><span className={`jm-dot jm-r-${pref.region}`} aria-hidden="true" /><Name x={region} /><small>{region.name[lang]}</small></dd>
        </div>
        <div>
          <dt>{S.capital[lang]}</dt>
          <dd><Name x={pref.capital} /></dd>
        </div>
      </dl>
      <h3>{S.known[lang]}</h3>
      <p>{pref.knownFor[lang]}</p>
    </div>
  );
}

function FindRound({ target, zoom, setZoom, api, onStop }: {
  target: Prefecture;
  zoom: RegionId | null;
  setZoom: (r: RegionId | null) => void;
  api: QuizApi;
  onStop: () => void;
}) {
  const { t, lang } = useT();
  const { score } = useStore();
  const [picked, setPicked] = useState<string | null>(null);
  const tap = (id: string) => {
    if (api.answered) return;
    const ok = id === target.id;
    setPicked(id);
    api.answer(ok);
    score('reading', ok);
  };
  // After a wrong guess the answer must be on screen, even when zoomed into another region.
  const region = api.answered && zoom !== target.region ? null : zoom;
  return (
    <div className="jm-round">
      <div className="card jm-prompt">
        <div className="jm-name">
          <small>{S.find[lang]}</small>
          <span className="jm-big" aria-live="polite"><Name x={target} /></span>
          <span className="jm-local">{target.name[lang]}</span>
        </div>
        <SpeakButton text={target.kana} />
      </div>
      <MapView region={region} good={api.answered ? target.id : null} bad={picked !== target.id ? picked : null} onPick={tap} />
      <Feedback api={api} answer={<>{target.written} · {target.name[lang]}</>} />
      <RegionChips region={zoom} onChange={setZoom} />
      <p className="note">{S.tip[lang]}</p>
      <button className="btn small ghost" onClick={onStop}>{t('finish')}</button>
    </div>
  );
}

function FindGame({ onExit }: { onExit: () => void }) {
  const [seed, setSeed] = useState(0);
  const [zoom, setZoom] = useState<RegionId | null>(null);
  const items = useMemo(() => shuffle(PREFECTURES).slice(0, ROUNDS), [seed]);
  return (
    <Quiz total={items.length} onExit={onExit} onReset={() => { setZoom(null); setSeed((s) => s + 1); }}
      render={(i, api) => <FindRound key={`${seed}-${i}`} target={items[i]} zoom={zoom} setZoom={setZoom} api={api} onStop={onExit} />} />
  );
}

export function JapanMap() {
  const { lang } = useT();
  const [region, setRegion] = useState<RegionId | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [game, setGame] = useState(false);
  const pref = selected ? prefectureById(selected) ?? null : null;
  const listed = PREFECTURES.filter((x) => !region || x.region === region);

  if (game) return <section className="jm"><FindGame onExit={() => setGame(false)} /></section>;

  const chooseRegion = (r: RegionId | null) => {
    setRegion(r);
    if (r && pref && pref.region !== r) setSelected(null);
  };
  return (
    <section className="jm">
      <div className="jm-layout">
        <div className="jm-main">
          <MapView region={region} selected={selected} onPick={setSelected} />
          <RegionChips region={region} onChange={chooseRegion} />
          <p className="note">{S.tip[lang]}</p>
          <p className="note">{S.simplified[lang]}</p>
        </div>
        <div className="jm-side">
          <Detail pref={pref} />
          <button className="btn wide" onClick={() => setGame(true)}>🎯 {S.game[lang]}</button>
          <p className="note">{S.gameDesc[lang]}</p>
          <details className="jm-list">
            <summary>{S.list[lang]} ({listed.length})</summary>
            <div className="chips">
              {listed.map((x) => (
                <button key={x.id} className={`chip ${selected === x.id ? 'on' : ''}`} aria-pressed={selected === x.id} onClick={() => setSelected(x.id)}>
                  <span lang="ja">{x.written}</span> <small>{x.name[lang]}</small>
                </button>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
