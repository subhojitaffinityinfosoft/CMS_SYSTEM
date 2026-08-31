import React, { useState } from "react";
import { Save, Award } from "lucide-react";

const students = [
  { id: 1, roll: "10A01", name: "Aarav Sharma" },
  { id: 2, roll: "10A02", name: "Priya Das" },
  { id: 3, roll: "10A03", name: "Rohan Mehta" },
  { id: 4, roll: "10A04", name: "Sneha Roy" },
  { id: 5, roll: "10A05", name: "Karan Singh" },
  { id: 6, roll: "10A06", name: "Divya Patel" },
  { id: 7, roll: "10A07", name: "Arjun Nair" },
  { id: 8, roll: "10A08", name: "Meera Joshi" },
];

const exams = ["Unit Test 1", "Unit Test 2", "Mid Term", "Final Term"];
const MAX = { "Unit Test 1": 25, "Unit Test 2": 25, "Mid Term": 50, "Final Term": 100 };

const getGrade = (pct) => pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B+" : pct >= 60 ? "B" : pct >= 50 ? "C" : "D";
const gradeColor = (g) => ({ "A+": "text-emerald-600 font-bold", A: "text-teal-600 font-bold", "B+": "text-blue-600", B: "text-sky-600", C: "text-amber-600", D: "text-red-500" })[g] || "";

export default function EnterMarks() {
  const [marks, setMarks] = useState({});
  const [exam, setExam] = useState("Unit Test 1");
  const [saved, setSaved] = useState(false);

  const setMark = (id, val) => setMarks(m => ({ ...m, [`${id}-${exam}`]: val }));
  const getMark = (id) => marks[`${id}-${exam}`] ?? "";
  const getPct = (id) => { const m = getMark(id); return m !== "" ? Math.round((m / MAX[exam]) * 100) : null; };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enter Marks</h1>
          <p className="text-sm text-muted-foreground mt-1">Class 10-A · Mathematics</p>
        </div>
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${saved ? "bg-emerald-500 text-white" : "bg-primary text-white hover:bg-primary/90"}`}>
          <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save Marks"}
        </button>
      </div>

      {/* Exam Selector */}
      <div className="flex items-center gap-2 bg-white border rounded-2xl p-1.5 shadow-sm w-fit">
        {exams.map(e => (
          <button key={e} onClick={() => setExam(e)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${exam === e ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:bg-gray-50"}`}>
            {e} <span className="text-[10px] opacity-70">/{MAX[e]}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-muted-foreground uppercase tracking-wide border-b">
            <tr>
              <th className="px-5 py-3 text-left">Roll No</th>
              <th className="px-5 py-3 text-left">Student Name</th>
              <th className="px-5 py-3 text-center">Marks / {MAX[exam]}</th>
              <th className="px-5 py-3 text-center">%</th>
              <th className="px-5 py-3 text-center">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map(s => {
              const pct = getPct(s.id);
              const grade = pct !== null ? getGrade(pct) : "—";
              return (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{s.roll}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{s.name}</td>
                  <td className="px-5 py-3 text-center">
                    <input
                      type="number" min={0} max={MAX[exam]}
                      value={getMark(s.id)}
                      onChange={e => setMark(s.id, Number(e.target.value))}
                      className="w-16 border rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="—"
                    />
                  </td>
                  <td className="px-5 py-3 text-center text-gray-600">{pct !== null ? `${pct}%` : "—"}</td>
                  <td className={`px-5 py-3 text-center ${gradeColor(grade)}`}>{grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
