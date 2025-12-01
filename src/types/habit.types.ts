export type Habit = {
    habitId: string;
    name: string;
    createdAt?: string;
}

export type HabitWithPlansCount = Habit & {
    plansCount: number;
}

export type CreateHabitData = {
    name: string;
}
export type UpdateHabitData = {
    habitId: string;
    name: string;
}

export type SaveHabitData = {
    habitId: string;
    name: string;
}