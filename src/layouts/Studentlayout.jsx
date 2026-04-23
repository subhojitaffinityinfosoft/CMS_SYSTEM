import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNav from '@/components/ux/studentNav'
import { menuData } from '@/components/constants/dummy_data'
import SudentNavUx from '@/components/ux/StudentNavUx'
const Layout = () => {
  return (
    <div className={`w-full `}>
      <SudentNavUx />
      <StudentNav NavMenus={menuData} />
      <div
        className={`
        min-h-[calc(100vh-104px)] md:min-h-[calc(100vh-104px)]`}
      >
        <Outlet />
      </div>

    </div>
  )
}

export default Layout