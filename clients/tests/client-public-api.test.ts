import { apiClient } from '../src/core/api-client.js';


describe('Public API status', () => {
  it('should get the status of API server and DB successfully', async () => {
    const mockResponse = {
      health: 'running',
      version: '0.1',
      db: {
        engine: 'None',
        connected: true,
        metrics: {}
      }      
    }

    // Public API port is 3080
    await apiClient.connect("localhost", 3080);

    const result = await apiClient.status();

    expect(result.health).toEqual(mockResponse.health);
    expect(result.db.connected).toEqual(mockResponse.db.connected);
  });
});

