import { IProduct } from "./IProduct";

export interface IReservation {
    starDatetime: string,
    endDateTime: string,
    name: string,
    products: IProduct[]
}