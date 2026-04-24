import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

/* ─── PALETTE ──────────────────────────────────────────── */
const C = {
  primary:   "#6366f1",
  primary2:  "#4f46e5",
  violet:    "#8b5cf6",
  pink:      "#ec4899",
  rose:      "#f43f5e",
  amber:     "#f59e0b",
  emerald:   "#10b981",
  sky:       "#0ea5e9",
  cyan:      "#06b6d4",
  orange:    "#f97316",
};

/* ─── DATA ─────────────────────────────────────────────── */
const classPerf = [
  { cls: "10-A", avg: 78, highest: 95, lowest: 48 },
  { cls: "10-B", avg: 82, highest: 97, lowest: 55 },
  { cls: "11-A", avg: 74, highest: 92, lowest: 41 },
  { cls: "11-B", avg: 88, highest: 99, lowest: 62 },
  { cls: "12-A", avg: 71, highest: 90, lowest: 38 },
  { cls: "12-B", avg: 85, highest: 98, lowest: 59 },
];

const attendanceTrend = [
  { week: "Week 1", "10-A": 92, "10-B": 88, "11-A": 95, "11-B": 90 },
  { week: "Week 2", "10-A": 89, "10-B": 91, "11-A": 93, "11-B": 87 },
  { week: "Week 3", "10-A": 94, "10-B": 85, "11-A": 90, "11-B": 92 },
  { week: "Week 4", "10-A": 88, "10-B": 90, "11-A": 88, "11-B": 94 },
  { week: "Week 5", "10-A": 91, "10-B": 93, "11-A": 96, "11-B": 89 },
  { week: "Week 6", "10-A": 87, "10-B": 89, "11-A": 91, "11-B": 95 },
];

const gradeDist = [
  { name: "A+", value: 18, color: C.emerald  },
  { name: "A",  value: 34, color: C.primary  },
  { name: "B+", value: 29, color: C.sky      },
  { name: "B",  value: 22, color: C.amber    },
  { name: "C",  value: 14, color: C.orange   },
  { name: "D",  value:  7, color: C.rose     },
];

const subjectRadar = [
  { sub: "Algebra",    score: 82 },
  { sub: "Geometry",   score: 74 },
  { sub: "Calculus",   score: 68 },
  { sub: "Statistics", score: 88 },
  { sub: "Probability",score: 77 },
  { sub: "Trigono.",   score: 71 },
];

const submissionArea = [
  { day: "Mon", submitted: 32, pending: 8  },
  { day: "Tue", submitted: 28, pending: 12 },
  { day: "Wed", submitted: 38, pending: 4  },
  { day: "Thu", submitted: 25, pending: 15 },
  { day: "Fri", submitted: 41, pending: 2  },
  { day: "Sat", submitted: 19, pending: 6  },
];

const topStudents = [
  { name: "Priya Sharma",   cls: "11-B", score: 99, trend: "↑", badge: "🥇" },
  { name: "Arjun Mehta",    cls: "10-B", score: 97, trend: "↑", badge: "🥈" },
  { name: "Sneha Iyer",     cls: "12-B", score: 96, trend: "→", badge: "🥉" },
  { name: "Rohit Das",      cls: "11-A", score: 95, trend: "↑", badge: "⭐" },
  { name: "Kavya Nair",     cls: "10-A", score: 93, trend: "↑", badge: "⭐" },
];

const atRisk = [
  { name: "Amit Rao",     cls: "12-A", score: 38, attendance: 64, reason: "Low attendance" },
  { name: "Sonal Gupta",  cls: "10-A", score: 42, attendance: 71, reason: "Failing grades"  },
  { name: "Ravi Kumar",   cls: "11-A", score: 41, attendance: 68, reason: "Both concerns"   },
  { name: "Meena Joshi",  cls: "12-A", score: 45, attendance: 72, reason: "Failing grades"  },
];

