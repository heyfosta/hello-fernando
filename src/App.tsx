// src/App.tsx
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { SectionWrapper } from './components/SectionWrapper';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(false);

  const handleHeroAnimationComplete = useCallback(() => {
    setIsHeroAnimationComplete(true);
    setCurrentSection(1);  // Move to the next section after hero animation
  }, []);

  const sections = useMemo(() => [
    { Component: Hero, props: { onAnimationComplete: handleHeroAnimationComplete } },
    { Component: About },
    { Component: Experience },
    { Component: Projects },
    { Component: Contact },
  ], [handleHeroAnimationComplete]);

  useEffect(() => {
    if (!isHeroAnimationComplete) return;


    let accumulatedDelta = 0;
    const scrollSensitivity = 0.1;  // Reduced sensitivity
    const threshold = 80;  // Increased threshold
    
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
    
      accumulatedDelta += event.deltaY * scrollSensitivity;
      accumulatedDelta = Math.max(-150, Math.min(150, accumulatedDelta));  // Increased range
    
      if (accumulatedDelta > threshold && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -threshold && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
        accumulatedDelta = 0;
      }
    
      setScrollProgress(accumulatedDelta / 1.5);  // Smoothed out progress
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentSection, sections.length, isHeroAnimationComplete]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="sections-stack relative h-full">
        {sections.map(({ Component, props }, index) => (
          <SectionWrapper 
            key={index} 
            index={index} 
            currentSection={currentSection}
            scrollProgress={scrollProgress}
          >
            <Component {...props} />
          </SectionWrapper>
        ))}
      </div>
    </div>
  );
};

export default App;