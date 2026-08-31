import React, { useState } from 'react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Checkbox } from './checkbox';
import { ScrollArea } from './scroll-area';

const mockUnits = [
  { id: 1, name: "Main Campus", code: "MC" },
  { id: 2, name: "Science Campus", code: "SC" },
  { id: 3, name: "Management Campus", code: "MG" }
];

export function UnitMultiSelect({ selectedUnits = [], onChange }) {
  const [open, setOpen] = useState(false);

  const toggleUnit = (unit) => {
    const isSelected = selectedUnits.some(u => u.id === unit.id);
    if (isSelected) {
      onChange(selectedUnits.filter(u => u.id !== unit.id));
    } else {
      onChange([...selectedUnits, unit]);
    }
  };

  const getDisplayText = () => {
    if (!selectedUnits || selectedUnits.length === 0) return "Select Units";
    if (selectedUnits.length === 1) return selectedUnits[0].name;
    return `${selectedUnits[0].name} + ${selectedUnits.length - 1}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {getDisplayText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ScrollArea className="h-[200px] p-4">
          <div className="space-y-4">
            {mockUnits.map((unit) => (
              <div key={unit.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`unit-${unit.id}`}
                  checked={selectedUnits.some(u => u.id === unit.id)}
                  onCheckedChange={() => toggleUnit(unit)}
                />
                <label
                  htmlFor={`unit-${unit.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {unit.name}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
