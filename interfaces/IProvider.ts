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
