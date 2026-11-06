import { describe, expect, it } from 'vitest';
import { conjugate, FORMS, isAvailable, type Form, type Verb } from './conjugate';

const g = (word: string, kana: string, extra: Partial<Verb> = {}): Verb => ({ word, kana, cls: 'godan', ...extra });
const taberu: Verb = { word: '食べる', kana: 'たべる', cls: 'ichidan' };
const kaku = g('書く', 'かく');
const aru = g('ある', 'ある', { stative: true });
const suru: Verb = { word: 'する', kana: 'する', cls: 'suru' };
const benkyou: Verb = { word: '勉強する', kana: 'べんきょうする', cls: 'suru' };
const kuru: Verb = { word: '来る', kana: 'くる', cls: 'kuru' };

const c = (v: Verb, f: Form) => conjugate(v, f)?.word;
const k = (v: Verb, f: Form) => conjugate(v, f)?.kana;

const table: [Verb, Partial<Record<Form, string>>][] = [
  [taberu, {
    polite: '食べます', politeNegative: '食べません', politePast: '食べました', politePastNegative: '食べませんでした',
    politeVolitional: '食べましょう', negative: '食べない', past: '食べた', pastNegative: '食べなかった', te: '食べて',
    negativeTe: '食べなくて', teIru: '食べている', teKudasai: '食べてください', potential: '食べられる', passive: '食べられる',
    causative: '食べさせる', causativePassive: '食べさせられる', imperative: '食べろ', prohibitive: '食べるな',
    volitional: '食べよう', condBa: '食べれば', condBaNegative: '食べなければ', condTara: '食べたら', condNara: '食べるなら',
    condTo: '食べると', tai: '食べたい', taiNegative: '食べたくない', nagara: '食べながら',
  }],
  [kaku, {
    polite: '書きます', negative: '書かない', past: '書いた', te: '書いて', potential: '書ける', passive: '書かれる',
    causative: '書かせる', causativePassive: '書かされる', imperative: '書け', volitional: '書こう', condBa: '書けば',
    condBaNegative: '書かなければ', condTara: '書いたら', tai: '書きたい', nagara: '書きながら',
  }],
  [g('行く', 'いく'), { past: '行った', te: '行って', condTara: '行ったら', negative: '行かない', polite: '行きます' }],
  [g('買う', 'かう'), { negative: '買わない', past: '買った', te: '買って', passive: '買われる', causative: '買わせる', potential: '買える', volitional: '買おう', imperative: '買え' }],
  [g('話す', 'はなす'), { past: '話した', te: '話して', causativePassive: '話させられる', negative: '話さない', potential: '話せる' }],
  [g('読む', 'よむ'), { past: '読んだ', te: '読んで', condTara: '読んだら', volitional: '読もう' }],
  [g('泳ぐ', 'およぐ'), { past: '泳いだ', te: '泳いで' }],
  [g('待つ', 'まつ'), { past: '待った', te: '待って', negative: '待たない', polite: '待ちます', potential: '待てる' }],
  [g('死ぬ', 'しぬ'), { past: '死んだ', te: '死んで', negative: '死なない' }],
  [g('遊ぶ', 'あそぶ'), { past: '遊んだ', te: '遊んで', volitional: '遊ぼう' }],
  [g('帰る', 'かえる'), { past: '帰った', negative: '帰らない', polite: '帰ります', condBa: '帰れば' }],
  [aru, { negative: 'ない', pastNegative: 'なかった', condBaNegative: 'なければ', negativeTe: 'なくて', polite: 'あります', past: 'あった', te: 'あって' }],
  [suru, {
    polite: 'します', negative: 'しない', past: 'した', te: 'して', potential: 'できる', passive: 'される', causative: 'させる',
    causativePassive: 'させられる', imperative: 'しろ', volitional: 'しよう', condBa: 'すれば', prohibitive: 'するな', tai: 'したい',
  }],
  [benkyou, { polite: '勉強します', negative: '勉強しない', potential: '勉強できる', passive: '勉強される', causative: '勉強させる', condBa: '勉強すれば', volitional: '勉強しよう' }],
  [kuru, { polite: '来ます', negative: '来ない', past: '来た', te: '来て', potential: '来られる', causative: '来させる', imperative: '来い', volitional: '来よう', condBa: '来れば' }],
  [g('いらっしゃる', 'いらっしゃる', { honorific: true }), { polite: 'いらっしゃいます', politePast: 'いらっしゃいました', imperative: 'いらっしゃい', negative: 'いらっしゃらない', past: 'いらっしゃった' }],
  [g('問う', 'とう'), { past: '問うた', te: '問うて', negative: '問わない' }],
];

describe('written forms', () => {
  for (const [v, m] of table)
    for (const [f, e] of Object.entries(m))
      it(`${v.word} ${f}`, () => expect(c(v, f as Form)).toBe(e));
});

describe('kana readings', () => {
  it('kuru stem changes', () => {
    expect(k(kuru, 'polite')).toBe('きます');
    expect(k(kuru, 'negative')).toBe('こない');
    expect(k(kuru, 'past')).toBe('きた');
    expect(k(kuru, 'condBa')).toBe('くれば');
    expect(k(kuru, 'imperative')).toBe('こい');
    expect(k(kuru, 'volitional')).toBe('こよう');
    expect(k(kuru, 'potential')).toBe('こられる');
    expect(k(kuru, 'causativePassive')).toBe('こさせられる');
  });
  it('compounds keep their reading', () => expect(k(benkyou, 'polite')).toBe('べんきょうします'));
  it('accepts alternative forms', () => {
    expect(conjugate(kaku, 'causativePassive')!.alternatives).toContain('書かせられる');
    expect(conjugate(taberu, 'negativeTe')!.alternatives).toContain('食べないで');
  });
  it('kana-written kuru', () => expect(c({ word: 'くる', kana: 'くる', cls: 'kuru' }, 'negative')).toBe('こない'));
});

describe('availability', () => {
  it('stative verbs skip volitional forms', () => {
    expect(conjugate(aru, 'potential')).toBeNull();
    expect(isAvailable(aru, 'negative')).toBe(true);
  });
  it('every form produces output for regular verbs', () => {
    for (const v of [taberu, kaku, suru, benkyou, kuru])
      for (const f of FORMS) expect(conjugate(v, f)?.kana).toBeTruthy();
  });
});
