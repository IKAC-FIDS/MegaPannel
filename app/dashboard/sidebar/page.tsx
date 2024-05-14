
'use client'
import { ReactNode} from 'react';
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation'

import sideTabs from "@/app/sideTabs";


interface NavItemProps {
    href: string;
    label: string;
    activeColor: string;
    isActive: boolean;
    icon:ReactNode;
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, activeColor, isActive, onClick,icon }) => {
    return (
        <Link
            href={href}
            className={`py-4 font-medium transition duration-300 relative flex flex-row-reverse  ${isActive?`text-blue-700`:"text-gray-600"}`}

            onClick={onClick}
        >
            <div className={'w-1/2'}>{label}</div>
            <div className={'w-1/2 flex justify-center'}>{icon&&icon}</div>
            <div
                className={`absolute bottom-0 right-0 w-1.5 h-16 rounded-l-lg  ${isActive?`bg-blue-700`:"text-gray-600"} transition-opacity  
                 ${isActive ? 'opacity-100' : 'opacity-0'}`}
            ></div>
        </Link>
    );
};




const NavBar: React.FC = () => {
    const pathName=usePathname()


    return (
        <>

            <div className="relative  bg-white pl-8 w-64 flex-col hidden lg:flex  gap-5 pt-4">
                {sideTabs(pathName.split("/")[1]).map((item, index) => (
                    <NavItem
                        key={index}
                        {...item}
                        isActive={pathName.endsWith(item.href)}
                        href={item.href}
                        activeColor={item.activeColor}
                        onClick={(e) => {}}
                    />
                ))}
            </div>

        </>
    );
};

export default NavBar;








