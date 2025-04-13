import { handler } from '@/handlers/prayer-times-handler/index';
import { getPrayerTimesByCity } from '@/services/prayer-times';
import { createMockAPIGatewayProxyEvent } from '@tests/mocks/createMockAPIGatewayProxyEvent';
import { createMockLambdaContext } from '@tests/mocks/createMockLambdaContext';

// Mock the getPrayerTimesByCity function
jest.mock('@/services/prayer-times', () => ({
  getPrayerTimesByCity: jest.fn(),
}));

describe('Prayer Times Handler', () => {
  const mockAPIGatewayProxyEvent = createMockAPIGatewayProxyEvent({
    requestContext: {},
    headers: {
      Accept: 'application/json',
    },
  });
  const mockLambdaContext = createMockLambdaContext();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if city is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        country: 'UK',
        method: 2,
      },
    };

    const response = await handler(event, mockLambdaContext);

    expect(response.statusCode).toBe(400);
    expect(response.message).toBe('Invalid query parameters');
  });

  it('should return 400 if country is missing', async () => {
    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        method: 2,
      },
    };

    const response = await handler(event, mockLambdaContext);

    expect(response.statusCode).toBe(400);
    expect(response.message).toBe('Invalid query parameters');
  });

  it('should call getPrayerTimesByCity with correct parameters', async () => {
    const mockResponse = {
      code: 200,
      status: 'OK',
      data: {
        timings: {
          Fajr: '05:30',
          Sunrise: '07:00',
          Dhuhr: '12:00',
          Asr: '15:00',
          Maghrib: '18:00',
          Isha: '19:30',
        },
        date: {
          readable: '01 Jan 2023',
          hijri: {
            day: '10',
            month: {
              en: 'Ramadan',
            },
            year: '1444',
          },
        },
      },
    };

    (getPrayerTimesByCity as jest.Mock).mockResolvedValue(mockResponse);

    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        country: 'UK',
        method: 2,
      },
    };

    await handler(event, mockLambdaContext);

    expect(getPrayerTimesByCity).toHaveBeenCalledWith({
      city: 'London',
      country: 'UK',
      method: 2,
    });
  });

  it('should return enhanced data with next prayer information', async () => {
    const mockResponse = {
      code: 200,
      status: 'OK',
      data: {
        timings: {
          Fajr: '05:30',
          Sunrise: '07:00',
          Dhuhr: '12:00',
          Asr: '15:00',
          Maghrib: '18:00',
          Isha: '19:30',
        },
        date: {
          readable: '01 Jan 2023',
          hijri: {
            day: '10',
            month: {
              en: 'Ramadan',
            },
            year: '1444',
          },
        },
      },
    };

    (getPrayerTimesByCity as jest.Mock).mockResolvedValue(mockResponse);

    const event = {
      ...mockAPIGatewayProxyEvent,
      queryStringParameters: {
        city: 'London',
        country: 'UK',
      },
    };

    const response = await handler(event, mockLambdaContext);

    expect(response.statusCode).toBe(200);

    const responseBody = JSON.parse(response.body);
    expect(responseBody.enhancedData).toBeDefined();
    expect(responseBody.enhancedData.nextPrayer).toBeDefined();
    expect(responseBody.enhancedData.timeUntilNextPrayer).toBeDefined();
    expect(responseBody.enhancedData.hijriDateFormatted).toBeDefined();
  });
});
