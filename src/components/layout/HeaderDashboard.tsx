"use client"

import { usePathname } from 'next/navigation'
import React from 'react'

const extractHeaderTitle = (currentPath: string) => {
    if(currentPath === "home") return "Home"
    if(currentPath === "profile") return "Profile"
}

const HeaderDashboard = () => {
    const pathname = usePathname();
    const currentPath = pathname?.split("/")[3];
    return (
      <div className="p-5 h-16 border-b flex items-center justify-between">
        <div className="text-xl font-bold mrt text-blue-900">
          {extractHeaderTitle(currentPath as string)}
        </div>
      </div>
    );
};

export default HeaderDashboard;