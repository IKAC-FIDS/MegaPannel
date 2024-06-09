import { jwtVerify, JWTVerifyResult } from 'jose';
import {getCookie, getCookies} from "cookies-next";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'secretKey');

interface DecodedToken {
    role: string[];
    userName: string;
    exp: number;
    iat: number;
}

export async function checkAccess(access:string,accessToken:string | undefined) {


    if (!accessToken) {
        return false
    }
    try {
        const { payload } = await jwtVerify(accessToken, secretKey) as JWTVerifyResult<DecodedToken>;
        const { role, userName } = payload;

        return role.includes(access);


    } catch (error) {
        console.error('JWT verification failed:', error);
        return  false
    }
}

