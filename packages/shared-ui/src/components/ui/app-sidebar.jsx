"use client";

import React, { useMemo, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ====================================================================
   Recursive Submenu for Expanded Sidebar (Accordion Style)
==================================================================== */
const RecursiveAccordionItem = ({ item, level = 0, activeModuleColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const hasChildren = item.items?.length > 0;
  
  // Check if active (including deeply nested children)
  const isSelfActive = location.pathname === item.url;
  const isChildActive = hasChildren && JSON.stringify(item.items).includes(location.pathname);
  const isActive = isSelfActive || isChildActive;

  // Auto-open if a child is active
  useEffect(() => {
    if (isChildActive) setIsOpen(true);
  }, [isChildActive]);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          } else if (item.url && item.url !== "#") {
            navigate(item.url);
          }
        }}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all w-full
          ${isActive && level === 0 ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted/60"}
        `}
        style={isActive && level === 0 && activeModuleColor ? { backgroundColor: activeModuleColor, color: '#fff' } : {}}
      >
        {/* Indent nested items slightly if they don't have icons, but let's always align them */}
        <div className="flex items-center gap-3 flex-1 overflow-hidden" style={{ paddingLeft: level > 0 ? `${level * 12}px` : 0 }}>
          {item.icon && (
            <item.icon 
              className={`w-5 h-5 shrink-0 ${level > 0 ? 'w-4 h-4' : ''}`} 
              style={{ color: (isActive && level === 0) ? '#fff' : (activeModuleColor || 'var(--primary)') }} 
            />
          )}
          
          <span className={`flex-1 truncate ${level > 0 ? 'text-sm' : 'font-medium'} ${isActive && level > 0 ? 'font-semibold' : ''}`}
            style={{ color: isActive && level > 0 ? (activeModuleColor || 'var(--primary)') : 'inherit' }}
          >
            {item.title}
          </span>
        </div>

        {hasChildren && (
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        )}
      </SidebarMenuButton>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-1 flex flex-col gap-1 relative before:absolute before:left-5 before:top-0 before:bottom-0 before:w-px before:bg-border/50">
              {item.items.map((sub, idx) => (
                <RecursiveAccordionItem key={idx} item={sub} level={level + 1} activeModuleColor={activeModuleColor} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarMenuItem>
  );
};

/* ====================================================================
   Recursive Floating Flyout for Collapsed Sidebar (Insane Hover Menu)
==================================================================== */
const RecursiveFlyoutMenu = ({ items, activeModuleColor, level = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col min-w-[200px] p-1.5">
      {items.map((item, idx) => {
        const hasChildren = item.items?.length > 0;
        const isActive = location.pathname === item.url || (hasChildren && JSON.stringify(item.items).includes(location.pathname));

        return (
          <div key={idx} className="group/flyout relative">
            <button
              onClick={() => {
                if (!hasChildren && item.url && item.url !== "#") navigate(item.url);
              }}
              className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all
                ${isActive ? "bg-primary/10" : "hover:bg-muted"}`}
              style={{ color: isActive ? (activeModuleColor || 'var(--primary)') : 'inherit' }}
            >
              <div className="flex items-center gap-2.5">
                {item.icon && <item.icon className="w-4 h-4 shrink-0" />}
                <span className="truncate">{item.title}</span>
              </div>
              {hasChildren && <ChevronRight className="w-4 h-4 opacity-50 group-hover/flyout:opacity-100 transition-opacity" />}
            </button>

            {/* Nested Flyout! Appears to the right of the current menu item */}
            {hasChildren && (
              <div className="absolute left-[calc(100%+4px)] top-0 hidden group-hover/flyout:block pl-1 z-50">
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className="bg-popover text-popover-foreground rounded-xl shadow-xl border overflow-hidden"
                >
                  <RecursiveFlyoutMenu items={item.items} activeModuleColor={activeModuleColor} level={level + 1} />
                </motion.div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ====================================================================
   Main AppSidebar Component
==================================================================== */
export function AppSidebar({ sidebarData, footerProps, activeModuleColor }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const sortedMenu = useMemo(() => {
    return [...(sidebarData?.navMain || [])].sort((a, b) => (a.group || 0) - (b.group || 0));
  }, [sidebarData]);

  const searchResults = useMemo(() => {
    if (!search) return [];
    const results = [];
    const searchLower = search.toLowerCase();

    const flatten = (items, prefix = "") => {
      items.forEach((item) => {
        if (item.title.toLowerCase().includes(searchLower)) {
          results.push({ label: prefix ? `${prefix} → ${item.title}` : item.title, url: item.url });
        }
        if (item.items) {
          flatten(item.items, prefix ? `${prefix} → ${item.title}` : item.title);
        }
      });
    };
    flatten(sortedMenu);
    return results;
  }, [search, sortedMenu]);

  return (
    <Sidebar collapsible="icon" className="border-r shadow-sm">
      {/* HEADER */}
      <SidebarHeader className="flex flex-col items-center gap-3 p-4 bg-primary text-primary-foreground transition-all duration-300 relative overflow-hidden"
        style={activeModuleColor ? { backgroundColor: activeModuleColor } : {}}
      >
        {/* Glossy overlay effect for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        <Avatar className={`border-2 border-white/20 shadow-lg transition-all duration-300 ${isCollapsed ? 'w-8 h-8' : 'w-12 h-12'}`}>
          <AvatarImage src={footerProps?.user?.avatar || "https://github.com/shadcn.png"} />
          <AvatarFallback className="bg-primary-foreground text-primary font-bold">
            {footerProps?.user?.initials || "US"}
          </AvatarFallback>
        </Avatar>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center w-full"
            >
              <p className="text-sm font-bold tracking-tight truncate px-2">{footerProps?.user?.name}</p>
              <p className="text-xs text-primary-foreground/80 font-medium truncate px-2">{footerProps?.portalName}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarHeader>

      {/* SEARCH (Hidden when collapsed) */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3 border-b bg-muted/10">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search menu..."
                className="pl-9 h-9 bg-background shadow-sm border-muted-foreground/20 focus-visible:ring-primary/30 transition-all rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {search && searchResults.length > 0 && (
              <div className="mt-2 rounded-lg border bg-popover shadow-lg max-h-48 overflow-y-auto">
                {searchResults.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => { navigate(item.url); setSearch(""); }}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-muted transition-colors border-b last:border-0"
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MENU */}
      <SidebarContent className="space-y-1 p-3 custom-scrollbar">
        {sortedMenu.map((item, i) => (
          <SidebarGroup key={i} className="p-0 mb-1">
            <SidebarMenu>
              {isCollapsed && !isMobile ? (
                // Collapsed State: Icon with Hover Flyout Menu
                <div className="group/parent relative flex justify-center w-full">
                  <SidebarMenuItem className="w-full flex justify-center">
                    <SidebarMenuButton
                      onClick={() => !item.items?.length && navigate(item.url)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted transition-all cursor-pointer relative"
                      style={location.pathname.startsWith(item.url) && item.url !== "#" ? { backgroundColor: `${activeModuleColor}15`, color: activeModuleColor } : {}}
                    >
                      {item.icon && <item.icon className="w-5 h-5 shrink-0" style={{ color: location.pathname.startsWith(item.url) && item.url !== "#" ? activeModuleColor : '' }} />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Flyout Popover */}
                  <div className="absolute left-[calc(100%+12px)] top-0 hidden group-hover/parent:block z-50">
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      className="bg-popover text-popover-foreground rounded-xl shadow-2xl border min-w-[220px] overflow-visible before:absolute before:-left-3 before:top-0 before:bottom-0 before:w-3 before:bg-transparent"
                    >
                      {/* Title Header of Flyout */}
                      <div className="px-4 py-3 border-b bg-muted/30 rounded-t-xl">
                        <p className="font-bold text-sm" style={{ color: activeModuleColor || 'inherit' }}>{item.title}</p>
                      </div>
                      
                      {/* Recursive Content */}
                      {item.items?.length > 0 ? (
                        <RecursiveFlyoutMenu items={item.items} activeModuleColor={activeModuleColor} />
                      ) : (
                        <div className="p-3 text-xs text-muted-foreground">No submenus available</div>
                      )}
                    </motion.div>
                  </div>
                </div>
              ) : (
                // Expanded State: Traditional Recursive Accordion
                <RecursiveAccordionItem item={item} activeModuleColor={activeModuleColor} />
              )}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}