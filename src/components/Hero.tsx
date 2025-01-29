// src/components/Hero.tsx
import React from 'react';
import { useHeroAnimation } from '../animations/HeroAnimation';
import '../styles/sections.css';


export interface HeroProps {
  isHelloAnimationComplete: boolean;
  onAnimationComplete: () => void;
  initialColor: string;
  finalColor: string;
}

const Hero: React.FC<HeroProps> = ({ 
  isHelloAnimationComplete, 
  onAnimationComplete, 
  initialColor, 
  finalColor 
}) => {
  const { heroRef, scrollRef, backgroundColor } = useHeroAnimation({
    isHelloAnimationComplete,
    onAnimationComplete,
    initialColor,
    finalColor
  });

  return (
    <div 
      ref={heroRef} 
      className="hero-section text-black"
      style={{ backgroundColor }}
    >
      <div className="section-content">
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-none mb-2">
            my name is
          </h1>
          <h2 
            className="text-8xl sm:text-9xl md:text-11xl lg:text-13xl xl:text-15xl 2xl:text-17xl font-black leading-none mb-0" 
            style={{ fontSize: 'min(20vw, 20vh)' }}
          >
            Fernando Costa.
          </h2>
          <div className="slide-left mb-2">
            <h3 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-black leading-none" 
              style={{ transform: 'translateX(-100%)' }}
            >
              I build things for the web.
            </h3>
          </div>
          <div ref={scrollRef} className="scroll-section w-full">
            {["and", "create", "digital", "products", "made", "with", "a", "human", "touch."].map((word, index) => (
              <span 
                key={index} 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none mr-4 inline-block opacity-0"
                style={{ 
                  filter: 'blur(20px)', 
                  transform: 'translateX(100%)'
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
