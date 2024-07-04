// src/components/Projects.tsx
import React, { useState } from 'react';
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
  setIsProjectExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Projects: React.FC<ProjectsProps> = ({ color, setIsProjectExpanded }) => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "AI Influencer Creator",
      description: "A cutting-edge SaaS platform that empowers users to create and manage AI-powered influencers. Leveraging advanced language models and content generation algorithms, this application allows businesses and individuals to craft unique digital personalities tailored to specific niches and audiences. With seamless integration of payment processing and user authentication, it offers a complete solution for the next generation of digital marketing and social media engagement.",
      technologies: ["TypeScript", "Next.js", "Supabase", "Tailwind CSS", "Stripe"],
      link: "https://ai-influencer-creator.com",
      githubLink: "https://github.com/user/ai-influencer-creator",
      images: ["url1", "url2"]
    },
    {
      title: "TeleBot Forge",
      description: "An innovative platform for creating customized Telegram bots with diverse personalities and knowledge bases. Utilizing RAG (Retrieval-Augmented Generation) capabilities, users can develop bots that possess specific traits, expertise, and conversational styles. The integration with Stripe enables monetization options, while Supabase provides robust backend support. This project opens up new possibilities for businesses, educators, and enthusiasts to deploy intelligent chatbots for various purposes, from customer support to interactive learning experiences.",
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

  return (
    <section className="min-h-screen text-white flex items-center justify-center py-16">
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
      {expandedProject && (
        <ExpandedProjectCard
          {...expandedProject}
          onClose={handleCloseExpanded}
        />
      )}
    </section>
  );
};

export default Projects;

