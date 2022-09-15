import {useEffect, useState} from "react";


export function useLocallyStoredState<T>( key: string, defaultValue: T ) {

    const [ value, setValue ] = useState<T>(defaultValue);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [ value, setValue ];
}
