import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

// Run `node scripts/generate-pixel-moon.mjs` after updating either brand SVG.
// Sharp is provided by Next.js; it is used only here, never in the browser.
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const root = new URL('../', import.meta.url);
const grid = 140;
const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const opacities = [0.58, 0.65, 0.72, 0.79, 0.86, 0.93];
const paths = opacities.map(() => []);

async function readLogo(name) {
  const svg = await readFile(new URL(`public/icon/${name}`, root));
  const pixels = await sharp(svg)
    .extract({ left: 140, top: 130, width: 730, height: 750 })
    .resize(grid, grid, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer();
  return { svg, pixels };
}

const [dark, light] = await Promise.all([
  readLogo('logo-dark.svg'),
  readLogo('logo.svg'),
]);

function luminance(pixels, offset) {
  return (
    (pixels[offset] * 0.2126 +
      pixels[offset + 1] * 0.7152 +
      pixels[offset + 2] * 0.0722) /
    255
  );
}

for (let y = 0; y < grid; y++) {
  for (let x = 0; x < grid; x++) {
    const offset = (y * grid + x) * 4;
    // Both theme variants describe the same geometry with opposite foregrounds.
    const coverage =
      (luminance(dark.pixels, offset) * (dark.pixels[offset + 3] / 255) +
        (1 - luminance(light.pixels, offset)) * (light.pixels[offset + 3] / 255)) /
      2;
    const mask = Math.pow(coverage, 0.65);
    if (mask < 0.08) continue;

    const illumination = Math.exp(-((x / grid - 0.24) ** 2 + (y / grid - 0.22) ** 2) * 3);
    const density = mask * (0.3 + illumination * 0.65);
    const threshold = (bayer[(y % 4) * 4 + (x % 4)] + 0.5) / 16;
    if (density < threshold) continue;

    const opacity = 0.58 + illumination * 0.35;
    const group = Math.min(opacities.length - 1, Math.round((opacity - 0.58) / 0.07));
    paths[group].push(`M${x} ${y}h.84v.84h-.84z`);
  }
}

const hash = createHash('sha256').update(dark.svg).update(light.svg).digest('hex');
const output = [
  '// Generated from public/icon/logo-dark.svg and public/icon/logo.svg.',
  '// Regenerate with: node scripts/generate-pixel-moon.mjs',
  `// Source SHA-256: ${hash}`,
  'export const PIXEL_MOON_PATHS = [',
  ...paths.map((commands, index) =>
    `  { opacity: ${opacities[index]}, d: '${commands.join('')}' },`,
  ),
  '] as const;',
  '',
].join('\n');

await writeFile(new URL('app/(home)/pixel-moon.paths.ts', root), output);
console.log(`Generated ${paths.reduce((total, commands) => total + commands.length, 0)} pixels in ${paths.length} vector paths.`);
