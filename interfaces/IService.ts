import { ICategory, IPhoto, IProduct, IUser } from 'interfaces';

export interface IService {
  id: number,
  name: string,
  information: string,
  creationDate: string,
  updateDate: string,
  address: string,
  price: number,
  category: ICategory,
  photos: IPhoto[],
  products: IProduct[],
  user: IUser
}

export interface IServices {
  service: IService
}