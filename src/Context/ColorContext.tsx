// src/contexts/ColorContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface ColorContextType {
  currentColor: string;
  nextColor: string;
  setColors: (current: string, next: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentColor, setCurrentColor] = useState('#eebe4e');
  const [nextColor, setNextColor] = useState('#FF6B6B');

  const setColors = (current: string, next: string) => {
    setCurrentColor(current);
    setNextColor(next);
  };

  return (
    <ColorContext.Provider value={{ currentColor, nextColor, setColors }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return context;
};