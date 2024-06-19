import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

interface HelloAnimationProps {
  onComplete: () => void;
}

const HelloAnimation: React.FC<HelloAnimationProps> = ({ onComplete }) => {
  const animationRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const helloPhrases = [
      'Hello',
      'Hola',
      'Olá',
      'Bonjour',
      'Ciao',
      '你好',
      'Hallo',
      'こんにちは',
      '안녕하세요',
      'مرحبا',
      'नमस्ते',
      'Merhaba',
    ];

    const timeline = gsap.timeline();

    // Animation for the first phrase (Hello)
    timeline.to(animationRef.current, {
      duration: 1.5,
      text: helloPhrases[0],
      ease: 'power1.inOut',
      onComplete: () => {
        // Add a delay of 0.1 seconds after the first phrase finishes animating
        timeline.to(animationRef.current, {
          duration: 0.1,
          onComplete: () => {
            // Set the initial duration for the subsequent phrases
            let duration = 1.5;

            // Animation for the subsequent phrases
            for (let i = 1; i < helloPhrases.length; i++) {
              timeline.set(animationRef.current, {
                text: helloPhrases[i],
                delay: duration,
              });

              // Gradually decrease the duration for each subsequent phrase, but not faster than 0.1 seconds
              duration = Math.max(duration * 0.5, 0.1);

              // Check if it's the last phrase
              if (i === helloPhrases.length - 1) {
                timeline.set(animationRef.current, {
                  text: helloPhrases[i],
                  delay: duration,
                  onComplete: () => {
                    // Hide the text immediately
                    gsap.set(animationRef.current, { opacity: 0 });

                    // Start the split animation
                    gsap.to(topHalfRef.current, {
                      duration: 1,
                      y: '-100%',
                      ease: 'power2.inOut',
                      delay: -0.2,
                    });
                    gsap.to(bottomHalfRef.current, {
                      duration: 1,
                      y: '100%',
                      ease: 'power2.inOut',
                      onComplete: onComplete,
                    });
                  },
                });
              }
            }
          },
        });
      },
    });

    return () => {
      timeline.kill();
    };
  }, []); // Empty dependency array

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div
          ref={animationRef}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white"
        ></div>
      </div>
      <div ref={topHalfRef} className="absolute inset-0 bg-black z-20"></div>
      <div ref={bottomHalfRef} className="absolute inset-0 bg-black z-20"></div>
    </div>
  );
};

export default HelloAnimation;