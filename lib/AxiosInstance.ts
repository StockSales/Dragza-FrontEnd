import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = axios.create({
    baseURL: 'http://dragza.runasp.net',
});

AxiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const token = await AsyncStorage.getItem('Token');
        if (token && config.headers && typeof config.headers.set === 'function') {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;
        if ([400, 401, 403, 404].includes(status ?? 0)) {
            await AsyncStorage.removeItem('Token');
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;
