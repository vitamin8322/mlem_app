import { ResponseApiSuccess } from "./utils.type";

export type UserResponseApiSuccess = ResponseApiSuccess<User>;

export type User = {
  email: string;
  is_subscribe: string;
  logged_in: boolean;
  user_id: string;
  username: string;
  is_gold_user?: number;
  access_token: string;
  phone_number: string;
  fname?: string;
  lname?: string;
};
