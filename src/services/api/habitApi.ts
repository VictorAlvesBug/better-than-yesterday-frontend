import axiosInstance from './axiosConfig';
import { type ApiResponse } from '../../types/api.types';
import type {
    Habit,
    CreateHabitData,
    UpdateHabitData,
    HabitWithPlansCount
} from '../../types/habit.types';

export const habitApi = {
    // Get all habits
    getAllHabits: async (): Promise<ApiResponse<HabitWithPlansCount[]>> => {
        const response = await axiosInstance.get<ApiResponse<HabitWithPlansCount[]>>('/habits');
        return response.data;
    },
    // Get habit by ID
    getHabitById: async (habitId: string): Promise<ApiResponse<Habit>> => {
        const response = await axiosInstance.get<ApiResponse<Habit>>(
            `/habits/${habitId}`
        );
        return response.data;
    },
    // Get habits by plan ID
    getHabitsByPlanId: async (planId: string): Promise<ApiResponse<Habit[]>> => {
        const response = await axiosInstance.get<ApiResponse<Habit[]>>(
            `/habits?planId=${planId}`
        );
        return response.data;
    },
    // Create new habit
    createHabit: async (habitData: CreateHabitData): Promise<ApiResponse<Habit>> => {
        const response = await axiosInstance.post<ApiResponse<Habit>>(
            '/habits',
            habitData
        );
        return response.data;
    },
    // Update habit
    updateHabit: async (habitData: UpdateHabitData): Promise<ApiResponse<Habit>> => {
        const response = await axiosInstance.put<ApiResponse<Habit>>(
            '/habits',
            habitData
        );
        return response.data;
    },
    // Delete habit
    deleteHabit: async (habitId: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete<ApiResponse<void>>(
            `/habits/${habitId}`
        );
        return response.data;
    },
};