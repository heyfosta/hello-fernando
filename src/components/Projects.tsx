import React from 'react';
import projects from '../data/Projects.json';
import { Project } from '../types/Project';

const Projects: React.FC = () => {
  const projectsData: Project[] = projects as Project[];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
              {/* Add more project details */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;