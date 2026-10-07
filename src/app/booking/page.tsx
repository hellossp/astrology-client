"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BRAND_CONFIG } from "@/config/branding";
import { useAppState } from "@/context/AppStateContext";
import { ASTROLOGY_SERVICES, Appointment } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatters";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  User,
  CreditCard,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Download
} from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get("service") || "kundli-reading";
  const { user, addAppointment } = useAppState();

  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId);
  const [consultationType, setConsultationType] = useState<"Online" | "Offline">("Online");
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-12");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("11:00 AM - 11:45 AM");

  const [userDetails, setUserDetails] = useState({
    name: user?.name || "Dhiren Sharma",
    email: user?.email || "dhiren@example.com",
    phone: user?.phone || "+91 9876543210",
    dob: user?.dob || "1994-08-15",
    timeOfBirth: user?.timeOfBirth || "08:30 AM",
    placeOfBirth: user?.placeOfBirth || "New Delhi",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  const selectedService =
    ASTROLOGY_SERVICES.find((s) => s.id === selectedServiceId) || ASTROLOGY_SERVICES[0];

  const timeSlots = [
    "10:00 AM - 10:45 AM",
    "11:00 AM - 11:45 AM",
    "02:00 PM - 02:45 PM",
    "03:30 PM - 04:15 PM",
    "05:00 PM - 05:45 PM",
    "07:00 PM - 07:45 PM",
  ];

  const handleConfirmBooking = () => {
    const apt = addAppointment({
      customerName: userDetails.name,
      customerEmail: userDetails.email,
      customerPhone: userDetails.phone,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      astrologerName: BRAND_CONFIG.astrologerName,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      consultationType: consultationType,
      amount: selectedService.price,
      notes: userDetails.notes,
      dob: userDetails.dob,
      timeOfBirth: userDetails.timeOfBirth,
      placeOfBirth: userDetails.placeOfBirth
    });

    setConfirmedAppointment(apt);
    setStep(6);
  };

  const stepsList = [
    { num: 1, label: "Select Service" },
    { num: 2, label: "Mode" },
    { num: 3, label: "Date & Time" },
    { num: 4, label: "Birth Details" },
    { num: 5, label: "Payment" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase">
          <Calendar className="w-3.5 h-3.5" /> Book Consultation
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          Schedule Your <span className="gold-gradient-text">Astrology Session</span>
        </h1>
      </div>

      {/* Step Indicator (Steps 1 to 5) */}
      {step <= 5 && (
        <div className="flex items-center justify-between max-w-2xl mx-auto overflow-x-auto no-scrollbar py-2">
          {stepsList.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s.num
                      ? "gold-gradient-bg text-slate-950 ring-4 ring-amber-500/20"
                      : step > s.num
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-900 text-slate-500 border border-slate-800"
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[10px] font-semibold ${step === s.num ? "text-amber-300" : "text-slate-500"}`}>
                  {s.label}
                </span>
              </div>
              {idx < stepsList.length - 1 && (
                <div
                  className={`h-0.5 flex-1 min-w-[20px] max-w-[50px] mx-1 ${
                    step > s.num ? "bg-emerald-500" : "bg-slate-800"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* STEP 1: SELECT SERVICE */}
      {step === 1 && (
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-slate-100">Step 1: Choose Astrological Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASTROLOGY_SERVICES.map((s) => {
              const isSelected = selectedServiceId === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedServiceId(s.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-amber-500/15 border-amber-400 ring-2 ring-amber-500/20"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-400">{s.category}</span>
                      <span className="text-xs font-semibold text-slate-400">{s.duration}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">{s.title}</h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">{s.description}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-base font-extrabold text-amber-300">{formatPrice(s.price)}</span>
                    <span className={`text-xs font-bold ${isSelected ? "text-amber-300" : "text-slate-400"}`}>
                      {isSelected ? "✓ Selected" : "Select"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} onClick={() => setStep(2)}>
              Continue to Mode Selection
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: ONLINE / OFFLINE MODE */}
      {step === 2 && (
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-slate-100">Step 2: Select Consultation Mode</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setConsultationType("Online")}
              className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-3 ${
                consultationType === "Online"
                  ? "bg-amber-500/15 border-amber-400 ring-2 ring-amber-500/20"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl gold-gradient-bg p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                  <Video className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Online Video Consultation</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connect via Google Meet / Zoom from anywhere worldwide. Recording link provided.
                </p>
              </div>
            </div>

            <div
              onClick={() => setConsultationType("Offline")}
              className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-3 ${
                consultationType === "Offline"
                  ? "bg-amber-500/15 border-amber-400 ring-2 ring-amber-500/20"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl gold-gradient-bg p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">In-Person Offline Visit</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Visit our physical center at Celestial Towers, New Delhi for face-to-face reading.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(1)}>
              Back
            </Button>
            <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} onClick={() => setStep(3)}>
              Select Date & Time
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: DATE & TIME SLOT */}
      {step === 3 && (
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-slate-100">Step 3: Select Date & Available Time Slot</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Consultation Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Available Slots for {selectedDate}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/20 border-amber-400 text-amber-300 font-extrabold"
                          : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(2)}>
              Back
            </Button>
            <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} onClick={() => setStep(4)}>
              Enter User Details
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: USER & BIRTH DETAILS */}
      {step === 4 && (
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-slate-100">Step 4: User & Birth Chart Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={userDetails.phone}
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
              <input
                type="date"
                value={userDetails.dob}
                onChange={(e) => setUserDetails({ ...userDetails, dob: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Time of Birth</label>
              <input
                type="text"
                placeholder="e.g. 08:30 AM"
                value={userDetails.timeOfBirth}
                onChange={(e) => setUserDetails({ ...userDetails, timeOfBirth: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Place of Birth</label>
              <input
                type="text"
                placeholder="City, State, Country"
                value={userDetails.placeOfBirth}
                onChange={(e) => setUserDetails({ ...userDetails, placeOfBirth: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(3)}>
              Back
            </Button>
            <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} onClick={() => setStep(5)}>
              Proceed to Summary & Payment
            </Button>
          </div>
        </div>
      )}

      {/* STEP 5: PAYMENT SUMMARY & MOCK PAY */}
      {step === 5 && (
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6 animate-fadeIn">
          <h2 className="text-lg font-bold text-slate-100">Step 5: Order Summary & Payment</h2>
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Service:</span>
              <span className="font-bold text-slate-100">{selectedService.title}</span>
            </div>
            <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Astrologer:</span>
              <span className="font-bold text-amber-300">{BRAND_CONFIG.astrologerName}</span>
            </div>
            <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Mode & Schedule:</span>
              <span className="font-bold text-slate-100">
                {consultationType} • {selectedDate} ({selectedTimeSlot})
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold pt-1">
              <span className="text-slate-200">Total Payable:</span>
              <span className="text-amber-300">{formatPrice(selectedService.price)}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Select Mock Payment Method</label>
            <div className="grid grid-cols-3 gap-3">
              {["upi", "card", "netbanking"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                    paymentMethod === method
                      ? "bg-amber-500/20 border-amber-400 text-amber-300"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>This is a frontend demo. Clicking "Pay & Confirm Booking" will instantly complete the mock booking.</span>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(4)}>
              Back
            </Button>
            <Button variant="primary" icon={<CreditCard className="w-4 h-4" />} onClick={handleConfirmBooking}>
              Pay {formatPrice(selectedService.price)} & Confirm Booking
            </Button>
          </div>
        </div>
      )}

      {/* STEP 6: APPOINTMENT CONFIRMED SCREEN */}
      {step === 6 && confirmedAppointment && (
        <div className="glass-panel p-8 rounded-3xl border border-amber-500/40 text-center space-y-6 animate-fadeIn bg-stars">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              Booking Successful
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
              Appointment Confirmed!
            </h2>
            <p className="text-xs text-slate-400">
              A confirmation email & SMS has been sent to {confirmedAppointment.customerEmail}.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-slate-950 p-6 rounded-2xl border border-amber-500/30 text-left space-y-3">
            <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Appointment ID:</span>
              <span className="font-mono font-bold text-amber-300">{confirmedAppointment.id}</span>
            </div>
            <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Astrologer:</span>
              <span className="font-bold text-slate-100">{confirmedAppointment.astrologerName}</span>
            </div>
            <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Service:</span>
              <span className="font-bold text-slate-100">{confirmedAppointment.serviceTitle}</span>
            </div>
            <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Date & Time:</span>
              <span className="font-bold text-slate-100">{confirmedAppointment.date} ({confirmedAppointment.timeSlot})</span>
            </div>
            <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Consultation Type:</span>
              <span className="font-bold text-amber-300">{confirmedAppointment.consultationType}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Status:</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {confirmedAppointment.status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button href="/dashboard" variant="primary" icon={<User className="w-4 h-4" />}>
              View in Customer Dashboard
            </Button>
            <Button
              variant="outline"
              icon={<Download className="w-4 h-4" />}
            >
              Download Receipt
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-amber-400 text-xs font-bold">Loading booking wizard...</div>}>
      <BookingContent />
    </Suspense>
  );
}
