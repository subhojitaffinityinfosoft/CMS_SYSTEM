import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TeacherDashboard from "./dashboard";

export default function TeacherRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={<TeacherDashboard />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
