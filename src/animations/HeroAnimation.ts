//src/animations/HeroAnimation.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const heroAnimation = (heroRef: HTMLDivElement | null, onComplete: () => void) => {
  if (!heroRef) return;

  const slideLeftText = heroRef.querySelector('.slide-left h3');
  if (!slideLeftText) return;

  gsap.fromTo(
    slideLeftText,
    { x: '-200%', opacity: 0 },
    {
      x: '100%',
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(slideLeftText, {
          x: '0%',
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          onComplete: onComplete,
        });
      },
    }
  );
};

gsap.registerPlugin(ScrollTrigger);
export const scrollAnimation = (scrollRef: HTMLDivElement | null) => {
  if (!scrollRef) return;

  const parentContainer = scrollRef.closest('.hero-container') as HTMLElement;
  if (!parentContainer) return;

  const isMobile = window.innerWidth < 768; // Adjust this breakpoint as needed

  gsap.timeline({
    scrollTrigger: {
      trigger: parentContainer,
      start: "top top",
      end: isMobile ? "+=150%" : "+=100%", // More scroll space on mobile
      scrub: 1,
      pin: parentContainer,
      pinSpacing: false,
      onUpdate: (self) => {
        if (self.progress <= 0.5) {
          // First half of the scroll: move the copy from right to left
          gsap.set(scrollRef, { 
            x: `${(1 - self.progress * 2) * 100}%`, // Changed from 200% to 100%
            position: 'relative',
          });
        } else {
          // Second half of the scroll: keep copy at 0 and allow scrolling
          gsap.set(scrollRef, { 
            x: '0%',
            position: 'relative',
          });
          
          // Unpin the hero component
          gsap.set(parentContainer, {
            y: `-${(self.progress - 0.5) * (isMobile ? 200 : 300)}%` // Adjusted for mobile
          });
        }
      },
      onLeave: () => {
        gsap.set(parentContainer, { y: '-100%' });
      },
      onLeaveBack: () => {
        gsap.set(parentContainer, { y: '0%' });
      }
    }
  });
};