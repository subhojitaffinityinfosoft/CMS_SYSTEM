import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "shared-ui/index.css";
import { AppLoader } from "shared-ui";

import MainLayout from "./layouts/MainLayout";
import ERPShellLayout from "./layouts/ERPShellLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/Studentlayout";
import ModuleSelection from "./pages/ModuleSelection";
import CMSLayout from "./layouts/CMSLayout";
import BadRequest from "./errorPage/404-bad-request";
import AdminModuleRoutes from "./routes/AdminModuleRoutes";

// 🚀 HOC for Suspense
const Loadable = (Component) => (props) => (
  <Suspense fallback={<AppLoader />}>
    <Component {...props} />
  </Suspense>
);

// 🟢 Remote MFE imports
const LoginScreen = Loadable(lazy(() => import("app_login/Signin")));
const TeacherRouter = Loadable(lazy(() => import("mfe_teacher/TeacherRouter")));
const StudentRouter = Loadable(lazy(() => import("mfe_student/StudentRouter")));
const CMSRouter = Loadable(lazy(() => import("mfe_cms/CMSRouter")));
const CMSLogin = Loadable(lazy(() => import("mfe_cms/CMSLogin")));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // ─── Auth ────────────────────────────────────────────────────────────
      {
        path: "login",
        element: <LoginScreen />,
      },

      // ─── Admin: dashboard (module picker) + all admin modules ─────────
      {
        path: "admin/dashboard",
        element: <ERPShellLayout />,
        children: [{ path: "", element: <ModuleSelection /> }],
      },
      {
        // All other admin sub-paths delegate to AdminModuleRoutes
        path: "admin/*",
        element: <AdminModuleRoutes />,
      },

      // ─── Teacher (own layout) ─────────────────────────────────────────
      {
        path: "teacher/*",
        element: <TeacherLayout />,
        children: [{ path: "*", element: <TeacherRouter /> }],
      },

      // ─── Student (own layout) ─────────────────────────────────────────
      {
        path: "student/*",
        element: <StudentLayout />,
        children: [{ path: "*", element: <StudentRouter /> }],
      },

      // ─── CMS ──────────────────────────────────────────────────────────
      {
        path: "cms-login",
        element: <CMSLogin />,
      },
      {
        path: "cms/*",
        element: <CMSLayout />,
        children: [{ path: "*", element: <CMSRouter /> }],
      },

      // ─── Fallbacks ────────────────────────────────────────────────────
      {
        path: "",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "*",
        element: <BadRequest />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}