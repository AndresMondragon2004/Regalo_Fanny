import { motion } from 'framer-motion';

// --- Improved, Highly Detailed SVGs ---

const Balloon = ({ className, color }) => (
  <svg viewBox="0 0 100 180" className={className} style={{ color }} xmlns="http://www.w3.org/2000/svg">
    {/* String */}
    <path d="M50 140 Q 40 160, 50 180" stroke="rgba(255,255,255,0.6)" fill="none" strokeWidth="2" />
    {/* Balloon Body */}
    <path d="M50 15 C20 15, 10 45, 10 75 C10 110, 30 130, 50 140 C70 130, 90 110, 90 75 C90 45, 80 15, 50 15 Z" fill="currentColor"/>
    {/* Balloon Tie */}
    <path d="M45 140 L55 140 L52 148 L48 148 Z" fill="currentColor"/>
    {/* Glossy Highlight */}
    <path d="M25 45 Q 35 20, 60 25" stroke="rgba(255,255,255,0.4)" fill="none" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const Heart = ({ className, color }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ color }} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 90 C 50 90, 10 60, 10 30 C 10 10, 45 10, 50 35 C 55 10, 90 10, 90 30 C 90 60, 50 90, 50 90 Z" fill="currentColor" />
    {/* Glassy reflection */}
    <path d="M25 30 Q 30 15, 45 20" stroke="rgba(255,255,255,0.5)" fill="none" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const Star = ({ className, color }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ color }} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* 8-pointed star */}
    <path d="M50 5 L55 40 L95 50 L55 60 L50 95 L45 60 L5 50 L45 40 Z" />
    {/* Inner glow/layer */}
    <path d="M50 20 L53 45 L75 50 L53 55 L50 80 L47 55 L25 50 L47 45 Z" fill="rgba(255,255,255,0.6)"/>
  </svg>
);

const Twinkle = ({ className, color }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ color }} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="12" />
    <path d="M50 10 Q50 40 80 50 Q50 60 50 90 Q50 60 20 50 Q50 40 50 10 Z" />
  </svg>
);

const MiniCake = ({ className, color }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ color }} xmlns="http://www.w3.org/2000/svg">
    {/* Base Layer */}
    <rect x="20" y="60" width="60" height="30" rx="6" fill="currentColor" />
    {/* Icing Drips */}
    <path d="M18 60 Q 25 75, 35 60 Q 45 75, 55 60 Q 65 75, 75 60 Q 85 75, 82 60 Z" fill="rgba(255,255,255,0.9)" />
    <rect x="18" y="55" width="64" height="10" rx="4" fill="rgba(255,255,255,0.9)" />
    {/* Cherry */}
    <circle cx="50" cy="48" r="8" fill="#f43f5e" />
    {/* Candle */}
    <rect x="48" y="22" width="4" height="20" fill="#fef08a" />
    {/* Flame */}
    <path d="M50 10 Q 55 18, 50 22 Q 45 18, 50 10 Z" fill="#fbbf24" />
  </svg>
);

// --- Layout Configurations ---

const joyfulElements = [
  { id: 1, Type: Balloon, color: "#f43f5e", size: "w-24 h-40", top: "5%", left: "5%", delay: 0, dur: 6, rot: [-5, 5] },
  { id: 2, Type: Heart, color: "#eab308", size: "w-16 h-16", top: "15%", left: "82%", delay: 1, dur: 5, rot: [-10, 10] },
  { id: 3, Type: Twinkle, color: "#ffffff", size: "w-12 h-12", top: "40%", left: "10%", delay: 2, dur: 4, rot: [0, 90] },
  { id: 4, Type: MiniCake, color: "#a855f7", size: "w-20 h-20", top: "75%", left: "75%", delay: 0.5, dur: 4.5, rot: [-3, 3] },
  { id: 5, Type: Balloon, color: "#0ea5e9", size: "w-20 h-36", top: "55%", left: "8%", delay: 1.5, dur: 7, rot: [5, -5] },
  { id: 6, Type: Star, color: "#ffffff", size: "w-14 h-14", top: "25%", left: "35%", delay: 2.5, dur: 5, rot: [0, -90] },
  { id: 7, Type: Heart, color: "#f43f5e", size: "w-12 h-12", top: "50%", left: "88%", delay: 0.8, dur: 4.2, rot: [10, -10] },
  { id: 8, Type: Twinkle, color: "#ffffff", size: "w-8 h-8", top: "85%", left: "20%", delay: 3, dur: 3.5, rot: [0, 180] },
  { id: 9, Type: Balloon, color: "#d946ef", size: "w-28 h-48", top: "30%", left: "85%", delay: 0.2, dur: 8, rot: [-2, 2] },
  { id: 10, Type: Star, color: "#fef08a", size: "w-12 h-12", top: "8%", left: "55%", delay: 1.2, dur: 6, rot: [0, 90] },
  { id: 11, Type: MiniCake, color: "#14b8a6", size: "w-16 h-16", top: "82%", left: "45%", delay: 2.2, dur: 5.5, rot: [-4, 4] },
  { id: 12, Type: Heart, color: "#3b82f6", size: "w-14 h-14", top: "35%", left: "20%", delay: 1.7, dur: 4.8, rot: [-15, 15] },
  { id: 13, Type: Twinkle, color: "#fecdd3", size: "w-10 h-10", top: "12%", left: "25%", delay: 0.7, dur: 5.2, rot: [0, -180] },
  { id: 14, Type: Star, color: "#ffffff", size: "w-8 h-8", top: "65%", left: "60%", delay: 2.8, dur: 4.5, rot: [0, 90] },
];

