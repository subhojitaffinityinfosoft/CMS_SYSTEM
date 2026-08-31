import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Tables } from "shared-ui";
import { subjectsData } from "./subjects_data";
import { subjectsColumns } from "./subjects_columns";

export default function SubjectsList() {
  const [search, setSearch] = useState("");
  const filtered = subjectsData.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
          <p className="text-sm text-muted-foreground mt-1">{subjectsData.length} subjects configured</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white text-sm px-4 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden p-2">
        <Tables 
          columns={subjectsColumns}
          data={filtered}
          hidePagination={true}
          key_to_search="name"
          showFilterOnly={false}
          optimisedVersion={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
