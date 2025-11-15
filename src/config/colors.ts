export const colors = {
    primary: '#6366F1',
    primaryHover: '#4F46E5',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    background: '#F9FAFB',
    cardBg: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    gold: '#FFD700',
    streak: '#FF6B6B',
} as const;

export type ColorKey = keyof typeof colors;