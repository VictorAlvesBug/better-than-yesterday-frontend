import axiosInstance from './axiosConfig';
import type { ApiResponse } from '../../types/api.types';
import type {
    Habit,
    CreateHabitData,
    UpdateHabitData,
    HabitWithPlansCount
} from '../../types/habit.types';
export const habitApi = {
    // Get all habits
    getAllHabits: async (): Promise<HabitWithPlansCount[]> => {
        const response = await axiosInstance.get<ApiResponse<HabitWithPlansCount[]>>('/habits')
        return response.data.data || [];
    },
    // Get habit by ID
    getHabitById: async (habitId: string): Promise<Habit | null> => {
        const response = await axiosInstance.get<ApiResponse<Habit>>(
            `/habits/${habitId}`
        );
        return response.data.data || null;
    },
    // Get habits by plan ID
    getHabitsByPlanId: async (planId: string): Promise<Habit[]> => {
        const response = await axiosInstance.get<ApiResponse<Habit[]>>(
            `/habits?planId=${planId}`
        );
        return response.data.data || [];
    },
    // Create new habit
    createHabit: async (habitData: CreateHabitData): Promise<Habit | null> => {
        const response = await axiosInstance.post<ApiResponse<Habit>>(
            '/habits',
            habitData
        );
        return response.data.data || null;
    },
    // Update habit
    updateHabit: async (habitData: UpdateHabitData): Promise<Habit | null> => {
        const response = await axiosInstance.put<ApiResponse<Habit>>(
            '/habits',
            habitData
        );
        return response.data.data || null;
    },
    // Delete habit
    deleteHabit: async (habitId: string): Promise<boolean> => {
        const response = await axiosInstance.delete<ApiResponse<void>>(
            `/habits/${habitId}`
        );
        return response.data.isSuccess;
    },
};