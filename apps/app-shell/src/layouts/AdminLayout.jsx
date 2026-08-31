import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
    buildPortalSessionOptions,
    createPortalUser,
    getPortalConfig,
} from "@/components/constants/sidebar-data";
import { useTheme } from "@/components/theme-provider";
import { ModuleMenuBar } from "@/components/ui/module-menu-bar";
import { AlertTriangle, LayoutDashboardIcon } from "lucide-react";
import {
    useAccount,
    useFinancialYear,
    useCompany,
    useModule,
} from "shared-core";
import StorageContext from "shared-core/context/storage/StorageContext";
import { getStorageData, removeItemFromStorage } from "@/lib/Storage";
import { AdminHeader } from "shared-ui";

const storageKeysToClear = ["VITE_AU_TK", "VITE_COMP_NAME", "VITE_ROLE_ID", "VITE_USER_ID", "VITE_USER_TYPE", "VITE_EMPLOYEE_ID"];

const getResolvedTheme = (theme) => {
    if (theme !== "system") return theme;
    if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) return "dark";
    return "light";
};



const AdminLayout = () => {
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const { acc_dtls, setAccDtls } = useAccount();
    const { finYear, setFinancialYear, setFinancialYearDtls } = useFinancialYear();
    const { setAuthenticatedKey } = useContext(StorageContext);
    const { config } = useCompany();
    const { moduleMenus, getModuleById } = useModule();

    const portal = React.useMemo(() => getPortalConfig(location.pathname), [location.pathname]);
    const sessionOptions = React.useMemo(() => buildPortalSessionOptions(), []);
    const defaultSession = sessionOptions.find((s) => s.isCurrent) ?? sessionOptions[0] ?? null;

    React.useEffect(() => {
        if (!finYear && defaultSession) {
            setFinancialYear(defaultSession.value);
            setFinancialYearDtls(defaultSession);
        }
    }, [defaultSession, finYear, setFinancialYear, setFinancialYearDtls]);

    const companyName = config?.companyName || getStorageData(import.meta.env.VITE_COMP_NAME) || "General College";
    const currentUser = React.useMemo(
        () => createPortalUser({ user: acc_dtls, portal, companyName }),
        [acc_dtls, companyName, portal]
    );

    // Determine active module from URL: /admin/<moduleId>/...
    const pathParts = location.pathname.split('/').filter(Boolean);
    const moduleId = pathParts[1] || '';
    const moduleName = moduleId.charAt(0).toUpperCase() + moduleId.slice(1);
    
    // Get dynamic color from module config
    const activeModule = getModuleById(moduleId);
    const moduleColor = activeModule?.color || "#134074";

    // Build sidebar navMain from the module's menu config recursively
    const mapMenuItems = (items) => {
        if (!items) return [];
        return items.map((item, idx) => ({
            id: item.id,
            title: item.name,
            url: item.route,
            icon: item.icon || LayoutDashboardIcon,
            badge: item.badge,
            display_position: idx + 1,
            items: mapMenuItems(item.items),
        }));
    };

    const activeMenuItems = mapMenuItems(moduleMenus[moduleId]);

    const sidebarData = {
        portal,
        brand: { name: companyName, subtitle: moduleName + " Module", url: "/admin/dashboard", icon: portal.icon },
        user: currentUser,
        navMain: activeMenuItems,
        documents: [],
        navSecondary: [],
        showFooterUser: true,
    };

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

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-muted/20">

            {/* 🔴 Payment overdue banner */}
            {config?.projectLocked && (
                <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-center gap-3 text-sm font-medium shrink-0 z-50">
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                    <span>⚠️ Payment Due: Subscription expired or payment pending.</span>
                    <button onClick={() => alert("Redirecting...")} className="ml-4 bg-white text-red-600 px-3 py-1 rounded-md text-xs font-bold hover:bg-red-50 transition">
                        Pay Now
                    </button>
                </div>
            )}

            {/* ── UNIFIED ADMIN HEADER ──────────────── */}
            <div className="z-40 h-14 px-4 border-b bg-background shadow-sm flex items-center w-full shrink-0">
                <AdminHeader
                    pageTitle={moduleName}
                    moduleColor={moduleColor}
                    showSidebarTrigger={false} // Sidebar is gone!
                    showChangeModule={true}
                />
            </div>

            {/* ── HORIZONTAL MEGA MENU (Replacing Sidebar) ────── */}
            <ModuleMenuBar 
                moduleColor={moduleColor} 
                menuItems={activeMenuItems} 
            />

            {/* ── SCROLLABLE CONTENT ────────────────── */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-6">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default AdminLayout;
