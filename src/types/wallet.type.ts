import { User } from "./user.type";
import { ResponseApiSuccess } from "./utils.type";

export type WalletApiSuccess = ResponseApiSuccess<Wallet>;

export type Wallet = {
    user: string | User;
    name: number;
    idWallet: string;
    money: Number;
    _id: string;
    isDefault: boolean
};
