import { SOUND_PAIRS } from '../data/grammar';
import { SENTENCES, type Line } from '../data/reading';
import { WORDS, type Word } from '../data/vocab';
import { pick, shuffle } from './random';

export type ListenItem =
  | { kind: 'meaning'; word: Word; options: Word[] }
  | { kind: 'dictation'; word: Word }
  | { kind: 'sentence'; line: Line; options: Line[] }
  | { kind: 'pair'; target: string; pair: [string, string] };

// Letters in a kana field (Tシャツ) read poorly and cannot be typed as kana.
const speakable = WORDS.filter((w) => /^[぀-ヿー]+$/.test(w.kana));

export function meaningOptions(word: Word): Word[] {
  const seen = new Set([word.meaning.en]);
  const others = shuffle(speakable.filter((w) => w.category === word.category)).filter((w) => {
    if (seen.has(w.meaning.en)) return false;
    seen.add(w.meaning.en);
    return true;
  });
  return shuffle([word, ...others.slice(0, 3)]);
}

/** Prefers words the learner has already met, so listening reinforces them. */
function wordPool(known: Record<string, unknown>) {
  const met = speakable.filter((w) => known[w.id]);
  return met.length >= 20 ? met : speakable;
}

export function makeListenItem(known: Record<string, unknown>, voice: boolean): ListenItem {
  const word = pick(wordPool(known));
  // Without a voice the text is shown instead, so typing it or telling a pair apart would prove nothing.
  const kind = pick(voice ? ['meaning', 'dictation', 'sentence', 'pair'] as const : ['meaning', 'sentence'] as const);
  if (kind === 'dictation') return { kind, word };
  if (kind === 'sentence') {
    const line = pick(SENTENCES);
    return { kind, line, options: shuffle([line, ...shuffle(SENTENCES.filter((l) => l !== line)).slice(0, 3)]) };
  }
  if (kind === 'pair') {
    const pair = pick(SOUND_PAIRS);
    return { kind, pair, target: pick(pair) };
  }
  return { kind, word, options: meaningOptions(word) };
}
