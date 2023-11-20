const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getServices = async (): Promise<any> => {
  return await require('../../examples/services.json');

  const response = await fetch(`${apiUrl}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return await response.json();
}