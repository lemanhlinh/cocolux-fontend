import { useEffect, useState } from 'react';

export function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // unmounted
            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );

    return debouncedValue;
}
