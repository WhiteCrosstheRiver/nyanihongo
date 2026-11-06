import { Capacitor } from '@capacitor/core';
import { LANGS } from './i18n';
import type { Card } from './srs';
import type { Progress } from './store';

const TAG = 'nyanihongo-backup';
const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const numbers = (v: unknown): Record<string, number> =>
  isObject(v) ? Object.fromEntries(Object.entries(v).filter(([, n]) => Number.isFinite(n))) as Record<string, number> : {};
const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((s) => typeof s === 'string') : []);
const validCard = (c: unknown): c is Card =>
  isObject(c) && ['ease', 'interval', 'due', 'reps'].every((k) => Number.isFinite(c[k]));

export const makeBackup = (p: Progress, now = new Date()) =>
  JSON.stringify({ app: TAG, version: 1, exportedAt: now.toISOString(), progress: p });

/** Reads a backup file. Returns null unless it really is one; drops any malformed entries. */
export function parseBackup(text: string, base: Progress): Progress | null {
  let data: unknown;
  try { data = JSON.parse(text); } catch { return null; }
  if (!isObject(data) || data.app !== TAG || !isObject(data.progress)) return null;
  const s = data.progress;
  const stats = isObject(s.stats) ? s.stats : {};
  const cards = isObject(s.cards)
    ? Object.fromEntries(Object.entries(s.cards).filter(([, c]) => validCard(c))) as Record<string, Card>
    : {};
  const count = (k: 'kana' | 'words' | 'verbs' | 'reading' | 'camera' | 'listen' | 'grammar' | 'daily') =>
    Number.isFinite(stats[k]) ? stats[k] as number : base.stats[k];
  return {
    ...base,
    lang: LANGS.includes(s.lang as never) ? s.lang as Progress['lang'] : base.lang,
    theme: s.theme === 'light' || s.theme === 'dark' || s.theme === 'auto' ? s.theme : base.theme,
    sound: typeof s.sound === 'boolean' ? s.sound : base.sound,
    furigana: typeof s.furigana === 'boolean' ? s.furigana : base.furigana,
    dailyGoal: Number.isFinite(s.dailyGoal) && (s.dailyGoal as number) > 0 ? s.dailyGoal as number : base.dailyGoal,
    dailyDate: typeof s.dailyDate === 'string' ? s.dailyDate : '',
    cards,
    days: numbers(s.days),
    misses: numbers(s.misses),
    stats: {
      kana: count('kana'), words: count('words'), verbs: count('verbs'), reading: count('reading'), camera: count('camera'),
      listen: count('listen'), grammar: count('grammar'), daily: count('daily'), forms: numbers(stats.forms),
    },
    stories: strings(s.stories),
    stickers: strings(s.stickers),
  };
}

/** Saves through the share sheet on Android and as a download everywhere else. */
export async function saveBackup(text: string, name: string) {
  if (Capacitor.isNativePlatform()) {
    const { Directory, Encoding, Filesystem } = await import('@capacitor/filesystem');
    const { Share } = await import('@capacitor/share');
    const { uri } = await Filesystem.writeFile({ path: name, data: text, directory: Directory.Cache, encoding: Encoding.UTF8 });
    await Share.share({ title: name, files: [uri] });
    return;
  }
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
