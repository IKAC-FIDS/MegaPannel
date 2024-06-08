import NextAuth , {DefaultSession,Account,User,CallbacksOptions} from 'next-auth';
import {Session} from "inspector";

declare module 'next-auth' {
    interface Session  {
     token: string;
     user:User
    }
}