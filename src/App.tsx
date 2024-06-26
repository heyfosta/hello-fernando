//src/App.tsx
import React, { useState, useRef, useEffect } from 'react';
import HelloAnimation from './animations/HelloAnimation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  useEffect(() => {
    if (isAnimationComplete && contentRef.current) {
      contentRef.current.style.visibility = 'visible';
    }
  }, [isAnimationComplete]);

  return (
    <div>
      <Hero isAnimationComplete={isAnimationComplete} />
      <div 
        ref={contentRef} 
        style={{ visibility: isAnimationComplete ? 'visible' : 'hidden' }}
      >
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