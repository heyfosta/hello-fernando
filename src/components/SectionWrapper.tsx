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
      return `translateY(${-scrollProgress}%)`;
    }
  };

  return (
    <div
      className={`section absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-out`}
      style={{
        transform: calculateTransform(),
        zIndex: 100 - index,
      }}
    >
      {children}
    </div>
  );
};