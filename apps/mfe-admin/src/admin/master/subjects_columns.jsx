import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export const subjectsColumns = [
  { accessorKey: "code", header: "Code" },
  { accessorKey: "name", header: "Subject Name" },
  { accessorKey: "dept", header: "Department" },
  { accessorKey: "class", header: "Classes" },
  { accessorKey: "teacher", header: "Teacher" },
  { accessorKey: "periods", header: "Periods/Wk" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
          {status}
        </span>
      );
    }
  },
  {
    accessorKey: "ActionCustom",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
      </div>
    )
  }
];
