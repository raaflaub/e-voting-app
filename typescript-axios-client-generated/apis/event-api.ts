/* tslint:disable */
/* eslint-disable */
/**
 * Vokko
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { GetAllEventsResponseDocument } from '../models';
import { GetEventResponseDocument } from '../models';
import { PostEventRequestDocument } from '../models';
/**
 * EventApi - axios parameter creator
 * @export
 */
export const EventApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jsonapiV1EventsGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/jsonapi/v1/events`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jsonapiV1EventsIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling jsonapiV1EventsIdGet.');
            }
            const localVarPath = `/jsonapi/v1/events/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {PostEventRequestDocument} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jsonapiV1EventsPost: async (body?: PostEventRequestDocument, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/jsonapi/v1/events`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        jsonapiV1EventsResetPatch: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/jsonapi/v1/events/reset`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * EventApi - functional programming interface
 * @export
 */
export const EventApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jsonapiV1EventsGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<GetAllEventsResponseDocument>>> {
            const localVarAxiosArgs = await EventApiAxiosParamCreator(configuration).jsonapiV1EventsGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jsonapiV1EventsIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<GetEventResponseDocument>>> {
            const localVarAxiosArgs = await EventApiAxiosParamCreator(configuration).jsonapiV1EventsIdGet(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {PostEventRequestDocument} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jsonapiV1EventsPost(body?: PostEventRequestDocument, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await EventApiAxiosParamCreator(configuration).jsonapiV1EventsPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jsonapiV1EventsResetPatch(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<GetAllEventsResponseDocument>>> {
            const localVarAxiosArgs = await EventApiAxiosParamCreator(configuration).jsonapiV1EventsResetPatch(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * EventApi - factory interface
 * @export
 */
export const EventApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jsonapiV1EventsGet(options?: AxiosRequestConfig): Promise<AxiosResponse<GetAllEventsResponseDocument>> {
            return EventApiFp(configuration).jsonapiV1EventsGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jsonapiV1EventsIdGet(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<GetEventResponseDocument>> {
            return EventApiFp(configuration).jsonapiV1EventsIdGet(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {PostEventRequestDocument} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jsonapiV1EventsPost(body?: PostEventRequestDocument, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return EventApiFp(configuration).jsonapiV1EventsPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async jsonapiV1EventsResetPatch(options?: AxiosRequestConfig): Promise<AxiosResponse<GetAllEventsResponseDocument>> {
            return EventApiFp(configuration).jsonapiV1EventsResetPatch(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * EventApi - object-oriented interface
 * @export
 * @class EventApi
 * @extends {BaseAPI}
 */
export class EventApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventApi
     */
    public async jsonapiV1EventsGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<GetAllEventsResponseDocument>> {
        return EventApiFp(this.configuration).jsonapiV1EventsGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventApi
     */
    public async jsonapiV1EventsIdGet(id: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<GetEventResponseDocument>> {
        return EventApiFp(this.configuration).jsonapiV1EventsIdGet(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {PostEventRequestDocument} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventApi
     */
    public async jsonapiV1EventsPost(body?: PostEventRequestDocument, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return EventApiFp(this.configuration).jsonapiV1EventsPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventApi
     */
    public async jsonapiV1EventsResetPatch(options?: AxiosRequestConfig) : Promise<AxiosResponse<GetAllEventsResponseDocument>> {
        return EventApiFp(this.configuration).jsonapiV1EventsResetPatch(options).then((request) => request(this.axios, this.basePath));
    }
}
