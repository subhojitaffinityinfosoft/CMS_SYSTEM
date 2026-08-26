"use client";

import {
  FolderIcon,
  MoreHorizontalIcon,
  ShareIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  isSidebarItemActive,
  isSidebarLinkDisabled,
  renderSidebarIcon,
} from "@/components/constants/sidebar-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavDocuments({ items = [] }) {
  const { isMobile } = useSidebar();
  const { pathname } = useLocation();

  if (!items.length) {
    return null;
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = isSidebarItemActive(pathname, item);
          const isDisabled = isSidebarLinkDisabled(item);

          return (
            <SidebarMenuItem key={item.id ?? item.title}>
              {isDisabled ? (
                <SidebarMenuButton
                  isActive={isActive}
                  type="button"
                  disabled
                  className="opacity-70"
                >
                  {renderSidebarIcon(item.icon)}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton asChild isActive={isActive}>
                  <NavLink to={item.url}>
                    {renderSidebarIcon(item.icon)}
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              )}

              {!isDisabled ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover className="rounded-sm data-[state=open]:bg-accent">
                      <MoreHorizontalIcon />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-24 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem>
                      <FolderIcon />
                      <span>Open</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShareIcon />
                      <span>Share</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
