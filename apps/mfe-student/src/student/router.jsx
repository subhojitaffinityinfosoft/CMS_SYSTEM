import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLoader } from "shared-ui";

const StudentDashboard = lazy(() => import("./dashboard"));

const Loadable = (Component) => (props) => (
  <Suspense fallback={<AppLoader />}>
    <Component {...props} />
  </Suspense>
);

export default function StudentRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={Loadable(StudentDashboard)({})} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
