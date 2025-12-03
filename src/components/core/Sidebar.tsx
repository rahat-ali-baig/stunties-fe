'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaChevronLeft,
    FaChevronRight,
    FaChartPie,
    FaUsers,
    FaShieldAlt,
    FaBoxOpen,
    FaMoneyBillWave,
    FaStore,
    FaUser,
    FaBell,
    FaArrowLeft,
} from "react-icons/fa";
import { logo } from "../../../public";
import Image from "next/image";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { TbCategory2 } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";

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
        icon: <FaChartPie className="w-4 h-4" />,
        active_icon: <FaChartPie className="w-4 h-4 text-foreground" />,
        label: "Dashboard",
    },
    {
        href: "/admin/users",
        icon: <FaUsers className="w-4 h-4" />,
        active_icon: <FaUsers className="w-4 h-4 text-foreground" />,
        label: "User Management",
    },
    {
        href: "/admin/user-verifications",
        icon: <FaShieldAlt className="w-4 h-4" />,
        active_icon: <FaShieldAlt className="w-4 h-4 text-foreground" />,
        label: "User Verification",
    },
    {
        href: "/admin/marketplace",
        icon: <MdOutlineWorkOutline className="w-4 h-4" />,
        active_icon: <MdOutlineWorkOutline className="w-4 h-4 text-foreground" />,
        label: "Jobs & Marketplace",
    },
    {
        href: "/admin/orders",
        icon: <FaBoxOpen className="w-4 h-4" />,
        active_icon: <FaBoxOpen className="w-4 h-4 text-foreground" />,
        label: "Orders & Delivery",
    },
    {
        href: "/admin/wallet",
        icon: <FaMoneyBillWave className="w-4 h-4" />,
        active_icon: <FaMoneyBillWave className="w-4 h-4 text-foreground" />,
        label: "Wallet",
    },
    {
        href: "/admin/subscription",
        icon: <FaStore className="w-4 h-4" />,
        active_icon: <FaStore className="w-4 h-4 text-foreground" />,
        label: "Subscription",
    },
    {
        href: "/admin/shop/products",
        icon: <FaUser className="w-4 h-4" />,
        active_icon: <FaUser className="w-4 h-4 text-foreground" />,
        label: "Shop",
    },
    {
        href: "/admin/notifications",
        icon: <FaBell className="w-4 h-4" />,
        active_icon: <FaBell className="w-4 h-4 text-foreground" />,
        label: "Notifications",
    },
];

const shopModuleItems: NavItem[] = [
    {
        href: "/admin/shop/products",
        icon: <FiShoppingBag className="w-4 h-4" />,
        active_icon: <FiShoppingBag className="w-4 h-4 text-foreground" />,
        label: "Products",
    },
    {
        href: "/admin/shop/categories",
        icon: <TbCategory2 className="w-4 h-4" />,
        active_icon: <TbCategory2 className="w-4 h-4 text-foreground" />,
        label: "Categories",
    },
    {
        href: "/admin/shop/orders",
        icon: <FiShoppingCart className="w-4 h-4" />,
        active_icon: <FiShoppingCart className="w-4 h-4 text-foreground" />,
        label: "Orders",
    },
    {
        href: "/admin/shop/customers",
        icon: <HiOutlineUsers className="w-4 h-4" />,
        active_icon: <HiOutlineUsers className="w-4 h-4 text-foreground" />,
        label: "Customers",
    },
];

