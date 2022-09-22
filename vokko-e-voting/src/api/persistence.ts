import Axios, {AxiosRequestTransformer, AxiosResponse, AxiosResponseTransformer} from "axios";
import {GetAllEventsResponseDocument} from "./model/get-all-events-response-document";
import {Event} from "./model/event";
import {CreateUserResponseDocument} from "./model/create-user-response-document";
import {CreateUserRequestDocument} from "./model/create-user-request-document";
import {useMutation, UseMutationResult, useQuery, useQueryClient} from "react-query";
import {GetEventResponseDocument} from "./model/get-event-response-document";
import {PatchEventMotionRequestDocument} from "./model/patch-event-motion-request-document";
import {PatchEventRequestDocument} from "./model/patch-event-request-document";



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

const axiosInstance = Axios.create({
    baseURL: baseUrl,
    transformRequest: requestTransformers,
    transformResponse: responseTransformers
});


const ALL_EVENTS_QUERY_KEY = 'allEvents';

async function loadAllEvents() {
    const serverResponse = await axiosInstance.get<GetAllEventsResponseDocument>('events');
    return serverResponse.data;
}

export function useAllEvents() {
    const { isLoading, error, data } = useQuery<GetAllEventsResponseDocument>([ALL_EVENTS_QUERY_KEY], () => loadAllEvents());
    return { isLoading, error, events: data?.data ?? [] };
}

const EVENT_QUERY_KEY = 'event';

async function loadEvent(eventId: string) {
    const serverResponse = await axiosInstance.get<GetEventResponseDocument>(`events/${eventId}`);
    return serverResponse.data;
}

export function useEvent(eventId: string) {
    const { isLoading, error, data } = useQuery<GetEventResponseDocument>([EVENT_QUERY_KEY, eventId], () => loadEvent(eventId));
    return { isLoading, error, event: data?.data };
}

export function useResetEventsMutation(): UseMutationResult<AxiosResponse<GetAllEventsResponseDocument>, unknown, Event[], unknown> {
    const queryClient = useQueryClient();
    return useMutation((events: Event[]) => {
            console.log('before axiosInstance.patch');
            return axiosInstance.patch<any, AxiosResponse<GetAllEventsResponseDocument>>('events/reset', {});
        },
        {
            onSuccess() {
                queryClient.invalidateQueries(ALL_EVENTS_QUERY_KEY);
                queryClient.invalidateQueries(EVENT_QUERY_KEY);
            }
        }
    );
}

interface IMotionMutationParameters{

    eventId: string;
    motionId:string;
    patchEventMotionRequestDocument:PatchEventMotionRequestDocument;
}

export function useMotionMutation(): UseMutationResult<AxiosResponse<void>, unknown,IMotionMutationParameters, unknown> {
    const queryClient = useQueryClient();
    return useMutation((patchMotionParameters:IMotionMutationParameters) => {

            return axiosInstance.patch<any, AxiosResponse<void>>(`events/${patchMotionParameters.eventId}/motions/${patchMotionParameters.motionId}`, patchMotionParameters.patchEventMotionRequestDocument);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries(ALL_EVENTS_QUERY_KEY);
                queryClient.invalidateQueries(EVENT_QUERY_KEY);
            }
        }
    );
}

interface IEventMutationParameters{

    eventId: string;
    PatchEventRequestDocument:PatchEventMotionRequestDocument;
}

export function useEventMutation(): UseMutationResult<AxiosResponse<void>, unknown,IEventMutationParameters, unknown> {
    const queryClient = useQueryClient();
    return useMutation((patchEventParameters:IEventMutationParameters) => {

            return axiosInstance.patch<any, AxiosResponse<void>>(`events/${patchEventParameters.eventId}`, patchEventParameters.PatchEventRequestDocument);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries(ALL_EVENTS_QUERY_KEY);
                queryClient.invalidateQueries(EVENT_QUERY_KEY);
            }
        }
    );
}

export function useCreateUserMutation(): UseMutationResult<AxiosResponse<CreateUserResponseDocument>, unknown, CreateUserRequestDocument, unknown> {
    const queryClient = useQueryClient();
    return useMutation((createUserRequestDocument: CreateUserRequestDocument) => {
            console.log('axios.post', JSON.stringify(createUserRequestDocument));
            return axiosInstance.post<any, AxiosResponse<CreateUserResponseDocument>>('users', createUserRequestDocument);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries(ALL_EVENTS_QUERY_KEY);
                queryClient.invalidateQueries(EVENT_QUERY_KEY);
            }
        }
    );
}
