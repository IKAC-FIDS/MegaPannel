"use server";


import {redirect} from "next/navigation";

export default async function redirectTo(path: string) {
    redirect(path);
};
