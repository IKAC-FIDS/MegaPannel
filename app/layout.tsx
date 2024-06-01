'use client'

import "./globals.css";
import {usePathname} from 'next/navigation'
import Navbar from "@/app/navbar/page"
import Sidebar from "@/app/sidebar/page";

import localFont from "@next/font/local";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Shabnam_FD = localFont({
    src: [

        {path: "../public/Font/Shabnam-Thin-FD.woff2", weight: "100", style: "normal"},

        {path: "../public/Font/Shabnam-Light-FD.woff2", weight: "300", style: "normal"},

        {path: "../public/Font/Shabnam-FD.woff2", weight: "400", style: "normal"},

        {path: "../public/Font/Shabnam-Medium-FD.woff2", weight: "600", style: "normal"},

        {path: "../public/Font/Shabnam-Bold-FD.woff2", weight: "900", style: "normal"}

    ],

    variable: "--font-shabnam",
    // weight:"900",
    // display:"swap"
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname()

    document.dir = "rtl"

    return (
        <html lang="fa" dir={'rtl'} className={`${Shabnam_FD.className} `}>
        <body style={{direction: "rtl"}}>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            pauseOnHover
            theme="light"
        />
        {pathName.endsWith('/') ? children :
            <div>
                <Navbar/>
                <main className={"flex relative"}>
                    <div className={"fixed right-0 w-1/6"}><Sidebar/></div>
                    <div style={{background: "#f5f5f5", height: "100vh"}}
                         className={"fixed left-0 w-full lg:w-10/12 scrollbar-thin overflow-y-auto "}>{children}</div>
                </main>
            </div>}


        </body>
        </html>
    );
}
