export type PlanStatus = 'active' | 'paused' | 'completed' | 'cancelled';
export interface Plan {
    planId: string;
    name: string;
    description: string;
    habitId: string;
    status: PlanStatus;
    createdAt?: string;
    updatedAt?: string;
}
export interface CreatePlanData {
    name: string;
    description: string;
    habitId: string;
}
export interface UpdatePlanStatusData {
    planId: string;
    status: PlanStatus;
}
