import queryString from 'query-string';
import {UserResponseApiSuccess} from 'types/user.type';
import { ResponseApiSuccess } from 'types/utils.type';
import http from 'utils/http';
import { ChangePasswordSchema, EditProfileSchema } from 'utils/schema';

export const URL_LOGIN = 'api/auth/login';
export const URL_REGISTER = 'api/app/register';
export const URL_SOCIAL_AUTHENTICATION = '/api/app/social-authentication';
export const URL_USER_INFO = '/api/auth/user-info';

export const login = (data: { email: string, password: string }) => {
    return http.post<UserResponseApiSuccess>(URL_LOGIN, queryString.stringify(data));
  };

export const getUserInfo = () =>
  http.get<UserResponseApiSuccess>(URL_USER_INFO);

export const updateProfile = (body: Omit<EditProfileSchema, 'email'>) => {
  return http.post<UserResponseApiSuccess>('/api/app/edit-profile', queryString.stringify(body));
};

export const changePassword = (body: Omit<ChangePasswordSchema, 'new_password_confirm'>) => {
  return http.post<ResponseApiSuccess<string>>('/api/app/change-password', queryString.stringify(body));
};
