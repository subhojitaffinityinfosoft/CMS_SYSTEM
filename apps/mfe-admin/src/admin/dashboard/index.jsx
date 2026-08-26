import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, ComposedChart, Scatter
} from "recharts";
import { DcryptText, getStorageData } from '@/lib/Storage';

const P = {
  indigo: "#6366f1", violet: "#8b5cf6", pink: "#ec4899",
  rose: "#f43f5e", amber: "#f59e0b", emerald: "#10b981",
  sky: "#0ea5e9", cyan: "#06b6d4", orange: "#f97316",
  teal: "#14b8a6", lime: "#84cc16", fuchsia: "#d946ef",
};


const enrollmentTrend = [
  { month: "Jun", students: 1120, teachers: 78 }, { month: "Jul", students: 1180, teachers: 80 },
  { month: "Aug", students: 1250, teachers: 82 }, { month: "Sep", students: 1310, teachers: 85 },
  { month: "Oct", students: 1290, teachers: 85 }, { month: "Nov", students: 1340, teachers: 87 },
  { month: "Dec", students: 1300, teachers: 86 }, { month: "Jan", students: 1380, teachers: 89 },
  { month: "Feb", students: 1420, teachers: 91 }, { month: "Mar", students: 1460, teachers: 92 },
  { month: "Apr", students: 1498, teachers: 94 },
];

const deptStudents = [
  { dept: "Science", students: 420, teachers: 22, rooms: 18 },
  { dept: "Commerce", students: 310, teachers: 16, rooms: 12 },
  { dept: "Arts", students: 280, teachers: 18, rooms: 14 },
  { dept: "Math", students: 260, teachers: 14, rooms: 10 },
  { dept: "CS", students: 228, teachers: 24, rooms: 16 },
];

const attendancePie = [
  { name: "Present", value: 88, color: P.emerald },
  { name: "Absent", value: 7, color: P.rose },
  { name: "Leave", value: 5, color: P.amber },
];

const genderPie = [
  { name: "Male", value: 782, color: P.sky },
  { name: "Female", value: 716, color: P.pink },
];

const classDistPie = [
  { name: "Grade 9", value: 312, color: P.indigo },
  { name: "Grade 10", value: 348, color: P.violet },
  { name: "Grade 11", value: 420, color: P.teal },
  { name: "Grade 12", value: 418, color: P.emerald },
];

const feeCollectionArea = [
  { month: "Nov", collected: 820000, target: 900000 }, { month: "Dec", collected: 870000, target: 900000 },
  { month: "Jan", collected: 910000, target: 950000 }, { month: "Feb", collected: 890000, target: 950000 },
  { month: "Mar", collected: 975000, target: 1000000 }, { month: "Apr", collected: 780000, target: 1000000 },
];

const infraData = [
  { name: "Classrooms", total: 48, occupied: 44, pct: 92, color: P.indigo },
  { name: "Labs", total: 12, occupied: 10, pct: 83, color: P.emerald },
  { name: "Library", total: 1, occupied: 1, pct: 100, color: P.amber },
  { name: "Hostel", total: 8, occupied: 7, pct: 88, color: P.violet },
  { name: "Sports", total: 6, occupied: 4, pct: 67, color: P.orange },
];

const radarPerf = [
  { sub: "Academics", score: 82 }, { sub: "Sports", score: 74 },
  { sub: "Culture", score: 88 }, { sub: "Attendance", score: 91 },
  { sub: "Discipline", score: 85 }, { sub: "Placement", score: 69 },
];

const recentActivity = [
  { action: "New student admission – Priya Sharma (Grade 10)", time: "10 min ago", type: "admission", user: "Admin" },
  { action: "Teacher Dr. Ravi Kumar marked absent", time: "25 min ago", type: "attendance", user: "System" },
  { action: "Fee paid – ₹12,500 by Rohit Das (Grade 11)", time: "1 hr ago", type: "fee", user: "Portal" },
  { action: "Exam schedule published for Grade 12", time: "2 hrs ago", type: "exam", user: "Admin" },
  { action: "New notice posted: Sports Day", time: "3 hrs ago", type: "notice", user: "Principal" },
  { action: "Library book issued – 14 students", time: "4 hrs ago", type: "library", user: "Librarian" },
  { action: "Complaint raised – Hostel water supply", time: "5 hrs ago", type: "complaint", user: "Student" },
  { action: "IT lab maintenance completed", time: "Yesterday", type: "maintenance", user: "IT Dept" },
];

const complaints = [
  { id: "CPL-041", title: "Canteen food quality", raised: "Riya Jain", dept: "Student", date: "Apr 23", status: "open", priority: "medium" },
  { id: "CPL-040", title: "Projector not working – RM 204", raised: "Dr. Mehta", dept: "Faculty", date: "Apr 22", status: "in-progress", priority: "high" },
  { id: "CPL-039", title: "Hostel water supply issue", raised: "Arun Roy", dept: "Student", date: "Apr 21", status: "open", priority: "high" },
  { id: "CPL-038", title: "Library WiFi slow", raised: "Sneha P.", dept: "Student", date: "Apr 20", status: "resolved", priority: "low" },
  { id: "CPL-037", title: "Bus route change needed", raised: "Parents Assoc.", dept: "External", date: "Apr 19", status: "in-progress", priority: "medium" },
];

const teachers = [
  { name: "Dr. Sunita Rao", dept: "Maths", classes: 6, students: 198, rating: 4.8, status: "active", exp: "14 yrs" },
  { name: "Prof. A. Mehta", dept: "Physics", classes: 5, students: 165, rating: 4.6, status: "active", exp: "11 yrs" },
  { name: "Dr. K. Iyer", dept: "Chemistry", classes: 5, students: 172, rating: 4.7, status: "active", exp: "9 yrs" },
  { name: "Ms. P. Das", dept: "English", classes: 4, students: 148, rating: 4.5, status: "active", exp: "7 yrs" },
  { name: "Mr. R. Sharma", dept: "History", classes: 4, students: 132, rating: 4.3, status: "on-leave", exp: "12 yrs" },
  { name: "Dr. V. Nair", dept: "Biology", classes: 5, students: 160, rating: 4.9, status: "active", exp: "16 yrs" },
];

const notices = [
  { title: "Annual Day celebration on May 20", date: "Apr 23", audience: "All", type: "event", priority: "normal" },
  { title: "Mid-semester examination schedule released", date: "Apr 22", audience: "Students", type: "exam", priority: "high" },
  { title: "Fee payment deadline reminder – April 30", date: "Apr 21", audience: "Parents", type: "fee", priority: "high" },
  { title: "Staff meeting – May 1, 10 AM", date: "Apr 20", audience: "Staff", type: "meeting", priority: "normal" },
  { title: "New library books added – 240 volumes", date: "Apr 18", audience: "All", type: "info", priority: "low" },
];

