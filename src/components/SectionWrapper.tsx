import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface SectionWrapperProps {
  children: React.ReactNode;
  index: number;
  isEnabled: boolean;
  shouldAnimate: boolean;
  onComplete: () => void;
}
export const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
    children, 
    index, 
    isEnabled, 
    shouldAnimate,
    onComplete 
  }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (shouldAnimate && sectionRef.current) {
        gsap.to(sectionRef.current, {
          y: '-100%',
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            onComplete();
          }
        });
      }
    }, [shouldAnimate, onComplete]);
  
    return (
      <div
        ref={sectionRef}
        className={`section absolute top-0 left-0 w-full h-full ${isEnabled ? 'visible' : 'invisible'}`}
        style={{ 
          zIndex: 100 - index,
          transform: `translateY(${index === 0 ? '0' : '0'})`
        }}
      >
        {children}
      </div>
    );
  };