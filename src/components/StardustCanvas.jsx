import { useEffect, useRef } from 'react';

export default function StardustCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2.5 + 0.5; // Random size
        this.speedX = Math.random() * 2 - 1;   // Drift left/right
        this.speedY = Math.random() * -2 - 0.5;// Float upwards
        this.life = 1; // Alpha value 1 to 0
        // Soft magical hues (pink, violet, white)
        const hue = Math.random() * 60 + 280; 
        this.color = `hsla(${hue}, 100%, 80%, `; 
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.015; // fade out slowly
      }
      draw() {
        ctx.fillStyle = this.color + this.life + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color + this.life + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handlePointerMove = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      if (x && y) {
        // Create multiple particles per movement tick
        for(let i=0; i < 4; i++) {
           particles.push(new Particle(x, y));
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      // Remove dead particles to free memory
      particles = particles.filter(p => p.life > 0);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />;
}
