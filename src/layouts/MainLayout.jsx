import NavUx from '@/components/ux/Nav';
import NavMenuComponent from '@/components/ux/NavMenu';
import React, { useContext, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import StorageContext from '@/context/storage/StorageContext';
import { useTheme } from '@/components/theme-provider';
import { useAppMenu } from '@/context/applicationMenu/ApplicationMenuContextProvider';
import ApplicationMenuContext from '@/context/applicationMenu/ApplicationMenuContext';
const MainLayoutScreen = () => {
  const {has_authenticated_key} = useContext(StorageContext);
  const {appMenus} = useAppMenu(ApplicationMenuContext);
  let location = useLocation();
  const {theme} = useTheme();
  return (
    <>
      {
        has_authenticated_key ?
          <div className={` min-w-screen ${theme == 'dark' ? 'bg-background ' : 'bg-destructive-foreground/5 '}`}>
            <NavUx />
            <NavMenuComponent NavMenus={appMenus} isFixedOnTop={true}/>
            <div className={`md:mx-5 mx-2 md:min-h-[calc(100vh_-_104px)] min-h-[calc(100vh_-_64px)] relative
             ${theme == 'dark' ? 'bg-background' : 'bg-destructive-foreground/5'} md:mt-[104px] mt-[64px] md:py-5 py-2 min-w-screen`}>
              <Outlet />
            </div>

          </div>
          :
          <Navigate to={'/'} state={{ from: location }} replace />

      }

    </>

  )
}

export default MainLayoutScreen;