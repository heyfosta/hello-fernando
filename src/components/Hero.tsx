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
      style={{ 
        backgroundColor,
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div 
        className="section-content"
        style={{
          maxWidth: '90rem',
          width: '100%',
          margin: '0 auto',
          padding: '0 1rem'
        }}
      >
        <div className="w-full">
          <h1 
            className="font-black leading-none"
            style={{ 
              fontSize: 'clamp(1.5rem, 3vw, 3rem)',
              marginBottom: '0.5rem'
            }}
          >
            my name is
          </h1>
          <h2 
            className="font-black leading-none"
            style={{ 
              fontSize: 'clamp(3rem, 15vw, 12rem)',
              lineHeight: '0.9',
              marginBottom: '1rem'
            }}
          >
            Fernando Costa.
          </h2>
          <div className="slide-left">
            <h3 
              className="font-black leading-none"
              style={{ 
                fontSize: 'clamp(2rem, 8vw, 6rem)',
                lineHeight: '1',
                marginBottom: '1.5rem',
                transform: 'translateX(-100%)'
              }}
            >
              I build things for the web.
            </h3>
          </div>
          <div 
            ref={scrollRef} 
            className="w-full"
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 4rem)',
              lineHeight: '1.2'
            }}
          >
        {["Creating", "digital", "products", "made", "with", "a", "human", "touch."].map((word, index) => {
          // Generate random size class
          const sizeClass = `size-${Math.floor(Math.random() * 3) + 1}`;
          
          return (
            <span 
              key={index} 
              className={`font-black leading-none inline-block opacity-0 ${sizeClass}`}
              style={{ 
                marginRight: '0.5rem',
                filter: 'blur(20px)',
                transform: 'translateX(100%)'
              }}
            >
              {word}
            </span>
          );
        })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;