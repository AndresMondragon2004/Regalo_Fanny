import { useState } from 'react';
import { motion } from 'framer-motion';
import HumanTypingText from './HumanTypingText';

export default function IntroMessageScreen({ onNext, onBack }) {
  const text = "Hola bonita, sé que no hemos hablado desde hace tiempo, pero no quiero dejar pasar esta oportunidad que tengo para felicitarte por todo.";
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);

  const handleScreenTap = (e) => {
    const screenWidth = window.innerWidth;
    const clickX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    
    if (clickX > screenWidth * 0.6 && isTypingCompleted) {
      onNext();
    } else if (clickX < screenWidth * 0.4) {
      onBack();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full h-full absolute inset-0 z-20 px-6 cursor-pointer"
      onClick={handleScreenTap}
    >
      <div className="max-w-4xl flex items-center justify-center text-center">
        <HumanTypingText 
          text={text} 
          onComplete={() => setIsTypingCompleted(true)} 
          className="text-3xl md:text-5xl font-sans text-slate-800 leading-relaxed font-medium drop-shadow-sm"
        />
      </div>
      
      <div className="absolute bottom-16 w-full flex justify-center">
        {isTypingCompleted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-rose-600 font-caveat text-xl md:text-3xl animate-pulse text-center"
          >
            <span className="hidden md:inline">⬅ Toca la izquierda para regresar | Toca la derecha para continuar ➔</span>
            <span className="md:hidden">⬅ Regresar | Continuar ➔</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
