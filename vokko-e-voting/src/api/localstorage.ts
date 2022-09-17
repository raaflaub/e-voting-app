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
        console.log('useLocallyStoredState', key, 'initial read', storedValue)
        if (storedValue) {
            try {
                parsedValue = JSON.parse(storedValue);
                console.log('useLocallyStoredState', key, 'initial parsedValue', JSON.stringify(parsedValue));
                setStorageObj({value: parsedValue, loading: false});
            } catch(e) {
                window.localStorage.removeItem(key);
                console.log('useLocallyStoredState', key, 'initial parsedValue exception', e);
                setStorageObj({value: null, loading: false});
            }
        } else {
            setStorageObj({value: null, loading: false});
        }
    }, []);

    useEffect(() => {
        if (storageObj && !storageObj.loading) {
            if (storageObj?.value !== null) {
                const stringValue = JSON.stringify(storageObj?.value);
                if (window.localStorage.getItem(key) !== stringValue) {
                    window.localStorage.setItem(key, stringValue);
                    console.log('useLocallyStoredState', key, 'stored', stringValue);
                }
            } else {
                if (window.localStorage.getItem(key) !== null) {
                    window.localStorage.removeItem(key);
                    console.log('useLocallyStoredState', key, 'cleared');
                }
            }
        }
    }, [storageObj]);


    console.log('useLocallyStoredState', key, 'value=',JSON.stringify(storageObj.value), 'loading=',storageObj.loading);
    return {
        value: storageObj.value,
        setValue: (value) => setStorageObj({value, loading: false}),
        loading: storageObj.loading
    };
}
