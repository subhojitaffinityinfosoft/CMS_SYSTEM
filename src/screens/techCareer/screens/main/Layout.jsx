import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavComponent from '../home/nav/Nav'
import { useWindowScroll } from '@mantine/hooks';

const TechCareerMainLayoutScreen = () => {
  const [scroll, scrollTo] = useWindowScroll();
  useEffect(()=>{
    scrollTo({x:0,y:0})
  },[])
  return (
    <div className='min-h-screen relative bg-gray-100'>
      <div className=' min-w-screen bg-white fixed top-0 left-0 right-0 z-50 shadow-md'>
        <NavComponent/>
      </div>
        <div className='mt-[70px] min-h-[calc(100vh_-_70px)])'>
          <Outlet/>
        </div>
    </div>
  )
}

export default TechCareerMainLayoutScreen
