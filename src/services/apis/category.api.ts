import queryString from 'query-string';
import { Category, CategoryResponseApiSuccess } from 'types/category.type';
import { UserResponseApiSuccess } from 'types/user.type';
import http from 'utils/http';

export const createCategory = (data: { name: string, icon: string, fill: string, type: string }) => {
    return http.post<CategoryResponseApiSuccess>('/api/category/create', queryString.stringify(data));
};

export const editCategory = (data: { name: string, icon: string, fill: string, type: string }) => {
    return http.post<CategoryResponseApiSuccess>('/api/category/edit', queryString.stringify(data));
};

export const allCategoryUser = () => {
    return http.get<CategoryResponseApiSuccess>('/api/category/allCategoryUser');
};
