import React, {ReactNode} from "react";

interface NavItemProps {
    href: string;
    label: string;
    activeColor: string;
    icon: ReactNode;
}

export interface dashProps {
    label: string;
    route: string
}

const sideTabs = (location: string): NavItemProps[] => {
    switch (location) {
        case "card":
            return card;
        // case "services":
        //     return services;

        case "identities":
            return  identities
        default:
            return [];
    }
};

const card = [
    {
        href: "/card",
        label: "درخواست",
        activeColor: "blue-700",
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z"/>
                <polyline points="5 12 3 12 12 3 21 12 19 12"/>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
            </svg>
        ),
    },
];

const identities = [
    {
        href: "/identities",
        label: "درخواست ها",
        activeColor: "blue-700",
        icon: (
            <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1.5em"
                width="1.5em"
            >
                <path
                    d="M14.5 3a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h13zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z"/>
                <path
                    d="M7 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0zM7 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z"/>
            </svg>
        ),
    },
    {
        href: "/identities/users",
        label: "لیست کاربران",
        activeColor: "blue-700",
        icon: (
            <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="1.5em"
                width="1.5em"
            >
                <path d="M14 19a6 6 0 00-12 0"/>
                <path d="M12 9 A4 4 0 0 1 8 13 A4 4 0 0 1 4 9 A4 4 0 0 1 12 9 z"/>
                <path d="M22 19a6 6 0 00-6-6 4 4 0 100-8"/>
            </svg>
        ),
    },
];

const services = [
    {
        href: "/services",
        label: "آمار",
        activeColor: "blue-700",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z"/>
                <polyline points="5 12 3 12 12 3 21 12 19 12"/>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
            </svg>
        ),
    },
];


export const dashboards = [
    {
        label: "مدیریت کارت ها",
        route: "/card"
    },
    // {
    //     label: "سرویس ها",
    //     route: "/services"
    // },
    {
        label: "اهراز هویت",
        route: "/identities"
    }
    // {
    //     label: "داشبورد",
    //     route: "dashboard"
    // }
]

export default sideTabs;
