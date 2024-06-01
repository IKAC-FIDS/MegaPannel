import axios from "axios";


import router from "next/router";


import { getCookie } from 'cookies-next';
import redirectTo from "@/app/shard/utils/redirectTo";



const axiosInstance = axios.create({
    baseURL: "BASE_URL",
    timeout: 30000,

    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = getCookie("token")

        config.headers["Authorization"] = token ?? "";


        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



axiosInstance.interceptors.response.use(
    (response) => {

        console.log(getCookie("token"))
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response) {

            switch (error.response.status) {
                case 400:


                    return {status: error.response.status};
                case 404:

                    break;
                case 403:

                    break;
                case 401:
                case 450:
                case 451:
                    await redirectTo("/");
                    return {status: 450};
                case 440:
                    if (originalRequest._retry) break;
                    originalRequest._retry = true;


                default:

                    break;
            }
            return {status: error.response.status};
        } else {
            return {status: 500};
        }
    }
);

export default axiosInstance;
