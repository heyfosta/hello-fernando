// src/components/UI/ProjectCard.tsx
import React, { useState } from 'react';
import { Project } from '../../types/types';
import Card from './Card';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  isHero?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, isHero = false }) => {
  const [imageError, setImageError] = useState(false);

  const getImagePath = (path: string): string => {
    if (path.startsWith('/public/')) {
      return path.replace('/public', '');
    }
    return path;
  };

  return (
    <Card
      className={`
        text-[#4ECDC4] 
        overflow-hidden 
        hover:scale-105 
        cursor-pointer 
        transition-transform 
        duration-300
        ${isHero ? 'aspect-[16/9]' : 'aspect-square'}
      `}
      onClick={onClick}
    >
      <div className="relative h-48">
        <img
          src={imageError ? '/api/placeholder/400/300' : getImagePath(project.thumbnailImage)}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm mb-4">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-[#4ECDC4] text-white px-2 py-1 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;