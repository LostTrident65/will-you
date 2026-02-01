
import React from 'react';

interface FlowSectionProps {
  children: React.ReactNode;
  isActive: boolean;
}

/**
 * @deprecated Using step-based logic in App.tsx now. 
 * Kept for reference or future expansion.
 */
export const FlowSection: React.FC<FlowSectionProps> = ({ children, isActive }) => {
  return (
    <section className={`h-screen w-full flex items-center justify-center px-6 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
      {children}
    </section>
  );
};
