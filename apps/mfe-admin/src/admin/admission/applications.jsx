import React, { useState } from "react";
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock } from "lucide-react";

const allApplications = [
  { id: "A2026001", name: "Riya Sharma",    class: "Grade 11", course: "Science",  dob: "2010-04-12", guardian: "Ramesh Sharma",    phone: "9831001122", date: "2026-08-30", status: "Pending"  },
  { id: "A2026002", name: "Arjun Mehta",    class: "Grade 9",  course: "Commerce", dob: "2012-07-23", guardian: "Suresh Mehta",     phone: "9831002233", date: "2026-08-30", status: "Enrolled" },
  { id: "A2026003", name: "Priya Das",      class: "Grade 12", course: "Arts",     dob: "2009-11-05", guardian: "Manas Das",        phone: "9831003344", date: "2026-08-29", status: "Pending"  },
  { id: "A2026004", name: "Rahul Singh",    class: "Grade 10", course: "Science",  dob: "2011-02-18", guardian: "Vikram Singh",     phone: "9831004455", date: "2026-08-29", status: "Enrolled" },
  { id: "A2026005", name: "Sneha Patel",    class: "Grade 11", course: "Commerce", dob: "2010-09-30", guardian: "Harish Patel",     phone: "9831005566", date: "2026-08-28", status: "Rejected" },
  { id: "A2026006", name: "Karan Verma",    class: "Grade 9",  course: "Science",  dob: "2012-01-14", guardian: "Ajay Verma",       phone: "9831006677", date: "2026-08-28", status: "Enrolled" },
  { id: "A2026007", name: "Ananya Roy",     class: "Grade 12", course: "Commerce", dob: "2009-06-22", guardian: "Dipak Roy",        phone: "9831007788", date: "2026-08-27", status: "Pending"  },
  { id: "A2026008", name: "Sourav Ghosh",   class: "Grade 10", course: "Arts",     dob: "2011-08-10", guardian: "Bikash Ghosh",     phone: "9831008899", date: "2026-08-27", status: "Enrolled" },
  { id: "A2026009", name: "Meera Joshi",    class: "Grade 11", course: "Science",  dob: "2010-03-03", guardian: "Anil Joshi",       phone: "9831009900", date: "2026-08-26", status: "Waitlisted"},
  { id: "A2026010", name: "Rohan Kumar",    class: "Grade 9",  course: "Commerce", dob: "2012-12-25", guardian: "Sanjay Kumar",     phone: "9831010011", date: "2026-08-26", status: "Pending"  },
  { id: "A2026011", name: "Divya Nair",     class: "Grade 12", course: "Science",  dob: "2009-05-17", guardian: "Vijay Nair",       phone: "9831011122", date: "2026-08-25", status: "Enrolled" },
  { id: "A2026012", name: "Akash Yadav",    class: "Grade 10", course: "Arts",     dob: "2011-10-08", guardian: "Mukesh Yadav",     phone: "9831012233", date: "2026-08-25", status: "Rejected" },
];

const statusMeta = {
  Enrolled:   { icon: CheckCircle, className: "bg-emerald-100 text-emerald-700" },
  Pending:    { icon: Clock,        className: "bg-amber-100 text-amber-700"    },
  Rejected:   { icon: XCircle,     className: "bg-red-100 text-red-700"         },
  Waitlisted: { icon: Clock,       className: "bg-violet-100 text-violet-700"   },
};

export default function ApplicationsList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = allApplications.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-sm text-muted-foreground mt-1">All student admission applications</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white text-sm px-4 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border rounded-xl p-1">
          {["All", "Enrolled", "Pending", "Rejected", "Waitlisted"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:bg-gray-50"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-muted-foreground uppercase tracking-wide border-b">
              <tr>
                {["App ID", "Student Name", "Class", "Course", "Guardian", "Phone", "Applied", "Status", "Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((app) => {
                const meta = statusMeta[app.status];
                return (
                  <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{app.id}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{app.name}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{app.class}</td>
                    <td className="px-4 py-3 text-gray-600">{app.course}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{app.guardian}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{app.phone}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{app.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${meta.className}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t bg-gray-50 text-xs text-muted-foreground flex items-center justify-between">
          <span>Showing {filtered.length} of {allApplications.length} applications</span>
        </div>
      </div>
    </div>
  );
}
