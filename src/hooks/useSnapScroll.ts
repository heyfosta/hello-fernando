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

  useEffect(() => {
    if (!isEnabled) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Just find which section we're in
      let currentIndex = 0;
      for (let i = 0; i < sections.current.length; i++) {
        const section = sections.current[i];
        if (!section) continue;
        
        if (currentScrollY >= section.offsetTop - viewportHeight / 2) {
          currentIndex = i;
        }
      }

      // Update current section and progress
      const currentSection = sections.current[currentIndex];
      if (currentSection) {
        const progress = ((currentScrollY - currentSection.offsetTop) / currentSection.offsetHeight) * 100;
        setScrollProgress(Math.max(0, Math.min(100, progress)));
        setCurrentSection(currentIndex);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEnabled, sectionCount]);

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