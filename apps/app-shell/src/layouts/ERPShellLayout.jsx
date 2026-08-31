import React, { useEffect, useMemo } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { 
  useCollege, 
  useUnit, 
  useSeason, 
  useModule, 
  useAccount 
} from 'shared-core';
import { SidebarProvider, SidebarInset, SidebarTrigger, AppSidebar, SiteHeader, Separator } from 'shared-ui';
import { LayoutDashboard } from 'lucide-react'; // Default icon

export default function ERPShellLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { selectedCollege } = useCollege();
  const { selectedUnits, setSelectedUnits } = useUnit();
  const { selectedSeason, setSelectedSeason } = useSeason();
  const { modules, moduleMenus, activeModuleId, setActiveModuleId, getActiveModule, getActiveModuleMenu } = useModule();
  const { acc_dtls } = useAccount();

  // If no college is selected, redirect to college selection
  if (!selectedCollege) {
    return <Navigate to="/college-selection" replace />;
  }

  // Determine active module based on URL
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    // pathParts[0] is 'app'
    // pathParts[1] is the module id, e.g., 'dashboard', 'admission'
    if (pathParts.length > 1) {
      const currentModuleId = pathParts[1];
      if (currentModuleId !== activeModuleId) {
        setActiveModuleId(currentModuleId);
      }
    }
  }, [location.pathname, activeModuleId, setActiveModuleId]);

  const activeModule = getActiveModule();
  const activeMenu = getActiveModuleMenu();

  // Construct Sidebar Data for AppSidebar
  // AppSidebar expects navMain structure: [{ group: 1, title: 'Menu', items: [...] }]
  const sidebarData = useMemo(() => {
    if (!activeModule) return { navMain: [] };

    // Format the menu for the AppSidebar
    const formattedItems = activeMenu.map((menuItem, index) => ({
      title: menuItem.name,
      url: menuItem.route,
      icon: LayoutDashboard, // We could add specific icons to menu config
      display_position: index + 1
    }));

    return {
      navMain: [
        {
          group: 1,
          title: activeModule.name,
          items: formattedItems
        }
      ]
    };
  }, [activeModule, activeMenu]);

  const footerProps = {
    user: acc_dtls,
    portalName: selectedCollege.name
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "260px",
        "--header-height": "56px",
      }}
    >
      <AppSidebar 
        sidebarData={sidebarData} 
        footerProps={footerProps}
        activeModuleColor={activeModule?.color}
      />

      <SidebarInset className="flex flex-col h-screen overflow-hidden bg-background">
        
        {/* STICKY HEADER */}
        <div className="sticky top-0 z-40 flex items-center gap-2 h-16 px-4 border-b bg-background/95 backdrop-blur w-full shrink-0">
          <SidebarTrigger className="-ml-1 p-2 rounded-md hover:bg-muted" />
          <Separator orientation="vertical" className="h-4" />
          
          <div className="flex-1 min-w-0 h-full flex items-center">
            <SiteHeader
              pageTitle={activeModule?.name || "Dashboard"}
              portalName="ERP System"
              user={acc_dtls}
              selectedCollege={selectedCollege}
              selectedUnits={selectedUnits}
              onUnitsChange={setSelectedUnits}
              selectedSeason={selectedSeason}
              onSeasonChange={setSelectedSeason}
              activeModule={activeModule}
            />
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto bg-muted/20">
          <div className="p-4 md:p-6 lg:p-8 h-full">
            <Outlet />
          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}
