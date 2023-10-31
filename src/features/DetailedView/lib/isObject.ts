// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (value: any) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};
