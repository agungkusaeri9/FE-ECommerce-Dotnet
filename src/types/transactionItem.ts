import { Product } from "./product";

export type TransactionItem = {
    id: number;
    product: Product;
    quantity: number;
    price: number;
    discount: number;
    total: number;
    
}