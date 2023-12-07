const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProviders = async ():Promise<any> => {
  const response = await fetch(`${apiUrl}/provider`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })

  return await response.json();
}

export const getProviderServices = async (id: number):Promise<any> => {
  const response = await fetch(`${apiUrl}/product/provider/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })

  return await response.json();
}

export const getReports = (providerId: string, dateFrom: string, dateTo: string):string => {
  return `${apiUrl}/report/${providerId}?startDate=${dateFrom}T00:00:00&endDate=${dateTo}T23:59:59`;
}