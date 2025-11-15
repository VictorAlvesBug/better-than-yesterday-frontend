export interface ApiResponse<T> {
    isSuccess: boolean;
    data?: T;
    errors?: string[];
}
export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}
