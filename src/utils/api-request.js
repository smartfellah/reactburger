import { checkResponse } from "./check-response";
import { checkSuccess } from "./check-success";
export const apiRequest = async (url, options) => {
  let data;
  try {
    const response = await fetch(url, options);
    data = await checkResponse(response);
    checkSuccess(data);
    return data;
  } catch (error) {
    console.log(`Error! \n${error.message}`);
    throw error;
  }
};
