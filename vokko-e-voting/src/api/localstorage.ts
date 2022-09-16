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
        console.log(key, 'initial read', storedValue)
        if (storedValue) {
            try {
                parsedValue = JSON.parse(storedValue);
                console.log(key, 'initial parsedValue', JSON.stringify(parsedValue));
                setStorageObj({value: parsedValue, loading: false});
            } catch(e) {
                window.localStorage.removeItem(key);
                console.log(key, 'initial parsedValue exception', e);
                setStorageObj({value: null, loading: false});
            }
        } else {
            setStorageObj({value: null, loading: false});
        }
    }, []);

    useEffect(() => {
        if (storageObj?.value !== null) {
            window.localStorage.setItem(key, JSON.stringify(storageObj?.value));
            console.log(key, 'stored', JSON.stringify(storageObj?.value));
        } else {
            window.localStorage.removeItem(key);
            console.log(key, 'cleared');
        }
    }, [storageObj]);


    console.log('value=',JSON.stringify(storageObj.value), 'loading=',storageObj.loading);
    return {
        value: storageObj.value,
        setValue: (value) => setStorageObj({value, loading: false}),
        loading: storageObj.loading
    };
}
