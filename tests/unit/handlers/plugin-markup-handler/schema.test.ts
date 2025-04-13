import { TrmnlViewSize } from '@/clients';
import { pluginMarkupQuerySchema } from '@/handlers/plugin-markup-handler/schema';

describe('Plugin Markup Query Schema Validation', () => {
  it('validates valid parameters', () => {
    const params = { view_size: TrmnlViewSize.Full };
    const result = pluginMarkupQuerySchema.safeParse(params);

    expect(result.success).toBeTrue();
    expect(result.data).toEqual(params);

    // Verify the type is correct using type inference
    expect(result.success).toBeTrue();
    const viewSize = result.data?.view_size;
    expect(viewSize).toBe(TrmnlViewSize.Full);
  });

  it('uses default view_size when not provided', () => {
    const result = pluginMarkupQuerySchema.safeParse({});

    expect(result.success).toBeTrue();
    expect(result.data?.view_size).toBe(TrmnlViewSize.Full);
  });

  it('validates view_size is one of the allowed values', () => {
    const result = pluginMarkupQuerySchema.safeParse({
      view_size: 'invalid',
    });

    expect(result.success).toBeFalse();
    expect(result.error?.flatten().fieldErrors.view_size).toBeDefined();
  });

  it('validates half view_size', () => {
    const result = pluginMarkupQuerySchema.safeParse({
      view_size: TrmnlViewSize.Half,
    });

    expect(result.success).toBeTrue();
    expect(result.data?.view_size).toBe(TrmnlViewSize.Half);
  });

  it('validates quadrant view_size', () => {
    const result = pluginMarkupQuerySchema.safeParse({
      view_size: TrmnlViewSize.Quadrant,
    });

    expect(result.success).toBeTrue();
    expect(result.data?.view_size).toBe(TrmnlViewSize.Quadrant);
  });
});
