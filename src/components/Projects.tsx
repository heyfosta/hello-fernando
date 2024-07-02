// src/components/Projects.tsx
import React from 'react';
import { ProjectsProps } from '../types/SectionTypes';

const Projects: React.FC<ProjectsProps> = () => {
  return (
    <section className="h-screen  text-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white text-[#45B7D1] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Project 1</h3>
            <p className="text-lg">Description of Project 1</p>
          </div>
          <div className="bg-white text-[#45B7D1] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Project 2</h3>
            <p className="text-lg">Description of Project 2</p>
          </div>
          {/* Add more project items as needed */}
        </div>
      </div>
    </section>
  );
};

export default Projects;