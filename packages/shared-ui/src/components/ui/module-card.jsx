import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card';
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
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 relative overflow-hidden"
      style={{ borderLeftColor: module.color }}
      onClick={() => navigate(module.route)}
    >
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"
        style={{ backgroundColor: module.color }}
      />
      <CardHeader>
        <div className="flex justify-between items-start">
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${module.color}15`, color: module.color }}
          >
            <Icon size={24} />
          </div>
          <ArrowRight 
            size={20} 
            className="text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
          />
        </div>
        <CardTitle className="mt-4 text-xl">{module.name}</CardTitle>
        <CardDescription className="text-sm mt-2">{module.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
