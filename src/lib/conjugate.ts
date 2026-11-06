// Rule-based Japanese verb conjugation. Works on both the written form and the kana reading.
export type VerbClass = 'ichidan' | 'godan' | 'suru' | 'kuru';

export interface Verb {
  word: string; // 食べる
  kana: string; // たべる
  cls: VerbClass;
  stative?: boolean; // ある, できる, わかる… have no volitional-style forms
  honorific?: boolean; // いらっしゃる… masu-stem and imperative in い
}

export const FORMS = [
  'polite', 'politeNegative', 'politePast', 'politePastNegative', 'politeVolitional',
  'negative', 'past', 'pastNegative', 'te', 'negativeTe', 'teIru', 'teKudasai',
  'potential', 'passive', 'causative', 'causativePassive',
  'imperative', 'prohibitive', 'volitional',
  'condBa', 'condBaNegative', 'condTara', 'condNara', 'condTo',
  'tai', 'taiNegative', 'nagara',
] as const;
export type Form = (typeof FORMS)[number];

export interface Conjugated {
  word: string;
  kana: string;
  alternatives: string[];
}

type Pair = [string, string]; // [written, kana]
const add = (p: Pair, s: string): Pair => [p[0] + s, p[1] + s];

const ROWS: Record<string, [string, string, string, string]> = {
  // a, i, e, o rows
  う: ['わ', 'い', 'え', 'お'], く: ['か', 'き', 'け', 'こ'], ぐ: ['が', 'ぎ', 'げ', 'ご'],
  す: ['さ', 'し', 'せ', 'そ'], つ: ['た', 'ち', 'て', 'と'], ぬ: ['な', 'に', 'ね', 'の'],
  ぶ: ['ば', 'び', 'べ', 'ぼ'], む: ['ま', 'み', 'め', 'も'], る: ['ら', 'り', 'れ', 'ろ'],
};

const STATIVE_BLOCKED: Form[] = [
  'potential', 'passive', 'causative', 'causativePassive', 'imperative', 'prohibitive',
  'volitional', 'politeVolitional', 'tai', 'taiNegative', 'teKudasai', 'nagara',
];

interface Stems { a: Pair; i: Pair; e: Pair; o: Pair; ta: Pair; te: Pair }

function stems(v: Verb): Stems {
  const drop = (n: number): Pair => [v.word.slice(0, -n), v.kana.slice(0, -n)];
  if (v.cls === 'ichidan') {
    const b = drop(1);
    return { a: b, i: b, e: b, o: b, ta: add(b, 'た'), te: add(b, 'て') };
  }
  if (v.cls === 'suru') {
    const b = drop(2);
    const si = add(b, 'し');
    return { a: si, i: si, e: add(b, 'すれ'), o: si, ta: add(si, 'た'), te: add(si, 'て') };
  }
  if (v.cls === 'kuru') {
    // 来 keeps its kanji while the reading changes; くる written in kana changes visibly.
    const fixed = v.word.endsWith('来る') ? v.word.slice(0, -1) : null;
    const prefixW = v.word.slice(0, -2);
    const prefixK = v.kana.slice(0, -2);
    const mk = (kana: string, tail = ''): Pair =>
      fixed ? [fixed + tail, prefixK + kana + tail] : [prefixW + kana + tail, prefixK + kana + tail];
    const ko = mk('こ');
    const ki = mk('き');
    return { a: ko, i: ki, e: mk('く', 'れ'), o: ko, ta: add(ki, 'た'), te: add(ki, 'て') };
  }
  const end = v.kana.slice(-1);
  const row = ROWS[end];
  if (!row) throw new Error(`Bad godan ending: ${v.word}`);
  const b = drop(1);
  const [ra, ri, re, ro] = row;
  let sound: string;
  if (v.kana === 'とう' || v.kana === 'こう') sound = 'う'; // 問う, 請う
  else if (v.kana.endsWith('いく') && v.word.slice(-2) === '行く') sound = 'っ';
  else if (v.kana === 'いく') sound = 'っ';
  else if (end === 'う' || end === 'つ' || end === 'る') sound = 'っ';
  else if (end === 'む' || end === 'ぶ' || end === 'ぬ') sound = 'ん';
  else if (end === 'く' || end === 'ぐ') sound = 'い';
  else sound = 'し';
  const voiced = 'むぶぬぐ'.includes(end);
  return {
    a: add(b, ra),
    i: add(b, v.honorific ? 'い' : ri),
    e: add(b, re),
    o: add(b, ro),
    ta: add(add(b, sound), voiced ? 'だ' : 'た'),
    te: add(add(b, sound), voiced ? 'で' : 'て'),
  };
}

