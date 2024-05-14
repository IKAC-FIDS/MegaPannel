'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from 'next/navigation'
import Header from "@/app/dashboard/header/page";
import Sidebar from "@/app/dashboard/sidebar/page";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const pathName=usePathname()

    document.dir = "rtl"

  return (
    <html lang="en" dir={'rtl'}>
      <body style={{direction:"rtl"}}>
      {pathName.endsWith('/') ? children :
          <div>
          <Header/>
          <main className={"flex relative"}>
              <div className={"fixed right-0"} style={{width: "20%"}}><Sidebar/></div>
              <div style={{background: "#f5f5f5", width: "80%", overflow: "scroll" ,height:"100vh" , scrollbarColor:"#f5f5f5"}}
                   className={"fixed left-0"}>{children}</div>
          </main>
      </div>}


      </body>
    </html>
  );
}
