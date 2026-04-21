import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastProvider } from './components/ui/toast';
import { Toaster } from './components/ui/toaster';
import StorageContextProvider from './context/storage/StorageContextProvider';
import { Suspense } from 'react';
import AppLoader from './components/ux/AppLoader';
import AccountContextProvider from './context/account/AccountCOntextProvider';
import FinancialYearContextProvider from './context/financialYear/FinancialYearCOntextProvider';
const Auth = React.lazy(() => import('@/screens/auth/Layout'));
const SignIn = React.lazy(() => import('@/screens/auth/Signin'));
const MainLayout = React.lazy(() => import('@/layouts/MainLayout'))
const Practice = React.lazy(() => import('@/screens/main/Practice/Practice'))
const StudentLayout = React.lazy(() => import('./layouts/Studentlayout'));
const StudentDashboard = React.lazy(() => import('@/screens/main/student/dashboard'));
const AdminLayout = React.lazy(() => import('@/layouts/AdminLayout'));
const AdminDashboard = React.lazy(() => import('@/screens/main/admin/dashboard/index'));
const TeacherOutlet = React.lazy(() => import('@/layouts/TeacherLayout'));
const TeacherDashboard = React.lazy(() => import('@/screens/main/teacher/dashboard/index'))
const PortalPlaceholder = React.lazy(() => import('@/screens/main/shared/PortalPlaceholder'));

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Auth />,
      children: [
        {
          index: true,
          element: <SignIn />
        },
      ]
    },
    {
      path: 'practice',
      element: <Practice />
    },
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: 'student',
          element: <StudentLayout />,
          children: [
            {
              index: true,
              element: <StudentDashboard />
            },
          ]
        },
        {
          path: 'outlet',
          element: <AdminLayout />,
          children: [
            {
              index: true,
              element: <AdminDashboard />
            },
            {
              path: '*',
              element: <PortalPlaceholder />
            },
            {
              path: 'teacher-outlet',
              element: <TeacherOutlet />,
              children: [
                {
                  index: true,
                  element: <TeacherDashboard />
                },
                {
                  path: '*',
                  element: <PortalPlaceholder />
                },
              ]
            },
          ]
        },
      ]
    },
  ])

  return (
    <>
      <StorageContextProvider>
        <ToastProvider>
          <Toaster />
          <AccountContextProvider>
            <FinancialYearContextProvider>
              {/* <ApplicationMenuContextProvider> */}
              <Suspense fallback={<AppLoader background="bg-background" />}>
                <RouterProvider router={router} />
              </Suspense>
              {/* </ApplicationMenuContextProvider> */}
            </FinancialYearContextProvider>
          </AccountContextProvider>
        </ToastProvider>
      </StorageContextProvider>
    </>
  )
}

export default App

