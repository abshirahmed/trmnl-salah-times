import { logger } from '@/utils/logger';

interface ErrorContext {
  error: Error | unknown;
  context?: Record<string, unknown>;
}

/**
 * Handle errors consistently across the application
 * @param message Error message
 * @param errorContext Error context including the error object and additional context
 * @throws The original error after logging
 */
export const handleError = (
  message: string,
  { error, context = {} }: ErrorContext,
): never => {
  logger.error(message, { error, ...context });
  throw error;
};
