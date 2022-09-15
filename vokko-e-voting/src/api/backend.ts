import Axios, {AxiosRequestTransformer, AxiosResponseTransformer} from "axios";
import {configure} from "axios-hooks";



// gemaess:
// - https://stackoverflow.com/questions/70689305/customizing-date-serialization-in-axios
// - https://stackoverflow.com/questions/65692061/casting-dates-properly-from-an-api-response-in-typescript

const requestDateTransformer: AxiosRequestTransformer = data => {
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
    return data
}


const responseDateTransformer: AxiosResponseTransformer = data => {
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
    return data
}


export function configureAxios() {

    const baseUrl = `${process.env.REACT_APP_REST_API_BASE_URL}/jsonapi/v1`
    console.log("configureAxios baseUrl=", baseUrl);

    const requestTransformers: AxiosRequestTransformer[] =
          !Axios.defaults.transformRequest                   ? [requestDateTransformer]
        : (Axios.defaults.transformRequest instanceof Array) ? [...Axios.defaults.transformRequest, requestDateTransformer]
        :                                                      [Axios.defaults.transformRequest, requestDateTransformer];

    const responseTransformers: AxiosResponseTransformer[] =
          !Axios.defaults.transformResponse                   ? [responseDateTransformer]
        : (Axios.defaults.transformResponse instanceof Array) ? [...Axios.defaults.transformResponse, responseDateTransformer]
        :                                                       [Axios.defaults.transformResponse, responseDateTransformer];

    configure({
        axios: Axios.create({
            baseURL: baseUrl,
            transformRequest: requestTransformers,
            transformResponse: responseTransformers
        }),
        cache: false,

    });

}
