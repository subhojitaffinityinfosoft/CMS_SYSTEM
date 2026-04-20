import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader({
  pageTitle = "Dashboard",
  portalName = "Portal",
  user,
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="hidden h-4 sm:block" />
        <div className="min-w-0">
          <p className="truncate text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {portalName}
          </p>
          <h1 className="truncate text-lg font-semibold text-foreground">
            Welcome, {user.name}
          </h1>
        </div>
      </div>

      <Badge variant="outline" className="hidden border-dashed px-3 py-1 text-[11px] text-muted-foreground md:inline-flex">
        {pageTitle}
      </Badge>
    </header>
  );
}
