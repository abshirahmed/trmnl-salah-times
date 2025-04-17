import { handler } from '@/handlers/plugin-management-handler';
import { v4 as uuidv4 } from 'uuid';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';

jest.mock('@/services/user-settings', () => ({
  getUserSettings: jest.fn().mockResolvedValue({
    data: {
      city: 'London',
      country: 'UK',
      method: 2,
      timeformat: '24h',
    },
  }),
}));

describe('Plugin Management Handler', () => {
  const mockAPIGatewayProxyEvent = createMockAPIGatewayProxyEvent({
    requestContext: {},
    headers: {
      Accept: 'application/json',
    },
  });
  const mockLambdaContext = createMockLambdaContext();

  it('should return 400 if uuid is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {},
    };

    const { statusCode, message } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(400);
    expect(message).toContain('UUID is required');
  });

  it('should return 400 if uuid is invalid', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        uuid: 'not-a-valid-uuid',
      },
    };

    const { statusCode, message } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(400);
    expect(message).toContain('Invalid UUID format');
  });

  it('should serve management interface for valid UUID', async () => {
    const validUuid = uuidv4();
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        uuid: validUuid,
      },
    };

    const { statusCode, headers, body } = await handler(
      event,
      mockLambdaContext,
    );

    expect(statusCode).toBe(200);
    expect(headers).toEqual({
      'Content-Type': 'text/html',
    });
    expect(body).toContain('<!DOCTYPE html>');
  });
});
