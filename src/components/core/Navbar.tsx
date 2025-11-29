'use client';
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  FaPlay, 
  FaBell, 
  FaPlus,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import NotificationDropdown from "./NotificationDropdown";

interface NavbarProps {
  userRole?: string;
}

const Navbar = ({ userRole = "admin" }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Dummy data
  const userData = {
    name: "John Doe",
    email: "john.doe@stunties.com",
    role: "Admin",
    avatar_url: ""
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  const handleLogout = () => {
    setDropdownOpen(false);
    // Dummy logout function
    console.log("Logging out...");
    toast({
      variant: "success",
      title: "Logout Successful",
      description: "Logged out successfully.",
    });
    router.push("/");
  };

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(path => path);
    
    if (paths.length === 0) return [{ href: "/", label: "Home" }];

    const breadcrumbs = paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = path.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      return { href, label };
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

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
    <div className="w-full md:px-6 px-4 md:py-4 py-3 flex items-center justify-between relative">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xl">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            <h2
              className={`cursor-pointer font-helvetica! uppercase font-light! tracking-widest transition-colors ${
                index === breadcrumbs.length - 1 
                  ? "text-foreground" 
                  : "text-foreground/70 hover:text-foreground"
              }`}
              onClick={() => index < breadcrumbs.length - 1 && router.push(crumb.href)}
            >
              {crumb.label}
            </h2>
          </div>
        ))}
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-end gap-3 relative">
        {/* Notification Bell */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative w-9 h-9 rounded-lg bg-secondary hover:bg-secondary/80 border border-border/10"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <FaBell className="w-4 h-4 text-foreground" />
            <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs bg-primary text-secondary rounded-full">
              3
            </div>
          </Button>
          
          {/* Notification Dropdown */}
          <NotificationDropdown 
            isOpen={notificationOpen} 
            onClose={() => setNotificationOpen(false)} 
          />
        </div>

        {/* User cart */}
        {userRole === "user" && (
          <>
            <Button
              variant="default"
              className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90"
              onClick={() => {/* Add tutorial modal */}}
            >
              <FaPlay className="text-background text-xs" />
              View Tutorial
            </Button>

            <div className="relative cursor-pointer" onClick={() => {/* Add cart modal */}}>
              <div className="p-2 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-colors">
                <FaShoppingCart className="w-4 h-4 text-foreground" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center text-xs bg-primary/20 text-primary rounded-full border border-primary/30">
                {cartCount}
              </div>
            </div>
          </>
        )}

        {/* Add New Button */}
        {(userRole === "admin" || userRole === "moderator") && (
          <Button
            variant="default"
            className="flex items-center gap-2 text-secondary font-coolvetica bg-primary hover:bg-primary/90"
            onClick={() => {
              toast({
                variant: "default",
                title: "Add New",
                description: "Add new functionality would open here.",
              });
            }}
          >
            <FaPlus className="text-background text-sm" />
            Add New
          </Button>
        )}

        {/* User Profile Dropdown */}
        <div className="relative w-fit" ref={dropdownRef}>
          {userData.avatar_url ? (
            <img
              src={userData.avatar_url}
              alt="avatar"
              className="w-8 h-8 object-cover rounded-full cursor-pointer bg-secondary border border-border hover:border-primary/50 transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          ) : (
            <div
              className="w-8 h-8 bg-primary text-secondary rounded-full flex items-center justify-center font-semibold text-sm cursor-pointer hover:bg-primary/90 transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {userData.name ? userData.name.charAt(0).toUpperCase() : userData.email ? userData.email.charAt(0).toUpperCase() : 'U'}
            </div>
          )}

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-56 bg-background backdrop-blur-lg shadow-lg rounded-xl border border-border/5 p-3 z-50 transition-all duration-200 ${
              dropdownOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            style={{ top: "calc(100% + 0.5rem)" }}
          >
            <div className="mb-2 px-2">
              <p className="font-medium text-sm text-foreground capitalize">
                {userData.role === "Admin" ? "Admin" : userData.name || "Guest"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {userData.email || "No email found"}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-sm py-2 border-t border-border/5">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/admin/settings");
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <FaUser className="w-4 h-4 text-gray-400" />
                Profile
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setLogoutOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-left"
              >
                <FaSignOutAlt className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {logoutOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-background/95 backdrop-blur-lg rounded-xl p-6 max-w-sm w-full mx-4 border border-border/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Logout Confirmation
            </h3>
            <p className="text-gray-400 mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setLogoutOpen(false)}
                className="border-border hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
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