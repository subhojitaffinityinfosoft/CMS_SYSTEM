import React, { useState } from 'react';
import ModuleContext from './ModuleContext';

// Static Data for Modules
const staticModules = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "College overview and key information",
    icon: "LayoutDashboard",
    color: "#6366f1", // Indigo
    route: "/admin/dashboard"
  },
  {
    id: "admission",
    name: "Admission",
    description: "Manage student admissions",
    icon: "UserPlus",
    color: "#4F46E5",
    route: "/admin/admission"
  },
  {
    id: "student",
    name: "Student",
    description: "Manage students",
    icon: "Users",
    color: "#0ea5e9", // Sky
    route: "/admin/student"
  },
  {
    id: "teacher",
    name: "Teacher",
    description: "Manage teachers",
    icon: "GraduationCap",
    color: "#10b981", // Emerald
    route: "/admin/teacher"
  },
  {
    id: "transaction",
    name: "Transaction",
    description: "Manage college transactions",
    icon: "Receipt",
    color: "#059669",
    route: "/admin/transaction"
  },
  {
    id: "master",
    name: "Master",
    description: "Manage master information",
    icon: "Database",
    color: "#8b5cf6", // Violet
    route: "/admin/master"
  },
  {
    id: "reports",
    name: "Reports",
    description: "View college reports",
    icon: "BarChart3",
    color: "#D97706",
    route: "/admin/reports"
  }
];

// Static Data for Module Menus
const staticModuleMenus = {
  dashboard: [
    { id: "overview", name: "Overview", route: "/admin/dashboard" }
  ],
  admission: [
    { id: "admission-dashboard", name: "Dashboard", route: "/admin/admission" },
    { id: "applications", name: "Applications", route: "/admin/admission/applications" },
    { id: "verification", name: "Verification", route: "/admin/admission/verification" }
  ],
  student: [
    { id: "student-dashboard", name: "Dashboard", route: "/admin/student" },
    { id: "student-list", name: "Student List", route: "/admin/student/list" }
  ],
  teacher: [
    { id: "teacher-dashboard", name: "Dashboard", route: "/admin/teacher" }
  ],
  transaction: [
    { id: "transaction-dashboard", name: "Dashboard", route: "/admin/transaction" }
  ],
  master: [
    { id: "master-dashboard", name: "Dashboard", route: "/admin/master" }
  ],
  reports: [
    { id: "reports-dashboard", name: "Dashboard", route: "/admin/reports" }
  ]
};

const ModuleContextProvider = ({ children }) => {
    // In the future, this could fetch from API
    const [modules, setModules] = useState(staticModules);
    const [moduleMenus, setModuleMenus] = useState(staticModuleMenus);
    
    // Also track the currently active module, e.g. for header styling
    const [activeModuleId, setActiveModuleId] = useState(null);

    const getModuleById = (id) => modules.find(m => m.id === id);
    const getActiveModule = () => modules.find(m => m.id === activeModuleId);
    const getActiveModuleMenu = () => moduleMenus[activeModuleId] || [];

    return (
        <ModuleContext.Provider value={{ 
            modules, 
            moduleMenus, 
            activeModuleId, 
            setActiveModuleId, 
            getModuleById,
            getActiveModule,
            getActiveModuleMenu
        }}>
            {children}
        </ModuleContext.Provider>
    );
};

export default ModuleContextProvider;
export const useModule = () => React.useContext(ModuleContext);
