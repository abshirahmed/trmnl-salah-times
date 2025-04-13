import { readFileSync } from 'fs';
import path from 'path';

// Read template files at build time
const fullTemplate = readFileSync(path.join(__dirname, 'markup.html'), 'utf8');

const halfTemplate = readFileSync(
  path.join(__dirname, 'half-view-markup.html'),
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
  half: halfTemplate,
  quadrant: quadrantTemplate,
};

/**
 * Get template by view size
 * @param viewSize View size
 * @returns Template for the specified view size
 */
export const getTemplateByViewSize = (
  viewSize: 'full' | 'half' | 'quadrant',
): string => {
  return templates[viewSize];
};
