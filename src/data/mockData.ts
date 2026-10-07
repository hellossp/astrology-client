export interface ZodiacSign {
  id: string;
  name: string;
  sanskritName: string;
  symbol: string;
  dates: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  rulingPlanet: string;
  color: string;
  icon: string;
}

export interface HoroscopePrediction {
  signId: string;
  period: "daily" | "weekly" | "monthly";
  title: string;
  general: string;
  career: string;
  love: string;
  finance: string;
  health: string;
  luckyNumber: number;
  luckyColor: string;
  date: string;
}

export interface AstrologyService {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  duration: string;
  price: number;
  originalPrice?: number;
  isOnlineAvailable: boolean;
  isOfflineAvailable: boolean;
  popular?: boolean;
  icon: string;
  benefits: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Astrology" | "Vedic Astrology" | "Kundli" | "Marriage" | "Career" | "Spirituality";
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  service: string;
  photo: string;
  status: "approved" | "pending" | "rejected";
  date: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceTitle: string;
  astrologerName: string;
  date: string;
  timeSlot: string;
  consultationType: "Online" | "Offline";
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  paymentStatus: "Paid" | "Pending" | "Refunded" | "Failed";
  amount: number;
  notes?: string;
  dob?: string;
  timeOfBirth?: string;
  placeOfBirth?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  timeOfBirth: string;
  placeOfBirth: string;
  totalAppointments: number;
  lastAppointment: string;
  status: "Active" | "Inactive";
  joinedDate: string;
}

export interface PaymentRecord {
  id: string;
  paymentId: string;
  customerName: string;
  appointmentId: string;
  serviceTitle: string;
  amount: number;
  date: string;
  method: string;
  status: "Paid" | "Pending" | "Refunded" | "Failed";
}

export interface ShopProduct {
  id: string;
  name: string;
  category: "Gemstones" | "Rudraksha" | "Yantra" | "Puja Items" | "Accessories" | "Books";
  description: string;
  estimatedPrice: number;
  image: string;
  badge?: string;
  status: "Coming Soon" | "In Stock" | "Out of Stock";
}

