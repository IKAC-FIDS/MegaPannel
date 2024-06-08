'use client'
import { ReactNode, useState, useEffect, useRef } from 'react';
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation';

import sideTabs from "@/app/sideTabs";

interface NavItemProps {
    href: string;
    label: string;
    activeColor: string;
    isActive: boolean;
    icon: ReactNode;
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, activeColor, isActive, onClick, icon }) => {
    return (
        <Link
            href={href}
            className={`nav-item ${isActive ? 'active' : 'inactive'}`}
            onClick={onClick}
        >
            <div className={'w-1/2 flex justify-center'}>{icon && icon}</div>
            <div className={'w-1/2'}>{label}</div>

        </Link>
    );
};

const NavBar: React.FC = () => {
    const pathName = usePathname();
    const [activeIndex, setActiveIndex] = useState(0);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentPath = pathName.split("/")[1];
        const index = sideTabs(currentPath).findIndex(item => pathName.endsWith(item.href));
        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [pathName]);

    return (
        <div ref={navRef} className="nav-container">
            <div
                className="active-indicator"
                style={{
                    transform: `translateY(${((activeIndex -1) *75) + 75}px)`
                }}
            />
            {sideTabs(pathName.split("/")[1]).map((item, index) => (
                <NavItem
                    key={index}
                    {...item}
                    isActive={index === activeIndex}
                    href={item.href}
                    activeColor={item.activeColor}
                    onClick={(e) => {
                        setActiveIndex(index);
                    }}
                />
            ))}
        </div>
    );
};

export default NavBar;
