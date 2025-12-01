import { useState } from "react";

type FieldError<Data> = {
    fieldName: keyof Data;
    error: string;
};

type UseErrorsStateProps = {
    oneErrorPerField?: boolean;
};

export default function useErrorsState<Data>({oneErrorPerField = false}: UseErrorsStateProps) {
    const [errors, setErrors] = useState<FieldError<Data>[]>([]);

    const clearErrors = () => setErrors([]);

    const addError = (fieldName: keyof Data, error: string) =>
        setErrors((prev) => {
            const newError: FieldError<Data> = { fieldName, error };
            if(oneErrorPerField)
                return [...prev.filter(({fieldName: fName}) => fName !== fieldName), newError];
            return [...prev, newError];
        });

    return { errors, addError, clearErrors };
}
