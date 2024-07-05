// src/components/SectionWrapper.tsx
import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  index: number;
  currentSection: number;
  scrollProgress: number;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  index,
  currentSection,
  scrollProgress
}) => {
  const calculateTransform = () => {
    if (index < currentSection) {
      return 'translateY(-100%)';
    } else if (index > currentSection) {
      return 'translateY(100%)';
    } else {
      // Allow overscroll for the first section
      if (index === 0 && scrollProgress < 0) {
        return `translateY(${-scrollProgress}%)`;
      }
      return `translateY(${-scrollProgress}%)`;
    }
  };

  return (
    <div
      className="section absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-out"
      style={{
        transform: calculateTransform(),
        zIndex: 100 - Math.abs(index - currentSection),
      }}
    >
      {children}
    </div>
  );
};