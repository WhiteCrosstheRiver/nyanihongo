// Gojūon chart: romaji + hiragana + katakana. Empty cells keep the 5-column grid aligned.
export interface Kana { romaji: string; hira: string; kata: string }

const ROWS = `a あ ア|i い イ|u う ウ|e え エ|o お オ
ka か カ|ki き キ|ku く ク|ke け ケ|ko こ コ
sa さ サ|shi し シ|su す ス|se せ セ|so そ ソ
ta た タ|chi ち チ|tsu つ ツ|te て テ|to と ト
na な ナ|ni に ニ|nu ぬ ヌ|ne ね ネ|no の ノ
ha は ハ|hi ひ ヒ|fu ふ フ|he へ ヘ|ho ほ ホ
ma ま マ|mi み ミ|mu む ム|me め メ|mo も モ
ya や ヤ||yu ゆ ユ||yo よ ヨ
ra ら ラ|ri り リ|ru る ル|re れ レ|ro ろ ロ
wa わ ワ||||wo を ヲ
n ん ン||||
ga が ガ|gi ぎ ギ|gu ぐ グ|ge げ ゲ|go ご ゴ
za ざ ザ|ji じ ジ|zu ず ズ|ze ぜ ゼ|zo ぞ ゾ
da だ ダ|ji ぢ ヂ|zu づ ヅ|de で デ|do ど ド
ba ば バ|bi び ビ|bu ぶ ブ|be べ ベ|bo ぼ ボ
pa ぱ パ|pi ぴ ピ|pu ぷ プ|pe ぺ ペ|po ぽ ポ`;

export const KANA_GRID: (Kana | null)[][] = ROWS.split('\n').map((row) =>
  row.split('|').map((cell) => {
    if (!cell) return null;
    const [romaji, hira, kata] = cell.split(' ');
    return { romaji, hira, kata };
  }),
);

export const KANA_LIST: Kana[] = KANA_GRID.flat().filter((k): k is Kana => k !== null);
