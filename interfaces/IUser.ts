export interface IUser {
  id: number,
  avatar?: string,
  username?: string,
  email: string,
  firstname?: string,
  lastname?: string,
  type: 'USER' | 'PROVIDER'
}

export interface UserClientI extends IUser {
  // fixMe: agregar type reservations
  reservations?: []
}

