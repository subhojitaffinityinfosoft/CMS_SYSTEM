import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import { Suspense } from 'react';
import {
  AccountContextProvider,
  CompanyProvider,
  FinancialYearContextProvider,
  StorageContextProvider,
} from "shared-core";
import { AppLoader, ToastProvider, Toaster } from "shared-ui";
import { getMenusByActionURL } from "shared-ui/lib/utils";
import { menuData as rawMenus } from "shared-ui/components/constants/dummy_data";

const SignIn = React.lazy(() => import('app_login/Signin'));
const BadRequest = React.lazy(() => import('./errorPage/404-bad-request'))
const MainLayout = React.lazy(() => import('./layouts/MainLayout'))
const StudentLayout = React.lazy(() => import('./layouts/Studentlayout'));
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));
const StudentDashboard = React.lazy(() => import('mfe_student/Dashboard'));
const AdminDashboard = React.lazy(() => import('mfe_admin/Dashboard'));
const TeacherDashboard = React.lazy(() => import('mfe_teacher/Dashboard'));
const PortalPlaceholder = React.lazy(() => import('./components/PortalPlaceholder'));

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignIn />
    },
    {
      path: '404-bad-request',
      element: <BadRequest />
    },
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: '/student',
          element: <StudentLayout />,
          children: [
            {
              index: true,
              element: <StudentDashboard />,
              loader: ({ request }) => {
                const url = new URL(request.url);
                const data = getMenusByActionURL(url.pathname, rawMenus)
                console.log(data)
                if (!data) {
                  return redirect("/404-bad-request");
                }
                return data ? data : null
              },
            },
          ]
        },
        {
          path: '/admin-outlet',
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
          ]
        },
        {
          path: '/teacher-outlet',
          element: <AdminLayout />,
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
  ])
  return (
    <>
      <StorageContextProvider>
        <ToastProvider>
          <Toaster />
          <AccountContextProvider>
            <FinancialYearContextProvider>
              {/* <ApplicationMenuContextProvider> */}
              <CompanyProvider>
                <Suspense fallback={<AppLoader background="bg-background" />}>
                  <RouterProvider router={router} />
                </Suspense>
              </CompanyProvider>
              {/* </ApplicationMenuContextProvider> */}
            </FinancialYearContextProvider>
          </AccountContextProvider>
        </ToastProvider>
      </StorageContextProvider>
    </>
  )
}

export default App

