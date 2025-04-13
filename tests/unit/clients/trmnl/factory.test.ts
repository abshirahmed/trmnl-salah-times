import { createTrmnlClient } from '@/clients/trmnl';
import { TrmnlClient } from '@/clients/trmnl/client';

describe('createTrmnlClient', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should create a TRMNL client with environment variables', () => {
    // Arrange
    process.env.TRMNL_CLIENT_ID = 'test-client-id';
    process.env.TRMNL_CLIENT_SECRET = 'test-client-secret';

    // Act
    const client = createTrmnlClient();

    // Assert
    expect(client).toBeInstanceOf(TrmnlClient);
  });

  it('should throw error if client ID is missing', () => {
    // Arrange
    delete process.env.TRMNL_CLIENT_ID;
    process.env.TRMNL_CLIENT_SECRET = 'test-client-secret';

    // Act & Assert
    expect(() => createTrmnlClient()).toThrow(
      'Missing TRMNL client credentials',
    );
  });

  it('should throw error if client secret is missing', () => {
    // Arrange
    process.env.TRMNL_CLIENT_ID = 'test-client-id';
    delete process.env.TRMNL_CLIENT_SECRET;

    // Act & Assert
    expect(() => createTrmnlClient()).toThrow(
      'Missing TRMNL client credentials',
    );
  });
});
