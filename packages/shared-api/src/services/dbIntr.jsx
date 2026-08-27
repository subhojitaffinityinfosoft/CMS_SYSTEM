import { useToast } from "shared-ui/components/ui/use-toast";
import AppLoader from "shared-ui/components/ux/AppLoader";
import LoaderContext from "shared-core/context/loader/LoaderContext";
import { getStorageData } from "shared-ui/lib/Storage";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_API_URL;
const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': "false"
    }
});



const useAxiosLoader = () => {
    const { toast } = useToast();
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const inc = mod => setCounter(c => c + mod);
        const handleRequest = config => (inc(config.headers.bypass_log ? 0 : 1),
            config);
        const handleResponse = response => (
            inc(response?.config?.headers.bypass_log ? 0 : -1),
            response);
        const handleError = error => {
            inc(-1);
            console.log(error)
            toast({
                title: 'ERR!!',
                description: error?.message,
                variant: 'destructive'
            })
            // if(err?.response.status === 401 || err.response.status === 403){
            //     navigate('/');
            // }

            return Promise.reject(error).then(res => {

            })
        };
        // add request interceptors
        const reqInterceptor = instance.interceptors.request.use(handleRequest, handleError);
        // add response interceptors
        const resInterceptor = instance.interceptors.response.use(handleResponse, handleError);
        return () => {
            // remove all intercepts when done
            instance.interceptors.request.eject(reqInterceptor);
            instance.interceptors.response.eject(resInterceptor);
        };
    }, []);

    return counter > 0;
};

export const GlobalLoader = () => {
    const loading = useAxiosLoader();
    const { setLoader } = useContext(LoaderContext);

    useEffect(() => {
        setLoader(loading)
    }, [loading])


    return (
        <>
            {
                loading ? <AppLoader /> : null
            }
        </>

    );
}

const CallApi = async (flag, api_name, payload, headers, params, bypassLog, signal) => {
    try {
        const auth_headers = {
            'Authorization': getStorageData(import.meta.env.VITE_AU_TK) ? `Bearer  ${getStorageData(import.meta.env.VITE_AU_TK)}` : '',
            ...headers,
            bypass_log: bypassLog ? bypassLog : false
        }
        if (flag == 1) {
            // post..
            return await instance.post(
                api_name,
                payload,
                {
                    headers: auth_headers,
                    signal: signal
                }
            )
        }
        else if (flag == 2) {
            // Delete..
            return await instance.delete(
                api_name,

                {
                    data: payload,
                    headers: auth_headers,
                    signal: signal
                }
            )
        }
        else {
            return await instance.get(
                api_name,
                {
                    headers: auth_headers,
                    params: params
                }
            )
        }
    }
    catch (err) { }

}

const CallApiWithStatic = async (flag, api_name, payload, headers, params) => {
    try {
        const auth_headers = {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBRE1JTiIsInRva2Vua2V5IjoiQURNSU4iLCJkYXRhIjoiWStxTitYK3pMaEtzTklnSHo4blpKQ1UvWWd4ZEFoY2E0NktrZHhFR29JNU5mVHVZRTBoZEVxYkJFMTFGSFpNdndqL0dmTktIVUZjTmRPdmFla25qY1hUdzNDMzJaWk40eENERzczR0JXVDBZMVMzRUxtbCswVFdtMFJZZTlkVko2eDVDcVVNUE5VRGpDSXZsUEk2VFJyczJjVGZlOWlzdjBZTDJBMDdXNXRuRmFrRHZIN1MwOEcxN2tKSHRyUlBTSHFyRW13dEZDNll1a2NkQWdJeFRyWmZFUHQwQlZ1Rm51Tk9NUndXYjJPSHlobWNMZEg5OUhtdkllMlpyYkVsYm03NnpoVkFEQkNmNVJVUTZYQVcvKzgxK1E2bjBQNEM2b0VBcS9Mc0RRMzY0ODNKdi9CRVlVQ2w1R0c5SW43aDczRnJQVUhjTEkvcjdhNmdEYzh6Z0VRPT0iLCJqdGkiOiI3YzEwNGUxYi0yMzg3LTQ3YWEtOTI2Yy03MjQ1YWFlNzNkYzIiLCJleHAiOjE3NTczMjg3NDksImlzcyI6InRlc3QuY29tIiwiYXVkIjoidGVzdC5jb20ifQ.B_xJVWbGQYX2AuN8ZHUOB2zA0uZVa1sA6FfrL3h9ywo`,
            ...headers
        }
        if (flag == 1) {
            // post..
            return await instance.post(
                api_name,
                payload,
                {
                    headers: auth_headers
                }
            )
        }
        else if (flag == 2) {
            // Delete..
            return await instance.delete(
                api_name,
                {
                    headers: auth_headers
                }
            )
        }
        else {
            return await instance.get(
                api_name,
                {
                    headers: auth_headers,
                    params: params
                }
            )
        }
    }
    catch (err) { }

}

export default CallApi;

export { CallApiWithStatic };
