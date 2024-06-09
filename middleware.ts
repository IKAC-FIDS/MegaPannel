// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, JWTVerifyResult } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'secretKey');

interface DecodedToken {
    role: string[];
    userName: string;
    exp: number;
    iat: number;
}

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('accessToken')?.value;



    if (!accessToken) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    try {
        const { payload } = await jwtVerify(accessToken, secretKey) as JWTVerifyResult<DecodedToken>;
        const { role, userName } = payload;

        // Check if the user has access to the requested route
        // const hasAccessToPublicServices = role.includes(req.url) ;
        const hasAccessToPublicServices = role.find((role)=> req.nextUrl.pathname.startsWith("/"+role))

        if (!hasAccessToPublicServices) {
            return NextResponse.redirect(new URL('/forbidden', req.url)); // Redirect to a forbidden page
        }

        // Add the role to the request headers to be used in the handler
        req.headers.set('role', JSON.stringify(role));

        return NextResponse.next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher: ['/services', '/card','/identities'], // Specify the routes that need this middleware
};
