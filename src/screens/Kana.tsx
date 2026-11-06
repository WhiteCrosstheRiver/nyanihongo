import { useEffect, useMemo, useRef, useState } from 'react';
import { KANA_GRID, KANA_LIST } from '../data/kana';
import strokesJson from '../data/strokes.json';
import { useT } from '../lib/i18n';
import { useStore } from '../lib/store';
import { speak } from '../lib/audio';
import { Choices, Feedback, Header, Quiz, pick, shuffle } from '../ui/parts';

const STROKES = strokesJson as Record<string, string[]>;
type Script = 'hira' | 'kata';
type Tab = 'chart' | 'quiz' | 'trace';

export function KanaScreen() {
  const { t } = useT();
  const [script, setScript] = useState<Script>('hira');
  const [tab, setTab] = useState<Tab>('chart');
  const [traceChar, setTraceChar] = useState<string | null>(null);
  return (
    <div>
      <Header title={t('kana')} />
      <div className="seg" role="tablist">
        <button className={script === 'hira' ? 'on' : ''} onClick={() => setScript('hira')}>{t('hiragana')}</button>
        <button className={script === 'kata' ? 'on' : ''} onClick={() => setScript('kata')}>{t('katakana')}</button>
      </div>
      <div className="seg" role="tablist">
        {(['chart', 'quiz', 'trace'] as Tab[]).map((x) => (
          <button key={x} className={tab === x ? 'on' : ''} onClick={() => setTab(x)}>{t(x)}</button>
        ))}
      </div>
      {tab === 'chart' && (
        <div className="kana-grid" lang="ja">
          {KANA_GRID.flat().map((k, i) => k ? (
            <button key={i} className="kana-cell" onClick={() => speak(k.hira)}
              onContextMenu={(e) => { e.preventDefault(); setTraceChar(k[script]); setTab('trace'); }}>
              <b>{k[script]}</b><small>{k.romaji}</small>
            </button>
          ) : <span key={i} />)}
        </div>
      )}
      {tab === 'quiz' && <KanaQuiz key={script} script={script} onExit={() => setTab('chart')} />}
      {tab === 'trace' && <Trace key={script} script={script} initial={traceChar} />}
    </div>
  );
}

function KanaQuiz({ script, onExit }: { script: Script; onExit: () => void }) {
  const { t } = useT();
  const { score } = useStore();
  const items = useMemo(() => shuffle(KANA_LIST).slice(0, 10), []);
  return (
    <Quiz total={10} onExit={onExit} render={(i, api) => {
      const k = items[i];
      const pool = [...new Set(KANA_LIST.map((x) => x.romaji))].filter((r) => r !== k.romaji);
      return <KanaQ key={i} prompt={t('kanaQuizHint')} char={k[script]} answer={k.romaji} pool={pool} api={api} onPick={(ok) => score('kana', ok)} />;
    }} />
  );
}

function KanaQ({ prompt, char, answer, pool, api, onPick }: { prompt: string; char: string; answer: string; pool: string[]; api: any; onPick: (ok: boolean) => void }) {
  const options = useMemo(() => shuffle([answer, ...shuffle(pool).slice(0, 3)]).map((r) => ({ key: r, label: r })), [answer, pool]);
  return (
    <div className="card q">
      <p className="q-hint">{prompt}</p>
      <div className="q-main huge" lang="ja">{char}</div>
      <Choices options={options} answer={answer} api={api} onPick={onPick} />
      <Feedback api={api} answer={api.correct ? undefined : answer} />
    </div>
  );
}

function Trace({ script, initial }: { script: Script; initial: string | null }) {
  const { t } = useT();
  const list = useMemo(() => KANA_LIST.map((k) => k[script]), [script]);
  const [ch, setCh] = useState(initial && list.includes(initial) ? initial : pick(list));
  const [lines, setLines] = useState<string[]>([]);
  const [run, setRun] = useState(0);
  const svg = useRef<SVGSVGElement>(null);
  const drawing = useRef(false);
  const paths = STROKES[ch] ?? [];

  useEffect(() => setLines([]), [ch]);

  const point = (e: React.PointerEvent) => {
    const r = svg.current!.getBoundingClientRect();
    return `${((e.clientX - r.left) / r.width * 109).toFixed(1)},${((e.clientY - r.top) / r.height * 109).toFixed(1)}`;
  };
  return (
    <div className="card trace">
      <p className="q-hint">{t('tracePrompt')} · {paths.length} {t('strokeOf')}</p>
      <svg ref={svg} viewBox="0 0 109 109" className="trace-pad" role="img" aria-label={ch}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); drawing.current = true; setLines((l) => [...l, point(e)]); }}
        onPointerMove={(e) => { if (drawing.current) { const q = point(e); setLines((l) => [...l.slice(0, -1), `${l[l.length - 1]} ${q}`]); } }}
        onPointerUp={() => { drawing.current = false; }}>
        <path d="M54.5 0V109M0 54.5H109" className="guide" />
        <g key={`${ch}${run}`}>
          {paths.map((d, i) => <path key={i} d={d} pathLength={1} className="stroke" style={{ animationDelay: `${i * 0.7}s` }} />)}
        </g>
        {lines.map((l, i) => <polyline key={i} points={l} className="ink" />)}
      </svg>
      <div className="row center">
        <button className="btn ghost" onClick={() => { setLines([]); setRun((r) => r + 1); }}>{t('replay')}</button>
        <button className="btn ghost" onClick={() => setLines([])}>{t('clear')}</button>
        <button className="btn" onClick={() => setCh(pick(list.filter((c) => c !== ch)))}>{t('next')}</button>
      </div>
      <div className="kana-strip" lang="ja">
        {list.map((c) => <button key={c} className={c === ch ? 'on' : ''} onClick={() => setCh(c)}>{c}</button>)}
      </div>
    </div>
  );
}
