import { createSupabaseClient } from '@/clients/supabase';
import { handler } from '@/handlers/prayer-times-handler';
import { saveUserSettings } from '@/services/user-settings';
import { v4 as uuidv4 } from 'uuid';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';
import { waitForRowInSupabase } from '@tests/utils/waitForRowInSupabase';

jest.unmock('@/utils/logger');

describe('Prayer Times Handler', () => {
  const testUuids: string[] = [];

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

  it('should return prayer times using user settings for asr_method and maghrib_offset', async () => {
    const userUuid = uuidv4();
    testUuids.push(userUuid);
    const testCity = 'London';
    const testCountry = 'UK';
    const testMethod = 2;
    const testAsrMethod = 'hanafi';
    const testMaghribOffset = 5;

    // Save user settings
    await saveUserSettings({
      uuid: userUuid,
      city: testCity,
      country: testCountry,
      method: testMethod,
      timeformat: '12h',
      asr_method: testAsrMethod,
      maghrib_offset: testMaghribOffset,
    });

    // Wait for DB consistency (Supabase emulator can be slow in CI)
    await waitForRowInSupabase('user_settings', { uuid: userUuid });

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

    const responseBody = JSON.parse(body);

    expect(statusCode).toBe(200);
    expect(responseBody.asr_method).toBe(testAsrMethod);
    expect(responseBody.maghrib_offset).toBe(testMaghribOffset);
    expect(responseBody.enhancedData).toBeDefined();
    expect(responseBody.enhancedData.nextPrayer).toBeDefined();
  });

  afterAll(async () => {
    const supabase = createSupabaseClient();
    for (const uuid of testUuids) {
      await supabase.from('user_settings').delete().eq('uuid', uuid);
    }
  });
});
