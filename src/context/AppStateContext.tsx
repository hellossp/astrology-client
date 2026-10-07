"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Appointment,
  Customer,
  HoroscopePrediction,
  BlogPost,
  AstrologyService,
  Testimonial,
  FAQItem,
  PaymentRecord,
  ShopProduct,
  INITIAL_APPOINTMENTS,
  INITIAL_CUSTOMERS,
  MOCK_HOROSCOPES,
  BLOG_POSTS,
  ASTROLOGY_SERVICES,
  TESTIMONIALS,
  PREDEFINED_FAQS,
  INITIAL_PAYMENTS,
  MOCK_SHOP_PRODUCTS,
} from "@/data/mockData";

export interface UserProfile {
  name: string;
  email: string;
  userId: string;
  phone: string;
  dob: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender?: string;
  avatarUrl?: string;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface AppStateContextType {
  // Auth state
  user: UserProfile | null;
  loginDemoUser: () => void;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  
  // Appointments
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, "id" | "status" | "paymentStatus">) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
  rescheduleAppointment: (id: string, date: string, timeSlot: string) => void;
  cancelAppointment: (id: string) => void;

  // Kundli reports saved
  savedKundlis: any[];
  addSavedKundli: (kundliData: any) => void;

  // Horoscopes CMS
  horoscopes: HoroscopePrediction[];
  updateHoroscope: (prediction: HoroscopePrediction) => void;

