import type { Lang } from '../lib/i18n';
import { ANIMALS, BODY, CLOTHES, FOOD, HOME, NATURE, PEOPLE } from './vocab1';
import { ADJECTIVES, COLORS, NUMBERS, PHRASES, PLACES, SCHOOL, TIME, TRANSPORT } from './vocab2';
import { IDEAS, LIFE } from './vocab3';

export interface Word {
  id: string;
  kana: string;
  written: string; // falls back to kana
  emoji: string;
  meaning: Record<Lang, string>;
  category: CategoryId;
}

export const CATEGORIES = {
  animals: ['🐱', ANIMALS], food: ['🍙', FOOD], body: ['👂', BODY], people: ['👪', PEOPLE],
  home: ['🏠', HOME], clothes: ['👕', CLOTHES], nature: ['🌸', NATURE], transport: ['🚃', TRANSPORT],
  places: ['🏫', PLACES], school: ['📚', SCHOOL], time: ['⏰', TIME], numbers: ['🔢', NUMBERS],
  life: ['🛍️', LIFE], ideas: ['💭', IDEAS],
  colors: ['🎨', COLORS], adjectives: ['✨', ADJECTIVES], phrases: ['💬', PHRASES],
} as const;
export type CategoryId = keyof typeof CATEGORIES;
export const CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[];

export const WORDS: Word[] = CATEGORY_IDS.flatMap((category) =>
  CATEGORIES[category][1].trim().split('\n').map((line) => {
    const [kana, written, emoji, en, fr, es, zh] = line.split('|');
    return {
      id: `${category}:${kana}:${written}`, kana, written: written || kana, emoji,
      meaning: { en, fr, es, zh }, category,
    };
  }),
);

export const PICTURE_WORDS = WORDS.filter((w) =>
  w.emoji && !['adjectives', 'numbers', 'colors', 'time', 'phrases', 'ideas'].includes(w.category));

export const wordById = (id: string) => WORDS.find((w) => w.id === id);
export const findWord = (kana: string, category?: CategoryId) =>
  WORDS.find((w) => w.kana === kana && (!category || w.category === category));
