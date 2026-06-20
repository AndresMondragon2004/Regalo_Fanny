import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import EnvelopeScreen from './components/EnvelopeScreen';
import EmotionalSequenceScreen from './components/EmotionalSequenceScreen';
import CardManager from './components/CardManager';
import Decorations from './components/Decorations';

// A carefully curated emotional color journey
const bgGradients = [
  'from-rose-200 via-pink-100 to-rose-300',      // 0: Welcome
  'from-orange-100 via-rose-100 to-rose-200',    // 1: Envelope Swipe
  'from-slate-950 via-indigo-950 to-slate-900',  // 2: Emotional Sequence
  'from-sky-200 via-blue-100 to-sky-300',        // 3: Card 1
  'from-emerald-200 via-teal-100 to-emerald-300',// 4: Card 2
  'from-amber-200 via-orange-100 to-amber-300',  // 5: Cake
  'from-rose-200 via-fuchsia-100 to-pink-200',   // 6: Polaroid Final Screen
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const currentBg = bgGradients[currentStep] || bgGradients[0];

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev > 0 ? prev - 1 : 0);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${currentBg} transition-colors duration-1500 flex items-center justify-center font-sans overflow-hidden touch-none`}>
      <Decorations step={currentStep} />
      
      <div className="z-10 w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div key="welcome" exit={{ opacity: 0, y: -30 }} className="w-full flex justify-center pointer-events-auto">
              <WelcomeScreen onNext={handleNext} />
            </motion.div>
          )}
          {currentStep === 1 && (
            <motion.div key="envelope" exit={{ opacity: 0, y: -30 }} className="w-full h-full flex justify-center pointer-events-auto">
              <EnvelopeScreen onOpen={handleNext} />
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div key="emotional" exit={{ opacity: 0, scale: 1.1 }} className="w-full h-full flex justify-center pointer-events-auto">
              <EmotionalSequenceScreen onNext={handleNext} onBack={handleBack} />
            </motion.div>
          )}
          {currentStep >= 3 && (
            <motion.div key="cards" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 1 }} className="w-full h-full flex justify-center pointer-events-auto">
              <CardManager 
                currentStep={currentStep} 
                onNext={handleNext} 
                onBack={handleBack}
                onReset={() => setCurrentStep(0)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
