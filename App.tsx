
import React, { useState, useEffect } from 'react';
import { Character } from './components/Character';
import { StarField } from './components/StarField';
import { FallingFlowers } from './components/FallingFlowers';
import { FallingSnowflakes } from './components/FallingSnowflakes';

type Expression = 'normal' | 'shy' | 'happy' | 'thinking';
type Step = 'landing' | 'icebreaker' | 'question' | 'result';

const icebreakerLines = [
  "We haven’t really talked before.",
  "But I’ve noticed you a few times in the canteen.",
  "And you seem like a really nice person."
];

const App: React.FC = () => {
  // Core application state
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [lineIndex, setLineIndex] = useState(0);
  const [expression, setExpression] = useState<Expression>('normal');
  const [isVisible, setIsVisible] = useState(true);
  
  // Interaction state (Button Scaling)
  const [yesScale, setYesScale] = useState(1);
  const [nyoScale, setNyoScale] = useState(1);
  
  // Final choice state
  const [finalChoice, setFinalChoice] = useState<'yes' | 'nyo' | null>(null);

  /**
   * Resets the application to its initial state without a page reload.
   */
  const resetApp = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep('landing');
      setLineIndex(0);
      setExpression('normal');
      setYesScale(1);
      setNyoScale(1);
      setFinalChoice(null);
      setIsVisible(true);
    }, 400);
  };

  /**
   * Orchestrates transitions between screens with a fade effect.
   */
  const transitionTo = (newStep: Step, newExpression?: Expression, delay: number = 400) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep(newStep);
      if (newExpression) setExpression(newExpression);
      setIsVisible(true);
    }, delay);
  };

  const handleLandingNext = () => transitionTo('icebreaker', 'shy');

  const handleIcebreakerNext = () => {
    if (lineIndex < icebreakerLines.length - 1) {
      setIsVisible(false);
      setTimeout(() => {
        setLineIndex(prev => prev + 1);
        setIsVisible(true);
      }, 400);
    } else {
      transitionTo('question', 'shy');
    }
  };

  /**
   * Playful scaling logic for the NYO button.
   * YES grows (max 1.8), NYO shrinks (min 0.7).
   */
  const handleNyoClick = () => {
    setYesScale(prev => Math.min(prev + 0.15, 1.8));
    setNyoScale(prev => Math.max(prev - 0.1, 0.7));
    setExpression('thinking');
  };

  const handleYesClick = () => {
    setExpression('happy');
    setFinalChoice('yes');
    transitionTo('result');
  };

  // Rendering logic for different steps
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Background stays persistent during transitions */}
      <StarField count={currentStep === 'result' ? 200 : 120} intense={finalChoice === 'yes'} />
      
      {/* Dynamic atmospheric particles */}
      <FallingFlowers count={currentStep === 'result' ? 70 : 40} />
      <FallingSnowflakes count={currentStep === 'result' ? 120 : 60} />
      
      <div className={`z-10 transition-all duration-700 flex flex-col items-center ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
        
        {/* CHARACTER SECTION */}
        <div className="mb-12">
          <Character expression={expression} />
        </div>

        {/* STEP 1: LANDING */}
        {currentStep === 'landing' && (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight">WILL YOU ?</h1>
            <p className="text-slate-400 font-light text-lg mb-10">Hey… this might be a little random.</p>
            <button 
              onClick={handleLandingNext}
              className="px-12 py-3 rounded-full border border-slate-700 hover:border-sky-400/50 hover:bg-sky-500/5 transition-all duration-500 text-sm tracking-widest uppercase opacity-70 hover:opacity-100"
            >
              Okay 🌟
            </button>
          </div>
        )}

        {/* STEP 2: ICEBREAKER */}
        {currentStep === 'icebreaker' && (
          <div className="flex flex-col items-center max-w-lg">
            <div className="h-32 flex flex-col justify-center">
              <p className="text-2xl md:text-3xl font-serif-italic opacity-90 leading-relaxed italic">
                {icebreakerLines[lineIndex]}
              </p>
            </div>
            <button 
              onClick={handleIcebreakerNext}
              className="mt-8 px-10 py-2 rounded-full border border-slate-800 opacity-40 hover:opacity-100 transition-opacity text-xs uppercase tracking-widest"
            >
              {lineIndex === icebreakerLines.length - 1 ? "So..." : "Next"}
            </button>
          </div>
        )}

        {/* STEP 3: QUESTION */}
        {currentStep === 'question' && (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-4 tracking-tight leading-tight">
              Would you like to go out <br className="hidden md:block" /> with me sometime?
            </h2>
            <p className="text-slate-500 text-sm mb-12 font-light">A small question. No pressure.</p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={handleYesClick}
                style={{ transform: `scale(${yesScale})` }}
                className="group relative px-10 py-4 bg-sky-500/10 border border-sky-500/50 rounded-full text-sky-200 hover:bg-sky-500 hover:text-white transition-all duration-500 soft-glow min-w-[200px]"
              >
                Yeah, that sounds nice 😊
              </button>
              
              <button 
                onClick={handleNyoClick}
                style={{ transform: `scale(${nyoScale})` }}
                className="px-10 py-4 border border-slate-800 rounded-full text-slate-500 hover:text-slate-400 hover:bg-slate-900/50 transition-all duration-500 text-sm"
              >
                Nyo
              </button>
            </div>
            
            {nyoScale < 1 && (
              <p className="mt-8 text-xs text-slate-600 animate-in fade-in duration-1000">
                (It’s okay — totally your choice.)
              </p>
            )}
          </div>
        )}

        {/* STEP 4: RESULT */}
        {currentStep === 'result' && (
          <div className="flex flex-col items-center max-w-sm">
            <h1 className="text-3xl md:text-4xl font-serif mb-6">
              That honestly made me smile.
            </h1>
            <p className="text-slate-400 font-light leading-relaxed mb-12">
              I'm really glad you clicked that. I was definitely a bit nervous asking!
            </p>
            <button 
              onClick={resetApp} 
              className="px-8 py-2 rounded-full border border-slate-800 text-[10px] tracking-[0.3em] opacity-30 hover:opacity-100 transition-all uppercase"
            >
              Start Over
            </button>
          </div>
        )}

      </div>

      <footer className="absolute bottom-8 text-[9px] uppercase tracking-[0.3em] opacity-10 pointer-events-none">
        A soft hello wrapped in starlight.
      </footer>
    </div>
  );
};

export default App;
