import axiosInstance from './axiosConfig';
import type { ApiResponse } from '../../types/api.types';
import type {
    Plan,
    CreatePlanData,
    UpdatePlanStatusData
} from '../../types/plan.types';
export const planApi = {
    // Get all plans
    getAllPlans: async (): Promise<Plan[]> => {
        const response = await axiosInstance.get<ApiResponse<Plan[]>>('/plans');
        return response.data.data || [];
    },
    // Get plan by ID
    getPlanById: async (planId: string): Promise<Plan | null> => {
        const response = await axiosInstance.get<ApiResponse<Plan>>(
            `/plans/${planId}`
        );
        return response.data.data || null;
    },
    // Get plans by habit ID
    getPlansByHabitId: async (habitId: string): Promise<Plan[]> => {
        const response = await axiosInstance.get<ApiResponse<Plan[]>>(
            `/plans?habitId=${habitId}`
        );
        return response.data.data || [];
    },
    // Create new plan
    createPlan: async (planData: CreatePlanData): Promise<Plan | null> => {
        const response = await axiosInstance.post<ApiResponse<Plan>>(
            '/plans',
            planData
        );
        return response.data.data || null;
    },
    // Update plan status
    updatePlanStatus: async (
        updateData: UpdatePlanStatusData
    ): Promise<Plan | null> => {
        const response = await axiosInstance.put<ApiResponse<Plan>>(
            '/plans',
            updateData
        );
        return response.data.data || null;
    },
    // Cancel plan (soft delete)
    cancelPlan: async (planId: string): Promise<boolean> => {
        const response = await axiosInstance.delete<ApiResponse<void>>(
            `/plans/${planId}`
        );
        return response.data.isSuccess;
    },
};
