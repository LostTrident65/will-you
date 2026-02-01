
import React, { useMemo } from 'react';

interface SnowflakeProps {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  swayDuration: number;
  sparkleDuration: number;
  opacity: number;
}

const Snowflake: React.FC<SnowflakeProps> = ({ 
  size, left, delay, duration, swayDuration, sparkleDuration, opacity 
}) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-5%',
        width: `${size}px`,
        height: `${size}px`,
        animation: `fall-snow ${duration}s linear infinite, sway-snow ${swayDuration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
    >
      <div 
        className="w-full h-full rounded-full bg-white" 
        style={{ 
          opacity,
          boxShadow: '0 0 6px rgba(255, 255, 255, 0.9)',
          animation: `sparkle ${sparkleDuration}s ease-in-out infinite`,
          animationDelay: `${delay * 0.5}s`
        }} 
      />
    </div>
  );
};

export const FallingSnowflakes: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const snowflakeData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5,
      left: Math.random() * 100,
      delay: Math.random() * -20,
      duration: Math.random() * 6 + 12,
      swayDuration: Math.random() * 2 + 2,
      sparkleDuration: Math.random() * 1.5 + 1,
      opacity: Math.random() * 0.5 + 0.4,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {snowflakeData.map((snow) => (
        <Snowflake key={snow.id} {...snow} />
      ))}
      <style>{`
        @keyframes fall-snow {
          0% { transform: translateY(0vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(105vh); opacity: 0; }
        }
        @keyframes sway-snow {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(30px); }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(1); filter: brightness(1); opacity: 0.8; }
          50% { transform: scale(1.3); filter: brightness(1.8); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
