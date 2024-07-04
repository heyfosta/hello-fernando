// src/components/Experience.tsx
import React from 'react';
import ExperienceCard from './UI/ExperienceCard';
import { ExperienceProps } from '../types/SectionTypes';

const Experience: React.FC<ExperienceProps> = ({ experiences, onComplete }) => {
  return (
    <section className="h-screen overflow-y-auto text-white flex flex-col items-center justify-start py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center">Work Experience</h2>
        <ul className="space-y-8 pb-16">
          {experiences.map((experience, index) => (
            <li key={index}>
              <ExperienceCard {...experience} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Experience;