import { IProduct } from "./IProduct";
import { IService } from "./IService";

export interface IReservation {
    userId: number,
    startDateTime: string,
    endDateTime?: string,
    products: IService[]
}