'use client'

import Image from "next/image";
import BankDashIcon from "@/app/dashboard/shard/assets/icons/bankdash.svg";
import Notification from "@/app/shard/assets/icons/notification.svg";
import Person from "@/app/shard/assets/icons/person.svg";
import Settings from "@/app/shard/assets/icons/settings.svg";
import SearchIcon from "@/app/shard/assets/icons/searchicon.svg";
import React, {useEffect, useState} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";

import {usePathname} from "next/navigation";
import Link from "next/link";

const Header = () => {

    const pathename = usePathname();
    const endUrl = pathename.split("/").pop();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { href: '/dashboard', label: 'Dashboard'},

        {href: '/dashboard/transactions', label: 'Transactions'},

        {href: '/dashboard/accounts', label: 'Accounts'},

        {href: '/dashboard/investments', label:'Investments'},

        {href: '/dashboard/creditcards', label: 'Credit Cards'},

        {href: '/dashboard/loans', label: 'Loans'},

        {href: '/dashboard/services', label: 'Services'},

        {href: '/dashboard/myprivileges', label: 'My Privileges'},

        {href: '/dashboard/setting', label: 'Setting'},
    ];

  return(
      <>
          <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} className={"h-28"} maxWidth={"full"}>

              <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="sm:hidden"

              />
              <NavbarContent className={"max-w-full"}>
                  <NavbarItem className={"w-2/12"}>
                      <div className=" items-center gap-4 hidden lg:flex">
                          <Image
                              src={BankDashIcon.src}
                              alt={"dashboard Logo"}
                              width={36}
                              height={36}
                          />
                          <h1>BankDash.</h1>
                      </div>
                  </NavbarItem>
                  <NavbarItem className={"w-full "}>
                      <div className={"flex items-center justify-between w-full"}>
                          {/*<div className={"flex w-80 items-center  "}>*/}

                          <div className={" w-full flex flex-col items-center justify-between"}>
                          <div className={"flex justify-between items-center w-full sm:justify-start"}>
                                      <h1 className="font-bold text-lg mx-auto sm:mx-0">{endUrl}</h1>

                                      <div className={"sm:hidden flex mx-auto sm:mx-0"}>
                                          <Image
                                              src={Person.src}
                                              alt={"dashboard Logo"}
                                              width={35}
                                              height={35}
                                          />
                                      </div>
                                  </div>


                              </div>

                          {/*</div>*/}
                      </div>

                  </NavbarItem>
              </NavbarContent>


              <NavbarContent className="hidden sm:flex gap-10" justify="center">
                  <NavbarItem>
                      <div
                          className={
                              "rounded-full w-64 h-12 bg-gray-200 hidden lg:flex items-center justify-center "
                          }
                      >
                          <label className={"flex"}>
                              <Image
                                  src={SearchIcon.src}
                                  alt={"Search"}
                                  width={19}
                                  height={19}
                              />
                              <input
                                  type={"text"}
                                  placeholder={"Search for something"}
                                  className={"focus:outline-none ml-4  bg-gray-200"}
                              />
                          </label>
                      </div>
                  </NavbarItem>
                  <NavbarItem>
                      <div
                          className={
                              "w-12  bg-gray-200 hidden lg:flex justify-center items-center rounded-full p-1"
                          }
                      >
                          <Image
                              src={Settings.src}
                              alt={"dashboard Logo"}
                              width={36}
                              height={36}
                          />
                      </div>
                  </NavbarItem>

                  <NavbarItem >

                      <div
                          className={
                              "w-12  bg-gray-200 hidden lg:flex justify-center items-center rounded-full p-1"
                          }
                      >
                          <Image
                              src={Notification.src}
                              alt={"dashboard Logo"}
                              width={36}
                              height={36}
                          />
                      </div>

                  </NavbarItem>
                  <NavbarItem>


                      <div>
                          <Image
                              src={Person.src}
                              alt={"dashboard Logo"}
                              width={60}
                              height={60}
                          />
                      </div>

                  </NavbarItem>
              </NavbarContent>

              <NavbarMenu className={'pt-10'}>
                  {menuItems.map((item, index) => (
                      <NavbarMenuItem key={`${item}-${index}`}    onClick={() => setIsMenuOpen(false)}>
                          <Link

                              className={`${pathename.endsWith(item.href) ? "text-blue-700" : "text-blue-300" }`}
                              href={item.href}
                              onClick={()=>{
                                  console.log(pathename.endsWith(item.href))
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