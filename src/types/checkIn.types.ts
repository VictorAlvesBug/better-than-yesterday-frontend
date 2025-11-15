export interface CheckIn {
    checkInId: string;
    planId: string;
    habitId: string;
    userId: string;
    date: string; // ISO 8601 format
    notes?: string;
    createdAt?: string;
}
export interface CreateCheckInData {
    planId: string;
    habitId: string;
    userId: string;
    date: string; // ISO 8601 format
    notes?: string;
}
export interface UpdateCheckInData {
    checkInId: string;
    date: string;
    notes?: string;
}
export interface CheckInFilters {
    planId?: string;
    habitId?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
}