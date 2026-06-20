import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HumanTypingText from './HumanTypingText';
import StardustCanvas from './StardustCanvas';
import { heartBeatVibrate } from '../utils/vibrate';

const messages = [
  "Hola bonita, sé que no hemos hablado desde hace tiempo, pero no quiero dejar pasar esta oportunidad que tengo para felicitarte por todo.",
  "No hay día que no piense en ti.",
  "Me haces mucha falta.",
  "Te extraño.",
  "Extraño poder estar contigo aunque sea a la distancia...",
  "Extraño decirte bonita.",
  "Te quiero mucho preciosa.",
  "Sé que quizá cumplir 20 años te daba un poco de miedo y nerviosismo, pero quiero que sepas que tú sigues siendo tan linda como siempre, solo es un año más, un año en dónde puedes mejorar y convertirte en todo eso que un día me dijiste."
];

export default function EmotionalSequenceScreen({ onNext, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);

  const currentMessage = messages[currentIndex];
  const isLongMessage = currentMessage.length > 50;
  const isLastMessage = currentIndex === messages.length - 1;

  useEffect(() => {
    // Trigger heartbeat vibration on every new message
    heartBeatVibrate();
    
    setIsTypingCompleted(false);
    if (!isLongMessage) {
      const timer = setTimeout(() => setIsTypingCompleted(true), 2000); 
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isLongMessage]);

  const handleScreenTap = (e) => {
    const screenWidth = window.innerWidth;
    const clickX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    
    if (clickX > screenWidth * 0.5) {
       if (!isTypingCompleted) return;
       if (isLastMessage) {
         onNext();
       } else {
         setCurrentIndex(prev => prev + 1);
       }
    } else {
       if (currentIndex > 0) {
         setCurrentIndex(prev => prev - 1);
       } else {
         onBack();
       }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center justify-center w-full h-full absolute inset-0 z-20 px-6 cursor-pointer touch-none"
      onClick={handleScreenTap}
    >
      {/* Interactive magical stardust trail */}
      <StardustCanvas />

      <div className="max-w-4xl flex items-center justify-center text-center h-[60vh] w-full z-40 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full"
          >
            {isLongMessage ? (
              <HumanTypingText 
                text={currentMessage} 
                onComplete={() => setIsTypingCompleted(true)} 
                className="text-2xl md:text-4xl font-sans text-white/90 leading-relaxed font-medium drop-shadow-md"
              />
            ) : (
              <h2 className="text-4xl md:text-6xl font-caveat text-rose-200 leading-relaxed font-medium drop-shadow-[0_0_15px_rgba(255,228,230,0.3)] tracking-wide">
                {currentMessage}
              </h2>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="absolute bottom-12 md:bottom-16 w-full flex justify-center z-40 pointer-events-none">
        {isTypingCompleted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-white/30 font-caveat text-xl md:text-2xl animate-pulse text-center"
          >
            <span className="hidden md:inline">⬅ Toca la izquierda para regresar | Toca la derecha para continuar ➔</span>
            <span className="md:hidden">⬅ Regresar | Continuar ➔</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
