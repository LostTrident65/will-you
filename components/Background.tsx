
import React from 'react';

interface BackgroundProps {
  isDarkMode: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ isDarkMode }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Gradients */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-1000 ${isDarkMode ? 'bg-purple-900/10' : 'bg-rose-100/40'}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-1000 ${isDarkMode ? 'bg-blue-900/10' : 'bg-sky-100/30'}`} />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full transition-opacity duration-1000 ${isDarkMode ? 'bg-white/10' : 'bg-rose-300/20'}`}
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `-${Math.random() * 20}s`
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
