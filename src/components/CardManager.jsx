import { AnimatePresence } from 'framer-motion';
import Card from './Card';
import ScratchCardScreen from './ScratchCardScreen';
import MagicCakeScreen from './MagicCakeScreen';
import PolaroidScreen from './PolaroidScreen';
import { useState } from 'react';

const cardsData = [
  'Hoy es tu cumpleaños, pero además de eso, es un día en el que no dejo de pensar en ti.',
  'Espero que hoy esté siendo un día hermoso, lleno de colores bonitos, de tu comida favorita y de las personas que te quieren.',
  'Te deseo lo mejor hoy y siempre. ¡Feliz cumpleaños!'
];

export default function CardManager({ currentStep, onNext, onBack, onReset }) {
  const cardIndex = currentStep - 3;
  const [canGoNext, setCanGoNext] = useState(false);

  // If beyond Polaroid, reset to null
  if (cardIndex < 0 || cardIndex > 3) {
    return null;
  }

  const handleScreenTap = (e) => {
    // Polaroid and Magic Cake have their own interactive buttons, don't hijack them
    if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'canvas') {
      return;
    }
    
    // Don't use tap navigation on Polaroid
    if (cardIndex === 3) return;

    const screenWidth = window.innerWidth;
    const clickX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    
    if (clickX > screenWidth * 0.6) {
      if (cardIndex === 0) onNext();
      if (cardIndex === 1 && canGoNext) onNext();
      // Magic cake requires explicit button click to proceed to polaroid
    } else if (clickX < screenWidth * 0.4) {
      if (cardIndex === 1) setCanGoNext(false);
      onBack();
    }
  };

  return (
    <div 
      className="w-full h-full absolute inset-0 flex items-center justify-center z-10" 
      onClick={handleScreenTap}
    >
      <AnimatePresence mode="wait">
        {cardIndex === 0 && (
          <Card key="card1" text={cardsData[0]} />
        )}
        {cardIndex === 1 && (
          <ScratchCardScreen 
            key="card2" 
            text={cardsData[1]} 
            onEnableNext={() => setCanGoNext(true)}
          />
        )}
        {cardIndex === 2 && (
          <MagicCakeScreen 
            key="card3" 
            text={cardsData[2]} 
            onNext={onNext} // Proceed to Polaroid
          />
        )}
        {cardIndex === 3 && (
          <PolaroidScreen 
            key="card4" 
            onReset={onReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
