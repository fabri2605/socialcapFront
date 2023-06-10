import { CoreApiClient } from '../src/core/api-client.js';

describe('Public API status', () => {
  it('should get the status of API+Db server successfully', async () => {
    const mockResponse = {
      health: 'running',
      version: '0.1',
      db: {
        engine: 'None',
        connected: true,
        metrics: "NO_METRICS"
      }      
    }

    // Public API port is 3080
    const apiClient = new CoreApiClient();
    await apiClient.connect("localhost", 3080);

    const result = await apiClient.status();

    expect(result.health).toEqual(mockResponse.health);
    expect(result.db.connected).toEqual(mockResponse.db.connected);
    expect(result.db.metrics).toEqual(mockResponse.db.metrics);
  });

  it('should get the status of API+Db server with Metrics', async () => {
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
    const apiClient = new CoreApiClient();
    await apiClient.connect("localhost", 3080);

    const result = await apiClient.status({metrics: true});

    expect(result.health).toEqual(mockResponse.health);
    expect(result.db.connected).toEqual(mockResponse.db.connected);
    expect(result.db.metrics).not.toEqual("NO_METRICS");
  });
});

describe('Public API mutation', () => {
  it('should insert a Signup successfully', async () => {

    // Public API port is 3080
    const apiClient = new CoreApiClient();
    await apiClient.connect("localhost", 3080);

    const result = await apiClient.mutate("sign_up", {
      full_name: "Teresita Graciosa",
      email: "tg07@algo.com",
      phone: "54-11-1234-5678",
      telegram: "@TG01234"
    });
    console.log(result.data);

    expect(result).not.toEqual(null);
    expect(result.data.state).toEqual('PENDING');
  });

});


