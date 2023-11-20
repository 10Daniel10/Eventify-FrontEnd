import { LoginFormT } from 'types/auth/LoginForm.types';
import { RegisterFormT } from 'types/auth/RegisterForm.types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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