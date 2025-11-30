import axios, {
    type AxiosInstance,
    AxiosError,
    type InternalAxiosRequestConfig
} from 'axios';
import { toast } from 'react-toastify';
// Base URL configurable via environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
// Create axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => {
        // Return successful response
        return response;
    },
    async (error: AxiosError) => {
        // Global error handling
        if (error.response) {
            const { status, data } = error.response;
            let defaultMessage = '';
            switch (status) {
                case 400:
                    defaultMessage = 'Requisição inválida. Verifique os dados enviados.';
                    break;
                case 401:
                    defaultMessage = 'Não autorizado. Faça login novamente.';
                    // Redirect to login
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                    break;
                case 403:
                    defaultMessage = 'Acesso negado.';
                    break;
                case 404:
                    defaultMessage = 'Recurso não encontrado.';
                    break;
                case 500:
                    defaultMessage = 'Erro no servidor. Tente novamente mais tarde.';
                    break;
                default:
                    defaultMessage = 'Erro ao processar requisição.';
            }
            // Extract error messages from API response
            if (data && typeof data === 'object' && 'reason' in data) {
                const apiData = data as { reason?: string[] };
                toast.error(apiData.reason || defaultMessage)

                /*const apiData = data as { errors?: string[] };
                if (apiData.errors && Array.isArray(apiData.errors)) {
                    apiData.errors.forEach((err: string) => toast.error(err));
                }*/
            }
        } else if (error.request) {
            // Network error
            toast.error('Erro de conexão. Verifique sua internet.');
        } else {
            toast.error('Erro inesperado.');
        }
        return Promise.reject(error);
    }
);
// Retry logic for failed requests
const MAX_RETRIES = 3;
let retryCount = 0;
axiosInstance.interceptors.response.use(
    undefined,
    async (error: AxiosError) => {
        const config = error.config as InternalAxiosRequestConfig & {
            _retry?: number
        };
        if (!config || !error.response) {
            return Promise.reject(error);
        }
        // Retry on 5xx errors
        if (error.response.status >= 500 && retryCount < MAX_RETRIES) {
            config._retry = (config._retry || 0) + 1;
            retryCount++;
            // Exponential backoff
            const delay = Math.pow(2, config._retry) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            return axiosInstance(config);
        }
        retryCount = 0;
        return Promise.reject(error);
    }
);
export default axiosInstance;