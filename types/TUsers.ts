export type TUserData = {
  id?: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  type: 'USER' | 'PROVIDER';
}

export type TUserLogin = {
  email: string;
  password: string;
}

export type TUserRegister = {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  type: 'USER' | 'PROVIDER';
  password: string;
  confirmPassword: string;
  isProvider?: boolean;
}

export type TUserEmail = {
  email: string;
}