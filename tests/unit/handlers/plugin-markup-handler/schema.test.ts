import { pluginMarkupBodySchema } from '@/handlers/plugin-markup-handler/schema';

describe('Plugin Markup Body Schema Validation', () => {
  it('validates valid parameters', () => {
    const params = { user_uuid: '123e4567-e89b-12d3-a456-426614174000' };
    const result = pluginMarkupBodySchema.safeParse(params);

    expect(result.success).toBeTrue();
    expect(result.data).toEqual(params);

    // Verify the type is correct using type inference
    expect(result.success).toBeTrue();
    const uuid = result.data?.user_uuid;
    expect(uuid).toBe('123e4567-e89b-12d3-a456-426614174000');
  });

  it('rejects when user_uuid is not provided', () => {
    const result = pluginMarkupBodySchema.safeParse({});

    expect(result.success).toBeFalse();
    expect(result.error?.flatten().fieldErrors.user_uuid).toBeDefined();
  });

  it('validates user_uuid is a valid UUID format', () => {
    const result = pluginMarkupBodySchema.safeParse({
      user_uuid: 'invalid-uuid',
    });

    expect(result.success).toBeFalse();
    expect(result.error?.flatten().fieldErrors.user_uuid).toBeDefined();
  });

  it('validates UUID with trailing whitespace', () => {
    // The UUID validation in Zod is strict and doesn't allow spaces
    // This test verifies that behavior
    const result = pluginMarkupBodySchema.safeParse({
      user_uuid: '123e4567-e89b-12d3-a456-426614174000  ',
    });

    // The validation should fail because of the trailing spaces
    expect(result.success).toBeFalse();
    expect(result.error?.flatten().fieldErrors.user_uuid).toBeDefined();
  });
});
