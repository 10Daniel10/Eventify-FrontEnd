const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = async (): Promise<any> => {

  const response = await fetch(`${apiUrl}/category`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: 'GET'
  });

  console.log({ response })
  return await response.json();
}