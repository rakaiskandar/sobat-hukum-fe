import AuthLoading from '@/components/auth/AuthLoading'
import HeaderDashboard from '@/components/layout/HeaderDashboard'
import SidebarDashboard from '@/components/layout/SidebarDashboard'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <AuthLoading>
      <div className="min-h-screen w-full flex bg-slate-50">
          <SidebarDashboard />
          <main className="flex-1">
            <HeaderDashboard />
            <div className="p-5">
              {children}
            </div>
          </main>
      </div>
    </AuthLoading>
  )
}

export default Layout