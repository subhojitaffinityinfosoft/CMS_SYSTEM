import { useState, useEffect } from "react";

/* ── DATA ──────────────────────────────────────────────── */
const notices = [
  { id: 1, title: "Mid-Semester Exam Schedule Released", date: "Apr 23", type: "exam", urgent: true },
  { id: 2, title: "Library closed on Apr 25 – State Holiday", date: "Apr 22", type: "info", urgent: false },
  { id: 3, title: "Fee Payment Deadline: April 30", date: "Apr 20", type: "fee", urgent: true },
  { id: 4, title: "Sports Day Registration Open – Last date Apr 28", date: "Apr 19", type: "event", urgent: false },
  { id: 5, title: "New Lab Sessions Added for CS301 from May 1", date: "Apr 18", type: "info", urgent: false },
  { id: 6, title: "Scholarship Application Form Now Open", date: "Apr 17", type: "scholarship", urgent: false },
];

const timetable = [
  { time: "8:00–9:00", subject: "Data Structures", room: "LT-3", teacher: "Dr. Sharma", status: "done" },
  { time: "9:15–10:15", subject: "Operating Systems", room: "LT-1", teacher: "Prof. Mehta", status: "done" },
  { time: "10:30–11:30", subject: "Mathematics III", room: "RM-204", teacher: "Dr. Iyer", status: "current" },
  { time: "12:30–1:30", subject: "Computer Networks", room: "LT-2", teacher: "Prof. Das", status: "upcoming" },
  { time: "2:00–3:00", subject: "Software Engg. Lab", room: "Lab-5", teacher: "Ms. Rao", status: "upcoming" },
];

const assignments = [
  { id: 1, title: "Linked List Implementation", subject: "Data Structures", due: "Apr 25", priority: "high", progress: 70 },
  { id: 2, title: "Process Scheduling Report", subject: "Operating Systems", due: "Apr 27", priority: "medium", progress: 30 },
  { id: 3, title: "Fourier Series Problem Set", subject: "Mathematics III", due: "Apr 29", priority: "low", progress: 10 },
  { id: 4, title: "Network Topology Design", subject: "Computer Networks", due: "May 2", priority: "medium", progress: 0 },
];

const grades = [
  { subject: "Data Structures", mid: 42, assignment: 18, total: 60, grade: "A", gpa: 10 },
  { subject: "Operating Systems", mid: 38, assignment: 16, total: 54, grade: "B+", gpa: 8 },
  { subject: "Mathematics III", mid: 45, assignment: 19, total: 64, grade: "A+", gpa: 10 },
  { subject: "Computer Networks", mid: 35, assignment: 14, total: 49, grade: "B", gpa: 7 },
  { subject: "Software Engg.", mid: 40, assignment: 17, total: 57, grade: "A-", gpa: 9 },
];

const events = [
  { day: "25", month: "Apr", title: "Holiday – State Foundation Day", type: "holiday" },
  { day: "28", month: "Apr", title: "Sports Day Registration Deadline", type: "event" },
  { day: "30", month: "Apr", title: "Fee Payment Last Date", type: "fee" },
  { day: "1", month: "May", title: "Mid-Semester Exams Begin", type: "exam" },
  { day: "10", month: "May", title: "CS Lab Project Submission", type: "submission" },
  { day: "15", month: "May", title: "Scholarship Interview", type: "scholarship" },
];

const clubs = [
  { name: "Coding Club", role: "Core Member", event: "Hackathon – May 5", icon: "💻" },
  { name: "Photography Club", role: "Member", event: "Exhibition – May 12", icon: "📷" },
  { name: "NSS Unit", role: "Volunteer", event: "Blood Drive – Apr 28", icon: "❤️" },
];

const resources = [
  { title: "DS Question Bank", type: "PDF", subject: "Data Structures", size: "2.4 MB", date: "Apr 20" },
  { title: "OS Lab Manual", type: "PDF", subject: "Operating Systems", size: "5.1 MB", date: "Apr 18" },
  { title: "Math Formula Sheet", type: "DOC", subject: "Mathematics III", size: "0.8 MB", date: "Apr 15" },
  { title: "CN Lecture Slides", type: "PPT", subject: "Computer Networks", size: "12 MB", date: "Apr 12" },
];

