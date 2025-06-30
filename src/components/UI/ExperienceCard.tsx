// ExperienceCard.tsx
import React from 'react';
import Card from './Card';
import { Experience } from '../../types/types';

type ExperienceCardProps = Experience;

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  position,
  dateRange,
  description
}) => {
  return (
    <div className="mx-4 mb-4 group perspective-1000">
      <div className="transform-gpu transition-all duration-300 group-hover:scale-[1.02]">
        <Card className="
          text-black p-3 sm:p-4 md:p-6
          relative
          rounded-xl
          shadow-lg
          max-w-full
          h-full
        ">
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">
              {company}
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold break-words">
              {position}, {dateRange}
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed break-words">
              {description}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExperienceCard;
