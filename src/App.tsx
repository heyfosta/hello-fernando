// src/App.tsx
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { SectionWrapper } from './components/SectionWrapper';
import { useColorTransition } from './hooks/useColorTransition';
import { useSnapScroll } from './hooks/useSnapScroll';

const App: React.FC = () => {
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(false);

  const handleHeroAnimationComplete = useCallback(() => {
    setIsHeroAnimationComplete(true);
  }, []);

  const sections = useMemo(() => [
    { 
      Component: Hero, 
      props: { 
        onAnimationComplete: handleHeroAnimationComplete, 
        startColor: '#FF9933', 
        endColor: '#66CC99',
        color: '#FF9933'  // Add this line
      }, 
      color: '#FF9933' 
    },
    { Component: About, props: { color: '#66CC99' }, color: '#66CC99' },
    { Component: Experience, props: { color: '#FF6B6B' }, color: '#FF6B6B' },
    { Component: Projects, props: { color: '#4ECDC4' }, color: '#4ECDC4' },
    { Component: Contact, props: { color: '#FFCC00' }, color: '#FFCC00' },
  ], [handleHeroAnimationComplete]);

  const { currentSection, scrollProgress, setCurrentSection } = useSnapScroll({
    sectionCount: sections.length,
    isEnabled: isHeroAnimationComplete,
    initialSection: 0,
    scrollSensitivity: 0.5,
    snapThreshold: 70,
  });

// Add this state to track if we're transitioning from the hero
const [isTransitioningFromHero, setIsTransitioningFromHero] = useState(true);

// Modify the effect
useEffect(() => {
  if (isHeroAnimationComplete) {
    setCurrentSection(1);
    // Set a timeout to allow for the transition
    setTimeout(() => setIsTransitioningFromHero(false), 500);
  }
}, [isHeroAnimationComplete, setCurrentSection]);

// Modify the color selection logic
const currentColor = isTransitioningFromHero 
  ? sections[0].color 
  : sections[Math.max(currentSection - 1, 0)].color;
const nextColor = sections[currentSection].color;

  // // Adjust the color selection here
  // const currentColor = sections[Math.max(currentSection - 1, 0)].color;
  // const nextColor = sections[currentSection].color;
  const transitionedColor = useColorTransition(currentColor, nextColor, 500);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, ${transitionedColor} ${(1 - scrollProgress / 100) * 100}%, ${nextColor} 100%)`,
    transition: 'background-image 0.3s ease-out',
  };

  return (
    <div className="relative h-screen overflow-hidden" style={gradientStyle}>
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