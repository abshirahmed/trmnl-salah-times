import { handler } from '@/handlers/save-settings-handler';
import { v4 as uuidv4 } from 'uuid';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';

jest.mock('@/services/user-settings', () => ({
  saveUserSettings: jest.fn().mockResolvedValue({ error: null }),
}));

jest.unmock('@/utils/logger');

describe('Save Settings Handler', () => {
  const mockAPIGatewayProxyEvent = createMockAPIGatewayProxyEvent({
    requestContext: {},
    headers: {
      Accept: 'application/json',
    },
  });
  const mockLambdaContext = createMockLambdaContext();
  const validUuid = uuidv4();

  it('should return 400 if uuid is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        country: 'UK',
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(400);
    expect(parsedBody.message).toBe('Invalid request parameters');
    expect(parsedBody.errors.fieldErrors.uuid).toContain('UUID is required');
  });

  it('should return 400 if city is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        uuid: validUuid,
        country: 'UK',
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(400);
    expect(parsedBody.message).toBe('Invalid request parameters');
    expect(parsedBody.errors.fieldErrors.city).toContain('City is required');
  });

  it('should return 400 if country is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        uuid: validUuid,
        city: 'London',
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(400);
    expect(parsedBody.message).toBe('Invalid request parameters');
    expect(parsedBody.errors.fieldErrors.country).toContain(
      'Country is required',
    );
  });

  it('should return 400 if method is invalid', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        uuid: validUuid,
        city: 'London',
        country: 'UK',
        method: '20', // Method must be between 1 and 15
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(400);
    expect(parsedBody.message).toBe('Invalid request parameters');
    expect(parsedBody.errors.fieldErrors.method).toContain(
      'Method must be a number between 1 and 15',
    );
  });

  it('should return 400 if timeFormat is invalid', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        uuid: validUuid,
        city: 'London',
        country: 'UK',
        timeFormat: 'invalid-format', // Must be '12h' or '24h'
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(400);
    expect(parsedBody.message).toBe('Invalid request parameters');
    expect(parsedBody.errors.fieldErrors.timeFormat).toBeDefined();
  });

  it('should save settings for valid request', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        uuid: validUuid,
        city: 'London',
        country: 'UK',
        method: '2',
        timeFormat: '12h',
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(200);
    expect(parsedBody.message).toBe('Settings saved successfully');
    expect(parsedBody.success).toBeTrue();
  });

  it('should save settings with asrMethod and maghribOffset', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        uuid: validUuid,
        city: 'London',
        country: 'UK',
        method: '2',
        timeFormat: '12h',
        asrMethod: 'hanafi',
        maghribOffset: '3',
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(200);
    expect(parsedBody.message).toBe('Settings saved successfully');
    expect(parsedBody.success).toBeTrue();
  });

  it('should return 400 if asrMethod is invalid', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        uuid: validUuid,
        city: 'London',
        country: 'UK',
        asrMethod: 'invalid',
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(400);
    expect(parsedBody.message).toBe('Invalid request parameters');
    expect(parsedBody.errors.fieldErrors.asrMethod).toBeDefined();
  });

  it('should return 400 if maghribOffset is not an integer', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        uuid: validUuid,
        city: 'London',
        country: 'UK',
        maghribOffset: 'not-an-integer',
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const parsedBody = JSON.parse(body);

    expect(statusCode).toBe(400);
    expect(parsedBody.message).toBe('Invalid request parameters');
    expect(parsedBody.errors.fieldErrors.maghribOffset).toBeDefined();
  });
});