// ---------------------- DATA COLLECTIONS ----------------------

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: "aries", name: "Aries", sanskritName: "Mesha (मेष)", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire", rulingPlanet: "Mars", color: "from-red-500 to-amber-600", icon: "Flame" },
  { id: "taurus", name: "Taurus", sanskritName: "Vrishabha (वृषभ)", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth", rulingPlanet: "Venus", color: "from-emerald-500 to-teal-700", icon: "Mountain" },
  { id: "gemini", name: "Gemini", sanskritName: "Mithuna (मिथुन)", symbol: "♊", dates: "May 21 - Jun 20", element: "Air", rulingPlanet: "Mercury", color: "from-yellow-400 to-amber-500", icon: "Wind" },
  { id: "cancer", name: "Cancer", sanskritName: "Karka (कर्क)", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water", rulingPlanet: "Moon", color: "from-cyan-400 to-blue-600", icon: "Waves" },
  { id: "leo", name: "Leo", sanskritName: "Simha (सिंह)", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire", rulingPlanet: "Sun", color: "from-amber-400 to-orange-600", icon: "Sun" },
  { id: "virgo", name: "Virgo", sanskritName: "Kanya (कन्या)", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth", rulingPlanet: "Mercury", color: "from-emerald-600 to-green-800", icon: "Leaf" },
  { id: "libra", name: "Libra", sanskritName: "Tula (तुला)", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air", rulingPlanet: "Venus", color: "from-pink-400 to-rose-600", icon: "Scale" },
  { id: "scorpio", name: "Scorpio", sanskritName: "Vrischika (वृश्चिक)", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water", rulingPlanet: "Mars", color: "from-purple-600 to-indigo-900", icon: "Zap" },
  { id: "sagittarius", name: "Sagittarius", sanskritName: "Dhanu (धनु)", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire", rulingPlanet: "Jupiter", color: "from-indigo-500 to-purple-700", icon: "Compass" },
  { id: "capricorn", name: "Capricorn", sanskritName: "Makara (मकर)", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth", rulingPlanet: "Saturn", color: "from-slate-600 to-gray-800", icon: "Shield" },
  { id: "aquarius", name: "Aquarius", sanskritName: "Kumbha (कुम्भ)", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air", rulingPlanet: "Saturn", color: "from-sky-400 to-indigo-600", icon: "Droplets" },
  { id: "pisces", name: "Pisces", sanskritName: "Meena (मीन)", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water", rulingPlanet: "Jupiter", color: "from-teal-400 to-indigo-500", icon: "Sparkles" }
];

export const MOCK_HOROSCOPES: HoroscopePrediction[] = ZODIAC_SIGNS.flatMap((sign) => [
  {
    signId: sign.id,
    period: "daily",
    date: "Today",
    title: `Cosmic Focus for ${sign.name}`,
    general: `Today, Jupiter's transit brings renewed clarity to your path. You will feel a strong surge of creative energy and emotional balance. Trust your instincts when taking key decisions.`,
    career: `A favorable planetary alignment creates high potential for career recognition. Collaborations started today will yield steady long-term rewards.`,
    love: `Warmth and deep mutual understanding dominate your relationships. Express your gratitude openly to your partner or family members.`,
    finance: `Smart financial decisions made previously begin to show positive returns. Avoid impulsive investments in speculative ventures today.`,
    health: `Energy levels remain high throughout the day. Practice mindfulness, light pranayama, or hydration to maintain inner peace.`,
    luckyNumber: 7,
    luckyColor: "Royal Gold"
  },
  {
    signId: sign.id,
    period: "weekly",
    date: "This Week",
    title: `Weekly Horizon for ${sign.name}`,
    general: `The upcoming week is filled with opportunities for personal growth and spiritual alignment. Celestial forces encourage you to organize priorities and clear backlog tasks.`,
    career: `Mid-week progress will unlock new project avenues. Leadership skills will be appreciated by team members and superiors alike.`,
    love: `A wonderful week to rekindle affection. Honest conversations will eliminate minor misunderstandings and bring you closer.`,
    finance: `Financial stability is indicated. Good week for planning long-term savings or reviewing property and asset allocations.`,
    health: `Pay attention to sleep routines. Gentle evening walks and balanced nutrition will keep your immunity at peak performance.`,
    luckyNumber: 3,
    luckyColor: "Saffron Yellow"
  },
  {
    signId: sign.id,
    period: "monthly",
    date: "This Month",
    title: `Monthly Outlook for ${sign.name}`,
    general: `This month marks a transformative phase governed by Saturn and Mercury. Major milestones regarding long-held aspirations will start manifesting smoothly.`,
    career: `Prospective promotions, strategic business deals, or new career shifts are strongly favored in the second and third weeks.`,
    love: `Romance blooms under favorable Venus positions. Unmarried individuals may receive significant family proposals or meaningful introductions.`,
    finance: `Inflow of unexpected gains or returns on earlier commitments is likely. Plan investments with professional consultation.`,
    health: `Maintain physical fitness with consistent routines. Holistic wellness practices like yoga and meditation will bring high mental acuity.`,
    luckyNumber: 9,
    luckyColor: "Deep Indigo"
  }
]);

export const ASTROLOGY_SERVICES: AstrologyService[] = [
  {
    id: "kundli-reading",
    title: "Detailed Kundli & Horoscope Analysis",
    category: "Vedic Astrology",
    description: "In-depth lifetime prediction based on birth chart, planetary positions, Dasha cycles and remedy suggestions.",
    fullDescription: "Our signature Kundli Consultation provides a thorough examination of your Janam Kundli. We analyze your Lagna, Rashi, 12 Houses, Mahadasha, and current planetary transits. Get actionable remedies for Doshas like Mangal, Kaal Sarp, or Shani Sade Sati.",
    duration: "45 Mins",
    price: 1499,
    originalPrice: 2499,
    isOnlineAvailable: true,
    isOfflineAvailable: true,
    popular: true,
    icon: "Scroll",
    benefits: ["Complete 12-House Analysis", "Dasha & Transit Timeline", "Personalized Gemstone & Remedy Advice", "Audio Recording Provided"]
  },
  {
    id: "career-consultation",
    title: "Career & Professional Guidance",
    category: "Career",
    description: "Discover your optimal career path, promotion timelines, job change prospects, and business venture success rates.",
    fullDescription: "Gain strategic clarity on your professional trajectory. We map the 10th house of career, Sun and Saturn placements to highlight your strengths, ideal business domains, job switch timing, and international job opportunities.",
    duration: "30 Mins",
    price: 1199,
    originalPrice: 1999,
    isOnlineAvailable: true,
    isOfflineAvailable: true,
    popular: true,
    icon: "Briefcase",
    benefits: ["Best Job/Business Selection", "Favorable Promotion Windows", "Remedies for Professional Hurdles", "Q&A Session Included"]
  },
  {
    id: "marriage-matchmaking",
    title: "Kundli Matching & Marriage Prospects",
    category: "Marriage",
    description: "Comprehensive Gun Milan, Nadi Dosha check, compatibility analysis, and timing of marriage.",
    fullDescription: "Ensure marital harmony and mutual prosperity with our rigorous 36-Gun Milan matching. We analyze Manglik Dosha, Nadi, Bhakoot, emotional bonding, financial compatibility, and family harmony between prospective partners.",
    duration: "45 Mins",
    price: 1799,
    originalPrice: 2999,
    isOnlineAvailable: true,
    isOfflineAvailable: true,
    popular: true,
    icon: "HeartHandshake",
    benefits: ["Ashtakoot 36-Gun Score", "Manglik & Nadi Compatibility", "Remedies for Delay in Marriage", "Detailed PDF Report Provided"]
  },
  {
    id: "business-consultation",
    title: "Business & Financial Astrology",
    category: "Business",
    description: "Astro-guidance for business partnerships, launch dates (Mahurat), cash flow growth, and risk management.",
    fullDescription: "Maximize your enterprise potential using business astrology. Determine auspicious launch dates (Auspicious Mahurat), select strategic partner zodiac alignments, and navigate market expansion phases with confidence.",
    duration: "60 Mins",
    price: 2499,
    originalPrice: 3999,
    isOnlineAvailable: true,
    isOfflineAvailable: true,
    popular: false,
    icon: "TrendingUp",
    benefits: ["Auspicious Launch Dates", "Partner Compatibility Audit", "Cash Flow & Wealth Houses", "Annual Business Forecast"]
  },
  {
    id: "vastu-consultation",
    title: "Vastu Shastra Home & Office Audit",
    category: "Vastu",
    description: "Harmonize your living and working spaces with ancient energy principles without major structural demolition.",
    fullDescription: "Correct spatial imbalances in your residence or commercial property. Our non-demolition Vastu remedies restore elemental balance (Earth, Fire, Water, Air, Space) to foster health, peace, and financial growth.",
    duration: "60 Mins",
    price: 2999,
    originalPrice: 4999,
    isOnlineAvailable: true,
    isOfflineAvailable: true,
    popular: false,
    icon: "Home",
    benefits: ["Room-by-Room Directional Map", "Pyramid & Crystal Remedies", "No Structural Demolition", "Written Placement Guide"]
  },
  {
    id: "numerology-reading",
    title: "Name Numerology & Life Path Numbers",
    category: "Numerology",
    description: "Align your name spelling, phone number, vehicle number, and lucky dates with your core Destiny Number.",
    fullDescription: "Unlock the vibrational frequencies of numbers in your life. We calculate your Life Path, Expression, Soul Urge numbers, and suggest small name spelling corrections that open doorways to success.",
    duration: "30 Mins",
    price: 999,
    originalPrice: 1699,
    isOnlineAvailable: true,
    isOfflineAvailable: false,
    popular: false,
    icon: "Hash",
    benefits: ["Life Path & Destiny Score", "Name Correction Guidance", "Lucky Numbers & Dates", "Phone/Business Name Tuning"]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "understanding-saturn-transit-sade-sati",
    title: "Understanding Saturn Transit: How to Turn Sade Sati into Your Biggest Strength",
    excerpt: "Sade Sati is often feared, but in Vedic astrology, Saturn acts as a wise mentor. Discover how discipline and Vedic remedies turn challenges into lasting success.",
    content: `Saturn (Shani Dev) is revered in Vedic astrology as the planet of discipline, truth, and karma. When Saturn transits through the 12th, 1st, and 2nd houses from your birth Moon sign, this 7.5-year phase is known as Sade Sati.

While popular myths treat Sade Sati with apprehension, ancient Vedic texts view it as a period of profound purification, maturity, and personal strength building.

### Key Phases of Sade Sati
1. **First Phase (12th House):** Focuses on mental reflection, clearing debts, and inner audit.
2. **Second Phase (1st House):** Directly challenges self-discipline, health awareness, and career responsibility.
3. **Third Phase (2nd House):** Stabilizes financial habits and family communication.

### Powerful Vedic Remedies for Sade Sati
- **Hanuman Chalisa:** Reciting Hanuman Chalisa on Saturdays yields strong spiritual shielding.
- **Charity & Service:** Donating sesame seeds, mustard oil, or iron utensils to the needy on Saturdays.
- **Mantra Chanting:** Chanting the Shani Beej Mantra (*Om Sham Shanaisccharaya Namah*) 108 times daily.`,
    category: "Vedic Astrology",
    date: "Oct 04, 2026",
    readTime: "5 min read",
    author: "YOUR ASTROLOGER NAME",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
    featured: true
  },
  {
    id: "b2",
    slug: "how-to-read-your-janam-kundli-basics",
    title: "A Beginner's Guide to Reading Your Janam Kundli Houses",
    excerpt: "The 12 houses of your birth chart govern every aspect of your life—from health and wealth to marriage and liberation.",
    content: `Your Janam Kundli is a snapshot of the celestial heavens at the precise second you took your first breath. It is divided into 12 segments known as Houses (Bhavas).

Each house governs specific life areas:
- **1st House (Lagna):** Self, identity, physical body, health.
- **2nd House (Dhana Bhava):** Wealth, family, speech.
- **5th House (Putra Bhava):** Intelligence, creativity, progeny, past good deeds.
- **7th House (Yuvati Bhava):** Marriage, spouse characteristics, business partnerships.
- **10th House (Karma Bhava):** Profession, status, honor, career trajectory.

Understanding the ruling planets of these houses helps you navigate life decisions with absolute confidence.`,
    category: "Kundli",
    date: "Sep 28, 2026",
    readTime: "6 min read",
    author: "YOUR ASTROLOGER NAME",
    image: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=800&q=80"
  },
  {
    id: "b3",
    slug: "kundli-matching-for-happy-marriage",
    title: "Why Kundli Matching Goes Beyond 36-Gun Milan for Marital Bliss",
    excerpt: "While high Gun Milan scores are encouraging, evaluating Mars placement, Nadi Dosha, and 7th house strength guarantees genuine marital longevity.",
    content: `In Vedic tradition, marriage is not merely a contract between two individuals, but a union of spiritual energies and families. 

While the Ashtakoot 36-point matching system is a vital baseline, true astrological compatibility checks:
1. **Lagna & Moon Harmony:** Ensures mutual emotional understanding.
2. **Venus & Jupiter Strength:** Indicates love, prosperity, and respect.
3. **Manglik Dosha Remedies:** Evaluates whether Mars intensity is matched or neutralized.`,
    category: "Marriage",
    date: "Sep 15, 2026",
    readTime: "4 min read",
    author: "YOUR ASTROLOGER NAME",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
  },
  {
    id: "b4",
    slug: "vastu-tips-for-wealth-and-harmony-at-home",
    title: "7 Simple Vastu Remedies to Enhance Positive Energy in Your Home",
    excerpt: "Small spatial adjustments in your living area can remove energetic blockages and invite prosperity.",
    content: `Vastu Shastra aligns built spaces with natural cosmic magnetic currents. 

### Key Tips for Everyday Home Vastu:
- Keep the North-East direction (Ishan Kona) clean, open, and clutter-free.
- Ensure main entrance lighting is warm, inviting, and well-lit.
- Keep water elements (like aquariums or small fountains) in the North or East zones.`,
    category: "Spirituality",
    date: "Aug 30, 2026",
    readTime: "4 min read",
    author: "YOUR ASTROLOGER NAME",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80"
  }
];

export const PREDEFINED_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I book an appointment?",
    answer: "Booking an appointment is easy! Go to the 'Appointments' or 'Services' page, choose your preferred astrological service, select either Online (Video Call) or Offline consultation, pick an available date and time slot, enter your birth details, and confirm your booking.",
    category: "Booking"
  },
  {
    id: "faq-2",
    question: "How can I generate my Kundli?",
    answer: "You can generate your birth chart for free by visiting our 'Free Kundli' page (/kundli). Enter your Full Name, Date of Birth, Exact Time of Birth, and Place of Birth. Click 'Generate My Kundli' to instantly view your Lagna, Rashi, Nakshatra, and full planetary positions.",
    category: "Kundli"
  },
  {
    id: "faq-3",
    question: "How can I cancel or reschedule an appointment?",
    answer: "Log into your Customer Dashboard (/dashboard), go to the 'My Appointments' tab, select your upcoming appointment card, and click on 'Reschedule' or 'Cancel'. Cancellations made at least 24 hours prior to your scheduled time slot are fully refundable.",
    category: "Appointments"
  },
  {
    id: "faq-4",
    question: "Do you provide offline consultation?",
    answer: "Yes! We offer both Online Video Consultations (via Google Meet/Zoom) and in-person Offline Consultations at our New Delhi center. Select 'Offline Consultation' during the booking step to visit our center.",
    category: "Consultation"
  },
  {
    id: "faq-5",
    question: "What payment methods are supported?",
    answer: "We support UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, NetBanking, and major international wallets.",
    category: "Payment"
  },
  {
    id: "faq-6",
    question: "How can I download my report?",
    answer: "Once your Kundli or Consultation report is generated, visit your Customer Dashboard (/dashboard) under 'Downloaded Reports'. Click the 'Download PDF' button next to your report to save it directly to your device.",
    category: "Reports"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Sharma",
    location: "Mumbai",
    rating: 5,
    review: "The career consultation was eye-opening! The astrologer predicted my job switch window to the exact month. Highly professional and deeply knowledgeable.",
    service: "Career Consultation",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    status: "approved",
    date: "2026-09-12"
  },
  {
    id: "t2",
    name: "Priya Malhotra",
    location: "Delhi",
    rating: 5,
    review: "Generated my Kundli here and booked a matching consultation. The guidance provided saved us from potential misunderstandings and brought immense clarity.",
    service: "Kundli Matching",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    status: "approved",
    date: "2026-09-25"
  },
  {
    id: "t3",
    name: "Amitabh Verma",
    location: "Bangalore",
    rating: 5,
    review: "The remedies suggested for my Sade Sati were straightforward, spiritual, and effective. Felt an immediate reduction in mental stress within 3 weeks.",
    service: "Detailed Kundli Analysis",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    status: "approved",
    date: "2026-10-01"
  }
];

export const MOCK_SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "p1",
    name: "Natural Certified Yellow Sapphire (Pukhraj)",
    category: "Gemstones",
    description: "Unheated, lab-certified Sri Lankan Yellow Sapphire for Jupiter strength, wisdom, and financial growth.",
    estimatedPrice: 12500,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    badge: "Most Requested",
    status: "Coming Soon"
  },
  {
    id: "p2",
    name: "Authentic 5 Mukhi Nepal Rudraksha Mala",
    category: "Rudraksha",
    description: "108+1 original Nepal beads energized with Vedic mantras for peace of mind, focus, and blood pressure control.",
    estimatedPrice: 2499,
    image: "https://images.unsplash.com/photo-1611591459205-a6a757657930?w=500&q=80",
    badge: "Energized",
    status: "Coming Soon"
  },
  {
    id: "p3",
    name: "Pure Copper Sri Yantra for Wealth & Harmony",
    category: "Yantra",
    description: "Sacred geometric Sri Yantra crafted in heavy copper plate for North-East home alter energization.",
    estimatedPrice: 1899,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    badge: "Vedic Craft",
    status: "Coming Soon"
  },
  {
    id: "p4",
    name: "Complete Mahamrityunjaya Puja Essentials Kit",
    category: "Puja Items",
    description: "Curated organic samagri, brass diya, pure camphor, sandalwood paste, and sacred threads.",
    estimatedPrice: 1499,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&q=80",
    status: "Coming Soon"
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-1082",
    customerName: "Dhiren Sharma",
    customerEmail: "dhiren@example.com",
    customerPhone: "+91 9876543210",
    serviceId: "kundli-reading",
    serviceTitle: "Detailed Kundli & Horoscope Analysis",
    astrologerName: "YOUR ASTROLOGER NAME",
    date: "2026-10-12",
    timeSlot: "11:00 AM - 11:45 AM",
    consultationType: "Online",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 1499,
    dob: "1994-08-15",
    timeOfBirth: "08:30 AM",
    placeOfBirth: "New Delhi"
  },
  {
    id: "APT-1079",
    customerName: "Ananya Roy",
    customerEmail: "ananya@example.com",
    customerPhone: "+91 9812345678",
    serviceId: "career-consultation",
    serviceTitle: "Career & Professional Guidance",
    astrologerName: "YOUR ASTROLOGER NAME",
    date: "2026-10-15",
    timeSlot: "03:30 PM - 04:00 PM",
    consultationType: "Offline",
    status: "Pending",
    paymentStatus: "Paid",
    amount: 1199,
    dob: "1997-03-22",
    timeOfBirth: "02:15 PM",
    placeOfBirth: "Kolkata"
  },
  {
    id: "APT-1045",
    customerName: "Dhiren Sharma",
    customerEmail: "dhiren@example.com",
    customerPhone: "+91 9876543210",
    serviceId: "vastu-consultation",
    serviceTitle: "Vastu Shastra Home Audit",
    astrologerName: "YOUR ASTROLOGER NAME",
    date: "2026-09-20",
    timeSlot: "04:00 PM - 05:00 PM",
    consultationType: "Online",
    status: "Completed",
    paymentStatus: "Paid",
    amount: 2999
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "CUST-01",
    name: "Dhiren Sharma",
    email: "dhiren@example.com",
    phone: "+91 98765 43210",
    dob: "1994-08-15",
    timeOfBirth: "08:30 AM",
    placeOfBirth: "New Delhi",
    totalAppointments: 2,
    lastAppointment: "2026-10-12",
    status: "Active",
    joinedDate: "2026-01-10"
  },
  {
    id: "CUST-02",
    name: "Ananya Roy",
    email: "ananya@example.com",
    phone: "+91 98123 45678",
    dob: "1997-03-22",
    timeOfBirth: "02:15 PM",
    placeOfBirth: "Kolkata",
    totalAppointments: 1,
    lastAppointment: "2026-10-15",
    status: "Active",
    joinedDate: "2026-03-14"
  },
  {
    id: "CUST-03",
    name: "Vikram Malhotra",
    email: "vikram@example.com",
    phone: "+91 99887 76655",
    dob: "1988-11-05",
    timeOfBirth: "10:45 PM",
    placeOfBirth: "Mumbai",
    totalAppointments: 4,
    lastAppointment: "2026-09-28",
    status: "Active",
    joinedDate: "2025-11-02"
  },
  {
    id: "CUST-04",
    name: "Sneha Kapur",
    email: "sneha@example.com",
    phone: "+91 97654 32109",
    dob: "1992-06-18",
    timeOfBirth: "05:10 AM",
    placeOfBirth: "Chandigarh",
    totalAppointments: 0,
    lastAppointment: "N/A",
    status: "Inactive",
    joinedDate: "2026-08-01"
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: "PAY-901",
    paymentId: "PAY_IND_987612",
    customerName: "Dhiren Sharma",
    appointmentId: "APT-1082",
    serviceTitle: "Detailed Kundli & Horoscope Analysis",
    amount: 1499,
    date: "2026-10-07",
    method: "UPI (Google Pay)",
    status: "Paid"
  },
  {
    id: "PAY-900",
    paymentId: "PAY_IND_987600",
    customerName: "Ananya Roy",
    appointmentId: "APT-1079",
    serviceTitle: "Career & Professional Guidance",
    amount: 1199,
    date: "2026-10-06",
    method: "Credit Card",
    status: "Paid"
  },
  {
    id: "PAY-882",
    paymentId: "PAY_IND_987450",
    customerName: "Dhiren Sharma",
    appointmentId: "APT-1045",
    serviceTitle: "Vastu Shastra Home Audit",
    amount: 2999,
    date: "2026-09-20",
    method: "NetBanking",
    status: "Paid"
  }
];