const starryElements = [
  { id: 1, Type: Star, color: "#ffffff", size: "w-8 h-8", top: "10%", left: "15%", delay: 0, dur: 6 },
  { id: 2, Type: Twinkle, color: "#e0e7ff", size: "w-5 h-5", top: "25%", left: "80%", delay: 1, dur: 4 },
  { id: 3, Type: Star, color: "#fecdd3", size: "w-10 h-10", top: "45%", left: "10%", delay: 2, dur: 7 },
  { id: 4, Type: Twinkle, color: "#ffffff", size: "w-6 h-6", top: "15%", left: "45%", delay: 0.5, dur: 5 },
  { id: 5, Type: Star, color: "#c7d2fe", size: "w-9 h-9", top: "60%", left: "85%", delay: 1.5, dur: 6.5 },
  { id: 6, Type: Twinkle, color: "#ffffff", size: "w-4 h-4", top: "80%", left: "20%", delay: 2.5, dur: 4.5 },
  { id: 7, Type: Star, color: "#fef08a", size: "w-7 h-7", top: "35%", left: "65%", delay: 0.8, dur: 5.5 },
  { id: 8, Type: Twinkle, color: "#ffffff", size: "w-8 h-8", top: "75%", left: "55%", delay: 3, dur: 8 },
  { id: 9, Type: Star, color: "#e0e7ff", size: "w-12 h-12", top: "90%", left: "80%", delay: 1.2, dur: 6 },
  { id: 10, Type: Twinkle, color: "#fecdd3", size: "w-5 h-5", top: "50%", left: "30%", delay: 2.2, dur: 5 },
  { id: 11, Type: Star, color: "#ffffff", size: "w-6 h-6", top: "5%", left: "85%", delay: 1.7, dur: 4.2 },
  { id: 12, Type: Twinkle, color: "#ffffff", size: "w-9 h-9", top: "95%", left: "10%", delay: 0.3, dur: 7.5 },
  { id: 13, Type: Star, color: "#fef08a", size: "w-5 h-5", top: "20%", left: "30%", delay: 2.7, dur: 6.2 },
  { id: 14, Type: Twinkle, color: "#c7d2fe", size: "w-7 h-7", top: "70%", left: "8%", delay: 1.4, dur: 5.8 },
  { id: 15, Type: Star, color: "#ffffff", size: "w-8 h-8", top: "40%", left: "88%", delay: 0.9, dur: 4.7 },
];

export default function Decorations({ step }) {
  const isIntimate = step === 2;

  if (isIntimate) {
    return (
       <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
         {starryElements.map((el) => (
           <motion.div
             key={`star-${el.id}`}
             animate={{ 
               y: [0, -15, 0], 
               opacity: [0.1, 0.7, 0.1], 
               rotate: [0, 90, 180] 
             }}
             transition={{ repeat: Infinity, duration: el.dur, delay: el.delay, ease: "easeInOut" }}
             className={`absolute ${el.size}`}
             style={{ top: el.top, left: el.left }}
           >
             <el.Type className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" color={el.color} />
           </motion.div>
         ))}
       </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
       {joyfulElements.map((el) => (
           <motion.div
             key={`joy-${el.id}`}
             animate={{ 
               y: [0, -40, 0], 
               rotate: el.rot 
             }}
             transition={{ repeat: Infinity, duration: el.dur, delay: el.delay, ease: "easeInOut" }}
             className={`absolute ${el.size} drop-shadow-xl`}
             style={{ top: el.top, left: el.left }}
           >
             <el.Type className="w-full h-full opacity-90" color={el.color} />
           </motion.div>
         ))}
    </div>
  );
}
