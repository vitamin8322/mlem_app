import { User } from "./user.type";
import { ResponseApiSuccess } from "./utils.type";

export type CategoryResponseApiSuccess = ResponseApiSuccess<Category[]>;

export type Category = {
    _id: string;
    user: string | User;
    name: string;
    icon: string;
    type: string;
    fill?: string;
    isDelete?: string;
};
