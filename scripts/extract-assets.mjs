import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
const source = process.argv[2];
if (!source) throw new Error('Informe a pasta dos wireframes aprovados.');
await mkdir('public/images', { recursive: true });
// Coordenadas na prancha de referência de 1672 × 941. Apenas extração
// de elementos visuais: nenhuma seção ou copy é rasterizada na página.
const crops = [
  ['01_wireframe_hero.png', 'hero', [793, 183, 214, 621]],
  ['01_wireframe_hero.png', 'totem', [793, 183, 214, 621]],
  ['01_wireframe_hero.png', 'force-one', [99, 151, 256, 67]],
  ['02_wireframe_o_problema.png', 'problem', [549, 244, 651, 460]],
  ['06_wireframe_bastian.png', 'bastian-symbol', [751, 371, 125, 84]],
  ['09_wireframe_app_acesso_remoto.png', 'app', [741, 192, 437, 490]],
  ['12_wireframe_encerramento_final.png', 'closing', [560, 214, 629, 487]],
  ['01_wireframe_hero.png', 'urban', [1006, 310, 195, 480]],
];
for (const [file, name, rect] of crops) {
  const input = path.join(source, file);
  const meta = await sharp(input).metadata();
  const sx = meta.width / 1672,
    sy = meta.height / 941;
  const [left, top, width, height] = rect.map((v, i) => Math.round(v * (i % 2 === 0 ? sx : sy)));
  await sharp(input)
    .extract({ left, top, width, height })
    .webp({ quality: 88 })
    .toFile(`public/images/${name}.webp`);
}
