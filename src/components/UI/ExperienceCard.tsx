// src/components/UI/ExperienceCard.tsx
import React from 'react';

interface ExperienceCardProps {
  companyName: string;
  companyUrl: string;
  position: string;
  dateRange: string;
  description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  companyName,
  companyUrl,
  position,
  dateRange,
  description
}) => {
  return (
    <div className="bg-white text-[#4ECDC4] p-3 sm:p-4 md:p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
        <a 
          href={companyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {companyName}
        </a>
      </h3>
      <p className="text-lg sm:text-xl mb-1 sm:mb-2 font-semibold">{position}, {dateRange}</p>
      <p className="text-sm sm:text-base md:text-lg">{description}</p>
    </div>
  );
};

export default ExperienceCard;