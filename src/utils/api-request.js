import { checkResponse } from "./check-response";
export const apiRequest = (url, options) => {
  return fetch(url, options).then(checkResponse);
};
