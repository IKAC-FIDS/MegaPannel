// pages/api/login.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        return new Response(JSON.stringify({}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie":  `accessToken=deleted; Max-Age=0; HttpOnly; Path=/`,
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
