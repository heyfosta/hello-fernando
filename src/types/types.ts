// src/types/types.ts
import { FC } from 'react';

// Media Types
export interface MediaItem {
    type: 'image' | 'video';  // Strict union type
    url: string;
    description?: string; 
  }


// Project Types  
export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    link: string;
    githubLink: string;
    thumbnailImage: string;
    images: string[];
    media: MediaItem[];
  // Required array
  }

// Experience Types
export interface Experience {
 company: string;
 position: string; 
 dateRange: string;
 description: string;
}

// Section Types
export interface CommonSectionProps {
 onComplete?: () => void;
}

export type Technology = 'React' | 'TypeScript' | 'JavaScript' | 'HTML/CSS';

export interface HeroProps extends CommonSectionProps {
 startColor?: string;
 endColor?: string;
 color?: string;
}

export interface AboutProps extends CommonSectionProps {}

export interface ExperienceProps extends CommonSectionProps {
 experiences: {
   companyName: string;
   companyUrl: string;
   position: string;
   dateRange: string;
   description: string;
 }[];
}

export interface ProjectsProps extends CommonSectionProps {}

export interface ContactProps extends CommonSectionProps {}

export type SectionProps = HeroProps | AboutProps | ExperienceProps | ProjectsProps | ContactProps;

export type SectionComponent<T extends SectionProps> = FC<T>;

export interface Section<T extends SectionProps = SectionProps> {
 Component: SectionComponent<T>;
 props: T;
}