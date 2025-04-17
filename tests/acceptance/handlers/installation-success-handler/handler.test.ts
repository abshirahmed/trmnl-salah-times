import { handler } from '@/handlers/installation-success-handler';
import { v4 as uuidv4 } from 'uuid';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';

jest.mock('@/utils/auth', () => ({
  verifyAuthHeader: jest.fn(),
}));

describe('Installation Success Handler', () => {
  const mockAPIGatewayProxyEvent = createMockAPIGatewayProxyEvent({
    requestContext: {},
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer test-token',
    },
  });
  const mockLambdaContext = createMockLambdaContext();

  it('should return 400 for invalid installation success webhook body', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      body: {},
    };

    const { statusCode, message } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(400);
    expect(message).toContain('Required');
  });

  it('should process valid installation success webhook', async () => {
    const validUuid = uuidv4();
    const event = {
      ...mockAPIGatewayProxyEvent,
      body: {
        user: {
          name: 'Test User',
          email: 'test@example.com',
          time_zone_iana: 'Europe/London',
          plugin_setting_id: 12345,
          uuid: validUuid,
        },
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(200);
    expect(parsedBody.message).toBe('Installation success received');
  });
});
