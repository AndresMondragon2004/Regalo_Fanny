import { useRef } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { successVibrate } from '../utils/vibrate';

export default function PolaroidScreen({ onReset }) {
  const polaroidRef = useRef(null);
  
  const handleDownload = async () => {
    successVibrate();
    if (polaroidRef.current) {
      try {
        const dataUrl = await toPng(polaroidRef.current, { 
          pixelRatio: 3,
          backgroundColor: null,
          style: {
            transform: 'none',
            boxShadow: 'none'
          }
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "Recuerdo_Bonita.png";
        link.click();
      } catch (err) {
        console.error("Error generating image:", err);
      }
    }
  };

  const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center w-full h-full relative z-40 px-4"
    >
      {/* Wrapper to handle on-screen rotation and shadow without affecting the captured image */}
      <div className="transform rotate-[-3deg] shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative">
        
        {/* The element to be captured */}
        <div 
          ref={polaroidRef}
          className="bg-white p-4 pb-14 md:p-6 md:pb-20 w-72 md:w-80 flex flex-col items-center relative rounded-sm border border-slate-200"
        >
          {/* Photo Area */}
          <div className="w-full aspect-square bg-pink-50 rounded-sm mb-6 border border-slate-200 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
             {/* Abstract magical background */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-200 via-pink-100 to-amber-100 opacity-60"></div>
             <div className="absolute top-4 left-4 w-16 h-16 bg-pink-400 rounded-full mix-blend-multiply opacity-30 blur-2xl"></div>
             <div className="absolute bottom-4 right-4 w-20 h-20 bg-amber-400 rounded-full mix-blend-multiply opacity-30 blur-2xl"></div>
             
             {/* Cake Illustration inside Polaroid */}
             <svg viewBox="0 0 100 100" className="w-32 h-32 text-rose-500 drop-shadow-md z-10" fill="currentColor">
                <rect x="20" y="60" width="60" height="30" rx="5" />
                <path d="M15 60 Q 25 75 35 60 Q 45 75 55 60 Q 65 75 75 60 Q 85 75 85 60 Z" fill="#ffffff" />
                <rect x="48" y="25" width="4" height="25" fill="#fef08a" />
                <path d="M50 15 Q 55 20 50 25 Q 45 20 50 15 Z" fill="#fbbf24" />
                {/* Confetti specs */}
                <circle cx="30" cy="30" r="2" fill="#3b82f6" />
                <circle cx="70" cy="40" r="2" fill="#eab308" />
                <circle cx="80" cy="20" r="2" fill="#10b981" />
                <circle cx="20" cy="45" r="2" fill="#a855f7" />
             </svg>
          </div>
          
          <div className="flex flex-col items-center justify-center pt-2 pb-2">
            <p className="font-caveat text-4xl md:text-5xl text-slate-800 font-bold mb-3 leading-tight text-center">Para mi bonita</p>
            <p className="font-sans text-[10px] text-slate-400 uppercase tracking-widest text-center">{today}</p>
          </div>
        </div>
        
        {/* Tiny piece of tape holding it (Placed outside the capture area so it looks like it's holding the photo to the screen) */}
        <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-20 h-8 bg-white/50 backdrop-blur-sm border border-white/30 rotate-2 shadow-sm z-50"></div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={handleDownload}
        className="mt-16 px-8 py-4 bg-slate-900 text-white rounded-full font-bold font-sans text-lg hover:bg-slate-800 transition-all shadow-2xl hover:shadow-slate-900/40 flex items-center gap-3 cursor-pointer pointer-events-auto"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        Guardar Recuerdo
      </motion.button>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onReset}
        className="mt-6 text-slate-600 underline font-sans text-sm cursor-pointer pointer-events-auto hover:text-slate-800"
      >
        Volver a empezar
      </motion.button>
    </motion.div>
  );
}
