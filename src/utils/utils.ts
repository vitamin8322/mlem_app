import axios, { AxiosError, HttpStatusCode } from "axios";
import { ResponseApiError } from "types/utils.type";

export const handleInputChange = (text: string) => {
    const sanitizedText = text.replace(/\s/g, ""); // Remove spaces from input value
    return sanitizedText;
  };

  export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.isAxiosError(error);
  }
  export function isAxiosUnauthorizedError<UnauthorizedError>(
    error: unknown,
  ): error is AxiosError<UnauthorizedError> {
    return (
      isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Unauthorized
    );
  }
  export function isAxiosExpiredTokenError<UnauthorizedError>(
    error: unknown,
  ): error is AxiosError<UnauthorizedError> {
    return (
      isAxiosUnauthorizedError<
        ResponseApiError<{
          name: string;
          message: string;
        }>
      >(error) && error.response?.data?.data?.name === "EXPIRED_TOKEN"
    );
  }