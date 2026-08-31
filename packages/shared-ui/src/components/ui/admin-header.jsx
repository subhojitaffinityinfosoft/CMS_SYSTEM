/**
 * AdminHeader — single header used across all admin pages.
 * Works in both the module-selection dashboard (no sidebar) 
 * and inside AdminLayout (with sidebar trigger).
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUnit, useSeason, useAccount } from "shared-core";
import { useTheme } from "../theme-provider";
import { NavUser } from "./nav-user";
import { UnitMultiSelect } from "./unit-multiselect";
import { SeasonSelector } from "./season-selector";
import { Separator } from "./separator";
import { SidebarTrigger } from "./sidebar";
import { Bell, LayoutGrid, ChevronRight } from "lucide-react";

export function AdminHeader({
  pageTitle,        // e.g. "Admission" or "Dashboard"
  moduleColor,      // accent colour of the active module
  showSidebarTrigger = false,  // true inside AdminLayout
  showChangeModule = false,    // true inside module pages (not dashboard)
}) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { acc_dtls } = useAccount();
  const { selectedUnits, setSelectedUnits } = useUnit();
  const { selectedSeason, setSelectedSeason } = useSeason();

  return (
    <header className="flex w-full items-center justify-between h-full gap-3">

      {/* ── LEFT ─────────────────────────────────────── */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Sidebar toggle (only inside module pages) */}
        {showSidebarTrigger && (
          <>
            <SidebarTrigger className="-ml-1 p-2 rounded-md hover:bg-muted shrink-0" />
            <Separator orientation="vertical" className="h-5 shrink-0" />
          </>
        )}

        {/* Brand */}
        <div className="hidden md:flex items-center justify-center font-extrabold text-sm text-primary bg-primary/10 px-2.5 py-1 rounded-lg select-none shrink-0">
          CMS ERP
        </div>

        <Separator orientation="vertical" className="h-5 hidden md:block shrink-0" />

        {/* Breadcrumb: Module → Page */}
        <div className="flex items-center gap-1.5 min-w-0">
          {showChangeModule ? (
            <>
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors flex items-center gap-1 shrink-0"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Modules</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
              <span
                className="text-sm font-bold truncate"
                style={{ color: moduleColor || "inherit" }}
              >
                {pageTitle}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-gray-800 truncate">{pageTitle || "Dashboard"}</span>
          )}
        </div>
      </div>

      {/* ── RIGHT ────────────────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Unit + Season selectors */}
        <div className="hidden lg:flex items-center gap-2">
          <UnitMultiSelect selectedUnits={selectedUnits} onChange={setSelectedUnits} />
          <SeasonSelector selectedSeason={selectedSeason} onChange={setSelectedSeason} />
        </div>

        <Separator orientation="vertical" className="h-5 hidden lg:block" />

        {/* Notification bell */}
        <button className="relative p-2 rounded-md hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        <Separator orientation="vertical" className="h-5 hidden md:block" />

        {/* User menu */}
        <NavUser
          user={acc_dtls}
          portalName="Admin Portal"
          onLogout={() => {
            localStorage.clear();
            navigate("/login");
          }}
          setTheme={setTheme}
          theme={theme}
        />
      </div>
    </header>
  );
}
