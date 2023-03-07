export const checkResponse = <T>(response: Response): Promise<T> => {
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return response.json();
};
