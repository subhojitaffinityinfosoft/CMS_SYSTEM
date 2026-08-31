import React from "react";
import { Plus, Edit2, Users, BookOpen } from "lucide-react";

const departments = [
  { id: 1, code: "SCI", name: "Science", hod: "Dr. Alok Bose", teachers: 22, subjects: 4, students: 420, color: "#6366f1" },
  { id: 2, code: "COM", name: "Commerce", hod: "Mr. Vivek Jain", teachers: 16, subjects: 3, students: 310, color: "#10b981" },
  { id: 3, code: "ART", name: "Arts", hod: "Mr. Sujit Ghosh", teachers: 18, subjects: 5, students: 280, color: "#f59e0b" },
  { id: 4, code: "MAT", name: "Mathematics", hod: "Mr. Rajan Gupta", teachers: 14, subjects: 2, students: 260, color: "#0ea5e9" },
  { id: 5, code: "TEC", name: "Technology", hod: "Mr. Arun Mishra", teachers: 24, subjects: 3, students: 228, color: "#8b5cf6" },
];

export default function DepartmentsList() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-sm text-muted-foreground mt-1">{departments.length} departments registered</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white text-sm px-4 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map(dept => (
          <div key={dept.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-1.5" style={{ backgroundColor: dept.color }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-mono text-muted-foreground">{dept.code}</span>
                  <h3 className="text-base font-bold text-gray-900 mt-0.5">{dept.name}</h3>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <Edit2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-4">HOD: <span className="font-medium text-gray-700">{dept.hod}</span></p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Teachers", value: dept.teachers, icon: Users },
                  { label: "Subjects", value: dept.subjects, icon: BookOpen },
                  { label: "Students", value: dept.students, icon: Users },
                ].map(stat => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="text-center p-2 bg-gray-50 rounded-xl">
                      <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
