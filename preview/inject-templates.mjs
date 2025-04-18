import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Read templates
const fullTemplate = fs.readFileSync(
  path.join(rootDir, 'src/templates/full/index.ts'),
  'utf8',
);
const halfHorizontalTemplate = fs.readFileSync(
  path.join(rootDir, 'src/templates/half-horizontal/index.ts'),
  'utf8',
);
const halfVerticalTemplate = fs.readFileSync(
  path.join(rootDir, 'src/templates/half-vertical/index.ts'),
  'utf8',
);
const quadrantTemplate = fs.readFileSync(
  path.join(rootDir, 'src/templates/quadrant/index.ts'),
  'utf8',
);

// Extract template strings
const extractTemplate = (content) => {
  const match = content.match(/`([\s\S]*)`/);
  return match ? match[1] : '';
};

// Read the preview HTML
let previewHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Replace template placeholders
const replacements = [
  ['{{ fullTemplate }}', fullTemplate],
  ['{{ halfHorizontalTemplate }}', halfHorizontalTemplate],
  ['{{ halfVerticalTemplate }}', halfVerticalTemplate],
  ['{{ quadrantTemplate }}', quadrantTemplate],
];

previewHtml = replacements.reduce(
  (html, [placeholder, template]) =>
    html.replace(placeholder, extractTemplate(template)),
  previewHtml,
);

// Write the updated preview HTML
fs.writeFileSync(path.join(__dirname, 'index.html'), previewHtml);
