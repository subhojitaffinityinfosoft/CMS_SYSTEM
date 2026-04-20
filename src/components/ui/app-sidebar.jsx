"use client";

import * as React from "react";
import { Link } from "react-router-dom";

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

export function AppSidebar({ sidebarData = defaultSidebarData, ...props }) {
  const brand = sidebarData.brand ?? defaultSidebarData.brand;
  const BrandIcon = brand.icon;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild={Boolean(brand.url)}
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {brand.url ? (
                <Link to={brand.url}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {BrandIcon ? <BrandIcon className="h-5 w-5" /> : <span className="text-sm font-semibold">{brand.name?.slice(0, 2)}</span>}
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {BrandIcon ? <BrandIcon className="h-5 w-5" /> : <span className="text-sm font-semibold">{brand.name?.slice(0, 2)}</span>}
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
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        {sidebarData.documents?.length ? <NavDocuments items={sidebarData.documents} /> : null}
        {sidebarData.navSecondary?.length ? (
          <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
        ) : null}
      </SidebarContent>
      {sidebarData.showFooterUser && sidebarData.user ? (
        <SidebarFooter>
          <NavUser user={sidebarData.user} />
        </SidebarFooter>
      ) : null}
    </Sidebar>
  );
}
