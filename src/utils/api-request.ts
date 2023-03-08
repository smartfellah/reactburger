type TServerResponse<T> = {
  success: boolean;
} & T;
const checkResponse = <T>(response: Response): Promise<T> => {
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return response.json();
};

export const checkSuccess = <T>(r: TServerResponse<T>): T => {
  if (!(r && r.success)) throw new Error(`API error, check API request`);
  return r;
};

export const apiRequest = async <T>(
  url: RequestInfo | URL,
  options?: RequestInit
): Promise<T> => {
  let data: T;
  let response;
  try {
    response = await fetch(url, options);
    data = await checkResponse<T>(response);
    return data;
  } catch (error) {
    throw response?.status;
  }
};