export function isAvailable(v: Verb, f: Form): boolean {
  return !(v.stative && STATIVE_BLOCKED.includes(f));
}

export function conjugate(v: Verb, f: Form): Conjugated | null {
  if (!isAvailable(v, f)) return null;
  const s = stems(v);
  const base: Pair = [v.word, v.kana];
  const { cls } = v;
  const out = (p: Pair, ...alts: string[]): Conjugated => ({ word: p[0], kana: p[1], alternatives: alts });
  const neg = (suffix: string): Pair =>
    v.kana === 'ある' ? ['な' + suffix, 'な' + suffix] : add(s.a, 'な' + suffix);
  const suruPrefix: Pair = [v.word.slice(0, -2), v.kana.slice(0, -2)];
  const sa = (tail: string): Pair => add(suruPrefix, 'さ' + tail);

  switch (f) {
    case 'polite': return out(add(s.i, 'ます'));
    case 'politeNegative': return out(add(s.i, 'ません'));
    case 'politePast': return out(add(s.i, 'ました'));
    case 'politePastNegative': return out(add(s.i, 'ませんでした'));
    case 'politeVolitional': return out(add(s.i, 'ましょう'));
    case 'negative': return out(neg('い'));
    case 'past': return out(s.ta);
    case 'pastNegative': return out(neg('かった'));
    case 'te': return out(s.te);
    case 'negativeTe': return out(neg('くて'), ...neg('いで'));
    case 'teIru': return out(add(s.te, 'いる'));
    case 'teKudasai': return out(add(s.te, 'ください'));
    case 'potential':
      if (cls === 'ichidan') return out(add(s.a, 'られる'));
      if (cls === 'godan') return out(add(s.e, 'る'));
      if (cls === 'suru') return out(add(suruPrefix, 'できる'));
      return out(add(s.o, 'られる'));
    case 'passive':
      if (cls === 'ichidan') return out(add(s.a, 'られる'));
      if (cls === 'godan') return out(add(s.a, 'れる'));
      if (cls === 'suru') return out(sa('れる'));
      return out(add(s.o, 'られる'));
    case 'causative':
      if (cls === 'ichidan') return out(add(s.a, 'させる'));
      if (cls === 'godan') return out(add(s.a, 'せる'));
      if (cls === 'suru') return out(sa('せる'));
      return out(add(s.o, 'させる'));
    case 'causativePassive':
      if (cls === 'ichidan') return out(add(s.a, 'させられる'));
      if (cls === 'godan') {
        const long = add(s.a, 'せられる');
        return v.kana.endsWith('す') ? out(long) : out(add(s.a, 'される'), ...long);
      }
      if (cls === 'suru') return out(sa('せられる'));
      return out(add(s.o, 'させられる'));
    case 'imperative':
      if (cls === 'ichidan') return out(add(s.a, 'ろ'), ...add(s.a, 'よ'));
      if (cls === 'godan') return out(v.honorific ? s.i : s.e);
      if (cls === 'suru') return out(add(s.a, 'ろ'), ...add(suruPrefix, 'せよ'));
      return out(add(s.o, 'い'));
    case 'prohibitive': return out(add(base, 'な'));
    case 'volitional':
      return out(cls === 'godan' ? add(s.o, 'う') : add(s.o, 'よう'));
    case 'condBa':
      return out(cls === 'ichidan' ? add(s.a, 'れば') : add(s.e, 'ば'));
    case 'condBaNegative': return out(neg('ければ'));
    case 'condTara': return out(add(s.ta, 'ら'));
    case 'condNara': return out(add(base, 'なら'));
    case 'condTo': return out(add(base, 'と'));
    case 'tai': return out(add(s.i, 'たい'));
    case 'taiNegative': return out(add(s.i, 'たくない'));
    case 'nagara': return out(add(s.i, 'ながら'));
  }
}

/** Every string accepted as a correct typed answer. */
export function accepted(c: Conjugated): string[] {
  return [...new Set([c.word, c.kana, ...c.alternatives])];
}
