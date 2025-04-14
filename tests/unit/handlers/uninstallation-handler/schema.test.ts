import { uninstallationBodySchema } from '@/handlers/uninstallation-handler/schema';

describe('Uninstallation Handler Schema', () => {
  describe('uninstallationBodySchema', () => {
    it('should validate a valid request body', () => {
      // Arrange
      const validBody = {
        user_uuid: '674c9d99-cea1-4e52-9025-9efbe0e30901',
      };

      // Act
      const result = uninstallationBodySchema.safeParse(validBody);

      // Assert
      expect(result.success).toBeTrue();
      expect(result.data).toEqual(validBody);
    });

    it('should reject a request body with missing user_uuid', () => {
      // Arrange
      const invalidBody = {};

      // Act
      const result = uninstallationBodySchema.safeParse(invalidBody);

      // Assert
      expect(result.success).toBeFalse();

      expect(result.error?.errors[0].path).toEqual(['user_uuid']);
      expect(result.error?.errors[0].message).toEqual('User UUID is required');
    });

    it('should reject a request body with invalid UUID format', () => {
      // Arrange
      const invalidBody = {
        user_uuid: 'not-a-uuid',
      };

      // Act
      const result = uninstallationBodySchema.safeParse(invalidBody);

      // Assert
      expect(result.success).toBeFalse();

      expect(result.error?.errors[0].path).toEqual(['user_uuid']);
      expect(result.error?.errors[0].message).toEqual('Invalid UUID format');
    });

    it('should trim whitespace from user_uuid', () => {
      // Arrange
      const bodyWithWhitespace = {
        user_uuid: '  674c9d99-cea1-4e52-9025-9efbe0e30901  ',
      };

      // Act
      const result = uninstallationBodySchema.safeParse(bodyWithWhitespace);

      // Assert
      expect(result.success).toBeTrue();
      expect(result.data?.user_uuid).toEqual(
        '674c9d99-cea1-4e52-9025-9efbe0e30901',
      );
    });
  });
});
