import { ICategory, IProduct, IProvider, IUser } from 'interfaces';

export interface IService {
  id?: number;
  name: string;
  price: number;
  information?: string;
  creationDate?: string;
  updateDate?: string;
  address?: string;
  category?: ICategory;
  provider?: IProvider;
  imageUrls?: string[];
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
  features_string?: string;
  features?: string[] | undefined;
}

export interface IServices {
  service: IService
}