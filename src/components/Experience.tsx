// src/components/Experience.tsx
import React from 'react';
import { ExperienceProps } from '../types/SectionTypes';

const Experience: React.FC<ExperienceProps> = ({ onComplete }) => {
  return (
    <section className="h-screen bg-[#4ECDC4] text-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center">Work Experience</h2>
        <ul className="space-y-12">
          <li className="bg-white text-[#4ECDC4] p-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-2">Company Name</h3>
            <p className="text-xl mb-2 font-semibold">Position, Date Range</p>
            <p className="text-lg">Description of your role and responsibilities.</p>
          </li>
          {/* Add more work experience items */}
        </ul>
      </div>
    </section>
  );
};

export default Experience;