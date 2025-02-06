import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

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
      // Animate the "I build things for the web" text
      gsap.to(slideLeftText, {
        x: '0%',
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          console.log('Slide left animation complete');
          setupScrollAnimations(scroll, animationCompletedRef, onAnimationComplete);
        }
      });

      // Animate background color
      gsap.to(hero, {
        backgroundColor: finalColor,
        duration: 1,
        ease: 'power2.inOut',
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
  const maxScroll = 162;
  const fallMaxScroll = maxScroll + 50;

  const randomValues = Array.from(wordSpans).map(() => ({
    x: (Math.random() - 0.5) * 300,
    scale: 0.2 + Math.random() * 2.5,
    fallDelay: Math.random() * 0.5,
    fallDistance: 50 + Math.random() * 30
  }));

  const updateAnimation = () => {
    wordSpans.forEach((span, index) => {
      const delay = index * 0.1;
      
      
      if (scrollProgress <= maxScroll) {
        // Initial slide-in animation
        const progress = Math.max(0, Math.min(1, (scrollProgress - delay * 50) / 100));
        gsap.to(span, {
          x: `${100 - progress * 100}%`,
          y: '0',
          opacity: progress,
          filter: `blur(${20 - progress * 20}px)`,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        const { x, scale, fallDelay, fallDistance } = randomValues[index];
        // Calculate fall animation progress
        const fallProgress = (scrollProgress - maxScroll) / (fallMaxScroll - maxScroll);
        const adjustedProgress = Math.max(0, fallProgress - fallDelay);
        
        // Calculate opacity based on fall progress
        const opacity = Math.max(0, 1 - adjustedProgress * 2);

        gsap.to(span, {
          x: `${x * adjustedProgress}px`,
          y: `${fallDistance * adjustedProgress}vh`,
          opacity,
          scale: 1 + (scale - 1) * adjustedProgress,
          filter: 'blur(0px)',
          duration: 0.2,
          ease: 'power2.inOut',
          onComplete: () => {
            if (opacity === 0 && index === wordSpans.length - 1 && !animationCompletedRef.current) {
              animationCompletedRef.current = true;
              onAnimationComplete?.();
            }
          }
        });
      }
    });
  };

  const wheelHandler = (e: WheelEvent) => {
    if (!animationCompletedRef.current) {
      e.preventDefault();
      const delta = Math.abs(e.deltaY) / 3;
      // This is key - we need to handle the scroll direction explicitly
      const newProgress = scrollProgress + (e.deltaY > 0 ? delta : -delta);
      scrollProgress = Math.max(0, Math.min(fallMaxScroll, newProgress));
      updateAnimation();
    }
  };

  let touchStartY = 0;
  const touchStartHandler = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY;
  };

  const touchMoveHandler = (e: TouchEvent) => {
    if (!animationCompletedRef.current) {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const delta = Math.abs(deltaY) / 3;
      const newProgress = scrollProgress + (deltaY > 0 ? delta : -delta);
      scrollProgress = Math.max(0, Math.min(fallMaxScroll, newProgress));
      touchStartY = touchY;
      updateAnimation();
    }
  };

  document.addEventListener('wheel', wheelHandler, { passive: false });
  document.addEventListener('touchstart', touchStartHandler, { passive: false });
  document.addEventListener('touchmove', touchMoveHandler, { passive: false });

  return () => {
    document.removeEventListener('wheel', wheelHandler);
    document.removeEventListener('touchstart', touchStartHandler);
    document.removeEventListener('touchmove', touchMoveHandler);
  };
};