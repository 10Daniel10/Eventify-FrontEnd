import { ICategory, IPhoto, IProduct, IProvider, IUser } from 'interfaces';

export interface IService {
  id: number;
  name: string;
  price: number;
  information?: string;
  creationDate?: string;
  updateDate?: string;
  address?: string;
  category?: ICategory;
  provider?: IProvider;
  photos?: IPhoto[];
  products?: IProduct[];
  user?: IUser;
  bookedDates?: string[];
}

export interface IServiceProvider {
  shortDescription?: string;
  description?: string;
  location?: string;
  categoryId?: number;
  providerId?: number;
  bookedDates?: Date[];
}

export interface IServices {
  service: IService
}