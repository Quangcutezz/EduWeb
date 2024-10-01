export type IPaginationRequestDto<T> = {
    where?: T;
    pageNumber?: number;
    pageSize?: number;
};
