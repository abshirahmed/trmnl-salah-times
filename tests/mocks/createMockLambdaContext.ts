import { Context } from 'aws-lambda';
import { mockDeep } from 'jest-mock-extended';
import { DeepPartial } from 'ts-essentials';

export const createMockLambdaContext = <T extends Context>(
  overrides?: DeepPartial<T>,
) => ({
  ...mockDeep<T>(overrides),
  getRemainingTimeInMillis() {
    return 0;
  },
});
