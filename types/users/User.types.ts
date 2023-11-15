import { CategoriesT } from 'types/categories/Category.types';

export type UserT = {
  id: number,
  type: 'client' | 'provider',
  avatar?: string,
  firstName: string,
  lastName: string,
  email?: string
}

export interface UserClientI extends UserT {
  // fixMe: agregar type reservations
  reservations?: []
}

export interface UserProviderI extends UserT {
  country: string,
  province: string,
  shortDescription: string,
  description?: string,
  categories?: CategoriesT[],
  defaultImage: string,
  gallery?: string[],
  rating?: number
}