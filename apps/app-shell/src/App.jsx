import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "shared-ui/index.css";
import { AppLoader } from "shared-ui";

import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/Studentlayout";
import MainLayout from "./layouts/MainLayout";
import BadRequest from "./errorPage/404-bad-request";

// 🟢 Asynchronous Dynamic Remote Imports
const LoginScreen = lazy(() => import("app_login/Signin"));
const AdminDashboard = lazy(() => import("mfe_admin/AdminDashboard"));
const TeacherDashboard = lazy(() => import("mfe_teacher/TeacherDashboard"));
const StudentDashboard = lazy(() => import("mfe_student/StudentDashboard"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<AppLoader />}>
        <LoginScreen />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<AppLoader />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/teacher",
    element: <TeacherLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<AppLoader />}>
            <TeacherDashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<AppLoader />}>
            <StudentDashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "*",
    element: <BadRequest />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}