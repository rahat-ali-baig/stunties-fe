'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import NotificationDropdown from "./NotificationDropdown";
import { FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { pageConfigs } from "@/constants";
import PrimaryButton from "../addons/PrimaryButton";
import { Plus } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const userData = {
    name: "Shehroz Ahmad",
    email: "shehrozahmad872@gmail.com",
    role: "Admin",
    avatar_url: ""
  };

  const currentPage = pageConfigs[pathname] || {
    title: 'Dashboard',
    description: 'All your tools, insights, and progress in one place'
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    console.log("Logging out...");
    toast({
      variant: "success",
      title: "Logout Successful",
      description: "Logged out successfully.",
    });
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-background border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Dynamic Title */}
        <div className="px-1">
          <h1 className="text-2xl font-semibold text-foreground">{currentPage.title}</h1>
          <p className="text-foreground/60 text-sm mt-1">{currentPage.description}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              className="relative w-9 h-9 cursor-pointer rounded-full bg-linear-to-br from-primary-dark/30 to-primary/15 hover:from-primary-dark/50 hover:to-primary/30 flex items-center justify-center transition-colors"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <FaBell className="w-4 h-4 text-gray-600" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>

            {/* Notification Dropdown */}
            <NotificationDropdown
              isOpen={notificationOpen}
              onClose={() => setNotificationOpen(false)}
            />
          </div>

          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-start cursor-pointer gap-3"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-8 h-8 bg-linear-to-br from-primary-dark/30 to-primary/15 rounded-full flex items-center justify-center">
                <span className="font-semibold text-foreground text-base">S</span>
              </div>

              <div className="text-left">
                <p className="text-xs font-medium text-foreground">{userData.name}</p>
                <p className="text-[10px] text-foreground/60">{userData.role}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ${dropdownOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              style={{ top: "calc(100% + 0.5rem)" }}
            >
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="font-medium text-sm text-foreground">{userData.name}</p>
                <p className="text-xs text-gray-500 truncate">{userData.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/admin/settings");
                  }}
                  className="flex items-center cursor-pointer gap-3 w-full px-3 py-2 hover:bg-primary-dark/10 transition-colors text-left"
                >
                  <FaUser className="w-3 h-3 text-foreground/60" />
                  <span className="text-foreground text-sm">Settings</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setLogoutOpen(true);
                  }}
                  className="flex items-center cursor-pointer gap-3 w-full px-3 py-2 hover:bg-primary-dark/10 transition-colors text-left"
                >
                  <FaSignOutAlt className="w-3 h-3 text-foreground/60" />
                  <span className="text-foreground text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {logoutOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Logout Confirmation
            </h3>
            <p className="text-gray-500 mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setLogoutOpen(false)}
                className="border-gray-300 hover:bg-gray-100 text-foreground"
              >
                Cancel
              </Button>
              <PrimaryButton
                variant="primary"
                icon={Plus}
                onClick={handleLogout}
                className="whitespace-nowrap"
              >
                Confirm
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;