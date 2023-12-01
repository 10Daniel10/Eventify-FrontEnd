import { TUserData } from 'types';
import { LoginFormT, ValidateEmailT } from 'types/auth/LoginForm.types';
import { RegisterFormT } from 'types/auth/RegisterForm.types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const validateUserEmail = async (userEmail: string): Promise<boolean> => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener los datos del servidor. Código ${response.status}`);
    }

    const userDataArray: TUserData[] = await response.json();
    const emailExists = userDataArray.some(user => user.email === userEmail);

    return emailExists;
  } catch (error) {
    console.error("El correo que ingresaste no es válido:", error);
    return false;
  }
}

export const loginUser = async (data: LoginFormT): Promise<any> => {
  const userData = JSON.stringify(data);
  const response = await fetch(`${apiUrl}/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: userData,
  });

  localStorage.setItem('loginUser', userData);
  return await response.json();
}

export const logOut = async () => {
  localStorage.removeItem('loginUser');
}

export const createUser = async (data: RegisterFormT): Promise<any> => {
  data['firstname'] = data['email'];
  // data['type'] = 'USER';
  const userData = JSON.stringify(data);
  console.log(userData)

  const response = await fetch(`${apiUrl}/register`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: userData,
  });

  return await response.json();
}