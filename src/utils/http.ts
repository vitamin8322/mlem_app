import { URL_LOGIN, URL_REGISTER, URL_SOCIAL_AUTHENTICATION, URL_USER_INFO } from "@services/apis/auth.api";
import axios, { AxiosError, AxiosInstance } from "axios";
import { User } from "types/user.type";
import { asyncStorageService } from "./storage";
import { isAxiosExpiredTokenError } from "./utils";
// import { API_URL } from "@env";

class Http {
  instance: AxiosInstance;
  private accessToken: string | null | undefined
  constructor() {
    this.instance = axios.create({
      // baseURL: 'http://10.40.10.77:8888',
      baseURL: 'http://192.168.1.8:8888',
      // baseURL: 'http://127.0.0.1:8888',
      // baseURL: 'https://backend-wonwon.onrender.com',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    })

    this.instance.interceptors.request.use(
      async (config) => {
        const access_token = await asyncStorageService.getValue("access_token");
        this.accessToken = access_token ? access_token : null
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      async (response) => {
        const { url } = response.config;
        if (url === URL_LOGIN || url === URL_REGISTER || url === URL_SOCIAL_AUTHENTICATION || url === URL_USER_INFO) {
          const data = response.data as User
          // console.log(2123,response.data);
          
          this.accessToken = data.access_token
          
          if (data && data.access_token) {
            this.accessToken = data.access_token;
            await asyncStorageService.setValue('access_token', data.access_token);
            await asyncStorageService.setValue('profile', data);
          }
        }
        return response;
      },
      async (error: AxiosError) => {
        if (isAxiosExpiredTokenError(error)) {
          await asyncStorageService.removeValue('profile');
          await asyncStorageService.removeValue('access_token');
        }
        console.log('error', error);
        
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance
export default http
