import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { LANGS, type Lang } from './i18n';
import { newCard, review, type Card, type Grade } from './srs';

export interface Progress {
  lang: Lang;
  theme: 'auto' | 'light' | 'dark';
  sound: boolean;
  furigana: boolean;
  dailyGoal: number;
  cards: Record<string, Card>;
  days: Record<string, number>; // YYYY-MM-DD → points
  stats: { kana: number; words: number; verbs: number; reading: number; camera: number; forms: Record<string, number> };
  stories: string[];
  stickers: string[];
}

const KEY = 'nyanihongo.v1';

function detectLang(): Lang {
  const code = (navigator.language || 'en').slice(0, 2) as Lang;
  return LANGS.includes(code) ? code : 'en';
}

const initial = (): Progress => ({
  lang: detectLang(), theme: 'auto', sound: true, furigana: true, dailyGoal: 20,
  cards: {}, days: {}, stats: { kana: 0, words: 0, verbs: 0, reading: 0, camera: 0, forms: {} }, stories: [], stickers: [],
});

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const base = initial();
      const saved = JSON.parse(raw);
      return { ...base, ...saved, stats: { ...base.stats, ...saved.stats } };
    }
  } catch { /* storage unavailable: start fresh */ }
  return initial();
}

export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function streakOf(days: Record<string, number>): number {
  const d = new Date();
  if (!days[dayKey(d)]) d.setDate(d.getDate() - 1); // today not started yet: keep yesterday's streak
  let n = 0;
  while (days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export interface Sticker { id: string; emoji: string; name: string; value: (p: Progress) => number; goal: number }
export const STICKERS: Sticker[] = [
  { id: 'first', emoji: '🌱', name: 'はじめの一歩', value: (p) => Object.values(p.days).reduce((a, b) => a + b, 0), goal: 1 },
  { id: 'kana50', emoji: '🍡', name: 'かなマスター', value: (p) => p.stats.kana, goal: 50 },
  { id: 'kana200', emoji: '🎏', name: 'かなの達人', value: (p) => p.stats.kana, goal: 200 },
  { id: 'word25', emoji: '🍙', name: 'ことばの芽', value: (p) => Object.keys(p.cards).length, goal: 25 },
  { id: 'word100', emoji: '🌸', name: 'ことばの花', value: (p) => Object.keys(p.cards).length, goal: 100 },
  { id: 'word300', emoji: '🌳', name: 'ことばの森', value: (p) => Object.keys(p.cards).length, goal: 300 },
  { id: 'verb25', emoji: '🐣', name: '動詞の卵', value: (p) => p.stats.verbs, goal: 25 },
  { id: 'verb100', emoji: '🐥', name: '動詞のひよこ', value: (p) => p.stats.verbs, goal: 100 },
  { id: 'verb500', emoji: '🦚', name: '動詞の王様', value: (p) => p.stats.verbs, goal: 500 },
  { id: 'forms', emoji: '🌈', name: 'ぜんぶの形', value: (p) => Object.keys(p.stats.forms).length, goal: 27 },
  { id: 'read1', emoji: '📖', name: '読書ねこ', value: (p) => p.stories.length, goal: 1 },
  { id: 'read10', emoji: '📚', name: '本の虫', value: (p) => p.stories.length, goal: 10 },
  { id: 'cam5', emoji: '📷', name: 'カメラねこ', value: (p) => p.stats.camera, goal: 5 },
  { id: 'streak3', emoji: '🔥', name: '三日坊主じゃない', value: (p) => streakOf(p.days), goal: 3 },
  { id: 'streak7', emoji: '⭐', name: '一週間', value: (p) => streakOf(p.days), goal: 7 },
  { id: 'streak30', emoji: '👑', name: '一か月', value: (p) => streakOf(p.days), goal: 30 },
];

type StatKey = 'kana' | 'words' | 'verbs' | 'reading' | 'camera';

interface Store {
  p: Progress;
  update: (fn: (p: Progress) => Progress) => void;
  score: (stat: StatKey, correct: boolean, form?: string) => void;
  grade: (id: string, g: Grade) => void;
  addCard: (id: string) => void;
  finishStory: (id: string) => void;
  newSticker: Sticker | null;
  clearSticker: () => void;
  reset: () => void;
}

const Ctx = createContext<Store>(null as unknown as Store);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [p, setP] = useState<Progress>(load);
  const [newSticker, setNewSticker] = useState<Sticker | null>(null);
  const first = useRef(true);

  const update = useCallback((fn: (p: Progress) => Progress) => setP(fn), []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage full or blocked */ }
    const earned = STICKERS.find((s) => !p.stickers.includes(s.id) && s.value(p) >= s.goal);
    if (earned) {
      setP((q) => ({ ...q, stickers: [...q.stickers, earned.id] }));
      if (!first.current) setNewSticker(earned);
    }
    first.current = false;
  }, [p]);

  useEffect(() => {
    document.documentElement.lang = p.lang === 'zh' ? 'zh-Hans' : p.lang;
    if (p.theme === 'auto') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = p.theme;
  }, [p.lang, p.theme]);

  const value = useMemo<Store>(() => ({
    p, update, newSticker,
    clearSticker: () => setNewSticker(null),
    score: (stat, correct, form) => setP((q) => {
      if (!correct) return q;
      const today = dayKey();
      const forms = form ? { ...q.stats.forms, [form]: (q.stats.forms[form] ?? 0) + 1 } : q.stats.forms;
      return {
        ...q,
        days: { ...q.days, [today]: (q.days[today] ?? 0) + 1 },
        stats: { ...q.stats, [stat]: q.stats[stat] + 1, forms },
      };
    }),
    grade: (id, g) => setP((q) => {
      const now = Date.now();
      const today = dayKey();
      return {
        ...q,
        cards: { ...q.cards, [id]: review(q.cards[id] ?? newCard(now), g, now) },
        days: g === 'again' ? q.days : { ...q.days, [today]: (q.days[today] ?? 0) + 1 },
        stats: g === 'again' ? q.stats : { ...q.stats, words: q.stats.words + 1 },
      };
    }),
    addCard: (id) => setP((q) => (q.cards[id] ? q : { ...q, cards: { ...q.cards, [id]: newCard(Date.now()) } })),
    finishStory: (id) => setP((q) => (q.stories.includes(id) ? q : { ...q, stories: [...q.stories, id] })),
    reset: () => setP({ ...initial(), lang: p.lang, theme: p.theme }),
  }), [p, update, newSticker]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
