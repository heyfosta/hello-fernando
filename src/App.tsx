import React, { useState, useCallback, useMemo } from 'react';
import HelloAnimation from './animations/HelloAnimation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { SectionWrapper } from './components/SectionWrapper';
import { Section, HeroProps, AboutProps, ExperienceProps, ProjectsProps, ContactProps } from './types/SectionTypes';

const App: React.FC = () => {
  const [isHelloAnimationComplete, setIsHelloAnimationComplete] = useState(false);
  const [sectionToAnimate, setSectionToAnimate] = useState(-1);

  const handleHelloAnimationComplete = useCallback(() => {
    console.log('Hello animation complete');
    setIsHelloAnimationComplete(true);
  }, []);

  const handleSectionComplete = useCallback((index: number) => {
    console.log(`Section ${index} complete, setting sectionToAnimate`);
    setSectionToAnimate(index);
  }, []);
  
  const handleSectionAnimationComplete = useCallback(() => {
    console.log('Section animation complete');
    setSectionToAnimate(-1);
  }, []);

  const sections: [
    Section<HeroProps>,
    Section<AboutProps>,
    Section<ExperienceProps>,
    Section<ProjectsProps>,
    Section<ContactProps>
  ] = useMemo(() => [
    { Component: Hero, props: { onComplete: () => handleSectionComplete(0) } },
    { Component: About, props: {} },
    { Component: Experience, props: {} },
    { Component: Projects, props: {} },
    { Component: Contact, props: {} },
  ], [handleSectionComplete]);

  return (
    <div className="relative h-screen overflow-hidden">
      {!isHelloAnimationComplete ? (
        <HelloAnimation onComplete={handleHelloAnimationComplete} />
      ) : (
        <div className="sections-stack relative h-full">
          {sections.map(({ Component, props }, index) => (
            <SectionWrapper 
              key={index} 
              index={index} 
              isEnabled={true}
              shouldAnimate={index === sectionToAnimate}
              onComplete={handleSectionAnimationComplete}
            >
              <Component {...props} />
            </SectionWrapper>
          ))}
        </div>
      )}
    </div>
  );
};
export default App