import React from "react";
import {
  BookOpenTextIcon,
  Building2Icon,
  FileIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { getInitials } from "@/lib/utils";

const FALLBACK_ICON = FileIcon;
const EXTERNAL_LINK_PATTERN = /^https?:\/\//i;

const portalConfigMap = {
  admin: {
    key: "admin",
    label: "Admin Portal",
    homeUrl: "/admin",
    settingsUrl: "/admin/settings",
    companyFallback: "General College",
    icon: Building2Icon,
    userFallback: "Admin User",
  },
  teacher: {
    key: "teacher",
    label: "Teacher Portal",
    homeUrl: "/teacher",
    settingsUrl: "/teacher/settings",
    companyFallback: "General College",
    icon: GraduationCapIcon,
    userFallback: "Teacher User",
    menus: [
      { id: "tch-dash",  title: "Dashboard",   url: "/teacher/dashboard",  icon: "dashboard"  },
      { id: "tch-class", title: "My Classes",   url: "/teacher/classes",    icon: "teacher"    },
      { id: "tch-att",   title: "Attendance",   url: "/teacher/attendance", icon: "dashboard"  },
      { id: "tch-marks", title: "Marks Entry",  url: "/teacher/marks",     icon: "dashboard"  },
    ]
  },
  student: {
    key: "student",
    label: "Student Portal",
    homeUrl: "/student",
    settingsUrl: "/student/settings",
    companyFallback: "CMS System",
    icon: BookOpenTextIcon,
    userFallback: "Student User",
  },
  cms: {
    key: "cms",
    label: "Master CMS Portal",
    homeUrl: "/cms/dashboard",
    settingsUrl: "/cms/setup",
    companyFallback: "CMS System",
    icon: SettingsIcon,
    userFallback: "Super Admin",
    menus: [
      {
        id: "cms-dash",
        title: "Dashboard",
        url: "/cms/dashboard",
        icon: "LayoutDashboardIcon",
      },
      {
        id: "cms-setup",
        title: "Website Setup",
        url: "/cms/setup",
        icon: "SettingsIcon",
      },
      {
        id: "cms-tx",
        title: "Transactions",
        url: "/cms/transactions",
        icon: "BanknoteIcon",
      }
    ]
  }
};

const iconMap = {
  admin: Building2Icon,
  dashboard: LayoutDashboardIcon,
  settings: SettingsIcon,
  search: SearchIcon,
  teacher: GraduationCapIcon,
  user: UserIcon,
};

const normalizeIconKey = (iconName = "") =>
  iconName.replace(/icon$/i, "").replace(/[\s_-]+/g, "").toLowerCase();

const getItemTitle = (item = {}) =>
  item.title ?? item.name ?? item.menu_name ?? item.menuName ?? item.menu ?? "Untitled";

const getItemChildren = (item = {}) =>
  item.items ?? item.children ?? item.sub_menu ?? item.subMenu ?? item.submenu ?? [];

const getSortValue = (item = {}, fallback = Number.MAX_SAFE_INTEGER) =>
  item.group ??
  item.display_position ??
  item.displayPosition ??
  item.order ??
  item.sortOrder ??
  fallback;

export const resolveSidebarIcon = (icon) => {
  if (React.isValidElement(icon)) {
    return icon;
  }

  if (typeof icon === "function" || (typeof icon === "object" && icon !== null)) {
    return icon;
  }

  if (typeof icon === "string") {
    return iconMap[normalizeIconKey(icon)] ?? FALLBACK_ICON;
  }

  return FALLBACK_ICON;
};

export const renderSidebarIcon = (icon, props = {}) => {
  if (!icon) {
    return null;
  }

  if (React.isValidElement(icon)) {
    return icon;
  }

  const Icon = resolveSidebarIcon(icon);

  return React.createElement(Icon, props);
};

export const isExternalSidebarUrl = (url = "") => EXTERNAL_LINK_PATTERN.test(url);

export const hasSidebarChildren = (item = {}) => Boolean(item.items?.length);

export const isSidebarItemClickable = (item = {}) =>
  Boolean(item.url && item.url !== "#" && !item.disabled);

export const isSidebarLinkDisabled = (item = {}) =>
  item.disabled || (!isSidebarItemClickable(item) && !hasSidebarChildren(item));

export const isSidebarItemActive = (pathname, item = {}) => {
  const currentPath = pathname?.replace(/\/+$/, "") || "/";
  const itemPath = item.url?.replace(/\/+$/, "") || "";
  const hasDirectMatch =
    itemPath &&
    itemPath !== "#" &&
    !isExternalSidebarUrl(itemPath) &&
    (currentPath === itemPath || currentPath.startsWith(`${itemPath}/`));

  if (hasDirectMatch) {
    return true;
  }

  return (item.items ?? []).some((child) => isSidebarItemActive(pathname, child));
};

const findActiveItem = (pathname, items = []) => {
  for (const item of items) {
    const activeChild = findActiveItem(pathname, item.items ?? []);

    if (activeChild) {
      return activeChild;
    }

    if (isSidebarItemActive(pathname, { ...item, items: [] })) {
      return item;
    }
  }

  return null;
};

const formatPathTitle = (pathname = "") => {
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  if (!lastSegment || lastSegment.endsWith("outlet")) {
    return "Dashboard";
  }

  return lastSegment
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

export const getSidebarPageTitle = (pathname, sidebarData) => {
  const sections = [
    ...(sidebarData?.navMain ?? []),
    ...(sidebarData?.documents ?? []),
    ...(sidebarData?.navSecondary ?? []),
  ];

  return findActiveItem(pathname, sections)?.title ?? formatPathTitle(pathname);
};

export const getPortalConfig = (pathname = "") => {
  if (pathname.startsWith("/teacher")) {
    return portalConfigMap.teacher;
  }

  if (pathname.startsWith("/student")) {
    return portalConfigMap.student;
  }

  if (pathname.startsWith("/cms")) {
    return portalConfigMap.cms;
  }

  return portalConfigMap.admin;
};

const resolvePortalUrl = (url, basePath) => {
  if (!url || url === "#") {
    return "";
  }

  if (isExternalSidebarUrl(url)) {
    return url;
  }

  if (url === "/" || url === basePath) {
    return basePath;
  }

  const normalizedBase = basePath.replace(/\/+$/, "");
  const normalizedPath = url.replace(/^\/+/, "");

  if (normalizedPath.startsWith(normalizedBase.replace(/^\/+/, ""))) {
    return `/${normalizedPath}`;
  }

  return `${normalizedBase}/${normalizedPath}`;
};

const normalizeSidebarItem = (item = {}, basePath) => {
  const children = [...getItemChildren(item)]
    .filter((child) => child?.active !== false)
    .sort((left, right) => {
      const sortDiff = getSortValue(left) - getSortValue(right);

      if (sortDiff !== 0) {
        return sortDiff;
      }

      return getItemTitle(left).localeCompare(getItemTitle(right));
    })
    .map((child) => normalizeSidebarItem(child, basePath));

  const rawUrl =
    item.url ??
    item.link ??
    item.route ??
    item.actionUrl ??
    item["router-link"] ??
    "";

  return {
    id:
      item.id ??
      item.menuId ??
      item.name ??
      item.title ??
      item.menu_name ??
      item.menuName ??
      item.menu,
    title: getItemTitle(item),
    url: resolvePortalUrl(rawUrl, basePath),
    icon: resolveSidebarIcon(item.icon),
    disabled:
      item.disabled === true || item.active === false || (!rawUrl && !children.length),
    items: children,
  };
};

export const buildSidebarMenus = ({ menus = [], pathname = "/" }) => {
  const portal = getPortalConfig(pathname);
  const activeMenus = portal.menus ? portal.menus : menus;

  return [...activeMenus]
    .filter((item) => item?.active !== false)
    .sort((left, right) => {
      const sortDiff = getSortValue(left) - getSortValue(right);

      if (sortDiff !== 0) {
        return sortDiff;
      }

      return getItemTitle(left).localeCompare(getItemTitle(right));
    })
    .map((item) => normalizeSidebarItem(item, portal.homeUrl));
};

export const createPortalUser = ({ user, portal, companyName }) => {
  const resolvedName =
    user?.name ??
    user?.fullName ??
    user?.userName ??
    user?.displayName ??
    portal.userFallback;

  return {
    name: resolvedName,
    email: user?.email ?? user?.userEmail ?? `${portal.key}@${companyName.toLowerCase().replace(/\s+/g, "")}.local`,
    avatar: user?.photoName ?? user?.avatar ?? user?.profilePhoto ?? "",
    initials: user?.initialName ?? user?.initials ?? getInitials(resolvedName),
  };
};

export const buildPortalSessionOptions = () => {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: 4 }, (_, index) => {
    const startYear = currentYear - 1 + index;
    const endYear = startYear + 1;
    const value = `${startYear}-${endYear}`;

    return {
      id: value,
      label: value,
      value,
      isCurrent: startYear === currentYear,
    };
  });
};

export const createPortalSidebarData = ({
  pathname = "/",
  menus = [],
  companyName,
  user,
}) => {
  const portal = getPortalConfig(pathname);
  const resolvedCompanyName = companyName || portal.companyFallback;

  return {
    portal,
    brand: {
      name: resolvedCompanyName,
      subtitle: portal.label,
      url: portal.homeUrl,
      icon: portal.icon,
    },
    user,
    navMain: buildSidebarMenus({ menus, pathname }),
    documents: [],
    navSecondary: [],
    showFooterUser: true,
  };
};
