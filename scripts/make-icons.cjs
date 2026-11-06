// Renders public/icon.svg to the PNGs the desktop and Android builds need.
// Needs @resvg/resvg-js (npm i --no-save @resvg/resvg-js).
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const svg = fs.readFileSync('public/icon.svg', 'utf8');
const png = (size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();

fs.mkdirSync('build', { recursive: true });
fs.writeFileSync('build/icon.png', png(512));

const sizes = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
for (const [density, size] of Object.entries(sizes)) {
  const dir = path.join('android/app/src/main/res', `mipmap-${density}`);
  if (!fs.existsSync(dir)) continue;
  for (const name of ['ic_launcher.png', 'ic_launcher_round.png']) fs.writeFileSync(path.join(dir, name), png(size));
  fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), png(Math.round(size * 2.25)));
}
console.log('icons written');
