import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { successVibrate } from '../utils/vibrate';

export default function MagicCakeScreen({ text, onNext }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [micError, setMicError] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const reqFrameRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        if (!isMounted) return;
        
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        
        microphoneRef.current.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const checkVolume = () => {
          if (!isMounted || candlesBlown) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          
          let sum = 0;
          for(let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const average = sum / bufferLength;
          
          if (average > 90) {
            triggerBlowOut();
          } else {
            reqFrameRef.current = requestAnimationFrame(checkVolume);
          }
        };
        
        checkVolume();
      } catch (err) {
        console.error("Mic access denied or error:", err);
        setMicError(true);
      }
    };

    initMic();

    return () => {
      isMounted = false;
      if (reqFrameRef.current) cancelAnimationFrame(reqFrameRef.current);
      if (microphoneRef.current) microphoneRef.current.disconnect();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [candlesBlown]);

  const triggerBlowOut = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    successVibrate();
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: candlesBlown ? 0.9 : 0 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 bg-slate-950 pointer-events-none z-0"
      />

      {candlesBlown && (
        <Confetti 
          recycle={false} 
          numberOfPieces={1000} 
          gravity={0.15} 
          colors={['#f43f5e', '#eab308', '#3b82f6', '#10b981', '#a855f7', '#ffffff']}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }}
        />
      )}
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -30 }}
        className={`backdrop-blur-xl border shadow-2xl rounded-[2.5rem] p-8 md:p-14 max-w-2xl w-full relative z-20 mx-4 min-h-[500px] flex flex-col items-center justify-center text-center transition-all duration-1500 ${candlesBlown ? 'bg-transparent border-white/10 shadow-none' : 'bg-white/90 border-white shadow-rose-900/10'}`}
      >
        <p className={`text-2xl md:text-4xl leading-relaxed font-medium mb-10 font-caveat font-bold transition-colors duration-1500 ${candlesBlown ? 'text-white' : 'text-slate-800'}`}>
          {text}
        </p>

        <div className="relative w-64 h-64 mt-4 flex justify-center">
          <div className="absolute bottom-0 w-56 h-8 bg-slate-200 rounded-[50%] shadow-lg border border-slate-300 z-0" />
          <div className="absolute bottom-1 w-60 h-8 bg-white rounded-[50%] shadow-sm z-0" />

          <div className="absolute bottom-4 w-48 h-20 bg-pink-300 rounded-xl shadow-inner z-10 border border-pink-400">
             <div className="absolute top-0 w-full h-6 bg-pink-100/80 rounded-t-xl" />
             <div className="absolute top-5 left-4 w-6 h-8 bg-pink-100/80 rounded-b-full" />
             <div className="absolute top-5 left-16 w-5 h-6 bg-pink-100/80 rounded-b-full" />
             <div className="absolute top-5 right-12 w-7 h-10 bg-pink-100/80 rounded-b-full" />
             <div className="absolute top-5 right-4 w-5 h-7 bg-pink-100/80 rounded-b-full" />
          </div>

          <div className="absolute bottom-20 w-36 h-16 bg-pink-400 rounded-xl shadow-lg z-20 border border-pink-500">
             <div className="absolute top-0 w-full h-5 bg-pink-50 rounded-t-xl" />
             <div className="absolute top-4 left-3 w-5 h-7 bg-pink-50 rounded-b-full" />
             <div className="absolute top-4 left-14 w-4 h-5 bg-pink-50 rounded-b-full" />
             <div className="absolute top-4 right-6 w-6 h-8 bg-pink-50 rounded-b-full" />
          </div>

          <div className="absolute bottom-36 w-4 h-14 bg-gradient-to-b from-white to-rose-100 border border-rose-200 z-30 shadow-sm rounded-sm overflow-hidden">
             <div className="absolute top-2 left-0 w-full h-2 bg-rose-400 transform -skew-y-12" />
             <div className="absolute top-6 left-0 w-full h-2 bg-rose-400 transform -skew-y-12" />
             <div className="absolute top-10 left-0 w-full h-2 bg-rose-400 transform -skew-y-12" />
          </div>

          {!candlesBlown && (
            <motion.div 
              animate={{ scale: [1, 1.15, 0.85, 1.05], rotate: [-3, 3, -2, 2] }} 
              transition={{ repeat: Infinity, duration: 0.25 }}
              className="absolute bottom-[200px] left-1/2 -translate-x-1/2 w-6 h-12 bg-gradient-to-t from-amber-500 via-yellow-300 to-yellow-100 rounded-[50%_50%_20%_20%] shadow-[0_0_40px_#fbbf24] z-40 origin-bottom"
              style={{ filter: 'blur(0.5px)' }}
            />
          )}

          {candlesBlown && (
             <motion.div 
               initial={{ opacity: 0, y: 0, scale: 0.5 }}
               animate={{ opacity: [0, 0.8, 0], y: -120, scale: [0.5, 2.5, 4], rotate: [-10, 15, -10] }}
               transition={{ duration: 2.5, ease: "easeOut" }}
               className="absolute bottom-48 left-1/2 -translate-x-1/2 w-4 h-12 bg-slate-300 rounded-full filter blur-md z-40"
             />
          )}

          {!candlesBlown && (
             <button 
               className="absolute bottom-36 left-1/2 -translate-x-1/2 w-24 h-32 opacity-0 z-50 cursor-pointer" 
               onClick={triggerBlowOut}
             />
          )}
        </div>

        {!candlesBlown ? (
          <p className="mt-8 text-rose-500 font-caveat text-3xl md:text-4xl animate-pulse">
            {micError ? "Toca la velita para apagarla ✨" : "Acércate y sopla fuerte la velita..."}
          </p>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-8 flex flex-col items-center z-50"
          >
            <p className="text-yellow-300 font-caveat text-5xl md:text-7xl font-bold mb-8 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]">¡Feliz Cumpleaños!</p>
            <button 
              onClick={onNext}
              className="px-10 py-3 bg-white/10 text-white rounded-full border border-white/30 font-bold font-sans text-lg hover:bg-white/25 transition-all shadow-xl backdrop-blur-md cursor-pointer pointer-events-auto"
            >
              Obtener mi regalo digital 🎁
            </button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
