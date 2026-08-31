import React from 'react';
import { useModule, useCollege, useAccount } from 'shared-core';
import { ModuleCard } from 'shared-ui';

export default function ModuleSelection() {
  const { modules } = useModule();
  const { selectedCollege } = useCollege();
  const { acc_dtls } = useAccount();

  // In a real scenario, filter modules based on user permissions
  // const permittedModules = modules.filter(m => userPermissions.includes(m.id));
  const permittedModules = modules;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {acc_dtls?.name || 'User'}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          {selectedCollege?.name} ERP System
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          Available Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {permittedModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}
