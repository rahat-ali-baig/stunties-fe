'use client';
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import NotificationDropdown from "./NotificationDropdown";
import { 
  FaBell, 
  FaCaretDown,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

interface NavbarProps {
  userRole?: string;
}

// Page configurations with titles and descriptions
const pageConfigs: Record<string, { title: string; description: string }> = {
  '/admin': {
    title: 'Dashboard',
    description: 'All your tools, insights, and progress in one place'
  },
  '/admin/users': {
    title: 'User Management',
    description: 'Manage user accounts and permissions'
  },
  '/admin/user-verifications': {
    title: 'User Verification',
    description: 'Approve or reject user verification requests'
  },
  '/admin/marketplace': {
    title: 'Jobs & Marketplace',
    description: 'Manage gigs and casting calls.'
  },
  '/admin/orders': {
    title: 'Orders & Delivery',
    description: 'Track and manage orders and delivery status'
  },
  '/admin/wallet': {
    title: 'Wallet',
    description: 'Manage payments, payouts, and financial transactions'
  },
  '/admin/subscription': {
    title: 'Subscription',
    description: 'Handle subscription plans and profile boosts'
  },
  '/admin/notifications': {
    title: 'Notifications',
    description: 'Configure and manage system notifications'
  },
  '/admin/profile': {
    title: 'Profile',
    description: 'Manage your account settings and preferences'
  },
  // Shop Module Routes
  '/admin/shop/products': {
    title: 'Products',
    description: 'Manage your shop products, inventory, and pricing'
  },
  '/admin/shop/categories': {
    title: 'Categories',
    description: 'Organize products with categories and subcategories'
  },
  '/admin/shop/orders': {
    title: 'Shop Orders',
    description: 'Track and manage customer orders and fulfillment'
  },
  '/admin/shop/customers': {
    title: 'Customers',
    description: 'View and manage customer information and purchase history'
  }
};

const Navbar = ({ userRole = "admin" }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const userData = {
    name: "Shehroz Ahmad",
    email: "shehrozahmad872@gmail.com",
    role: "Admin",
    avatar_url: ""
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

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
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              className="relative w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <FaBell className="w-5 h-5 text-gray-600" />
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
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="font-semibold text-foreground text-lg">S</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{userData.name}</p>
                <p className="text-xs text-gray-500">{userData.role}</p>
              </div>
              <FaCaretDown className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ${
                dropdownOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              style={{ top: "calc(100% + 0.5rem)" }}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-medium text-foreground">{userData.name}</p>
                <p className="text-sm text-gray-500 truncate">{userData.email}</p>
              </div>

              <div className="py-2">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/admin/profile");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <FaUser className="w-4 h-4 text-gray-600" />
                  <span className="text-foreground">Profile Settings</span>
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setLogoutOpen(true);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <FaSignOutAlt className="w-4 h-4 text-gray-600" />
                  <span className="text-foreground">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
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
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;