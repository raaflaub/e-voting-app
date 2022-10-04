import {useEffect, useState} from "react";

export interface LocalStorageAPI<T> {
    value: T|null;
    setValue: (value: T) => void;
    loading: boolean;
}

export function useLocallyStoredState<T>( key: string ): LocalStorageAPI<T> {

    const [ storageObj, setStorageObj ] = useState<{value:T|null, loading: boolean}>({ value: null, loading: true});

    useEffect(() => {
        let parsedValue = null;
        const storedValue = window.localStorage.getItem(key);
        if (storedValue) {
            try {
                parsedValue = JSON.parse(storedValue);
                setStorageObj({value: parsedValue, loading: false});
            } catch(e) {
                window.localStorage.removeItem(key);
                setStorageObj({value: null, loading: false});
            }
        } else {
            setStorageObj({value: null, loading: false});
        }
    }, [key]);

    useEffect(() => {
        if (storageObj && !storageObj.loading) {
            if (storageObj?.value !== null) {
                const stringValue = JSON.stringify(storageObj?.value);
                if (window.localStorage.getItem(key) !== stringValue) {
                    window.localStorage.setItem(key, stringValue);
                }
            } else {
                if (window.localStorage.getItem(key) !== null) {
                    window.localStorage.removeItem(key);
                }
            }
        }
    }, [storageObj, key]);

    return {
        value: storageObj.value,
        setValue: (value) => setStorageObj({value, loading: false}),
        loading: storageObj.loading
    };
}
