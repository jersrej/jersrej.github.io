import { useEffect, useState } from 'react';

export const KonamiEasterEgg = () => {
  const [activated, setActivated] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a'
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setActivated(true);
          konamiIndex = 0;

          // Create confetti particles
          const newParticles = Array.from({ length: 100 }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }));
          setParticles(newParticles);

          // Hide after animation
          setTimeout(() => {
            setActivated(false);
            setParticles([]);
          }, 5000);
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!activated) return null;

  return (
    <>
      {/* Overlay message */}
      <div className="fixed inset-0 z-99999 pointer-events-none flex items-center justify-center">
        <div className="bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-12 py-8 rounded-3xl shadow-2xl animate-bounce text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-4xl font-bold mb-2">Konami Code Activated!</h2>
          <p className="text-lg opacity-90">You found the secret! 🎉</p>
          <p className="text-sm mt-2 opacity-75">Senior Frontend Engineer level unlocked!</p>
        </div>
      </div>

      {/* Confetti particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed w-3 h-3 rounded-full pointer-events-none z-99998 animate-fall"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            background: `hsl(${Math.random() * 360}, 100%, 50%)`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Background flash */}
      <div className="fixed inset-0 z-99997 pointer-events-none bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
    </>
  );
};
