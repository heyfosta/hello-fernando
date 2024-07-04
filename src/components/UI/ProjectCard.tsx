import React from 'react';
import Card from './Card';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  link
}) => {
  return (
    <Card className="text-[#4ECDC4] p-3 sm:p-4 md:p-6 hover:scale-105">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="text-sm sm:text-base md:text-lg mb-2">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-[#4ECDC4] text-white px-2 py-1 rounded text-xs">
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default ProjectCard;