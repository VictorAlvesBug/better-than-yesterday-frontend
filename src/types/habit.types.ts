export interface Habit {
    habitId: string;
    name: string;
    description: string;
    createdAt?: string;
}
export interface CreateHabitData {
    name: string;
    description: string;
}
export interface UpdateHabitData {
    habitId: string;
    name: string;
    description: string;
}
