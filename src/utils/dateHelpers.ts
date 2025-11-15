export const dateHelpers = {
    // Format date to Brazilian format (DD/MM/YYYY)
    formatToBrazilian: (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    },
    // Format date to ISO 8601 (YYYY-MM-DD)
    formatToISO: (date: Date): string => {
        return date.toISOString().split('T')[0];
    },
    // Get today's date in ISO format
    getTodayISO: (): string => {
        return new Date().toISOString().split('T')[0];
    },
    // Check if date is today
    isToday: (dateString: string): boolean => {
        const today = new Date().toISOString().split('T')[0];
        return dateString.startsWith(today);
    },
    // Get date range for filters
    getDateRange: (days: number): { start: string; end: string } => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);
        return {
            start: dateHelpers.formatToISO(start),
            end: dateHelpers.formatToISO(end),
        };
    },
    // Calculate days between two dates
    daysBetween: (date1: string, date2: string): number => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    },
};
