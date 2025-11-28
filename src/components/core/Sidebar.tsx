'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/core/Logo";
import {
    FaHome,
    FaUsers,
    FaShoppingCart,
    FaBox,
    FaFileInvoice,
    FaCog,
    FaBars
} from "react-icons/fa";

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
    userRole?: string;
}

interface NavItem {
    href: string;
    icon: React.ReactNode;
    active_icon: React.ReactNode;
    label: string;
}

const sidebarItems: NavItem[] = [
    {
        href: "/admin",
        icon: <FaHome className="w-4 h-4" />,
        active_icon: <FaHome className="w-4 h-4 text-primary" />,
        label: "Home",
    },
    {
        href: "/admin/users",
        icon: <FaUsers className="w-4 h-4" />,
        active_icon: <FaUsers className="w-4 h-4 text-primary" />,
        label: "Users Management",
    },
    {
        href: "/admin/orders",
        icon: <FaShoppingCart className="w-4 h-4" />,
        active_icon: <FaShoppingCart className="w-4 h-4 text-primary" />,
        label: "Order Management",
    },
    {
        href: "/admin/products",
        icon: <FaBox className="w-4 h-4" />,
        active_icon: <FaBox className="w-4 h-4 text-primary" />,
        label: "Products Management",
    },
    {
        href: "/admin/invoices",
        icon: <FaFileInvoice className="w-4 h-4" />,
        active_icon: <FaFileInvoice className="w-4 h-4 text-primary" />,
        label: "Invoices",
    },
    {
        href: "/admin/settings",
        icon: <FaCog className="w-4 h-4" />,
        active_icon: <FaCog className="w-4 h-4 text-primary" />,
        label: "Settings",
    },
];

const SidebarNavItem = ({
    href,
    icon,
    active_icon,
    label,
    isActive,
    onClick
}: NavItem & {
    isActive: boolean;
    onClick: () => void;
}) => (
    <li className="w-full">
        <Link href={href} onClick={onClick}>
            <div
                className={`flex items-center gap-4 px-5 py-1.5 rounded-lg text-sm transition-all duration-200
        ${isActive
                        ? "bg-primary/20 text-foreground font-medium border border-primary/30"
                        : "font-normal text-gray-400 hover:text-foreground hover:bg-secondary/50 border border-transparent"
                    }`}
            >
                {isActive ? active_icon : icon}
                {label}
            </div>
        </Link>
    </li>
);

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, userRole }: SidebarProps) => {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    const handleOverlayClick = () => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setIsSidebarOpen(false)}
                className={`fixed left-0 top-0 ${isSidebarOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'} transition-all duration-300 h-screen lg:w-0 w-full bg-black/40 backdrop-blur-sm z-40 lg:hidden`}
            />

            {/* Main sidebar */}
            <div
                className={`fixed top-0 left-0 lg:z-0 z-50 w-fit overflow-hidden lg:translate-x-0 h-screen flex items-center justify-start`}
            >
                {/* Side ribbon */}
                <div className="bg-secondary lg:w-12 w-9 h-full lg:px-3 py-5 px-1.5 z-50 flex flex-col gap-8 items-center border-r border-border/20">
                    <FaBars
                        className="text-foreground lg:text-xl text-lg cursor-pointer hover:text-primary transition-colors"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    />
                </div>

                <div className={`bg-linear-to-b from-background via-background to-secondary p-4 flex flex-col justify-between h-screen transition-all duration-300 border-r border-border/10 relative overflow-hidden ${isSidebarOpen
                        ? 'translate-x-0 pointer-events-auto w-64 overflow-y-auto opacity-100'
                        : '-translate-x-full pointer-events-none w-0 overflow-hidden opacity-0'
                    }`}>

                    {/* Gradient Background Effects */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-1/4 -left-8 w-32 h-32 bg-primary rounded-full blur-2xl"></div>
                        <div className="absolute bottom-1/4 -right-8 w-24 h-24 bg-primary rounded-full blur-xl"></div>
                        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-primary rounded-full blur-lg"></div>
                    </div>

                    {/* Sidebar Content */}
                    <div className="w-full text-center flex flex-col h-full relative z-10">
                        {/* Logo Section */}
                        <div className="w-full flex py-6 px-5 justify-center">
                            <div className="transform hover:scale-105 transition-transform duration-300">
                                <Logo size='medium' />
                            </div>
                        </div>

                        {/* Navigation Items */}
                        <ul className="w-full pt-4 flex flex-col grow gap-2">
                            {sidebarItems.map((item) => (
                                <React.Fragment key={item.href}>
                                    <SidebarNavItem
                                        {...item}
                                        onClick={handleOverlayClick}
                                        isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
                                    />
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;