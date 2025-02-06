import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

// Animation Configuration
const CONFIG = {
  // Controls the initial text slide-in from left to right
  slideIn: {
    duration: 1,        // Time in seconds for slide animation
    ease: 'power2.out'  // Easing function: starts fast, slows at end
  },
  
  // Controls background color fade transition
  backgroundTransition: {
    duration: 1,          // Time in seconds for color change
    ease: 'power2.inOut'  // Smooth acceleration and deceleration
  },
  
  // Controls main scroll behavior
  scroll: {
    maxScroll: 10,        // Maximum scroll distance before animation completes
    fallOffset: 50,       // Extra scroll distance allowed for fall animation
    scrollSensitivity: 3  // Divides scroll input - higher = less sensitive
  },
  
  // Controls timing for individual word animations
  wordAnimation: {
    delayBetweenWords: 0.1,  // Stagger delay between each word's animation
    initialAnimation: {
      duration: 0.7,         // Time for each word's initial appear animation
      ease: 'power2.out',    // Easing function for smooth appearance
      blurMax: 20            // Maximum blur amount in pixels
    },
    fallAnimation: {
      duration: 0.2,         // Time for fall transition
      ease: 'power2.inOut'   // Smooth fall movement
    },
  },
  
  // Controls random falling behavior
  fallAnimation: {
    scale: {
      min: 0.2,    // Smallest size multiplier when falling
      max: 8.5     // Largest size multiplier when falling
    },
    spread: {
      x: 300,          // Maximum horizontal spread in pixels
      delayMax: 0.8,   // Maximum random delay before falling
      distanceMin: 30, // Minimum fall distance in viewport height
      distanceMax: 60  // Additional random distance added to minimum
    }
  },
  
  // Controls distinct animation stages
  stages: {
    scrollIn: {
      maxScroll: 8,     // Scroll amount needed for initial text reveal
      threshold: 0.95,    // Progress (0-1) when rain effect begins
      pauseThreshold: 13
    },
    rain: {
      maxScroll: 300,    // Scroll amount needed for rain animation
      fallOffset: 150    // Additional scroll allowed for fall completion
    }
  }
};
interface UseHeroAnimationProps {
  isHelloAnimationComplete: boolean;
  onAnimationComplete?: () => void;
  initialColor: string;
  finalColor: string;
}

export const useHeroAnimation = ({
  isHelloAnimationComplete,
  onAnimationComplete,
  initialColor,
  finalColor
}: UseHeroAnimationProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationCompletedRef = useRef(false);
  const [backgroundColor, setBackgroundColor] = useState(initialColor);

  useEffect(() => {
    console.log('HeroAnimation effect running');
    const hero = heroRef.current;
    const scroll = scrollRef.current;
    if (!hero || !scroll) {
      console.log('Hero or scroll ref not found');
      return;
    }

    const slideLeftText = hero.querySelector('.slide-left h3');
    if (!slideLeftText) {
      console.log('Slide left text not found');
      return;
    }

    if (isHelloAnimationComplete && !animationCompletedRef.current) {
      gsap.to(slideLeftText, {
        x: '0%',
        duration: CONFIG.slideIn.duration,
        ease: CONFIG.slideIn.ease,
        onComplete: () => {
          console.log('Slide left animation complete');
          setupScrollAnimations(scroll, animationCompletedRef, onAnimationComplete);
        }
      });

      gsap.to(hero, {
        backgroundColor: finalColor,
        duration: CONFIG.backgroundTransition.duration,
        ease: CONFIG.backgroundTransition.ease,
        onUpdate: () => {
          setBackgroundColor(gsap.getProperty(hero, 'backgroundColor') as string);
        }
      });
    }
  }, [isHelloAnimationComplete, onAnimationComplete, finalColor]);

  return { heroRef, scrollRef, backgroundColor };
};

