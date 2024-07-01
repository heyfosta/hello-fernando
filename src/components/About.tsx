// src/components/About.tsx
import React from 'react';
import { AboutProps } from '../types/SectionTypes';

const About: React.FC<AboutProps> = () => {
  return (
    <section className="h-screen bg-blue-500 text-white flex items-center justify-center component-section">
      <div className="container mx-auto">
        <h2 className="text-6xl font-bold mb-8 text-center">About Me</h2>
        <p className="text-2xl mb-8 text-center">
          Hi, I'm John Doe, a web developer with expertise in React, TypeScript, and more.
        </p>
        <ul className="flex justify-center space-x-4 flex-wrap">
          <li className="bg-white text-blue-500 px-6 py-3 rounded-full text-xl m-2">React</li>
          <li className="bg-white text-blue-500 px-6 py-3 rounded-full text-xl m-2">TypeScript</li>
          <li className="bg-white text-blue-500 px-6 py-3 rounded-full text-xl m-2">JavaScript</li>
          <li className="bg-white text-blue-500 px-6 py-3 rounded-full text-xl m-2">HTML/CSS</li>
        </ul>
      </div>
    </section>
  );
};

export default About;