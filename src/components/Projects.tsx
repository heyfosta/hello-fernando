// src/components/Projects.tsx
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ProjectCard from './UI/ProjectCard';
import ExpandedProjectCard from './UI/ExpandedProjectCard';
import projectsData from '../data/projects.json';
import { Project } from '../types/Project';
import '../styles/sections.css';

interface ProjectsProps {
  color: string;
  setIsProjectExpanded: (expanded: boolean) => void;
}

const Projects: React.FC<ProjectsProps> = ({ color, setIsProjectExpanded }) => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (project: Project) => {
    setExpandedProject(project);
    setIsProjectExpanded(true);
  };

  const handleCloseExpanded = () => {
    setExpandedProject(null);
    setIsProjectExpanded(false);
  };

  useEffect(() => {
    if (expandedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [expandedProject]);

  return (
    <>
      <section className="section-container text-white" ref={projectsContainerRef}>
        <div className="section-content">
          <div className="section-scrollable">
            <div className="section-inner">
              <h2 className="section-title">Projects</h2>
              {/* Hero Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {projectsData.projects.slice(0, 2).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project)}
                    isHero={true}
                  />
                ))}
              </div>

              {/* Regular Projects */}
              {projectsData.projects.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projectsData.projects.slice(2).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => handleProjectClick(project)}
                      isHero={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {expandedProject && ReactDOM.createPortal(
        <ExpandedProjectCard
          project={expandedProject}
          onClose={handleCloseExpanded}
        />,
        document.body
      )}
    </>
  );
};

export default Projects;