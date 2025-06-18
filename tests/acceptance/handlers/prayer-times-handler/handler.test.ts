import { handler } from '@/handlers/prayer-times-handler';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';

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
    let responseBody;
    if (statusCode === 200 && body) {
      responseBody = JSON.parse(body);
    }

    expect(statusCode).toBe(200);

    expect(responseBody.enhancedData).toBeDefined();
    expect(responseBody.enhancedData.nextPrayer).toBeDefined();
    expect(responseBody.enhancedData.timeUntilNextPrayer).toBeDefined();
    expect(responseBody.enhancedData.hijriDateFormatted).toBeDefined();
  });

  it('should return prayer times using user settings for asr_method and maghrib_offset', async () => {
    // Use seeded user from supabase/seed.sql
    const userUuid = 'c1a1e2b0-1234-4a5b-8cde-222222222222';
    const testCity = 'New York';
    const testCountry = 'United States';
    const testMethod = 2;
    const testAsrMethod = 'hanafi';
    const testMaghribOffset = 2;

    const eventWithUserUuid = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: testCity,
        country: testCountry,
        method: testMethod,
        uuid: userUuid,
      },
    };

    const { statusCode, body } = await handler(
      eventWithUserUuid,
      mockLambdaContext,
    );

    let responseBody;
    if (statusCode === 200 && body) {
      responseBody = JSON.parse(body);
    }

    expect(statusCode).toBe(200);
    expect(responseBody.asr_method).toBe(testAsrMethod);
    expect(responseBody.maghrib_offset).toBe(testMaghribOffset);
    expect(responseBody.enhancedData).toBeDefined();
    expect(responseBody.enhancedData.nextPrayer).toBeDefined();
  });
});
