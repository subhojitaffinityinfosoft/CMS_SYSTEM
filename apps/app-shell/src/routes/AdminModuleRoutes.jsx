import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLoader } from "shared-ui";
import AdminLayout from "../layouts/AdminLayout";

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
      {/* Each module gets AdminLayout as its wrapper (uses <Outlet> internally) */}
      <Route element={<AdminLayout />}>
        <Route path="admission/*" element={<AdminRouter />} />
        <Route path="master/*" element={<AdminRouter />} />
        <Route path="transaction/*" element={<AdminRouter />} />
        <Route path="reports/*" element={<AdminRouter />} />
        <Route path="student/*" element={<StudentRouter />} />
        <Route path="teacher/*" element={<TeacherRouter />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}
