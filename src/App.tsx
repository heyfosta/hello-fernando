// src/App.tsx
import React, { useState } from 'react';
import HelloAnimation from './animations/HelloAnimation';
import Hero from './components/Hero';
import About from './components/About';
// Import other components as needed

const App: React.FC = () => {
  const [isHelloAnimationComplete, setIsHelloAnimationComplete] = useState(false);
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(false);

  const handleHelloAnimationComplete = () => {
    setIsHelloAnimationComplete(true);
  };

  const handleHeroAnimationComplete = () => {
    setIsHeroAnimationComplete(true);
  };

  return (
    <div>
      {!isHelloAnimationComplete && (
        <HelloAnimation onComplete={handleHelloAnimationComplete} />
      )}
      {isHelloAnimationComplete && (
        <Hero onAnimationComplete={handleHeroAnimationComplete} />
      )}
      {isHeroAnimationComplete && <About />}
      {/* Add other sections similarly */}
    </div>
  );
};

export default App;