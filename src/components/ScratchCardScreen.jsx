import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { softVibrate } from '../utils/vibrate';

export default function ScratchCardScreen({ text, onEnableNext }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const lastVibeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.fillStyle = '#cbd5e1'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#94a3b8'; 
    ctx.font = '24px Quicksand';
    ctx.textAlign = 'center';
    ctx.fillText('Rasca aquí ✨', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    const getCoordinates = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      return { x, y };
    };

    const scratch = (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      const { x, y } = getCoordinates(e);
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();

      // Soft vibration on scratching
      const now = Date.now();
      if (now - lastVibeRef.current > 60) { // Throttle to every 60ms
         softVibrate();
         lastVibeRef.current = now;
      }

      checkIfRevealed();
    };

    const checkIfRevealed = () => {
      if (isRevealed) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let clearPixels = 0;
      const totalPixels = data.length / 4;
      
      for (let i = 3; i < data.length; i += 64) {
        if (data[i] === 0) clearPixels++;
      }
      
      const clearPercentage = clearPixels / (totalPixels / 16);
      if (clearPercentage > 0.40) { 
        setIsRevealed(true);
        onEnableNext(); 
        canvas.style.transition = 'opacity 0.6s ease-out';
        canvas.style.opacity = '0';
        setTimeout(() => { canvas.style.display = 'none'; }, 600);
      }
    };

    const startDrawing = (e) => { isDrawing = true; scratch(e); };
    const stopDrawing = () => { isDrawing = false; };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', scratch);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isRevealed, onEnableNext]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-[2.5rem] p-8 md:p-14 max-w-2xl w-full relative z-20 mx-4 min-h-[400px] flex items-center justify-center overflow-hidden touch-none"
    >
      <div className="absolute inset-0 z-0 p-8 md:p-14 flex items-center justify-center pointer-events-none">
        <p className="text-2xl md:text-4xl text-rose-600 leading-relaxed text-center font-caveat font-bold drop-shadow-sm">
          {text}
        </p>
      </div>
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-10 cursor-crosshair rounded-[2.5rem]"
      />

      {isRevealed && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="absolute bottom-6 z-10 text-slate-400 font-caveat text-xl animate-pulse text-center w-full pointer-events-none"
        >
            <span className="hidden md:inline">⬅ Toca la izquierda para regresar | Toca la derecha para continuar ➔</span>
            <span className="md:hidden">⬅ Regresar | Continuar ➔</span>
        </motion.div>
      )}
    </motion.div>
  );
}
