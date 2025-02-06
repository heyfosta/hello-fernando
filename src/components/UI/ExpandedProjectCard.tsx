// src/components/UI/ExpandedProjectCard.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { Project } from '../../types/Project';
import { X } from 'lucide-react';

interface ExpandedProjectCardProps {
  project: Project;
  onClose: () => void;
}

const ExpandedProjectCard: React.FC<ExpandedProjectCardProps> = ({ project, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const getImagePath = (path: string): string => {
    if (path.startsWith('/public/')) {
      return path.replace('/public', '');
    }
    return path;
  };

  const handleImageError = (index: number) => {
    setImageError(prev => ({
      ...prev,
      [index]: true
    }));
  };

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
            src={imageError[selectedImage] ? '/api/placeholder/800/600' : getImagePath(project.images[selectedImage])}
            alt={`${project.title} - Image ${selectedImage + 1}`}
            className="w-full h-full object-cover"
            onError={() => handleImageError(selectedImage)}
          />
        </div>

        {/* Thumbnail Gallery */}
        {project.images.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto bg-gray-100">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative flex-shrink-0 h-20 w-32 rounded-lg overflow-hidden 
                  ${selectedImage === index ? 'ring-2 ring-[#4ECDC4]' : ''}`}
              >
                <img
                  src={imageError[index] ? '/api/placeholder/400/300' : getImagePath(image)}
                  alt={`${project.title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(index)}
                />
              </button>
            ))}
          </div>
        )}

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