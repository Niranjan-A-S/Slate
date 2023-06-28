import { useEffect, useState } from 'react';

export const useLocalStorage = <K>(key: string, initialValue: K | (() => K)) => {
    const [value, setValue] = useState<K>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue === null) {
            return (
                typeof initialValue === 'function'
                    ? (initialValue as (() => K))()
                    : initialValue
            );
        }
        return JSON.parse(jsonValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as [K, typeof setValue];
};