const setupScrollAnimations = (
  scrollText: HTMLElement,
  animationCompletedRef: React.MutableRefObject<boolean>,
  onAnimationComplete?: () => void
) => {
  const wordSpans = scrollText.querySelectorAll('span');
  let scrollProgress = 0;
  let currentStage = 'scrollIn';
  let hasTriggeredTransition = false;

  const randomValues = Array.from(wordSpans).map(() => ({
    x: (Math.random() - 0.5) * CONFIG.fallAnimation.spread.x,
    scale: CONFIG.fallAnimation.scale.min + Math.random() * CONFIG.fallAnimation.scale.max,
    fallDelay: Math.random() * CONFIG.fallAnimation.spread.delayMax,
    fallDistance: CONFIG.fallAnimation.spread.distanceMin + Math.random() * CONFIG.fallAnimation.spread.distanceMax
  }));

  const handleStageTransition = () => {
    if (!hasTriggeredTransition) {
      hasTriggeredTransition = true;
      onAnimationComplete?.();
      document.body.style.overflow = 'auto';
      const nextSection = document.querySelector('.section-wrapper:nth-child(2)');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const updateAnimation = () => {
    const normalizedProgress = scrollProgress / CONFIG.stages.scrollIn.maxScroll;
  
    wordSpans.forEach((span, index) => {
      const delay = index * CONFIG.wordAnimation.delayBetweenWords;
      
      if (currentStage === 'scrollIn') {
        const progress = Math.max(0, Math.min(1, (normalizedProgress - delay * 0.1)));
        gsap.to(span, {
          x: `${100 - progress * 100}%`,
          y: '0',
          opacity: progress,
          filter: `blur(${CONFIG.wordAnimation.initialAnimation.blurMax - progress * CONFIG.wordAnimation.initialAnimation.blurMax}px)`,
          scale: 1,
          duration: CONFIG.wordAnimation.initialAnimation.duration,
          ease: CONFIG.wordAnimation.initialAnimation.ease
        });
  
        if (normalizedProgress >= 1) {
          currentStage = 'pause';
        }
      } else if (currentStage === 'pause') {
        gsap.to(span, {
          x: '0%',
          y: '0',
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)'
        });
  
        if (normalizedProgress >= CONFIG.stages.scrollIn.pauseThreshold) {
          currentStage = 'rain';
          wordSpans.forEach((span, i) => {
            const { x, scale, fallDelay, fallDistance } = randomValues[i];
            gsap.fromTo(span,
              { 
                x: '0%',
                y: '0vh',
                opacity: 1,
                scale: 1
              },
              {
                x: `${x}px`,
                y: `${fallDistance}vh`,
                opacity: 0,
                scale: scale,
                duration: 2 + fallDelay,
                ease: 'power1.in',
                repeat: -1,
                delay: fallDelay,
                onRepeat: function() {
                  gsap.set(this.targets()[0], {
                    x: '0%',
                    y: '0vh',
                    opacity: 1,
                    scale: 1
                  });
                }
              }
            );
          });
        }
      }
    });
  };

  const handleScroll = (delta: number, isForward: boolean) => {
    const maxScroll = CONFIG.stages.scrollIn.maxScroll + CONFIG.stages.rain.maxScroll;
    const newProgress = scrollProgress + (isForward ? delta : 0);
    
    if (newProgress >= maxScroll) {
      handleStageTransition();
      return;
    }

    scrollProgress = Math.max(0, Math.min(maxScroll, newProgress));
    updateAnimation();
  };

  // Rest of the event handlers remain the same
  const wheelHandler = (e: WheelEvent) => {
    const delta = Math.abs(e.deltaY) / CONFIG.scroll.scrollSensitivity;
    handleScroll(delta, e.deltaY > 0);
  };

  let touchStartY = 0;
  const touchStartHandler = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY;
  };

  const touchMoveHandler = (e: TouchEvent) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    const delta = Math.abs(deltaY) / CONFIG.scroll.scrollSensitivity;
    
    handleScroll(delta, deltaY > 0);
    touchStartY = touchY;
  };

  document.addEventListener('wheel', wheelHandler, { passive: true });
  document.addEventListener('touchstart', touchStartHandler, { passive: true });
  document.addEventListener('touchmove', touchMoveHandler, { passive: true });

  return () => {
    document.removeEventListener('wheel', wheelHandler);
    document.removeEventListener('touchstart', touchStartHandler);
    document.removeEventListener('touchmove', touchMoveHandler);
  };
};