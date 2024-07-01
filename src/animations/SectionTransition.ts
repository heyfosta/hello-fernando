// src/animations/SectionTransition.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const setupSectionTransition = (
  currentSection: HTMLElement,
  nextSection: HTMLElement
) => {
  ScrollTrigger.create({
    trigger: currentSection,
    start: "top top",
    end: "+=100%",
    pin: true,
    pinSpacing: false,
    onLeave: () => {
      gsap.to(currentSection, {
        y: '-100%',
        duration: 0.5,
        onComplete: () => {
          // Reveal next section if needed
          gsap.set(nextSection, { visibility: 'visible' });
        }
      });
    },
    onEnterBack: () => {
      gsap.to(currentSection, {
        y: '0%',
        duration: 0.5
      });
    }
  });
};