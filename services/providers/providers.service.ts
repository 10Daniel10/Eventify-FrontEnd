const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProviders = async (): Promise<any> => {
  const response = await fetch(`${apiUrl}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return await response.json();
}