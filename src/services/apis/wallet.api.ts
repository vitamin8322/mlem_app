import queryString from 'query-string';
import { WalletApiSuccess } from 'types/wallet.type';
import http from 'utils/http';

export const createWallet = (data: { money: number, name: string, idWallet: string }) => {
  return http.post<WalletApiSuccess>('/api/wallet/create', queryString.stringify(data));
};

export const editWallet = (data: { money: number, name: string, idWallet: string, id: string }) => {
  return http.post<WalletApiSuccess>('/api/wallet/edit', queryString.stringify(data));
};

export const getAllWalletUser = () => {
  return http.get<WalletApiSuccess>('/api/wallet/getAllWalletUser');
};

export const deleteWallet = (id?: string) => {
  return http.post<WalletApiSuccess>(`/api/wallet/delete?id=${id}`);
};

export const defaultWallet = (id?: string) => {
  return http.post<WalletApiSuccess>(`/api/wallet/defaultWallet?id=${id}`);
};