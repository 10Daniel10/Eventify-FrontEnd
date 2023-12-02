import { TUserLogin, TUserRegister } from 'types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async ():Promise<any> => {
  const response = await fetch(`${apiUrl}/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })

  return await response.json();
}

export const loginUser = async (data: TUserLogin): Promise<any> => {
  const userData = JSON.stringify(data);

  const response = await fetch(`${apiUrl}/users/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: userData
  });

  return response;
};

export const logOut = async () => {
  localStorage.removeItem('loginUser');
}

export const createUser = async (data: TUserRegister): Promise<any> => {
  const userData = JSON.stringify(data);

  const response = await fetch(`${apiUrl}/users/register`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: userData,
  });

  return response;
}