const navItems = [
  { icon: "▦", label: "Dashboard", key: "dashboard" },
  { icon: "📋", label: "Notices", key: "notices" },
  { icon: "📅", label: "Timetable", key: "timetable" },
  { icon: "📝", label: "Assignments", key: "assignments" },
  { icon: "📊", label: "Results", key: "results" },
  { icon: "📚", label: "Library", key: "library" },
  { icon: "💳", label: "Fee Portal", key: "fee" },
  { icon: "🏠", label: "Hostel", key: "hostel" },
  { icon: "⚙️", label: "Settings", key: "settings" },
];

/* ── BADGE CLASSES ─────────────────────────────────────── */
const typeChip = {
  exam: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  fee: "bg-yellow-100 text-yellow-800",
  event: "bg-green-100 text-green-700",
  submission: "bg-purple-100 text-purple-700",
  holiday: "bg-green-100 text-green-700",
  scholarship: "bg-orange-100 text-orange-700",
};
const typeChipDark = {
  exam: "dark:bg-red-900/40 dark:text-red-300",
  info: "dark:bg-blue-900/40 dark:text-blue-300",
  fee: "dark:bg-yellow-900/40 dark:text-yellow-300",
  event: "dark:bg-green-900/40 dark:text-green-300",
  submission: "dark:bg-purple-900/40 dark:text-purple-300",
  holiday: "dark:bg-green-900/40 dark:text-green-300",
  scholarship: "dark:bg-orange-900/40 dark:text-orange-300",
};
const typeDot = {
  exam: "bg-red-500", info: "bg-blue-500", fee: "bg-yellow-500",
  event: "bg-green-500", submission: "bg-purple-500",
  holiday: "bg-green-500", scholarship: "bg-orange-500",
};
const priorityBadge = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
};
const fileTypeColor = {
  PDF: "bg-red-100 text-red-600",
  DOC: "bg-blue-100 text-blue-600",
  PPT: "bg-orange-100 text-orange-600",
};

/* ── MINI COMPONENTS ───────────────────────────────────── */
function SectionHeader({ icon, title, badge, badgeClass = "" }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-indigo-700 dark:bg-indigo-900 rounded-t-xl">
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <h2 className="text-white font-bold text-sm">{title}</h2>
      </div>
      {badge && <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${badgeClass}`}>{badge}</span>}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
  iconCls,
  gradientCls = "",
}) {
  const isGradient = !!gradientCls;

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl p-4 flex items-center gap-4 shadow-sm flex-1 min-w-[180px] border transition-all duration-200

        ${isGradient
          ? `${gradientCls} border-transparent text-gray-900`
          : "bg-background border-border text-foreground"
        }

        hover:shadow-md hover:-translate-y-[2px]
      `}
    >
      {/* overlay for gradient */}
      {isGradient && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      )}

      {/* LEFT ICON */}
      <div className="relative z-10">
        <div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-2xl

            ${isGradient
              ? "bg-white/30 text-gray-900"
              : iconCls
            }
          `}
        >
          {icon}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="relative z-10 flex flex-col">
        <p
          className={`text-xs ${isGradient ? "text-gray-700" : "text-muted-foreground"
            }`}
        >
          {label}
        </p>

        <p
          className={`text-2xl font-bold leading-tight ${isGradient ? "text-gray-900" : "text-foreground"
            }`}
        >
          {value}
        </p>

        {sub && (
          <p
            className={`text-xs ${isGradient ? "text-gray-600" : "text-muted-foreground"
              }`}
          >
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

function Bar({ value, colorCls }) {
  return (
    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-500 ${colorCls}`} style={{ width: `${value}%` }} />
    </div>
  );
}

