import { prayerTimesQuerySchema } from '@/handlers/prayer-times-handler/schema';

describe('Prayer Times Schema Validation', () => {
  it('validates valid parameters', () => {
    const params = { city: 'London', country: 'UK', method: 2 };
    const result = prayerTimesQuerySchema.safeParse(params);

    expect(result.success).toBeTrue();
    expect(result.data).toEqual(params);
  });

  it('trims whitespace from parameters', () => {
    const result = prayerTimesQuerySchema.safeParse({
      city: '  London  ',
      country: '  UK  ',
      method: 2,
    });

    expect(result.success).toBeTrue();
    expect(result.data).toEqual({ city: 'London', country: 'UK', method: 2 });
  });

  it('requires city parameter', () => {
    const result = prayerTimesQuerySchema.safeParse({
      country: 'UK',
      method: 2,
    });

    expect(result.success).toBeFalse();
    expect(result.error?.flatten().fieldErrors.city).toContain(
      'City is required',
    );
  });

  it('requires country parameter', () => {
    const result = prayerTimesQuerySchema.safeParse({
      city: 'London',
      method: 2,
    });

    expect(result.success).toBeFalse();
    expect(result.error?.flatten().fieldErrors.country).toContain(
      'Country is required',
    );
  });

  it('validates method range', () => {
    const result = prayerTimesQuerySchema.safeParse({
      city: 'London',
      country: 'UK',
      method: 20,
    });

    expect(result.success).toBeFalse();
    expect(result.error?.flatten().fieldErrors.method).toContain(
      'Method must be a number between 1 and 15',
    );
  });

  it('uses default method when not provided', () => {
    const result = prayerTimesQuerySchema.safeParse({
      city: 'London',
      country: 'UK',
    });

    expect(result.success).toBeTrue();
    expect(result.data?.method).toBe(2);
  });
});
