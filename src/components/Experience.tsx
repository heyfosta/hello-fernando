// src/components/Experience.tsx
import React from 'react';
import ExperienceCard from './UI/ExperienceCard';
import { Experience as ExperienceType } from '../types/Experience';
import '../styles/sections.css';

interface ExperienceProps {
  experiences: ExperienceType[];
  education: ExperienceType[];
  color?: string;
  onComplete?: () => void;
}

const Experience: React.FC<ExperienceProps> = ({ experiences, education, onComplete }) => {
  return (
    <section className="section-container text-white">
      <div className="section-content">
        <div className="section-scrollable">
          <div className="section-inner">
            {/* Work Experience Section */}
            <h2 className="section-title mb-8">Work Experience</h2>
            <ul className="space-y-8 mb-16">
              {experiences.map((experience, index) => (
                <li key={`work-${index}`}>
                  <ExperienceCard {...experience} />
                </li>
              ))}
            </ul>

            {/* Education Section */}
            <h2 className="section-title mb-8">Education</h2>
            <ul className="space-y-8 pb-16">
              {education.map((edu, index) => (
                <li key={`edu-${index}`}>
                  <ExperienceCard {...edu} />
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
