'use client'

import Image from "next/image";
import BankDashIcon from "@/app/dashboard/shard/assets/icons/bankdash.svg";
import Notification from "@/app/shard/assets/icons/notification.svg";
import Person from "@/app/navbar/assets/images/person.svg";
import Settings from "@/app/shard/assets/icons/settings.svg";
import Logo from "@/app/navbar/assets/icons/logo.svg";
import SearchIcon from "@/app/shard/assets/icons/searchicon.svg";
import React, {useEffect, useState} from "react";
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


const Header = () => {

    const pathName = usePathname()
    const endUrl = pathName.split("/").pop();

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} className={"h-20"}
                    maxWidth={"full"}>

                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"

                />
                <NavbarContent className={"max-w-2/12 "}>

                    <NavbarItem className={'ml-56'}> <Image src={Logo.src} alt={"Notification"} width={70}
                                                            height={13.66}/></NavbarItem>

                    <NavbarItem>
                        <Badge content="6" shape="circle" color="danger">
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
                        <Image src={Person.src} alt={"person"} width={44} height={44}/>

                    </NavbarItem>
                    <NavbarItem>
                        <div>سارا حسینی</div>
                        <div>کارشناس امور مشتریان</div>
                    </NavbarItem>
                    <NavbarItem className={"w-60 mr-auto"}>
                        <Select
                            items={dashboards}
                            label="انتخاب پنل"
                            color={"primary"}
                            defaultSelectedKeys={[dashboards.find((dashboard) => {
                                return dashboard.route.includes(pathName.split("/")[1])
                            })?.route]}
                        >
                            {(dashboard: dashProps) =>

                                <SelectItem
                                    key={dashboard.route}
                                    href={dashboard.route}
                                    value={dashboard.label}>
                                    {dashboard.label}
                                </SelectItem>

                            }
                        </Select>
                    </NavbarItem>
                </NavbarContent>
                {/*<NavbarContent>*/}
                {/* */}
                {/*</NavbarContent>*/}

                {/*<NavbarContent className="hidden sm:flex gap-10" justify="center">*/}
                {/*    <NavbarItem>*/}
                {/*        <div*/}
                {/*            className={"w-9 bg-gray-200 hidden lg:flex justify-center items-center rounded-full p-1"}>*/}
                {/*            <Image*/}
                {/*                src={Settings.src}*/}
                {/*                alt={"dashboard Logo"}*/}
                {/*                width={26}*/}
                {/*                height={26}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </NavbarItem>*/}

                {/*    <NavbarItem>*/}

                {/*        <div*/}
                {/*            className={*/}
                {/*                "w-9  bg-gray-200 hidden lg:flex justify-center items-center rounded-full p-1"*/}
                {/*            }*/}
                {/*        >*/}
                {/*            <Image*/}
                {/*                src={Notification.src}*/}
                {/*                alt={"dashboard Logo"}*/}
                {/*                width={26}*/}
                {/*                height={26}*/}
                {/*            />*/}
                {/*        </div>*/}

                {/*    </NavbarItem>*/}
                {/*    <NavbarItem>*/}


                {/*        <div>*/}
                {/*            <Image*/}
                {/*                src={Person.src}*/}
                {/*                alt={"dashboard Logo"}*/}
                {/*                width={50}*/}
                {/*                height={50}*/}
                {/*            />*/}
                {/*        </div>*/}

                {/*    </NavbarItem>*/}
                {/*</NavbarContent>*/}

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