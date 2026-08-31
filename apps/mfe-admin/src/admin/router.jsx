import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLoader } from "shared-ui";

// Admission
const AdmissionDashboard = lazy(() => import("./admission"));
const ApplicationsList = lazy(() => import("./admission/applications"));
const NewApplication = lazy(() => import("./admission/new-application"));

// Master
const MasterDashboard = lazy(() => import("./master"));
const SubjectsList = lazy(() => import("./master/subjects"));
const DepartmentsList = lazy(() => import("./master/departments"));

// Transaction
const TransactionDashboard = lazy(() => import("./transaction"));
const FeeCollection = lazy(() => import("./transaction/fee-collection"));

// Reports
const ReportsDashboard = lazy(() => import("./reports"));

// Default admin dashboard
const AdminDashboard = lazy(() => import("./dashboard"));

const Loadable = (Component) => (props) => (
  <Suspense fallback={<AppLoader />}>
    <Component {...props} />
  </Suspense>
);

export default function AdminRouter() {
  return (
    <Routes>
      {/* Default */}
      <Route path="dashboard" element={Loadable(AdminDashboard)({})} />

      {/* Admission module */}
      <Route path="admission">
        <Route index element={Loadable(AdmissionDashboard)({})} />
        <Route path="applications" element={Loadable(ApplicationsList)({})} />
        <Route path="new" element={Loadable(NewApplication)({})} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>

      {/* Master module */}
      <Route path="master">
        <Route index element={Loadable(MasterDashboard)({})} />
        <Route path="subjects" element={Loadable(SubjectsList)({})} />
        <Route path="departments" element={Loadable(DepartmentsList)({})} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>

      {/* Transaction module */}
      <Route path="transaction">
        <Route index element={Loadable(TransactionDashboard)({})} />
        <Route path="fee-collection" element={Loadable(FeeCollection)({})} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>

      {/* Reports module */}
      <Route path="reports">
        <Route index element={Loadable(ReportsDashboard)({})} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
