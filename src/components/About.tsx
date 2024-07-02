// src/components/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="h-screen text-white flex items-center justify-center">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold mb-8 text-center">About Me</h2>
        <p className="text-2xl mb-8 text-center max-w-2xl mx-auto">
          Hi, I'm John Doe, a web developer with expertise in React, TypeScript, and more.
        </p>
        <ul className="flex justify-center space-x-4 flex-wrap">
          <li className="bg-white text-[#FF6B6B] px-6 py-3 rounded-full text-xl m-2 font-bold">React</li>
          <li className="bg-white text-[#FF6B6B] px-6 py-3 rounded-full text-xl m-2 font-bold">TypeScript</li>
          <li className="bg-white text-[#FF6B6B] px-6 py-3 rounded-full text-xl m-2 font-bold">JavaScript</li>
          <li className="bg-white text-[#FF6B6B] px-6 py-3 rounded-full text-xl m-2 font-bold">HTML/CSS</li>
        </ul>
      </div>
    </section>
  );
};

export default About;