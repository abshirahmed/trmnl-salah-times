import fs from 'fs';
import path from 'path';
import { logger } from '@/utils/logger';

/**
 * Load a template file with fallbacks for different environments
 * @param templateName Name of the template file
 * @returns Template content as string
 */
export const loadTemplate = (templateName: string): string => {
  // List of possible paths to try
  const possiblePaths = [
    // Lambda environment paths
    path.join(
      __dirname,
      '..',
      'handlers',
      'plugin-markup-handler',
      templateName,
    ),
    path.join(__dirname, '..', 'templates', 'trmnl-plugin', templateName),
    // Local development paths
    path.join(
      process.cwd(),
      'src',
      'handlers',
      'plugin-markup-handler',
      templateName,
    ),
    path.join(process.cwd(), 'src', 'templates', 'trmnl-plugin', templateName),
  ];

  // Try each path until we find one that works
  for (const templatePath of possiblePaths) {
    try {
      logger.debug(`Trying to load template from: ${templatePath}`);
      return fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
      logger.debug(`Failed to load template from: ${templatePath}`, {
        error,
      });
      // Continue to the next path
    }
  }

  // If we get here, we couldn't find the template
  logger.error(`Could not find template: ${templateName}`);
  throw new Error(`Template not found: ${templateName}`);
};

/**
 * Load all TRMNL plugin templates
 * @returns Object containing all templates
 */
export const loadTemplates = () => {
  try {
    const fullTemplate = loadTemplate('markup.html');
    const halfVerticalTemplate = loadTemplate('half-view-markup.html');
    const halfHorizontalTemplate = loadTemplate(
      'half-horizontal-view-markup.html',
    );
    const quadrantTemplate = loadTemplate('quadrant-view-markup.html');

    return {
      full: fullTemplate,
      halfVertical: halfVerticalTemplate,
      halfHorizontal: halfHorizontalTemplate,
      quadrant: quadrantTemplate,
    };
  } catch (error) {
    logger.error('Error loading templates', { error });
    // Return empty templates as fallback
    return {
      full: '<div class="error">Unable to load template</div>',
      halfVertical: '<div class="error">Unable to load template</div>',
      halfHorizontal: '<div class="error">Unable to load template</div>',
      quadrant: '<div class="error">Unable to load template</div>',
    };
  }
};
