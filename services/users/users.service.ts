import { IUser } from "interfaces";
import router from "next/router";

export const getIdUser = () => {
    if (typeof window === 'undefined') return null;
    const localStorageData = localStorage.getItem('loginUser') || null;
    const userLocalStorage: IUser = localStorageData ? JSON.parse(localStorageData) : null;

    if (userLocalStorage == null) router.push("/")  //throw new Error("No tienes permisos")

    return userLocalStorage?.id;
}