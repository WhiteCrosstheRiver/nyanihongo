import type { Line, Tr } from '../reading';

export type LifeId =
  | 'jpfood' | 'jpclothing' | 'jpgoods' | 'regions' | 'festivals' | 'folk' | 'city' | 'names'
  | 'elementary' | 'middle' | 'high' | 'university';

/** An online extra. Links open in the browser; nothing from them is copied into the app. */
export interface LifeLink {
  title: Tr;
  url: string; // https only
  kind: 'photo' | 'video' | 'guide';
  source: string; // who publishes it, e.g. "Wikimedia Commons"
}

export interface LifeSection { emoji: string; title: Tr; body: Tr }

export interface LifeTopic {
  id: LifeId;
  emoji: string;
  jp: string; // short hiragana label
  title: Tr;
  intro: Tr;
  sections: LifeSection[];
  words: string; // lines of kana|written|emoji|en|fr|es|zh, the same format as vocab1.ts
  phrases: Line[]; // Japanese uses {漢字|かな} furigana markup
  links: LifeLink[];
}

export const tr = (en: string, fr: string, es: string, zh: string): Tr => ({ en, fr, es, zh });
export const line = (ja: string, en: string, fr: string, es: string, zh: string): Line => ({ ja, tr: tr(en, fr, es, zh) });
export const section = (emoji: string, title: Tr, body: Tr): LifeSection => ({ emoji, title, body });
export const link = (kind: LifeLink['kind'], source: string, url: string, title: Tr): LifeLink => ({ kind, source, url, title });
