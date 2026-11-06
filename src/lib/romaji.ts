// Converts romaji typed on a Latin keyboard to hiragana, as-you-type.
const BASE: Record<string, string> = {
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ', ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  sa: 'さ', si: 'し', shi: 'し', su: 'す', se: 'せ', so: 'そ', za: 'ざ', zi: 'じ', ji: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  ta: 'た', ti: 'ち', chi: 'ち', tu: 'つ', tsu: 'つ', te: 'て', to: 'と', da: 'だ', di: 'ぢ', du: 'づ', de: 'で', do: 'ど',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', hu: 'ふ', fu: 'ふ', he: 'へ', ho: 'ほ', ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ', pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も', ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ', wa: 'わ', wo: 'を', "n'": 'ん',
  xtu: 'っ', xtsu: 'っ', xa: 'ぁ', xi: 'ぃ', xu: 'ぅ', xe: 'ぇ', xo: 'ぉ', xya: 'ゃ', xyu: 'ゅ', xyo: 'ょ',
  fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ', '-': 'ー',
};
const Y: Record<string, string> = {
  ky: 'き', gy: 'ぎ', sh: 'し', sy: 'し', j: 'じ', jy: 'じ', zy: 'じ', ch: 'ち', ty: 'ち', dy: 'ぢ',
  ny: 'に', hy: 'ひ', by: 'び', py: 'ぴ', my: 'み', ry: 'り',
};
const SMALL: Record<string, string> = { a: 'ゃ', u: 'ゅ', o: 'ょ', e: 'ぇ' };

const TABLE: Record<string, string> = { ...BASE };
for (const [prefix, kana] of Object.entries(Y))
  for (const [v, s] of Object.entries(SMALL)) {
    const key = prefix + v;
    if (!(key in TABLE)) TABLE[key] = kana + s;
  }
const KEYS = Object.keys(TABLE).sort((a, b) => b.length - a.length);

export function romajiToKana(input: string, final = false): string {
  const s = input.toLowerCase();
  let out = '';
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    const next = s[i + 1];
    if (c >= 'a' && c <= 'z' && c === next && c !== 'n' && !'aiueo'.includes(c)) { out += 'っ'; i++; continue; }
    if (c === 't' && next === 'c') { out += 'っ'; i++; continue; } // matcha → まっちゃ
    const key = KEYS.find((k) => s.startsWith(k, i));
    if (key) { out += TABLE[key]; i += key.length; continue; }
    if (c === 'n' && next === 'n') { // konnichiha → こんにちは, nn at a boundary → ん
      const after = s[i + 2];
      out += 'ん';
      i += (after === undefined && !final) || (after !== undefined && 'aiueoy'.includes(after)) ? 1 : 2;
      continue;
    }
    if (c === 'n' && next !== undefined && !'aiueoy'.includes(next)) { out += 'ん'; i++; continue; }
    if (c === 'n' && next === undefined && final) { out += 'ん'; i++; continue; }
    out += c;
    i++;
  }
  return out;
}

/** Katakana → hiragana so answers compare equally. */
export const toHiragana = (s: string) =>
  s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
