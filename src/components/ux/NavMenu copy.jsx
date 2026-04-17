import React, { useContext } from 'react';
// import { NavMenus } from '@/model/NavMenu';
import { NavLink } from 'react-router-dom';
import { DcryptText, getStorageData, removeItemFromStorage } from '@/lib/Storage';
import StorageContext from '@/context/storage/StorageContext';
import uuid4 from 'uuid4';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
const NavMenuComponent = ({NavMenus,isFixedOnTop}) => {
  const {setAuthenticatedKey} = useContext(StorageContext); 
  return (
    <div className={`${isFixedOnTop ? 'z-40' : ''} min-h-10 min-w-full 
     border-b border-b-muted
     bg-background ${isFixedOnTop ? 'fixed top-[64px] hidden md:block ' : ''}`}>
           <div className={`${isFixedOnTop ? 'px-5' : 'border'} min-h-10  flex items-center justify-start`}>
                {
                     NavMenus.map((el) =>{
                        if(el.submenu.length == 0){
                            if(el.access_by.length == 0){
                                return <NavLink 
                                key={uuid4()}
                                onClick={() => {
                                    if(el.id === 5){
                                        setAuthenticatedKey(null);
                                        removeItemFromStorage(import.meta.env.VITE_AU_TK);
                                        removeItemFromStorage(import.meta.env.VITE_USER_ID);
                                        removeItemFromStorage(import.meta.env.VITE_ROLE_ID);
                                    }
                                }} 
                                to={el["router-link"]}
                                className={({isActive}) => `
                                group inline-flex min-h-10 w-max items-center justify-center bg-background 
                                px-4 py-1 text-[12px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                ${isActive && el.submenu.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                text-foreground
                                hover:rounded-none
                                focus:bg-accent focus:text-accent-foreground 
                                focus:outline-none disabled:pointer-events-none 
                                disabled:opacity-50  space-x-2
                                ${isActive && el.submenu.length ==0 ? "border-b-2 border-b-primary hover:rounded-none rounded-none text-primary " : "border-b-0"}
                                `}
                                target={el.target}
                                >
                                    {el.icon}
                                <span >{el.menu}</span> 
                                </NavLink> 
                            }
                            else{
                                
                                if(el.access_by.filter(item => item == Number(DcryptText(getStorageData(import.meta.env.VITE_ROLE_ID)))).length > 0){
                                return <NavLink 
                                key={uuid4()}
                                onClick={() => {
                                    if(el.id === 5){
                                        setAuthenticatedKey(null);
                                        removeItemFromStorage(import.meta.env.VITE_AU_TK);
                                        removeItemFromStorage(import.meta.env.VITE_USER_ID);
                                        removeItemFromStorage(import.meta.env.VITE_ROLE_ID);
                                    }
                                }} 
                                to={el["router-link"]}
                                className={({isActive}) => `
                                group inline-flex min-h-10 w-max items-center justify-center bg-background 
                                px-4 py-1 text-[12px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                ${isActive && el.submenu.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                               text-foreground
                                hover:rounded-none
                                focus:bg-accent focus:text-accent-foreground 
                                focus:outline-none disabled:pointer-events-none 
                                disabled:opacity-50  space-x-2
                                ${isActive && el.submenu.length ==0 ? "border-b-2 border-b-primary hover:rounded-none rounded-none text-primary " : "border-b-0"}
                                `}
                                target={el.target}
                                >
                                    {el.icon}
                                <span >{el.menu}</span> 
                                </NavLink>}
                            }
                        }
                        else{
                            if(el.access_by.length == 0){
                                    
                                return   <DropdownMenu key={uuid4()}>
                                <DropdownMenuTrigger asChild>
                                  <NavLink to={'#'}
                                  className={({isActive}) => `
                                  group inline-flex min-h-10 w-max items-center justify-center bg-background 
                                  px-4 py-1 text-[12px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                  ${isActive && el.submenu.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                 text-foreground
                                  hover:rounded-none
                                  focus:bg-accent focus:text-accent-foreground 
                                  focus:outline-none disabled:pointer-events-none 
                                  disabled:opacity-50  space-x-2
                                  ${isActive && el.submenu.length ==0 ? " " : "border-b-0"}
                                  `
                                  }
                                  >
                                  {el.icon}
                                  <span className="text-[12px] font-PoppinsMedium">{el.menu}</span> 
                                  </NavLink>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent >
                                    {
                                            el.submenu.map(ele =>{
                                                if(ele.submenu.length == 0){
                                                    if((ele.access_by.length == 0 || ele.access_by.filter(item => item == Number(DcryptText(getStorageData(import.meta.env.VITE_ROLE_ID)))).length > 0)){
                                                        return <DropdownMenuItem className="py-0 px-0" key={uuid4()}>
                                                        <NavLink 
                                                            to={ele["router-link"]}
                                                            className={({isActive}) => `
                                                            group inline-flex w-full items-center justify-start bg-background 
                                                            px-2 py-1 text-[12px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                                            ${isActive && ele.submenu.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                                           text-foreground
                                                            hover:rounded-none
                                                            focus:bg-accent focus:text-accent-foreground 
                                                            focus:outline-none disabled:pointer-events-none 
                                                            disabled:opacity-50  space-x-2
                                                            ${isActive && ele.submenu.length ==0 ? "border-l-2 bg-background border-l-primary hover:rounded-none rounded-none text-primary " : "border-b-0"}
                                                            `
                                                            }
                                                            target={ele.target}
                                                            >
                                                                {ele.icon}
                                                            <span >{ele.menu}</span> 
                                                            </NavLink> 
                                                    </DropdownMenuItem>
                                                    }
                                                    return null        
                                                }
                                                else{
                                                    if((ele.access_by.length == 0 || ele.access_by.filter(item => item == Number(DcryptText(getStorageData(import.meta.env.VITE_ROLE_ID)))).length > 0)){
                                                    return <DropdownMenuSub key={uuid4()}>
                                                    <DropdownMenuSubTrigger className="rounded-none">
                                                      {/* <UserPlus className="mr-2 h-4 w-4" /> */}
                                                            {ele.icon}
                                                            <span className="text-[12px] font-PoppinsMedium  mx-2" 
                                                            >{ele.menu}</span> 
                                                    </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            {
                                                                ele.submenu.map(nested_comp =>{
                                                                    return <DropdownMenuItem key={uuid4()} className="p-0">  
                                                                                <NavLink key={uuid4()}
                                                                                    to={nested_comp["router-link"]}
                                                                                    className={({isActive}) => `
                                                                                    group inline-flex w-full items-center justify-start bg-background 
                                                                                    px-2 py-1 text-[12px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                                                                    ${isActive && nested_comp.submenu.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                                                                   text-foreground
                                                                                    hover:rounded-none
                                                                                    focus:bg-accent focus:text-accent-foreground 
                                                                                    focus:outline-none disabled:pointer-events-none 
                                                                                    disabled:opacity-50  space-x-2
                                                                                    ${isActive && nested_comp.submenu.length ==0 ? "border-l-2 bg-background border-l-primary hover:rounded-none  text-primary " : "border-b-0"}
                                                                                    `}
                                                                                    target={nested_comp.target}>
                                                                                        {nested_comp.icon}
                                                                                    <span >{nested_comp.menu}</span> 
                                                                                </NavLink>
                                                                                </DropdownMenuItem>
                                                                })
                                                            }
                                                        </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                    }
                                                }
                                               
                                            })
                                    }
                                   
                                </DropdownMenuContent>
                              </DropdownMenu>
                            }
                            else{
                                if(el.access_by.filter(item => item == Number(DcryptText(getStorageData(import.meta.env.VITE_ROLE_ID)))).length > 0){
                                    return   <DropdownMenu key={uuid4()}>
                                    <DropdownMenuTrigger asChild>
                                      <NavLink to={'#'}
                                      className={({isActive}) => `
                                      group inline-flex min-h-10 w-max items-center justify-center bg-background 
                                      px-4 py-1 text-[12px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                      ${isActive && el.submenu.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                     text-foreground
                                      hover:rounded-none
                                      focus:bg-accent focus:text-accent-foreground 
                                      focus:outline-none disabled:pointer-events-none 
                                      disabled:opacity-50  space-x-2
                                      ${isActive && el.submenu.length ==0 ? " " : "border-b-0"}
                                      `
                                      }
                                      >
                                      {el.icon}
                                      <span className="text-[12px] font-PoppinsMedium">{el.menu}</span> 
                                      </NavLink>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent >
                                        {
                                                el.submenu.map(ele =>{
                                                    if(ele.submenu.length == 0){
                                                        return <DropdownMenuItem className="py-0 px-0" key={uuid4()}>
                                                            <NavLink 
                                                                to={ele["router-link"]}
                                                                className={({isActive}) => `
                                                                group inline-flex w-full items-center justify-start bg-background 
                                                                px-2 py-1 text-[12px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                                                ${isActive && ele.submenu.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                                               text-foreground
                                                                hover:rounded-none
                                                                focus:bg-accent focus:text-accent-foreground 
                                                                focus:outline-none disabled:pointer-events-none 
                                                                disabled:opacity-50  space-x-2
                                                                ${isActive && ele.submenu.length ==0 ? "border-l-2 bg-background border-l-primary hover:rounded-none rounded-none text-primary " : "border-b-0"}
                                                                `
                                                                }
                                                                target={ele.target}
                                                                >
                                                                    {ele.icon}
                                                                <span >{ele.menu}</span> 
                                                                </NavLink> 
                                                        </DropdownMenuItem>
                                                    }
                                                    else{
                                                        return <DropdownMenuSub key={uuid4()}>
                                                        <DropdownMenuSubTrigger className="rounded-none">
                                                                {ele.icon}
                                                                <span className="text-[12px] font-PoppinsMedium  mx-2" 
                                                                >{ele.menu}</span> 
                                                        </DropdownMenuSubTrigger>
                                                            <DropdownMenuPortal>
                                                            <DropdownMenuSubContent align="end" className="bg-background overflow-auto max-h-80">
                                                                {
                                                                    ele.submenu.map(nested_comp =>{
                                                                        return <DropdownMenuItem key={uuid4()} className="p-0">  
                                                                                    <NavLink key={uuid4()}
                                                                                        to={nested_comp["router-link"]}
                                                                                        className={({isActive}) => `
                                                                                        group inline-flex w-full items-center justify-start bg-background 
                                                                                        px-2 py-1 text-[12px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                                                                        ${isActive && nested_comp.submenu.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                                                                       text-foreground
                                                                                        hover:rounded-none
                                                                                        focus:bg-accent focus:text-accent-foreground 
                                                                                        focus:outline-none disabled:pointer-events-none 
                                                                                        disabled:opacity-50  space-x-2
                                                                                        ${isActive && nested_comp.submenu.length ==0 ? "border-l-2 bg-accent border-l-primary hover:rounded-none text-primary " : "border-b-0"}
                                                                                        `}
                                                                                        target={nested_comp.target}>
                                                                                            {nested_comp.icon}
                                                                                        <span >{nested_comp.menu}</span> 
                                                                                    </NavLink>
                                                                                    </DropdownMenuItem>
                                                                    })
                                                                }
                                                            </DropdownMenuSubContent>
                                                            </DropdownMenuPortal>
                                                      </DropdownMenuSub>
                                                    }
                                                   
                                                })
                                        }
                                       
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                }   
                            }
                           
                        }
                     })
                }

            </div> 
    </div>
  )
}

export default NavMenuComponent
