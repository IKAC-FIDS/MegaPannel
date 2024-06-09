import {AxiosResponse} from "axios";
import axiosInstance from "@/app/configurations/api/axiosInstance";
import {setCookie} from "cookies-next";


const secretKey = process.env.encryptSecretKey

const loginService = async (credentials: {
    userName: string;
    password: string;
}): Promise<AxiosResponse> => {
    const response = await axiosInstance.post(
        `http://192.168.67.17:1002/api/v1/authenticate`,
        {
            username: credentials.userName,
            password: credentials.password,
        },{
            headers:{
                "scope_secret":"872KSNA4D162E6514763CABC4410CE00BD0C6445A5608C81C00E13D1HZPJ773A9AB6AF3052ED4CF04105E46549B4503C"
            }
        }
    );



    if (response.status === 200) {
        const {
            token,
            refreshToken,
        } = response.data;
        setCookie("token",token)
        setCookie("refreshToken",refreshToken)
    }

    return response;
};

export default loginService;
