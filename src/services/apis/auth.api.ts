import queryString from 'query-string';
import {UserResponseApiSuccess} from 'types/user.type';
import http from 'utils/http';

export const URL_LOGIN = 'api/auth/login';
export const URL_REGISTER = 'api/app/register';
export const URL_SOCIAL_AUTHENTICATION = '/api/app/social-authentication';
export const URL_USER_INFO = '/api/auth/user-info';

export const login = (data: { email: string, password: string }) => {
    return http.post<UserResponseApiSuccess>(URL_LOGIN, queryString.stringify(data));
  };

  export const getUserInfo = () =>
  http.get<UserResponseApiSuccess>(URL_USER_INFO);
