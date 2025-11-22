export type CheckIn = {
    checkInId: string;
    planId: string;
    habitId: string;
    userId: string;
    date: string; // ISO 8601 format
    notes?: string;
    createdAt?: string;
}
export type CreateCheckInData = {
    planId: string;
    habitId: string;
    userId: string;
    date: string; // ISO 8601 format
    notes?: string;
}
export type UpdateCheckInData = {
    checkInId: string;
    date: string;
    notes?: string;
}
export type CheckInFilters = {
    planId?: string;
    habitId?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
}