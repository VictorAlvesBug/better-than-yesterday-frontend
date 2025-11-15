export const validators = {
    email: (value: string): string | null => {
        if (!value) return 'Email é obrigatório';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email inválido';
        return null;
    },
    password: (value: string): string | null => {
        if (!value) return 'Senha é obrigatória';
        if (value.length < 8) return 'Senha deve ter no mínimo 8 caracteres';
        return null;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    required: (fieldName: string) => (value: any): string | null => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            return `${fieldName} é obrigatório`;
        }
        return null;
    },
    minLength: (min: number, fieldName: string) => (value: string): string | null => {
        if (value && value.length < min) {
            return `${fieldName} deve ter no mínimo ${min} caracteres`;
        }
        return null;
    },
    maxLength: (max: number, fieldName: string) => (value: string): string | null => {
        if (value && value.length > max) {
            return `${fieldName} deve ter no máximo ${max} caracteres`;
        }
        return null;
    },
};
