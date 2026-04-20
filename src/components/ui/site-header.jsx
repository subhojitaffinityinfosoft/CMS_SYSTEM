import {
  ChevronDownIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

function ThemeButtonIcon({ theme }) {
  if (theme === "dark") {
    return <MoonIcon className="h-4 w-4" />;
  }

  return <SunIcon className="h-4 w-4" />;
}

export function SiteHeader({
  currentSession,
  onLogout,
  onSessionChange,
  onSettingsClick,
  pageTitle = "Dashboard",
  portalName = "Portal",
  sessionOptions = [],
  setTheme,
  theme = "light",
  user,
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="hidden h-4 sm:block" />
        <div className="min-w-0">
          <p className="truncate text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {portalName}
          </p>
          <div className="flex min-w-0 items-center gap-2">
            <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">
              Welcome, {user.name}
            </h1>
            <Badge variant="outline" className="hidden border-dashed text-[11px] text-muted-foreground md:inline-flex">
              {pageTitle}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:block">
          <Select onValueChange={onSessionChange} value={currentSession}>
            <SelectTrigger className="w-[170px] bg-background">
              <SelectValue placeholder="Select Session" />
            </SelectTrigger>
            <SelectContent>
              {sessionOptions.map((session) => (
                <SelectItem key={session.value} value={session.value}>
                  {session.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <ThemeButtonIcon theme={theme} />
              <span className="sr-only">Change theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 rounded-full px-2">
              <Avatar className="h-9 w-9 rounded-full border">
                <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                <AvatarFallback className="rounded-full bg-primary text-primary-foreground">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="max-w-[140px] truncate text-sm font-medium leading-none">
                  {user.name}
                </p>
                <p className="max-w-[140px] truncate pt-1 text-xs text-muted-foreground">
                  {portalName}
                </p>
              </div>
              <ChevronDownIcon className="hidden h-4 w-4 text-muted-foreground md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="truncate text-xs font-normal text-muted-foreground">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSettingsClick}>
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
