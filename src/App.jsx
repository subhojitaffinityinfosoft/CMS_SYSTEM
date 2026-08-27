import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import { CompanyProvider } from './context/companyDetails/CompanyProvider';
import { ToastProvider } from './components/ui/toast';
import { Toaster } from './components/ui/toaster';
import StorageContextProvider from './context/storage/StorageContextProvider';
import { Suspense } from 'react';
import { AppLoader } from "shared-ui";
import AccountContextProvider from './context/account/AccountCOntextProvider';
import FinancialYearContextProvider from './context/financialYear/FinancialYearCOntextProvider';
import { getMenusByActionURL } from './lib/utils';
import { menuData as rawMenus } from './components/constants/dummy_data';
const Auth = React.lazy(() => import('@/screens/auth/Layout'));
const SignIn = React.lazy(() => import('@/screens/auth/Signin'));
const BadRequest = React.lazy(() => import('@/screens/errorPage/404-bad-request'))
const MainLayout = React.lazy(() => import('@/layouts/MainLayout'))
const Practice = React.lazy(() => import('@/screens/main/Practice/Practice'))
const StudentLayout = React.lazy(() => import('./layouts/Studentlayout'));
const StudentDashboard = React.lazy(() => import('@/screens/main/student/dashboard'));
const AdminLayout = React.lazy(() => import('@/layouts/AdminLayout'));
const AdminDashboard = React.lazy(() => import('@/screens/main/admin/dashboard/index'));
const TeacherOutlet = React.lazy(() => import('@/layouts/TeacherLayout'));
const TeacherDashboard = React.lazy(() => import('@/screens/main/teacher/dashboard/index'));
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
      path: '404-bad-request',
      element: <BadRequest />
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
          path: '/outlet',
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

