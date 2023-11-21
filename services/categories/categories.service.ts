const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = async (): Promise<any> => {
  return await require('../../examples/categories.json');

  const response = await fetch(`${apiUrl}/category`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: 'GET'
  });
  return await response.json();
}