import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { store } from "@/store/index.ts";
import {BACK_URL} from "@/config";
import router from "@/router";

const refreshTokenUrl = `${BACK_URL}/auth/token`;
const protectedUrl = `${BACK_URL}/api`

function appendAuthHeader(config: AxiosRequestConfig) {
    if (config.url?.indexOf(protectedUrl) === -1) return config;
    const accessToken = store.getters.accessToken;
    if (!accessToken) return config;
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
}
async function getRefreshToken(error: AxiosError) {
    const config = error.config;
    const _retry = (config as AxiosRequestConfig & { _retry: boolean })._retry;
    if (_retry && config.url === refreshTokenUrl) {
        store.commit('logged', false);
        await router.push('/login');
        return;
    }
    if (error.response!.status !== 401) throw error;
    if (config.url?.indexOf(protectedUrl) === -1) throw error;
    if (!_retry) {
        (config as AxiosRequestConfig & { _retry: boolean })._retry = true;
        const refreshToken = store.getters.refreshToken;
        const response = await axios.post(refreshTokenUrl, { refreshToken }, config);
        if (!response) {
            throw error;
        }
        if (response.status === 201) {
            store.commit('logged', true);
            const {refreshToken, accessToken}: { refreshToken: string; accessToken: string } = response.data;
            store.commit('setAccessToken', accessToken);
            store.commit('setRefreshToken', refreshToken);
            return axios(config);
        } else {
            store.commit('logged', false);
        }
    }
    throw error;
}

axios.interceptors.request.use(appendAuthHeader, Promise.reject)

axios.interceptors.response.use(value => value, getRefreshToken);

