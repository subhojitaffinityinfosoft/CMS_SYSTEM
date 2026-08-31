import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

const mockSeasons = [
  { id: 1, name: "2026-27", isCurrent: true },
  { id: 2, name: "2025-26", isCurrent: false },
  { id: 3, name: "2024-25", isCurrent: false }
];

export function SeasonSelector({ selectedSeason, onChange }) {
  return (
    <Select
      value={selectedSeason?.id?.toString() || ""}
      onValueChange={(val) => {
        const season = mockSeasons.find(s => s.id.toString() === val);
        onChange(season);
      }}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select Season" />
      </SelectTrigger>
      <SelectContent>
        {mockSeasons.map((season) => (
          <SelectItem key={season.id} value={season.id.toString()}>
            {season.name} {season.isCurrent ? "(Current)" : ""}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
