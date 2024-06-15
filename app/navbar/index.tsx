'use client'

import Image from "next/image";
import BankDashIcon from "@/app/dashboard/shard/assets/icons/bankdash.svg";
import Notification from "@/app/shard/assets/icons/notification.svg";
import Person from "@/app/navbar/assets/images/person.png";
import Settings from "@/app/shard/assets/icons/settings.svg";
import Logo from "@/app/navbar/assets/icons/logo.svg";
import SearchIcon from "@/app/shard/assets/icons/searchicon.svg";
import React, {useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem, Badge, Select, SelectItem
} from "@nextui-org/react";

import {usePathname} from "next/navigation";
import Link from "next/link";
import Input from "@/app/shard/components/Input";
import sideTabs, {dashboards, dashProps} from "@/app/sideTabs";
import Button from "@/app/shard/components/Button";
import {deleteCookie, getCookie} from "cookies-next";
import axiosInstance from "@/app/configurations/api/axiosInstance";


// const getItems = ()=>{
//
//     if( typeof window !== "undefined"){
//         const storedData = localStorage.getItem("dashboards")
//         if(storedData !== null && storedData !== "undefined"){
//             return JSON.parse(storedData)
//         }
//     }
//     else{
//         return []
//     }
// }

// const dashboards = dashboards

interface dashboard{ label: string; route: string }

const Header = () => {

    const pathName = usePathname()
    const endUrl = pathName.split("/").pop();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const userCookie = getCookie("user")
    const dashboards: dashboard[] = [];

    if (typeof window !== 'undefined') {
        const storedDashboards = JSON.parse(localStorage.getItem("dashboards") ?? "[]")
        storedDashboards.forEach((item:dashboard )=> dashboards.push(item));
    }




// console.log( itemss)


    dashboards.push({label: "خروج", route: "/"})

    if (!userCookie) return (<></>)
    const user = JSON.parse(userCookie)
    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} className={"h-20"}
                    maxWidth={"full"}>

                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"

                />
                <NavbarContent className={"max-w-2/12 "}>

                    <NavbarItem className={'md:ml-56 md:flex hidden'}>
                        <Image src={Logo.src} alt={"Notification"}
                               width={70}
                               height={13.66}/>
                    </NavbarItem>

                    <NavbarItem className={'md:flex hidden'}>
                        <Badge content="0" shape="circle" color="danger">
                            <Button
                                radius="full"
                                isIconOnly
                                aria-label="more than 99 notifications"
                                variant="light"
                            >
                                <Image src={Notification.src} alt={"Notification"} width={24} height={25}/>
                            </Button>
                        </Badge>
                    </NavbarItem>
                    <NavbarItem className={"flex"}>
                        <Image src={user.image ?? Person.src} alt={"person"} width={44} height={44}/>

                    </NavbarItem>
                    <NavbarItem>
                        <div>{user.fullName}</div>
                        <div>{user.title}</div>
                    </NavbarItem>
                    <NavbarItem className={"w-[180px] md:w-60 md:mr-auto"}>
                        <Select
                            items={dashboards}
                            color={"primary"}
                            defaultSelectedKeys={[dashboards.find((dashboard) => {
                                return dashboard.route.includes(pathName.split("/")[1])
                            })?.route ?? ""]}

                        >
                            {(dashboard: dashProps) =>

                                <SelectItem
                                    key={dashboard.route}
                                    href={dashboard.route}
                                    value={dashboard.label}
                                    onClick={async () => {
                                        if (dashboard.route === "/") {
                                            // localStorage.removeItem("dashboards")
                                            await axiosInstance.post("http://192.168.67.17:4000/api/logout")
                                        }
                                    }}>
                                    {dashboard.label}

                                </SelectItem>

                            }
                        </Select>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu className={'pt-10'}>
                    {sideTabs(pathName.split("/")[1]).map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`} onClick={() => setIsMenuOpen(false)}>
                            <Link

                                className={`${pathName.endsWith(item.href) ? "text-blue-700" : "text-blue-300"}`}
                                href={item.href}
                                onClick={() => {

                                }}
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>


        </>
    )
}
export default Header;