export interface PlanParticipant {
    planId: string;
    userId: string;
    checkIns: number;
    isBlocked?: boolean;
    joinedAt?: string;
}
export interface AddParticipantData {
    planId: string;
    userId: string;
}
export interface ParticipantAction {
    planId: string;
    userId: string;
}