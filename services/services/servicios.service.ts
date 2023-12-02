const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getServices = async (): Promise<any> => {
  const response = await fetch(`${apiUrl}/product`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })

  return await response.json();
}

export const getServicesByProvider = async (id: number): Promise<any> => {
  const response = await fetch(`${apiUrl}/product/provider/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })

  return await response.json();
}

export const getServiceById = async (id: number): Promise<any> => {

  if (id === 0) return

  const response = await fetch(`${apiUrl}/product/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })

  return await response.json();
}