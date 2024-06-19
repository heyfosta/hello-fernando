import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="text-xl text-center">
        I'm a passionate web developer specializing in React and TypeScript.
      </p>
    </section>
  );
};

export default Hero;