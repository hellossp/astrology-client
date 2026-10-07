"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/Button";
import { Clock, Calendar, Save, CheckCircle2, ShieldCheck, XCircle } from "lucide-react";

export default function AdminAvailabilityPage() {
  const { showToast } = useAppState();

  const [workingDays, setWorkingDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false
  });

  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("07:00 PM");
  const [slotDuration, setSlotDuration] = useState("45 Mins");
  const [breakTime, setBreakTime] = useState("01:00 PM - 02:00 PM (Lunch)");
  const [holidayDates, setHolidayDates] = useState(["2026-10-24", "2026-11-01"]);
  const [newHoliday, setNewHoliday] = useState("");

  const toggleDay = (day: string) => {
    setWorkingDays((prev: any) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleAddHoliday = () => {
    if (newHoliday && !holidayDates.includes(newHoliday)) {
      setHolidayDates([...holidayDates, newHoliday]);
      setNewHoliday("");
      showToast("Holiday date blocked", "info");
    }
  };

  const handleRemoveHoliday = (date: string) => {
    setHolidayDates(holidayDates.filter((d) => d !== date));
  };

  const handleSaveAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Astrologer availability and schedule saved!", "success");
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Admin Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Astrologer Schedule & Slot Availability
        </h1>
        <p className="text-xs text-slate-400">
          Set working hours, active booking days, slot durations, lunch breaks, and blocked holidays.
        </p>
      </div>

      <form onSubmit={handleSaveAvailability} className="space-y-6">
        {/* Working Days */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 space-y-3">
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            1. Active Working Days
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {Object.entries(workingDays).map(([day, active]) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  active
                    ? "bg-amber-500/20 border-amber-400 text-amber-300 font-extrabold"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}
              >
                <div>{day.slice(0, 3)}</div>
                <div className="text-[10px] font-normal mt-0.5">{active ? "Active" : "Off"}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Working Hours & Slot Duration */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 space-y-4">
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            2. Working Hours & Slot Timing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Start Time</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">End Time</label>
              <input
                type="text"
                value="07:00 PM"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Slot Interval</label>
              <select
                value={slotDuration}
                onChange={(e) => setSlotDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
              >
                <option value="30 Mins">30 Mins</option>
                <option value="45 Mins">45 Mins</option>
                <option value="60 Mins">60 Mins</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1 text-xs">Break Time Window</label>
            <input
              type="text"
              value={breakTime}
              onChange={(e) => setBreakTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100"
            />
          </div>
        </div>

        {/* Blocked Holiday Dates */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 space-y-4">
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            3. Blocked Holiday Dates
          </h2>

          <div className="flex gap-2 text-xs">
            <input
              type="date"
              value={newHoliday}
              onChange={(e) => setNewHoliday(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            />
            <Button type="button" variant="outline" size="sm" onClick={handleAddHoliday}>
              Block Date
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {holidayDates.map((date) => (
              <span key={date} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-500/30 text-xs font-mono font-bold">
                {date}
                <button type="button" onClick={() => handleRemoveHoliday(date)} className="hover:text-white">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg" icon={<Save className="w-4 h-4" />}>
          Save Availability Settings
        </Button>
      </form>
    </div>
  );
}
