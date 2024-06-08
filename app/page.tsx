'use client'
import Image from "next/image";
import LoginImage from "@/app/shard/assets/icons/login.svg"
import Link from "next/link";
import Input from "@/app/shard/components/Input";
import React, {useState} from "react";
import Button from "@/app/shard/components/Button";
import style from "./styles.module.css"
import loginService from "@/app/auth/login.service";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import axiosInstance from "@/app/configurations/api/axiosInstance";
import {deleteCookie, setCookie} from "cookies-next";
import {cookies} from "next/headers";


export default function Home() {

    const [credentials, setCredentials] = useState<{
        userName: string | null,
        password: string | null
    }>({userName: null, password: null});
    const router = useRouter()



    return (
        <>

            <div className={`${style.login_background} w-full h-screen flex justify-center items-center bg-blue-700`}

            >
                <div className={'bg-white w-1/3 h-96 p-8 rounded-lg'}>
                    <h1 className={"text-center text-2xl font-semibold"}>پنل مدیریت سرمایه</h1>
                    <div className={"text-center"}>برای ورود لطفا نام کاربری و رمز عبور خود را وارد کنید</div>
                    <div className={'flex flex-col justify-center mb-8'}>
                        <Input label="نام کاربری"
                               labelPlacement="outside" className={"mb-8"}
                               onChange={(e: any) => setCredentials({...credentials, userName: e.target.value})}/>
                        <Input type={"password"}  label="رمز عبور"
                               labelPlacement="outside"
                               onChange={(e: any) => setCredentials({...credentials, password: e.target.value})}/>

                    </div>
                    <div className={'flex justify-center'}>

                        <Button onClick={async () => {


                            //         const result = await signIn('credentials', {
                            //             redirect: false, // Prevent automatic redirection
                            //             userName:credentials.userName,
                            //             password:credentials.password,
                            //         });
                            //
                            //
                            // if(result?.ok)  router.push("/identities")


                            const login = await axiosInstance.post("http://localhost:3000/api/auth",
                                {
                                    "userName": credentials.userName,
                                    "password": credentials.password
                                }
                            )


                            // const login =   await loginService({userName:credentials.userName ?? "",password:credentials.password ?? ""})
                              if(login.status === 200){
                                  setCookie("token", login.data.login.data.token);
                                  setCookie("user", login.data.user);
                                  router.push(login.data.path ?? "/identities")
                              }

                        }} size={"lg"} className={'w-4/5'}>ورود</Button>


                    </div>

                </div>


            </div>
        </>
    );
}