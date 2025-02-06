import React from 'react';
import Card from './Card';
import { Experience } from '../../types/Experience';

type ExperienceCardProps = Experience;

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  position,
  dateRange,
  description
}) => {
  return (
    <div className="mx-4 mb-4">
      <Card className="
        text-[black] p-3 sm:p-4 md:p-6
        transform transition-all duration-300 ease-out
        hover:scale-110
        relative
        origin-center
        overflow-hidden
        rounded-xl
        shadow-lg
      ">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
          {company}
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 font-semibold">{position}, {dateRange}</p>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">{description}</p>
      </Card>
    </div>
  );
};

export default ExperienceCard;