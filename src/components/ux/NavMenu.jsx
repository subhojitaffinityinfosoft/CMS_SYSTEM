import React, { useContext } from 'react';
// import { NavMenus } from '@/model/NavMenu';
import { NavLink, useLocation } from 'react-router-dom';
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
import * as Icons from "lucide-react";
import { House } from 'lucide-react';

const NavMenuComponent = ({ NavMenus, isFixedOnTop, isHomeVisible = true }) => {
    console.log(NavMenus);
    const roleId = DcryptText(getStorageData(import.meta.env.VITE_ROLE_ID))
    const { setAuthenticatedKey } = useContext(StorageContext);
    const location = useLocation();
    const getIcon = (iconName, isActive = true) => {
        const LucideIcon = Icons[iconName];
        const colorClass = isActive ? "text-primary" : "text-foreground";

        return LucideIcon
            ? <LucideIcon className={`h-4 w-4 ${colorClass}`} />
            : <Icons.Circle className={`h-4 w-4 ${colorClass}`} />;
    };
    return (
        <div className={`${isFixedOnTop ? 'z-40' : ''} min-h-10 min-w-full 
     border-b border-b-muted
     bg-background ${isFixedOnTop ? 'fixed top-[64px] hidden md:block ' : ''}`}>
            <div className={`${isFixedOnTop ? 'px-5' : 'border'} min-h-10  flex items-center justify-start`}>

                {isHomeVisible && <NavLink
                    to={roleId == 10 ? '/outlet/dashboard' : '/outlet/admin-dashboard'}
                    className={({ isActive }) => `
                    group inline-flex min-h-10 w-max items-center justify-center bg-background 
                    px-4 py-1 text-[14px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                    ${isActive ? 'hover:text-primary' : 'hover:text-foreground'}
                    text-foreground
                    hover:rounded-none
                    focus:bg-accent focus:text-accent-foreground 
                    focus:outline-none disabled:pointer-events-none 
                    disabled:opacity-50  space-x-2
                    ${isActive ? "border-b-2 border-b-primary hover:rounded-none rounded-none text-primary " : "border-b-0"}
                    `}
                // target={el.route}
                ><House className="h-4 w-4 text-primary" />
                    <span >Home</span>
                </NavLink>}
                {
                    NavMenus.sort((a, b) => a.displayPosition - b.displayPosition).map((el) => {
                        if (el.children.length == 0) {
                            return <NavLink
                                key={uuid4()}
                                onClick={() => {
                                    if (el.menuName?.toLowerCase()?.includes('logout')) {
                                        setAuthenticatedKey(null);
                                        removeItemFromStorage(import.meta.env.VITE_AU_TK);
                                        removeItemFromStorage(import.meta.env.VITE_USER_ID);
                                        removeItemFromStorage(import.meta.env.VITE_ROLE_ID);
                                    }
                                }}
                                to={el?.route}
                                className={({ isActive }) => `
                                group inline-flex min-h-10 w-max items-center justify-center bg-background 
                                px-4 py-1 text-[14px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                ${isActive && el.children.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                text-foreground
                                hover:rounded-none
                                focus:bg-accent focus:text-accent-foreground 
                                focus:outline-none disabled:pointer-events-none 
                                disabled:opacity-50  space-x-2
                                ${isActive && el.children.length == 0 ? "border-b-2 border-b-primary hover:rounded-none rounded-none text-primary " : "border-b-0"}
                                `}
                            // target={el.route}
                            >
                                {/* {el.icon} */}
                                <div className="flex items-center gap-2">
                                    {getIcon(el.icon)}
                                    <span>{el.menuName}</span>
                                </div>                                </NavLink>
                            // if(el.access_by.length == 0){
                            //     return <NavLink 
                            //     key={uuid4()}
                            //     onClick={() => {
                            //         if(el.id === 5){
                            //             setAuthenticatedKey(null);
                            //             removeItemFromStorage(import.meta.env.VITE_AU_TK);
                            //             removeItemFromStorage(import.meta.env.VITE_USER_ID);
                            //             removeItemFromStorage(import.meta.env.VITE_ROLE_ID);
                            //         }
                            //     }} 
                            //     to={el["router-link"]}
                            //     className={({isActive}) => `
                            //     group inline-flex min-h-10 w-max items-center justify-center bg-background 
                            //     px-4 py-1 text-[12px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                            //     ${isActive && el.submenu.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                            //     text-foreground
                            //     hover:rounded-none
                            //     focus:bg-accent focus:text-accent-foreground 
                            //     focus:outline-none disabled:pointer-events-none 
                            //     disabled:opacity-50  space-x-2
                            //     ${isActive && el.submenu.length ==0 ? "border-b-2 border-b-primary hover:rounded-none rounded-none text-primary " : "border-b-0"}
                            //     `}
                            //     target={el.target}
                            //     >
                            //         {el.icon}
                            //     <span >{el.menu}</span> 
                            //     </NavLink> 
                            // }
                            // else{

                            //     if(el.access_by.filter(item => item == Number(DcryptText(getStorageData(import.meta.env.VITE_ROLE_ID)))).length > 0){
                            //     return <NavLink 
                            //     key={uuid4()}
                            //     onClick={() => {
                            //         if(el.id === 5){
                            //             setAuthenticatedKey(null);
                            //             removeItemFromStorage(import.meta.env.VITE_AU_TK);
                            //             removeItemFromStorage(import.meta.env.VITE_USER_ID);
                            //             removeItemFromStorage(import.meta.env.VITE_ROLE_ID);
                            //         }
                            //     }} 
                            //     to={el["router-link"]}
                            //     className={({isActive}) => `
                            //     group inline-flex min-h-10 w-max items-center justify-center bg-background 
                            //     px-4 py-1 text-[12px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                            //     ${isActive && el.submenu.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                            //    text-foreground
                            //     hover:rounded-none
                            //     focus:bg-accent focus:text-accent-foreground 
                            //     focus:outline-none disabled:pointer-events-none 
                            //     disabled:opacity-50  space-x-2
                            //     ${isActive && el.submenu.length ==0 ? "border-b-2 border-b-primary hover:rounded-none rounded-none text-primary " : "border-b-0"}
                            //     `}
                            //     target={el.target}
                            //     >
                            //         {el.icon}
                            //     <span >{el.menu}</span> 
                            //     </NavLink>}
                            // }
                        }
                        else {

                            return <DropdownMenu key={uuid4()}>
                                <DropdownMenuTrigger asChild>
                                    <NavLink to={'#'}
                                        className={({ isActive }) => `
                                  group inline-flex min-h-10 w-max items-center justify-center bg-background 
                                  px-4 py-1 text-[14px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                  ${isActive && el.children.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                 text-foreground
                                  hover:rounded-none
                                  focus:bg-accent focus:text-accent-foreground 
                                  focus:outline-none disabled:pointer-events-none 
                                  disabled:opacity-50  space-x-2
                                  ${isActive && el.children.length == 0 ? " " : "border-b-0"}
                                  `}
                                    >

                                        {getIcon(el.icon)}
                                        <span className="text-[14px] font-PoppinsMedium">{el.menuName}</span>
                                    </NavLink>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent >
                                    {
                                        el.children.sort((a, b) => a.displayPosition - b.displayPosition).map(ele => {
                                            if (ele.children.length == 0) {
                                                return <DropdownMenuItem className="py-0 px-0" key={uuid4()}>
                                                    <NavLink
                                                        to={ele["route"]}
                                                        className={({ isActive }) => `
                                                            group inline-flex w-full items-center justify-start bg-background 
                                                            px-2 py-1 text-[14px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                                            ${isActive && ele.children.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                                           text-foreground
                                                            hover:rounded-none
                                                            focus:bg-accent focus:text-accent-foreground 
                                                            focus:outline-none disabled:pointer-events-none 
                                                            disabled:opacity-50  space-x-2
                                                            ${isActive && ele.children.length == 0 ? "border-l-2 bg-background border-l-primary hover:rounded-none rounded-none text-primary " : "border-b-0"}
                                                            `
                                                        }
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {getIcon(ele.icon)}
                                                            <span>{ele.menuName}</span>
                                                        </div>
                                                    </NavLink>
                                                </DropdownMenuItem>
                                            }
                                            else {
                                                return <DropdownMenuSub key={uuid4()}>
                                                    <DropdownMenuSubTrigger className="rounded-none">
                                                        {getIcon(ele.icon)}
                                                        <span className="text-[14px] font-PoppinsMedium  mx-2"
                                                        >{ele.menuName}</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent align="end" className="bg-background overflow-auto max-h-80">
                                                            {
                                                                ele.children.sort((a, b) => a.displayPosition - b.displayPosition).map(nested_comp => {
                                                                    return <DropdownMenuItem key={uuid4()} className="p-0">
                                                                        <NavLink key={uuid4()}
                                                                            to={nested_comp["route"]}
                                                                            className={({ isActive }) => `
                                                                                    group inline-flex w-full items-center justify-start bg-background 
                                                                                    px-2 py-1 text-[14px] font-PoppinsMedium font-medium transition-colors hover:bg-accent
                                                                                    ${isActive && nested_comp.children.length == 0 ? 'hover:text-primary' : 'hover:text-foreground'}
                                                                                   text-foreground
                                                                                    hover:rounded-none
                                                                                    focus:bg-accent focus:text-accent-foreground 
                                                                                    focus:outline-none disabled:pointer-events-none 
                                                                                    disabled:opacity-50  space-x-2
                                                                                    ${isActive && nested_comp.children.length == 0 ? "border-l-2 bg-background border-l-primary hover:rounded-none  text-primary " : "border-b-0"}
                                                                                    `}
                                                                        // target={nested_comp.target}
                                                                        >
                                                                            {/* {nested_comp.icon} */}
                                                                            <div className="flex items-center gap-2">
                                                                                {getIcon(nested_comp.icon)}
                                                                                <span>{nested_comp.menuName}</span>
                                                                            </div>
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
                    })
                }

            </div>
        </div>
    )
}

export default NavMenuComponent
