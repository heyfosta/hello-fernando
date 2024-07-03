import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { SectionWrapper } from './components/SectionWrapper';
import { useColorTransition } from './hooks/useColorTransition';
import { useSnapScroll } from './hooks/useSnapScroll';
import HelloAnimation from './animations/HelloAnimation';


const App: React.FC = () => {
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(false);
  const [showHelloAnimation, setShowHelloAnimation] = useState(true);
  const [isTransitioningFromHero, setIsTransitioningFromHero] = useState(true);

  const handleHelloAnimationComplete = useCallback(() => {
    setShowHelloAnimation(false);
  }, []);

  const handleHeroAnimationComplete = useCallback(() => {
    if (!showHelloAnimation) {
      setIsHeroAnimationComplete(true);
    }
  }, [showHelloAnimation]);

  const sections = useMemo(() => [
    { 
      Component: Hero, 
      props: { 
        onAnimationComplete: handleHeroAnimationComplete, 
        startColor: '#FF9933', 
        endColor: '#66CC99',
        color: '#FF9933'
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

  useEffect(() => {
    if (isHeroAnimationComplete) {
      setCurrentSection(1);
      setTimeout(() => setIsTransitioningFromHero(false), 500);
    }
  }, [isHeroAnimationComplete, setCurrentSection]);

  const currentColor = isTransitioningFromHero 
    ? sections[0].color 
    : sections[Math.max(currentSection - 1, 0)].color;
  const nextColor = sections[currentSection].color;
  const transitionedColor = useColorTransition(currentColor, nextColor, 500);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, ${transitionedColor} ${(1 - scrollProgress / 100) * 100}%, ${nextColor} 100%)`,
    transition: 'background-image 0.3s ease-out',
  };

  return (
    <>
      {showHelloAnimation ? (
        <HelloAnimation onComplete={handleHelloAnimationComplete}>
          <div className="relative h-screen overflow-hidden" style={gradientStyle}>
            <SectionWrapper
              index={0}
              currentSection={currentSection}
              scrollProgress={scrollProgress}
            >
              <Hero onAnimationComplete={handleHeroAnimationComplete} />
            </SectionWrapper>
          </div>
        </HelloAnimation>
      ) : (
        <div className="relative h-screen overflow-hidden" style={gradientStyle}>
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
      )}
    </>
  );
};

export default App;