const schedule = [
  { time: "8:00–9:00",   cls: "10-A", subj: "Algebra",     room: "R-101", status: "done"    },
  { time: "9:15–10:15",  cls: "11-B", subj: "Calculus",    room: "R-203", status: "done"    },
  { time: "10:30–11:30", cls: "12-A", subj: "Statistics",  room: "R-105", status: "current" },
  { time: "12:30–1:30",  cls: "10-B", subj: "Geometry",    room: "R-101", status: "upcoming"},
  { time: "2:00–3:00",   cls: "11-A", subj: "Probability", room: "Lab-2", status: "upcoming"},
];

const assignments = [
  { title: "Algebra Set — Ch.7",       cls: "10-A", due: "Apr 25", submitted: 34, total: 42, pct: 81 },
  { title: "Calculus Integration WS",  cls: "11-B", due: "Apr 26", submitted: 28, total: 38, pct: 74 },
  { title: "Statistics Project",       cls: "12-A", due: "Apr 28", submitted: 12, total: 40, pct: 30 },
  { title: "Geometry Proof Sheet",     cls: "10-B", due: "Apr 30", submitted: 0,  total: 36, pct:  0 },
  { title: "Trigonometry Practice",    cls: "11-A", due: "May 2",  submitted: 0,  total: 39, pct:  0 },
];

const leaves = [
  { name: "Nisha Patel",  cls: "11-B", date: "Apr 25", reason: "Medical",  status: "pending"  },
  { name: "Dev Singh",    cls: "10-A", date: "Apr 26", reason: "Family",   status: "pending"  },
  { name: "Anjali Roy",   cls: "12-A", date: "Apr 24", reason: "Medical",  status: "approved" },
  { name: "Karan Bose",   cls: "11-A", date: "Apr 23", reason: "Personal", status: "rejected" },
];

const announcements = [
  { title: "Mid-Term Exam Papers to be submitted by Apr 27", posted: "Apr 23", type: "urgent" },
  { title: "Staff Meeting – Thursday 4 PM, Room 202",        posted: "Apr 22", type: "info"   },
  { title: "Result entry portal opens May 1",                posted: "Apr 21", type: "info"   },
  { title: "Sports Day supervision duty assigned",           posted: "Apr 20", type: "event"  },
];

/* ─── SMALL COMPONENTS ─────────────────────────────────── */
function Chip({ children, color = "indigo" }) {
  const map = {
    indigo:  "bg-indigo-100 text-indigo-700",
    green:   "bg-emerald-100 text-emerald-700",
    yellow:  "bg-amber-100 text-amber-700",
    red:     "bg-rose-100 text-rose-700",
    sky:     "bg-sky-100 text-sky-700",
    violet:  "bg-violet-100 text-violet-700",
    orange:  "bg-orange-100 text-orange-700",
    gray:    "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${map[color]}`}>
      {children}
    </span>
  );
}

