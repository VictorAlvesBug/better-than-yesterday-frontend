export type PlanStatus = 'active' | 'paused' | 'completed' | 'cancelled';

export type Plan = {
    planId: string;
    name: string;
    description: string;
    habitId: string;
    status: PlanStatus;
    createdAt?: string;
    updatedAt?: string;
}
export type CreatePlanData = {
    name: string;
    description: string;
    habitId: string;
}
export type UpdatePlanStatusData = {
    planId: string;
    status: PlanStatus;
}
