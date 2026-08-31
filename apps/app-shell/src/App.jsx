import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "shared-ui/index.css";
import { AppLoader } from "shared-ui";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const ERPShellLayout = lazy(() => import("./layouts/ERPShellLayout"));
const TeacherLayout = lazy(() => import("./layouts/TeacherLayout"));
const StudentLayout = lazy(() => import("./layouts/Studentlayout"));
const ModuleSelection = lazy(() => import("./pages/ModuleSelection"));
const CMSLayout = lazy(() => import("./layouts/CMSLayout"));
const BadRequest = lazy(() => import("./errorPage/404-bad-request"));
const AdminModuleRoutes = lazy(() => import("./routes/AdminModuleRoutes"));

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
    element: Loadable(MainLayout)({}),
    children: [
      // ─── Auth ────────────────────────────────────────────────────────────
      {
        path: "login",
        element: <LoginScreen />,
      },

      // ─── Admin: dashboard (module picker) + all admin modules ─────────
      {
        path: "admin/dashboard",
        element: Loadable(ERPShellLayout)({}),
        children: [{ path: "", element: Loadable(ModuleSelection)({}) }],
      },
      {
        // All other admin sub-paths delegate to AdminModuleRoutes
        path: "admin/*",
        element: Loadable(AdminModuleRoutes)({}),
      },

      // ─── Teacher (own layout) ─────────────────────────────────────────
      {
        path: "teacher/*",
        element: Loadable(TeacherLayout)({}),
        children: [{ path: "*", element: <TeacherRouter /> }],
      },

      // ─── Student (own layout) ─────────────────────────────────────────
      {
        path: "student/*",
        element: Loadable(StudentLayout)({}),
        children: [{ path: "*", element: <StudentRouter /> }],
      },

      // ─── CMS ──────────────────────────────────────────────────────────
      {
        path: "cms-login",
        element: <CMSLogin />,
      },
      {
        path: "cms/*",
        element: Loadable(CMSLayout)({}),
        children: [{ path: "*", element: <CMSRouter /> }],
      },

      // ─── Fallbacks ────────────────────────────────────────────────────
      {
        path: "",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "*",
        element: Loadable(BadRequest)({}),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}