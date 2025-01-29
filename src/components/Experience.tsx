// src/components/Experience.tsx
import React from 'react';
import ExperienceCard from './UI/ExperienceCard';
import { ExperienceProps } from '../types/SectionTypes';
import '../styles/sections.css';


const Experience: React.FC<ExperienceProps> = ({ experiences, onComplete }) => {
  return (
    <section className="section-container text-white">
      <div className="section-content">
        <div className="section-scrollable">
          <div className="section-inner">
            <h2 className="section-title">Work Experience</h2>
            <ul className="space-y-8 pb-16">
              {experiences.map((experience, index) => (
                <li key={index}>
                  <ExperienceCard {...experience} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;