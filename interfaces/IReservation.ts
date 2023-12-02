import { IProduct } from "./IProduct";

export interface IReservation {
    starDatetime: string,
    endDateTime?: string,
    products: IProduct[]
}