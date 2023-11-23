export const validateEmail = (email: string): string | undefined => {
  if (!email.includes('@') || !email.includes('.com')) {
    return 'Por favor, ingresa un correo electrónico válido.';
  }
  return undefined;
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

export const validateTime = (time: string): string | undefined => {
  if (!time) {
    return 'Debes completar el campo de la hora.';
  }
  return undefined;
};

export const validateHours = (hour: number): string | undefined => {
  if (hour < 1) {
    return 'El evento debe durar al menos una hora.';
  }
  return undefined;
};