function SCard({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function SHead({ icon, title, right }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <h2 className="font-bold text-sm text-gray-800">{title}</h2>
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

function Bar2({ pct, color = "#6366f1" }) {
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-xs">
      <p className="font-bold text-gray-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

/* ─── MAIN ─────────────────────────────────────────────── */
export default function TeacherDashboard() {
  const [leaveTab, setLeaveTab] = useState("pending");
  const [assignTab, setAssignTab] = useState("active");

  return (
    <div className="min-h-screen bg-slate-50 p-6" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* ═══════════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════════ */}
      <div className="relative rounded-3xl overflow-hidden mb-6"
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #ec4899 100%)" }}>
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "white", transform: "translate(40%, -40%)" }} />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full opacity-10"
          style={{ background: "white", transform: "translateY(30%)" }} />

        <div className="relative z-10 px-8 py-7 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-indigo-700"
              style={{ background: "rgba(255,255,255,0.9)" }}>
              SR
            </div>
            <div>
              <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-0.5">Teacher Dashboard</p>
              <h1 className="text-white text-2xl font-black leading-tight">Dr. Sunita Rao</h1>
              <p className="text-indigo-200 text-sm mt-0.5">Mathematics Dept. · Senior Teacher · 14 yrs exp.</p>
            </div>
          </div>

          {/* quick meta pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: "🏫", label: "6 Classes" },
              { icon: "👩‍🎓", label: "198 Students" },
              { icon: "📅", label: "Thu, Apr 24, 2026" },
              { icon: "⭐", label: "4.8 / 5 Rating" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)" }}>
                <span>{m.icon}</span>{m.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          STAT CARDS ROW
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
        {[
          { icon: "👩‍🎓", label: "Total Students",  value: "198",  sub: "6 classes",        bg: "#eef2ff", accent: "#6366f1" },
          { icon: "📋", label: "Classes Today",    value: "5",    sub: "1 in progress",    bg: "#f0fdf4", accent: "#10b981" },
          { icon: "📝", label: "Assignments",      value: "12",   sub: "3 due this week",  bg: "#fff7ed", accent: "#f97316" },
          { icon: "✅", label: "Avg Attendance",   value: "88%",  sub: "↑ 2% this month",  bg: "#fdf4ff", accent: "#8b5cf6" },
          { icon: "🏆", label: "Avg Class Score",  value: "79.7", sub: "Top: 99",          bg: "#fff1f2", accent: "#f43f5e" },
          { icon: "⏳", label: "Pending Reviews",  value: "23",   sub: "8 urgent",         bg: "#fefce8", accent: "#f59e0b" },
          { icon: "📅", label: "Leave Requests",   value: "4",    sub: "2 pending",        bg: "#f0f9ff", accent: "#0ea5e9" },
          { icon: "📢", label: "Announcements",    value: "4",    sub: "1 urgent",         bg: "#fff0f3", accent: "#ec4899" },
        ].map((s, i) => (
          <div key={i} className="col-span-2 md:col-span-1 rounded-2xl p-4 border border-white shadow-sm flex flex-col gap-1.5"
            style={{ background: s.bg }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ background: s.accent + "22" }}>
              {s.icon}
            </div>
            <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
            <p className="text-2xl font-black leading-none" style={{ color: s.accent }}>{s.value}</p>
            <p className="text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════
          ROW 1: CLASS PERFORMANCE + ATTENDANCE TREND
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-5 mb-5">

        {/* Class Performance Bar */}
        <SCard>
          <SHead icon="📊" title="Class-wise Performance (Avg / High / Low)"
            right={<Chip color="indigo">This Semester</Chip>} />
          <div className="p-5">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={classPerf} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="cls" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="avg"     name="Average" fill={C.primary}  radius={[5,5,0,0]} />
                <Bar dataKey="highest" name="Highest" fill={C.emerald}  radius={[5,5,0,0]} />
                <Bar dataKey="lowest"  name="Lowest"  fill={C.rose}     radius={[5,5,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SCard>

        {/* Attendance Trend */}
        <SCard>
          <SHead icon="📈" title="Weekly Attendance Trend (%)"
            right={<Chip color="green">Last 6 Weeks</Chip>} />
          <div className="p-5">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="10-A" stroke={C.primary} strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="10-B" stroke={C.pink}    strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="11-A" stroke={C.emerald} strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="11-B" stroke={C.amber}   strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SCard>
      </div>

      {/* ═══════════════════════════════════════════════
          ROW 2: GRADE DISTRIBUTION + SUBJECT RADAR + SUBMISSION AREA
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-5 mb-5">

        {/* Grade Distribution Pie */}
        <SCard>
          <SHead icon="🎓" title="Grade Distribution" right={<Chip color="violet">All Classes</Chip>} />
          <div className="p-4 flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={gradeDist} dataKey="value" nameKey="name" cx="50%" cy="50%"
                  innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {gradeDist.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v} students`, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 w-full mt-2">
              {gradeDist.map((d, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-xs text-gray-600 font-medium">{d.name}: <strong>{d.value}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </SCard>

        {/* Subject Radar */}
        <SCard>
          <SHead icon="🔬" title="Subject-wise Avg Score" right={<Chip color="sky">Mathematics</Chip>} />
          <div className="p-2">
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={subjectRadar} cx="50%" cy="50%" outerRadius={85}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="sub" tick={{ fontSize: 10, fill: "#64748b" }} />
                <Radar name="Avg Score" dataKey="score" stroke={C.violet} fill={C.violet} fillOpacity={0.25} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SCard>

        {/* Submission Area */}
        <SCard>
          <SHead icon="📤" title="Submission Activity" right={<Chip color="orange">This Week</Chip>} />
          <div className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={submissionArea}>
                <defs>
                  <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.primary}  stopOpacity={0.25} />
                    <stop offset="95%" stopColor={C.primary}  stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="pendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.rose}     stopOpacity={0.25} />
                    <stop offset="95%" stopColor={C.rose}     stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="submitted" name="Submitted" stroke={C.primary} fill="url(#subGrad)"  strokeWidth={2} />
                <Area type="monotone" dataKey="pending"   name="Pending"   stroke={C.rose}    fill="url(#pendGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SCard>
      </div>

      {/* ═══════════════════════════════════════════════
          ROW 3: TODAY'S SCHEDULE + ASSIGNMENTS
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-5 mb-5">

        {/* Today Schedule */}
        <SCard>
          <SHead icon="🕐" title="Today's Schedule" right={<Chip color="indigo">5 Classes</Chip>} />
          <div>
            {schedule.map((s, i) => {
              const style =
                s.status === "current"  ? { bg: "bg-indigo-50",  border: "border-l-4 border-indigo-500", badge: "bg-indigo-500 text-white", bText: "Live Now" } :
                s.status === "done"     ? { bg: "",               border: "border-l-4 border-emerald-300", badge: "bg-emerald-100 text-emerald-700", bText: "Done" } :
                                          { bg: "",               border: "border-l-4 border-gray-200",    badge: "bg-gray-100 text-gray-500",       bText: "Soon" };
              return (
                <div key={i} className={`flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 last:border-0 ${style.bg} ${style.border}`}>
                  <div className="min-w-[76px]">
                    <p className={`text-xs font-semibold ${s.status === "current" ? "text-indigo-600" : "text-gray-400"}`}>{s.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{s.subj}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Class {s.cls} · {s.room}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${style.badge}`}>{style.bText}</span>
                </div>
              );
            })}
          </div>
        </SCard>

        {/* Assignments */}
        <SCard>
          <SHead icon="📝" title="Assignment Tracker"
            right={
              <div className="flex gap-1">
                {["active", "closed"].map(t => (
                  <button key={t} onClick={() => setAssignTab(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer transition-colors
                      ${assignTab === t ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            }
          />
          <div className="divide-y divide-gray-50">
            {assignments.map((a, i) => (
              <div key={i} className="px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Chip color="indigo">Class {a.cls}</Chip>
                      <span className="text-xs text-gray-400">Due {a.due}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-700">{a.submitted}<span className="text-gray-400 font-normal">/{a.total}</span></p>
                    <p className="text-xs text-gray-400">submitted</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Bar2 pct={a.pct}
                      color={a.pct >= 70 ? C.emerald : a.pct >= 40 ? C.amber : C.rose} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: a.pct >= 70 ? C.emerald : a.pct >= 40 ? C.amber : C.rose }}>{a.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </SCard>
      </div>

      {/* ═══════════════════════════════════════════════
          ROW 4: TOP STUDENTS + AT-RISK + LEAVE REQUESTS
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-5 mb-5">

        {/* Top Students */}
        <SCard>
          <SHead icon="🏆" title="Top Performers" right={<Chip color="green">All Classes</Chip>} />
          <div className="px-4 py-3 flex flex-col gap-3">
            {topStudents.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors">
                <span className="text-xl">{s.badge}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{s.name}</p>
                  <p className="text-xs text-gray-400">Class {s.cls}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-black" style={{ color: C.primary }}>{s.score}</p>
                  <span className={`text-xs font-bold ${s.trend === "↑" ? "text-emerald-600" : "text-gray-400"}`}>{s.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </SCard>

        {/* At-Risk Students */}
        <SCard>
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100"
            style={{ background: "linear-gradient(90deg, #fff1f2, #fff)" }}>
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <h2 className="font-bold text-sm text-rose-700">At-Risk Students</h2>
            </div>
            <Chip color="red">Needs Attention</Chip>
          </div>
          <div className="px-4 py-3 flex flex-col gap-3">
            {atRisk.map((s, i) => (
              <div key={i} className="p-3 rounded-xl border border-rose-100 bg-rose-50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-400">Class {s.cls}</p>
                  </div>
                  <Chip color="red">{s.reason}</Chip>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-lg px-2.5 py-1.5">
                    <p className="text-xs text-gray-400">Score</p>
                    <p className="text-sm font-black text-rose-600">{s.score}%</p>
                  </div>
                  <div className="bg-white rounded-lg px-2.5 py-1.5">
                    <p className="text-xs text-gray-400">Attendance</p>
                    <p className="text-sm font-black text-amber-600">{s.attendance}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SCard>

        {/* Leave Requests */}
        <SCard>
          <SHead icon="🏥" title="Leave Requests"
            right={
              <div className="flex gap-1">
                {["pending", "all"].map(t => (
                  <button key={t} onClick={() => setLeaveTab(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer transition-colors
                      ${leaveTab === t ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-500 border-gray-200"}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            }
          />
          <div className="px-4 py-3 flex flex-col gap-3">
            {leaves
              .filter(l => leaveTab === "all" || l.status === "pending")
              .map((l, i) => {
                const st =
                  l.status === "pending"  ? { bg: "bg-amber-50 border-amber-200",   badge: "bg-amber-100 text-amber-700"   } :
                  l.status === "approved" ? { bg: "bg-emerald-50 border-emerald-200", badge: "bg-emerald-100 text-emerald-700" } :
                                            { bg: "bg-rose-50 border-rose-200",      badge: "bg-rose-100 text-rose-700"     };
                return (
                  <div key={i} className={`p-3 rounded-xl border ${st.bg}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-800">{l.name}</p>
                        <p className="text-xs text-gray-400">Class {l.cls} · {l.date}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Reason: {l.reason}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${st.badge}`}>{l.status}</span>
                    </div>
                    {l.status === "pending" && (
                      <div className="flex gap-2 mt-2.5">
                        <button className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer border-0">✓ Approve</button>
                        <button className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors cursor-pointer border-0">✕ Reject</button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </SCard>
      </div>

      {/* ═══════════════════════════════════════════════
          ROW 5: STUDENT PERFORMANCE TABLE (full-width)
      ═══════════════════════════════════════════════ */}
      <SCard className="mb-5">
        <SHead icon="📋" title="Full Student Performance Summary — Class 11-B"
          right={
            <div className="flex gap-2 items-center">
              <select className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 outline-none">
                {["11-B","10-A","10-B","11-A","12-A","12-B"].map(c => <option key={c}>{c}</option>)}
              </select>
              <Chip color="indigo">38 Students</Chip>
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-indigo-50">
                {["#","Student Name","Roll No","Mid-Term","Assignment","Attendance","Total","Grade","Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-bold text-indigo-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Priya Sharma",   roll: "11B-01", mid: 49, asgn: 20, att: 96, grade: "A+",  status: "excellent" },
                { name: "Arjun Mehta",    roll: "11B-02", mid: 47, asgn: 19, att: 90, grade: "A",   status: "good"      },
                { name: "Kavya Patel",    roll: "11B-03", mid: 43, asgn: 18, att: 88, grade: "A-",  status: "good"      },
                { name: "Rohan Joshi",    roll: "11B-04", mid: 39, asgn: 16, att: 82, grade: "B+",  status: "average"   },
                { name: "Deepa Singh",    roll: "11B-05", mid: 35, asgn: 14, att: 79, grade: "B",   status: "average"   },
                { name: "Aman Roy",       roll: "11B-06", mid: 28, asgn: 11, att: 65, grade: "C",   status: "at-risk"   },
                { name: "Sneha Bose",     roll: "11B-07", mid: 45, asgn: 19, att: 94, grade: "A",   status: "good"      },
                { name: "Vikram Nair",    roll: "11B-08", mid: 32, asgn: 13, att: 72, grade: "B-",  status: "average"   },
                { name: "Pooja Das",      roll: "11B-09", mid: 48, asgn: 20, att: 97, grade: "A+",  status: "excellent" },
                { name: "Nikhil Rao",     roll: "11B-10", mid: 22, asgn:  9, att: 61, grade: "D",   status: "at-risk"   },
              ].map((s, i) => {
                const total = s.mid + s.asgn;
                const statusStyle =
                  s.status === "excellent" ? "bg-emerald-100 text-emerald-700" :
                  s.status === "good"      ? "bg-indigo-100 text-indigo-700"   :
                  s.status === "average"   ? "bg-amber-100 text-amber-700"     :
                                             "bg-rose-100 text-rose-700";
                const gradeStyle = s.grade.startsWith("A") ? "text-emerald-600" : s.grade.startsWith("B") ? "text-indigo-600" : s.grade === "C" ? "text-amber-600" : "text-rose-600";
                return (
                  <tr key={i} className="border-t border-gray-100 hover:bg-indigo-50/40 transition-colors">
                    <td className="px-4 py-3 text-gray-400 font-medium">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                          style={{ background: ["#6366f1","#8b5cf6","#ec4899","#10b981","#f59e0b","#0ea5e9","#f43f5e","#f97316","#06b6d4","#6366f1"][i] }}>
                          {s.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-800 whitespace-nowrap">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{s.roll}</td>
                    <td className="px-4 py-3 font-medium text-gray-700">{s.mid}/50</td>
                    <td className="px-4 py-3 font-medium text-gray-700">{s.asgn}/20</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${s.att}%`, background: s.att >= 80 ? C.emerald : C.rose }} />
                        </div>
                        <span className={`text-xs font-semibold ${s.att >= 80 ? "text-emerald-600" : "text-rose-600"}`}>{s.att}%</span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 font-black ${gradeStyle}`}>{total}/70</td>
                    <td className="px-4 py-3"><span className={`font-black text-sm ${gradeStyle}`}>{s.grade}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${statusStyle}`}>{s.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">Showing 10 of 38 students</p>
          <button className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer bg-transparent border-0">View All Students →</button>
        </div>
      </SCard>

      {/* ═══════════════════════════════════════════════
          ROW 6: ANNOUNCEMENTS + QUICK ACTIONS + TO-DO
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-5 mb-5">

        {/* Announcements */}
        <SCard>
          <SHead icon="📢" title="Announcements" right={<Chip color="red">1 Urgent</Chip>} />
          <div className="px-4 py-3 flex flex-col gap-3">
            {announcements.map((a, i) => {
              const style =
                a.type === "urgent" ? { dot: "bg-rose-500",   bg: "bg-rose-50 border-rose-200",     badge: <Chip color="red">URGENT</Chip> } :
                a.type === "event"  ? { dot: "bg-emerald-500", bg: "bg-emerald-50 border-emerald-200", badge: <Chip color="green">EVENT</Chip> } :
                                      { dot: "bg-indigo-400",  bg: "bg-indigo-50 border-indigo-200",  badge: <Chip color="indigo">INFO</Chip> };
              return (
                <div key={i} className={`p-3 rounded-xl border flex gap-3 ${style.bg}`}>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${style.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <p className="text-xs font-semibold text-gray-800">{a.title}</p>
                      {style.badge}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{a.posted}</p>
                  </div>
                </div>
              );
            })}
            <button className="w-full py-2 rounded-xl text-xs font-bold text-white cursor-pointer border-0 hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}>
              + Post New Announcement
            </button>
          </div>
        </SCard>

        {/* Quick Actions */}
        <SCard>
          <SHead icon="⚡" title="Quick Actions" />
          <div className="p-4 grid grid-cols-2 gap-3">
            {[
              { icon: "📝", label: "Create Assignment",   bg: "#eef2ff", color: "#6366f1" },
              { icon: "📊", label: "Enter Marks",         bg: "#f0fdf4", color: "#10b981" },
              { icon: "📅", label: "Mark Attendance",     bg: "#fff7ed", color: "#f97316" },
              { icon: "📢", label: "Send Notice",         bg: "#fdf4ff", color: "#8b5cf6" },
              { icon: "📋", label: "View Reports",        bg: "#fff1f2", color: "#f43f5e" },
              { icon: "💬", label: "Message Students",    bg: "#f0f9ff", color: "#0ea5e9" },
              { icon: "📤", label: "Upload Material",     bg: "#fefce8", color: "#f59e0b" },
              { icon: "🗓️", label: "Schedule Class",      bg: "#fff0f3", color: "#ec4899" },
            ].map((a, i) => (
              <button key={i}
                className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer border border-transparent hover:scale-105 transition-transform"
                style={{ background: a.bg }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: a.color + "22" }}>
                  {a.icon}
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </SCard>

        {/* To-Do List */}
        <SCard>
          <SHead icon="✅" title="My To-Do" right={<Chip color="orange">5 Pending</Chip>} />
          <div className="px-4 py-3 flex flex-col gap-2">
            {[
              { task: "Grade 12-A Statistics Paper",       due: "Today",    done: false, color: C.rose    },
              { task: "Upload Calculus notes to portal",   due: "Today",    done: false, color: C.rose    },
              { task: "Submit syllabus completion form",   due: "Apr 25",   done: false, color: C.amber   },
              { task: "Prepare 10-A unit test paper",      due: "Apr 26",   done: false, color: C.amber   },
              { task: "Review scholarship nominations",    due: "Apr 28",   done: false, color: C.sky     },
              { task: "Coordinate with lab assistant",     due: "Apr 29",   done: true,  color: C.emerald },
              { task: "Submit lesson plan for May",        due: "Apr 30",   done: true,  color: C.emerald },
            ].map((t, i) => (
              <div key={i} className={`flex items-start gap-3 p-2.5 rounded-xl ${t.done ? "opacity-50" : ""} hover:bg-gray-50 transition-colors`}>
                <div className={`w-4 h-4 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border-2 ${t.done ? "border-emerald-500 bg-emerald-500" : "border-gray-300"}`}
                  style={{ borderColor: t.done ? C.emerald : undefined }}>
                  {t.done && <span className="text-white text-xs leading-none">✓</span>}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${t.done ? "line-through text-gray-400" : "text-gray-800"}`}>{t.task}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: t.done ? "#94a3b8" : t.color }}>Due: {t.due}</p>
                </div>
              </div>
            ))}
            <button className="mt-1 w-full py-2 rounded-xl text-xs font-bold border border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer bg-transparent">
              + Add Task
            </button>
          </div>
        </SCard>
      </div>

      {/* ═══════════════════════════════════════════════
          ROW 7: FEE STATUS + RESOURCES + DEPARTMENT
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-5 mb-5">

        {/* Fee Status Overview */}
        <SCard>
          <SHead icon="💳" title="Class Fee Status" right={<Chip color="sky">All Classes</Chip>} />
          <div className="px-4 py-3 flex flex-col gap-3">
            {[
              { cls: "10-A", paid: 38, total: 42, pct: 90 },
              { cls: "10-B", paid: 33, total: 36, pct: 92 },
              { cls: "11-A", paid: 30, total: 39, pct: 77 },
              { cls: "11-B", paid: 36, total: 38, pct: 95 },
              { cls: "12-A", paid: 28, total: 40, pct: 70 },
              { cls: "12-B", paid: 37, total: 41, pct: 90 },
            ].map((f, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-700">Class {f.cls}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{f.paid}/{f.total} paid</span>
                    <span className="text-xs font-bold" style={{ color: f.pct >= 90 ? C.emerald : f.pct >= 80 ? C.amber : C.rose }}>{f.pct}%</span>
                  </div>
                </div>
                <Bar2 pct={f.pct} color={f.pct >= 90 ? C.emerald : f.pct >= 80 ? C.amber : C.rose} />
              </div>
            ))}
          </div>
        </SCard>

        {/* Shared Resources */}
        <SCard>
          <SHead icon="📂" title="Uploaded Resources" right={<button className="text-xs font-bold text-indigo-600 cursor-pointer bg-transparent border-0">+ Upload</button>} />
          <div className="divide-y divide-gray-50">
            {[
              { title: "Algebra — Chapter 7 Notes",    cls: "10-A", type: "PDF", date: "Apr 22", size: "2.1 MB" },
              { title: "Calculus Integration Sheet",   cls: "11-B", type: "PDF", date: "Apr 20", size: "0.9 MB" },
              { title: "Statistics Project Guide",     cls: "12-A", type: "DOC", date: "Apr 18", size: "1.4 MB" },
              { title: "Geometry Practice Problems",   cls: "10-B", type: "PDF", date: "Apr 16", size: "3.2 MB" },
              { title: "Mid-Term Preparation Slides",  cls: "All",  type: "PPT", date: "Apr 14", size: "8.7 MB" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                <span className={`text-xs font-black px-1.5 py-1 rounded-lg flex-shrink-0
                  ${r.type === "PDF" ? "bg-rose-100 text-rose-600" : r.type === "DOC" ? "bg-sky-100 text-sky-600" : "bg-orange-100 text-orange-600"}`}>
                  {r.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{r.title}</p>
                  <p className="text-xs text-gray-400">Class {r.cls} · {r.size} · {r.date}</p>
                </div>
                <button className="text-gray-400 hover:text-indigo-600 text-sm cursor-pointer bg-transparent border-0">⬇</button>
              </div>
            ))}
          </div>
        </SCard>

        {/* Department Info */}
        <SCard>
          <SHead icon="🏫" title="Department Info" />
          <div className="px-4 py-4 flex flex-col gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="text-xs font-bold text-indigo-700 mb-2">📋 Teacher Profile</p>
              <div className="flex flex-col gap-1.5">
                {[
                  ["Department",  "Mathematics"],
                  ["Designation", "Senior Teacher"],
                  ["Employee ID", "TCH-2041"],
                  ["Experience",  "14 Years"],
                  ["Qualification","M.Sc., B.Ed."],
                  ["Contact",     "+91 98765 43210"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-xs text-indigo-600">{k}</span>
                    <span className="text-xs font-bold text-indigo-900">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs font-bold text-emerald-700 mb-2">📅 Upcoming Meetings</p>
              {[
                { title: "HOD Review Meeting",    time: "Apr 25 · 10 AM" },
                { title: "Parent–Teacher Meet",   time: "Apr 28 · 9 AM"  },
                { title: "Exam Duty Briefing",    time: "Apr 30 · 2 PM"  },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5 last:mb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{m.title}</p>
                    <p className="text-xs text-gray-400">{m.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-xs font-bold text-amber-700 mb-2">⚠️ Pending Duties</p>
              {["Submit exam invigilation report","Sign attendance register — 10-A","Upload April marks to ERP"].map((d, i) => (
                <div key={i} className="flex items-start gap-2 mb-1 last:mb-0">
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                  <p className="text-xs text-amber-800">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </SCard>
      </div>

      {/* FOOTER */}
      <div className="text-center py-3">
        <p className="text-xs text-gray-400">StudyPortal ERP v2.5 · Academic Year 2025–26 · Mathematics Department · <span className="text-indigo-500 hover:underline cursor-pointer">support@studyportal.edu</span></p>
      </div>

    </div>
  );
}