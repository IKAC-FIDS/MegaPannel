'use client'
import Image from "next/image";
import LoginImage from "@/app/shard/assets/icons/login.svg"
import Link from "next/link";
import Input from "@/app/shard/components/Input";
import React, {useEffect, useState} from "react";
import Button from "@/app/shard/components/Button";
import style from "./styles.module.css"
import loginService from "@/app/auth/login.service";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import axiosInstance from "@/app/configurations/api/axiosInstance";
import {deleteCookie, setCookie} from "cookies-next";
import {cookies} from "next/headers";


export default function Home() {

    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState<{
        userName: string | null,
        password: string | null
    }>({userName: null, password: null});
    const router = useRouter()


    useEffect(()=>{

        deleteCookie("accessToken", { path: '/', domain: 'http://192.168.67.17:4000' })
        deleteCookie("token", { path: '/', domain: 'http://192.168.67.17:4000' })
        deleteCookie("refreshToken", { path: '/', domain: 'http://192.168.67.17:4000' })
        deleteCookie("user", { path: '/', domain: 'http://192.168.67.17:4000' })

    },[])

    return (
        <>

            <div
                className={`${style.login_background} w-full h-screen flex flex-col justify-center items-center bg-blue-700`}

            >
                <div>
                    <svg width="179" height="108" viewBox="0 0 79 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M47.7886 17.065C47.7886 20.7264 49.2484 24.2378 51.8469 26.8268C54.4453 29.4157 57.9696 30.8702 61.6443 30.8702C65.3191 30.8702 68.8433 29.4157 71.4418 26.8268C74.0402 24.2378 75.5 20.7264 75.5 17.0651L70.9436 17.0651C70.9436 19.5224 69.9639 21.8791 68.2199 23.6167C66.476 25.3543 64.1106 26.3305 61.6443 26.3305C59.178 26.3305 56.8127 25.3543 55.0687 23.6167C53.3247 21.8791 52.345 19.5224 52.345 17.065L47.7886 17.065Z"
                            fill="white"/>
                        <path
                            d="M47.5115 17.065L52.1184 17.065L48.11 27.4451C47.2829 29.5868 45.2175 31 42.9143 31H41.9691L47.5115 17.065Z"
                            fill="white"/>
                        <path
                            d="M16.6233 28.2078C16.6233 29.7327 15.3827 30.9688 13.8522 30.9688C12.3217 30.9688 11.0811 29.7327 11.0811 28.2078C11.0811 26.6829 12.3217 25.4467 13.8522 25.4467C15.3827 25.4467 16.6233 26.6829 16.6233 28.2078Z"
                            fill="white"/>
                        <path
                            d="M10.5268 28.2078C10.5268 29.7327 9.28613 30.9688 7.75567 30.9688C6.22522 30.9688 4.98454 29.7327 4.98454 28.2078C4.98454 26.6829 6.22522 25.4467 7.75567 25.4467C9.28613 25.4467 10.5268 26.6829 10.5268 28.2078Z"
                            fill="white"/>
                        <path
                            d="M22.7107 17.1334C21.1123 20.0481 18.0295 21.8455 14.6962 21.8062L3.5 21.674C5.07509 18.7617 8.14253 16.9614 11.4626 17.0006L22.7107 17.1334Z"
                            fill="white"/>
                        <path
                            d="M24.2836 17.0651L29.1086 17.0651L22.7968 30.8101C20.5411 30.8101 19.0419 28.4845 19.9801 26.4407L24.2836 17.0651Z"
                            fill="white"/>
                        <path
                            d="M29.1775 21.1275C29.9575 19.3256 32.4955 19.2542 33.3763 21.0094L31.13 27.3863C30.4068 29.4395 28.4721 30.823 26.2883 30.8485L24.9629 30.864L29.1775 21.1275Z"
                            fill="white"/>
                        <path
                            d="M42.5237 23.9988C42.5065 27.8109 39.3908 30.8873 35.5647 30.8701C31.7386 30.8529 28.6509 27.7486 28.6682 23.9365C28.6855 20.1243 31.8011 17.0479 35.6272 17.0651C39.4533 17.0823 42.541 20.1866 42.5237 23.9988ZM32.5037 23.9537C32.496 25.6553 33.8742 27.0409 35.582 27.0486C37.2898 27.0563 38.6805 25.6831 38.6882 23.9815C38.6959 22.28 37.3177 20.8943 35.6099 20.8866C33.9021 20.879 32.5114 22.2521 32.5037 23.9537Z"
                            fill="white"/>
                    </svg>
                </div>

                <div
                    className={'bg-white w-1/3 h-[26rem] p-8  rounded-lg flex flex-col gap-2 justify-center items-center'}>

                    <h1 className={"text-center text-2xl font-semibold"}>پنل مدیریت سرمایه</h1>
                    <div className={"text-center"}>برای ورود لطفا نام کاربری و رمز عبور خود را وارد کنید</div>
                    <div className={"w-11/12 "}>
                        <div className={'flex flex-col justify-center w-full mb-8'}>
                            <Input label="نام کاربری"
                                   labelPlacement="outside" className={"mb-8"}
                                   onChange={(e: any) => setCredentials({...credentials, userName: e.target.value})}/>
                            <Input type={"password"} label="رمز عبور"
                                   labelPlacement="outside"
                                   onChange={(e: any) => setCredentials({...credentials, password: e.target.value})}/>

                        </div>
                    </div>
                    <div className={'flex justify-center w-11/12'}>

                        <Button isLoading={loading} onClick={async () => {


                            //         const result = await signIn('credentials', {
                            //             redirect: false, // Prevent automatic redirection0
                            //             userName:credentials.userName,
                            //             password:credentials.password,
                            //         });
                            //
                            //
                            // if(result?.ok)  router.push("/identities")

                            setLoading(true)
                            const login = await axiosInstance.post("http://192.168.67.17:4000/api/auth",
                                {
                                    "userName": credentials.userName,
                                    "password": credentials.password
                                }
                            )


                            // const login =   await loginService({userName:credentials.userName ?? "",password:credentials.password ?? ""})
                            if (login.status === 200) {

                                setCookie("accessToken",login.data.accessToken)
                                setCookie("token", login.data.login.token);
                                setCookie("refreshToken",login.data.login.refreshToken)
                                setCookie("user", login.data.user);
                                // if( typeof window !== "undefined"){ localStorage.setItem("dashboards", JSON.stringify(login.data.dashboards));
                                router.push(login.data.path ?? "/identities")
                            }
                            setLoading(false)
                        }} size={"lg"} className={'w-full'}>ورود</Button>


                    </div>

                </div>


            </div>
        </>
    );
}