export interface User {
    userId: string;
    name: string;
    email: string;
    createdAt?: string;
}
export interface LoginCredentials {
    email: string;
    password: string;
}
export interface RegisterData {
    name: string;
    email: string;
    password: string;
}
export interface UpdateUserData {
    name: string;
    email: string;
}