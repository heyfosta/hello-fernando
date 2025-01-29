// src/components/SectionWrapper.tsx
import React, { useEffect, useRef } from 'react';
import '../styles/sections.css';

interface SectionWrapperProps {
  children: React.ReactNode;
  index: number;
  currentSection: number;
  scrollProgress: number;
  registerSection: (index: number, ref: HTMLElement | null) => void;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  index,
  currentSection,
  scrollProgress,
  registerSection,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerSection(index, sectionRef.current);
  }, [index, registerSection]);

  const calculateTransform = () => {
    if (index === currentSection) {
      return `translateY(0)`;
    }
    return index < currentSection ? 'translateY(-100%)' : 'translateY(100%)';
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full section-wrapper"
      style={{
        transform: calculateTransform(),
        transition: 'transform 0.5s ease-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};