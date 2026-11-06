import { describe, expect, it } from 'vitest';
import { ADJ_FORM_NAMES, PARTICLES, PARTICLE_ITEMS, PARTICLE_RULES, SOUND_PAIRS } from '../data/grammar';
import { WORDS } from '../data/vocab';
import { ADJ_FORMS, ADJ_WORDS, conjugateAdj, isNa } from './adjectives';
import { makeBackup, parseBackup } from './backup';
import { buildDaily } from './daily';
import { LANGS } from './i18n';
import { makeListenItem } from './listening';
import { newCard } from './srs';
import { initial, type Progress } from './store';

const fresh = (): Progress => ({
  lang: 'en', theme: 'auto', sound: true, furigana: true, dailyGoal: 20, cards: {}, days: {},
  stats: { kana: 0, words: 0, verbs: 0, reading: 0, camera: 0, listen: 0, grammar: 0, daily: 0, forms: {} },
  misses: {}, dailyDate: '', stories: [], stickers: [],
});
const adj = (kana: string, written = kana) => ({ kana, written });

describe('adjectives', () => {
  it('conjugates い-adjectives', () => {
    const w = adj('たかい', '高い');
    expect(conjugateAdj(w, 'present')!.word).toBe('高いです');
    expect(conjugateAdj(w, 'negative')!.word).toBe('高くない');
    expect(conjugateAdj(w, 'past')!.kana).toBe('たかかった');
    expect(conjugateAdj(w, 'pastNegative')!.word).toBe('高くなかった');
    expect(conjugateAdj(w, 'politePast')!.word).toBe('高かったです');
    expect(conjugateAdj(w, 'te')!.word).toBe('高くて');
    expect(conjugateAdj(w, 'adverb')!.word).toBe('高く');
    expect(conjugateAdj(w, 'politeNegative')!.accepted).toContain('たかくありません');
  });
  it('conjugates な-adjectives', () => {
    const w = adj('しずか', '静か');
    expect(conjugateAdj(w, 'present')!.word).toBe('静かです');
    expect(conjugateAdj(w, 'negative')!.word).toBe('静かじゃない');
    expect(conjugateAdj(w, 'negative')!.accepted).toContain('しずかではない');
    expect(conjugateAdj(w, 'past')!.word).toBe('静かだった');
    expect(conjugateAdj(w, 'politePast')!.word).toBe('静かでした');
    expect(conjugateAdj(w, 'te')!.word).toBe('静かで');
    expect(conjugateAdj(w, 'adverb')!.word).toBe('静かに');
  });
  it('treats きれい, ゆうめい and きらい as な-adjectives', () => {
    expect(isNa(adj('きれい'))).toBe(true);
    expect(conjugateAdj(adj('きれい', '綺麗'), 'negative')!.word).toBe('綺麗じゃない');
    expect(conjugateAdj(adj('ゆうめい', '有名'), 'past')!.kana).toBe('ゆうめいだった');
    expect(isNa(adj('かわいい'))).toBe(false);
  });
  it('handles irregular いい', () => {
    const w = adj('いい');
    expect(conjugateAdj(w, 'present')!.word).toBe('いいです');
    expect(conjugateAdj(w, 'negative')!.word).toBe('よくない');
    expect(conjugateAdj(w, 'past')!.word).toBe('よかった');
    expect(conjugateAdj(w, 'te')!.word).toBe('よくて');
  });
  it('every list adjective conjugates', () => {
    expect(ADJ_WORDS.length).toBeGreaterThan(60);
    for (const w of ADJ_WORDS) for (const f of ADJ_FORMS) {
      const c = conjugateAdj(w, f);
      if (c) expect(c.kana, `${w.kana} ${f}`).toMatch(/^[぀-ヿ]+$/);
    }
  });
  it('form names are translated', () => {
    for (const f of ADJ_FORMS) for (const l of LANGS) expect(ADJ_FORM_NAMES[f][l]).toBeTruthy();
  });
});

describe('particles', () => {
  it('every sentence is well-formed', () => {
    for (const s of PARTICLE_ITEMS) {
      expect(s.ja.split('___').length, s.ja).toBe(2);
      expect(s.wrong, s.ja).toHaveLength(3);
      expect(new Set(s.wrong).size).toBe(3);
      expect(s.wrong, s.ja).not.toContain(s.answer);
      for (const l of LANGS) expect(s.tr[l], s.ja).toBeTruthy();
    }
  });
  it('every particle has a rule and at least two sentences', () => {
    for (const k of PARTICLES) {
      for (const l of LANGS) expect(PARTICLE_RULES[k][l]).toBeTruthy();
      expect(PARTICLE_ITEMS.filter((s) => s.answer === k).length, k).toBeGreaterThanOrEqual(2);
    }
  });
  it('sound pairs differ', () => {
    for (const [a, b] of SOUND_PAIRS) expect(a).not.toBe(b);
  });
});

