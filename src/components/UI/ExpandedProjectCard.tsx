// src/components/UI/ExpandedProjectCard.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

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
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const content = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white text-[#4ECDC4] p-6 rounded-lg shadow-xl w-11/12 h-5/6 max-w-4xl overflow-y-auto">
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

  return ReactDOM.createPortal(content, document.body);
};

export default ExpandedProjectCard;