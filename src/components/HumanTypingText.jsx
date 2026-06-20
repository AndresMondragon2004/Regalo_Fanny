import { motion } from 'framer-motion';
import { useMemo, useEffect } from 'react';

export default function HumanTypingText({ text, onComplete, className }) {
  const characters = useMemo(() => {
    let delay = 0;
    return text.split('').map((char, index) => {
      const baseSpeed = 0.04; // 40ms per char
      delay += baseSpeed + Math.random() * 0.03; // add randomness
      
      // Pause slightly on punctuation
      if (char === ',' || char === ';') delay += 0.2;
      if (char === '.' || char === '!' || char === '?') delay += 0.5;
      
      return { char, delay, id: index };
    });
  }, [text]);

  useEffect(() => {
    if (!characters.length) return;
    const totalTime = characters[characters.length - 1].delay * 1000 + 500;
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, totalTime);
    return () => clearTimeout(timer);
  }, [characters, onComplete]);

  return (
    <span className={className}>
      {characters.map(({ char, delay, id }) => (
        <motion.span
          key={id}
          initial={{ opacity: 0, filter: 'blur(2px)', y: 2 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.15, delay }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
