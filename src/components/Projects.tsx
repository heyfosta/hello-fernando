// src/components/Projects.tsx
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ProjectCard from './UI/ProjectCard';
import ExpandedProjectCard from '../components/UI/ExpandedProjectCard';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  images?: string[];
}

interface ProjectsProps {
  color: string;
  setIsProjectExpanded: (expanded: boolean) => void;
}

const Projects: React.FC<ProjectsProps> = ({ color, setIsProjectExpanded }) => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);


  const projects: Project[] = [
    {
      title: "AI Influencer Creator",
      description: "A cutting-edge SaaS platform that empowers users to create and manage AI-powered influencers...",
      technologies: ["TypeScript", "Next.js", "Supabase", "Tailwind CSS", "Stripe"],
      link: "https://ai-influencer-creator.com",
      githubLink: "https://github.com/user/ai-influencer-creator",
      images: ["url1", "url2"]
    },
    {
      title: "TeleBot Forge",
      description: "An innovative platform for creating customized Telegram bots with diverse personalities and knowledge bases...",
      technologies: ["TypeScript", "Telegram Bot API", "Supabase", "Stripe", "RAG"],
      link: "https://telebot-forge.com",
      githubLink: "https://github.com/user/telebot-forge",
      images: ["url3", "url4"]
    },
    {
      title: "TeleBot Forge",
      description: "An innovative platform for creating customized Telegram bots with diverse personalities and knowledge bases...",
      technologies: ["TypeScript", "Telegram Bot API", "Supabase", "Stripe", "RAG"],
      link: "https://telebot-forge.com",
      githubLink: "https://github.com/user/telebot-forge",
      images: ["url3", "url4"]
    },
    {
      title: "TeleBot Forge",
      description: "An innovative platform for creating customized Telegram bots with diverse personalities and knowledge bases...",
      technologies: ["TypeScript", "Telegram Bot API", "Supabase", "Stripe", "RAG"],
      link: "https://telebot-forge.com",
      githubLink: "https://github.com/user/telebot-forge",
      images: ["url3", "url4"]
    }
  ];

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
      <section className="min-h-screen text-white flex items-center justify-center py-16" ref={projectsContainerRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </div>
      </section>
      {expandedProject && ReactDOM.createPortal(
        <ExpandedProjectCard
          {...expandedProject}
          onClose={handleCloseExpanded}
        />,
        document.body
      )}
    </>
  );
};

export default Projects;