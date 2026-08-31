import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLoader } from "shared-ui";

const TeacherDashboard = lazy(() => import("./dashboard"));
const MyClasses = lazy(() => import("./classes"));
const MarkAttendance = lazy(() => import("./attendance"));
const EnterMarks = lazy(() => import("./marks"));

const Loadable = (Component) => (props) => (
  <Suspense fallback={<AppLoader />}>
    <Component {...props} />
  </Suspense>
);

export default function TeacherRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={Loadable(TeacherDashboard)({})} />
      <Route path="classes" element={Loadable(MyClasses)({})} />
      <Route path="attendance" element={Loadable(MarkAttendance)({})} />
      <Route path="marks" element={Loadable(EnterMarks)({})} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
