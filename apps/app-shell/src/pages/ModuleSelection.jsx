import React from 'react';
import { useModule, useUnit, useSeason } from 'shared-core';
import { ModuleCard } from 'shared-ui';
import { Grid3X3 } from 'lucide-react';

export default function ModuleSelection() {
  const { modules } = useModule();
  const { selectedUnits } = useUnit();
  const { selectedSeason } = useSeason();

  return (
    <div>
      {/* Section title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/10 p-2.5 rounded-xl">
          <Grid3X3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workspace Modules</h2>
          <p className="text-sm text-muted-foreground">
            {selectedUnits?.length > 0
              ? `${selectedUnits.length} unit${selectedUnits.length > 1 ? 's' : ''} · ${selectedSeason?.name || 'No season'}`
              : 'Select a module to get started'}
          </p>
        </div>
      </div>

      {/* Module cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
