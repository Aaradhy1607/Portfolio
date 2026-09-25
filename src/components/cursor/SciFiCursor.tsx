import { useEffect, useState } from 'react';

export const SciFiCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('interactive-cursor'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 250);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Central Targeting Reticle */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        {/* Core Dot */}
        <div
          className={`w-2 h-2 rounded-full ${
            isHovered ? 'bg-cyber-cyan shadow-cyan-glow scale-150' : 'bg-cyber-neon'
          }`}
        />

        {/* Outer Rotating Crosshair Ring */}
        <div
          className={`absolute -inset-3 border border-cyber-cyan/60 rounded-full transition-all duration-200 ${
            isHovered
              ? 'scale-150 border-cyber-cyan animate-spin-slow shadow-cyan-glow'
              : 'scale-100 opacity-60'
          }`}
        />

        {/* Tactical Crosshair Tick Marks */}
        {isHovered && (
          <>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyber-cyan" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-cyber-cyan" />
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-1.5 h-0.5 bg-cyber-cyan" />
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-1.5 h-0.5 bg-cyber-cyan" />
          </>
        )}

        {/* Click Energy Blast Ripple */}
        {isClicked && (
          <div className="absolute -inset-6 border-2 border-cyber-cyan rounded-full animate-ping opacity-80" />
        )}
      </div>
    </div>
  );
};
