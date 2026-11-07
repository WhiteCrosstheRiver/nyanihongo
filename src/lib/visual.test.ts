import { describe, expect, it } from 'vitest';
import { FESTIVAL_DATA, MILESTONES, SEASONS } from '../data/life/calendar';
import { FIGURES } from '../data/life/figures';
import { LOCAL } from '../data/life/localfood';
import { PREFECTURES, prefectureById } from '../data/life/prefectures';
import { VISUAL_LESSONS } from '../screens/visual/lessons';
import { FUNNEL, ICHIDAN, KEIGO, LADDER_ENDS, LADDER_VERBS, TIMELINE } from '../screens/visual/scenes';
import { conjugate, type Form, type Verb } from './conjugate';
import { LANGS } from './i18n';

const langs = (o: Record<string, string>, where: string) => { for (const l of LANGS) expect(o[l]?.trim(), `${where} ${l}`).toBeTruthy(); };

describe('visual grammar agrees with the conjugation engine', () => {
  const forms: Form[] = ['negative', 'polite', 'polite', 'condBa', 'volitional'];
  it.each(LADDER_VERBS.map((v) => [v.dict, v] as const))('ladder %s', (_, v) => {
    const verb: Verb = { word: v.dict, kana: v.kana, cls: 'godan' };
    for (const i of [0, 1, 3, 4]) expect(v.stem + v.row[i] + LADDER_ENDS[i]).toBe(conjugate(verb, forms[i])!.word);
    expect(v.stem + v.row[2]).toBe(v.dict);
  });
  it('ichidan endings', () => {
    const verb: Verb = { word: ICHIDAN.dict, kana: ICHIDAN.kana, cls: 'ichidan' };
    for (const i of [0, 1, 3, 4]) expect(ICHIDAN.stem + ICHIDAN.ends[i]).toBe(conjugate(verb, forms[i])!.word);
  });
  it.each(FUNNEL.map((f) => [f.verb, f] as const))('funnel %s', (_, f) => {
    expect(conjugate({ word: f.verb, kana: f.verb, cls: 'godan' }, 'te')!.word).toBe(f.te);
  });
  it('ている forms', () => {
    expect(conjugate({ word: '食べる', kana: 'たべる', cls: 'ichidan' }, 'teIru')!.word).toBe(TIMELINE.eat.during);
    expect(conjugate({ word: '結婚する', kana: 'けっこんする', cls: 'suru' }, 'teIru')!.word).toBe(TIMELINE.marry.after);
  });
  it('keigo has all four levels', () => {
    for (const k of KEIGO) for (const f of Object.values(k.forms)) expect(f).toMatch(/[ぁ-ん]$/);
  });
});

describe('visual lessons', () => {
  it.each(VISUAL_LESSONS.map((l) => [l.id, l] as const))('%s is complete', (_, l) => {
    langs(l.title, 'title'); langs(l.idea, 'idea');
    expect(l.steps.length).toBeGreaterThanOrEqual(4);
    for (const s of l.steps) langs(s, l.id);
    langs(l.ask.q, 'ask'); langs(l.ask.why, 'why');
    expect(l.ask.options.length).toBeGreaterThanOrEqual(2);
    expect(l.ask.answer).toBeLessThan(l.ask.options.length);
    for (const o of l.ask.options) if (typeof o !== 'string') langs(o, 'option');
  });
});

describe('culture data', () => {
  it('festivals are valid and unique', () => {
    expect(new Set(FESTIVAL_DATA.map((f) => f.id)).size).toBe(FESTIVAL_DATA.length);
    expect(FESTIVAL_DATA.length).toBeGreaterThanOrEqual(50);
    for (const f of FESTIVAL_DATA) {
      expect(f.month).toBeGreaterThanOrEqual(1);
      expect(f.month).toBeLessThanOrEqual(12);
      expect(f.kana, f.id).toMatch(/^[぀-ゟー]+$/);
      if (f.pref) expect(prefectureById(f.pref), f.id).toBeTruthy();
      langs(f.text, f.id);
    }
  });
  it('every month has something, and seasons cover the year', () => {
    for (let m = 1; m <= 12; m++) expect(FESTIVAL_DATA.filter((f) => f.month === m).length).toBeGreaterThanOrEqual(3);
    expect(SEASONS.flatMap((s) => s.months).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
  it('every prefecture has a dish and a craft', () => {
    expect(Object.keys(LOCAL).sort()).toEqual(PREFECTURES.map((p) => p.id).sort());
    for (const [id, l] of Object.entries(LOCAL)) for (const x of [l.food, l.craft]) {
      expect(x.kana, id).toMatch(/^[぀-ゟー]+$/);
      langs(x.tr, x.written);
    }
  });
  it('figures and milestones are valid', () => {
    expect(new Set(FIGURES.map((f) => f.id)).size).toBe(FIGURES.length);
    for (const f of FIGURES) { if (f.pref) expect(prefectureById(f.pref), f.id).toBeTruthy(); langs(f.name, f.id); langs(f.story, f.id); }
    const ages = MILESTONES.map((x) => x.age);
    expect(ages).toEqual([...ages].sort((a, b) => a - b));
    expect(new Set(ages).size).toBe(ages.length);
    for (const x of MILESTONES) langs(x.text, x.written);
  });
});
