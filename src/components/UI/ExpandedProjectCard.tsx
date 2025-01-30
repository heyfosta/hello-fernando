// src/components/UI/ExpandedProjectCard.tsx
import React, { useCallback, useEffect } from 'react';
import { Project } from '../../types/Project';
import { X } from 'lucide-react';

interface ExpandedProjectCardProps {
  project: Project;
  onClose: () => void;
}

const ExpandedProjectCard: React.FC<ExpandedProjectCardProps> = ({ project, onClose }) => {
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);

  return (
    <div 
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <button
        onClick={onClose}
        className="fixed right-8 top-8 z-50 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
        aria-label="Close"
      >
        <X size={24} className="text-white" />
      </button>

      <div className="w-full h-full md:w-11/12 md:h-5/6 bg-white overflow-y-auto relative">
        <div className="h-1/2 md:h-2/3 relative">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            {project.title}
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg">
            {project.fullDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-[#4ECDC4] text-white px-4 py-2 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4ECDC4] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg"
              >
                Visit Site
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedProjectCard;