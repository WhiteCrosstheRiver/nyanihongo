import { describe, expect, it } from 'vitest';
import { LIFE_TOPICS } from '../data/life';
import { LANGS } from './i18n';

// Set LIFE_TOPIC=jpfood to check one topic while it is being written.
const only = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.LIFE_TOPIC;
const topics = LIFE_TOPICS.filter((t) => !only || t.id === only);

describe.each(topics.map((t) => [t.id, t] as const))('life topic %s', (_, t) => {
  const langs = (o: Record<string, string>, where: string) => { for (const l of LANGS) expect(o[l]?.trim(), `${where} ${l}`).toBeTruthy(); };
  const lines = t.words.trim().split('\n').filter(Boolean);

  it('has enough content', () => {
    expect(t.sections.length).toBeGreaterThanOrEqual(4);
    expect(t.phrases.length).toBeGreaterThanOrEqual(8);
    expect(lines.length).toBeGreaterThanOrEqual(30);
    expect(t.links.length).toBeGreaterThanOrEqual(4);
  });
  it('is translated everywhere', () => {
    langs(t.title, 'title');
    langs(t.intro, 'intro');
    for (const s of t.sections) { langs(s.title, 'section'); langs(s.body, s.title.en); }
    for (const p of t.phrases) langs(p.tr, p.ja);
    for (const l of t.links) langs(l.title, l.url);
  });
  it('word lines are valid and unique', () => {
    const seen = new Set<string>();
    for (const row of lines) {
      const f = row.split('|');
      expect(f.length, row).toBe(7);
      expect(f[0], row).toMatch(/^[぀-ヿー]+$/);
      for (const m of f.slice(3)) expect(m.trim(), row).toBeTruthy();
      const key = `${f[0]}:${f[1]}`;
      expect(seen.has(key), `duplicate ${row}`).toBe(false);
      seen.add(key);
    }
  });
  it('furigana markup is balanced', () => {
    for (const p of t.phrases) {
      expect(p.ja.replace(/\{[^{}|]+\|[^{}|]+\}/g, ''), p.ja).not.toMatch(/[{}|]/);
      expect(p.ja.replace(/\{[^{}|]+\|[^{}|]+\}/g, ''), `kanji needs furigana: ${p.ja}`).not.toMatch(/[一-鿿]/);
    }
  });
  it('links are https, unique and mix photo with video', () => {
    expect(new Set(t.links.map((l) => l.url)).size).toBe(t.links.length);
    for (const l of t.links) { expect(l.url).toMatch(/^https:\/\//); expect(l.source.trim()).toBeTruthy(); }
    expect(t.links.some((l) => l.kind === 'photo')).toBe(true);
    expect(t.links.some((l) => l.kind === 'video')).toBe(true);
  });
});
