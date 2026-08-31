import React, { useState } from "react";
import { Users, BookOpen, CalendarCheck, CheckCircle2, Clock } from "lucide-react";

const classes = [
  { id: 1, name: "10-A", subject: "Mathematics", students: 42, schedule: "Mon, Wed, Fri — 9:00 AM", room: "Room 204", nextClass: "Today, 9:00 AM" },
  { id: 2, name: "11-B", subject: "Mathematics", students: 38, schedule: "Tue, Thu — 11:00 AM", room: "Room 301", nextClass: "Tomorrow, 11:00 AM" },
  { id: 3, name: "12-A", subject: "Mathematics", students: 36, schedule: "Mon, Wed — 2:00 PM", room: "Room 205", nextClass: "Today, 2:00 PM" },
];

export default function MyClasses() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
        <p className="text-sm text-muted-foreground mt-1">Your assigned class sections this semester</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 px-3 py-1 rounded-lg">
                <span className="text-primary font-bold text-lg">Class {cls.name}</span>
              </div>
              <span className="text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-lg">{cls.room}</span>
            </div>

            <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> {cls.subject}
            </p>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{cls.students} Students enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{cls.schedule}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-medium text-amber-700">Next: {cls.nextClass}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
