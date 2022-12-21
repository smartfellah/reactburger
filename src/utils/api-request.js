import { checkResponse } from "./check-response";
export const apiRequest = async (url, options) => {
  return await fetch(url, options).then(checkResponse);
};