  // Blog CMS
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, "id">) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Services CMS
  services: AstrologyService[];
  addService: (service: Omit<AstrologyService, "id">) => void;
  updateService: (id: string, service: Partial<AstrologyService>) => void;
  toggleServiceStatus: (id: string) => void;

  // FAQs
  faqs: FAQItem[];
  addFAQ: (faq: Omit<FAQItem, "id">) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (t: Omit<Testimonial, "id" | "status" | "date">) => void;
  updateTestimonialStatus: (id: string, status: Testimonial["status"]) => void;

  // Customers
  customers: Customer[];
  
  // Payments
  payments: PaymentRecord[];

  // Shop
  shopProducts: ShopProduct[];

  // Toast notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;

  // Active Booking Draft state
  bookingDraft: Partial<Appointment> | null;
  setBookingDraft: React.Dispatch<React.SetStateAction<Partial<Appointment> | null>>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  name: "Dhiren Sharma",
  email: "dhiren@example.com",
  userId: "dhiren01",
  phone: "+91 98765 43210",
  dob: "1994-08-15",
  timeOfBirth: "08:30 AM",
  placeOfBirth: "New Delhi",
  gender: "Male",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
};

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER); // Default logged in as demo for rich interactive experience
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [horoscopes, setHoroscopes] = useState<HoroscopePrediction[]>(MOCK_HOROSCOPES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [services, setServices] = useState<AstrologyService[]>(ASTROLOGY_SERVICES);
  const [faqs, setFaqs] = useState<FAQItem[]>(PREDEFINED_FAQS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [shopProducts, setShopProducts] = useState<ShopProduct[]>(MOCK_SHOP_PRODUCTS);
  const [savedKundlis, setSavedKundlis] = useState<any[]>([
    {
      id: "KND-001",
      name: "Dhiren Sharma",
      dob: "1994-08-15",
      time: "08:30 AM",
      place: "New Delhi",
      rashi: "Leo (Simha)",
      nakshatra: "Magha",
      lagna: "Virgo (Kanya)",
      generatedAt: "2026-10-01"
    }
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [bookingDraft, setBookingDraft] = useState<Partial<Appointment> | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loginDemoUser = () => {
    setUser(DEMO_USER);
    showToast("Welcome back, Dhiren! Logged in successfully.", "success");
  };

  const logoutUser = () => {
    setUser(null);
    showToast("Logged out successfully", "info");
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
    showToast("Profile updated successfully", "success");
  };

  const addAppointment = (aptData: Omit<Appointment, "id" | "status" | "paymentStatus">) => {
    const newId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: Appointment = {
      ...aptData,
      id: newId,
      status: "Confirmed",
      paymentStatus: "Paid"
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // Also record payment transaction
    const newPayment: PaymentRecord = {
      id: `PAY-${Math.floor(100 + Math.random() * 900)}`,
      paymentId: `PAY_IND_${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: aptData.customerName,
      appointmentId: newId,
      serviceTitle: aptData.serviceTitle,
      amount: aptData.amount,
      date: new Date().toISOString().split("T")[0],
      method: "UPI (Demo Payment)",
      status: "Paid"
    };
    setPayments((prev) => [newPayment, ...prev]);

    showToast("Appointment booked successfully!", "success");
    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
    showToast(`Appointment ${id} status updated to ${status}`, "success");
  };

  const rescheduleAppointment = (id: string, date: string, timeSlot: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, date, timeSlot } : apt))
    );
    showToast(`Appointment rescheduled to ${date} (${timeSlot})`, "success");
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "Cancelled" } : apt))
    );
    showToast(`Appointment ${id} cancelled`, "info");
  };

  const addSavedKundli = (kundliData: any) => {
    setSavedKundlis((prev) => [kundliData, ...prev]);
    showToast("Kundli report saved to your dashboard", "success");
  };

  const updateHoroscope = (prediction: HoroscopePrediction) => {
    setHoroscopes((prev) => {
      const idx = prev.findIndex(
        (h) => h.signId === prediction.signId && h.period === prediction.period
      );
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = prediction;
        return copy;
      }
      return [...prev, prediction];
    });
    showToast(`Horoscope updated for ${prediction.signId} (${prediction.period})`, "success");
  };

  const addBlogPost = (postData: Omit<BlogPost, "id">) => {
    const newPost: BlogPost = {
      ...postData,
      id: `b${Date.now()}`
    };
    setBlogPosts((prev) => [newPost, ...prev]);
    showToast("New blog post published", "success");
  };

  const updateBlogPost = (id: string, data: Partial<BlogPost>) => {
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
    showToast("Blog post updated", "success");
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    showToast("Blog post deleted", "info");
  };

  const addService = (serviceData: Omit<AstrologyService, "id">) => {
    const newId = `service-${Date.now()}`;
    setServices((prev) => [...prev, { ...serviceData, id: newId }]);
    showToast("Service added successfully", "success");
  };

  const updateService = (id: string, data: Partial<AstrologyService>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
    showToast("Service updated successfully", "success");
  };

  const toggleServiceStatus = (id: string) => {
    showToast("Service status toggled", "info");
  };

  const addFAQ = (faqData: Omit<FAQItem, "id">) => {
    const newFaq: FAQItem = { ...faqData, id: `faq-${Date.now()}` };
    setFaqs((prev) => [...prev, newFaq]);
    showToast("FAQ added", "success");
  };

  const updateFAQ = (id: string, faqData: Partial<FAQItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...faqData } : f)));
    showToast("FAQ updated", "success");
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    showToast("FAQ deleted", "info");
  };

  const addTestimonial = (tData: Omit<Testimonial, "id" | "status" | "date">) => {
    const newT: Testimonial = {
      ...tData,
      id: `t-${Date.now()}`,
      status: "pending",
      date: new Date().toISOString().split("T")[0]
    };
    setTestimonials((prev) => [newT, ...prev]);
    showToast("Testimonial submitted for review!", "success");
  };

  const updateTestimonialStatus = (id: string, status: Testimonial["status"]) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    showToast(`Testimonial marked as ${status}`, "success");
  };

  return (
    <AppStateContext.Provider
      value={{
        user,
        loginDemoUser,
        logoutUser,
        updateUserProfile,
        appointments,
        addAppointment,
        updateAppointmentStatus,
        rescheduleAppointment,
        cancelAppointment,
        savedKundlis,
        addSavedKundli,
        horoscopes,
        updateHoroscope,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        services,
        addService,
        updateService,
        toggleServiceStatus,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        testimonials,
        addTestimonial,
        updateTestimonialStatus,
        customers,
        payments,
        shopProducts,
        toasts,
        showToast,
        removeToast,
        bookingDraft,
        setBookingDraft,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
