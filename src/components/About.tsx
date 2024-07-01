//src/components/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-16 component-section">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
        <p className="text-lg mb-4 text-center">
          Hi, I'm John Doe, a web developer with expertise in React, TypeScript, and more.
        </p>
        <ul className="flex justify-center space-x-4">
          <li className="bg-blue-500 text-white px-4 py-2 rounded-full">React</li>
          <li className="bg-blue-500 text-white px-4 py-2 rounded-full">TypeScript</li>
          <li className="bg-blue-500 text-white px-4 py-2 rounded-full">JavaScript</li>
          <li className="bg-blue-500 text-white px-4 py-2 rounded-full">HTML/CSS</li>
        </ul>
      </div>
    </section>
  );
};

export default About;