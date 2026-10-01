// 生成 /risk 子站「Risk Job Simulation」卡片封面：案例蓝灰色板的 5×5 风险矩阵
// （likelihood × impact），无第三方 logo。用项目已装的 sharp 把 SVG 渲染成 PNG。
//
// 用法：node scripts/make-risk-cover.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'src/assets/risk/risk-simulation-cover.png');

const W = 1200;
const H = 750; // 16:10，与其它封面一致
const CELL = 76;
const GAP = 10;
const N = 5;
const SIZE = N * CELL + (N - 1) * GAP;
const X0 = (W - SIZE) / 2 + 20;
const Y0 = (H - SIZE) / 2 - 20;

// 浅蓝 → 案例强调色 → 深蓝灰（--color-primary）
const STOPS = [
  [0, [226, 234, 243]],
  [0.5, [127, 156, 189]],
  [1, [44, 62, 80]],
];
function colorAt(t) {
  const i = t <= 0.5 ? 0 : 1;
  const [t0, c0] = STOPS[i];
  const [t1, c1] = STOPS[i + 1];
  const k = (t - t0) / (t1 - t0);
  const c = c0.map((v, j) => Math.round(v + (c1[j] - v) * k));
  return `rgb(${c.join(',')})`;
}

const cells = [];
for (let row = 0; row < N; row++) {
  for (let col = 0; col < N; col++) {
    const likelihood = N - 1 - row; // 上方 = 高可能性
    const t = (col + likelihood) / (2 * (N - 1));
    const x = X0 + col * (CELL + GAP);
    const y = Y0 + row * (CELL + GAP);
    cells.push(`<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="10" fill="${colorAt(t)}"/>`);
  }
}

// 几个「客户画像」落点（纯装饰）
const markers = [
  [1, 1],
  [2, 3],
  [3, 2],
  [4, 4],
].map(([col, likelihood]) => {
  const cx = X0 + col * (CELL + GAP) + CELL / 2;
  const cy = Y0 + (N - 1 - likelihood) * (CELL + GAP) + CELL / 2;
  return `<circle cx="${cx}" cy="${cy}" r="14" fill="#ffffff" stroke="#2c3e50" stroke-width="4"/>`;
});

const axisX = X0 - 30;
const axisY = Y0 + SIZE + 30;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f8fafc"/>
      <stop offset="1" stop-color="#e3ecf6"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${cells.join('\n  ')}
  ${markers.join('\n  ')}
  <g stroke="#5a7fa5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M${axisX} ${Y0 + SIZE} V${Y0 - 6}"/>
    <path d="M${axisX - 10} ${Y0 + 8} L${axisX} ${Y0 - 6} L${axisX + 10} ${Y0 + 8}"/>
    <path d="M${X0} ${axisY} H${X0 + SIZE + 6}"/>
    <path d="M${X0 + SIZE - 8} ${axisY - 10} L${X0 + SIZE + 6} ${axisY} L${X0 + SIZE - 8} ${axisY + 10}"/>
  </g>
  <g fill="#5a7fa5" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="5">
    <text x="${axisX - 24}" y="${Y0 + SIZE / 2}" text-anchor="middle" transform="rotate(-90 ${axisX - 24} ${Y0 + SIZE / 2})">LIKELIHOOD</text>
    <text x="${X0 + SIZE / 2}" y="${axisY + 44}" text-anchor="middle">IMPACT</text>
  </g>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`wrote ${OUT}`);
