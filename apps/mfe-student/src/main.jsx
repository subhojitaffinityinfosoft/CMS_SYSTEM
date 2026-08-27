import React from "react";
import ReactDOM from "react-dom/client";
import "shared-ui/index.css";
import StudentDashboard from "./student/dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudentDashboard />
  </React.StrictMode>
);
