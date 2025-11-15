import axiosInstance from './axiosConfig';
import type { ApiResponse } from '../../types/api.types';
import type {
    CheckIn,
    CreateCheckInData,
    UpdateCheckInData,
    CheckInFilters
} from '../../types/checkIn.types';
export const checkInApi = {
    // Get all check-ins with optional filters
    getAllCheckIns: async (filters?: CheckInFilters): Promise<CheckIn[]> => {
        let url = '/checkins';
        if (filters) {
            const params = new URLSearchParams();
            if (filters.planId) params.append('planId', filters.planId);
            if (filters.habitId) params.append('habitId', filters.habitId);
            if (filters.userId) params.append('userId', filters.userId);
            if (params.toString()) {
                url += `?${params.toString()}`;
            }
        }
        const response = await axiosInstance.get<ApiResponse<CheckIn[]>>(url);
        return response.data.data || [];
    },
    // Create new check-in
    createCheckIn: async (
        checkInData: CreateCheckInData
    ): Promise<CheckIn | null> => {
        const response = await axiosInstance.post<ApiResponse<CheckIn>>(
            '/checkins',
            checkInData
        );
        return response.data.data || null;
    },
    // Update check-in
    updateCheckIn: async (
        checkInData: UpdateCheckInData
    ): Promise<CheckIn | null> => {
        const response = await axiosInstance.put<ApiResponse<CheckIn>>(
            '/checkins',
            checkInData
        );
        return response.data.data || null;
    },
    // Delete check-in
    deleteCheckIn: async (checkInId: string): Promise<boolean> => {
        const response = await axiosInstance.delete<ApiResponse<void>>(
            `/checkins/${checkInId}`
        );
        return response.data.isSuccess;
    },
};