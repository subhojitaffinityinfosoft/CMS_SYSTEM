"use client";

import { NavLink, useLocation } from "react-router-dom";

import {
  hasSidebarChildren,
  isExternalSidebarUrl,
  isSidebarItemActive,
  isSidebarItemClickable,
  isSidebarLinkDisabled,
} from "@/components/constants/sidebar-data";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

function MenuButtonContent({ item }) {
  const ItemIcon = item.icon;

  return (
    <>
      {ItemIcon && <ItemIcon />}
      <span>{item.title}</span>
    </>
  );
}

function SidebarItemLink({ item, children }) {
  if (isExternalSidebarUrl(item.url)) {
    return (
      <a href={item.url} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return <NavLink to={item.url}>{children}</NavLink>;
}

export function NavMain({ items = [] }) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = isSidebarItemActive(pathname, item);
            const isClickable = isSidebarItemClickable(item);
            const isDisabled = isSidebarLinkDisabled(item);
            const hasChildren = hasSidebarChildren(item);

            return (
              <SidebarMenuItem key={item.id ?? item.title}>
                {isClickable ? (
                  <SidebarMenuButton tooltip={item.title} isActive={isActive} asChild>
                    <SidebarItemLink item={item}>
                      <MenuButtonContent item={item} />
                    </SidebarItemLink>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    type="button"
                    disabled={isDisabled}
                    className={isDisabled ? "opacity-70" : ""}
                  >
                    <MenuButtonContent item={item} />
                  </SidebarMenuButton>
                )}

                {hasChildren ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isSubItemActive = isSidebarItemActive(pathname, subItem);
                      const isSubItemClickable = isSidebarItemClickable(subItem);
                      const isSubItemDisabled = isSidebarLinkDisabled(subItem);

                      return (
                        <SidebarMenuSubItem key={subItem.id ?? subItem.title}>
                          {isSubItemClickable ? (
                            <SidebarMenuSubButton isActive={isSubItemActive} asChild>
                              <SidebarItemLink item={subItem}>
                                <MenuButtonContent item={subItem} />
                              </SidebarItemLink>
                            </SidebarMenuSubButton>
                          ) : (
                            <SidebarMenuSubButton
                              isActive={isSubItemActive}
                              asChild
                              className={isSubItemDisabled ? "opacity-70" : ""}
                            >
                              <span>
                                <MenuButtonContent item={subItem} />
                              </span>
                            </SidebarMenuSubButton>
                          )}
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
