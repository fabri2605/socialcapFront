import { randomInt } from 'crypto';
import { apiClient } from '../src/core/api-client.js';

// jest.mock('axios'); // Mocking the axios module

describe('get_merkle_map', () => {
  it('should query merkle_map data successfully', async () => {
    const mockResponse = {
      "id": 2,
      "name": "Maruco_2",
      "root": "20317599963995714678870893528527629958288036455177062299831345807553926030028",
      "count": 3
    }

    await apiClient.connect("localhost", 3081);

    const result = await apiClient.query("get_merkle_map", {id: 2});

    expect(result).toEqual(mockResponse);
  });
});

describe('create_merkle_map', () => {
  it('should mutate data successfully', async () => {
    const randomName = "Maruco"+randomInt(5000);
    const mockResponse = {
      "name": randomName,
      "count": 0
    }

    await apiClient.connect("localhost", 3081);

    const result = await apiClient.mutate("create_merkle_map", { 
      "name": randomName
    });

    expect(result.name).toEqual(mockResponse.name);
    expect(result.count).toEqual(mockResponse.count);
  });
});

describe('get_merkle_map_leaf', () => {
  it('should query merkle_leaf data successfully', async () => {
    const mockResponse = {
      "key": "340112523895721626410879996467678105233",
      "hash": "4578195092967266717504634214083983441340587705529266918892238724554861292777",
      "data": {
        "uid": "ffdf4a17-a35b-4703-be8e-8b16bdf54e91",
        "full_name": "ALgo Maruco Juan Zamudio",
        "alias": "perejilitos"
      }
    }
    await apiClient.connect("localhost", 3081);

    const result = await apiClient.query("get_merkle_map_leaf", ​{
      "mapId":2,
      "uid":"ffdf4a17-a35b-4703-be8e-8b16bdf54e91"
    });

    expect(result).toEqual(mockResponse);
  });
});
