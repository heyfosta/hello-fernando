import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;