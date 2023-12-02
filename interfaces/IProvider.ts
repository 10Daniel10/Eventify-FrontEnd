import { ICategory } from "./ICategory"
import { IProduct } from "./IProduct"
import { IUser } from "./IUser"

export interface IProvider {
    id: number
    name: string
    information: string
    address: string
    defaultImage: string;
    category: ICategory[]
    products: IProduct[]
    user: IUser
}

export interface IUserProvider extends IProvider {
    country: string,
    province: string,
    shortDescription: string,
    description?: string,
    defaultImage: string,
    gallery?: string[],
    rating?: number
}
