import { AxiosError, AxiosRequestConfig } from 'axios';

export interface IAxiosError extends AxiosError {
	_retry?: boolean | undefined;
}

export interface IAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean | undefined;
}

export interface IFailedQueue {
	reject: (error: AxiosError) => void;
	resolve: (token: undefined | string | null) => void;
}
