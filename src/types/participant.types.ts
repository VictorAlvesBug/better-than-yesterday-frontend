export type PlanParticipant = {
    planId: string;
    userId: string;
    checkIns: number;
    isBlocked?: boolean;
    joinedAt?: string;
}
export type AddParticipantData = {
    planId: string;
    userId: string;
}
export type ParticipantAction = {
    planId: string;
    userId: string;
}