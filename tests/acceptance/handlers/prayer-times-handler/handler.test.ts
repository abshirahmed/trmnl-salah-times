import { handler } from '@/handlers/prayer-times-handler';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';

jest.unmock('@/utils/logger');

describe('Prayer Times Handler', () => {
  const mockAPIGatewayProxyEvent = createMockAPIGatewayProxyEvent({
    requestContext: {},
    headers: {
      Accept: 'application/json',
    },
  });
  const mockLambdaContext = createMockLambdaContext();

  it('should return 400 if city is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        country: 'UK',
        method: 2,
      },
    };

    const { statusCode, message } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(400);
    expect(message).toContain('City is required');
  });

  it('should return 400 if country is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        method: 2,
      },
    };

    const { statusCode, message } = await handler(event, mockLambdaContext);

    expect(statusCode).toBe(400);
    expect(message).toContain('Country is required"');
  });

  it('should return enhanced data with next prayer information', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        country: 'UK',
      },
    };

    const { statusCode, body } = await handler(event, mockLambdaContext);
    const responseBody = JSON.parse(body);

    expect(statusCode).toBe(200);

    expect(responseBody.enhancedData).toBeDefined();
    expect(responseBody.enhancedData.nextPrayer).toBeDefined();
    expect(responseBody.enhancedData.timeUntilNextPrayer).toBeDefined();
    expect(responseBody.enhancedData.hijriDateFormatted).toBeDefined();
  });
});
