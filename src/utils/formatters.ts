export const formatters = {
    // Format number with thousand separators
    formatNumber: (num: number): string => {
        return num.toLocaleString('pt-BR');
    },
    // Format percentage
    formatPercentage: (value: number, total: number): string => {
        if (total === 0) return '0%';
        const percentage = (value / total) * 100;
        return `${percentage.toFixed(1)}%`;
    },
    // Truncate text with ellipsis
    truncate: (text: string, maxLength: number): string => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    // Get initials from name
    getInitials: (name: string): string => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    },
    // Format status to Portuguese
    formatStatus: (status: string): string => {
        const statusMap: Record<string, string> = {
            active: 'Ativo',
            paused: 'Pausado',
            completed: 'Concluído',
            cancelled: 'Cancelado',
        };
        return statusMap[status] || status;
    },
};