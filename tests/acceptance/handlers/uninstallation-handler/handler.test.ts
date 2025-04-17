import { handler } from '@/handlers/uninstallation-handler';
import { v4 as uuidv4 } from 'uuid';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';

jest.mock('@/utils/auth', () => ({
  verifyAuthHeader: jest.fn(),
}));

jest.mock('@/services/user-settings', () => ({
  deleteUserSettings: jest.fn().mockResolvedValue({ error: null }),
}));

describe('Uninstallation Handler', () => {
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

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(400);
    expect(parsedBody.message).toBe('Invalid request body');
    expect(parsedBody.errors.fieldErrors.user_uuid).toContain(
      'User UUID is required',
    );
  });

  it('should return 400 if user_uuid is invalid', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      body: {
        user_uuid: 'not-a-valid-uuid',
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(400);
    expect(parsedBody.message).toBe('Invalid request body');
    expect(parsedBody.errors.fieldErrors.user_uuid).toContain(
      'Invalid UUID format',
    );
  });

  it('should process valid uninstallation request', async () => {
    const validUuid = uuidv4();
    const event = {
      ...mockAPIGatewayProxyEvent,
      body: {
        user_uuid: validUuid,
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(200);
    expect(parsedBody.message).toBe('Uninstallation successful');
  });
});
