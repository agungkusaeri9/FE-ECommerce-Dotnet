import { Product } from "./product";

export type Stock = {
    id: number;
    type: string;
    productId: number;
    qty: number;
    product: Product;
    createdAt: string;
    updatedAt: string;
}