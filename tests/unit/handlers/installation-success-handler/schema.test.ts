import { installationSuccessBodySchema } from '@/handlers/installation-success-handler/schema';

describe('Installation Success Body Schema Validation', () => {
  it('validates valid body', () => {
    const body = {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        locale: 'en',
        time_zone: 'Pacific Time (US & Canada)',
        time_zone_iana: 'America/Los_Angeles',
        utc_offset: -28800,
        plugin_setting_id: 1234,
        uuid: '674c9d99-cea1-4e52-9025-9efbe0e30901',
      },
    };
    const result = installationSuccessBodySchema.safeParse(body);

    expect(result.success).toBeTrue();
    expect(result.data).toEqual(body);
  });

  it('validates with minimal required fields', () => {
    const body = {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        time_zone_iana: 'America/Los_Angeles',
        plugin_setting_id: 1234,
        uuid: '674c9d99-cea1-4e52-9025-9efbe0e30901',
      },
    };
    const result = installationSuccessBodySchema.safeParse(body);

    expect(result.success).toBeTrue();
    expect(result.data).toEqual(body);
  });

  it('requires user object', () => {
    const result = installationSuccessBodySchema.safeParse({});

    expect(result.success).toBeFalse();
    expect(result.error?.flatten().fieldErrors.user).toBeDefined();
  });

  it('validates email format', () => {
    const body = {
      user: {
        name: 'Test User',
        email: 'invalid-email',
        time_zone_iana: 'America/Los_Angeles',
        plugin_setting_id: 1234,
        uuid: '674c9d99-cea1-4e52-9025-9efbe0e30901',
      },
    };
    const result = installationSuccessBodySchema.safeParse(body);

    expect(result.success).toBeFalse();
    expect(result.error?.errors[0].message).toContain('Invalid email format');
  });

  it('validates uuid format', () => {
    const body = {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        time_zone_iana: 'America/Los_Angeles',
        plugin_setting_id: 1234,
        uuid: 'invalid-uuid',
      },
    };
    const result = installationSuccessBodySchema.safeParse(body);

    expect(result.success).toBeFalse();
    expect(result.error?.errors[0].message).toContain('Invalid UUID format');
  });
});
