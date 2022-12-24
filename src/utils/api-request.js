import { checkResponse } from "./check-response";
import { checkSuccess } from "./check-success";
export const apiRequest = async (url, options) => {
  return await fetch(url, options).then(checkResponse).then(checkSuccess);
};
