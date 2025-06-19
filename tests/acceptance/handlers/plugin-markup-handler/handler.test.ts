import { Tables } from '@/clients/supabase/database.types';
import { handler } from '@/handlers/plugin-markup-handler';
import { getUserSettings } from '@/services/user-settings';
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
  const mockedGetUserSettings = jest.mocked(getUserSettings);

  const STANDARD_USER_UUID = 'c1a1e2b0-1234-4a5b-8cde-111111111111';
  const HANAFI_USER_UUID = 'c1a1e2b0-1234-4a5b-8cde-666666666666';
  const baseResponse = {
    error: null,
    count: null,
    status: 200,
    statusText: 'OK',
  };
  const userSettingsMap: Record<string, Tables<'user_settings'>> = {
    [STANDARD_USER_UUID]: {
      city: 'London',
      country: 'UK',
      method: 2,
      asr_method: 'standard',
      maghrib_offset: 0,
      created_at: null,
      id: null,
      timeformat: '24h',
      updated_at: null,
      uuid: STANDARD_USER_UUID,
    },
    [HANAFI_USER_UUID]: {
      city: 'London',
      country: 'UK',
      method: 2,
      asr_method: 'hanafi',
      maghrib_offset: 5,
      created_at: null,
      id: null,
      timeformat: '24h',
      updated_at: null,
      uuid: HANAFI_USER_UUID,
    },
  };
  const defaultSettings: Tables<'user_settings'> = {
    city: 'London',
    country: 'UK',
    method: 2,
    asr_method: 'standard',
    maghrib_offset: 0,
    created_at: null,
    id: null,
    timeformat: '24h',
    updated_at: null,
    uuid: '',
  };

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

  it('should return different Asr and Maghrib times in the markup for two users in London with different asr_method and maghrib_offset settings', async () => {
    mockedGetUserSettings.mockImplementation((uuid: string) => {
      return Promise.resolve({
        data: userSettingsMap[uuid] || defaultSettings,
        ...baseResponse,
      });
    });

    const eventUser1 = {
      ...mockAPIGatewayProxyEvent,
      body: {
        user_uuid: STANDARD_USER_UUID,
      },
    };
    const eventUser2 = {
      ...mockAPIGatewayProxyEvent,
      body: {
        user_uuid: HANAFI_USER_UUID,
      },
    };

    const { body: bodyUser1, statusCode: statusCode1 } = await handler(
      eventUser1,
      mockLambdaContext,
    );
    const { body: bodyUser2, statusCode: statusCode2 } = await handler(
      eventUser2,
      mockLambdaContext,
    );

    expect(statusCode1).toBe(200);
    expect(statusCode2).toBe(200);
    expect(bodyUser1).toBeDefined();
    expect(bodyUser2).toBeDefined();

    // More permissive regex to extract Asr and Maghrib times from the HTML markup
    const asrRegex =
      /<td[^>]*>[\s\S]*?<span[^>]*>Asr<\/span>[\s\S]*?<\/td>[\s\S]*?<td[^>]*>[\s\S]*?<span[^>]*>(\d{1,2}:\d{2})<\/span>/i;
    const maghribRegex =
      /<td[^>]*>[\s\S]*?<span[^>]*>Maghrib<\/span>[\s\S]*?<\/td>[\s\S]*?<td[^>]*>[\s\S]*?<span[^>]*>(\d{1,2}:\d{2})<\/span>/i;

    const asrTimeUser1 = asrRegex.exec(bodyUser1)?.[1];
    const asrTimeUser2 = asrRegex.exec(bodyUser2)?.[1];
    const maghribTimeUser1 = maghribRegex.exec(bodyUser1)?.[1];
    const maghribTimeUser2 = maghribRegex.exec(bodyUser2)?.[1];

    expect(asrTimeUser1).toBeDefined();
    expect(asrTimeUser2).toBeDefined();
    expect(maghribTimeUser1).toBeDefined();
    expect(maghribTimeUser2).toBeDefined();
    expect(asrTimeUser1).not.toBe(asrTimeUser2);
    expect(maghribTimeUser1).not.toBe(maghribTimeUser2);
  });
});
