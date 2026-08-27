import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from "./dashboard";

export default function StudentRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
