import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col justify-center items-center py-16">
      <div className="fadeup mb-4 text-center" style={{ transitionDelay: '100ms' }}>
        <h1 className="text-4xl font-bold">Hi, my name is</h1>
      </div>
      <div className="fadeup mb-4 text-center" style={{ transitionDelay: '200ms' }}>
        <h2 className="text-6xl font-bold">Fernando Costa.</h2>
      </div>
      <div className="fadeup mb-6 text-center" style={{ transitionDelay: '300ms' }}>
        <h3 className="text-4xl font-bold">I build things for the web.</h3>
      </div>
      <div className="fadeup mb-8 text-center" style={{ transitionDelay: '400ms' }}>
        <p className="text-xl max-w-2xl">
          I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products at{' '}
          <a href="https://example.com" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline">
            Lorem Ipsum
          </a>
          .
        </p>
      </div>
      <div className="fadeup text-center" style={{ transitionDelay: '500ms' }}>
        <button className="bg-white text-blue-500 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300">
          Get in Touch
        </button>
      </div>
    </div>
  );
};

export default Hero;