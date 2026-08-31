import React from "react";
import { BookOpen, Building2, Users, Layers, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Subjects", value: "28", icon: BookOpen, color: "#6366f1", bg: "#eef2ff" },
  { label: "Departments", value: "5", icon: Building2, color: "#10b981", bg: "#ecfdf5" },
  { label: "Teaching Staff", value: "94", icon: Users, color: "#0ea5e9", bg: "#e0f2fe" },
  { label: "Class Sections", value: "22", icon: Layers, color: "#f59e0b", bg: "#fffbeb" },
];

const quickLinks = [
  { label: "Manage Subjects", desc: "Add, edit and assign subjects to classes", href: "subjects", color: "#6366f1" },
  { label: "Manage Departments", desc: "Organise teaching departments and HODs", href: "departments", color: "#10b981" },
  { label: "Class Setup", desc: "Configure class sections, schedules", href: "#", color: "#0ea5e9" },
];

export default function MasterDashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Master Data</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage global reference data for the institution</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl border p-4 shadow-sm flex items-start gap-3">
              <div className="p-2.5 rounded-xl shrink-0" style={{ backgroundColor: s.bg }}>
                <Icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickLinks.map(l => (
          <button key={l.label} onClick={() => navigate(l.href === "#" ? "." : l.href)}
            className="group bg-white rounded-2xl border p-5 shadow-sm text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${l.color}15` }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: l.color }} />
            </div>
            <p className="font-semibold text-gray-800 text-sm">{l.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{l.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
