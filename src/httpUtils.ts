export const validateResponse = async (
  response: Response
): Promise<Response | never> => {
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response;
};
