import { User } from "./user.type";
import { ResponseApiSuccess } from "./utils.type";

export type TransactionResponseApiSuccess = ResponseApiSuccess<Transaction>;

export type Transaction = {
    user: string | User;
    money: number;
    currencyUnit: string;
    type: string;
    date: string;
    note: string;
    idCategory: string;
    wallet: string;
    transactions: any;
    data: any;
    totalSpending: any
};
