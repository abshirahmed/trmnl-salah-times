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
        country: 'GB',
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
    expect(responseBody).toHaveProperty('enhancedData');
    expect(responseBody.enhancedData).toHaveProperty('nextPrayer');
  });

  it('should return different Asr times for standard vs hanafi asr_method', async () => {
    const baseEvent = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        country: 'GB',
        method: 2,
      },
    };

    // Standard (Shafi)
    const eventStandard = {
      ...baseEvent,
      queryStringParameters: {
        ...baseEvent.queryStringParameters,
        asr_method: 'standard',
      },
    };
    const { body: bodyStandard } = await handler(
      eventStandard,
      mockLambdaContext,
    );
    const bodyStandardParsed = JSON.parse(bodyStandard);
    const schoolStandard =
      bodyStandardParsed.enhancedData?.rawData?.meta?.school;
    const asrTimeStandard = bodyStandardParsed.timings?.Asr;

    // Hanafi
    const eventHanafi = {
      ...baseEvent,
      queryStringParameters: {
        ...baseEvent.queryStringParameters,
        asr_method: 'hanafi',
      },
    };
    const { body: bodyHanafi } = await handler(eventHanafi, mockLambdaContext);
    const bodyHanafiParsed = JSON.parse(bodyHanafi);
    const schoolHanafi = bodyHanafiParsed.enhancedData?.rawData?.meta?.school;
    const asrTimeHanafi = bodyHanafiParsed.timings?.Asr;

    // Check that the school is different
    expect(schoolStandard).toBeDefined();
    expect(schoolHanafi).toBeDefined();
    expect(schoolStandard).not.toBe(schoolHanafi);
    // Check that the Asr times are different
    expect(asrTimeStandard).toBeDefined();
    expect(asrTimeHanafi).toBeDefined();
    expect(asrTimeStandard).not.toBe(asrTimeHanafi);
  });

  it('should return different Maghrib times for different maghrib_offset values', async () => {
    const baseEvent = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        country: 'GB',
        method: 2,
      },
    };

    // maghrib_offset = 0
    const eventOffset0 = {
      ...baseEvent,
      queryStringParameters: {
        ...baseEvent.queryStringParameters,
        maghrib_offset: 0,
      },
    };
    const { body: bodyOffset0 } = await handler(
      eventOffset0,
      mockLambdaContext,
    );
    const parsed0 = JSON.parse(bodyOffset0);
    const maghribTime0 = parsed0.timings?.Maghrib;
    const offset0 = parsed0.enhancedData?.rawData?.meta?.offset?.Maghrib;

    // maghrib_offset = 5
    const eventOffset5 = {
      ...baseEvent,
      queryStringParameters: {
        ...baseEvent.queryStringParameters,
        maghrib_offset: 5,
      },
    };
    const { body: bodyOffset5 } = await handler(
      eventOffset5,
      mockLambdaContext,
    );
    const parsed5 = JSON.parse(bodyOffset5);
    const maghribTime5 = parsed5.timings?.Maghrib;
    const offset5 = parsed5.enhancedData?.rawData?.meta?.offset?.Maghrib;

    expect(maghribTime0).toBeDefined();
    expect(maghribTime5).toBeDefined();
    expect(offset0).toBeDefined();
    expect(offset5).toBeDefined();
    expect(maghribTime0).not.toBe(maghribTime5);
  });

  it('should return different Asr and Maghrib times for two users in London with different asr_method and maghrib_offset settings', async () => {
    // User 1: standard asr_method, maghrib_offset 0
    const user1Uuid = 'c1a1e2b0-1234-4a5b-8cde-111111111111'; // This should match a seeded user with these settings
    // User 2: hanafi asr_method, maghrib_offset 5
    const user2Uuid = 'c1a1e2b0-1234-4a5b-8cde-666666666666'; // This should match a seeded user with these settings

    const baseQuery = {
      city: 'London',
      country: 'GB',
      method: 2,
    };

    // User 1 event
    const eventUser1 = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        ...baseQuery,
        uuid: user1Uuid,
      },
    };
    // User 2 event
    const eventUser2 = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        ...baseQuery,
        uuid: user2Uuid,
      },
    };

    const { body: bodyUser1 } = await handler(eventUser1, mockLambdaContext);
    const { body: bodyUser2 } = await handler(eventUser2, mockLambdaContext);

    const parsedUser1 = JSON.parse(bodyUser1);
    const parsedUser2 = JSON.parse(bodyUser2);

    const asrTimeUser1 = parsedUser1.timings?.Asr;
    const asrTimeUser2 = parsedUser2.timings?.Asr;
    const maghribTimeUser1 = parsedUser1.timings?.Maghrib;
    const maghribTimeUser2 = parsedUser2.timings?.Maghrib;

    expect(asrTimeUser1).toBeDefined();
    expect(asrTimeUser2).toBeDefined();
    expect(maghribTimeUser1).toBeDefined();
    expect(maghribTimeUser2).toBeDefined();
    expect(asrTimeUser1).not.toBe(asrTimeUser2);
    expect(maghribTimeUser1).not.toBe(maghribTimeUser2);
  });
});
