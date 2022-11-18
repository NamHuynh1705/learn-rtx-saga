import { PaginationParams } from './../models/common';

export const totalPagePagination = (pagination: PaginationParams) => {
    const totelPage = Math.ceil(pagination?._totalRows / pagination?._limit) ?? 0;
    return Number(totelPage);
};