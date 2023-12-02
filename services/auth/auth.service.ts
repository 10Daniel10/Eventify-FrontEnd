import { TUserData, TUserLogin, TUserRegister } from 'types';
import { LoginFormT, ValidateEmailT } from 'types/auth/LoginForm.types';
import { RegisterFormT } from 'types/auth/RegisterForm.types';

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

// export const validateUserEmail = async (userEmail: string): Promise<boolean> => {
//   const getEmails = await getAllUsers();

//   try {
//     const response = await fetch(`${apiUrl}/users`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`Error al obtener los datos del servidor. Código ${response.status}`);
//     }

//     const userDataArray: TUserData[] = await response.json();
//     const emailExists = userDataArray.some(user => user.email === userEmail);

//     return emailExists;
//   } catch (error) {
//     console.error("El correo que ingresaste no es válido:", error);
//     return false;
//   }
// }

export const loginUser = async (data: TUserLogin): Promise<any> => {
  const userData = JSON.stringify(data);

  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: userData
    });

    if (response.ok) {
      const responseData = await response.json();
      
      const userInformation = {
        id: responseData.id,
        email: responseData.email,
        username: responseData.username,
        firstname: responseData.firstname,
        lastname: responseData.lastname,
        type: responseData.type
      };

      localStorage.setItem('loginUser', JSON.stringify(userInformation));

      return responseData;
    } else {
      console.error('Error en la solicitud de inicio de sesión:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error al procesar la solicitud de inicio de sesión:', error);
    return null;
  }
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

  localStorage.setItem('loginUser', JSON.stringify(data.email));
  return await response.json();
}