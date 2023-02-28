export const checkResponse = (response) => {
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return response.json();
};
