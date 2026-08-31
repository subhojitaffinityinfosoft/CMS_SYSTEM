import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

const mockColleges = [
  { id: 1, name: "ABC College", code: "ABC", location: "Kolkata" },
  { id: 2, name: "XYZ College", code: "XYZ", location: "Howrah" }
];

export function CollegeSelector({ selectedCollege, onChange }) {
  return (
    <Select
      value={selectedCollege?.id?.toString() || ""}
      onValueChange={(val) => {
        const college = mockColleges.find(c => c.id.toString() === val);
        onChange(college);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select College" />
      </SelectTrigger>
      <SelectContent>
        {mockColleges.map((college) => (
          <SelectItem key={college.id} value={college.id.toString()}>
            {college.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
