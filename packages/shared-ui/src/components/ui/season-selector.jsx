import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { CalendarDays } from 'lucide-react';
import { Badge } from './badge';

const mockSeasons = [
  { id: 1, name: "2026-27", isCurrent: true },
  { id: 2, name: "2025-26", isCurrent: false },
  { id: 3, name: "2024-25", isCurrent: false }
];

export function SeasonSelector({ selectedSeason, onChange, fullWidth = false }) {
  return (
    <Select
      value={selectedSeason?.id?.toString() || ""}
      onValueChange={(val) => {
        const season = mockSeasons.find(s => s.id.toString() === val);
        onChange(season);
      }}
    >
      <SelectTrigger
        className={`${fullWidth ? 'w-full' : 'w-[160px]'} h-10 bg-white hover:bg-gray-50 border-gray-200 shadow-sm transition-colors`}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4 shrink-0" />
          <SelectValue placeholder="Select Season" />
        </div>
      </SelectTrigger>
      <SelectContent className="shadow-lg border-gray-200">
        {mockSeasons.map((season) => (
          <SelectItem key={season.id} value={season.id.toString()} className="cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="font-medium">{season.name}</span>
              {season.isCurrent && (
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] bg-green-100 text-green-700 hover:bg-green-100">
                  Current
                </Badge>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
