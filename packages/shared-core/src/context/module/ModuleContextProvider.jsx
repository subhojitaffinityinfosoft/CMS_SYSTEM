import React, { useState } from 'react';
import ModuleContext from './ModuleContext';

// Static Module list — swap route to real paths used in App.jsx
const staticModules = [
  { id: "admission",   name: "Admission",    description: "Manage student admissions & applications", icon: "UserPlus",        color: "#4F46E5", route: "/admin/admission"   },
  { id: "master",      name: "Master Data",  description: "Manage subjects, departments & class setup", icon: "Database",       color: "#8b5cf6", route: "/admin/master"      },
  { id: "transaction", name: "Transaction",  description: "Fee collection, dues & payment tracking",  icon: "Receipt",         color: "#059669", route: "/admin/transaction" },
  { id: "reports",     name: "Reports",      description: "Attendance, results & analytics reports",   icon: "BarChart3",       color: "#D97706", route: "/admin/reports"     },
  { id: "student",     name: "Student",      description: "Student profiles, records and management",  icon: "Users",           color: "#0ea5e9", route: "/admin/student"     },
  { id: "teacher",     name: "Teacher",      description: "Teacher profiles and class assignments",    icon: "GraduationCap",   color: "#10b981", route: "/admin/teacher"     },
];

// Module-specific sidebar menus — routes match AdminRouter sub-paths
const staticModuleMenus = {
  admission: [
    { id: "adm-home",   name: "Dashboard",      route: "/admin/admission"              },
    { id: "adm-apps",   name: "Applications",   route: "/admin/admission/applications" },
    { id: "adm-new",    name: "New Application", route: "/admin/admission/new"         },
  ],
  master: [
    { id: "mst-home",   name: "Overview",       route: "/admin/master", icon: "LayoutDashboard" },
    { 
      id: "mst-sub",    
      name: "Subjects",        
      route: "#",
      icon: "BookOpen",
      items: [
        { id: "mst-sub-list", name: "All Subjects", route: "/admin/master/subjects", icon: "List" },
        { id: "mst-sub-add",  name: "Add New Subject", route: "/admin/master/subjects/new", icon: "PlusCircle" }
      ]
    },
    { 
      id: "mst-dept",   
      name: "Departments",     
      route: "#",
      icon: "Building",
      items: [
        { id: "mst-dept-acad", name: "Academic Setup", route: "#", icon: "GraduationCap", items: [
          { id: "mst-dept-sci", name: "Science", route: "/admin/master/departments/science" },
          { id: "mst-dept-arts", name: "Arts & Humanities", route: "/admin/master/departments/arts" }
        ]},
        { id: "mst-dept-nonacad", name: "Non-Academic", route: "/admin/master/departments/non-academic", icon: "Briefcase" },
        { id: "mst-dept-all", name: "View All", route: "/admin/master/departments", icon: "Eye" }
      ]
    },
  ],
  transaction: [
    { id: "txn-home",   name: "Dashboard",       route: "/admin/transaction"            },
    { id: "txn-fee",    name: "Fee Collection",  route: "/admin/transaction/fee-collection" },
  ],
  reports: [
    { id: "rpt-home",   name: "Summary",         route: "/admin/reports"               },
  ],
  student: [
    { id: "stu-home",   name: "Dashboard",       route: "/admin/student/dashboard"     },
  ],
  teacher: [
    { id: "tch-home",   name: "Dashboard",       route: "/admin/teacher/dashboard"     },
    { id: "tch-class",  name: "My Classes",      route: "/admin/teacher/classes"       },
    { id: "tch-att",    name: "Attendance",      route: "/admin/teacher/attendance"    },
    { id: "tch-marks",  name: "Marks",           route: "/admin/teacher/marks"         },
  ],
};

const ModuleContextProvider = ({ children }) => {
    const [modules] = useState(staticModules);
    const [moduleMenus] = useState(staticModuleMenus);
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
