import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from 'shared-ui';

export default function ERPShellLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">

      {/* UNIFIED ADMIN HEADER — dashboard mode (no sidebar, no module breadcrumb) */}
      <div className="sticky top-0 z-40 h-14 px-4 border-b bg-white/80 backdrop-blur-md shadow-sm flex items-center w-full shrink-0">
        <AdminHeader
          pageTitle="Module Dashboard"
          showSidebarTrigger={false}
          showChangeModule={false}
        />
      </div>

      {/* MODULE CARDS CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
