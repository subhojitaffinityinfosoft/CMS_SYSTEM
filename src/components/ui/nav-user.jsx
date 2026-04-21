"use client";

import {
  ChevronsUpDownIcon,
  LogOutIcon,
  MoonIcon,
  PaletteIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";

import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ThemeIcon({ theme }) {
  return theme === "dark" ? <MoonIcon /> : <SunIcon />;
}

export function NavUser({
  onLogout,
  onSettingsClick,
  portalName,
  setTheme,
  theme = "light",
  user,
}) {
  const fallbackInitials =
    user.initials ?? getInitials(user.name ?? "Admin User");

  return (
    <div className="flex items-center gap-2">

      {/* 🌙 THEME BUTTON */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center w-9 h-9 rounded-md border hover:bg-muted transition">
            <ThemeIcon theme={theme} className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40 rounded-lg">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setTheme("light")}>
            <SunIcon className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <MoonIcon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 👤 USER MENU */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition">

            <Avatar className="h-8 w-8 rounded-md border">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {fallbackInitials}
              </AvatarFallback>
            </Avatar>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium leading-none">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {portalName}
              </p>
            </div>

            <ChevronsUpDownIcon className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 rounded-lg">
          <DropdownMenuLabel>
            {user.name}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={onSettingsClick}>
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem>
            <PaletteIcon className="mr-2 h-4 w-4" />
            {theme === "dark" ? "Dark Theme" : "Light Theme"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={onLogout}
            className="text-destructive"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  );
}