import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { menuData } from "@/components/constants/dummy_data";
import {
    buildPortalSessionOptions,
    createPortalSidebarData,
    createPortalUser,
    getPortalConfig,
} from "@/components/constants/sidebar-data";
import { useTheme } from "@/components/theme-provider";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AlertTriangle } from "lucide-react";
import {
    useAccount,
    useAppMenu,
    useFinancialYear,
    useCompany,
} from "shared-core";
import StorageContext from "shared-core/context/storage/StorageContext";
import { getStorageData, removeItemFromStorage } from "@/lib/Storage";
import { AdminHeader } from "shared-ui";

const storageKeysToClear = [
    "VITE_AU_TK",
    "VITE_COMP_NAME",
    "VITE_ROLE_ID",
    "VITE_USER_ID",
    "VITE_USER_TYPE",
    "VITE_EMPLOYEE_ID",
];

const getResolvedTheme = (theme) => {
    if (theme !== "system") return theme;
    if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) return "dark";
    return "light";
};

// Derive a readable module name from the URL path
const getModuleFromPath = (pathname) => {
    const parts = pathname.split('/').filter(Boolean);
    // /admin/<module>/...
    if (parts[0] === 'admin' && parts[1]) {
        return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    }
    return 'Module';
};

// Map module id to its color
const moduleColors = {
    admission: "#4F46E5",
    master: "#8b5cf6",
    transaction: "#059669",
    reports: "#D97706",
    student: "#0ea5e9",
    teacher: "#10b981",
};

const AdminLayout = () => {
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const { acc_dtls, setAccDtls } = useAccount();
    const { appMenus } = useAppMenu();
    const { finYear, setFinancialYear, setFinancialYearDtls } = useFinancialYear();
    const { setAuthenticatedKey } = useContext(StorageContext);
    const { config } = useCompany();

    const portal = React.useMemo(() => getPortalConfig(location.pathname), [location.pathname]);
    const sessionOptions = React.useMemo(() => buildPortalSessionOptions(), []);
    const defaultSession = sessionOptions.find((s) => s.isCurrent) ?? sessionOptions[0] ?? null;

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
        () => createPortalSidebarData({ pathname: location.pathname, menus, companyName, user: currentUser }),
        [companyName, currentUser, location.pathname, menus]
    );

    const handleSessionChange = React.useCallback(
        (value) => {
            const s = sessionOptions.find((s) => s.value === value) ?? defaultSession;
            if (s) { setFinancialYear(s.value); setFinancialYearDtls(s); }
        },
        [defaultSession, sessionOptions, setFinancialYear, setFinancialYearDtls]
    );

    const handleLogout = React.useCallback(() => {
        setAuthenticatedKey(null);
        setAccDtls(null);
        setFinancialYear("");
        setFinancialYearDtls("");
        storageKeysToClear.forEach((key) => {
            const envKey = import.meta.env[key];
            if (envKey) removeItemFromStorage(envKey);
        });
        localStorage.clear();
        window.location.href = "/login";
    }, [setAccDtls, setAuthenticatedKey, setFinancialYear, setFinancialYearDtls]);

    // Derive active module info from URL
    const parts = location.pathname.split('/').filter(Boolean);
    const moduleId = parts[1] || '';
    const moduleName = moduleId.charAt(0).toUpperCase() + moduleId.slice(1);
    const moduleColor = moduleColors[moduleId] || undefined;

    return (
        <SidebarProvider style={{ "--sidebar-width": "260px", "--header-height": "56px" }}>

            {/* ── SIDEBAR ───────────────────────────── */}
            <AppSidebar
                sidebarData={sidebarData}
                footerProps={{
                    currentSession: finYear || defaultSession?.value || "",
                    onLogout: handleLogout,
                    onSessionChange: handleSessionChange,
                    portalName: portal.label,
                    sessionOptions,
                    setTheme,
                    theme: getResolvedTheme(theme),
                    user: currentUser,
                }}
            />

            <SidebarInset className="flex flex-col h-screen">

                {/* 🔴 PAYMENT OVERDUE BANNER */}
                {config?.projectLocked && portal.key === "admin" && (
                    <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-center gap-3 text-sm font-medium shrink-0 z-50 shadow-md">
                        <AlertTriangle className="w-5 h-5 animate-pulse" />
                        <span>⚠️ Payment Due: Your subscription has expired or payment is pending.</span>
                        <button
                            onClick={() => alert("Redirecting to payment gateway...")}
                            className="ml-4 bg-white text-red-600 px-3 py-1 rounded-md text-xs font-bold hover:bg-red-50 transition"
                        >
                            Pay Now
                        </button>
                    </div>
                )}

                {/* ── UNIFIED ADMIN HEADER ──────────── */}
                <div className="sticky top-0 z-40 h-14 px-4 border-b bg-background/95 backdrop-blur-md shadow-sm flex items-center w-full shrink-0">
                    <AdminHeader
                        pageTitle={moduleName}
                        moduleColor={moduleColor}
                        showSidebarTrigger={true}
                        showChangeModule={true}
                    />
                </div>

                {/* ── SCROLLABLE CONTENT ────────────── */}
                <div className="flex-1 overflow-y-auto bg-muted/20">
                    <div className="p-4 md:p-6">
                        <Outlet />
                    </div>
                </div>

            </SidebarInset>
        </SidebarProvider>
    );
};

export default AdminLayout;
