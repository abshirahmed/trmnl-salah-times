import { APIGatewayProxyEvent } from 'aws-lambda';
import { mockDeep } from 'jest-mock-extended';
import { DeepPartial } from 'ts-essentials';

export const createMockAPIGatewayProxyEvent = <T extends APIGatewayProxyEvent>(
  overrides?: DeepPartial<T>,
) => ({
  ...mockDeep<T>(overrides),
  version: '2.0',
});
