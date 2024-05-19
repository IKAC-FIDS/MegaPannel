'use client'
import Image from "next/image";
import LoginImage from "@/app/shard/assets/icons/login.svg"
import Link from "next/link";
import Input from "@/app/shard/components/Input";
import React from "react";
import Button from "@/app/shard/components/Button";
import style from "./styles.module.css"

export default function Home() {
    // middelware
    return (
        <>
            {/*'w-full h-screen flex justify-center items-center '*/}
            <div className={`${style.login_background } w-full h-screen flex justify-center items-center bg-blue-700`}
                 // style={{backgroundImage: `${url(`@/app/shard/assets/images/Shape.svg)`}`}}
            >
                <div className={'bg-white w-1/3 h-96 p-8 rounded-lg'}>
                    <h1 className={"text-center"}>Login to Account</h1>
                    <div className={"text-center"}>Please enter your email and password to continue</div>
                    <div className={'flex flex-col justify-center mb-8'}>
                        <Input label="نام کاربری"
                               labelPlacement="outside" className={"mb-8"} />
                        <Input label="رمز عبور"
                               labelPlacement="outside" />

                    </div>
                    <div className={'flex justify-center'}>
                        <Link href={'/card'}>
                        <Button size={"lg"} className={'w-4/5'}>ورود</Button>
                        </Link>

                    </div>

                </div>



            </div>
        </>
    );
}