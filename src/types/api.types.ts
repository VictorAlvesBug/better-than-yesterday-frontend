export type ApiResponse<T> = {
    isSuccess: boolean;
    data?: T;
    errors?: string[];
}
export type PaginatedResponse<T> = {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}
