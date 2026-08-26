"use client";

import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  isSidebarItemActive,
  isSidebarLinkDisabled,
  renderSidebarIcon,
} from "@/components/constants/sidebar-data";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary({ items = [], ...props }) {
  const { pathname } = useLocation();

  if (!items.length) {
    return null;
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
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
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
