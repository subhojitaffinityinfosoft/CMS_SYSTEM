import React from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  Users, UserPlus, CheckCircle2, Clock, TrendingUp,
  GraduationCap, AlertCircle, FileText
} from "lucide-react";

const monthlyData = [
  { month: "Apr", applications: 45, enrolled: 32, rejected: 8 },
  { month: "May", applications: 78, enrolled: 61, rejected: 12 },
  { month: "Jun", applications: 132, enrolled: 98, rejected: 24 },
  { month: "Jul", applications: 189, enrolled: 145, rejected: 31 },
  { month: "Aug", applications: 214, enrolled: 178, rejected: 28 },
  { month: "Sep", applications: 96, enrolled: 82, rejected: 11 },
];

const statusPie = [
  { name: "Enrolled", value: 596, color: "#10b981" },
  { name: "Pending", value: 134, color: "#f59e0b" },
  { name: "Rejected", value: 114, color: "#f43f5e" },
  { name: "Waitlisted", value: 44, color: "#6366f1" },
];

const recentApps = [
  { id: "A2026001", name: "Riya Sharma", class: "Grade 11", course: "Science", date: "2026-08-30", status: "Pending" },
  { id: "A2026002", name: "Arjun Mehta", class: "Grade 9", course: "Commerce", date: "2026-08-30", status: "Enrolled" },
  { id: "A2026003", name: "Priya Das", class: "Grade 12", course: "Arts", date: "2026-08-29", status: "Pending" },
  { id: "A2026004", name: "Rahul Singh", class: "Grade 10", course: "Science", date: "2026-08-29", status: "Enrolled" },
  { id: "A2026005", name: "Sneha Patel", class: "Grade 11", course: "Commerce", date: "2026-08-28", status: "Rejected" },
];

const kpis = [
  { label: "Total Applications", value: "888", icon: FileText, color: "#6366f1", bg: "#eef2ff", trend: "+12%" },
  { label: "Enrolled", value: "596", icon: CheckCircle2, color: "#10b981", bg: "#ecfdf5", trend: "+8%" },
  { label: "Pending Review", value: "134", icon: Clock, color: "#f59e0b", bg: "#fffbeb", trend: "-3%" },
  { label: "New Today", value: "14", icon: UserPlus, color: "#0ea5e9", bg: "#e0f2fe", trend: "+14%" },
];

const statusColor = { Enrolled: "bg-emerald-100 text-emerald-700", Pending: "bg-amber-100 text-amber-700", Rejected: "bg-red-100 text-red-700" };

export default function AdmissionDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admission Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Academic Year 2026–27 · Admission Overview</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-2xl border p-4 shadow-sm flex items-start gap-3">
              <div className="p-2.5 rounded-xl shrink-0" style={{ backgroundColor: k.bg }}>
                <Icon className="w-5 h-5" style={{ color: k.color }} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <p className="text-2xl font-bold text-gray-900">{k.value}</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: k.trend.startsWith("+") ? "#10b981" : "#f43f5e" }}>{k.trend} vs last month</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Monthly Application Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="applications" stroke="#6366f1" fill="url(#appGrad)" strokeWidth={2} name="Applications" />
              <Area type="monotone" dataKey="enrolled" stroke="#10b981" fill="transparent" strokeWidth={2} name="Enrolled" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie */}
        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Application Status</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusPie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value">
                {statusPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {statusPie.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-semibold text-gray-700">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Recent Applications</h2>
          <a href="/admin/admission/applications" className="text-xs text-primary font-medium hover:underline">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-muted-foreground uppercase tracking-wide">
              <tr>
                {["App ID", "Student Name", "Class", "Course", "Date", "Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{app.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{app.name}</td>
                  <td className="px-4 py-3 text-gray-600">{app.class}</td>
                  <td className="px-4 py-3 text-gray-600">{app.course}</td>
                  <td className="px-4 py-3 text-gray-500">{app.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[app.status]}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
