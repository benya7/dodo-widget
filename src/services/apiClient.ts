import axios, { AxiosError, AxiosInstance } from 'axios';
import { DodoApi, DodoRequest, DodoResponse } from '../models';

interface ApiClientOptions {
    baseUrl: string;
    /**
     * Write more logs into console.
     */
    debug?: boolean;
}
interface ApiRequest {
    url: string;
    method: 'GET';
    requestData: DodoRequest;
}

export class ApiClient implements DodoApi {
    private readonly client: AxiosInstance;

    constructor(options: ApiClientOptions) {
        if (!options?.baseUrl) {
            throw new Error('baseUrl is required');
        }

        this.client = axios.create({
            baseURL: options.baseUrl,
        });

        this.client.interceptors.response.use(
            undefined,
            (error: AxiosError) => {
                console.log(`Failed to call API`, error.response?.status, error.response?.data);
                return Promise.reject(error);
            });
        if (options.debug) {
            this.useDebugLogs();
        }

    }

    public getDodoRoute = async (params: DodoRequest) => await this.callApi<DodoResponse>({url: '/getdodoroute', method: 'GET', requestData: params});

    /**
     * Helper with saint defaults to perform an HTTP call.
     * @param request A request to perform.
     */
    private callApi<TRes>(request: ApiRequest): Promise<TRes> {
        return new Promise((resolve, reject) => {
            this.client
                .request<TRes>({
                    url: request.url,
                    method: request.method,
                    params: request.requestData,
                    responseType: 'json'
                })
                .then((response) =>
                    response?.status && response.status >= 200 && response.status < 400
                        ? resolve(response?.data)
                        : reject(response?.data)
                )
                .catch((error: AxiosError) => reject(error.response ?? error.message));
        });
    }

    private useDebugLogs() {
        this.client.interceptors.request.use((config) => {
            console.info('Calling API', config.url, config.params);
            return config;
        });

        this.client.interceptors.response.use(
            (response) => {
                console.info('Got response from API', response.config.url, response.data);
                return response;
            },
            (error: AxiosError) => {
                console.info('There was an error calling API',
                    error.request?.url, error.response?.status, error.message);
                return Promise.reject(error);
            });
    }

}
