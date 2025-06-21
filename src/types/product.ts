import { Brand } from "./brand";
import { Category } from "./category";

export type Product = {
    id: number;
    name: string;
    description:string;
    slug:string;
    image:string;
    price: number;
    stock?: number | undefined;
    category_id:number;
    category:Category;
    brand: Brand;
    brand_id:number;
    created_at: string;
    updated_at: string;
}