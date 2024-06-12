import crypto from "crypto"
import { jwtVerify, JWTVerifyResult } from 'jose';
import {getCookie, getCookies} from "cookies-next";
import axiosInstance from "@/app/configurations/api/axiosInstance";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'secretKey');

interface DecodedToken {
    role: string[];
    userName: string;
    exp: number;
    iat: number;
}

export async function checkAccess(access:string,accessToken:string | undefined) {

    const permission = await axiosInstance.post("http://192.168.67.17:4000/api/permission",
        {
            "permission":access,
           accessToken
        }
    )
    if (!accessToken) {
        return false
    }

    if(permission.status===200){
        return permission.data.permission
    }else{
        return false
    }
}

