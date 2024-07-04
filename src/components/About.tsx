// src/components/About.tsx
import React from 'react';
import Skill from '../components/UI/Skill';

const skills = ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Python', 'SQL', 'NODE.JS'
];

const About: React.FC = () => {
  return (
    <section className="h-screen text-white flex items-center justify-center">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold mb-8 text-center">About Me</h2>
        <p className="text-2xl mb-8 text-center max-w-2xl mx-auto">
          Hi, I'm John Doe, a web developer with expertise in React, TypeScript, and more.
        </p>
        <ul className="flex justify-center space-x-4 flex-wrap">
          {skills.map((skill, index) => (
            <Skill key={index} name={skill} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;