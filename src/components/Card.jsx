import { useState } from 'react';
import { motion } from 'framer-motion';
import HumanTypingText from './HumanTypingText';

export default function Card({ text }) {
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="bg-white/85 backdrop-blur-xl border border-white shadow-2xl shadow-slate-900/10 rounded-[2.5rem] p-8 md:p-14 max-w-2xl w-full flex flex-col justify-between min-h-[450px] relative z-20 mx-4 pointer-events-none"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-14 h-14 bg-rose-50 rounded-full border-4 border-white flex items-center justify-center shadow-md">
          <svg className="w-7 h-7 text-rose-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>

      <div className="text-2xl md:text-3xl text-slate-800 leading-relaxed text-center mt-8 font-medium min-h-[160px] flex items-center justify-center">
        <HumanTypingText text={text} onComplete={() => setIsTypingCompleted(true)} />
      </div>
      
      <div className="flex justify-center mt-10 h-14 items-center">
        {isTypingCompleted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-slate-400 font-caveat text-xl md:text-2xl animate-pulse text-center">
            <span className="hidden md:inline">⬅ Toca la izquierda para regresar | Toca la derecha para continuar ➔</span>
            <span className="md:hidden">⬅ Regresar | Continuar ➔</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
