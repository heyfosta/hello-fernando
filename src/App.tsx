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

type SectionProps = {
  onAnimationComplete?: () => void;
  isHelloAnimationComplete?: boolean;
  initialColor?: string;
  finalColor?: string;
};

interface Section {
  Component: React.ComponentType<any>;
  props: SectionProps & { experiences?: any[], setIsProjectExpanded?: React.Dispatch<React.SetStateAction<boolean>> };
  color: string;
}

const App: React.FC = () => {
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(false);
  const [showHelloAnimation, setShowHelloAnimation] = useState(true);
  const [isTransitioningFromHero, setIsTransitioningFromHero] = useState(true);
  const [isHelloAnimationComplete, setIsHelloAnimationComplete] = useState(false);
  const [isProjectExpanded, setIsProjectExpanded] = useState(false);

  const handleHelloAnimationComplete = useCallback(() => {
    setShowHelloAnimation(false);
    setIsHelloAnimationComplete(true);
  }, []);

  const handleHeroAnimationComplete = useCallback(() => {
    setIsHeroAnimationComplete(true);
  }, []);

  const sections: Section[] = useMemo(() => [
    { 
      Component: Hero, 
      props: { 
        onAnimationComplete: handleHeroAnimationComplete, 
        isHelloAnimationComplete: isHelloAnimationComplete,
        initialColor: '#FF9933', 
        finalColor: '#FFCC00',
      }, 
      color: '#FFCC00' 
    },
    { Component: About, props: { color: '#66CC99' }, color: '#66CC99' },
    { 
      Component: Experience, 
      props: { 
        color: '#FF6B6B',
        experiences: [
          {
            companyName: "Company A",
            companyUrl: "https://companya.com",
            position: "Software Developer",
            dateRange: "Jan 2020 - Present",
            description: "Worked on various projects including web applications and mobile apps. Led a team of 3 junior developers."
          },
          {
            companyName: "Company B",
            companyUrl: "https://companyb.com",
            position: "Junior Developer",
            dateRange: "Jun 2018 - Dec 2019",
            description: "Assisted in developing and maintaining the company's main product. Learned and implemented best practices in software development."
          },
        ]
      }, 
      color: '#FF6B6B' 
    },
    { 
      Component: Projects, 
      props: { 
        color: '#4ECDC4',
        setIsProjectExpanded
      }, 
      color: '#4ECDC4' 
    },
    { Component: Contact, props: { color: '#FFCC00' }, color: '#FFCC00' },
  ], [handleHeroAnimationComplete, isHelloAnimationComplete, setIsProjectExpanded]);

  const { currentSection, scrollProgress, setCurrentSection } = useSnapScroll({
    sectionCount: sections.length,
    isEnabled: isHeroAnimationComplete && !isProjectExpanded,
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
    minHeight: '100vh', 
  };

  return (
    <>
      {showHelloAnimation && (
        <HelloAnimation onComplete={handleHelloAnimationComplete}>
          <div className="hello-content">
            {/* Add any content you want to show during the hello animation */}
          </div>
        </HelloAnimation>
      )}
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
    </>
  );
};

export default App;