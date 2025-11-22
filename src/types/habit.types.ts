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
    description: string;
}
export type UpdateHabitData = {
    habitId: string;
    name: string;
    description: string;
}
