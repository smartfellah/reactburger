export const checkResponse = (response) => {
  if (!response.ok) throw new Error(response.status);
  return response.json();
};
