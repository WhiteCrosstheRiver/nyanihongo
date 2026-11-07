import { useState, type KeyboardEvent } from 'react';
import { FESTIVAL_DATA, SEASONS, type Festival } from '../data/life/calendar';
import { prefectureById } from '../data/life/prefectures';
import { tr } from '../data/life/types';
import { useT, type Lang } from '../lib/i18n';
import { SpeakButton } from '../ui/parts';
import './Folk.css';

const MONTH_KANA = ['いちがつ', 'にがつ', 'さんがつ', 'しがつ', 'ごがつ', 'ろくがつ', 'しちがつ', 'はちがつ', 'くがつ', 'じゅうがつ', 'じゅういちがつ', 'じゅうにがつ'];
const PART = {
  early: tr('early', 'début', 'principios de', '上旬'), mid: tr('mid', 'mi-', 'mediados de', '中旬'), late: tr('late', 'fin', 'finales de', '下旬'),
  varies: tr('date varies', 'date variable', 'fecha variable', '日期不定'), all: tr('all month', 'tout le mois', 'todo el mes', '整月'),
};
const S = {
  wheel: tr('Year wheel of Japanese festivals. Choose a month.', 'Roue de l’année des fêtes japonaises. Choisis un mois.', 'Rueda del año de fiestas japonesas. Elige un mes.', '日本节庆年轮，请选择月份。'),
  title: tr('The year wheel', 'La roue de l’année', 'La rueda del año', '节庆年轮'),
  hint: tr('Turn to any month. Each dot is a festival or custom.', 'Choisis un mois. Chaque point est une fête ou une coutume.', 'Elige un mes. Cada punto es una fiesta o costumbre.', '选一个月份，每个点都是一项祭典或习俗。'),
  everywhere: tr('All over Japan', 'Partout au Japon', 'Por todo Japón', '日本各地'),
  note: tr('Dates change with the calendar and local plans. Check before you travel.', 'Les dates varient selon le calendrier et les organisateurs. Vérifie avant de partir.', 'Las fechas cambian según el calendario y la organización. Compruébalas antes de viajar.', '日期可能随年份和主办方调整，出行前请确认。'),
  now: tr('now', 'maintenant', 'ahora', '本月'),
};

const monthName = (m: number, lang: Lang) => new Intl.DateTimeFormat(lang, { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2024, m - 1, 15)));

export function whenText(f: Pick<Festival, 'month' | 'when'>, lang: Lang) {
  const name = monthName(f.month, lang);
  if (f.when in PART) {
    const p = PART[f.when as keyof typeof PART][lang];
    if (f.when === 'varies' || f.when === 'all') return `${name}, ${p}`;
    if (lang === 'zh') return `${name}${p}`;
    if (lang === 'es') return `${p} ${name}`;
    if (lang === 'fr') return f.when === 'mid' ? `${p}-${name}` : `${p} ${name}`;
    return `${p} ${name}`;
  }
  if (lang === 'zh') return `${name}${f.when}日`;
  if (lang === 'es') return `${f.when} de ${name}`;
  if (lang === 'fr') return `${f.when} ${name}`;
  return `${name} ${f.when}`;
}

const C = 160, OUT = 152, IN = 76;
const point = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)].map((n) => n.toFixed(1)).join(' ');
};
const sector = (m: number) => {
  const a0 = (m - 1) * 30 - 105 + 1, a1 = a0 + 28;
  return `M${point(IN, a0)} L${point(OUT, a0)} A${OUT} ${OUT} 0 0 1 ${point(OUT, a1)} L${point(IN, a1)} A${IN} ${IN} 0 0 0 ${point(IN, a0)} Z`;
};
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
};
const seasonOf = (m: number) => SEASONS.find((s) => s.months.includes(m))!;
const seasonClass = (m: number) => `fw-s${SEASONS.indexOf(seasonOf(m))}`;

export function FestivalWheel() {
  const { lang } = useT();
  const today = new Date().getMonth() + 1;
  const [month, setMonth] = useState(today);
  const [open, setOpen] = useState<string | null>(null);
  const list = FESTIVAL_DATA.filter((f) => f.month === month);
  const season = seasonOf(month);
  const go = (m: number) => { setMonth(((m + 11) % 12) + 1); setOpen(null); };
  const key = (e: KeyboardEvent, m: number) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(m); }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(month + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(month - 1); }
  };
  return (
    <section className="fw">
      <h2>🎡 {S.title[lang]}</h2>
      <p className="note">{S.hint[lang]}</p>
      <div className="fw-layout">
        <svg className="fw-wheel" viewBox="0 0 320 320" role="group" aria-label={S.wheel[lang]}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
            const mid = (m - 1) * 30 - 90;
            const items = FESTIVAL_DATA.filter((f) => f.month === m);
            const [lx, ly] = polar(134, mid);
            return (
              <g key={m} className={`fw-sector ${seasonClass(m)} ${m === month ? 'on' : ''}`} role="button" tabIndex={m === month ? 0 : -1}
                aria-pressed={m === month} aria-label={monthName(m, lang)} onClick={() => go(m)} onKeyDown={(e) => key(e, m)}>
                <path d={sector(m)} />
                <text x={lx} y={ly + 5}>{m}</text>
                {items.map((f, n) => {
                  const spread = Math.min(4, 22 / items.length);
                  const row = n % 2;
                  const [x, y] = polar(106 - row * 15, mid + (n - (items.length - 1) / 2) * spread);
                  return <circle key={f.id} className={f.kind} cx={x} cy={y} r="3.2" />;
                })}
                {m === today && <circle className="fw-today" cx={lx + 14} cy={ly - 8} r="4" />}
              </g>
            );
          })}
          <g className="fw-centre" aria-hidden="true">
            <text className="fw-emoji" x={C} y={C - 8}>{season.emoji}</text>
            <text className="fw-kanji" x={C} y={C + 28} lang="ja">{month}月</text>
            <text className="fw-kana" x={C} y={C + 46} lang="ja">{MONTH_KANA[month - 1]}</text>
          </g>
        </svg>
        <div className="fw-list" aria-live="polite">
          <div className="row between fw-head">
            <button className="btn small ghost" aria-label="←" onClick={() => go(month - 1)}>←</button>
            <b>{monthName(month, lang)} · <span lang="ja">{season.written}</span> {season.name[lang]}{month === today ? ` · ${S.now[lang]}` : ''}</b>
            <button className="btn small ghost" aria-label="→" onClick={() => go(month + 1)}>→</button>
          </div>
          {list.map((f) => {
            const on = open === f.id;
            const pref = f.pref ? prefectureById(f.pref) : null;
            return (
              <div key={f.id} className={`card fw-item pop ${on ? 'on' : ''}`}>
                <button className="fw-row" aria-expanded={on} onClick={() => setOpen(on ? null : f.id)}>
                  <span className="emoji-mid" aria-hidden="true">{f.emoji}</span>
                  <span className="fw-name">
                    <ruby lang="ja">{f.written}<rt>{f.written === f.kana ? '' : f.kana}</rt></ruby>
                    <small>{whenText(f, lang)} · {pref ? pref.name[lang] : S.everywhere[lang]}</small>
                  </span>
                </button>
                {on && <div className="fw-more"><p>{f.text[lang]}</p><SpeakButton text={f.kana} /></div>}
              </div>
            );
          })}
          <p className="note">{S.note[lang]}</p>
        </div>
      </div>
    </section>
  );
}
