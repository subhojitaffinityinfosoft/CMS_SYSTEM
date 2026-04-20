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
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAccount } from "@/context/account/AccountContextProvider";
import { useAppMenu } from "@/context/applicationMenu/ApplicationMenuContextProvider";
import { useFinancialYear } from "@/context/financialYear/FinancialYearContextProvider";
import StorageContext from "@/context/storage/StorageContext";
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

const PortalLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { acc_dtls, setAccDtls } = useAccount();
  const { appMenus } = useAppMenu();
  const { finYear, setFinancialYear, setFinancialYearDtls } = useFinancialYear();
  const { setAuthenticatedKey } = useContext(StorageContext);

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

  const companyName =
    getStorageData(import.meta.env.VITE_COMP_NAME) || portal.companyFallback;
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

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 76)",
        "--header-height": "calc(var(--spacing) * 16)",
      }}
    >
      <AppSidebar variant="inset" sidebarData={sidebarData} />
      <SidebarInset>
        <SiteHeader
          currentSession={finYear || defaultSession?.value || ""}
          onLogout={handleLogout}
          onSessionChange={handleSessionChange}
          onSettingsClick={handleSettingsClick}
          pageTitle={pageTitle}
          portalName={portal.label}
          sessionOptions={sessionOptions}
          setTheme={setTheme}
          theme={getResolvedTheme(theme)}
          user={currentUser}
        />
        <div className="flex flex-1 flex-col bg-muted/20">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-4 px-4 py-4 md:px-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PortalLayout;
