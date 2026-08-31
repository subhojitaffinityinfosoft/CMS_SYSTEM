import React, { useState, useMemo } from 'react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Checkbox } from './checkbox';
import { ScrollArea } from './scroll-area';
import { Input } from './input';
import { Search, ChevronDown, CheckSquare, Square, X } from 'lucide-react';
import { Badge } from './badge';

const mockUnits = [
  { id: 1, name: "Main Campus", code: "MC" },
  { id: 2, name: "Science Campus", code: "SC" },
  { id: 3, name: "Management Campus", code: "MG" },
  { id: 4, name: "Engineering Campus", code: "EC" },
  { id: 5, name: "Commerce Campus", code: "CC" }
];

export function UnitMultiSelect({ selectedUnits = [], onChange, fullWidth = false }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUnits = useMemo(() => {
    if (!searchQuery) return mockUnits;
    const lowerQuery = searchQuery.toLowerCase();
    return mockUnits.filter(u => 
      u.name.toLowerCase().includes(lowerQuery) || 
      u.code.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const toggleUnit = (unit) => {
    const isSelected = selectedUnits.some(u => u.id === unit.id);
    if (isSelected) {
      onChange(selectedUnits.filter(u => u.id !== unit.id));
    } else {
      onChange([...selectedUnits, unit]);
    }
  };

  const selectAll = () => {
    onChange(mockUnits);
  };

  const clearAll = () => {
    onChange([]);
    setSearchQuery('');
  };

  const getDisplayText = () => {
    if (!selectedUnits || selectedUnits.length === 0) return <span className="text-muted-foreground font-normal">Select Units...</span>;
    if (selectedUnits.length === 1) return <span className="truncate">{selectedUnits[0].name}</span>;
    return (
      <div className="flex items-center gap-1 overflow-hidden">
        <span className="truncate font-medium">{selectedUnits[0].name}</span>
        <Badge variant="secondary" className="px-1 py-0 h-5 text-[10px] bg-primary/10 text-primary shrink-0">
          +{selectedUnits.length - 1}
        </Badge>
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          role="combobox" 
          aria-expanded={open} 
          className={`${fullWidth ? 'w-full' : 'w-[220px]'} justify-between h-10 px-3 bg-white hover:bg-gray-50 border-gray-200 shadow-sm`}
        >
          {getDisplayText()}
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${fullWidth ? 'w-[var(--radix-popover-trigger-width)]' : 'w-[260px]'} p-0 shadow-lg border-gray-200`} align="start">
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search units..."
              className="pl-8 h-9 text-sm focus-visible:ring-1 focus-visible:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between p-2 text-xs border-b bg-gray-50/50">
          <button 
            type="button" 
            onClick={selectAll}
            className="flex items-center gap-1.5 text-primary font-medium hover:underline"
          >
            <CheckSquare className="h-3.5 w-3.5" /> Select All
          </button>
          <button 
            type="button" 
            onClick={clearAll}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive hover:underline"
          >
            <X className="h-3.5 w-3.5" /> Clear All
          </button>
        </div>

        <ScrollArea className="h-[220px]">
          <div className="p-2 space-y-1">
            {filteredUnits.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No units found.
              </div>
            ) : (
              filteredUnits.map((unit) => {
                const isSelected = selectedUnits.some(u => u.id === unit.id);
                return (
                  <div 
                    key={unit.id} 
                    className="flex items-center space-x-3 hover:bg-primary/5 p-2 rounded-md cursor-pointer transition-colors"
                    onClick={() => toggleUnit(unit)}
                  >
                    <Checkbox
                      id={`unit-${unit.id}`}
                      checked={isSelected}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor={`unit-${unit.id}`}
                      className="text-sm font-medium leading-none cursor-pointer flex-1 select-none"
                    >
                      {unit.name}
                      <span className="text-[10px] ml-2 text-muted-foreground uppercase tracking-wider">{unit.code}</span>
                    </label>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
        {selectedUnits.length > 0 && (
          <div className="p-2 border-t bg-gray-50/50 text-xs text-center text-muted-foreground font-medium">
            {selectedUnits.length} unit{selectedUnits.length !== 1 ? 's' : ''} selected
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
