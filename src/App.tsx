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
import FallingWords from './components/FallingWords';
import './styles/sections.css';

// Types
type SectionProps = {
  onAnimationComplete?: () => void;
  isHelloAnimationComplete?: boolean;
  initialColor?: string;
  finalColor?: string;
};

interface Section {
  Component: React.ComponentType<any>;
  props: SectionProps & { 
    experiences?: any[];
    setIsProjectExpanded?: (expanded: boolean) => void;
  };
  color: string;
}

// Colors
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
  const [showFallingWords, setShowFallingWords] = useState(false);

  // Handlers
  const handleHelloAnimationComplete = useCallback(() => {
    setShowHelloAnimation(false);
    setIsHelloAnimationComplete(true);
  }, []);

  const handleHeroAnimationComplete = useCallback(() => {
    setIsHeroAnimationComplete(true);
    setShowFallingWords(true);
  }, []);

  const handleFallingWordsComplete = useCallback(() => {
    setShowFallingWords(false);
  }, []);

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
        experiences: [
          {
            companyName: "Bernadette",
            companyUrl: "https://wearebernadette.co",
            position: "Web Developer",
            dateRange: "Oct 2022 - Present",
            location: "London, England, United Kingdom · Remote",
            description: "At Bernadette, I specialize in developing solutions that bridge technical capabilities with business needs: Lead development of automation tools using Python and Selenium, transforming manual processes from hours to seconds for the KIA account. Conduct technical feasibility analysis and prototype development for innovative projects, including AI implementation for the 'My Cadbury Era' campaign using Stable Diffusion and ComfyUI. Build and maintain custom web applications using React, Next.js, and Python, while implementing database solutions with SQL and MySQL for data-driven decision making."
          },
          {
            companyName: "VCCP iX",
            companyUrl: "https://www.vccp.com",
            position: "Associate Technologist",
            dateRange: "Jan 2020 - Oct 2022",
            location: "London, United Kingdom · On-site",
            description: "Analyze technical feasibility of creative concepts during ideation meetings, providing expertise on implementation possibilities. Develop proof-of-concept prototypes to validate innovative technical solutions. Create and deliver technical documentation and presentations to internal teams. Collaborate with creative teams to ensure technical viability of proposed solutions. Support development teams in implementing new technologies and frameworks."
          },
          {
            companyName: "VCCP Digital",
            companyUrl: "https://www.vccp.com",
            position: "Innovation Specialist",
            dateRange: "Aug 2018 - Jan 2020",
            location: "London, United Kingdom",
            description: "Led technology workshops and presentations on emerging technologies. Conducted research and analysis to identify opportunities for agency innovation. Facilitated creative meetings to bridge technical capabilities with creative concepts. Evaluated and recommended technical solutions for client campaigns. Created technical feasibility reports and established regular technology knowledge-sharing sessions that enhanced agency capabilities."
          }
        ]
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
  const { currentSection, scrollProgress, setCurrentSection, registerSection } = useSnapScroll({
    sectionCount: sections.length,
    isEnabled: isHeroAnimationComplete && !isProjectExpanded,
    initialSection: 0,
  });
  

  // Effects
  useEffect(() => {
    if (isHeroAnimationComplete) {
      setCurrentSection(1);
      setTimeout(() => setIsTransitioningFromHero(false), 500);
    }
  }, [isHeroAnimationComplete, setCurrentSection]);

  // Color transition logic
  const currentColor = isTransitioningFromHero 
    ? sections[0].color 
    : sections[Math.max(currentSection - 1, 0)].color;
  const nextColor = sections[currentSection].color;
  const transitionedColor = useColorTransition(currentColor, nextColor, 500);

  // Styles
  const gradientStyle = {
    backgroundImage: `linear-gradient(
      to bottom, 
      ${transitionedColor} ${(1 - scrollProgress / 100) * 100}%, 
      ${nextColor} 100%
    )`,
    transition: 'background-image 0.3s ease-out',
  };
  

  return (
    <>
      {showHelloAnimation && (
        <HelloAnimation onComplete={handleHelloAnimationComplete}>
          <div className="hello-content" />
        </HelloAnimation>
      )}
  
      <div 
        className={`
          fixed inset-0 
          ${isProjectExpanded ? 'pointer-events-none' : ''}
        `} 
        style={gradientStyle}
      />
      
      <div className="relative min-h-screen">
        {sections.map(({ Component, props }, index) => (
          <SectionWrapper
            key={index}
            index={index}
            currentSection={currentSection}
            scrollProgress={scrollProgress}
            registerSection={registerSection}
          >
            <Component {...props} />
          </SectionWrapper>
        ))}
      </div>
  
      {showFallingWords && (
        <FallingWords 
          isActive={showFallingWords} 
          onAnimationComplete={handleFallingWordsComplete} 
        />
      )}
    </>
  );
};

export default App;