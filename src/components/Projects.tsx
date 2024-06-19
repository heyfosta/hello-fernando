import React from 'react';
import projects from '../data/Projects.json';
import { Project } from '../types/Project';

const Projects: React.FC = () => {
  const projectsData: Project[] = projects as Project[];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p>{project.description}</p>
            {/* Add more project details */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;