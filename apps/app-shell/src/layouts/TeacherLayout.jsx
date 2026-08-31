import React, { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { menuData } from "@/components/constants/dummy_data";
import {
    buildPortalSessionOptions,
    createPortalSidebarData,
    createPortalUser,
    getPortalConfig,
    getSidebarPageTitle,
} from "@/components/constants/sidebar-data";
import { useTheme } from "@/components/theme-provider";
import { ModuleMenuBar } from "@/components/ui/module-menu-bar";
import { SiteHeader } from "@/components/ui/site-header";
import { Separator } from "@/components/ui/separator";
import {
    useAccount,
    useAppMenu,
    useFinancialYear,
    useCompany,
    useUnit,
    useModule
} from "shared-core";
import StorageContext from "shared-core/context/storage/StorageContext";
import { getStorageData, removeItemFromStorage } from "@/lib/Storage";

const storageKeysToClear = [
    "VITE_AU_TK",
    "VITE_COMP_NAME",
    "VITE_ROLE_ID",
    "VITE_USER_ID",
    "VITE_USER_TYPE",
    "VITE_EMPLOYEE_ID",
];

const getResolvedTheme = (theme) => {
    if (theme !== "system") {
        return theme;
    }

    if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
        return "dark";
    }

    return "light";
};

const TeacherLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const { acc_dtls, setAccDtls } = useAccount();
  const { appMenus } = useAppMenu();
  const { finYear, setFinancialYear, setFinancialYearDtls } = useFinancialYear();
  const { setAuthenticatedKey } = useContext(StorageContext);
  const { config } = useCompany();
  const { selectedUnits, setSelectedUnits } = useUnit();
  const { getModuleById } = useModule();

  const portal = React.useMemo(() => getPortalConfig(location.pathname), [location.pathname]);
  const sessionOptions = React.useMemo(() => buildPortalSessionOptions(), []);
  const defaultSession =
      sessionOptions.find((session) => session.isCurrent) ?? sessionOptions[0] ?? null;

  React.useEffect(() => {
      if (!finYear && defaultSession) {
          setFinancialYear(defaultSession.value);
          setFinancialYearDtls(defaultSession);
      }
  }, [defaultSession, finYear, setFinancialYear, setFinancialYearDtls]);

  const companyName = config?.companyName || getStorageData(import.meta.env.VITE_COMP_NAME) || portal.companyFallback;
  const currentUser = React.useMemo(
      () => createPortalUser({ user: acc_dtls, portal, companyName }),
      [acc_dtls, companyName, portal]
  );

  const menus = appMenus?.length ? appMenus : menuData;
  const sidebarData = React.useMemo(
      () =>
          createPortalSidebarData({
              pathname: location.pathname,
              menus,
              companyName,
              user: currentUser,
          }),
      [companyName, currentUser, location.pathname, menus]
  );

  const pageTitle = React.useMemo(
      () => getSidebarPageTitle(location.pathname, sidebarData),
      [location.pathname, sidebarData]
  );

  const handleSessionChange = React.useCallback(
      (value) => {
          const selectedSession =
              sessionOptions.find((session) => session.value === value) ?? defaultSession;

          if (!selectedSession) {
              return;
          }

          setFinancialYear(selectedSession.value);
          setFinancialYearDtls(selectedSession);
      },
      [defaultSession, sessionOptions, setFinancialYear, setFinancialYearDtls]
  );

  const handleSettingsClick = React.useCallback(() => {
      navigate(portal.settingsUrl);
  }, [navigate, portal.settingsUrl]);

  const handleLogout = React.useCallback(() => {
      setAuthenticatedKey(null);
      setAccDtls(null);
      setFinancialYear("");
      setFinancialYearDtls("");

      storageKeysToClear.forEach((storageKey) => {
          const envKey = import.meta.env[storageKey];

          if (envKey) {
              removeItemFromStorage(envKey);
          }
      });

      navigate("/");
  }, [navigate, setAccDtls, setAuthenticatedKey, setFinancialYear, setFinancialYearDtls]);

  // Extract color for teacher module
  const activeModule = getModuleById("teacher");
  const moduleColor = activeModule?.color || "#10b981";

return (
<div className="flex flex-col h-screen overflow-hidden bg-muted/20">

  {/* 🔥 STICKY HEADER */}
  <div className="sticky top-0 z-40 flex items-center gap-2 h-14 px-4 border-b bg-background w-full">
    <div className="flex-1 min-w-0">
      <SiteHeader
        pageTitle={pageTitle}
        portalName={portal.label}
        user={currentUser}
        selectedUnits={selectedUnits}
        onUnitsChange={setSelectedUnits}
      />
    </div>
  </div>

  {/* ── HORIZONTAL MEGA MENU (Replacing Sidebar) ────── */}
  <ModuleMenuBar 
    moduleColor={moduleColor}
    menuItems={sidebarData.navMain} 
  />

  {/* 🔥 SCROLLABLE CONTENT */}
  <div className="flex-1 overflow-y-auto">
    <div className="p-4 md:p-6">
      <Outlet />
    </div>
  </div>

</div>
);
};

export default TeacherLayout;