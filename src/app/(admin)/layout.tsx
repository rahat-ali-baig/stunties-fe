'use client';
import { useState, useEffect, useRef, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/core/Sidebar";
import Navbar from "@/components/core/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: string;
}

const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <div className="w-full min-h-screen flex justify-end bg-background relative">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} userRole={userRole} />

      <div className={`${!isSidebarOpen ? 'w-[calc(100%-64px)]' : 'w-[calc(100%-256px)]'} transition-all duration-300 h-screen overflow-hidden top-0 right-0 flex flex-col`}>
        <Navbar />
        
        <div className="w-full pb-5 grow">
          <div 
            ref={contentRef}
            className="w-full h-full p-2"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;