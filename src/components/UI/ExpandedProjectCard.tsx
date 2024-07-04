// src/components/UI/ExpandedProjectCard.tsx
import React from 'react';

interface ExpandedProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  images?: string[];
  onClose: () => void;
}

const ExpandedProjectCard: React.FC<ExpandedProjectCardProps> = ({
  title,
  description,
  technologies,
  link,
  githubLink,
  images,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-[#4ECDC4] p-6 rounded-lg shadow-xl w-full h-full md:w-4/5 md:h-4/5 lg:w-3/4 lg:h-3/4 max-w-6xl overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
          <h2 className="text-3xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          <p className="text-lg mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span key={index} className="bg-[#4ECDC4] text-white px-2 py-1 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
          {images && (
            <div className="mb-4">
              {images.map((img, index) => (
                <img key={index} src={img} alt={`${title} screenshot ${index + 1}`} className="mb-2 rounded" />
              ))}
            </div>
          )}
          <div className="flex gap-4">
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Visit Project
              </a>
            )}
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                GitHub Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedProjectCard;