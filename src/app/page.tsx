"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Heart, 
  MapPin, 
  Waves,
  Navigation2,
  Quote,
  Palmtree,
  Sun,
  Anchor,
  Compass,
  Shell,
  Wind,
  Sparkles,
  CalendarDays,
  Clock,
  Ship,
  Bus,
  Train,
  MapPinned
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Wish {
  id: number;
  name: string;
  message: string;
  date: string;
}

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const NRLogo = ({ className = "" }: { className?: string }) => (
  <div className={`relative group ${className}`}>
    <div className="relative flex items-center justify-center p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#E8A25D]/10 to-[#B9E2E5]/10 rounded-full blur-2xl group-hover:opacity-100 transition-opacity duration-1000 opacity-0" />
      <motion.div 
        className="absolute inset-2 border-[0.5px] border-white/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <span className="text-4xl md:text-5xl font-serif font-light text-white tracking-tighter">N</span>
          <div className="flex flex-col items-center mx-3">
             <motion.div 
               animate={{ height: [0, 16, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="w-[0.5px] bg-[#E8A25D]/60" 
             />
             <span className="text-[#E8A25D] font-accent text-2xl leading-none my-1">&</span>
             <motion.div 
               animate={{ height: [0, 16, 0] }}
               transition={{ duration: 4, repeat: Infinity, delay: 2 }}
               className="w-[0.5px] bg-[#E8A25D]/60" 
             />
          </div>
          <span className="text-4xl md:text-5xl font-serif font-light text-white tracking-tighter">R</span>
        </motion.div>
      </div>
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1"
        animate={{ rotate: 360 }}
        style={{ originY: "40px" }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-1 h-1 bg-[#E8A25D] rounded-full shadow-[0_0_10px_#E8A25D]" />
      </motion.div>
    </div>
  </div>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function WeddingInvitation() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const [metCountdown, setMetCountdown] = useState<number>(0);
  const [weddingCountdown, setWeddingCountdown] = useState<number>(0);
  const [metLabel, setMetLabel] = useState("Until Our Tides Meet");
  
  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, name: "Arun & Divya", message: "So happy for both of you! Wishing you a lifetime of happiness on this beautiful journey.", date: "Today" },
    { id: 2, name: "Priya", message: "Can't wait to celebrate your big day! Congratulations Naveen and Rithika!", date: "Yesterday" }
  ]);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const metDate = new Date(2025, 10, 14).getTime(); 
  const weddingDate = new Date(2026, 2, 5).getTime();

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date().getTime();
      if (now < metDate) {
        setMetCountdown(Math.ceil((metDate - now) / (1000 * 60 * 60 * 24)));
        setMetLabel("Until Our First Meet");
      } else {
        setMetCountdown(Math.floor((now - metDate) / (1000 * 60 * 60 * 24)));
        setMetLabel("Since We First Met");
      }
      setWeddingCountdown(Math.max(0, Math.ceil((weddingDate - now) / (1000 * 60 * 60 * 24))));
    };
    calculateDays();
    const timer = setInterval(calculateDays, 3600000);
    return () => clearInterval(timer);
  }, [metDate, weddingDate]);

  const handleSendWish = () => {
    if (newName.trim() && newMessage.trim()) {
      const newWish: Wish = { id: Date.now(), name: newName, message: newMessage, date: "Just now" };
      setWishes([newWish, ...wishes]);
      setNewName("");
      setNewMessage("");
    }
  };

  const FloatingElement = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );

  const WoodenBoat = ({ color = "#C19A6B", className = "" }: { color?: string, className?: string }) => (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-24 md:h-24">
        <path d="M8 36C8 36 12 52 32 52C52 52 56 36 56 36H8Z" fill={color} />
        <path d="M8 36H56L52 40H12L8 36Z" fill="#8B5E3C" opacity="0.3" />
        <path d="M31 12V36H33V12H31Z" fill="#8B5E3C" />
        <path d="M33 14L50 32H33V14Z" fill="#FDFBF7" fillOpacity="0.9" stroke="#8B5E3C" strokeWidth="0.5" />
        <path d="M31 14L16 32H31V14Z" fill="#FDFBF7" fillOpacity="0.8" stroke="#8B5E3C" strokeWidth="0.5" />
      </svg>
    </div>
  );

  const BottleButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    const [isPopping, setIsPopping] = useState(false);
    const handleClick = () => {
      setIsPopping(true);
      setTimeout(() => { setIsPopping(false); onClick(); }, 800);
    };
    return (
      <motion.button onClick={handleClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative w-full h-24 group mt-4">
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-[#1B3C40]/10 rounded-full blur-xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-16 bg-white backdrop-blur-xl border-2 border-[#B9E2E5] rounded-[2rem] flex items-center justify-center overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)] group-hover:shadow-[0_25px_50px_rgba(185,226,229,0.7)] transition-all duration-700">
            <motion.div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-[#B9E2E5]/70 to-[#B9E2E5]/30" animate={{ y: [0, 5, 0], skewY: [-1, 1, -1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
            <div className="relative z-20 flex items-center gap-4">
              <span className="text-[#1B3C40] tracking-[0.5em] text-[12px] font-normal uppercase drop-shadow-sm">{children}</span>
              <AnimatePresence>
                {isPopping && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="text-[#E8A25D]">
                    <Sparkles size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div className="absolute left-[10%] w-10 h-6 bg-[#FDFBF7] rounded shadow-sm opacity-60 flex flex-col gap-1 p-1 justify-center" animate={{ rotate: [5, -5, 5], y: [0, -3, 0], x: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity }}>
              <div className="h-[1px] w-full bg-[#1B3C40]/10" />
              <div className="h-[1px] w-[80%] bg-[#1B3C40]/10" />
            </motion.div>
            <div className="absolute top-0 left-0 w-full h-2 bg-white/30" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/5" />
          </div>
          <div className="absolute -right-1 w-10 h-10 flex items-center">
            <div className="w-6 h-8 bg-white/10 backdrop-blur-xl border border-white/40 rounded-r-xl border-l-0" />
            <motion.div className="w-4 h-6 bg-[#8B5E3C] rounded-sm shadow-md z-30" animate={isPopping ? { x: [0, 40], y: [0, -20], rotate: [0, 45], opacity: [1, 0] } : { x: 0, y: 0, rotate: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} />
          </div>
        </div>
        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      </motion.button>
    );
  };

  const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
      const toggleVisibility = () => { setIsVisible(window.pageYOffset > 300); };
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.button initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} onClick={scrollToTop} className="fixed bottom-8 right-8 z-[100] bg-white/60 backdrop-blur-xl border border-[#1B3C40]/5 p-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-all duration-500 group">
            <div className="text-[#1B3C40] p-2"><Navigation2 size={24} className="rotate-[-45deg]" /></div>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-1 -right-1 text-[#E8A25D]"><Sparkles size={16} /></motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B3C40] selection:bg-[#B9E2E5] selection:text-[#1B3C40] overflow-x-hidden font-sans">
      <Grain />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#FDFBF7] z-10" />
          <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2000" alt="Aerial Beach" className="w-full h-full object-cover scale-110" />
        </motion.div>

        <div className="relative z-20 container mx-auto px-6 pt-10">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.5 } } }} className="flex flex-col items-center text-center space-y-8 md:space-y-10">
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="mb-[-10px] md:mb-0">
              <NRLogo />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4 text-[#E8A25D] mt-2 md:mt-4">
              <div className="h-px w-6 md:w-10 bg-gradient-to-r from-transparent via-[#E8A25D]/60 to-[#E8A25D]/60" />
              <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/90 shadow-sm">See you where the sea meets the sand.</span>
              <div className="h-px w-6 md:w-10 bg-gradient-to-l from-transparent via-[#E8A25D]/60 to-[#E8A25D]/60" />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} className="relative">
              <h1 className="text-[3.5rem] md:text-[7.5rem] font-serif leading-none tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <span className="block italic font-light opacity-95">Naveen</span>
                <span className="text-2xl md:text-5xl font-accent text-[#E8A25D] lowercase block -my-3 md:-my-8 ml-16 md:ml-40 drop-shadow-lg">&</span>
                <span className="block font-medium">Rithika</span>
              </h1>
              <FloatingElement delay={1} className="absolute -top-12 -right-8 text-[#B9E2E5]/80 hidden md:block"><Shell size={48} /></FloatingElement>
              <FloatingElement delay={2.5} className="absolute -bottom-8 -left-12 text-[#E8A25D]/60 hidden md:block"><Sun size={64} /></FloatingElement>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} transition={{ delay: 0.8, type: "spring", stiffness: 100 }} className="relative mt-4 md:mt-8 group">
              <div className="absolute inset-0 -m-8 border border-white/10 rounded-full animate-[spin_20s_linear_infinite] hidden md:block" />
              <div className="absolute inset-0 -m-4 border border-[#E8A25D]/20 rounded-full animate-[spin_15s_linear_infinite_reverse] hidden md:block" />
              <div className="relative bg-white/5 backdrop-blur-md border border-white/20 rounded-[2.5rem] md:rounded-[3rem] px-8 py-6 md:px-10 md:py-8 space-y-3 md:space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:bg-white/10 transition-colors duration-500">
                <div className="flex items-center justify-center gap-3 md:gap-4">
                  <Heart size={16} className="text-[#E8A25D] fill-[#E8A25D]" />
                  <div className="h-px w-6 md:w-10 bg-gradient-to-r from-transparent via-[#E8A25D] to-transparent" />
                  <Compass size={18} className="text-[#E8A25D] animate-[spin_4s_linear_infinite]" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl md:text-4xl font-serif tracking-[0.1em] text-white drop-shadow-2xl">March 5 2026, Thursday</p>
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <MapPin size={14} className="text-[#B9E2E5]" />
                    <p className="text-[10px] md:text-[14px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-[#B9E2E5] drop-shadow-lg">Bhavani • Tamil Nadu</p>
                  </div>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#E8A25D] text-[#1B3C40] text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] px-5 md:px-6 py-1 rounded-full shadow-lg">Save the Date</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/60 font-bold">Scroll to Dive</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#B9E2E5] to-transparent" />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9E2E5]/10 rounded-full blur-[100px] -mr-32" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E8A25D]/10 rounded-full blur-[120px] -ml-40" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="space-y-12">
            <motion.div variants={fadeInScale}><Compass className="mx-auto text-[#E8A25D]/40 mb-8" size={32} /></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif italic text-[#1B3C40] leading-snug">"Two hearts drift together <br className="hidden md:block" /> to form a single shore."</motion.h2>
            <motion.div variants={fadeInUp} className="flex justify-center items-center gap-6 opacity-30">
              <div className="h-px w-12 bg-[#1B3C40]" /><Waves size={20} /><div className="h-px w-12 bg-[#1B3C40]" />
            </motion.div>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl font-light leading-relaxed text-[#1B3C40]/70 max-w-2xl mx-auto">Our journey has been like the tide—constant, rhythmic, and destined. We invite you to join us as we anchor our lives in the beautiful waters of forever.</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Counters Section */}
      <section className="py-32 bg-[#F9F7F2] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8 text-center md:text-left">
              <motion.div variants={slideInLeft} className="inline-flex items-center gap-3 px-4 py-2 bg-[#B9E2E5]/20 rounded-full text-[#1B3C40] text-[10px] font-bold uppercase tracking-[0.3em]"><Waves size={12} /> Our Journey</motion.div>
              <motion.h3 variants={slideInLeft} className="text-4xl md:text-6xl font-serif">{metLabel}</motion.h3>
              <motion.div variants={fadeInScale} className="flex flex-col gap-2">
                <span className="text-8xl md:text-[10rem] font-serif font-light text-[#E8A25D] leading-none">{metCountdown}</span>
                <span className="text-sm uppercase tracking-[0.6em] text-[#1B3C40]/40 font-bold">Days of Sunlight</span>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-[#1B3C40]/60 max-w-sm mx-auto md:mx-0 font-light italic">The day the horizon shifted.</motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8 text-center md:text-right">
              <motion.div variants={slideInRight} className="inline-flex items-center gap-3 px-4 py-2 bg-[#E8A25D]/20 rounded-full text-[#1B3C40] text-[10px] font-bold uppercase tracking-[0.3em] md:flex-row-reverse"><Wind size={12} /> The Big Day</motion.div>
              <motion.h3 variants={slideInRight} className="text-4xl md:text-6xl font-serif">Sailing to Forever</motion.h3>
              <motion.div variants={fadeInScale} className="flex flex-col gap-2">
                <span className="text-8xl md:text-[10rem] font-serif font-light text-[#B9E2E5] leading-none">{weddingCountdown}</span>
                <span className="text-sm uppercase tracking-[0.6em] text-[#1B3C40]/40 font-bold">Days Until High Tide</span>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-[#1B3C40]/60 max-w-sm mx-auto md:ml-auto md:mr-0 font-light italic">The beginning of our greatest sail.</motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-24 space-y-6">
            <motion.span variants={fadeInUp} className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#E8A25D]">The Itinerary</motion.span>
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-serif">Coastal Celebrations</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-2 gap-12">
            {[
              { type: "Golden Hour Reception", date: "March 5, 2026, Thursday", time: "07:00 PM onwards", venue: "KMP Mahal", loc: "Petharan Thottam, Bhavani", icon: <Sun size={32} className="text-[#E8A25D]" />, img: "/KMPMahal.jpeg" },
              { type: "Wedding Ceremony", date: "March 6, 2026, Friday", time: "07:00 AM - 08:30 AM", venue: "Sangameswarar Temple", loc: "Kooduthurai, Bhavani", icon: <Heart size={24} className="text-[#E8A25D] fill-[#E8A25D]" />, img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200" }
            ].map((event, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }} className="group relative">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#FDFBF7] border border-[#1B3C40]/5 shadow-2xl shadow-[#1B3C40]/5">
                  <div className="h-64 overflow-hidden"><img src={event.img} alt={event.type} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" /></div>
                  <div className="p-12 space-y-8 relative">
                    <div className="absolute -top-8 right-12 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">{event.icon}</div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A5C9CC]">{event.type}</span>
                      <h3 className="text-4xl font-serif">{event.venue}</h3>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-[#1B3C40]/5">
                      <div className="flex items-center gap-4 text-[#1B3C40]/60"><CalendarDays size={18} /><span className="text-sm font-medium">{event.date}</span></div>
                      <div className="flex items-center gap-4 text-[#1B3C40]/60"><Clock size={18} /><span className="text-sm font-medium">{event.time}</span></div>
                      <div className="flex items-center gap-4 text-[#1B3C40]/60"><MapPin size={18} /><span className="text-sm font-medium">{event.loc}</span></div>
                    </div>
                    <Button className="w-full bg-[#1B3C40] hover:bg-[#2A5257] text-white rounded-full h-14 tracking-[0.3em] text-[10px] font-bold transition-all duration-500 shadow-lg shadow-[#1B3C40]/20">GET DIRECTIONS</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-40 bg-[#F9F7F2] overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-12 gap-8 items-center mb-24">
            <motion.div variants={slideInLeft} className="md:col-span-5 space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#E8A25D]">Sea of Memories</span>
              <h2 className="text-5xl md:text-7xl font-serif">Capturing the <br /> Golden Hour</h2>
            </motion.div>
            <motion.div variants={slideInRight} className="md:col-span-7">
              <p className="text-[#1B3C40]/60 font-light italic text-lg leading-relaxed">"Each photo is a seashell we've collected along the shore of our love story—tiny treasures that tell the tale of our tides."</p>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]">
            <motion.div variants={fadeInScale} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="col-span-2 row-span-2 overflow-hidden rounded-[2.5rem] shadow-xl group">
              <img src="/Image4.jpg" alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div variants={fadeInScale} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="col-span-2 overflow-hidden rounded-[2.5rem] shadow-xl group">
              <img src="/Image3.jpg" alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div variants={fadeInScale} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="overflow-hidden rounded-[2.5rem] shadow-xl group">
              <img src="/Image1.jpg" alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div variants={fadeInScale} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="overflow-hidden rounded-[2.5rem] shadow-xl group">
              <img src="/Image5.jpg" alt="Gallery 5" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div variants={fadeInScale} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="overflow-hidden rounded-[2.5rem] shadow-xl group">
              <img src="/Image0.jpg" alt="Gallery 6" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div variants={fadeInScale} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="overflow-hidden rounded-[2.5rem] shadow-xl group">
              <img src="/Image7.jpg" alt="Gallery 7" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div variants={fadeInScale} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="overflow-hidden rounded-[2.5rem] shadow-xl group">
              <img src="/Image10.jpg" alt="Gallery 8" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div variants={fadeInScale} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className="overflow-hidden rounded-[2.5rem] shadow-xl group">
              <img src="/Image8.jpg" alt="Gallery 9" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How to Reach Section */}
      <section className="py-32 bg-[#F0F7F8] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#B9E2E5]/10 rounded-full blur-[120px] -ml-40" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#E8A25D]/10 rounded-full blur-[100px] -mr-32" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16 space-y-6">
            <motion.span variants={fadeInUp} className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#B9E2E5]">Travel Guide</motion.span>
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-serif">How to Reach</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg font-light text-[#1B3C40]/60 italic max-w-xl mx-auto">Find your way to our celebration with these simple directions.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid md:grid-cols-2 gap-8">
            <motion.div variants={slideInLeft} whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-[#1B3C40]/5 shadow-lg hover:shadow-xl transition-shadow duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#E8A25D]/10 rounded-2xl flex items-center justify-center"><Bus size={28} className="text-[#E8A25D]" /></div>
                <h3 className="text-3xl font-serif">By Bus</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#E8A25D] mt-1 flex-shrink-0" />
                  <div><p className="text-sm font-bold text-[#1B3C40]/80 uppercase tracking-wider">Drop Point</p><p className="text-[#1B3C40]/70">Bhavani Lakshmi Nagar Bypass</p></div>
                </div>
                <div className="bg-[#FDFBF7] rounded-2xl p-5 space-y-3">
                  <p className="text-sm font-bold text-[#1B3C40]/80 uppercase tracking-wider">Instructions</p>
                  <p className="text-[#1B3C40]/70 text-[15px]">From the bypass, take a local bus to Bhavani Bus Stand</p>
                </div>
                <Button onClick={() => window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://maps.google.com/?q=Bhavani+Lakshmi+Nagar+Bypass" } }, "*")} className="w-full bg-[#1B3C40] hover:bg-[#2A5257] text-white rounded-full h-12 tracking-[0.2em] text-[10px] font-bold transition-all duration-500"><MapPin size={14} className="mr-2" />OPEN IN GOOGLE MAPS</Button>
              </div>
            </motion.div>

            <motion.div variants={slideInRight} whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-[#1B3C40]/5 shadow-lg hover:shadow-xl transition-shadow duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#B9E2E5]/20 rounded-2xl flex items-center justify-center"><Train size={28} className="text-[#1B3C40]" /></div>
                <h3 className="text-3xl font-serif">By Train</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#E8A25D] mt-1 flex-shrink-0" />
                  <div><p className="text-sm font-bold text-[#1B3C40]/80 uppercase tracking-wider">Drop Point</p><p className="text-[#1B3C40]/70">Erode Junction (ED)</p></div>
                </div>
                <div className="bg-[#FDFBF7] rounded-2xl p-5 space-y-3">
                  <p className="text-sm font-bold text-[#1B3C40]/80 uppercase tracking-wider">Instructions</p>
                  <p className="text-[#1B3C40]/70 text-[15px]">From Erode Junction, take a bus to Bhavani Bus Stand</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={() => window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://maps.google.com/?q=Erode+Junction+Railway+Station" } }, "*")} className="w-full bg-[#1B3C40] hover:bg-[#2A5257] text-white rounded-full h-12 tracking-[0.1em] text-[9px] font-bold transition-all duration-500"><MapPin size={12} className="mr-1" />ERODE STATION</Button>
                  <Button onClick={() => window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://maps.google.com/?q=Bhavani+Bus+Stand" } }, "*")} className="w-full bg-[#B9E2E5] hover:bg-[#A5D4D7] text-[#1B3C40] rounded-full h-12 tracking-[0.1em] text-[9px] font-bold transition-all duration-500"><MapPin size={12} className="mr-1" />BUS STAND</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Guestbook Section */}
      <section className="py-40 bg-[#FDFBF7] relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sticky top-20 space-y-12">
              <div className="space-y-6 relative">
                <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#B9E2E5]">Driftwood Messages</span>
                <h2 className="text-5xl md:text-7xl font-serif">Leave a Ripple</h2>
                <p className="text-lg font-light text-[#1B3C40]/60 italic max-w-md">Your blessings are the wind in our sails. Send us a message to wash ashore our new beginning.</p>
                <div className="relative w-full h-24 -mt-8 overflow-hidden pointer-events-none">
                  <motion.div initial={{ x: "-20%" }} animate={{ x: "120%", y: [0, -3, 0], rotate: [0, 1, -1, 0] }} transition={{ x: { duration: 35, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }} className="absolute top-0">
                    <WoodenBoat className="scale-[0.4] opacity-30" />
                  </motion.div>
                  <div className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B9E2E5]/20 to-transparent" />
                </div>
              </div>

              <div className="p-10 bg-[#FDFBF7] rounded-[3rem] border border-[#1B3C40]/5 space-y-8 shadow-inner">
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1B3C40]/30 ml-2">Voyager Name</Label>
                  <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter your name" className="bg-white border-none rounded-2xl h-16 px-6 text-sm focus-visible:ring-1 focus-visible:ring-[#B9E2E5] shadow-sm" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1B3C40]/30 ml-2">Sea Whisper</Label>
                  <Textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Whisper your message to the tides..." className="bg-white border-none rounded-2xl min-h-[160px] p-6 text-sm focus-visible:ring-1 focus-visible:ring-[#B9E2E5] resize-none shadow-sm" />
                </div>
                <BottleButton onClick={handleSendWish}>SEND TO SHORE</BottleButton>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="space-y-8">
              <AnimatePresence mode="popLayout">
                {wishes.map((wish, index) => (
                  <motion.div key={wish.id} layout initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: index * 0.1, duration: 0.6 }} whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }} className="p-10 bg-white rounded-[2.5rem] border border-[#1B3C40]/5 shadow-sm hover:shadow-md transition-all duration-500 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 transition-opacity"><Shell size={64} /></div>
                    <Quote className="text-[#B9E2E5] mb-6" size={24} />
                    <p className="text-xl font-serif italic text-[#1B3C40]/80 leading-relaxed">"{wish.message}"</p>
                    <div className="mt-8 pt-8 border-t border-[#1B3C40]/5 flex justify-between items-center">
                      <span className="font-serif text-xl tracking-tight">{wish.name}</span>
                      <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1B3C40]/30">{wish.date}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#FDFBF7] text-[#1B3C40] relative border-t border-[#1B3C40]/5">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-serif italic font-light tracking-widest opacity-80">NaveeRitzz</h2>
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="text-[#E8A25D]"><Heart size={20} fill="currentColor" /></motion.div>
          </motion.div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Great+Vibes&display=swap');
        :root { --font-serif: 'Cormorant Garamond', serif; --font-sans: 'Montserrat', sans-serif; --font-accent: 'Great Vibes', cursive; }
        body { font-family: var(--font-sans); scroll-behavior: smooth; }
        .font-serif { font-family: var(--font-serif); }
        .font-accent { font-family: var(--font-accent); }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FDFBF7; }
        ::-webkit-scrollbar-thumb { background: #B9E2E5; border-radius: 10px; }
      `}</style>
    </div>
  );
}
