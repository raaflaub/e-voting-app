
// gemaess:
// - https://stackoverflow.com/questions/70689305/customizing-date-serialization-in-axios
// - https://stackoverflow.com/questions/65692061/casting-dates-properly-from-an-api-response-in-typescript

// Vor der JSON-Serialisierung werden allfaellige Date-Objekte in Strings konvertiert
export const requestDateTransformer: ((data?: any) => any) = (data) => {
    if (data instanceof Date) {
        return data.toISOString()
    }
    if (Array.isArray(data)) {
        return data.map(val => requestDateTransformer(val))
    }
    if (typeof data === "object" && data !== null) {
        return Object.fromEntries(Object.entries(data).map(([ key, val ]) =>
            [ key, requestDateTransformer(val) ]))
    }
    return data;
}

// Nach der JSON-Deserialisierung werden Strings, die einem Date-Pattern entsprechen, in Date-Objekte konvertiert (reviving)
export const responseDateTransformer: ((data?: any) => any) = (data) => {
    const ISO_DATE_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

    if (data && typeof data === 'string' && ISO_DATE_FORMAT.test(data)) {
        return new Date(data);
    }
    if (Array.isArray(data)) {
        return data.map(val => responseDateTransformer(val))
    }
    if (typeof data === "object" && data !== null) {
        return Object.fromEntries(Object.entries(data).map(([ key, val ]) =>
            [ key, responseDateTransformer(val) ]))
    }
    return data;
}
