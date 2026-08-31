import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "shared-ui/index.css";
import { AppLoader } from "shared-ui";

import MainLayout from "./layouts/MainLayout";
import ERPShellLayout from "./layouts/ERPShellLayout";
import CollegeSelection from "./pages/CollegeSelection";
import ModuleSelection from "./pages/ModuleSelection";
import CMSLayout from "./layouts/CMSLayout";
import BadRequest from "./errorPage/404-bad-request";

// 🚀 HOC for Suspense
const Loadable = (Component) => (props) => (
  <Suspense fallback={<AppLoader />}>
    <Component {...props} />
  </Suspense>
);

// 🟢 Asynchronous Dynamic Remote Imports wrapped in Loadable
const LoginScreen = Loadable(lazy(() => import("app_login/Signin")));
const AdminRouter = Loadable(lazy(() => import("mfe_admin/AdminRouter")));
const TeacherRouter = Loadable(lazy(() => import("mfe_teacher/TeacherRouter")));
const StudentRouter = Loadable(lazy(() => import("mfe_student/StudentRouter")));
const CMSRouter = Loadable(lazy(() => import("mfe_cms/CMSRouter")));
const CMSLogin = Loadable(lazy(() => import("mfe_cms/CMSLogin")));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "login",
        element: <LoginScreen />,
      },
      {
        path: "college-selection",
        element: <CollegeSelection />,
      },
      {
        path: "app",
        element: <ERPShellLayout />,
        children: [
          {
            path: "dashboard",
            element: <ModuleSelection />
          },
          {
            path: "admission/*",
            element: <AdminRouter /> // Mapping admin to admission temporarily
          },
          {
            path: "master/*",
            element: <AdminRouter /> // Reuse AdminRouter for master module mapping if needed
          },
          {
            path: "student/*",
            element: <StudentRouter />
          },
          {
            path: "teacher/*",
            element: <TeacherRouter />
          },
          {
            path: "transaction/*",
            element: <AdminRouter /> // Adjust mapping to appropriate module later
          },
          {
            path: "reports/*",
            element: <AdminRouter /> // Adjust mapping to appropriate module later
          },
          {
            path: "",
            element: <Navigate to="/app/dashboard" replace />
          }
        ]
      },
      {
        path: "cms-login",
        element: <CMSLogin />,
      },
      {
        path: "cms/*",
        element: <CMSLayout />,
        children: [
          {
            path: "*",
            element: <CMSRouter />,
          },
        ],
      },
      {
        path: "",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "*",
        element: <BadRequest />,
      },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}