import React from 'react'
import notFoundImage from '../../assets/images/404.svg';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const NotFound = ({title,navigate_to,location}) => {
  return (
    <div className=' space-y-3'>
        <img src={notFoundImage} className='w-72 mx-auto'/>
        <div className='space-y-1'>
            <p className='font-PoppinsMedium text-lg text-center   text-neutral-400'>
            Oops!! Sorry
                </p>
            <p className='font-PoppinsMedium text-xs text-center  text-neutral-400'>
                The {title} that you are looking for, does't exist
                </p>
        </div>
        <div className='flex justify-center'>
                    <NavLink 
                    className='text-center mx-auto'
                     to={!navigate_to ? -1 : navigate_to}
                    >
                        <Button variant="ghost" className="text-xs h-10 rounded-sm space-x-2 text-primary hover:text-primary hover:bg-red-100/50">
                            <ChevronLeft/>
                            <span>Back</span>
                            </Button>                    
                    </NavLink> 
        </div>
        {/* {children} */}
    </div>
  )
}

export default NotFound
