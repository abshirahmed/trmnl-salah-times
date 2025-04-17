import { handler } from '@/handlers/plugin-markup-handler';
import { v4 as uuidv4 } from 'uuid';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';

jest.mock('@/utils/auth', () => ({
  verifyAuthHeader: jest.fn(),
}));

jest.mock('@/services/user-settings', () => ({
  getUserSettings: jest.fn().mockResolvedValue({
    data: {
      city: 'London',
      country: 'UK',
      method: 2,
    },
  }),
}));

describe('Plugin Markup Handler', () => {
  const mockAPIGatewayProxyEvent = createMockAPIGatewayProxyEvent({
    requestContext: {},
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer test-token',
    },
  });
  const mockLambdaContext = createMockLambdaContext();

  it('should return 400 if user_uuid is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      body: {},
    };

    const { statusCode, message } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(400);
    expect(message).toContain('User UUID is required');
  });

  it('should return 400 if user_uuid is invalid', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      body: {
        user_uuid: 'not-a-valid-uuid',
      },
    };

    const { statusCode, message } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(400);
    expect(message).toContain('Invalid UUID format');
  });

  it('should generate markup for valid request', async () => {
    const validUuid = uuidv4();
    const event = {
      ...mockAPIGatewayProxyEvent,
      body: {
        user_uuid: validUuid,
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(200);
    expect(body).toContain(
      '<!-- TRMNL Salah Prayer Times Plugin Markup - Optimized for TRMNL framework -->',
    );
  });
});
