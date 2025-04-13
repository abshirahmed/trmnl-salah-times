import { TrmnlClient } from '@/clients/trmnl';
import { TrmnlOAuthTokenResponse } from '@/clients/trmnl/types';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TrmnlClient', () => {
  const mockConfig = {
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  const mockTokenResponse: TrmnlOAuthTokenResponse = {
    access_token: 'test-access-token',
    token_type: 'bearer',
    expires_in: 3600,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.create.mockReturnValue(mockedAxios);
  });

  describe('exchangeCodeForToken', () => {
    it('should exchange code for token', async () => {
      // Arrange
      mockedAxios.post.mockResolvedValueOnce({ data: mockTokenResponse });
      const client = new TrmnlClient(mockConfig);

      // Act
      const result = await client.exchangeCodeForToken('test-code');

      // Assert
      expect(mockedAxios.post).toHaveBeenCalledWith('/oauth/token', {
        code: 'test-code',
        client_id: mockConfig.clientId,
        client_secret: mockConfig.clientSecret,
        grant_type: 'authorization_code',
      });
      expect(result).toEqual(mockTokenResponse);
    });

    it('should throw error if exchange fails', async () => {
      // Arrange
      const error = new Error('Exchange failed');
      mockedAxios.post.mockRejectedValueOnce(error);
      const client = new TrmnlClient(mockConfig);

      // Act & Assert
      await expect(client.exchangeCodeForToken('test-code')).rejects.toThrow(
        'Exchange failed',
      );
    });
  });

  describe('verifyToken', () => {
    it('should return true if token is valid', async () => {
      // Arrange
      mockedAxios.get.mockResolvedValueOnce({ data: {} });
      const client = new TrmnlClient(mockConfig);

      // Act
      const result = await client.verifyToken('test-token');

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/me', {
        headers: {
          Authorization: 'Bearer test-token',
        },
      });
      expect(result).toBeTrue();
    });

    it('should return false if token is invalid', async () => {
      // Arrange
      mockedAxios.get.mockRejectedValueOnce(new Error('Invalid token'));
      const client = new TrmnlClient(mockConfig);

      // Act
      const result = await client.verifyToken('test-token');

      // Assert
      expect(result).toBeFalse();
    });
  });

  describe('refreshToken', () => {
    it('should refresh token', async () => {
      // Arrange
      mockedAxios.post.mockResolvedValueOnce({ data: mockTokenResponse });
      const client = new TrmnlClient(mockConfig);

      // Act
      const result = await client.refreshToken('test-refresh-token');

      // Assert
      expect(mockedAxios.post).toHaveBeenCalledWith('/oauth/token', {
        refresh_token: 'test-refresh-token',
        client_id: mockConfig.clientId,
        client_secret: mockConfig.clientSecret,
        grant_type: 'refresh_token',
      });
      expect(result).toEqual(mockTokenResponse);
    });

    it('should throw error if refresh fails', async () => {
      // Arrange
      const error = new Error('Refresh failed');
      mockedAxios.post.mockRejectedValueOnce(error);
      const client = new TrmnlClient(mockConfig);

      // Act & Assert
      await expect(client.refreshToken('test-refresh-token')).rejects.toThrow(
        'Refresh failed',
      );
    });
  });
});
