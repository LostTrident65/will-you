import React, { useMemo } from 'react';

interface StarFieldProps {
  count?: number;
  intense?: boolean;
}

/**
 * Enhanced StarField with multiple layers of atmospheric effects.
 * Includes: 
 * 1. Twinkling stars (various sizes and expanded pastel colors)
 * 2. Brightly shining "hero" stars with radiant glows
 * 3. Nebula-like soft gradients with refined drift speeds
 * 4. Drifting stardust particles
 */
export const StarField: React.FC<StarFieldProps> = ({ count = 60, intense = false }) => {
  const stars = useMemo(() => {
    const colors = [
      '#ffffff', // Pure White
      '#bae6fd', // Pale Blue
      '#e0f2fe', // Softest Blue
      '#d1edff', // Powder Blue
      '#fbcfe8', // Muted Pink
      '#fdf2f8', // Delicate Pink
      '#fce7f3', // Rose Pink
      '#ddd6fe', // Lavender
      '#f5f3ff', // Softest Lavender
      '#e9d5ff', // Muted Lavender
      '#cffafe'  // Pale Cyan tint
    ];

    return Array.from({ length: 350 }).map((_, i) => {
      const isBright = Math.random() > 0.92; // Approx 8% of stars shine brightly
      return {
        id: i,
        size: isBright ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 0.5,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: isBright ? Math.random() * 3 + 2 : Math.random() * 4 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: isBright ? Math.random() * 0.4 + 0.6 : Math.random() * 0.5 + 0.2,
        isBright
      };
    });
  }, []);

  const stardust = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: `sd-${i}`,
      size: Math.random() * 2.5 + 0.5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 30,
      duration: Math.random() * 25 + 35,
    }));
  }, []);

  const visibleStars = stars.slice(0, count + (intense ? 80 : 0));

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      
      {/* 🔮 REFINED NEBULA LAYERS: Varied timings and softer opacities */}
      <div 
        className={`nebula top-[-15%] left-[-15%] w-[90%] h-[90%] bg-blue-950/20 transition-opacity duration-[4000ms] ${intense ? 'opacity-70' : 'opacity-30'}`} 
        style={{ animationDuration: '35s' }} 
      />
      
      <div 
        className={`nebula bottom-[-20%] right-[10%] w-[70%] h-[70%] bg-purple-900/10 transition-opacity duration-[4000ms] ${intense ? 'opacity-50' : 'opacity-20'}`} 
        style={{ animationDelay: '-8s', animationDuration: '42s' }} 
      />
      
      <div 
        className={`nebula top-[30%] right-[-15%] w-[60%] h-[60%] bg-indigo-900/5 transition-opacity duration-[4000ms] ${intense ? 'opacity-40' : 'opacity-10'}`} 
        style={{ animationDelay: '-15s', animationDuration: '50s' }} 
      />

      {intense && (
        <div 
          className="nebula top-[10%] left-[20%] w-[55%] h-[55%] bg-rose-500/15 opacity-50" 
          style={{ animationDelay: '-12s', animationDuration: '38s' }} 
        />
      )}

      {/* ✨ STARDUST LAYER */}
      {stardust.map((sd) => (
        <div
          key={sd.id}
          className="stardust"
          style={{
            width: `${sd.size}px`,
            height: `${sd.size}px`,
            top: `${sd.top}%`,
            left: `${sd.left}%`,
            animationDelay: `${sd.delay}s`,
            animationDuration: `${sd.duration}s`,
            background: 'white',
          } as React.CSSProperties}
        />
      ))}

      {/* ⭐ TWINKLING STARS LAYER */}
      {visibleStars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: `${star.size + (intense ? 0.5 : 0)}px`,
            height: `${star.size + (intense ? 0.5 : 0)}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            '--delay': `${star.delay}s`,
            '--duration': `${star.duration}s`,
            background: star.color,
            opacity: star.opacity,
            boxShadow: star.isBright 
              ? `0 0 12px 2px ${star.color}cc` 
              : (intense ? `0 0 6px ${star.color}44` : 'none'),
            zIndex: star.isBright ? 5 : 1,
          } as any}
        />
      ))}
    </div>
  );
};