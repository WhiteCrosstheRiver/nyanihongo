import { describe, expect, it } from 'vitest';
import { FORMS, conjugate } from './conjugate';
import { romajiToKana, toHiragana } from './romaji';
import { newCard, review } from './srs';
import { FORM_INFO, FRAMES, FRAME_VERBS } from '../data/forms';
import { VERBS } from '../data/verbs';
import { WORDS, PICTURE_WORDS } from '../data/vocab';
import { STORIES, SENTENCES } from '../data/reading';
import { KANA_LIST } from '../data/kana';
import { coverage, labelToWord } from '../data/recognition';
import { LANGS, STRINGS } from './i18n';
import strokes from '../data/strokes.json';

describe('romaji', () => {
  const cases: [string, string][] = [
    ['tabemasu', 'たべます'], ['shinkansen', 'しんかんせん'], ['kitte', 'きって'], ['ryokou', 'りょこう'],
    ['konnichiha', 'こんにちは'], ['matcha', 'まっちゃ'], ['kyou', 'きょう'], ['hon', 'ほん'], ['konban', 'こんばん'],
    ['chotto', 'ちょっと'], ['jisho', 'じしょ'], ['shashin', 'しゃしん'], ['ikitai', 'いきたい'], ['nomimashita', 'のみました'],
  ];
  for (const [r, k] of cases) it(r, () => expect(romajiToKana(r, true)).toBe(k));
  it('types double n live', () => {
    let v = '';
    for (const ch of 'konnichiha') v = romajiToKana(v + ch);
    expect(v).toBe('こんにちは');
    expect(romajiToKana('sann', true)).toBe('さん');
  });
  it('keeps a trailing n while typing', () => expect(romajiToKana('hon')).toBe('ほn'));
  it('katakana to hiragana', () => expect(toHiragana('パン')).toBe('ぱん'));
});

describe('srs', () => {
  it('grows intervals and resets on again', () => {
    let c = newCard(0);
    c = review(c, 'good', 0); expect(c.interval).toBe(1);
    c = review(c, 'good', 0); expect(c.interval).toBe(4);
    c = review(c, 'good', 0); expect(c.interval).toBe(10);
    c = review(c, 'again', 0); expect(c.interval).toBe(0);
    expect(c.reps).toBe(0);
  });
});

describe('content', () => {
  it('has enough content', () => {
    console.log(`words=${WORDS.length} picture=${PICTURE_WORDS.length} verbs=${VERBS.length} stories=${STORIES.length} sentences=${SENTENCES.length} imagenet=${coverage()}/1000`);
    expect(VERBS.length).toBeGreaterThanOrEqual(150);
    expect(WORDS.length).toBeGreaterThanOrEqual(650);
  });
  it('words and verbs have every translation', () => {
    for (const x of [...WORDS, ...VERBS]) for (const l of LANGS) expect(x.meaning[l], x.kana).toBeTruthy();
  });
  it('word ids are unique', () => expect(new Set(WORDS.map((w) => w.id)).size).toBe(WORDS.length));
  it('kana fields hold only kana or letters', () => {
    for (const w of WORDS) expect(w.kana, w.kana).toMatch(/^[぀-ヿーTA-Z]+$/);
  });
  it('every verb conjugates in every available form', () => {
    for (const v of VERBS) for (const f of FORMS) {
      const c = conjugate(v, f);
      if (c) expect(c.kana, `${v.word} ${f}`).toMatch(/^[぀-ヿ]+$/);
    }
  });
  it('honours class exceptions in the verb list', () => {
    const get = (w: string) => VERBS.find((v) => v.word === w)!;
    expect(conjugate(get('帰る'), 'polite')!.word).toBe('帰ります');
    expect(conjugate(get('走る'), 'negative')!.word).toBe('走らない');
    expect(conjugate(get('持って来る'), 'negative')!.kana).toBe('もってこない');
    expect(conjugate(get('くださる'), 'polite')!.word).toBe('くださいます');
  });
  it('forms and frames are complete', () => {
    for (const f of FORMS) for (const l of LANGS) expect(FORM_INFO[f].name[l], f).toBeTruthy();
    for (const f of Object.keys(FRAMES)) expect(FORMS).toContain(f);
    for (const v of FRAME_VERBS) expect(VERBS.some((x) => x.word === v), v).toBe(true);
  });
  it('stories are well-formed', () => {
    for (const s of STORIES) {
      for (const q of s.questions) expect(q.answer).toBeLessThan(q.options.length);
      for (const line of s.lines) for (const lang of LANGS) expect(line.tr[lang]).toBeTruthy();
    }
    for (const s of SENTENCES) for (const lang of LANGS) expect(s.tr[lang]).toBeTruthy();
  });
  it('every UI string is translated', () => {
    const keys = Object.keys(STRINGS.en);
    for (const l of LANGS) expect(Object.keys(STRINGS[l]).sort()).toEqual([...keys].sort());
  });
  it('every chart kana has stroke data', () => {
    for (const k of KANA_LIST) {
      expect((strokes as Record<string, string[]>)[k.hira], k.hira).toBeTruthy();
      expect((strokes as Record<string, string[]>)[k.kata], k.kata).toBeTruthy();
    }
  });
  it('recognition rules point at real words', () => {
    for (let i = 0; i < 1000; i++) expect(() => labelToWord(i)).not.toThrow();
    expect(labelToWord(281)?.kana).toBe('ねこ');
    expect(labelToWord(200)?.kana).toBe('いぬ');
    expect(labelToWord(954)?.kana).toBe('バナナ');
  });
});
