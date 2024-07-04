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
    let touchStartY = 0;

    const handleWheel = (event: WheelEvent) => {
      if (isSnapping) return;
      event.preventDefault();

      accumulatedDelta += event.deltaY * scrollSensitivity;
      handleScroll(accumulatedDelta);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isSnapping) return;
      event.preventDefault();

      const touchEndY = event.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      accumulatedDelta += deltaY * scrollSensitivity;
      handleScroll(accumulatedDelta);

      touchStartY = touchEndY;
    };

    const handleScroll = (delta: number) => {
      let newScrollProgress = delta / window.innerHeight * 100;

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

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentSection, sectionCount, isSnapping, snapToSection, scrollSensitivity, snapThreshold, isEnabled]);

  return {
    currentSection,
    scrollProgress,
    setCurrentSection,
  };
};