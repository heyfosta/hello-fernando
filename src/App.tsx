// src/App.tsx
import React, { useState, useMemo, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { SectionWrapper } from './components/SectionWrapper';




const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = useMemo(() => [
    { Component: Hero },
    { Component: About },
    { Component: Experience },
    { Component: Projects },
    { Component: Contact },
  ], []);

  useEffect(() => {
    let accumulatedDelta = 0;
    const scrollSensitivity = 0.15; // Adjust this value to change scroll sensitivity

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();

      accumulatedDelta += event.deltaY * scrollSensitivity;

      if (accumulatedDelta > 100 && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -100 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
        accumulatedDelta = 0;
      }

      setScrollProgress(accumulatedDelta);
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentSection, sections.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="sections-stack relative h-full">
        {sections.map(({ Component }, index) => (
          <SectionWrapper 
            key={index} 
            index={index} 
            currentSection={currentSection}
            scrollProgress={scrollProgress}
          >
            <Component />
          </SectionWrapper>
        ))}
      </div>
    </div>
  );
};

export default App;