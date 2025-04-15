import { handleError } from '@/utils/errorHandler';
import { logger } from '@/utils/logger';

describe('handleError', () => {
  it('should log error and throw with message', () => {
    const error = new Error('Test error');
    const message = 'Something went wrong';

    expect(() => handleError(message, { error })).toThrow(error);
    expect(logger.error).toHaveBeenCalledWith(message, { error });
  });

  it('should include additional context in log', () => {
    const error = new Error('Test error');
    const message = 'Something went wrong';
    const context = { foo: 'bar' };

    expect(() => handleError(message, { error, context })).toThrow(error);
    expect(logger.error).toHaveBeenCalledWith(message, { error, ...context });
  });

  it('should handle unknown error types', () => {
    const error = new Error('Unknown error');
    const message = 'Something went wrong';

    expect(() => handleError(message, { error })).toThrow(error);
    expect(logger.error).toHaveBeenCalledWith(message, { error });
  });
});
