// src/components/UI/ExpandedProjectCard.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Project } from '../../types/types';

interface ExpandedProjectCardProps {
  project: Project;
  onClose: () => void;
}

const ExpandedProjectCard: React.FC<ExpandedProjectCardProps> = ({ project, onClose }) => {
  const [mediaError, setMediaError] = useState<{ [key: string]: boolean }>({});

  const getMediaPath = (path: string): string => {
    if (path.startsWith('/public/')) {
      return path.replace('/public', '');
    }
    return path;
  };

  const handleMediaError = (index: number) => {
    setMediaError(prev => ({
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

  const renderMedia = (mediaItem: string | { type: string; url: string; description?: string }, index: number) => {
    if (mediaError[index]) {
      return (
        <img
          src="/api/placeholder/800/600"
          alt={`Fallback for ${project.title}`}
          className="max-w-full max-h-[800px] w-auto h-auto mx-auto object-contain"
        />
      );
    }

    if (typeof mediaItem === 'object' && mediaItem.type === 'video') {
      return (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="max-w-full max-h-[800px] w-auto h-auto mx-auto"
          onError={() => handleMediaError(index)}
        >
          <source src={getMediaPath(mediaItem.url)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    const imageSrc = typeof mediaItem === 'string' ? mediaItem : mediaItem.url;
    return (
      <img
        src={getMediaPath(imageSrc)}
        alt={`${project.title} preview`}
        className="max-w-full max-h-[800px] w-auto h-auto mx-auto object-contain"
        onError={() => handleMediaError(index)}
      />
    );
  };

  const mediaItems = project.media || project.images || [];

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
        {/* Hero Image */}
        <div className="w-full h-64 md:h-96">
          <img
            src={getMediaPath(project.thumbnailImage)}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={() => handleMediaError(-1)}
          />
        </div>

        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {/* Title and Description */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              {project.title}
            </h2>
            <p className="text-gray-600 text-lg">
              {project.fullDescription}
            </p>
          </div>

          {/* Technologies */}
          {project.technologies && (
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
          )}

          {/* Media Content with Descriptions */}
          {mediaItems.map((mediaItem, index) => (
            <div key={index} className="mb-12">
              <div className="flex justify-center">
                {renderMedia(mediaItem, index)}
              </div>
              
              {(typeof mediaItem === 'object' && mediaItem.description) && (
                <div className="mt-6 prose max-w-none">
                  <p className="text-gray-600">{mediaItem.description}</p>
                </div>
              )}
            </div>
          ))}

          {/* Links */}
          <div className="flex flex-wrap gap-4 mt-8">
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