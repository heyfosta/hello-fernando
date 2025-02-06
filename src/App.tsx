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
// import FallingWords from './components/FallingWords';
import experienceData from './data/experience.json';
import './styles/sections.css';

import { Experience as ExperienceType } from './types/Experience';

type SectionProps = {
  onAnimationComplete?: () => void;
  isHelloAnimationComplete?: boolean;
  initialColor?: string;
  finalColor?: string;
};

interface Section {
  Component: React.ComponentType<any>;
  props: SectionProps & { 
    experiences?: ExperienceType[];
    setIsProjectExpanded?: (expanded: boolean) => void;
  };
  color: string;
}

const COLORS = {
  HERO: '#FFCC00',
  ABOUT: '#66CC99',
  EXPERIENCE: '#FF6B6B',
  PROJECTS: '#4ECDC4',
  CONTACT: '#FFCC00',
  HERO_INITIAL: '#FF9933',
} as const;

const App: React.FC = () => {
  // State
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(false);
  const [showHelloAnimation, setShowHelloAnimation] = useState(true);
  const [isTransitioningFromHero, setIsTransitioningFromHero] = useState(true);
  const [isHelloAnimationComplete, setIsHelloAnimationComplete] = useState(false);
  const [isProjectExpanded, setIsProjectExpanded] = useState(false);
  // const [showFallingWords, setShowFallingWords] = useState(false);
  

  // Force scroll to top on mount/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = showHelloAnimation ? 'hidden' : 'auto';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showHelloAnimation]);

  // Handlers
  const handleHelloAnimationComplete = useCallback(() => {
    setShowHelloAnimation(false);
    setIsHelloAnimationComplete(true);
    window.scrollTo(0, 0);
  }, []);

  const handleHeroAnimationComplete = useCallback(() => {
    setIsHeroAnimationComplete(true);
    // setShowFallingWords(true);
  }, []);

  // const handleFallingWordsComplete = useCallback(() => {
  //   setShowFallingWords(false);
  // }, []);

  const handleProjectExpanded = useCallback((expanded: boolean) => {
    setIsProjectExpanded(expanded);
  }, []);

  // Section definitions
  const sections: Section[] = useMemo(() => [
    { 
      Component: Hero, 
      props: { 
        onAnimationComplete: handleHeroAnimationComplete, 
        isHelloAnimationComplete,
        initialColor: COLORS.HERO_INITIAL, 
        finalColor: COLORS.HERO,
      }, 
      color: COLORS.HERO 
    },
    { 
      Component: About, 
      props: { color: COLORS.ABOUT }, 
      color: COLORS.ABOUT 
    },
    { 
      Component: Experience, 
      props: { 
        color: COLORS.EXPERIENCE,
        experiences: experienceData.experiences,
        education: experienceData.education
      }, 
      color: COLORS.EXPERIENCE 
    },
    { 
      Component: Projects, 
      props: { 
        color: COLORS.PROJECTS,
        setIsProjectExpanded: handleProjectExpanded
      }, 
      color: COLORS.PROJECTS 
    },
    { 
      Component: Contact, 
      props: { color: COLORS.CONTACT }, 
      color: COLORS.CONTACT 
    },
  ], [handleHeroAnimationComplete, isHelloAnimationComplete, handleProjectExpanded]);

  // Scroll handling
  const { currentSection, scrollProgress, registerSection } = useSnapScroll({
    sectionCount: sections.length,
    isEnabled: isHeroAnimationComplete && !isProjectExpanded && !showHelloAnimation,
    initialSection: 0,
  });
  
  // Modified effect to handle hero animation
  useEffect(() => {
    if (isHeroAnimationComplete && !showHelloAnimation) {
      setTimeout(() => setIsTransitioningFromHero(false), 500);
    }
  }, [isHeroAnimationComplete, showHelloAnimation]);

  // Color transition logic
  const currentColor = isTransitioningFromHero 
    ? sections[0].color 
    : sections[Math.max(currentSection - 1, 0)].color;
  const nextColor = sections[currentSection].color;
  const transitionedColor = useColorTransition(currentColor, nextColor, 500);

  const gradientStyle = {
    backgroundImage: `linear-gradient(
      to bottom, 
      ${transitionedColor} ${(1 - scrollProgress / 100) * 100}%, 
      ${nextColor} 100%
    )`,
    transition: 'background-image 0.3s ease-out',
  };
  
  return (
    <div className="relative scroll-container">
      <div 
        className="relative min-h-screen"
        style={{ 
          overflow: showHelloAnimation ? 'hidden' : 'visible'
        }}
      >
        <div 
          className={`
            fixed inset-0 
            ${isProjectExpanded ? 'pointer-events-none' : ''}
          `} 
          style={gradientStyle}
        />
        
        {sections.map(({ Component, props }, index) => (
          <SectionWrapper
            key={index}
            index={index}
            currentSection={currentSection}
            scrollProgress={scrollProgress}
            registerSection={registerSection}
            isHelloAnimationComplete={isHelloAnimationComplete}
          >
            <Component {...props} />
          </SectionWrapper>
        ))}
      </div>

      {showHelloAnimation && (
        <HelloAnimation onComplete={handleHelloAnimationComplete}>
          <div className="hello-content" />
        </HelloAnimation>
      )}
  
      {/* {showFallingWords && (
        <FallingWords 
          isActive={showFallingWords} 
          onAnimationComplete={handleFallingWordsComplete} 
        />
      )} */}
    </div>
  );
};

export default App;