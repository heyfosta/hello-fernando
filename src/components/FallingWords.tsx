// src/components/FallingWords.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface FallingWordsProps {
  isActive: boolean;
  onAnimationComplete: () => void;
}

const FallingWords: React.FC<FallingWordsProps> = ({ isActive, onAnimationComplete }) => {
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && wordsRef.current) {
      const words = wordsRef.current.querySelectorAll('span');
      gsap.fromTo(words, 
        { y: '-100vh', opacity: 1, scale: 1 },
        { 
          y: '100vh', 
          opacity: 0, 
          scale: 0.5, 
          stagger: 0.05, 
          ease: 'power3.in', 
          duration: 5,
          onComplete: onAnimationComplete
        }
      );
    }
  }, [isActive, onAnimationComplete]);

  return (
    <div ref={wordsRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {["and", "create", "digital", "products", "made", "with", "a", "human", "touch."].map((word, index) => (
        <span 
          key={index} 
          className="absolute text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none"
          style={{ 
            left: `${(index % 5) * 20}%`,
            top: `${Math.floor(index / 5) * 50}%`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default FallingWords;