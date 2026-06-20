import { motion, useAnimation } from 'framer-motion';

export default function EnvelopeScreen({ onOpen }) {
  const controls = useAnimation();

  const handleDragEnd = (event, info) => {
    // If the user swiped up significantly
    if (info.offset.y < -80) {
      controls.start({ y: -800, opacity: 0, transition: { duration: 0.7, ease: "easeIn" } }).then(onOpen);
    } else {
      // Bounce back if they didn't swipe enough
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[80vh] z-20 relative px-4">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-0 md:top-10 text-center pointer-events-none"
      >
        <p className="text-rose-600 font-caveat text-4xl md:text-5xl mb-2 drop-shadow-sm">Desliza el sobre</p>
        <p className="text-rose-500 font-caveat text-3xl md:text-4xl">hacia arriba</p>
        <svg className="w-10 h-10 mx-auto mt-4 text-rose-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.div>

      <motion.div
        drag="y"
        dragConstraints={{ top: -200, bottom: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="cursor-pointer relative z-10 w-72 h-52 md:w-96 md:h-64 drop-shadow-2xl mt-32"
        whileTap={{ scale: 0.95 }}
      >
        {/* Envelope Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl border-2 border-rose-200 overflow-hidden shadow-inner">
           {/* Flap SVG */}
           <svg className="absolute top-0 w-full drop-shadow-md" viewBox="0 0 100 50" preserveAspectRatio="none">
             <path d="M0 0 L50 45 L100 0 Z" fill="#ffe4e6" stroke="#fecdd3" strokeWidth="1" />
           </svg>
           {/* Heart seal */}
           <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-rose-500 rounded-full flex items-center justify-center shadow-lg border-2 border-rose-400">
             <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
