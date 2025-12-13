export const convertQueryParamsArray = (ids: string): number[] => {
  return Array.isArray(ids) ? ids.map(Number) : [Number(ids)];
};
