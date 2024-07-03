import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const useHeroAnimation = (isHelloAnimationComplete: boolean, onAnimationComplete?: () => void) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationCompletedRef = useRef(false);

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
          setupScrollAnimations(hero, scroll, animationCompletedRef, onAnimationComplete);
        }
      });
    }

  }, [isHelloAnimationComplete, onAnimationComplete]);

  return { heroRef, scrollRef };
};

const setupScrollAnimations = (
  heroContainer: HTMLElement, 
  scrollText: HTMLElement, 
  animationCompletedRef: React.MutableRefObject<boolean>,
  onAnimationComplete?: () => void
) => {
  console.log('Setting up scroll animations');
  
  let scrollProgress = 0;
  const maxScroll = 100;

  const updateAnimation = () => {
    if (scrollProgress <= 100) {
      // Stage 1: Move the text
      gsap.set(scrollText, { x: `${100 - scrollProgress}%` });
    }

    console.log('Scroll progress:', scrollProgress);
    
    if (scrollProgress >= 100 && !animationCompletedRef.current) {
      animationCompletedRef.current = true;
      
      // Animate the hero section upwards
      gsap.to(heroContainer, {
        y: '-100%',
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          onAnimationComplete?.();
          console.log('Hero animation complete, triggering next section');
          document.removeEventListener('wheel', wheelHandler);
          document.body.style.overflow = 'auto';
        }
      });
    }
  };

  const wheelHandler = (e: WheelEvent) => {
    e.preventDefault();
    scrollProgress = Math.min(scrollProgress + Math.abs(e.deltaY) / 4, maxScroll);
    updateAnimation();
  };

  document.addEventListener('wheel', wheelHandler, { passive: false });
};