const SidebarNavItem = ({
    href,
    icon,
    active_icon,
    label,
    isActive,
    onClick,
    isSidebarOpen
}: NavItem & {
    isActive: boolean;
    onClick: () => void;
    isSidebarOpen: boolean;
}) => (
    <li className="w-full">
        <Link href={href} onClick={onClick}>
            <div
                className={`flex items-center gap-3 rounded-lg text-sm transition-all duration-200 ${isSidebarOpen ? "px-4 py-2.5" : "p-3 justify-center"
                    } ${isActive
                        ? "bg-primary text-foreground font-semibold"
                        : "font-normal text-foreground/70 hover:text-foreground hover:bg-primary-dark/10"
                    }`}
                title={!isSidebarOpen ? label : ""}
            >
                <span className="min-w-4 flex items-center justify-center">
                    {isActive ? active_icon : icon}
                </span>
                {isSidebarOpen && (
                    <span className={`transition-all duration-200 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 w-0'}`}>
                        {label}
                    </span>
                )}
            </div>
        </Link>
    </li>
);

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, userRole }: SidebarProps) => {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);
    const isShopModule = pathname.startsWith('/admin/shop');

    const handleOverlayClick = () => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
            }
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
                className={`fixed left-0 top-0 transition-all duration-300 h-screen w-full bg-black/40 backdrop-blur-sm z-40 lg:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* Main sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen flex transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'
                    } z-50`}
            >
                {/* Sidebar Content */}
                <div className={`bg-background h-full flex flex-col justify-between border-r border-gray-200 relative overflow-hidden w-full ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } transition-all duration-300`}>

                    {/* Header with toggle */}
                    <div className="p-4">
                        <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                            {isSidebarOpen ? (
                                <>
                                    <div className="flex items-center">
                                        <div className="relative w-10 h-10 brightness-75">
                                            <Image
                                                src={logo}
                                                alt="logo"
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>
                                        <span className="font-bold text-xl xl:text-xl text-foreground -ml-1 transition-all duration-200">tunties</span>
                                    </div>
                                    <button
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                    >
                                        <FaChevronLeft className="w-3 h-3 text-foreground" />
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <div className="relative w-10 h-10">
                                        <Image
                                            src={logo}
                                            alt="logo"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                    <button
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                    >
                                        <FaChevronRight className="w-3 h-3 text-foreground" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 overflow-y-auto py-4 px-3">
                        {isShopModule ? (
                            <>
                                {/* Back to Dashboard Button */}
                                <Link href="/admin" onClick={handleOverlayClick}>
                                    <div
                                        className={`flex items-center gap-3 rounded-lg text-sm transition-all duration-200 mb-4 ${isSidebarOpen ? "px-4 py-2.5" : "p-3 justify-center"
                                            } font-normal text-foreground/70 hover:text-foreground hover:bg-gray-100`}
                                        title={!isSidebarOpen ? "Back to Dashboard" : ""}
                                    >
                                        <span className="min-w-4 flex items-center justify-center">
                                            <FaArrowLeft className="w-4 h-4" />
                                        </span>
                                        {isSidebarOpen && (
                                            <span className="transition-all duration-200">
                                                Back to Dashboard
                                            </span>
                                        )}
                                    </div>
                                </Link>

                                {/* Shop Module Header */}
                                {isSidebarOpen && (
                                    <div className="px-4 mb-3">
                                        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                                            Shop Module
                                        </p>
                                    </div>
                                )}

                                {/* Shop Module Items */}
                                <ul className="space-y-1">
                                    {shopModuleItems.map((item) => (
                                        <React.Fragment key={item.href}>
                                            <SidebarNavItem
                                                {...item}
                                                onClick={handleOverlayClick}
                                                isActive={pathname === item.href}
                                                isSidebarOpen={isSidebarOpen}
                                            />
                                        </React.Fragment>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <ul className="space-y-1">
                                {sidebarItems.map((item) => (
                                    <React.Fragment key={item.href}>
                                        <SidebarNavItem
                                            {...item}
                                            onClick={handleOverlayClick}
                                            isActive={pathname === item.href}
                                            isSidebarOpen={isSidebarOpen}
                                        />
                                    </React.Fragment>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer - User info */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="font-semibold text-foreground text-sm">S</span>
                            </div>
                            {isSidebarOpen && (
                                <div className="transition-all duration-200 overflow-hidden">
                                    <p className="text-sm font-medium text-foreground">Shehroz Ahmad</p>
                                    <p className="text-xs text-gray-500 truncate">shehrozahmad872@gmail.com</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

// 'use client';
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//     FaChevronLeft,
//     FaChevronRight,
//     FaChartPie,
//     FaUsers,
//     FaShieldAlt,
//     FaBoxOpen,
//     FaMoneyBillWave,
//     FaStore,
//     FaUser,
//     FaBell
// } from "react-icons/fa";
// import { logo } from "../../../public";
// import Image from "next/image";
// import { MdOutlineWorkOutline } from "react-icons/md";

// interface SidebarProps {
//     isSidebarOpen: boolean;
//     setIsSidebarOpen: (value: boolean) => void;
//     userRole?: string;
// }

// interface NavItem {
//     href: string;
//     icon: React.ReactNode;
//     active_icon: React.ReactNode;
//     label: string;
// }

// const sidebarItems: NavItem[] = [
//     {
//         href: "/admin",
//         icon: <FaChartPie className="w-4 h-4" />,
//         active_icon: <FaChartPie className="w-4 h-4 text-foreground" />,
//         label: "Dashboard",
//     },
//     {
//         href: "/admin/users",
//         icon: <FaUsers className="w-4 h-4" />,
//         active_icon: <FaUsers className="w-4 h-4 text-foreground" />,
//         label: "User Management",
//     },
//     {
//         href: "/admin/user-verifications",
//         icon: <FaShieldAlt className="w-4 h-4" />,
//         active_icon: <FaShieldAlt className="w-4 h-4 text-foreground" />,
//         label: "User Verification",
//     },
//     {
//         href: "/admin/marketplace",
//         icon: <MdOutlineWorkOutline className="w-4 h-4" />,
//         active_icon: <MdOutlineWorkOutline className="w-4 h-4 text-foreground" />,
//         label: "Jobs & Marketplace",
//     },
//     {
//         href: "/admin/orders",
//         icon: <FaBoxOpen className="w-4 h-4" />,
//         active_icon: <FaBoxOpen className="w-4 h-4 text-foreground" />,
//         label: "Orders & Delivery",
//     },
//     {
//         href: "/admin/wallet",
//         icon: <FaMoneyBillWave className="w-4 h-4" />,
//         active_icon: <FaMoneyBillWave className="w-4 h-4 text-foreground" />,
//         label: "Wallet",
//     },
//     {
//         href: "/admin/subscription",
//         icon: <FaStore className="w-4 h-4" />,
//         active_icon: <FaStore className="w-4 h-4 text-foreground" />,
//         label: "Subscription",
//     },
//     {
//         href: "/admin/shop",
//         icon: <FaUser className="w-4 h-4" />,
//         active_icon: <FaUser className="w-4 h-4 text-primary-dark" />,
//         label: "Shop",
//     },
//     {
//         href: "/admin/notifications",
//         icon: <FaBell className="w-4 h-4" />,
//         active_icon: <FaBell className="w-4 h-4 text-primary-dark" />,
//         label: "Notifications",
//     },
// ];

// const SidebarNavItem = ({
//     href,
//     icon,
//     active_icon,
//     label,
//     isActive,
//     onClick,
//     isSidebarOpen
// }: NavItem & {
//     isActive: boolean;
//     onClick: () => void;
//     isSidebarOpen: boolean;
// }) => (
//     <li className="w-full">
//         <Link href={href} onClick={onClick}>
//             <div
//                 className={`flex items-center gap-3 rounded-lg text-sm transition-all duration-200 ${isSidebarOpen ? "px-4 py-2.5" : "p-3 justify-center"
//                     } ${isActive
//                         ? "bg-primary text-foreground font-semibold"
//                         : "font-normal text-foreground/70 hover:text-foreground hover:bg-primary-dark/10"
//                     }`}
//                 title={!isSidebarOpen ? label : ""}
//             >
//                 <span className="min-w-4 flex items-center justify-center">
//                     {isActive ? active_icon : icon}
//                 </span>
//                 {isSidebarOpen && (
//                     <span className={`transition-all duration-200 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 w-0'}`}>
//                         {label}
//                     </span>
//                 )}
//                 {/* {isActive && isSidebarOpen && (
//                     <div className="ml-auto w-2 h-2 rounded-full bg-primary-dark"></div>
//                 )} */}
//             </div>
//         </Link>
//     </li>
// );

// const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, userRole }: SidebarProps) => {
//     const pathname = usePathname();
//     const [isMobile, setIsMobile] = useState(false);

//     const handleOverlayClick = () => {
//         if (isMobile) {
//             setIsSidebarOpen(false);
//         }
//     };

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 768);
//             if (window.innerWidth <= 768) {
//                 setIsSidebarOpen(false);
//             }
//         };

//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return (
//         <>
//             {/* Overlay */}
//             <div
//                 onClick={() => setIsSidebarOpen(false)}
//                 className={`fixed left-0 top-0 transition-all duration-300 h-screen w-full bg-black/40 backdrop-blur-sm z-40 lg:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//                     }`}
//             />

//             {/* Main sidebar */}
//             <div
//                 className={`fixed top-0 left-0 h-screen flex transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'
//                     } z-50`}
//             >
//                 {/* Sidebar Content */}
//                 <div className={`bg-background h-full flex flex-col justify-between border-r border-gray-200 relative overflow-hidden w-full ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//                     } transition-all duration-300`}>

//                     {/* Header with toggle */}
//                     <div className="p-4">
//                         <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
//                             {isSidebarOpen ? (
//                                 <>
//                                     <div className="flex items-center">
//                                         <div className="relative w-10 h-10 brightness-75">
//                                             <Image
//                                                 src={logo}
//                                                 alt="logo"
//                                                 fill
//                                                 className="object-contain"
//                                                 priority
//                                             />
//                                         </div>
//                                         <span className="font-bold text-xl xl:text-xl text-foreground -ml-1 transition-all duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}">tunties</span>
//                                     </div>
//                                     <button
//                                         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                                         className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
//                                     >
//                                         <FaChevronLeft className="w-3 h-3 text-foreground" />
//                                     </button>
//                                 </>
//                             ) : (
//                                 <div className="flex flex-col items-center gap-2 w-full">
//                                     <div className="relative w-10 h-10">
//                                         <Image
//                                             src={logo}
//                                             alt="logo"
//                                             fill
//                                             className="object-contain"
//                                             priority
//                                         />
//                                     </div>
//                                     <button
//                                         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                                         className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
//                                     >
//                                         <FaChevronRight className="w-3 h-3 text-foreground" />
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Navigation Items */}
//                     <div className="flex-1 overflow-y-auto py-4 px-3">
//                         <ul className="space-y-1">
//                             {sidebarItems.map((item) => (
//                                 <React.Fragment key={item.href}>
//                                     <SidebarNavItem
//                                         {...item}
//                                         onClick={handleOverlayClick}
//                                         isActive={pathname === item.href}
//                                         isSidebarOpen={isSidebarOpen}
//                                     />
//                                 </React.Fragment>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Footer - User info */}
//                     <div className="p-4 border-t border-gray-200">
//                         <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
//                                 <span className="font-semibold text-foreground text-sm">S</span>
//                             </div>
//                             {isSidebarOpen && (
//                                 <div className="transition-all duration-200 overflow-hidden">
//                                     <p className="text-sm font-medium text-foreground">Shehroz Ahmad</p>
//                                     <p className="text-xs text-gray-500 truncate">shehrozahmad872@gmail.com</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Sidebar;