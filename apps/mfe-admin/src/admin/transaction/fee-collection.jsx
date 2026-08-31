import React, { useState } from "react";
import { Search, Receipt, Save } from "lucide-react";

const students = [
  { id: "STU001", name: "Riya Sharma",  class: "Grade 11", tuition: 12000, hostel: 0,     transport: 4500, lab: 2000, paid: 12000, due: 6500 },
  { id: "STU002", name: "Arjun Mehta", class: "Grade 9",  tuition: 10000, hostel: 0,     transport: 4500, lab: 1500, paid: 10000, due: 6000 },
  { id: "STU003", name: "Priya Das",   class: "Grade 12", tuition: 12000, hostel: 18000, transport: 0,    lab: 2000, paid: 30000, due: 2000 },
  { id: "STU004", name: "Rahul Singh", class: "Grade 10", tuition: 10000, hostel: 0,     transport: 4500, lab: 1500, paid: 0,     due: 16000 },
  { id: "STU005", name: "Sneha Patel", class: "Grade 11", tuition: 12000, hostel: 0,     transport: 4500, lab: 2000, paid: 16000, due: 2500 },
];

const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function FeeCollection() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("UPI");
  const [saved, setSaved] = useState(false);

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search));

  const handleCollect = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); setSelected(null); setAmount(""); }, 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fee Collection</h1>
        <p className="text-sm text-muted-foreground mt-1">Collect and record student fee payments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student list */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-muted-foreground uppercase tracking-wide border-b">
                <tr>
                  {["ID", "Name", "Class", "Total Fee", "Paid", "Due", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(s => {
                  const total = s.tuition + s.hostel + s.transport + s.lab;
                  return (
                    <tr key={s.id} className={`hover:bg-gray-50/60 cursor-pointer transition-colors ${selected?.id === s.id ? "bg-primary/5" : ""}`}
                      onClick={() => setSelected(s)}>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{s.name}</td>
                      <td className="px-4 py-3 text-gray-600">{s.class}</td>
                      <td className="px-4 py-3 font-medium">{fmt(total)}</td>
                      <td className="px-4 py-3 text-emerald-600 font-medium">{fmt(s.paid)}</td>
                      <td className="px-4 py-3 font-bold" style={{ color: s.due > 0 ? "#f43f5e" : "#10b981" }}>{fmt(s.due)}</td>
                      <td className="px-4 py-3">
                        <button className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20">Collect</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Collection form */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-gray-700">Collect Payment</h2>
          </div>
          {selected ? (
            <div className="space-y-4">
              <div className="p-3 bg-primary/5 rounded-xl text-sm">
                <p className="font-semibold text-gray-800">{selected.name}</p>
                <p className="text-xs text-muted-foreground">{selected.class} · {selected.id}</p>
                <p className="text-red-500 font-bold mt-1">Due: {fmt(selected.due)}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Amount (₹)</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount"
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">Payment Mode</label>
                <select value={mode} onChange={e => setMode(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {["UPI", "Cash", "NEFT/RTGS", "Cheque", "DD"].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <button onClick={handleCollect}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${saved ? "bg-emerald-500 text-white" : "bg-primary text-white hover:bg-primary/90"}`}>
                <Save className="w-4 h-4" /> {saved ? "Receipt Generated!" : "Collect & Print Receipt"}
              </button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Select a student to collect fee</p>
          )}
        </div>
      </div>
    </div>
  );
}
