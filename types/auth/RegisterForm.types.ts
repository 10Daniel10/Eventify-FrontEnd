export type RegisterFormT = {
  firstname: string,
  lastname: string,
  type: 'USER' | 'PROVIDER',
  email: string,
  password: string,
  confirmPassword: string
}