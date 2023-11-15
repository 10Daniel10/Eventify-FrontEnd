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

export const validateTitleLength = (title: string): string | undefined => {
  if (title.length < 5) {
    return 'El título debe tener al menos 5 caracteres';
  }
  return undefined;
}

export const validateShortDescriptionLength = (shortDescription: string): string | undefined => {
  const wordCount = shortDescription.split(/\s+/).length;
  if (wordCount < 2 || wordCount > 30) {
    return 'La descripción corta debe tener entre 2 y 30 palabras.';
  }
  return undefined;
}

export const validateLongDescriptionLength = (longDescription: string): string | undefined => {
  const wordCount = longDescription.split(/\s+/).length;
  if ( wordCount < 30 || wordCount > 100) {
    return 'La descripción larga debe tener entre 30 y 100 palabras.';
  }
  return undefined;
}

export const validatePrice = (price: string): string | undefined => {
  const priceAsNumber = parseFloat(price);
  if (priceAsNumber === 0) {
    return 'El precio debe ser mayor a 0.';
  }
  return undefined;
}