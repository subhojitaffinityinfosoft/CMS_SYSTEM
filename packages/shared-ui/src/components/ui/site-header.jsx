import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "@/components/ui/nav-user";
import { Bell } from "lucide-react";
import { useTheme } from "../theme-provider";
import { useNavigate } from "react-router-dom";
import { UnitMultiSelect } from "./unit-multiselect";
import { SeasonSelector } from "./season-selector";

export function SiteHeader({
  pageTitle = "Dashboard",
  portalName = "Portal",
  user,
  selectedUnits,
  onUnitsChange,
  selectedSeason,
  onSeasonChange,
  activeModule
}) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="flex w-full items-center justify-between py-2">
      {/* 🔥 LEFT */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center justify-center font-bold text-xl text-primary bg-primary/10 px-3 py-1 rounded-md">
          CMS ERP
        </div>
        <Separator orientation="vertical" className="h-6 hidden md:block" />
        <div className="leading-tight">
          <p className="text-sm font-bold text-primary">
            {user?.companyName || "Global ERP System"}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span>Module: <span className="font-semibold" style={{ color: activeModule?.color }}>{activeModule?.name || portalName}</span></span>
          </p>
        </div>
      </div>

      {/* 🔥 RIGHT */}
      <div className="flex items-center gap-4">
        
        {/* UNITS & SEASON */}
        <div className="hidden lg:flex items-center gap-2">
          {onUnitsChange && (
            <UnitMultiSelect selectedUnits={selectedUnits} onChange={onUnitsChange} />
          )}
          {onSeasonChange && (
            <SeasonSelector selectedSeason={selectedSeason} onChange={onSeasonChange} />
          )}
        </div>

        {/* NOTIFICATION */}
        <button className="relative ml-2">
          <Bell className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
        </button>

        <Separator orientation="vertical" className="h-6 hidden md:block mx-1" />

        {/* USER */}
        <NavUser
          user={user}
          portalName={portalName}
          onLogout={() => {
            localStorage.clear();
            navigate('/');
          }}
          setTheme={setTheme}
          theme={theme}
        />
      </div>
    </header>
  );
}