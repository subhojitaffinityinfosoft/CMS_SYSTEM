"use client";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function AppSidebar({ sidebarData, footerProps }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { state } = useSidebar(); // 👈 collapsed / expanded

  const isCollapsed = state === "collapsed";

  /* ================= SORT ================= */
  const sortedMenu = useMemo(() => {
    return [...(sidebarData?.navMain || [])]
      .sort((a, b) => a.group - b.group)
      .map((item) => ({
        ...item,
        items: item.items
          ? [...item.items].sort(
            (a, b) => a.display_position - b.display_position
          )
          : [],
      }));
  }, [sidebarData]);

  /* ================= AUTO OPEN ================= */
  useEffect(() => {
    sortedMenu.forEach((item, i) => {
      if (item.items?.some((sub) => sub.url === location.pathname)) {
        setOpenMenu(i);
      }
    });
  }, [location.pathname, sortedMenu]);

  /* ================= SEARCH ================= */
  const searchResults = useMemo(() => {
    if (!search) return [];

    const results = [];

    sortedMenu.forEach((item) => {
      if (item.title.toLowerCase().includes(search.toLowerCase())) {
        results.push({ label: item.title, url: item.url });
      }

      item.items?.forEach((sub) => {
        if (sub.title.toLowerCase().includes(search.toLowerCase())) {
          results.push({
            label: `${item.title} → ${sub.title}`,
            url: sub.url,
          });
        }
      });
    });

    return results;
  }, [search, sortedMenu]);

  return (
    <Sidebar collapsible="icon">
      {/* ================= HEADER ================= */}
      <SidebarHeader className="flex flex-col items-center gap-3 p-4 bg-primary text-primary-foreground">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SP</AvatarFallback>
        </Avatar>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <p className="text-sm font-semibold">
                {footerProps?.user?.name}
              </p>
              <p className="text-xs opacity-80">
                {footerProps?.portalName}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarHeader>

      {/* ================= SEARCH ================= */}
      {!isCollapsed && (
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {search && searchResults.length > 0 && (
            <div className="mt-2 rounded-md border bg-popover shadow">
              {searchResults.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    navigate(item.url);
                    setSearch("");
                  }}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-accent"
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= MENU ================= */}
      <SidebarContent className="space-y-0 px-2">
        {sortedMenu.map((item, i) => {
          const hasChildren = item.items?.length > 0;
          const isActiveParent = item.items?.some(
            (sub) => sub.url === location.pathname
          );

          return (
            <SidebarGroup key={i} className="mb-1 rounded-lg bg-muted/30 p-1">
              <SidebarMenu>
                {/* MAIN */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() =>
                      hasChildren
                        ? setOpenMenu(openMenu === i ? null : i)
                        : navigate(item.url)
                    }
                    className={`
  flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all w-full
  ${isActiveParent
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted/40 hover:bg-muted"
                      }
`}
                  >
                    {item.icon && (
                      <item.icon className="w-5 h-5 shrink-0 text-primary" />)}

                    {!isCollapsed && (
                      <span className="flex-1">{item.title}</span>
                    )}

                    {!isCollapsed && hasChildren && (
                      <ChevronDown
                        className={`w-4 h-4 transition ${openMenu === i ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* SUBMENU */}
                <AnimatePresence>
                  {!isCollapsed && openMenu === i && hasChildren && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-6 overflow-hidden"
                    >
                      {item.items.map((sub, idx) => (
                        <SidebarMenuItem key={idx}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={sub.url}
                              className={({ isActive }) =>
                                `flex items-center gap-2 text-sm rounded-md px-2 py-1.5 transition
                               ${isActive ? "bg-primary/15  border-l-2 border-primary font-medium" : "text-muted-foreground"}`}
                            >
                              {/* ✅ SUB ICON FIX */}
                              {sub.icon && (
                                <sub.icon className="w-4.5 h-4.5 shrink-0 text-primary" />
                              )}

                              <span>{sub.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}