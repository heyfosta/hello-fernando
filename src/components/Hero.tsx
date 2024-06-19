import React, { useEffect, useRef } from 'react';
import { heroAnimation } from '../animations/HeroAnimation';

interface HeroProps {
  isAnimationComplete: boolean;
}

const Hero: React.FC<HeroProps> = ({ isAnimationComplete }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAnimationComplete) {
      heroAnimation(heroRef.current);
    }
  }, [isAnimationComplete]);

  return (
    <div
      ref={heroRef}
      className="hero-container min-h-screen bg-[#eebe4e] text-black flex flex-col justify-center items-start py-16 px-8 sm:px-16"
    >
      <div className="container mx-auto 2xl:max-w-[2000px]">
        <div className="mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-11xl font-bold whitespace-nowrap">
            Hi, my name is
          </h1>
        </div>
        <div className="mb-12">
          <h2 className="text-7xl sm:text-8xl md:text-9xl lg:text-10xl xl:text-11xl 2xl:text-12xl font-bold whitespace-nowrap">
            Fernando Costa.
          </h2>
        </div>
        <div className="slide-left mb-16">
          <h3
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl font-bold whitespace-nowrap"
            style={{ opacity: 0, transform: 'translateX(-200%)' }}
          >
            I build things for the web.
          </h3>
        </div>
        <div className="fadeup" style={{ transitionDelay: '400ms' }}>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl max-w-7xl whitespace-nowrap">
            and create digital products lovingly made with a human touch.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;