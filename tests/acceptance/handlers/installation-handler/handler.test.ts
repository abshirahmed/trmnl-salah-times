import { handler } from '@/handlers/installation-handler';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';

jest.mock('@/services/trmnl', () => ({
  exchangeCodeForToken: jest.fn().mockResolvedValue({
    access_token: 'mock-access-token',
    token_type: 'Bearer',
    expires_in: 3600,
  }),
}));

describe('Installation Handler', () => {
  const mockAPIGatewayProxyEvent = createMockAPIGatewayProxyEvent({
    requestContext: {},
    headers: {
      Accept: 'application/json',
    },
  });
  const mockLambdaContext = createMockLambdaContext();

  it('should return 400 if code is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        installation_callback_url: 'https://trmnl.com/callback',
      },
    };

    const { statusCode, message } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(400);
    expect(message).toContain('Code is required');
  });

  it('should return 400 if installation_callback_url is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        code: 'mock-code',
      },
    };

    const { statusCode, message } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(400);
    expect(message).toContain('Installation callback URL is required');
  });

  it('should return 400 if installation_callback_url is invalid', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        code: 'mock-code',
        installation_callback_url: 'not-a-valid-url',
      },
    };

    const { statusCode, message } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(400);
    expect(message).toContain('Installation callback URL must be a valid URL');
  });

  it('should redirect to callback URL on successful token exchange', async () => {
    const callbackUrl = 'https://trmnl.com/callback';
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        code: 'mock-code',
        installation_callback_url: callbackUrl,
      },
    };

    const { statusCode, headers } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(302); // HTTP 302 Found (redirect)
    expect(headers).toEqual({
      Location: callbackUrl,
      'Content-Type': 'application/json',
    });
  });
});
