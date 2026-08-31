import React from 'react';
import { ArrowRight, LayoutDashboard, UserPlus, Users, GraduationCap, Receipt, Database, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  LayoutDashboard,
  UserPlus,
  Users,
  GraduationCap,
  Receipt,
  Database,
  BarChart3
};

export function ModuleCard({ module }) {
  const navigate = useNavigate();
  const Icon = iconMap[module.icon] || LayoutDashboard;

  return (
    <div
      className="group relative cursor-pointer rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      onClick={() => navigate(module.route)}
    >
      {/* Colored top accent bar */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: module.color }}
      />

      {/* Background blob */}
      <div
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-[0.06] transition-transform duration-500 group-hover:scale-150"
        style={{ backgroundColor: module.color }}
      />

      <div className="p-5 relative z-10">
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
          style={{ backgroundColor: `${module.color}18`, color: module.color }}
        >
          <Icon size={22} strokeWidth={1.8} />
        </div>

        {/* Title + description */}
        <h3 className="font-bold text-gray-900 text-base mb-1">{module.name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{module.description}</p>

        {/* Arrow indicator */}
        <div className="flex items-center gap-1 mt-4 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: module.color }}>
          Open module
          <ArrowRight size={13} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
