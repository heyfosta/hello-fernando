// src/components/Skill.tsx
import React, { useState } from 'react';

interface SkillProps {
  name: string;
}

const Skill: React.FC<SkillProps> = ({ name }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li 
      className={`
        bg-white text-[#FF6B6B] px-6 py-3 rounded-full text-xl m-2 font-bold
        transition-all duration-300 ease-in-out
        ${isHovered ? 'transform scale-110 rotate-3 shadow-lg' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {name}
    </li>
  );
};

export default Skill;