describe('listening', () => {
  it('builds valid items with a voice', () => {
    for (let i = 0; i < 300; i++) {
      const item = makeListenItem({}, true);
      if (item.kind === 'meaning') {
        expect(item.options.map((o) => o.id)).toContain(item.word.id);
        expect(new Set(item.options.map((o) => o.meaning.en)).size).toBe(item.options.length);
        expect(item.options.length).toBeGreaterThanOrEqual(2);
      }
      if (item.kind === 'dictation') expect(item.word.kana).toMatch(/^[぀-ヿー]+$/);
      if (item.kind === 'sentence') expect(item.options).toContain(item.line);
      if (item.kind === 'pair') expect(item.pair).toContain(item.target);
    }
  });
  it('never asks for typing or sound pairs without a voice', () => {
    for (let i = 0; i < 300; i++) expect(['meaning', 'sentence']).toContain(makeListenItem({}, false).kind);
  });
  it('prefers words the learner knows', () => {
    const known = Object.fromEntries(WORDS.slice(0, 25).map((w) => [w.id, true]));
    for (let i = 0; i < 200; i++) {
      const item = makeListenItem(known, true);
      if (item.kind === 'dictation') expect(known[item.word.id]).toBe(true);
    }
  });
});

describe('daily lesson', () => {
  it('covers every skill for a beginner', () => {
    const kinds = new Set(buildDaily(fresh(), true).map((s) => s.t));
    for (const k of ['new', 'verb', 'adj', 'particle', 'listen']) expect(kinds.has(k as never), k).toBe(true);
  });
  it('puts due reviews in and caps them', () => {
    const p = fresh();
    for (const w of WORDS.slice(0, 10)) p.cards[w.id] = newCard(0);
    const steps = buildDaily(p, true, 1000);
    expect(steps.filter((s) => s.t === 'review')).toHaveLength(4);
    expect(steps.filter((s) => s.t === 'new')).toHaveLength(2);
  });
  it('never teaches a word twice or one already known', () => {
    const p = fresh();
    for (const w of WORDS.slice(0, 40)) p.cards[w.id] = { ...newCard(0), due: 1e15 };
    const ids = buildDaily(p, true, 1000).flatMap((s) => (s.t === 'new' ? [s.word.id] : []));
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(p.cards[id]).toBeUndefined();
  });
  it('targets weak particles', () => {
    const p = fresh();
    p.misses['particle:で'] = 5;
    const hits = Array.from({ length: 200 }, () => buildDaily(p, true))
      .flat().filter((s) => s.t === 'particle' && s.item.answer === 'で').length;
    expect(hits).toBeGreaterThan(70);
  });
  it('works when every word is learned', () => {
    const p = fresh();
    for (const w of WORDS) p.cards[w.id] = { ...newCard(0), due: 1e15 };
    expect(buildDaily(p, false, 1000).length).toBeGreaterThanOrEqual(5);
  });
});

describe('backup', () => {
  const base = () => (typeof localStorage === 'undefined' ? fresh() : initial());
  it('round-trips progress', () => {
    const p = fresh();
    p.cards['animals:ねこ:猫'] = newCard(5);
    p.days['2026-11-05'] = 12;
    p.stats.verbs = 40;
    p.stats.forms.te = 3;
    p.misses['particle:は'] = 2;
    p.stickers = ['first'];
    expect(parseBackup(makeBackup(p), fresh())).toEqual(p);
  });
  it('rejects anything that is not a backup', () => {
    for (const bad of ['', 'hello', '{}', '[]', '{"app":"other","progress":{}}', '{"app":"nyanihongo-backup"}']) {
      expect(parseBackup(bad, base()), bad).toBeNull();
    }
  });
  it('drops malformed entries and fills gaps from an older backup', () => {
    const text = JSON.stringify({
      app: 'nyanihongo-backup', version: 1,
      progress: { lang: 'xx', dailyGoal: -1, cards: { good: newCard(0), bad: { ease: 'x' } }, days: { a: 1, b: 'no' }, stickers: ['s', 3], stats: { kana: 7 } },
    });
    const r = parseBackup(text, fresh())!;
    expect(Object.keys(r.cards)).toEqual(['good']);
    expect(r.days).toEqual({ a: 1 });
    expect(r.stickers).toEqual(['s']);
    expect(r.lang).toBe('en');
    expect(r.dailyGoal).toBe(20);
    expect(r.stats.kana).toBe(7);
    expect(r.stats.listen).toBe(0);
  });
});
