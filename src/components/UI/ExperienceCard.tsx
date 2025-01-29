import React from 'react';
import Card from './Card';

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
    <Card className="text-[black] p-3 sm:p-4 md:p-6 hover:scale-105">
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
      <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 font-semibold">{position}, {dateRange}</p>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed">{description}</p>
    </Card>
  );
};

export default ExperienceCard;