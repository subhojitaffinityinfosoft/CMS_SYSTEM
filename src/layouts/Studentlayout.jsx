import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNav from '@/components/ux/studentNav'
import { menuData } from '@/components/constants/dummy_data'
import { useTheme } from '@/components/theme-provider'
import SudentNavUx from '@/components/ux/StudentNavUx'
const Layout = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className={`w-full ${isDark ? 'bg-background' : 'bg-destructive-foreground/5'}`}>
      <SudentNavUx />
      <StudentNav NavMenus={menuData} />
      <div
        className={`md:mx-5 mx-2 relative
        ${isDark ? 'bg-background' : 'bg-destructive-foreground/5'}
        md:mt-[104px] mt-[64px]
        md:py-5 py-2
        min-h-[calc(100vh-104px)] md:min-h-[calc(100vh-104px)]`}
      >
        <Outlet />
      </div>

    </div>
  )
}

export default Layout