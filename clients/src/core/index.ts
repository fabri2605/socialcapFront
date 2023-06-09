import { IsError, hasError, isError } from "./errors.js";
import { CoreApiClient } from "./api-client.js"

export { 
  CoreApiClient, 
  IsError, 
  hasError,
  isError
};

/*
Usage example: 

  const apiClient = new CoreApiClient();

  await apiClient.connect("localhost", 3080);

  const rs = await apiClient.status({ metrics: true });
  if (isError(rs))
    // do something about this ...

  const rs = await apiClient.query('get_person', { 
    email: 'maz...@...com'
  });
  if (isError(rs))
    // do something about this ...    

  const rs = await apiClient.mutate('update_person', { 
    uid: '123...123', fullName: 'Juancito Perez'
  });
  if (isError(rs))
    // do something about this ... 
*/
    