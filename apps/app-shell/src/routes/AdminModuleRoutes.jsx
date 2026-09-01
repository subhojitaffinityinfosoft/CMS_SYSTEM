import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLoader } from "shared-ui";
import AdminLayout from "../layouts/AdminLayout";
import ERPShellLayout from "../layouts/ERPShellLayout";
import ModuleSelection from "../pages/ModuleSelection";

const Loadable = (Component) => (props) => (
  <Suspense fallback={<AppLoader />}>
    <Component {...props} />
  </Suspense>
);

const AdminRouter = Loadable(lazy(() => import("mfe_admin/AdminRouter")));
const TeacherRouter = Loadable(lazy(() => import("mfe_teacher/TeacherRouter")));
const StudentRouter = Loadable(lazy(() => import("mfe_student/StudentRouter")));

/**
 * AdminModuleRoutes
 * Lives in app-shell so it can use shell layouts.
 * Owns all the admin-scope module routing.
 * App.jsx just mounts this at /admin/* so it stays clean.
 */
export default function AdminModuleRoutes() {
  return (
    <Routes>
      <Route element={<ERPShellLayout />}>
        <Route path="dashboard" element={<ModuleSelection />} />
      </Route>
      
      {/* Each module gets AdminLayout as its wrapper (uses <Outlet> internally) */}
      <Route element={<AdminLayout />}>
        <Route path="student/*" element={<StudentRouter />} />
        <Route path="teacher/*" element={<TeacherRouter />} />
        
        {/* 
          AdminRouter internally defines routes for "admission", "master", 
          "transaction", "reports", and "dashboard".
          We delegate all remaining /admin/* paths to AdminRouter here.
        */}
        <Route path="*" element={<AdminRouter />} />
      </Route>
    </Routes>
  );
}
