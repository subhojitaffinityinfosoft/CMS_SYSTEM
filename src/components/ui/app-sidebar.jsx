"use client";

import { Link } from "react-router-dom";

import { renderSidebarIcon } from "@/components/constants/sidebar-data";
import { NavDocuments } from "@/components/ui/nav-documents";
import { NavMain } from "@/components/ui/nav-main";
import { NavSecondary } from "@/components/ui/nav-secondary";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const defaultSidebarData = {
  brand: {
    name: "CMS System",
    subtitle: "Portal",
    url: "/",
  },
  navMain: [],
  documents: [],
  navSecondary: [],
  showFooterUser: false,
};

export function AppSidebar({ sidebarData = defaultSidebarData, footerProps, ...props }) {
  const brand = sidebarData.brand ?? defaultSidebarData.brand;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild={Boolean(brand.url)}
              className="data-[slot=sidebar-menu-button]:!h-auto data-[slot=sidebar-menu-button]:!p-0 hover:bg-transparent"
            >
              {brand.url ? (
                <Link to={brand.url}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="h-7 w-7 object-contain" />
                      ) : (
                        renderSidebarIcon(brand.icon, {
                          className: "h-5 w-5",
                        }) ?? <span className="text-sm font-semibold">{brand.name?.slice(0, 2)}</span>
                      )}
                    </div>
                    <div className="grid text-left">
                      <span className="text-base font-semibold leading-none">{brand.name}</span>
                      {brand.subtitle ? (
                        <span className="pt-1 text-xs text-muted-foreground">{brand.subtitle}</span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {brand.logo ? (
                      <img src={brand.logo} alt={brand.name} className="h-7 w-7 object-contain" />
                    ) : (
                      renderSidebarIcon(brand.icon, {
                        className: "h-5 w-5",
                      }) ?? <span className="text-sm font-semibold">{brand.name?.slice(0, 2)}</span>
                    )}
                  </div>
                  <div className="grid text-left">
                    <span className="text-base font-semibold leading-none">{brand.name}</span>
                    {brand.subtitle ? (
                      <span className="pt-1 text-xs text-muted-foreground">{brand.subtitle}</span>
                    ) : null}
                  </div>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <NavMain items={sidebarData.navMain} />
        {sidebarData.documents?.length ? <NavDocuments items={sidebarData.documents} /> : null}
        {sidebarData.navSecondary?.length ? (
          <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
        ) : null}
      </SidebarContent>
      {sidebarData.showFooterUser && footerProps?.user ? (
        <SidebarFooter className="border-t border-sidebar-border px-2 py-3">
          <SidebarSeparator className="mx-0 mb-1" />
          <NavUser {...footerProps} />
        </SidebarFooter>
      ) : null}
    </Sidebar>
  );
}
