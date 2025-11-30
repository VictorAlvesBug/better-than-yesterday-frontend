export type ApiResponseStatus = 'success' | 'error';

export type ApiResponse<T> = {
    status: 1 | 2 | 3;  // 1 = success, 2 = rejected, 3 = failure
    data?: T;
    reason?: string;
}

export function isSuccess<T>(response: ApiResponse<T>): boolean {
    return response.status === 1;
}

export function isRejected<T>(response: ApiResponse<T>): boolean {
    return response.status === 2;
}

export function isFailure<T>(response: ApiResponse<T>): boolean {
    return response.status === 3;
}

export type PaginatedResponse<T> = {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}
