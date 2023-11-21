import { IService } from "interfaces";

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

export const getServiceById = async (id: string | string[] | undefined) => {
  return await require('../../examples/service.json');

  // const services = await getServices();

  // // Buscar el servicio por su ID
  // const service = services.find((s: IService) => s.id === id);

  // return service;
}