import { readFileSync } from 'fs';
import path from 'path';

// Read template files at build time
const fullTemplate = readFileSync(path.join(__dirname, 'markup.html'), 'utf8');

const halfVerticalTemplate = readFileSync(
  path.join(__dirname, 'half-view-markup.html'),
  'utf8',
);

const halfHorizontalTemplate = readFileSync(
  path.join(__dirname, 'half-horizontal-view-markup.html'),
  'utf8',
);

const quadrantTemplate = readFileSync(
  path.join(__dirname, 'quadrant-view-markup.html'),
  'utf8',
);

/**
 * TRMNL plugin templates
 */
export const templates = {
  full: fullTemplate,
  halfVertical: halfVerticalTemplate,
  halfHorizontal: halfHorizontalTemplate,
  quadrant: quadrantTemplate,
};
