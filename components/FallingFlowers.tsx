
import React, { useMemo } from 'react';

interface FlowerProps {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  swayDuration: number;
  swayAmount: number;
  color: string;
  opacity: number;
}

const Flower: React.FC<FlowerProps> = ({ 
  size, left, delay, duration, swayDuration, swayAmount, color, opacity 
}) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-10%',
        width: `${size}px`,
        height: `${size}px`,
        animation: `fall ${duration}s linear infinite, sway ${swayDuration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill={color}
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* A simple cute 5-petal flower shape */}
        <path d="M12 8c-1-2-4-2-5 0s0 4 2 5c-2 1-2 4 0 5s4 0 5-2c1 2 4 2 5 0s0-4-2-5c2-1 2-4 0-5s-4 0-5 2z" />
        <circle cx="12" cy="12" r="1.5" fill="white" fillOpacity="0.5" />
      </svg>
    </div>
  );
};

export const FallingFlowers: React.FC<{ count?: number }> = ({ count = 15 }) => {
  const flowerData = useMemo(() => {
    const colors = [
      '#fbcfe8', // Muted Pink
      '#ddd6fe', // Lavender
      '#bae6fd', // Pale Blue
      '#fce7f3', // Soft Rose
    ];

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 10,
      left: Math.random() * 100,
      delay: Math.random() * -20, // Negative delay so some start mid-screen
      duration: Math.random() * 10 + 15, // Slow fall
      swayDuration: Math.random() * 2 + 3,
      swayAmount: Math.random() * 50 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.3 + 0.2,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {flowerData.map((flower) => (
        <Flower key={flower.id} {...flower} />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes sway {
          0%, 100% { margin-left: 0px; }
          50% { margin-left: 40px; }
        }
      `}</style>
    </div>
  );
};
