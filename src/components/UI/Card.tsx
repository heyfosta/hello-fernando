// Card.tsx
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`
        bg-white 
        rounded-xl
        shadow-[0_0_15px_rgba(0,0,0,0.1)]
        transition-all 
        duration-300
        hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]
        p-6
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;