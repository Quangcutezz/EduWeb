export type IPaginationResponseDto<T> = {
    data: T[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
};

export type IPaginationClientData = {
    totalPages: number;
    size: number;
    currentPage: number;
};
