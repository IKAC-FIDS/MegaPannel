import axios from "axios";


import router from "next/router";

const axiosInstance = axios.create({
    baseURL: "BASE_URL",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",

    },
});
const requests: any = {};

axiosInstance.interceptors.request.use(
    (config) => {

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {

        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response) {

            switch (error.response.status) {
                case 400:

                    if (error.response.data.data.message.match("loginRequired")) {


                    }
                    return {status: error.response.status};
                case 404:

                    break;
                case 403:

                    break;
                case 401:
                case 450:
                case 451:

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
