// src/types/SectionTypes.ts
import { FC } from 'react';

export interface HeroProps {
    onComplete?: () => void;
  }
  
  

export interface AboutProps {}
export interface ExperienceProps {}
export interface ProjectsProps {}
export interface ContactProps {}

export type SectionProps = HeroProps | AboutProps | ExperienceProps | ProjectsProps | ContactProps;

export type SectionComponent<T extends SectionProps> = FC<T>;

export interface Section<T extends SectionProps = SectionProps> {
  Component: SectionComponent<T>;
  props: T;
}