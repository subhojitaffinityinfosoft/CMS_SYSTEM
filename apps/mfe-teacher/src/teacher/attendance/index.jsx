import React, { useState } from "react";
import { CheckCircle2, XCircle, Clock, Save } from "lucide-react";

const students = [
  { id: 1, roll: "10A01", name: "Aarav Sharma" },
  { id: 2, roll: "10A02", name: "Priya Das" },
  { id: 3, roll: "10A03", name: "Rohan Mehta" },
  { id: 4, roll: "10A04", name: "Sneha Roy" },
  { id: 5, roll: "10A05", name: "Karan Singh" },
  { id: 6, roll: "10A06", name: "Divya Patel" },
  { id: 7, roll: "10A07", name: "Arjun Nair" },
  { id: 8, roll: "10A08", name: "Meera Joshi" },
  { id: 9, roll: "10A09", name: "Rahul Das" },
  { id: 10, roll: "10A10", name: "Ananya Gupta" },
];

const statusOptions = [
  { value: "P", label: "Present", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-200", activeColor: "bg-emerald-500 text-white border-emerald-500" },
  { value: "A", label: "Absent", icon: XCircle, color: "text-red-500 bg-red-50 border-red-200", activeColor: "bg-red-500 text-white border-red-500" },
  { value: "L", label: "Leave", icon: Clock, color: "text-amber-600 bg-amber-50 border-amber-200", activeColor: "bg-amber-500 text-white border-amber-500" },
];

export default function MarkAttendance() {
  const [attendance, setAttendance] = useState(Object.fromEntries(students.map(s => [s.id, "P"])));
  const [saved, setSaved] = useState(false);

  const stats = Object.values(attendance).reduce((acc, v) => { acc[v] = (acc[v] || 0) + 1; return acc; }, {});

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="text-sm text-muted-foreground mt-1">Class 10-A · Mathematics · {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${saved ? "bg-emerald-500 text-white" : "bg-primary text-white hover:bg-primary/90"}`}>
          <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save"}
        </button>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-3">
        {[{ label: "Present", val: stats["P"] || 0, color: "#10b981" }, { label: "Absent", val: stats["A"] || 0, color: "#f43f5e" }, { label: "Leave", val: stats["L"] || 0, color: "#f59e0b" }].map(s => (
          <div key={s.label} className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-xs font-semibold text-gray-700">{s.val} {s.label}</span>
          </div>
        ))}
      </div>

      {/* Attendance list */}
      <div className="bg-white rounded-2xl border shadow-sm divide-y">
        {students.map(student => (
          <div key={student.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {student.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{student.name}</p>
                <p className="text-xs text-muted-foreground">Roll: {student.roll}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {statusOptions.map(opt => (
                <button key={opt.value} onClick={() => setAttendance(a => ({ ...a, [student.id]: opt.value }))}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${attendance[student.id] === opt.value ? opt.activeColor : opt.color}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
