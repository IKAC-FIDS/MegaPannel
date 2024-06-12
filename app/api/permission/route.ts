// pages/api/login.ts
import { NextRequest, NextResponse } from 'next/server';
import {jwtVerify, JWTVerifyResult} from "jose";


const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

interface DecodedToken {
    role: string[];
    userName: string;
    exp: number;
    iat: number;
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const accessToken = body.accessToken
        const permission =body.permission;
        const { payload } = await jwtVerify(accessToken, secretKey) as JWTVerifyResult<DecodedToken>;
        const { role, userName } = payload;



        return new Response(JSON.stringify({permission: role.includes(permission)}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request body" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
