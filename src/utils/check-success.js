export const checkSuccess = (r) => {
  if (!(r && r.success)) throw new Error(`API error, check API request`);
  return r;
};
