import { IUser } from "interfaces";
import router from "next/router";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getIdUser = () => {
    if (typeof window === 'undefined') return null;
    const localStorageData = localStorage.getItem('loginUser') || null;
    const userLocalStorage: IUser = localStorageData ? JSON.parse(localStorageData) : null;

    if (userLocalStorage == null) router.push("/")  //throw new Error("No tienes permisos")

    return userLocalStorage?.id;
}

export const getUserById = async (userId: number): Promise<any> => {
  const response = await fetch(`${apiUrl}/users/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    throw new Error(`Error al obtener usuario. Código: ${response.status}`);
  }

  return await response.json();
};