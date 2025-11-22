export type User = {
    userId: string;
    name: string;
    email: string;
    createdAt?: string;
}
export type LoginCredentials = {
    email: string;
    password: string;
}
export type RegisterData = {
    name: string;
    email: string;
    password: string;
}
export type UpdateUserData = {
    name: string;
    email: string;
}