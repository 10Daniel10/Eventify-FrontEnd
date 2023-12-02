import { TUserData } from "types";
import { ICategory } from "./ICategory"
import { IService, IServiceProvider } from "./IService";

export interface IProvider {
  id: number;
  name: string;
  information: string;
  address: string;
  category: ICategory[];
  defaultImage: string;
  products: (IService & IServiceProvider)[];
  user: TUserData
}