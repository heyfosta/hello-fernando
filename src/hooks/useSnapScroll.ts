import { useState, useEffect, useRef } from 'react';

interface UseSnapScrollProps {
  sectionCount: number;
  isEnabled: boolean;
  initialSection: number;
}

export const useSnapScroll = ({
  sectionCount,
  isEnabled,
  initialSection,
}: UseSnapScrollProps) => {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);
  const sections = useRef<HTMLElement[]>([]);
  const isTransitioning = useRef(false);
  const isInitialTransition = useRef(true);
  
  useEffect(() => {
    if (!isEnabled) return;

    const handleScroll = () => {
      if (isTransitioning.current) return;
      
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollingDown = currentScrollY > lastScrollY.current;
      
      // Special handling for initial transition from hero
      if (isInitialTransition.current && currentSection === 0 && scrollingDown) {
        isInitialTransition.current = false;
        isTransitioning.current = true;
        
        // Ensure smooth transition to section 1
        const nextSectionEl = sections.current[1];
        if (nextSectionEl) {
          setCurrentSection(1);
          window.scrollTo({
            top: nextSectionEl.offsetTop,
            behavior: 'smooth'
          });
          
          setTimeout(() => {
            isTransitioning.current = false;
          }, 1000);
        }
        return;
      }
      
      // Regular scroll handling
      const threshold = scrollingDown ? 0.4 : 0.3;
      let nextSection = currentSection;
      
      if (scrollingDown && currentSection < sectionCount - 1) {
        const nextSectionEl = sections.current[currentSection + 1];
        if (nextSectionEl && currentScrollY >= nextSectionEl.offsetTop - viewportHeight * threshold) {
          nextSection = currentSection + 1;
        }
      } else if (!scrollingDown && currentSection > 0) {
        const currentSectionEl = sections.current[currentSection];
        if (currentSectionEl && currentScrollY < currentSectionEl.offsetTop - viewportHeight * threshold) {
          nextSection = currentSection - 1;
        }
      }

      if (nextSection !== currentSection) {
        isTransitioning.current = true;
        setCurrentSection(nextSection);
        
        const currentSectionEl = sections.current[nextSection];
        if (currentSectionEl) {
          const progress = ((currentScrollY - currentSectionEl.offsetTop) / currentSectionEl.offsetHeight) * 100;
          setScrollProgress(Math.max(0, Math.min(100, progress)));
        }

        setTimeout(() => {
          isTransitioning.current = false;
        }, 500);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEnabled, sectionCount, currentSection]);

  const registerSection = (index: number, ref: HTMLElement | null) => {
    if (ref) {
      sections.current[index] = ref;
    }
  };

  return {
    currentSection,
    scrollProgress,
    setCurrentSection,
    registerSection
  };
};