/* ── DASHBOARD ─────────────────────────────────────────── */
export default function StudentDashboard() {
  const [dark, setDark] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(true);
  const [tab, setTab] = useState("week");
  const [notifOpen, setNotifOpen] = useState(false);
  const [sec, setSec] = useState(0);
  const [running, setRunning] = useState(false);
  const [studySub, setStudySub] = useState("Data Structures");

  useEffect(() => {
    let t;
    if (running) t = setInterval(() => setSec(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const fmt = s => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <main className="flex-1 flex flex-col overflow-auto">
          <div className="p-5 flex flex-col gap-5">

            {/* STATS */}
            <div className="flex gap-3 flex-wrap">
              <Stat
                icon="📊"
                label="CGPA"
                value="8.6"
                sub="+0.2 this semester"
                gradientCls="bg-gradient-to-br from-sky-200 to-blue-300"
              />

              <Stat
                icon="✅"
                label="Attendance"
                value="87%"
                sub="3 low subjects"
                gradientCls="bg-gradient-to-br from-emerald-200 to-green-300"
              />

              <Stat
                icon="📝"
                label="Pending Tasks"
                value="4"
                sub="2 due this week"
                gradientCls="bg-gradient-to-br from-yellow-200 to-amber-300"
              />

              <Stat
                icon="🏅"
                label="Class Rank"
                value="12th"
                sub="Out of 68 students"
                gradientCls="bg-gradient-to-br from-pink-200 to-rose-300"
              />

              <Stat
                icon="📚"
                label="Credits"
                value="156"
                sub="12 remaining"
                gradientCls="bg-gradient-to-br from-indigo-200 to-blue-200"
              />

              <Stat
                icon="📅"
                label="Days to Exam"
                value="8"
                sub="Mid-sem starts May 1"
                gradientCls="bg-gradient-to-br from-red-200 to-orange-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <Card>
                <SectionHeader icon="📢" title="Notice Board" badge="2 Urgent" badgeClass="bg-red-500 text-white" />
                <div>
                  {notices.map(n => (
                    <div key={n.id} className="flex items-start gap-3 px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer last:border-0">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${typeDot[n.type]}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{n.title}</p>
                          {n.urgent && <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 flex-shrink-0">URGENT</span>}
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{n.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                  <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer bg-transparent border-0 p-0">View all notices →</button>
                </div>
              </Card>

              <Card>
                <SectionHeader icon="🕐" title="Today's Timetable" />
                <div>
                  {timetable.map((cls, i) => (
                    <div key={i}
                      className={`flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors
                        ${cls.status === "current" ? "bg-indigo-50 dark:bg-indigo-900/20" : ""}`}
                      style={{ borderLeft: cls.status === "current" ? "3px solid #6366F1" : "3px solid transparent" }}>
                      <div className="min-w-[68px]">
                        <p className={`text-xs ${cls.status === "current" ? "text-indigo-600 dark:text-indigo-400 font-semibold" : "text-gray-400 dark:text-gray-500"}`}>{cls.time}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{cls.subject}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{cls.room} · {cls.teacher}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                        ${cls.status === "done" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                          cls.status === "current" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" :
                            "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"}`}>
                        {cls.status === "done" ? "Done" : cls.status === "current" ? "Now" : "Soon"}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* ASSIGNMENTS + EVENTS */}
            <div className="grid gap-4" style={{ gridTemplateColumns: "1.35fr 1fr" }}>

              <Card>
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <span>📝</span>
                    <h2 className="font-bold text-sm text-gray-900 dark:text-white">Assignments</h2>
                  </div>
                  <div className="flex gap-1">
                    {["today", "week", "all"].map(t => (
                      <button key={t} onClick={() => setTab(t)} className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer
                        ${tab === t
                          ? "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-400 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300"
                          : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col gap-4">
                  {assignments.map(a => (
                    <div key={a.id}>
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{a.title}</p>
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${priorityBadge[a.priority]}`}>{a.priority.toUpperCase()}</span>
                          </div>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{a.subject} · Due {a.due}</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 ml-2">{a.progress}%</span>
                      </div>
                      <Bar value={a.progress} colorCls={a.progress >= 60 ? "bg-green-500" : a.progress >= 30 ? "bg-indigo-500" : "bg-yellow-400"} />
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-700">
                  <button className="w-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 rounded-lg py-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-pointer bg-transparent">
                    + Add Assignment
                  </button>
                </div>
              </Card>

              <Card>
                <SectionHeader icon="📅" title="Upcoming Events" />
                <div>
                  {events.map((e, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className={`rounded-lg px-2.5 py-1.5 text-center min-w-[42px] flex-shrink-0 ${typeChip[e.type]}`}>
                        <p className="text-sm font-bold leading-none">{e.day}</p>
                        <p className="text-xs mt-0.5 opacity-80">{e.month}</p>
                      </div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{e.title}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* GRADES + ATTENDANCE */}
            <div className="grid gap-4" style={{ gridTemplateColumns: "1.35fr 1fr" }}>

              <Card>
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <span>🏆</span>
                    <h2 className="font-bold text-sm text-gray-900 dark:text-white">Mid-Semester Grades</h2>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">Sem 6</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700/50">
                        {["Subject", "Mid-Term", "Assign.", "Total", "Grade", "GPA"].map(h => (
                          <th key={h} className="px-4 py-2.5 text-left font-semibold text-gray-500 dark:text-gray-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((g, i) => (
                        <tr key={i} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="px-4 py-2.5 font-medium text-gray-800 dark:text-gray-200">{g.subject}</td>
                          <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{g.mid}/50</td>
                          <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{g.assignment}/20</td>
                          <td className="px-4 py-2.5 font-semibold text-gray-700 dark:text-gray-300">{g.total}/70</td>
                          <td className="px-4 py-2.5">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${g.grade.startsWith("A") ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"}`}>{g.grade}</span>
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-1.5">
                              <div className="w-10 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${g.gpa * 10}%` }} />
                              </div>
                              <span className="text-gray-600 dark:text-gray-400">{g.gpa}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <p className="text-xs text-gray-400 dark:text-gray-500">Avg: <span className="font-bold text-gray-700 dark:text-gray-300">56.8 / 70</span></p>
                  <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer bg-transparent border-0 p-0">Full Report →</button>
                </div>
              </Card>

              <Card>
                <SectionHeader icon="📈" title="Attendance Tracker" />
                <div className="px-4 py-3 flex flex-col gap-3">
                  {[
                    { sub: "Data Structures", pct: 92, cls: 48 },
                    { sub: "Operating Systems", pct: 88, cls: 45 },
                    { sub: "Mathematics III", pct: 72, cls: 50, low: true },
                    { sub: "Computer Networks", pct: 95, cls: 42 },
                    { sub: "Software Engg.", pct: 69, cls: 38, low: true },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{s.sub}</p>
                        <div className="flex items-center gap-1.5">
                          {s.low && <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">LOW</span>}
                          <span className={`text-xs font-bold ${s.low ? "text-red-500" : "text-green-600 dark:text-green-400"}`}>{s.pct}%</span>
                        </div>
                      </div>
                      <Bar value={s.pct} colorCls={s.low ? "bg-red-500" : "bg-green-500"} />
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{Math.round(s.cls * s.pct / 100)} / {s.cls} classes</p>
                    </div>
                  ))}
                </div>
                <div className="mx-4 mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl">
                  <p className="text-xs font-semibold text-yellow-800 dark:text-yellow-300">⚠️ Attendance Warning</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-0.5">2 subjects below 75%. Attend all classes to avoid detention.</p>
                </div>
              </Card>
            </div>

            {/* STUDY TIMER + RESOURCES */}
            <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1.35fr" }}>

              <Card>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <span>⏱️</span>
                  <h2 className="font-bold text-sm text-gray-900 dark:text-white">Study Timer</h2>
                </div>
                <div className="px-4 py-4 flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full border-4 border-indigo-200 dark:border-indigo-700 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30">
                    <span className="text-xl font-black text-indigo-700 dark:text-indigo-300 tracking-tight">{fmt(sec)}</span>
                  </div>
                  <div className="w-full">
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Subject</label>
                    <select value={studySub} onChange={e => setStudySub(e.target.value)}
                      className="w-full text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2.5 py-1.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none">
                      {grades.map(g => <option key={g.subject}>{g.subject}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-2 w-full">
                    <button onClick={() => setRunning(!running)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border-0
                        ${running ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300" : "bg-indigo-600 dark:bg-indigo-700 text-white hover:bg-indigo-700"}`}>
                      {running ? "⏸ Pause" : "▶ Start"}
                    </button>
                    <button onClick={() => { setSec(0); setRunning(false); }}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer border-0">
                      ↺
                    </button>
                  </div>
                  <div className="w-full grid grid-cols-3 gap-2 text-center">
                    {[{ l: "Today", v: "2h 15m" }, { l: "Week", v: "11h 40m" }, { l: "Streak", v: "7 days" }].map(s => (
                      <div key={s.l} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{s.v}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <span>📂</span>
                    <h2 className="font-bold text-sm text-gray-900 dark:text-white">Study Resources</h2>
                  </div>
                  <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer bg-transparent border-0 p-0">Upload +</button>
                </div>
                <div>
                  {resources.map((r, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ${fileTypeColor[r.type]}`}>{r.type}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{r.title}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{r.subject} · {r.size} · {r.date}</p>
                      </div>
                      <button className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors cursor-pointer bg-transparent border-0 p-0">⬇</button>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 border-t border-indigo-100 dark:border-indigo-800/40">
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">📚 12 more files in your library</p>
                  <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mt-0.5 cursor-pointer bg-transparent border-0 p-0">Browse all →</button>
                </div>
              </Card>
            </div>

            {/* CLUBS + SCHOLARSHIP + HOSTEL */}
            <div className="grid grid-cols-3 gap-4">

              <Card>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <span>🎭</span>
                  <h2 className="font-bold text-sm text-gray-900 dark:text-white">My Clubs</h2>
                </div>
                <div className="px-4 py-3 flex flex-col gap-3">
                  {clubs.map((c, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                      <span className="text-xl flex-shrink-0">{c.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{c.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{c.role}</p>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">📌 {c.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <span>🎓</span>
                  <h2 className="font-bold text-sm text-gray-900 dark:text-white">Scholarship Status</h2>
                </div>
                <div className="px-4 py-3 flex flex-col gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/60 rounded-xl p-3">
                    <p className="text-xs font-bold text-green-800 dark:text-green-300">✅ Merit Scholarship</p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-0.5">Active · ₹25,000/yr · Disbursed</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/60 rounded-xl p-3">
                    <p className="text-xs font-bold text-indigo-800 dark:text-indigo-300">🔄 State OBC Scholarship</p>
                    <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-0.5">Application under review</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/60 rounded-xl p-3">
                    <p className="text-xs font-bold text-orange-800 dark:text-orange-300">📋 PM Scholarship</p>
                    <p className="text-xs text-orange-700 dark:text-orange-400 mt-0.5">Apply by May 15 · Action needed</p>
                  </div>
                  <button className="w-full py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-pointer bg-transparent">
                    View all scholarships →
                  </button>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <span>🏠</span>
                  <h2 className="font-bold text-sm text-gray-900 dark:text-white">Hostel Info</h2>
                </div>
                <div className="px-4 py-3">
                  <div className="flex flex-col gap-2.5 mb-3">
                    {[
                      { l: "Block & Room", v: "A-Block · Room A-214" },
                      { l: "Type", v: "Double Sharing" },
                      { l: "Warden", v: "Mr. K. Nair" },
                      { l: "Mess", v: "Menu A (Veg)" },
                      { l: "WiFi Network", v: "HS-Net-A2" },
                      { l: "Gate Time", v: "10:30 PM" },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{r.l}</p>
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{r.v}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-pointer bg-transparent">
                    🍽 View Today's Mess Menu
                  </button>
                </div>
              </Card>
            </div>

            {/* QUICK LINKS */}
            <Card>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <span>⚡</span>
                <h2 className="font-bold text-sm text-gray-900 dark:text-white">Quick Links</h2>
              </div>
              <div className="p-4 flex gap-3 flex-wrap">
                {[
                  { icon: "📄", label: "Admit Card", bg: "bg-indigo-100 dark:bg-indigo-900/40" },
                  { icon: "💳", label: "Fee Receipt", bg: "bg-green-100 dark:bg-green-900/40" },
                  { icon: "📖", label: "E-Library", bg: "bg-yellow-100 dark:bg-yellow-900/40" },
                  { icon: "🎓", label: "Transcript", bg: "bg-purple-100 dark:bg-purple-900/40" },
                  { icon: "📡", label: "Online Classes", bg: "bg-pink-100 dark:bg-pink-900/40" },
                  { icon: "🗓️", label: "Exam Schedule", bg: "bg-red-100 dark:bg-red-900/40" },
                  { icon: "🔬", label: "Lab Booking", bg: "bg-teal-100 dark:bg-teal-900/40" },
                  { icon: "💬", label: "Faculty Chat", bg: "bg-blue-100 dark:bg-blue-900/40" },
                  { icon: "🏃", label: "Sports Reg.", bg: "bg-orange-100 dark:bg-orange-900/40" },
                  { icon: "🩺", label: "Health Portal", bg: "bg-rose-100 dark:bg-rose-900/40" },
                ].map((link, i) => (
                  <button key={i}
                    className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all min-w-[80px] cursor-pointer group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${link.bg}`}>{link.icon}</div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center leading-tight">{link.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* FOOTER */}
            <div className="text-center py-1">
              <p className="text-xs text-gray-400 dark:text-gray-600">
                StudyPortal v2.5 · Academic Year 2025–26 ·{" "}
                <span className="text-indigo-500 dark:text-indigo-400 cursor-pointer hover:underline">support@studyportal.edu</span>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}