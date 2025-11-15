import { useState, type ChangeEvent } from 'react';
type ValidationRules<T> = {
    [K in keyof T]?: (value: T[K]) => string | null;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useForm<T extends Record<string, any>>(
    initialValues: T,
    validationRules?: ValidationRules<T>
) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof T]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof T];
                return newErrors;
            });
        }
    };
    const handleBlur = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        // Validate on blur
        if (validationRules && validationRules[name as keyof T]) {
            const error = validationRules[name as keyof T]!(values[name as keyof T]);
            if (error) {
                setErrors((prev) => ({ ...prev, [name]: error }));
            }
        }
    };
    const validate = (): boolean => {
        if (!validationRules) return true;
        const newErrors: Partial<Record<keyof T, string>> = {};
        let isValid = true;
        Object.keys(validationRules).forEach((key) => {
            const validator = validationRules[key as keyof T];
            if (validator) {
                const error = validator(values[key as keyof T]);
                if (error) {
                    newErrors[key as keyof T] = error;
                    isValid = false;
                }
            }
        });
        setErrors(newErrors);
        return isValid;
    };
    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };
    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validate,
        reset,
        setValues,
        setErrors,
    };
}
