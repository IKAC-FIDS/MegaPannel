// pages/api/login.ts
import {NextRequest} from 'next/server';
import loginService from '@/app/auth/login.service';
import {SignJWT} from 'jose';

const accessList = {
    full: ["card", "card_operation", "identities", "identities_operation", "services"],
    card: ["card", "card_operation"],
    operation: ["card", "identities", "identities_operation"],
};


const roles = {
    main: accessList.full,
    cardAdmin: accessList.card,
    operation: accessList.operation,
};
const users = [
    {
        name: "admin",
        pass: "Farzad@123@",
        role: roles.main,
        path: "/card",
        title: "مدیر سیستم",
        fullName: "فرزاد نوروزی فرد",
        image: null
    },
    {
        name: "ceo",
        pass: "RH@123@",
        role: roles.main,
        path: "/card",
        title: "مدیر عامل",
        fullName: "رامبد حیدریان",
        image: null
    },
    {
        name: "operation",
        pass: "MA@123@",
        role: roles.operation,
        path: "/identities",
        title: "مدیر عملیات",
        fullName: "منصور آهاری",
        image: null
    },
    {
        name: "operation1",
        pass: "SM@123@",
        role: roles.operation,
        path: "/identities",
        title: "کارشناس عملیات 1",
        fullName: "سمیه منافی",
        image: null
    },
    {
        name: "operation2",
        pass: "ZG@123@",
        role: roles.operation,
        path: "/identities",
        title: "کارشناس عملیات 2",
        fullName: "زهرا گلیج",
        image: null
    },
    {
        name: "card",
        pass: "AS@123@",
        role: roles.operation,
        path: "/card",
        title: "مدیر صدور کارت",
        fullName: "علی صولت تاش",
        image: null
    },
    {
        name: "card1",
        pass: "MG@123@",
        role: roles.operation,
        path: "/card",
        title: "کارشناس صدور کارت 1",
        fullName: "محمد قربانعلی",
        image: null
    },
    {
        name: "card2",
        pass: "FN@123@",
        role: roles.operation,
        path: "/card",
        title: "کارشناس صدور کارت 2",
        fullName: "فاطمه نیک آیین",
        image: null
    },

]
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'secretKey');

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const user = users.find((user) => user.name === body.userName && user.pass === body.password);
        const login = await loginService(user ? {userName: "s.kalami", password: "12345678"} : body);

        if (login.status !== 200) {
            return new Response(JSON.stringify({success: login.data}), {
                status: login.status,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const accessToken = await new SignJWT({userName: body.userName, role: user?.role})
            .setProtectedHeader({alg: 'HS256'})
            .setExpirationTime('1h')
            .sign(secretKey);

        return new Response(JSON.stringify({
            login: login.data,
            path: user?.path ?? "card",
            user: {fullName: user?.fullName, title: user?.title, image: user?.image},
            accessToken
        }), {
            status: login.status,
            headers: {
                "Content-Type": "application/json",
                // "Set-Cookie": `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=3600`,
            },
        });

    } catch (error) {
        return new Response(JSON.stringify({error: "Invalid request body"}), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
