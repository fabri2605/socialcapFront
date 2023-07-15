/**
 * Results template
 */
interface QueryResult {
  data: {
    start: number, 
    count: number,
    limit: number,
    total: number,
    data: Array<any> // 0 or more items
  },
  error: null
};

interface MutationResult {
  data: any,
  error: null
};

function formatQueryResult(
  data: Array<any>,
  total?: number, 
  start?: number, 
  limit?: number,
): QueryResult {
  const count = (data || []).length;
  return {
    data: {
      start: start || 0,
      limit: limit || 1000,
      total: total || count,
      count: count,
      data: data || []
    },
    error: null
  }
}

function formatMutationResult(
  data: any
): MutationResult {
  const count = (data || []).length;
  return {
    data: data || {},
    error: null
  }
}

export { 
  QueryResult, 
  formatQueryResult,
  MutationResult, 
  formatMutationResult
};
