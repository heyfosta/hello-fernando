import React, { useState } from 'react';
import HelloAnimation from './animations/HelloAnimation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  return (
    <div>
      <div className="container mx-auto">
        <Hero isAnimationComplete={isAnimationComplete} />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
      {!isAnimationComplete && <HelloAnimation onComplete={handleAnimationComplete} />}
    </div>
  );
};

export default App;