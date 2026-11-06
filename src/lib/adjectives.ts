import { WORDS, type Word } from '../data/vocab';
import { pick } from './random';

export const ADJ_FORMS = ['present', 'negative', 'past', 'pastNegative', 'politeNegative', 'politePast', 'politePastNegative', 'te', 'adverb'] as const;
export type AdjForm = (typeof ADJ_FORMS)[number];

// These end in い but are な-adjectives.
const NA_ENDING_I = new Set(['きれい', 'ゆうめい', 'きらい']);
const NO_ADVERB = new Set(['だいじょうぶ', 'ひま', 'ふべん']);

export const isNa = (w: Pick<Word, 'kana'>) => NA_ENDING_I.has(w.kana) || !w.kana.endsWith('い');

const I_ENDINGS: Record<AdjForm, string[]> = {
  present: ['いです'], negative: ['くない'], past: ['かった'], pastNegative: ['くなかった'],
  politeNegative: ['くないです', 'くありません'], politePast: ['かったです'],
  politePastNegative: ['くなかったです', 'くありませんでした'], te: ['くて'], adverb: ['く'],
};
const NA_ENDINGS: Record<AdjForm, string[]> = {
  present: ['です'], negative: ['じゃない', 'ではない'], past: ['だった'], pastNegative: ['じゃなかった', 'ではなかった'],
  politeNegative: ['じゃないです', 'じゃありません', 'ではありません', 'ではないです'], politePast: ['でした'],
  politePastNegative: ['じゃなかったです', 'じゃありませんでした', 'ではありませんでした', 'ではなかったです'], te: ['で'], adverb: ['に'],
};

export interface AdjResult { word: string; kana: string; accepted: string[] }

export function conjugateAdj(w: Pick<Word, 'kana' | 'written'>, form: AdjForm): AdjResult | null {
  if (form === 'adverb' && NO_ADVERB.has(w.kana)) return null;
  const na = isNa(w);
  const ends = (na ? NA_ENDINGS : I_ENDINGS)[form];
  // いい conjugates from よい, except in the plain いいです.
  const irregular = w.kana === 'いい' && form !== 'present';
  const stem = (s: string) => (na ? s : irregular ? 'よ' : s.slice(0, -1));
  const k = stem(w.kana);
  const s = stem(w.written);
  return { word: s + ends[0], kana: k + ends[0], accepted: ends.flatMap((e) => [k + e, s + e]) };
}

export const ADJ_WORDS = WORDS.filter((w) => w.category === 'adjectives');

export type AdjEx = 'type' | 'name';
export interface AdjItem { word: Word; form: AdjForm; ex: AdjEx }

export function makeAdjItem(form: AdjForm = pick(ADJ_FORMS), ex: AdjEx = pick(['type', 'name'] as const)): AdjItem {
  return { word: pick(ADJ_WORDS.filter((w) => conjugateAdj(w, form))), form, ex };
}
