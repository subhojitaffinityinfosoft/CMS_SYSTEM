import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { IndianRupee, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

const monthlyFees = [
  { month: "Apr", collected: 485000, pending: 85000 },
  { month: "May", collected: 520000, pending: 62000 },
  { month: "Jun", collected: 390000, pending: 110000 },
  { month: "Jul", collected: 610000, pending: 45000 },
  { month: "Aug", collected: 570000, pending: 78000 },
];

const feeTypeBreakdown = [
  { name: "Tuition", value: 1640000, color: "#6366f1" },
  { name: "Hostel", value: 480000, color: "#10b981" },
  { name: "Transport", value: 220000, color: "#f59e0b" },
  { name: "Lab", value: 135000, color: "#0ea5e9" },
];

const recentFees = [
  { id: "FEE001", student: "Riya Sharma", class: "Grade 11", type: "Tuition", amount: 12000, date: "2026-08-30", mode: "UPI", status: "Paid" },
  { id: "FEE002", student: "Arjun Mehta", class: "Grade 9",  type: "Tuition", amount: 10000, date: "2026-08-30", mode: "Cash", status: "Paid" },
  { id: "FEE003", student: "Priya Das",   class: "Grade 12", type: "Hostel",  amount: 18000, date: "2026-08-29", mode: "NEFT", status: "Paid" },
  { id: "FEE004", student: "Rahul Singh", class: "Grade 10", type: "Tuition", amount: 10000, date: "2026-08-29", mode: "UPI",  status: "Pending" },
  { id: "FEE005", student: "Sneha Patel", class: "Grade 11", type: "Transport",amount: 4500, date: "2026-08-28", mode: "Cash", status: "Paid" },
];

const fmt = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const kpis = [
  { label: "Total Collected", value: fmt(2575000), icon: CheckCircle2, color: "#10b981", bg: "#ecfdf5", trend: "+11%" },
  { label: "Pending Dues", value: fmt(380000), icon: AlertCircle, color: "#f43f5e", bg: "#fff1f2", trend: "-5%" },
  { label: "This Month", value: fmt(570000), icon: IndianRupee, color: "#6366f1", bg: "#eef2ff", trend: "+8%" },
  { label: "Collection Rate", value: "87%", icon: TrendingUp, color: "#f59e0b", bg: "#fffbeb", trend: "+3%" },
];

export default function TransactionDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transaction & Fees</h1>
        <p className="text-sm text-muted-foreground mt-1">Fee collection overview · Academic Year 2026–27</p>
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
                <p className="text-xl font-bold text-gray-900 mt-0.5 leading-tight">{k.value}</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: k.trend.startsWith("+") ? "#10b981" : "#f43f5e" }}>{k.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Monthly Collection vs Pending</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyFees} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${v/1000}K`} />
              <Tooltip formatter={v => fmt(v)} />
              <Bar dataKey="collected" fill="#6366f1" name="Collected" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#fca5a5" name="Pending" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Fee Type Breakdown</h2>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={feeTypeBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                {feeTypeBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={v => fmt(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {feeTypeBreakdown.map(f => (
              <div key={f.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.color }} />
                  <span className="text-muted-foreground">{f.name}</span>
                </div>
                <span className="font-semibold text-gray-700">{fmt(f.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Recent Transactions</h2>
          <a href="/admin/transaction/fee-collection" className="text-xs text-primary font-medium hover:underline">View all →</a>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-muted-foreground uppercase tracking-wide">
            <tr>
              {["Rec. No", "Student", "Class", "Fee Type", "Amount", "Date", "Mode", "Status"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentFees.map(f => (
              <tr key={f.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{f.id}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{f.student}</td>
                <td className="px-4 py-3 text-gray-600">{f.class}</td>
                <td className="px-4 py-3 text-gray-600">{f.type}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">{fmt(f.amount)}</td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{f.date}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">{f.mode}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${f.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
