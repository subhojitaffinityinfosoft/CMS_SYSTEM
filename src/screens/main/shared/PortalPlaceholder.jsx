import { FolderKanbanIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

import { getPortalConfig } from "@/components/constants/sidebar-data";

const formatPathLabel = (pathname = "") => {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) {
    return "Dashboard";
  }

  return segments[segments.length - 1]
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

export default function PortalPlaceholder() {
  const location = useLocation();
  const portal = getPortalConfig(location.pathname);
  const pageLabel = formatPathLabel(location.pathname);

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-2xl rounded-3xl border bg-background p-8 shadow-sm">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FolderKanbanIcon className="h-7 w-7" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {portal.label}
        </p>
        <h2 className="pt-2 text-3xl font-semibold text-foreground">{pageLabel}</h2>
        <p className="pt-3 text-sm leading-6 text-muted-foreground">
          This screen is connected to the new dynamic portal shell. The menu, session
          switcher, theme switcher, company name, and profile actions are all ready, and
          this page can now be replaced with your real module UI or API-driven content.
        </p>
      </div>
    </div>
  );
}
