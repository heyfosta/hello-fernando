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
          setupScrollAnimations(hero, scroll, animationCompletedRef, onAnimationComplete);
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
  heroContainer: HTMLElement,
  scrollText: HTMLElement,
  animationCompletedRef: React.MutableRefObject<boolean>,
  onAnimationComplete?: () => void
) => {
  console.log('Setting up scroll animations');

  const wordSpans = scrollText.querySelectorAll('span');

  let scrollProgress = 0;
  const maxScroll = 162;

  const updateAnimation = () => {
    let allWordsFullyVisible = true;

    wordSpans.forEach((span, index) => {
      const delay = index * 0.1;
      const progress = Math.max(0, Math.min(1, (scrollProgress - delay * 50) / 100));

      gsap.to(span, {
        x: `${100 - progress * 100}%`,
        opacity: progress,
        filter: `blur(${20 - progress * 20}px)`,
        duration: 0.3,
        ease: 'power2.out'
      });

      if (progress < 1) {
        allWordsFullyVisible = false;
      }
    });

    console.log('Scroll progress:', scrollProgress, 'All words fully visible:', allWordsFullyVisible);

    if (scrollProgress >= maxScroll && allWordsFullyVisible && !animationCompletedRef.current) {
      animationCompletedRef.current = true;

      // Parallax effect with words shooting down
      gsap.to(wordSpans, {
        y: '100vh',
        opacity: 0,
        scale: 0.5,
        stagger: 0.05,
        ease: 'power3.in',
        duration: 1.5
      });

      // Animate the hero section upwards
      gsap.to(heroContainer, {
        y: '-100%',
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 0.5,
        onComplete: () => {
          onAnimationComplete?.();
          console.log('Hero animation complete, triggering next section');
          removeEventListeners();
          document.body.style.overflow = 'auto';
        }
      });
    }
  };

  const wheelHandler = (e: WheelEvent) => {
    e.preventDefault();
    scrollProgress = Math.min(scrollProgress + Math.abs(e.deltaY) / 3, maxScroll);
    updateAnimation();
  };

  let touchStartY = 0;
  const touchStartHandler = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY;
  };

  const touchMoveHandler = (e: TouchEvent) => {
    e.preventDefault();
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    scrollProgress = Math.min(scrollProgress + Math.abs(deltaY) / 3, maxScroll);
    touchStartY = touchY;
    updateAnimation();
  };

  const removeEventListeners = () => {
    document.removeEventListener('wheel', wheelHandler);
    document.removeEventListener('touchstart', touchStartHandler);
    document.removeEventListener('touchmove', touchMoveHandler);
  };

  document.addEventListener('wheel', wheelHandler, { passive: false });
  document.addEventListener('touchstart', touchStartHandler, { passive: false });
  document.addEventListener('touchmove', touchMoveHandler, { passive: false });
};