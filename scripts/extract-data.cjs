// One-off: extracts kana stroke paths (KanjiVG, CC BY-SA 3.0) and ImageNet labels.
// Usage: node scripts/extract-data.cjs <kanjivg/kanji dir> <imagenet_classes.js>
const fs = require('fs');
const path = require('path');
const [kvg, cls] = process.argv.slice(2);
const out = {};
for (const [a, b] of [[0x3041, 0x3096], [0x30a1, 0x30fa]]) {
  for (let c = a; c <= b; c++) {
    const f = path.join(kvg, c.toString(16).padStart(5, '0') + '.svg');
    if (!fs.existsSync(f)) continue;
    const s = fs.readFileSync(f, 'utf8');
    const d = [...s.matchAll(/<path [^>]*?\sd="([^"]+)"/g)].map((m) => m[1]);
    if (d.length) out[String.fromCodePoint(c)] = d;
  }
}
fs.writeFileSync('src/data/strokes.json', JSON.stringify(out));
console.log('kana with strokes', Object.keys(out).length);
const src = fs.readFileSync(cls, 'utf8');
const m = src.match(/IMAGENET_CLASSES\s*=\s*(\{[\s\S]*?\});/);
const o = eval('(' + m[1] + ')');
const arr = Object.keys(o).sort((x, y) => x - y).map((k) => o[k]);
fs.writeFileSync('src/data/imagenet.json', JSON.stringify(arr));
console.log('labels', arr.length, arr[0], arr[281], arr[999]);
