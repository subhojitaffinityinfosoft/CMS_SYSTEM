import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "@/components/ui/nav-user";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { useTheme } from "../theme-provider";
import { useNavigate } from "react-router-dom";
export function SiteHeader({
  pageTitle = "Dashboard",
  portalName = "Portal",
  user,
}) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate()
  return (
    <header className="flex w-full items-center justify-between">

      {/* 🔥 LEFT */}
      <div className="flex items-center gap-3">
        <div className="leading-tight">
          <p className="text-sm font-semibold text-primary">
            {user?.companyName || "Company Name"}
          </p>
          <p className="text-xs text-muted-foreground">
            {user?.unitName || portalName}
          </p>
        </div>
      </div>

      {/* 🔥 RIGHT */}
      <div className="flex items-center gap-4">

        {/* PAGE */}
        <Badge
          variant="outline"
          className="hidden md:inline-flex border-primary/30 text-primary"
        >
          {pageTitle}
        </Badge>

        {/* NOTIFICATION */}
        <button className="relative">
          <Bell className="w-5 h-5 text-muted-foreground hover:text-primary" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        {/* USER */}
        <NavUser
          user={user}
          portalName={portalName}
          onLogout={() => {
            localStorage.clear();
            navigate('/')
          }}
          setTheme={setTheme}
          theme={theme}
        />
      </div>
    </header>
  );
}