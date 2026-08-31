import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { resolveSidebarIcon } from "../constants/sidebar-data";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "./dropdown-menu";

// Fallback Icon
const DefaultIcon = LucideIcons.LayoutDashboard;

/* ====================================================================
   Recursive Dropdown Component for Submenus using Radix
==================================================================== */
const RecursiveDropdownItems = ({ items, activeModuleColor, level = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!items || items.length === 0) return null;

  return items.map((item, idx) => {
    const hasChildren = item.items && item.items.length > 0;
    
    // Active check logic
    const currentPath = location.pathname.replace(/\/+$/, "");
    const itemPath = (item.url || item.route || item.path || "").replace(/\/+$/, "");
    const isSelfActive = itemPath && itemPath !== "#" && (currentPath === itemPath || currentPath.startsWith(itemPath + "/"));
    const isChildActive = hasChildren && JSON.stringify(item.items).includes(currentPath);
    const isActive = isSelfActive || isChildActive;

    // Resolve icon
    const rawIcon = item.icon;
    let IconComp = DefaultIcon;
    if (typeof rawIcon === "string") {
        const resolved = resolveSidebarIcon(rawIcon);
        if (typeof resolved === "function" || typeof resolved === "object") {
            IconComp = resolved;
        } else if (LucideIcons[rawIcon]) {
            IconComp = LucideIcons[rawIcon];
        }
    } else if (typeof rawIcon === "function" || typeof rawIcon === "object") {
        IconComp = rawIcon;
    }

    if (hasChildren) {
      return (
        <DropdownMenuSub key={item.id || idx}>
          <DropdownMenuSubTrigger 
            className={`flex items-center gap-2 cursor-pointer ${isActive ? 'bg-slate-50' : ''}`}
            style={{ color: isActive ? (activeModuleColor || '#134074') : undefined }}
          >
            {rawIcon && <IconComp className="w-4 h-4 shrink-0" />}
            <span className="truncate">{item.name || item.title || item.label}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-56 p-1">
              <RecursiveDropdownItems items={item.items} activeModuleColor={activeModuleColor} level={level + 1} />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      );
    }

    return (
      <DropdownMenuItem 
        key={item.id || idx}
        onClick={() => navigate(itemPath)}
        className={`flex items-center gap-2 cursor-pointer ${isActive ? 'bg-slate-50' : ''}`}
        style={{ color: isActive ? (activeModuleColor || '#134074') : undefined }}
      >
        {rawIcon && <IconComp className="w-4 h-4 shrink-0" />}
        <span className="truncate">{item.name || item.title || item.label}</span>
      </DropdownMenuItem>
    );
  });
};

/* ====================================================================
   Main ModuleMenuBar Component
==================================================================== */
export function ModuleMenuBar({ moduleColor = "#134074", menuItems = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef(null);

  const scrollContainer = (dir) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: dir * 150, behavior: 'smooth' });
    }
  };

  if (!menuItems || menuItems.length === 0) return null;

  const currentPath = location.pathname.replace(/\/+$/, "");

  return (
    <nav className="sticky top-14 z-30 bg-white border-b border-slate-200 shadow-sm transition-all w-full shrink-0">
      <div className="flex items-center h-12 relative max-w-full">
        
        {/* Module Color Strip */}
        <div className="w-1 self-stretch shrink-0" style={{ background: moduleColor }} />

        {/* Scroll Left */}
        <button
          onClick={() => scrollContainer(-1)}
          className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors shrink-0 hidden md:flex h-full items-center justify-center border-r border-slate-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Horizontal Menu Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 px-2 h-full"
          style={{ scrollBehavior: "smooth", msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          {menuItems.map((item, idx) => {
            const hasChildren = item.items && item.items.length > 0;
            const itemPath = (item.url || item.route || item.path || "").replace(/\/+$/, "");
            
            // Determine active state
            const isSelfActive = itemPath && itemPath !== "#" && (currentPath === itemPath || currentPath.startsWith(itemPath + "/"));
            const isChildActive = hasChildren && JSON.stringify(item.items).includes(currentPath);
            const isActive = isSelfActive || isChildActive;

            // Resolve Icon
            const rawIcon = item.icon;
            let IconComp = DefaultIcon;
            if (typeof rawIcon === "string") {
                const resolved = resolveSidebarIcon(rawIcon);
                if (typeof resolved === "function" || typeof resolved === "object") {
                    IconComp = resolved;
                } else if (LucideIcons[rawIcon]) {
                    IconComp = LucideIcons[rawIcon];
                }
            } else if (typeof rawIcon === "function" || typeof rawIcon === "object") {
                IconComp = rawIcon;
            }

            const buttonClass = `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all relative shrink-0 ${isActive ? "shadow-sm" : "hover:bg-slate-100/80"}`;
            const buttonStyle = {
              color: isActive ? moduleColor : "#64748b",
              background: isActive ? `${moduleColor}15` : "transparent",
              border: isActive ? `1px solid ${moduleColor}40` : "1px solid transparent",
            };

            const triggerButton = (
              <button
                onClick={() => {
                  if (!hasChildren && itemPath && itemPath !== "#") {
                    navigate(itemPath);
                  }
                }}
                className={buttonClass}
                style={buttonStyle}
              >
                {rawIcon && <IconComp className="w-4 h-4 shrink-0" />}
                {item.name || item.title || item.label}
                
                {item.badge && (
                  <span
                    className="ml-1 px-1.5 py-0.5 rounded-full text-white font-bold flex items-center justify-center leading-none"
                    style={{ fontSize: 10, background: moduleColor }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );

            if (hasChildren) {
              return (
                <DropdownMenu key={item.id || idx}>
                  <DropdownMenuTrigger asChild>
                    {triggerButton}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 p-1">
                    <RecursiveDropdownItems items={item.items} activeModuleColor={moduleColor} />
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <div key={item.id || idx} className="h-full flex items-center shrink-0">
                {triggerButton}
              </div>
            );
          })}
        </div>

        {/* Scroll Right */}
        <button
          onClick={() => scrollContainer(1)}
          className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors shrink-0 hidden md:flex h-full items-center justify-center border-l border-slate-100"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
      
      {/* Hide scrollbar CSS injection */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}
