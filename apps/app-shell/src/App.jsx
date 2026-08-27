import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "shared-ui/index.css";
import { AppLoader } from "shared-ui";

import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/Studentlayout";
import MainLayout from "./layouts/MainLayout";
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
        path: "admin/*",
        element: <AdminLayout />,
        children: [
          {
            path: "*",
            element: <AdminRouter />,
          },
        ],
      },
      {
        path: "teacher/*",
        element: <TeacherLayout />,
        children: [
          {
            path: "*",
            element: <TeacherRouter />,
          },
        ],
      },
      {
        path: "student/*",
        element: <StudentLayout />,
        children: [
          {
            path: "*",
            element: <StudentRouter />,
          },
        ],
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