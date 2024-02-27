import { ResponseApiSuccess } from "./utils.type";

export type UserResponseApiSuccess = ResponseApiSuccess<User>;

export type User = {
  email: string;
  user_id: string;
  username: string;
  access_token: string;
  user: any
};
