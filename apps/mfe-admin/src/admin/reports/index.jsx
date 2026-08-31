import React from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FileBarChart, Users, TrendingUp, Award } from "lucide-react";

const attendanceTrend = [
  { month: "Apr", present: 92, absent: 5, leave: 3 },
  { month: "May", present: 89, absent: 7, leave: 4 },
  { month: "Jun", present: 85, absent: 9, leave: 6 },
  { month: "Jul", present: 91, absent: 6, leave: 3 },
  { month: "Aug", present: 94, absent: 4, leave: 2 },
];

const classResults = [
  { class: "Grade 9",  passRate: 96, avgMarks: 74, topScore: 98 },
  { class: "Grade 10", passRate: 94, avgMarks: 71, topScore: 97 },
  { class: "Grade 11", passRate: 91, avgMarks: 69, topScore: 95 },
  { class: "Grade 12", passRate: 88, avgMarks: 67, topScore: 96 },
];

const topStudents = [
  { rank: 1, name: "Divya Nair",    class: "Grade 12", score: "96.4%", dept: "Science" },
  { rank: 2, name: "Rohan Kumar",   class: "Grade 11", score: "95.8%", dept: "Commerce" },
  { rank: 3, name: "Ananya Roy",    class: "Grade 12", score: "95.1%", dept: "Arts" },
  { rank: 4, name: "Karan Verma",   class: "Grade 10", score: "94.6%", dept: "Science" },
  { rank: 5, name: "Meera Joshi",   class: "Grade 11", score: "94.2%", dept: "Science" },
];

const kpis = [
  { label: "Avg Attendance", value: "90.2%", icon: Users, color: "#10b981", bg: "#ecfdf5" },
  { label: "Overall Pass Rate", value: "92.3%", icon: TrendingUp, color: "#6366f1", bg: "#eef2ff" },
  { label: "Avg Class Score", value: "70.3%", icon: FileBarChart, color: "#0ea5e9", bg: "#e0f2fe" },
  { label: "Distinction (>75%)", value: "38%", icon: Award, color: "#f59e0b", bg: "#fffbeb" },
];

export default function ReportsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Academic Year 2026–27 · Attendance & Result Summary</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-2xl border p-4 shadow-sm flex items-start gap-3">
              <div className="p-2.5 rounded-xl shrink-0" style={{ backgroundColor: k.bg }}>
                <Icon className="w-5 h-5" style={{ color: k.color }} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <p className="text-2xl font-bold text-gray-900">{k.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Attendance Trend (%)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[75, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Present %" />
              <Line type="monotone" dataKey="absent" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} name="Absent %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Class Pass Rates */}
        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Pass Rate by Class (%)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={classResults} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="class" tick={{ fontSize: 12 }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="passRate" fill="#6366f1" name="Pass Rate %" radius={[6, 6, 0, 0]} />
              <Bar dataKey="avgMarks" fill="#c7d2fe" name="Avg Marks" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Students */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b">
          <h2 className="text-sm font-semibold text-gray-700">🏆 Top Performing Students</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-muted-foreground uppercase tracking-wide">
            <tr>
              {["Rank", "Student Name", "Class", "Department", "Score"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {topStudents.map(s => (
              <tr key={s.rank} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${s.rank === 1 ? "bg-amber-100 text-amber-700" : s.rank === 2 ? "bg-gray-100 text-gray-600" : s.rank === 3 ? "bg-orange-100 text-orange-700" : "bg-gray-50 text-muted-foreground"}`}>
                    {s.rank}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800">{s.name}</td>
                <td className="px-4 py-3 text-gray-600">{s.class}</td>
                <td className="px-4 py-3 text-gray-600">{s.dept}</td>
                <td className="px-4 py-3 font-bold text-emerald-600">{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
