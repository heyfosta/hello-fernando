import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg mb-4">
        Hi, I'm John Doe, a web developer with expertise in React, TypeScript, and more.
      </p>
      <ul className="list-disc list-inside">
        <li>React</li>
        <li>TypeScript</li>
        <li>JavaScript</li>
        <li>HTML/CSS</li>
      </ul>
    </section>
  );
};

export default About;