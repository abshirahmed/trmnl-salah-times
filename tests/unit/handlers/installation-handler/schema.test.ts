import { installationQuerySchema } from '@/handlers/installation-handler/schema';

describe('Installation Query Schema Validation', () => {
  it('validates valid parameters', () => {
    const params = {
      token: 'valid-token',
      installation_callback_url: 'https://usetrmnl.com/callback',
    };
    const result = installationQuerySchema.safeParse(params);

    expect(result.success).toBeTrue();
    expect(result.data).toEqual(params);
  });

  it('trims whitespace from parameters', () => {
    const result = installationQuerySchema.safeParse({
      token: '  valid-token  ',
      installation_callback_url: '  https://usetrmnl.com/callback  ',
    });

    expect(result.success).toBeTrue();
    expect(result.data).toEqual({
      token: 'valid-token',
      installation_callback_url: 'https://usetrmnl.com/callback',
    });
  });

  it('requires token parameter', () => {
    const result = installationQuerySchema.safeParse({
      installation_callback_url: 'https://usetrmnl.com/callback',
    });

    expect(result.success).toBeFalse();
    expect(result.error?.flatten().fieldErrors.token).toBeDefined();
  });

  it('requires installation_callback_url parameter', () => {
    const result = installationQuerySchema.safeParse({
      token: 'valid-token',
    });

    expect(result.success).toBeFalse();
    expect(
      result.error?.flatten().fieldErrors.installation_callback_url,
    ).toBeDefined();
  });

  it('validates installation_callback_url is a valid URL', () => {
    const result = installationQuerySchema.safeParse({
      token: 'valid-token',
      installation_callback_url: 'not-a-url',
    });

    expect(result.success).toBeFalse();
    expect(
      result.error?.flatten().fieldErrors.installation_callback_url,
    ).toContain('Installation callback URL must be a valid URL');
  });
});
