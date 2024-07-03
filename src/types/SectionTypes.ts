// src/types/SectionTypes.ts
import { FC } from 'react';

export interface CommonSectionProps {
  onComplete?: () => void;
}

export interface HeroProps extends CommonSectionProps {}
export interface AboutProps extends CommonSectionProps {}
export interface ExperienceProps extends CommonSectionProps {}
export interface ProjectsProps extends CommonSectionProps {}
export interface ContactProps extends CommonSectionProps {}

export type SectionProps = HeroProps | AboutProps | ExperienceProps | ProjectsProps | ContactProps;

export type SectionComponent<T extends SectionProps> = FC<T>;

export interface Section<T extends SectionProps = SectionProps> {
  Component: SectionComponent<T>;
  props: T;
}

export interface HeroProps extends CommonSectionProps {
    startColor?: string;
    endColor?: string;
    color?: string;
  }