import { handler } from '@/handlers/prayer-times-handler/index';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';

describe('prayerTimesHandler', () => {
  const mockAPIGatewayProxyEvent = createMockAPIGatewayProxyEvent({
    requestContext: {},
    headers: {
      Accept: 'application/json',
    },
  });
  const mockLambdaContext = createMockLambdaContext();

  it('should return 400 if city or country is missing', async () => {
    // Create a mock event with missing parameters
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        // country is missing
      },
    };

    const response = await handler(event, mockLambdaContext);

    expect(response.statusCode).toBe(400);
    expect(response.message).toBe('Invalid query parameters');
    expect(response.errors.fieldErrors.country).toContain(
      'Country is required',
    );
  });

  it('should return prayer times data for valid parameters', async () => {
    // Create a mock event with valid parameters
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        country: 'UK',
        method: 2,
      },
    };

    const response = await handler(event, mockLambdaContext);

    // Verify the response
    expect(response.statusCode).toBe(200);

    // Parse the response body
    const responseBody = JSON.parse(response.body);

    // Verify enhanced data is present
    expect(responseBody.enhancedData).toHaveProperty('nextPrayer');
    expect(responseBody.enhancedData).toHaveProperty('timeUntilNextPrayer');
    expect(responseBody.enhancedData).toHaveProperty('hijriDateFormatted');
  });

  it('should include next prayer information in the response', async () => {
    // Create a mock event with valid parameters
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        country: 'UK',
      },
    };

    const response = await handler(event, mockLambdaContext);

    // Verify next prayer information is included
    const responseBody = JSON.parse(response.body);
    expect(responseBody.enhancedData.nextPrayer).toBeDefined();
    expect(responseBody.enhancedData.nextPrayerTime).toBeDefined();
    expect(responseBody.enhancedData.timeUntilNextPrayer).toBeDefined();
    expect(responseBody.enhancedData.timeUntilNextPrayer.hours).toBeDefined();
    expect(responseBody.enhancedData.timeUntilNextPrayer.minutes).toBeDefined();
    expect(
      responseBody.enhancedData.timeUntilNextPrayer.total_minutes,
    ).toBeDefined();
  });
});
