
import React from 'react';

type Expression = 'normal' | 'shy' | 'happy' | 'thinking';

interface CharacterProps {
  expression: Expression;
}

export const Character: React.FC<CharacterProps> = ({ expression }) => {
  const getEyes = () => {
    switch (expression) {
      case 'shy':
        return (
          <>
            <circle cx="16" cy="20" r="1.5" fill="#f8fafc" />
            <circle cx="24" cy="20" r="1.5" fill="#f8fafc" />
            <path d="M14 18.5 Q16 17 18 18.5" stroke="#f8fafc" strokeWidth="0.5" fill="none" opacity="0.6" />
            <path d="M22 18.5 Q24 17 26 18.5" stroke="#f8fafc" strokeWidth="0.5" fill="none" opacity="0.6" />
          </>
        );
      case 'happy':
        return (
          <>
            <path d="M14 21 Q16 18 18 21" stroke="#f8fafc" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M22 21 Q24 18 26 21" stroke="#f8fafc" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </>
        );
      case 'thinking':
        return (
          <>
            <circle cx="16" cy="20" r="1.8" fill="#f8fafc" />
            <path d="M23 20.5 H27" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            <circle cx="16" cy="20" r="2.2" fill="#f8fafc" />
            <circle cx="24" cy="20" r="2.2" fill="#f8fafc" />
          </>
        );
    }
  };

  const getMouth = () => {
    switch (expression) {
      case 'shy':
        return <path d="M18 26 Q20 25.5 22 26" stroke="#f8fafc" strokeWidth="1" fill="none" strokeLinecap="round" />;
      case 'happy':
        return <path d="M17 26 Q20 29 23 26" stroke="#f8fafc" strokeWidth="1.5" fill="none" strokeLinecap="round" />;
      case 'thinking':
        return <circle cx="20" cy="27" r="0.8" fill="#f8fafc" />;
      default:
        return <path d="M18.5 26.5 H21.5" stroke="#f8fafc" strokeWidth="1" strokeLinecap="round" />;
    }
  };

  return (
    <div className="float-anim inline-block filter drop-shadow-[0_0_20px_rgba(56,189,248,0.2)]">
      <svg width="120" height="120" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        {/* Star Body with a softer slate color */}
        <path
          d="M20 3 L24.5 14.5 L37 16.5 L28 25.5 L30.5 38 L20 32 L9.5 38 L12 25.5 L3 16.5 L15.5 14.5 Z"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        
        {/* Very subtle pink glow for cheeks */}
        {(expression === 'shy' || expression === 'happy') && (
          <>
            <circle cx="13" cy="24" r="2.5" fill="#fb7185" fillOpacity="0.15" />
            <circle cx="27" cy="24" r="2.5" fill="#fb7185" fillOpacity="0.15" />
          </>
        )}
        
        {/* Face Elements */}
        <g className="transition-all duration-500">
          {getEyes()}
          {getMouth()}
        </g>
      </svg>
    </div>
  );
};
