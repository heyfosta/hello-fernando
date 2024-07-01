// src/animations/HeroAnimation.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const heroAnimation = (heroRef: HTMLDivElement | null, onComplete: () => void) => {
  if (!heroRef) return;

  const slideLeftText = heroRef.querySelector('.slide-left h3');
  const scrollSection = heroRef.querySelector('.scroll-section');
  if (!slideLeftText || !scrollSection) return;

  const tl = gsap.timeline();

  tl.fromTo(
    slideLeftText,
    { x: '-200%', opacity: 0 },
    {
      x: '100%',
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }
  ).to(slideLeftText, {
    x: '0%',
    duration: 0.5,
    ease: 'elastic.out(1, 0.5)',
  });

  // Set up scroll animation
  ScrollTrigger.create({
    trigger: heroRef,
    start: "top top",
    end: "+=200%",
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      if (self.progress <= 0.5) {
        gsap.set(scrollSection, {
          x: `${(1 - self.progress * 2) * 100}%`,
        });
      } else {
        const slideUpProgress = (self.progress - 0.5) * 2;
        gsap.set(heroRef, {
          y: `-${slideUpProgress * 100}%`,
        });
      }
    },
    onLeave: () => {
      gsap.set(heroRef, { y: '-100%' });
      onComplete();
    },
    onLeaveBack: () => {
      gsap.set(heroRef, { y: '0%' });
    }
  });
};