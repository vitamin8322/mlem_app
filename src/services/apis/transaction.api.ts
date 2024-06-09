import queryString from 'query-string';
import { Transaction, TransactionResponseApiSuccess } from 'types/transaction.type';
import {UserResponseApiSuccess} from 'types/user.type';
import http from 'utils/http';

export const createTransaction = (data: { money: number, note: string, type: string, date: string, idCategory: string, wallet: string, icon: string }) => {
  return http.post<TransactionResponseApiSuccess>('/api/transaction/create', queryString.stringify(data));
};

export const editTransaction = (data: { id: string,money: number, note: string, type: string, date: string, idCategory: string, wallet: string, icon: string }) => {
  return http.post<TransactionResponseApiSuccess>('/api/transaction/edit', queryString.stringify(data));
};

export const deleteTransaction = (id?: string) => {
  return http.post<TransactionResponseApiSuccess>(`/api/transaction/delete?id=${id}`);
};

export const transactionType = (type?: string) =>
  http.get<Transaction>(`/api/transaction/transactionType?type=${type}`);

export const percentTransaction = (valueRange: string) =>
  http.get<Transaction>(`/api/transaction/percentTransaction?value=${valueRange}`);

export const transactionExpWeek = () =>
  http.get<any>(`/api/transaction/transactionExpWeek`);

export const transactionExpMonth = () =>
  http.get<any>(`/api/transaction/transactionExpMonth`);


export const dailyTransactions = (year: number, month: number) =>
  http.get<any>(`/api/transaction/dailyTransactions?year=${year}&month=${month}`);
  
export const monthTransaction = (year: number, month: number) =>
  http.get<any>(`/api/transaction/monthTransaction?year=${year}&month=${month}`);

export const reportTotal = () =>
  http.get<any>(`/api/transaction/reportTotal`);

export const totalCategory = () =>
  http.get<any>(`/api/transaction/totalCategory`);

export const reportYear = (year: number) =>
  http.get<any>(`/api/transaction/reportYear?year=${year}`);

export const categoryMonth = (idCategory: string) =>
  http.get<Transaction>(`/api/transaction/categoryMonth?idCategory=${idCategory}`);