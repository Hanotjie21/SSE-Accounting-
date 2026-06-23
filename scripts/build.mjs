import { access, copyFile, cp, mkdir, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
const requiredFiles = [
  'index.html',
  'styles.css',
  'script.js',
  'public/SSE INV Logo.png',
  'public/Hero-image.webp',
  'public/aboutbackground.webp',
  'public/accounting.webp',
  'public/tax.webp',
  'public/payroll.webp',
  'public/advisory.webp',
  'public/whychoseus.webp',
  'public/industries.webp',
  'public/leadershipimage.webp'
];

await Promise.all(
  requiredFiles.map(async (file) => {
    try {
      await access(resolve(root, file), constants.R_OK);
    } catch {
      throw new Error(`Required deployment file is missing: ${file}`);
    }
  })
);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all(
  ['index.html', 'styles.css', 'script.js'].map((file) =>
    copyFile(resolve(root, file), resolve(output, file))
  )
);
await cp(resolve(root, 'public'), resolve(output, 'public'), { recursive: true });

console.log(`Static deployment built successfully in ${output}`);
