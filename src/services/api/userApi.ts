import axiosInstance from './axiosConfig';
import type { ApiResponse } from '../../types/api.types';
import type {
    User,
    RegisterData,
    UpdateUserData
} from '../../types/user.types';
export const userApi = {
    // Get all users
    getAllUsers: async (): Promise<User[]> => {
        const response = await axiosInstance.get<ApiResponse<User[]>>('/users');
        return response.data.data || [];
    },
    // Get user by ID
    getUserById: async (userId: string): Promise<User | null> => {
        const response = await axiosInstance.get<ApiResponse<User>>(
            `/users/${userId}`
        );
        return response.data.data || null;
    },
    // Create new user (register)
    createUser: async (userData: RegisterData): Promise<User | null> => {
        const response = await axiosInstance.post<ApiResponse<User>>(
            '/users',
            userData
        );
        return response.data.data || null;
    },
    // Update user
    updateUser: async (
        userId: string,
        userData: UpdateUserData
    ): Promise<User | null> => {
        const response = await axiosInstance.put<ApiResponse<User>>(
            `/users/${userId}`,
            userData
        );
        return response.data.data || null;
    },
    // Delete user
    deleteUser: async (userId: string): Promise<boolean> => {
        const response = await axiosInstance.delete<ApiResponse<void>>(
            `/users/${userId}`
        );
        return response.data.isSuccess;
    },
};