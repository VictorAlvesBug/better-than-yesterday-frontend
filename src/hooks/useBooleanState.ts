import { useState } from 'react'

export default function useBooleanState(initialState: boolean) {
    const [isEnabled, setIsEnabled] = useState(initialState);

    const set = () => setIsEnabled(true);
    const reset = () => setIsEnabled(false);

    return { isEnabled, set, reset };
}
