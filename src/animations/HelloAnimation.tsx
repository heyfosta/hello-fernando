import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

interface HelloAnimationProps {
  onComplete: () => void;
  children: React.ReactNode;
}

const HelloAnimation: React.FC<HelloAnimationProps> = ({ onComplete, children }) => {
  const animationRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  const handleAnimationComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const helloPhrases = [
      'Hello', 'Hola', 'Olá', 'Bonjour', 'Ciao', '你好',
    ];

    const timeline = gsap.timeline();

    // Animation for all phrases except the last one
    helloPhrases.slice(0, -1).forEach((phrase, index) => {
      timeline.to(animationRef.current, {
        duration: index === 0 ? 1.5 : Math.max(1.5 * 0.5 ** index, 0.1),
        text: phrase,
        ease: 'power1.inOut',
      });
    });

    // Last phrase with immediate transition to split screen
    timeline
      .to(animationRef.current, {
        duration: 0.1, // Very short duration for the last word
        text: helloPhrases[helloPhrases.length - 1],
        ease: 'none',
      })
      .to(animationRef.current, {
        opacity: 0,
        duration: 0.3,
      }, '+=0') // Start immediately after the last word
      .to([topHalfRef.current, bottomHalfRef.current], {
        duration: 1.5,
        y: (index, target) => {
          const direction = target === topHalfRef.current ? -1 : 1;
          return `${direction * 100}%`;
        },
        ease: 'power2.inOut',
        onComplete: handleAnimationComplete,
      }, '-=0.3'); // Start slightly before the fade out completes

    return () => {
      timeline.kill();
    };
  }, [handleAnimationComplete]);

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none font-bebas overflow-hidden">
      {children}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div
          ref={animationRef}
          className="text-8xl sm:text-9xl md:text-11xl lg:text-13xl xl:text-15xl 2xl:text-17xl font-black leading-none text-white text-center"
          style={{ fontSize: 'min(20vw, 20vh)' }}
        ></div>
      </div>
      <div ref={topHalfRef} className="absolute top-0 left-0 w-full h-1/2 bg-black z-20"></div>
      <div ref={bottomHalfRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-20"></div>
    </div>
  );
};

export default HelloAnimation;