/* ── TINY COMPONENTS ─────────────────────────────────── */
const Chip = ({ children, color = "indigo" }) => {
  const m = {
    indigo: "bg-indigo-100 text-indigo-700", green: "bg-emerald-100 text-emerald-700",
    yellow: "bg-amber-100 text-amber-700", red: "bg-rose-100 text-rose-700",
    sky: "bg-sky-100 text-sky-700", violet: "bg-violet-100 text-violet-700",
    orange: "bg-orange-100 text-orange-700", gray: "bg-gray-100 text-gray-600",
    pink: "bg-pink-100 text-pink-700", teal: "bg-teal-100 text-teal-700"
  };
  return <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${m[color] || m.gray}`}>{children}</span>;
};

const SCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>{children}</div>
);

const SHead = ({ icon, title, right }) => (
  <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
    <div className="flex items-center gap-2">
      <span className="text-base">{icon}</span>
      <h2 className="font-bold text-sm text-gray-800">{title}</h2>
    </div>
    {right && <div>{right}</div>}
  </div>
);

const BarPct = ({ pct, color }) => (
  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
  </div>
);

const TTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-xs">
      <p className="font-bold text-gray-700 mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value?.toLocaleString()}</strong></p>)}
    </div>
  );
};

const activityIcon = { admission: "🎓", attendance: "📋", fee: "💳", exam: "📝", notice: "📢", library: "📚", complaint: "⚠️", maintenance: "🔧" };
const activityColor = { admission: P.indigo, attendance: P.emerald, fee: P.amber, exam: P.violet, notice: P.pink, library: P.sky, complaint: P.rose, maintenance: P.orange };





/* ── DATA ────────────────────────────────────────────── */
const monthlyRevExp = [
  { month: "Nov", revenue: 920000, expenses: 610000, profit: 310000 },
  { month: "Dec", revenue: 1050000, expenses: 680000, profit: 370000 },
  { month: "Jan", revenue: 980000, expenses: 640000, profit: 340000 },
  { month: "Feb", revenue: 910000, expenses: 620000, profit: 290000 },
  { month: "Mar", revenue: 1120000, expenses: 710000, profit: 410000 },
  { month: "Apr", revenue: 860000, expenses: 580000, profit: 280000 },
];

const feeTypePie = [
  { name: "Tuition Fee", value: 58, color: P.indigo },
  { name: "Hostel Fee", value: 18, color: P.emerald },
  { name: "Transport", value: 10, color: P.amber },
  { name: "Library", value: 6, color: P.sky },
  { name: "Sports", value: 5, color: P.pink },
  { name: "Misc", value: 3, color: P.orange },
];

const expenseBreakPie = [
  { name: "Salaries", value: 52, color: P.violet },
  { name: "Maintenance", value: 14, color: P.orange },
  { name: "Utilities", value: 10, color: P.amber },
  { name: "Supplies", value: 9, color: P.teal },
  { name: "Events", value: 8, color: P.pink },
  { name: "Others", value: 7, color: "#94a3b8" },
];

const paymentModePie = [
  { name: "Online", value: 62, color: P.sky },
  { name: "Cash", value: 22, color: P.amber },
  { name: "Cheque", value: 10, color: P.indigo },
  { name: "DD/NEFT", value: 6, color: P.emerald },
];

const statusPie = [
  { name: "Paid", value: 1186, color: P.emerald },
  { name: "Partial", value: 182, color: P.amber },
  { name: "Pending", value: 130, color: P.rose },
];

const cashFlowLine = [
  { week: "W1", inflow: 280000, outflow: 195000 }, { week: "W2", inflow: 310000, outflow: 220000 },
  { week: "W3", inflow: 260000, outflow: 185000 }, { week: "W4", inflow: 290000, outflow: 210000 },
  { week: "W5", inflow: 340000, outflow: 230000 }, { week: "W6", inflow: 220000, outflow: 170000 },
];

const salaryData = [
  { dept: "Maths", count: 22, amount: 660000, status: "disbursed" },
  { dept: "Science", count: 28, amount: 840000, status: "disbursed" },
  { dept: "Arts", count: 18, amount: 504000, status: "pending" },
  { dept: "Commerce", count: 16, amount: 448000, status: "disbursed" },
  { dept: "Admin", count: 10, amount: 450000, status: "disbursed" },
];

const recentTxns = [
  { id: "TXN-8821", name: "Priya Sharma", cls: "11-B", amount: 18500, type: "tuition", mode: "Online", date: "Apr 24", status: "success" },
  { id: "TXN-8820", name: "Rohit Das", cls: "10-A", amount: 18500, type: "tuition", mode: "Cash", date: "Apr 24", status: "success" },
  { id: "TXN-8819", name: "Sneha Iyer", cls: "12-A", amount: 22000, type: "full", mode: "Online", date: "Apr 23", status: "success" },
  { id: "TXN-8818", name: "Amit Rao", cls: "12-A", amount: 5000, type: "partial", mode: "Cash", date: "Apr 23", status: "success" },
  { id: "TXN-8817", name: "Kavya Nair", cls: "10-B", amount: 18500, type: "tuition", mode: "Cheque", date: "Apr 22", status: "pending" },
  { id: "TXN-8816", name: "Vikram Singh", cls: "11-A", amount: 18500, type: "tuition", mode: "Online", date: "Apr 22", status: "success" },
  { id: "TXN-8815", name: "Meena Joshi", cls: "9-B", amount: 15000, type: "tuition", mode: "Cash", date: "Apr 22", status: "success" },
  { id: "TXN-8814", name: "Arjun Mehta", cls: "10-B", amount: 18500, type: "tuition", mode: "Online", date: "Apr 21", status: "failed" },
];

const pendingFees = [
  { name: "Sonal Gupta", cls: "10-A", due: 18500, paid: 5000, overdue: "45 days", warn: true },
  { name: "Aman Roy", cls: "11-B", due: 22000, paid: 0, overdue: "60 days", warn: true },
  { name: "Dev Singh", cls: "9-A", due: 15000, paid: 8000, overdue: "30 days", warn: false },
  { name: "Riya Jain", cls: "12-B", due: 22000, paid: 12000, overdue: "15 days", warn: false },
  { name: "Nikhil Rao", cls: "11-A", due: 18500, paid: 0, overdue: "75 days", warn: true },
];

const budgetVsActual = [
  { cat: "Salaries", budget: 3200000, actual: 3100000 },
  { cat: "Maintenance", budget: 900000, actual: 780000 },
  { cat: "Utilities", budget: 650000, actual: 580000 },
  { cat: "Events", budget: 500000, actual: 420000 },
  { cat: "Supplies", budget: 600000, actual: 510000 },
  { cat: "IT/Tech", budget: 400000, actual: 350000 },
];

/* ── HELPERS ─────────────────────────────────────────── */
const fmt = (n) => `₹${(n / 100000).toFixed(2)}L`;
const fmtK = (n) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n >= 1000 ? `₹${(n / 1000).toFixed(0)}K` : `₹${n}`;


export default function AdminDashboard() {
  const [user_sub_role] = useState(DcryptText(getStorageData(import.meta.env.VITE_SUBROLE)));
  const [complaintFilter, setComplaintFilter] = useState("all");
  const [teacherSearch, setTeacherSearch] = useState("");

  const filteredComplaints = complaints.filter(c => complaintFilter === "all" || c.status === complaintFilter);
  const filteredTeachers = teachers.filter(t => t.name.toLowerCase().includes(teacherSearch.toLowerCase()) || t.dept.toLowerCase().includes(teacherSearch.toLowerCase()));
  const [txnFilter, setTxnFilter] = useState("all");
  const [activeInvoiceTab, setActiveInvoiceTab] = useState("unpaid");

  const filteredTxns = txnFilter === "all"
    ? recentTxns
    : recentTxns.filter(t => t.status === txnFilter);
  return (
    <>
      
      {user_sub_role === 'ACCOUNTANT' ? 
      <div className="min-h-screen bg-slate-50 p-6" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

        {/* ═══ HERO BANNER ═══ */}
        <div className="relative rounded-3xl overflow-hidden mb-6"
          style={{ background: "linear-gradient(135deg,#064e3b 0%,#065f46 30%,#10b981 65%,#34d399 100%)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 15% 85%,#fff 0%,transparent 50%),radial-gradient(circle at 85% 15%,#6ee7b7 0%,transparent 50%)" }} />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5" style={{ background: "white", transform: "translate(25%,-25%)" }} />
          <div className="relative z-10 px-8 py-7">
            <div className="flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>💼</div>
                <div>
                  <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-1">Accounts Department</p>
                  <h1 className="text-white text-3xl font-black leading-tight">Mr. Rakesh Banerjee</h1>
                  <p className="text-emerald-200 text-sm mt-1">Senior Accountant · Sunrise Public School · Emp ID: ACC-007</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: "📅", label: "Apr 24, 2026" },
                  { icon: "🏦", label: "FY 2025–26" },
                  { icon: "📊", label: "Q4 Period" },
                  { icon: "✅", label: "Audit Cleared" },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)" }}>
                    {m.icon} {m.label}
                  </div>
                ))}
              </div>
            </div>

            {/* hero mini KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
              {[
                { label: "Total Revenue (Apr)", value: "₹8.6L", sub: "vs ₹10L target", icon: "💰", clr: "#6ee7b7" },
                { label: "Total Expenses (Apr)", value: "₹5.8L", sub: "↓ 3% vs Mar", icon: "💸", clr: "#fcd34d" },
                { label: "Net Profit (Apr)", value: "₹2.8L", sub: "32% margin", icon: "📈", clr: "#a5f3fc" },
                { label: "Fee Pending", value: "₹14.2L", sub: "312 students", icon: "⏳", clr: "#fca5a5" },
                { label: "Today Collections", value: "₹74K", sub: "8 transactions", icon: "✅", clr: "#86efac" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(6px)" }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: s.clr }}>{s.icon} {s.label}</p>
                  <p className="text-xl font-black text-white leading-none">{s.value}</p>
                  <p className="text-xs text-emerald-300 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ STAT CARDS ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
          {[
            { icon: "💰", label: "Annual Revenue", value: "₹1.12Cr", sub: "FY 2025–26", bg: "#f0fdf4", acc: P.emerald },
            { icon: "💸", label: "Annual Expenses", value: "₹71.0L", sub: "↓ 4% vs last yr", bg: "#fff7ed", acc: P.orange },
            { icon: "📈", label: "Net Profit", value: "₹41.0L", sub: "36.6% margin", bg: "#eef2ff", acc: P.indigo },
            { icon: "⏳", label: "Fee Pending", value: "₹14.2L", sub: "312 students", bg: "#fff1f2", acc: P.rose },
            { icon: "✅", label: "Fee Collected", value: "₹97.5L", sub: "87% of target", bg: "#f0fdfa", acc: P.teal },
            { icon: "🧾", label: "Invoices (Apr)", value: "48", sub: "12 unpaid", bg: "#fefce8", acc: P.amber },
            { icon: "💳", label: "Txns Today", value: "8", sub: "₹74K collected", bg: "#fdf4ff", acc: P.violet },
            { icon: "🏦", label: "Bank Balance", value: "₹28.4L", sub: "As of today", bg: "#f0f9ff", acc: P.sky },
          ].map((s, i) => (
            <div key={i} className="col-span-2 md:col-span-1 rounded-2xl p-4 shadow-sm flex flex-col gap-1.5" style={{ background: s.bg }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: s.acc + "22" }}>{s.icon}</div>
              <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
              <p className="text-2xl font-black leading-none" style={{ color: s.acc }}>{s.value}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ═══ ROW 1: REVENUE VS EXPENSE + CASH FLOW ═══ */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <SCard>
            <SHead icon="📊" title="Monthly Revenue vs Expenses vs Profit" right={<Chip color="green">6 Months</Chip>} />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={monthlyRevExp}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                  <Tooltip content={<TTip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="revenue" name="Revenue" fill={P.emerald} radius={[5, 5, 0, 0]} barSize={18} />
                  <Bar dataKey="expenses" name="Expenses" fill={P.rose} radius={[5, 5, 0, 0]} barSize={18} />
                  <Line type="monotone" dataKey="profit" name="Net Profit" stroke={P.amber} strokeWidth={2.5} dot={{ r: 4, fill: P.amber }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </SCard>

          <SCard>
            <SHead icon="💧" title="Weekly Cash Inflow vs Outflow" right={<Chip color="teal">Apr 2026</Chip>} />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={cashFlowLine}>
                  <defs>
                    <linearGradient id="inGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={P.emerald} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={P.emerald} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="outGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={P.rose} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={P.rose} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
                  <Tooltip content={<TTip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="inflow" name="Cash In" stroke={P.emerald} fill="url(#inGrad)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="outflow" name="Cash Out" stroke={P.rose} fill="url(#outGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SCard>
        </div>

        {/* ═══ ROW 2: FOUR PIE CHARTS ═══ */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { title: "Fee Type Breakdown", data: feeTypePie, icon: "🎓" },
            { title: "Expense Categories", data: expenseBreakPie, icon: "💸" },
            { title: "Payment Mode Split", data: paymentModePie, icon: "💳" },
            { title: "Fee Payment Status", data: statusPie, icon: "✅" },
          ].map((pie, idx) => (
            <SCard key={idx}>
              <SHead icon={pie.icon} title={pie.title} />
              <div className="px-3 py-2 flex flex-col items-center">
                <ResponsiveContainer width="100%" height={155}>
                  <PieChart>
                    <Pie data={pie.data} dataKey="value" cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3}>
                      {pie.data.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip formatter={(v, n) => [v, n]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-1.5 w-full px-2 pb-3">
                  {pie.data.map((d, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-xs text-gray-600">{d.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-800">{d.value}{typeof d.value === "number" && d.value < 200 ? "%" : ""}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SCard>
          ))}
        </div>

        {/* ═══ ROW 3: BUDGET VS ACTUAL + SALARY ═══ */}
        <div className="grid grid-cols-2 gap-5 mb-5">

          {/* Budget vs Actual */}
          <SCard>
            <SHead icon="📋" title="Budget vs Actual Expenditure (FY 2025–26)" right={<Chip color="orange">Annual</Chip>} />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={budgetVsActual} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="cat" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} />
                  <Tooltip content={<TTip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="budget" name="Budget" fill={P.sky} radius={[5, 5, 0, 0]} />
                  <Bar dataKey="actual" name="Actual" fill={P.emerald} radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="px-5 pb-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total Budget", value: "₹62.5L", color: P.sky },
                  { label: "Total Spent", value: "₹57.4L", color: P.emerald },
                  { label: "Saved", value: "₹5.1L", color: P.amber },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl px-3 py-2.5 text-center" style={{ background: s.color + "12" }}>
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-sm font-black mt-0.5" style={{ color: s.color }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </SCard>

          {/* Salary Disbursement */}
          <SCard>
            <SHead icon="💼" title="Salary Disbursement — April 2026" right={<Chip color="violet">₹30.0L Total</Chip>} />
            <div className="px-5 py-4 flex flex-col gap-3.5">
              {salaryData.map((s, i) => {
                const pct = Math.round((s.amount / 3200000) * 100);
                return (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-700">{s.dept}</span>
                        <span className="text-xs text-gray-400">{s.count} staff</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gray-700">{fmtK(s.amount)}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                        ${s.status === "disbursed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                          {s.status === "disbursed" ? "✓ Done" : "⏳ Pending"}
                        </span>
                      </div>
                    </div>
                    <BarPct pct={pct} color={s.status === "disbursed" ? P.emerald : P.amber} />
                  </div>
                );
              })}
            </div>
            <div className="px-5 pb-4 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div>
                  <p className="text-xs font-bold text-emerald-800">✅ 4 / 5 departments paid</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Arts Dept. – ₹5.04L pending</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer border-0" style={{ background: P.emerald }}>
                  Disburse Now
                </button>
              </div>
            </div>
          </SCard>
        </div>

        {/* ═══ ROW 4: RECENT TRANSACTIONS ═══ */}
        <SCard className="mb-5">
          <SHead icon="💳" title="Recent Fee Transactions"
            right={
              <div className="flex gap-1.5 items-center">
                {["all", "success", "pending", "failed"].map(f => (
                  <button key={f} onClick={() => setTxnFilter(f)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer transition-colors capitalize
                    ${txnFilter === f ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                    {f}
                  </button>
                ))}
              </div>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
                  {["Txn ID", "Student", "Class", "Amount", "Type", "Mode", "Date", "Status", "Action"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-bold text-emerald-700 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTxns.map((t, i) => {
                  const statusStyle = t.status === "success" ? "bg-emerald-100 text-emerald-700" : t.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700";
                  const modeStyle = t.mode === "Online" ? "bg-sky-100 text-sky-700" : t.mode === "Cash" ? "bg-amber-100 text-amber-700" : t.mode === "Cheque" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600";
                  const typeStyle = t.type === "full" ? "bg-emerald-100 text-emerald-700" : t.type === "partial" ? "bg-orange-100 text-orange-700" : "bg-indigo-100 text-indigo-700";
                  return (
                    <tr key={i} className="border-t border-gray-100 hover:bg-emerald-50/40 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-gray-500">{t.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                            style={{ background: [P.emerald, P.indigo, P.violet, P.amber, P.pink, P.sky, P.teal, P.rose][i % 8] }}>
                            {t.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-800 whitespace-nowrap">{t.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{t.cls}</td>
                      <td className="px-4 py-3 font-black text-emerald-700">₹{t.amount.toLocaleString()}</td>
                      <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeStyle}`}>{t.type}</span></td>
                      <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${modeStyle}`}>{t.mode}</span></td>
                      <td className="px-4 py-3 text-gray-500">{t.date}</td>
                      <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusStyle}`}>{t.status}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="text-xs font-bold px-2 py-1 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 cursor-pointer border-0 transition-colors">Receipt</button>
                          {t.status === "failed" && <button className="text-xs font-bold px-2 py-1 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 cursor-pointer border-0 transition-colors">Retry</button>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">Showing {filteredTxns.length} of {recentTxns.length} transactions</p>
            <button className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer bg-transparent border-0">View All Transactions →</button>
          </div>
        </SCard>

        {/* ═══ ROW 5: PENDING FEES + INVOICE + QUICK ACTIONS ═══ */}
        <div className="grid grid-cols-3 gap-5 mb-5">

          {/* Pending Fees */}
          <SCard>
            <SHead icon="⏳" title="Overdue Fee Collection" right={<Chip color="red">5 Students</Chip>} />
            <div className="px-4 py-3 flex flex-col gap-3">
              {pendingFees.map((s, i) => {
                const pending = s.due - s.paid;
                const paidPct = Math.round((s.paid / s.due) * 100);
                return (
                  <div key={i} className={`p-3 rounded-xl border ${s.warn ? "border-rose-200 bg-rose-50" : "border-amber-200 bg-amber-50"}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-bold text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-400">Class {s.cls} · Overdue: {s.overdue}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${s.warn ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                        {s.warn ? "HIGH RISK" : "MODERATE"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="bg-white rounded-lg px-2 py-1.5 text-center">
                        <p className="text-xs text-gray-400">Due</p>
                        <p className="text-xs font-black text-gray-700">₹{s.due.toLocaleString()}</p>
                      </div>
                      <div className="bg-white rounded-lg px-2 py-1.5 text-center">
                        <p className="text-xs text-gray-400">Paid</p>
                        <p className="text-xs font-black text-emerald-600">₹{s.paid.toLocaleString()}</p>
                      </div>
                      <div className="bg-white rounded-lg px-2 py-1.5 text-center">
                        <p className="text-xs text-gray-400">Pending</p>
                        <p className="text-xs font-black text-rose-600">₹{pending.toLocaleString()}</p>
                      </div>
                    </div>
                    <BarPct pct={paidPct} color={paidPct === 0 ? P.rose : paidPct < 50 ? P.amber : P.emerald} />
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white cursor-pointer border-0 hover:bg-emerald-700 transition-colors">Send Reminder</button>
                      <button className="px-2 py-1 rounded-lg text-xs font-bold bg-white border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">Receipt</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </SCard>

          {/* Invoice Manager */}
          <SCard>
            <SHead icon="🧾" title="Invoice Manager"
              right={
                <div className="flex gap-1">
                  {["unpaid", "paid", "all"].map(t => (
                    <button key={t} onClick={() => setActiveInvoiceTab(t)}
                      className={`px-2 py-1 rounded-lg text-xs font-bold border cursor-pointer transition-colors capitalize
                      ${activeInvoiceTab === t ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-500 border-gray-200"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="px-4 py-3 flex flex-col gap-2.5">
              {[
                { id: "INV-1041", name: "Arjun Mehta", amount: 18500, due: "Apr 25", status: "unpaid", type: "Tuition" },
                { id: "INV-1040", name: "Sneha Roy", amount: 5200, due: "Apr 25", status: "unpaid", type: "Hostel" },
                { id: "INV-1039", name: "Vikram Singh", amount: 18500, due: "Apr 24", status: "unpaid", type: "Tuition" },
                { id: "INV-1038", name: "Priya Sharma", amount: 22000, due: "Apr 23", status: "paid", type: "Full Fees" },
                { id: "INV-1037", name: "Rohit Das", amount: 3200, due: "Apr 22", status: "paid", type: "Transport" },
                { id: "INV-1036", name: "Kavya Nair", amount: 18500, due: "Apr 22", status: "paid", type: "Tuition" },
              ].filter(inv => activeInvoiceTab === "all" || inv.status === activeInvoiceTab)
                .map((inv, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors border border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                        style={{ background: inv.status === "paid" ? P.emerald + "22" : P.amber + "22", color: inv.status === "paid" ? P.emerald : P.amber }}>
                        🧾
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{inv.name}</p>
                        <p className="text-xs text-gray-400">{inv.id} · {inv.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-gray-800">₹{inv.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Due: {inv.due}</p>
                    </div>
                    <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0
                  ${inv.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {inv.status}
                    </span>
                  </div>
                ))}
              <button className="w-full py-2 rounded-xl text-xs font-bold text-white cursor-pointer border-0 hover:opacity-90 mt-1"
                style={{ background: `linear-gradient(90deg,${P.emerald},${P.teal})` }}>
                + Generate New Invoice
              </button>
            </div>
          </SCard>

          {/* Quick Actions */}
          <SCard>
            <SHead icon="⚡" title="Accountant Quick Actions" />
            <div className="p-4 grid grid-cols-2 gap-3">
              {[
                { icon: "💳", label: "Record Payment", bg: "#f0fdf4", c: P.emerald },
                { icon: "🧾", label: "Create Invoice", bg: "#fefce8", c: P.amber },
                { icon: "📊", label: "Fee Report", bg: "#eef2ff", c: P.indigo },
                { icon: "💸", label: "Record Expense", bg: "#fff7ed", c: P.orange },
                { icon: "📋", label: "Salary Sheet", bg: "#fdf4ff", c: P.violet },
                { icon: "🏦", label: "Bank Reconcile", bg: "#f0f9ff", c: P.sky },
                { icon: "📥", label: "Import Ledger", bg: "#fff1f2", c: P.rose },
                { icon: "📤", label: "Export Reports", bg: "#f0fdfa", c: P.teal },
                { icon: "⚠️", label: "Overdue Alerts", bg: "#fff7ed", c: P.orange },
                { icon: "📑", label: "Tax Report", bg: "#fdf4ff", c: P.violet },
                { icon: "🔍", label: "Audit Logs", bg: "#f0f9ff", c: P.sky },
                { icon: "⚙️", label: "Settings", bg: "#f8fafc", c: "#64748b" },
              ].map((a, i) => (
                <button key={i} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl cursor-pointer border-0 hover:scale-105 transition-transform"
                  style={{ background: a.bg }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: a.c + "22" }}>{a.icon}</div>
                  <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{a.label}</span>
                </button>
              ))}
            </div>
          </SCard>
        </div>

        {/* ═══ ROW 6: CLASS-WISE FEE TABLE ═══ */}
        <SCard className="mb-5">
          <SHead icon="📋" title="Class-wise Fee Collection Summary — April 2026"
            right={<div className="flex gap-2"><Chip color="green">₹8.6L Collected</Chip><button className="text-xs font-bold text-emerald-600 cursor-pointer bg-transparent border-0">Export →</button></div>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
                  {["Grade", "Sec", "Students", "Fee/Student", "Total Due", "Collected", "Pending", "% Collected", "Overdue Students", "Action"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-bold text-emerald-700 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { grade: "9", sec: "A", students: 42, fee: 15000, collected: 546000, overdue: 4 },
                  { grade: "9", sec: "B", students: 42, fee: 15000, collected: 525000, overdue: 6 },
                  { grade: "10", sec: "A", students: 42, fee: 18500, collected: 703000, overdue: 3 },
                  { grade: "10", sec: "B", students: 42, fee: 18500, collected: 666000, overdue: 6 },
                  { grade: "11", sec: "A", students: 45, fee: 18500, collected: 740000, overdue: 8 },
                  { grade: "11", sec: "B", students: 42, fee: 18500, collected: 740000, overdue: 2 },
                  { grade: "12", sec: "A", students: 43, fee: 22000, collected: 836000, overdue: 8 },
                  { grade: "12", sec: "B", students: 43, fee: 22000, collected: 880000, overdue: 3 },
                ].map((r, i) => {
                  const totalDue = r.students * r.fee;
                  const pending = totalDue - r.collected;
                  const pct = Math.round((r.collected / totalDue) * 100);
                  return (
                    <tr key={i} className="border-t border-gray-100 hover:bg-emerald-50/40 transition-colors">
                      <td className="px-4 py-3 font-black text-emerald-700">Grade {r.grade}</td>
                      <td className="px-4 py-3 font-bold text-gray-700">{r.sec}</td>
                      <td className="px-4 py-3 text-gray-600">{r.students}</td>
                      <td className="px-4 py-3 font-semibold text-gray-700">₹{r.fee.toLocaleString()}</td>
                      <td className="px-4 py-3 font-bold text-gray-800">₹{(totalDue / 100000).toFixed(2)}L</td>
                      <td className="px-4 py-3 font-black text-emerald-600">₹{(r.collected / 100000).toFixed(2)}L</td>
                      <td className="px-4 py-3 font-bold text-rose-600">₹{(pending / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 90 ? P.emerald : pct >= 75 ? P.amber : P.rose }} />
                          </div>
                          <span className="font-black" style={{ color: pct >= 90 ? P.emerald : pct >= 75 ? P.amber : P.rose }}>{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-bold px-2 py-0.5 rounded-full ${r.overdue > 5 ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>{r.overdue}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs font-bold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 cursor-pointer border-0 transition-colors">Remind All</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SCard>

        {/* ═══ ROW 7: LEDGER + BANK + NOTICES ═══ */}
        <div className="grid grid-cols-3 gap-5 mb-5">

          {/* Ledger Summary */}
          <SCard>
            <SHead icon="📒" title="Daily Ledger Summary" right={<Chip color="teal">Apr 24</Chip>} />
            <div className="px-4 py-3 flex flex-col gap-2.5">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <p className="text-xs font-bold text-emerald-700 mb-2">💰 Today's Income</p>
                {[
                  { label: "Fee Collections", amount: 68500 },
                  { label: "Late Fine", amount: 1200 },
                  { label: "Library Fine", amount: 450 },
                  { label: "Misc Income", amount: 3800 },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between items-center py-0.5">
                    <span className="text-xs text-gray-600">{l.label}</span>
                    <span className="text-xs font-bold text-emerald-700">+₹{l.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-emerald-200 mt-2 pt-2 flex justify-between">
                  <span className="text-xs font-bold text-emerald-800">Total In</span>
                  <span className="text-sm font-black text-emerald-700">₹73,950</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
                <p className="text-xs font-bold text-rose-700 mb-2">💸 Today's Expenses</p>
                {[
                  { label: "Stationary Supplies", amount: 4200 },
                  { label: "Maintenance Work", amount: 8500 },
                  { label: "Petty Cash", amount: 2100 },
                  { label: "Vendor Payment", amount: 12000 },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between items-center py-0.5">
                    <span className="text-xs text-gray-600">{l.label}</span>
                    <span className="text-xs font-bold text-rose-600">-₹{l.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-rose-200 mt-2 pt-2 flex justify-between">
                  <span className="text-xs font-bold text-rose-800">Total Out</span>
                  <span className="text-sm font-black text-rose-700">₹26,800</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 flex justify-between items-center">
                <span className="text-sm font-bold text-indigo-800">Net Day Balance</span>
                <span className="text-lg font-black text-indigo-700">+₹47,150</span>
              </div>
            </div>
          </SCard>

          {/* Bank Accounts */}
          <SCard>
            <SHead icon="🏦" title="Bank Account Summary" right={<Chip color="sky">Live</Chip>} />
            <div className="px-4 py-3 flex flex-col gap-3">
              {[
                { bank: "State Bank of India", acc: "XXXX 4821", balance: 1840000, type: "Current", color: P.indigo },
                { bank: "Punjab National Bank", acc: "XXXX 7732", balance: 640000, type: "Savings", color: P.emerald },
                { bank: "HDFC Bank", acc: "XXXX 2294", balance: 380000, type: "OD Account", color: P.sky },
                { bank: "Canara Bank", acc: "XXXX 9901", balance: 180000, type: "FD Account", color: P.amber },
              ].map((b, i) => (
                <div key={i} className="p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-800">{b.bank}</p>
                      <p className="text-xs text-gray-400">{b.acc} · {b.type}</p>
                    </div>
                    <p className="text-base font-black" style={{ color: b.color }}>{fmtK(b.balance)}</p>
                  </div>
                  <BarPct pct={Math.round((b.balance / 1840000) * 100)} color={b.color} />
                </div>
              ))}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex justify-between items-center">
                <span className="text-sm font-bold text-emerald-800">Total Bank Balance</span>
                <span className="text-lg font-black text-emerald-700">₹30.4L</span>
              </div>
            </div>
          </SCard>

          {/* Finance Notices & Tasks */}
          <SCard>
            <SHead icon="📌" title="Finance Notices & Reminders" right={<Chip color="orange">4 Pending</Chip>} />
            <div className="px-4 py-3 flex flex-col gap-2.5">
              {[
                { title: "Submit Q4 GST filing", due: "Apr 25", priority: "high", icon: "🏛️" },
                { title: "Arts Dept salary disbursal", due: "Apr 25", priority: "high", icon: "💼" },
                { title: "Vendor invoice verification", due: "Apr 26", priority: "medium", icon: "🧾" },
                { title: "Monthly audit reconciliation", due: "Apr 28", priority: "medium", icon: "📋" },
                { title: "Insurance premium payment", due: "Apr 30", priority: "low", icon: "🛡️" },
                { title: "Annual report preparation", due: "May 5", priority: "low", icon: "📊" },
              ].map((n, i) => {
                const pc = n.priority === "high" ? "border-rose-200 bg-rose-50" : n.priority === "medium" ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50";
                const dc = n.priority === "high" ? P.rose : n.priority === "medium" ? P.amber : "#94a3b8";
                return (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${pc}`}>
                    <span className="text-base flex-shrink-0">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800">{n.title}</p>
                      <p className="text-xs font-bold mt-0.5" style={{ color: dc }}>Due: {n.due}</p>
                    </div>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0
                    ${n.priority === "high" ? "bg-rose-100 text-rose-700" : n.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                      {n.priority}
                    </span>
                  </div>
                );
              })}
              <button className="mt-1 w-full py-2 rounded-xl text-xs font-bold border border-dashed border-emerald-300 text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer bg-transparent">
                + Add Reminder
              </button>
            </div>
          </SCard>
        </div>

        {/* FOOTER */}
        <div className="text-center py-3">
          <p className="text-xs text-gray-400">Sunrise ERP · Accounts Module v3.1 · FY 2025–26 · <span className="text-emerald-600 cursor-pointer hover:underline">accounts@sunriseschool.edu.in</span></p>
        </div>
      </div>
       : <div className="min-h-screen bg-slate-50 p-6" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

        {/* ═══ HERO ═══ */}
        <div className="relative rounded-3xl overflow-hidden mb-6"
          style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 35%,#4f46e5 65%,#7c3aed 100%)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%,#fff 0%,transparent 50%),radial-gradient(circle at 80% 20%,#a5b4fc 0%,transparent 50%)" }} />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: "white", transform: "translate(30%,-30%)" }} />
          <div className="relative z-10 px-8 py-7">
            <div className="flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>🏛️</div>
                <div>
                  <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Admin Control Panel</p>
                  <h1 className="text-white text-3xl font-black leading-tight">Sunrise Public School</h1>
                  <p className="text-indigo-300 text-sm mt-1">Est. 2003 · Kolkata, West Bengal · CBSE Affiliated · Affil. No. 230094</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: "👥", label: "1,498 Students" }, { icon: "👨‍🏫", label: "94 Faculty" },
                  { icon: "🏫", label: "48 Classrooms" }, { icon: "📅", label: "Apr 24, 2026" },
                  { icon: "⭐", label: "NAAC A+ Grade" }, { icon: "🏆", label: "State Rank #3" },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
                    style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}>
                    {m.icon} {m.label}
                  </div>
                ))}
              </div>
            </div>
            {/* mini stat row inside hero */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
              {[
                { label: "Today Attendance", value: "88%", sub: "1,318 / 1,498", icon: "✅", clr: "#a5b4fc" },
                { label: "Fee Collected", value: "₹7.8L", sub: "Apr collection", icon: "💰", clr: "#6ee7b7" },
                { label: "Active Classes", value: "42", sub: "6 in progress", icon: "📚", clr: "#fcd34d" },
                { label: "Open Complaints", value: "4", sub: "2 high priority", icon: "⚠️", clr: "#fca5a5" },
                { label: "Staff Present", value: "89", sub: "Out of 94", icon: "🧑‍💼", clr: "#93c5fd" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(6px)" }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: s.clr }}>{s.icon} {s.label}</p>
                  <p className="text-xl font-black text-white leading-none">{s.value}</p>
                  <p className="text-xs text-indigo-300 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ MAIN STAT CARDS ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
          {[
            { icon: "👩‍🎓", label: "Total Students", value: "1,498", sub: "↑ 38 this month", bg: "#eef2ff", acc: P.indigo },
            { icon: "👨‍🏫", label: "Total Faculty", value: "94", sub: "4 on leave", bg: "#f0fdf4", acc: P.emerald },
            { icon: "🏫", label: "Departments", value: "8", sub: "48 classrooms", bg: "#fdf4ff", acc: P.violet },
            { icon: "📝", label: "Active Exams", value: "3", sub: "Mid-sem series", bg: "#fff1f2", acc: P.rose },
            { icon: "💳", label: "Pending Fees", value: "312", sub: "₹14.2L overdue", bg: "#fefce8", acc: P.amber },
            { icon: "📢", label: "Notices Today", value: "5", sub: "3 urgent", bg: "#fff0f3", acc: P.pink },
            { icon: "⚠️", label: "Complaints", value: "4", sub: "2 open", bg: "#fff7ed", acc: P.orange },
            { icon: "🎓", label: "Admissions", value: "28", sub: "This month", bg: "#f0f9ff", acc: P.sky },
          ].map((s, i) => (
            <div key={i} className="col-span-2 md:col-span-1 rounded-2xl p-4 shadow-sm flex flex-col gap-1.5" style={{ background: s.bg }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: s.acc + "22" }}>{s.icon}</div>
              <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
              <p className="text-2xl font-black leading-none" style={{ color: s.acc }}>{s.value}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ═══ ROW 1: ENROLLMENT TREND + DEPT BAR ═══ */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <SCard>
            <SHead icon="📈" title="Student & Faculty Enrollment Trend" right={<Chip color="indigo">2025–26</Chip>} />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<TTip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area yAxisId="left" type="monotone" dataKey="students" name="Students" fill={P.indigo + "33"} stroke={P.indigo} strokeWidth={2.5} />
                  <Bar yAxisId="right" dataKey="teachers" name="Teachers" fill={P.emerald} radius={[4, 4, 0, 0]} barSize={12} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </SCard>

          <SCard>
            <SHead icon="🏫" title="Department-wise Strength" right={<Chip color="violet">5 Depts</Chip>} />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={deptStudents} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="dept" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<TTip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="students" name="Students" fill={P.indigo} radius={[5, 5, 0, 0]} />
                  <Bar dataKey="teachers" name="Teachers" fill={P.pink} radius={[5, 5, 0, 0]} />
                  <Bar dataKey="rooms" name="Rooms" fill={P.teal} radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SCard>
        </div>

        {/* ═══ ROW 2: 4 PIE CHARTS ═══ */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { title: "Attendance Status", data: attendancePie, icon: "✅" },
            { title: "Gender Ratio", data: genderPie, icon: "👥" },
            { title: "Class Distribution", data: classDistPie, icon: "🏫" },
            {
              title: "Custom Metric", data: [
                { name: "Online Fee", value: 62, color: P.sky },
                { name: "Cash", value: 24, color: P.amber },
                { name: "Cheque", value: 14, color: P.violet },
              ], icon: "💳"
            },
          ].map((pie, idx) => (
            <SCard key={idx}>
              <SHead icon={pie.icon} title={pie.title} />
              <div className="px-3 py-2 flex flex-col items-center">
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={pie.data} dataKey="value" cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={3}>
                      {pie.data.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip formatter={(v, n) => [`${v}${typeof v === "number" && v > 100 ? "" : " %"}`, n]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-1.5 w-full px-2 pb-2">
                  {pie.data.map((d, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                        <span className="text-xs text-gray-600">{d.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-800">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SCard>
          ))}
        </div>

        {/* ═══ ROW 3: FEE AREA + RADAR ═══ */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <SCard>
            <SHead icon="💰" title="Fee Collection vs Target (Monthly)" right={<Chip color="green">This Year</Chip>} />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={feeCollectionArea}>
                  <defs>
                    <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={P.emerald} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={P.emerald} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={P.indigo} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={P.indigo} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} />
                  <Tooltip content={<TTip />} formatter={v => `₹${(v / 100000).toFixed(2)}L`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="collected" name="Collected" stroke={P.emerald} fill="url(#colGrad)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="target" name="Target" stroke={P.indigo} fill="url(#tgtGrad)" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SCard>

          <SCard>
            <SHead icon="🌐" title="School Performance Overview" right={<Chip color="violet">2025–26</Chip>} />
            <div className="p-3">
              <ResponsiveContainer width="100%" height={230}>
                <RadarChart data={radarPerf} cx="50%" cy="50%" outerRadius={85}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="sub" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Radar name="Score" dataKey="score" stroke={P.violet} fill={P.violet} fillOpacity={0.25} strokeWidth={2.5} />
                  <Tooltip content={<TTip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </SCard>
        </div>

        {/* ═══ ROW 4: TEACHER TABLE + INFRASTRUCTURE ═══ */}
        <div className="grid grid-cols-2 gap-5 mb-5">

          {/* Teacher Table */}
          <SCard>
            <SHead icon="👨‍🏫" title="Faculty Overview"
              right={
                <input value={teacherSearch} onChange={e => setTeacherSearch(e.target.value)}
                  placeholder="Search…" className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none bg-white w-28" />
              }
            />
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-indigo-50">
                    {["Name", "Dept", "Classes", "Students", "Exp", "Rating", "Status"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-bold text-indigo-600 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((t, i) => (
                    <tr key={i} className="border-t border-gray-50 hover:bg-indigo-50/40 transition-colors">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                            style={{ background: [P.indigo, P.emerald, P.violet, P.pink, P.amber, P.sky][i % 6] }}>
                            {t.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-800 whitespace-nowrap">{t.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-gray-600">{t.dept}</td>
                      <td className="px-4 py-2.5 font-semibold text-indigo-600">{t.classes}</td>
                      <td className="px-4 py-2.5 text-gray-700">{t.students}</td>
                      <td className="px-4 py-2.5 text-gray-500">{t.exp}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1">
                          <span className="text-amber-400 text-xs">★</span>
                          <span className="font-bold text-gray-700">{t.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                        ${t.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50">
              <button className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer bg-transparent border-0">View All 94 Faculty →</button>
            </div>
          </SCard>

          {/* Infrastructure */}
          <SCard>
            <SHead icon="🏗️" title="Infrastructure & Facility Status" right={<Chip color="teal">Live</Chip>} />
            <div className="px-5 py-4 flex flex-col gap-4">
              {infraData.map((f, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: f.color }} />
                      <span className="text-sm font-semibold text-gray-700">{f.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{f.occupied}/{f.total} occupied</span>
                      <span className="text-sm font-black" style={{ color: f.color }}>{f.pct}%</span>
                    </div>
                  </div>
                  <BarPct pct={f.pct} color={f.color} />
                </div>
              ))}
            </div>

            {/* Room quick-grid */}
            <div className="border-t border-gray-100 px-5 py-4">
              <p className="text-xs font-bold text-gray-500 mb-3">CLASSROOM OCCUPANCY GRID</p>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 48 }, (_, i) => (
                  <div key={i} className="w-5 h-5 rounded flex items-center justify-center"
                    title={`Room ${i + 1}`}
                    style={{ background: i < 44 ? (i < 38 ? P.indigo + "cc" : P.emerald + "cc") : "#e5e7eb", opacity: i < 44 ? 1 : 0.4 }}>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded" style={{ background: P.indigo }} />  <span className="text-xs text-gray-500">Regular</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded" style={{ background: P.emerald }} /> <span className="text-xs text-gray-500">Special</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-gray-200" />                   <span className="text-xs text-gray-500">Vacant</span></div>
              </div>
            </div>
          </SCard>
        </div>

        {/* ═══ ROW 5: RECENT ACTIVITY + COMPLAINTS ═══ */}
        <div className="grid grid-cols-2 gap-5 mb-5">

          {/* Activity Feed */}
          <SCard>
            <SHead icon="🔔" title="Recent Activity Log" right={<span className="text-xs text-gray-400">Live feed</span>} />
            <div className="divide-y divide-gray-50">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                    style={{ background: activityColor[a.type] + "18" }}>
                    {activityIcon[a.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800">{a.action}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{a.time}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs font-semibold" style={{ color: activityColor[a.type] }}>{a.user}</span>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: activityColor[a.type] }} />
                </div>
              ))}
            </div>
            <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50">
              <button className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer bg-transparent border-0">View Full Audit Log →</button>
            </div>
          </SCard>

          {/* Complaints */}
          <SCard>
            <SHead icon="⚠️" title="Complaints & Grievances"
              right={
                <div className="flex gap-1">
                  {["all", "open", "in-progress", "resolved"].map(f => (
                    <button key={f} onClick={() => setComplaintFilter(f)}
                      className={`px-2 py-1 rounded-lg text-xs font-bold border cursor-pointer transition-colors capitalize
                      ${complaintFilter === f ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                      {f === "in-progress" ? "Active" : f}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="divide-y divide-gray-50">
              {filteredComplaints.map((c, i) => {
                const st = c.status === "open" ? "bg-rose-100 text-rose-700" : c.status === "in-progress" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700";
                const pr = c.priority === "high" ? "bg-rose-500" : c.priority === "medium" ? "bg-amber-400" : "bg-gray-300";
                return (
                  <div key={i} className="px-5 py-3.5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${pr}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-400 font-mono">{c.id}</span>
                          <p className="text-xs font-semibold text-gray-800">{c.title}</p>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${st}`}>{c.status}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">By {c.raised} · {c.dept} · {c.date}</p>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        {c.status !== "resolved" && <button className="text-xs font-bold px-2 py-1 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 cursor-pointer border-0 transition-colors">Resolve</button>}
                        <button className="text-xs font-bold px-2 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer border-0 transition-colors">View</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50">
              <button className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer bg-transparent border-0">View All Complaints →</button>
            </div>
          </SCard>
        </div>

        {/* ═══ ROW 6: NOTICES + QUICK ACTIONS + CALENDAR EVENTS ═══ */}
        <div className="grid grid-cols-3 gap-5 mb-5">

          {/* Notice Board */}
          <SCard>
            <SHead icon="📢" title="Notice Management" right={<Chip color="red">3 Urgent</Chip>} />
            <div className="px-4 py-3 flex flex-col gap-3">
              {notices.map((n, i) => {
                const tc = n.type === "exam" ? "red" : n.type === "fee" ? "yellow" : n.type === "event" ? "green" : n.type === "meeting" ? "indigo" : "gray";
                return (
                  <div key={i} className="p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-gray-800">{n.title}</p>
                      <Chip color={tc}>{n.type.toUpperCase()}</Chip>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-gray-400">{n.date}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <Chip color={n.priority === "high" ? "red" : n.priority === "normal" ? "indigo" : "gray"}>{n.audience}</Chip>
                    </div>
                  </div>
                );
              })}
              <button className="w-full py-2 rounded-xl text-xs font-bold text-white cursor-pointer border-0 hover:opacity-90"
                style={{ background: `linear-gradient(90deg,${P.indigo},${P.violet})` }}>
                + Post New Notice
              </button>
            </div>
          </SCard>

          {/* Quick Actions */}
          <SCard>
            <SHead icon="⚡" title="Admin Quick Actions" />
            <div className="p-4 grid grid-cols-3 gap-3">
              {[
                { icon: "➕", label: "Admit Student", bg: "#eef2ff", c: P.indigo },
                { icon: "👨‍🏫", label: "Add Faculty", bg: "#f0fdf4", c: P.emerald },
                { icon: "📋", label: "Mark Attendance", bg: "#fff7ed", c: P.orange },
                { icon: "📝", label: "Schedule Exam", bg: "#fdf4ff", c: P.violet },
                { icon: "💳", label: "Fee Report", bg: "#fefce8", c: P.amber },
                { icon: "📢", label: "Send Notice", bg: "#fff0f3", c: P.pink },
                { icon: "🏗️", label: "Maintenance", bg: "#f0f9ff", c: P.sky },
                { icon: "📊", label: "Analytics", bg: "#fff1f2", c: P.rose },
                { icon: "🔐", label: "User Access", bg: "#f0fdfa", c: P.teal },
                { icon: "📥", label: "Import Data", bg: "#fffbeb", c: P.amber },
                { icon: "🖨️", label: "Print ID Cards", bg: "#fdf4ff", c: P.fuchsia },
                { icon: "⚙️", label: "Settings", bg: "#f8fafc", c: "#64748b" },
              ].map((a, i) => (
                <button key={i} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl cursor-pointer border-0 hover:scale-105 transition-transform"
                  style={{ background: a.bg }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: a.c + "22" }}>{a.icon}</div>
                  <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{a.label}</span>
                </button>
              ))}
            </div>
          </SCard>

          {/* Upcoming Events */}
          <SCard>
            <SHead icon="📅" title="Upcoming Events" right={<Chip color="sky">May 2026</Chip>} />
            <div className="px-4 py-3 flex flex-col gap-3">
              {[
                { date: "Apr 25", day: "25", month: "Apr", title: "State Foundation Day – Holiday", type: "holiday", color: P.emerald },
                { date: "Apr 28", day: "28", month: "Apr", title: "Sports Day Celebration", type: "event", color: P.orange },
                { date: "Apr 30", day: "30", month: "Apr", title: "Fee Payment Deadline", type: "fee", color: P.amber },
                { date: "May 1", day: "1", month: "May", title: "Mid-Semester Exams Begin", type: "exam", color: P.rose },
                { date: "May 10", day: "10", month: "May", title: "Parent–Teacher Meeting", type: "meeting", color: P.indigo },
                { date: "May 15", day: "15", month: "May", title: "Annual Science Exhibition", type: "event", color: P.violet },
                { date: "May 20", day: "20", month: "May", title: "Annual Day Ceremony", type: "event", color: P.pink },
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="rounded-xl px-2.5 py-1.5 text-center min-w-[44px] flex-shrink-0" style={{ background: e.color + "15" }}>
                    <p className="text-sm font-bold leading-none" style={{ color: e.color }}>{e.day}</p>
                    <p className="text-xs mt-0.5" style={{ color: e.color + "aa" }}>{e.month}</p>
                  </div>
                  <p className="text-xs font-medium text-gray-700 flex-1">{e.title}</p>
                </div>
              ))}
              <button className="mt-1 w-full py-1.5 rounded-xl text-xs font-bold border border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer bg-transparent">
                + Add Event
              </button>
            </div>
          </SCard>
        </div>

        {/* ═══ ROW 7: FULL STUDENT STATS TABLE ═══ */}
        <SCard className="mb-5">
          <SHead icon="👩‍🎓" title="Student Enrollment Summary by Grade & Section"
            right={<div className="flex gap-2"><Chip color="indigo">1,498 Total</Chip><button className="text-xs font-bold text-indigo-600 cursor-pointer bg-transparent border-0">Export CSV</button></div>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-violet-50">
                  {["Grade", "Section", "Boys", "Girls", "Total", "Avg Attend.", "Avg Score", "Fee Paid", "Pending", "Class Teacher"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-bold text-indigo-700 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { grade: "9", sec: "A", boys: 22, girls: 20, att: 91, score: 78, feePaid: 38, pending: 4, ct: "Ms. P. Das" },
                  { grade: "9", sec: "B", boys: 21, girls: 21, att: 88, score: 74, feePaid: 36, pending: 6, ct: "Mr. V. Gupta" },
                  { grade: "10", sec: "A", boys: 23, girls: 19, att: 92, score: 81, feePaid: 40, pending: 2, ct: "Dr. S. Rao" },
                  { grade: "10", sec: "B", boys: 20, girls: 22, att: 89, score: 76, feePaid: 37, pending: 5, ct: "Prof. A. Mehta" },
                  { grade: "11", sec: "A", boys: 25, girls: 20, att: 87, score: 73, feePaid: 38, pending: 7, ct: "Dr. K. Iyer" },
                  { grade: "11", sec: "B", boys: 20, girls: 22, att: 93, score: 86, feePaid: 40, pending: 2, ct: "Dr. S. Rao" },
                  { grade: "12", sec: "A", boys: 22, girls: 21, att: 84, score: 71, feePaid: 35, pending: 8, ct: "Dr. V. Nair" },
                  { grade: "12", sec: "B", boys: 21, girls: 22, att: 90, score: 83, feePaid: 40, pending: 3, ct: "Mr. R. Sharma" },
                ].map((r, i) => {
                  const total = r.boys + r.girls;
                  return (
                    <tr key={i} className="border-t border-gray-100 hover:bg-indigo-50/40 transition-colors">
                      <td className="px-4 py-3 font-black text-indigo-700">Grade {r.grade}</td>
                      <td className="px-4 py-3 font-bold text-gray-700">Sec {r.sec}</td>
                      <td className="px-4 py-3 text-sky-600 font-semibold">{r.boys}</td>
                      <td className="px-4 py-3 text-pink-600 font-semibold">{r.girls}</td>
                      <td className="px-4 py-3 font-black text-gray-800">{total}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${r.att}%`, background: r.att >= 90 ? P.emerald : r.att >= 85 ? P.amber : P.rose }} />
                          </div>
                          <span className="font-bold" style={{ color: r.att >= 90 ? P.emerald : r.att >= 85 ? P.amber : P.rose }}>{r.att}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span className="font-bold text-gray-700">{r.score}</span><span className="text-gray-400">/100</span></td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">{r.feePaid}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold px-1.5 py-0.5 rounded-full text-xs ${r.pending > 5 ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>{r.pending}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{r.ct}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SCard>

        {/* FOOTER */}
        <div className="text-center py-3">
          <p className="text-xs text-gray-400">Sunrise ERP Admin Panel v3.1 · Academic Year 2025–26 · <span className="text-indigo-500 cursor-pointer hover:underline">support@sunriseschool.edu.in</span></p>
        </div>
      </div>}
      
    </>
  );
}