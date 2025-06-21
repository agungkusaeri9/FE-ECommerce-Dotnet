import { Courier } from "./courier";
import { PaymentMethod } from "./paymentMethod";
import { TransactionItem } from "./transactionItem";

export type Transaction = {
id: number;
uuid: string;
name:string;
code: string;
address: string;
courer: Courier;
paymentMethod: PaymentMethod;
subTotal: number;
dicountTotal: number;
total:number;
items: TransactionItem[];
status: string;
createdAt: string;

}