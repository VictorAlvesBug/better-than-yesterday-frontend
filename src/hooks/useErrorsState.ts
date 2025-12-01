import { useState } from "react";

type FieldError<Data> = {
    fieldName: keyof Data;
    error: string;
};

export default function useErrorsState<Data>() {
    const [errors, setErrors] = useState<FieldError<Data>[]>([]);

    const clearErrors = () => setErrors([]);

    const addError = (fieldName: keyof Data, error: string) =>
        setErrors((prev) => {
            const newError: FieldError<Data> = { fieldName, error };
            return [...prev, newError];
        });

    return { errors, addError, clearErrors };
}
