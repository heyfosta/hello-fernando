// src/hooks/useSnapScroll.ts
import { useState, useCallback, useEffect } from 'react';

interface UseSnapScrollOptions {
  sectionCount: number;
  isEnabled: boolean;
  initialSection: number;
  scrollSensitivity?: number;
  snapThreshold?: number;
}

export const useSnapScroll = ({
  sectionCount,
  isEnabled,
  initialSection,
  scrollSensitivity = 0.1,
  snapThreshold = 70, // Percentage of screen height
}: UseSnapScrollOptions) => {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);

  const snapToSection = useCallback((targetSection: number) => {
    setIsSnapping(true);
    setCurrentSection(targetSection);
    setScrollProgress(0);
    setTimeout(() => setIsSnapping(false), 300); // Animation duration
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let accumulatedDelta = 0;

    const handleScroll = (event: WheelEvent) => {
      if (isSnapping) return;
      event.preventDefault();

      accumulatedDelta += event.deltaY * scrollSensitivity;
      let newScrollProgress = accumulatedDelta / window.innerHeight * 100;

      if (newScrollProgress > snapThreshold && currentSection < sectionCount - 1) {
        snapToSection(currentSection + 1);
        accumulatedDelta = 0;
      } else if (newScrollProgress < -snapThreshold && currentSection > 0) {
        snapToSection(currentSection - 1);
        accumulatedDelta = 0;
      } else {
        setScrollProgress(newScrollProgress);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentSection, sectionCount, isSnapping, snapToSection, scrollSensitivity, snapThreshold, isEnabled]);

  return {
    currentSection,
    scrollProgress,
    setCurrentSection,
  };
};