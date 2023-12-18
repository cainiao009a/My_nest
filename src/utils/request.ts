import axios, { Method } from 'axios';
import { getConfig } from '@/utils';

const { FEISHU_CONFIG: { FEISHU_URL } } = getConfig();


/**
 * @description 任意请求
 * **/

const request = async ({ url, options = {} }) => {
    try {
        return axios.request({
            url: url,
            ...options,
        });
    } catch (error) {
        throw error
    }
}

interface IMethodV {
    url: string;
    method?: Method;
    headers?: { [key: string]: string };
    params?: Record<string, unknown>;
    query?: Record<string, unknown>;
}

export interface IRequest {
    data: any;
    code: number;
}

/**
 * @description: 带version的通用api请求
 * **/
const methodV = async ({ url, method = 'GET', headers = {}, params = {}, query = {} }: IMethodV): Promise<IRequest> => {
    let sendUrl = '';
    if (/^(http:\/\/|https:\/\/)/.test(url)) {
        sendUrl = url;
    } else {
        sendUrl = `${FEISHU_URL}${url}`;
    }
    try {
        return new Promise((resolve, reject) => {
            axios({
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    ...headers,
                },
                url: sendUrl,
                method,
                params: query,
                data: {
                    ...params,
                },
            })
                .then(({ data, status }) => {
                    resolve({ data, code: status });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    } catch (error) {
        throw error;
    }
}


export { request, methodV };