import Axios, {AxiosRequestTransformer, AxiosResponse, AxiosResponseTransformer} from "axios";
import {GetAllEventsResponseDocument} from "./model/get-all-events-response-document";
import {Event} from "./model/event";
import {CreateUserResponseDocument} from "./model/create-user-response-document";
import {CreateUserRequestDocument} from "./model/create-user-request-document";
import {useMutation, UseMutationResult, useQuery, useQueryClient} from "react-query";
import {GetEventResponseDocument} from "./model/get-event-response-document";
import {PatchEventMotionRequestDocument} from "./model/patch-event-motion-request-document";
import {requestDateTransformer, responseDateTransformer} from "./dateTransformer";
import {CastVoteRequestDocument} from "./model/cast-vote-request-document";
import {CastVoteResponseDocument} from "./model/cast-vote-response-document";
import {PostEventRequestDocument} from "./model/post-event-request-document";
import {CreateVotingResponseDocument} from "./model/create-voting-response-document";
import {CreateVotingRequestDocument} from "./model/create-voting-request-document";




const baseUrl = `${process.env.REACT_APP_REST_API_BASE_URL}/jsonapi/v1`

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

export function useRefreshEvents() {
    const queryClient = useQueryClient();
    return () => {
        queryClient.invalidateQueries(ALL_EVENTS_QUERY_KEY);
        queryClient.invalidateQueries(EVENT_QUERY_KEY);
    }
}

export function useResetEventsMutation(): UseMutationResult<AxiosResponse<GetAllEventsResponseDocument>, unknown, Event[], unknown> {
    const queryClient = useQueryClient();
    return useMutation((events: Event[]) => {
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

export function useCreateEventMutation() {
    const queryClient = useQueryClient();
    return useMutation((postEventRequestDocument: PostEventRequestDocument) => {
            return axiosInstance.post<PostEventRequestDocument, AxiosResponse<void>>('events', postEventRequestDocument);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries(ALL_EVENTS_QUERY_KEY);
            }
        }
    );
}

interface IUpdateEventMutationParameters{

    eventId: string;
    PatchEventRequestDocument:PatchEventMotionRequestDocument;
}

export function useUpdateEventMutation(): UseMutationResult<AxiosResponse<void>, unknown,IUpdateEventMutationParameters, unknown> {
    const queryClient = useQueryClient();
    return useMutation((updateEventParameters:IUpdateEventMutationParameters) => {

            return axiosInstance.patch<any, AxiosResponse<void>>(`events/${updateEventParameters.eventId}`, updateEventParameters.PatchEventRequestDocument);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries(ALL_EVENTS_QUERY_KEY);
                queryClient.invalidateQueries(EVENT_QUERY_KEY);
            }
        }
    );
}


interface IUpdateMotionMutationParameters{
    eventId: string;
    motionId:string;
    patchEventMotionRequestDocument:PatchEventMotionRequestDocument;
}

export function useUpdateMotionMutation(): UseMutationResult<AxiosResponse<void>, unknown,IUpdateMotionMutationParameters, unknown> {
    const queryClient = useQueryClient();
    return useMutation((updateMotionParameters:IUpdateMotionMutationParameters) => {

            return axiosInstance.patch<any, AxiosResponse<void>>(`events/${updateMotionParameters.eventId}/motions/${updateMotionParameters.motionId}`, updateMotionParameters.patchEventMotionRequestDocument);
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
            return axiosInstance.post<any, AxiosResponse<CreateUserResponseDocument>>('users', createUserRequestDocument);
        },
        {
            onSuccess() {}
        }
    );
}

export function useCreateVotingMutation(): UseMutationResult<AxiosResponse<CreateVotingResponseDocument>, unknown, CreateVotingRequestDocument, unknown> {
    const queryClient = useQueryClient();
    return useMutation((createVotingRequestDocument: CreateVotingRequestDocument) => {
            return axiosInstance.post<any, AxiosResponse<CreateVotingResponseDocument>>('votings', createVotingRequestDocument);
        },
        {
            onSuccess() {}
        }
    );
}


export function useCastVoteMutation(): UseMutationResult<AxiosResponse<CastVoteResponseDocument>, unknown, CastVoteRequestDocument, unknown> {
    const queryClient = useQueryClient();
    return useMutation((castVoteRequestDocument: CastVoteRequestDocument) => {
            return axiosInstance.post<any, AxiosResponse<CastVoteResponseDocument>>('votings/casting', castVoteRequestDocument);
        },
        {
            onSuccess() {
                queryClient.invalidateQueries(ALL_EVENTS_QUERY_KEY);
                queryClient.invalidateQueries(EVENT_QUERY_KEY);
            }
        }
    );
}
