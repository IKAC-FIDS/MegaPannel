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
        case "public_services":
            return public_services;

        case "dashboard":
            return dashboard;
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

const public_services = [
    {
        href: "/public_services",
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

const dashboard = [
    {
        href: "/dashboard",
        label: "Dashboard",
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

    {
        href: "/dashboard/transactions",
        label: "Transactions",
        activeColor: "blue-800",
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
                <circle cx="5" cy="18" r="2"/>
                <circle cx="19" cy="6" r="2"/>
                <path d="M19 8v5a5 5 0 0 1 -5 5h-3l3 -3m0 6l-3 -3"/>
                <path d="M5 16v-5a5 5 0 0 1 5 -5h3l-3 -3m0 6l3 -3"/>
            </svg>
        ),
    },

    {
        href: "/dashboard/accounts",
        label: "Accounts",
        activeColor: "blue-700",
        icon: (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        ),
    },

    {
        href: "/dashboard/investments",
        label: "Investments",
        activeColor: "blue-800",
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
                <circle cx="12" cy="12" r="9"/>
                <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1 -1.8 -1"/>
                <path d="M12 6v2m0 8v2"/>
            </svg>
        ),
    },

    {
        href: "/dashboard/creditcards",
        label: "Credit Cards",
        activeColor: "blue-800",
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
                <rect x="3" y="5" width="18" height="14" rx="3"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <line x1="7" y1="15" x2="7.01" y2="15"/>
                <line x1="11" y1="15" x2="13" y2="15"/>
            </svg>
        ),
    },

    {
        href: "/dashboard/loans",
        label: "Loans",
        activeColor: "blue-800",
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
                <rect x="4" y="6" width="4" height="5" rx="1"/>
                <line x1="6" y1="4" x2="6" y2="6"/>
                <line x1="6" y1="11" x2="6" y2="20"/>
                <rect x="10" y="14" width="4" height="5" rx="1"/>
                <line x1="12" y1="4" x2="12" y2="14"/>
                <line x1="12" y1="19" x2="12" y2="20"/>
                <rect x="16" y="5" width="4" height="6" rx="1"/>
                <line x1="18" y1="4" x2="18" y2="5"/>
                <line x1="18" y1="11" x2="18" y2="20"/>
            </svg>
        ),
    },

    {
        href: "/dashboard/services",
        label: "Services",
        activeColor: "blue-800",
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
                <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"/>
                <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"/>
                <polyline points="12 8 7 3 3 7 8 12"/>
                <line x1="7" y1="8" x2="5.5" y2="9.5"/>
                <polyline points="16 12 21 17 17 21 12 16"/>
                <line x1="16" y1="17" x2="14.5" y2="18.5"/>
            </svg>
        ),
    },

    {
        href: "/dashboard/myprivileges",
        label: "My Privileges",
        activeColor: "blue-800",
        icon: (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill={"none"}
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
            </svg>
        ),
    },

    {
        href: "/dashboard/setting",
        label: "Setting",
        activeColor: "blue-800",
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
                <path
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        ),
    },
];

export const dashboards = [
    {
        label: "پنل مدیریت کارت ها",
        route: "/card"
    },
    {
        label: "پنل آمار",
        route: "/public_services"
    },
    {
        label: "داشبورد",
        route: "dashboard"
    }
]

export default sideTabs;
