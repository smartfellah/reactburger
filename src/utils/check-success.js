export const checkSuccess = (r) => {
  if (!(r && r.success)) throw new Error();
  return r;
};
