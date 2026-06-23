import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
const html = await readFile(resolve(output, 'index.html'), 'utf8');
const css = await readFile(resolve(output, 'styles.css'), 'utf8');
const references = [
  ...Array.from(html.matchAll(/(?:src|href)="([^"]+)"/g), (match) => match[1]),
  ...Array.from(css.matchAll(/url\(['"]?([^)'"\s]+)[^)]*\)/g), (match) => match[1])
];

const localReferences = references.filter(
  (reference) =>
    !reference.startsWith('#') &&
    !reference.startsWith('//') &&
    !/^[a-z][a-z\d+.-]*:/i.test(reference)
);

for (const reference of localReferences) {
  const cleanReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  const target = resolve(output, cleanReference);

  if (target !== output && !target.startsWith(`${output}${sep}`)) {
    throw new Error(`Deployment reference escapes the output directory: ${reference}`);
  }

  try {
    await access(target, constants.R_OK);
  } catch {
    throw new Error(`Broken deployment reference: ${reference}`);
  }
}

console.log(`Deployment verification passed (${localReferences.length} local references checked).`);
