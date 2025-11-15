import axiosInstance from './axiosConfig';
import type { ApiResponse } from '../../types/api.types';
import type {
    PlanParticipant,
    AddParticipantData,
    ParticipantAction
} from '../../types/participant.types';
export const planParticipantApi = {
    // Get all participants
    getAllParticipants: async (): Promise<PlanParticipant[]> => {
        const response = await axiosInstance.get<ApiResponse<PlanParticipant[]>>(
            '/planparticipants'
        );
        return response.data.data || [];
    },
    // Get participants by plan ID
    getParticipantsByPlanId: async (
        planId: string
    ): Promise<PlanParticipant[]> => {
        const response = await axiosInstance.get<ApiResponse<PlanParticipant[]>>(
            `/planparticipants/${planId}`
        );
        return response.data.data || [];
    },
    // Add participant to plan
    addParticipant: async (
        data: AddParticipantData
    ): Promise<PlanParticipant | null> => {
        const response = await axiosInstance.post<ApiResponse<PlanParticipant>>(
            '/planparticipants',
            data
        );
        return response.data.data || null;
    },
    // Remove participant from plan
    removeParticipant: async (
        planId: string,
        userId: string
    ): Promise<boolean> => {
        const response = await axiosInstance.delete<ApiResponse<void>>(
            `/planparticipants/${planId}/${userId}`
        );
        return response.data.isSuccess;
    },
    // Block participant
    blockParticipant: async (
        data: ParticipantAction
    ): Promise<PlanParticipant | null> => {
        const response = await axiosInstance.put<ApiResponse<PlanParticipant>>(
            '/planparticipants/block',
            data
        );
        return response.data.data || null;
    },
    // Unblock participant
    unblockParticipant: async (
        data: ParticipantAction
    ): Promise<PlanParticipant | null> => {
        const response = await axiosInstance.put<ApiResponse<PlanParticipant>>(
            '/planparticipants/unblock',
            data
        );
        return response.data.data || null;
    },
};
