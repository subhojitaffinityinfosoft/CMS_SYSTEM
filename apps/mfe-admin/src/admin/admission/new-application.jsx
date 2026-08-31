import React, { useState } from "react";
import { UserPlus, Save, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewApplication() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", dob: "", gender: "", class: "", course: "", guardian: "", phone: "", email: "", address: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Application</h1>
          <p className="text-sm text-muted-foreground">Register a new student admission application</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm divide-y">
        {/* Personal Info */}
        <div className="p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-primary" /> Student Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" value={form.name} onChange={v => set("name", v)} placeholder="e.g. Riya Sharma" />
            <Field label="Date of Birth" value={form.dob} onChange={v => set("dob", v)} type="date" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Gender</label>
              <select value={form.gender} onChange={e => set("gender", e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Applying for Class</label>
              <select value={form.class} onChange={e => set("class", e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select Class</option>
                {["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Stream / Course</label>
              <select value={form.course} onChange={e => set("course", e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select Stream</option>
                {["Science", "Commerce", "Arts"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Guardian Info */}
        <div className="p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Guardian & Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Guardian Name" value={form.guardian} onChange={v => set("guardian", v)} placeholder="Parent / Guardian" />
            <Field label="Phone Number" value={form.phone} onChange={v => set("phone", v)} placeholder="10-digit mobile" />
            <Field label="Email Address" value={form.email} onChange={v => set("email", v)} type="email" placeholder="example@email.com" />
            <Field label="Address" value={form.address} onChange={v => set("address", v)} placeholder="Full address" />
          </div>
        </div>

        {/* Actions */}
        <div className="p-5 flex items-center justify-end gap-3">
          <button onClick={() => navigate(-1)} className="px-5 py-2 rounded-xl border text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-md">
            <Save className="w-4 h-4" /> Save Application
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </div>
  );
}
