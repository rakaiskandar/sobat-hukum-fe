import AuthLoading from '@/components/auth/AuthLoading'
import HeaderDashboard from '@/components/layout/HeaderDashboard'
import SidebarDashboard from '@/components/layout/SidebarDashboard'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <AuthLoading>
    <div className="min-h-screen w-screen flex">
        <SidebarDashboard />
        <div className="flex-1">
          <HeaderDashboard />
          <div className="px-8 py-4">{children}</div>
        </div>
      </div>
    </AuthLoading>
  )
}

export default Layout