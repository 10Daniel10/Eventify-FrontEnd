import { getAllUsers } from "eventapp/services/auth/auth.service";
import { TUserData } from "types";

export const validateEmail = (email: string): string | undefined => {
  if (!email.includes('@') || !email.includes('.com')) {
    return 'Por favor, ingresa un correo electrónico válido.';
  }
  return undefined;
}

export const checkIfEmailExists = async (emailToCheck: string) => {
  try {
    const allUsers = await getAllUsers();

    const emailExists = allUsers.some((u: TUserData) => u.email === emailToCheck);

    return emailExists;
  } catch (error: any) {
    console.error('Error al verificar correo electrónico:', error);
    return false;
  }
}

export const validatePasswordLength = (password: string): string | undefined => {
  if (password.length < 8) {
    return 'La contraseña debe contener al menos 8 caracteres.';
  }
  return undefined;
}

export const comparePassword = (password: string, confirmPassword: string): string | undefined => {
  if (password !== confirmPassword) {
    return 'Las contraseñas deben coincidir.';
  }
  return undefined;
}

export const validateDate = (date: string): string | undefined => {
  if (!date ) {
    return 'Debes completar el campo de la fecha.';
  }
  return undefined;
};