import { gsap } from 'gsap';



export const heroAnimation = (heroRef: HTMLDivElement | null, setCanScroll: (canScroll: boolean) => void) => {
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
          onComplete: () => {
            setCanScroll(true);
          },
        });
      },
    }
  );
};



export const scrollAnimation = (scrollRef: HTMLDivElement | null) => {
    if (!scrollRef) return;
  
    gsap.to(scrollRef, {
      x: '0%',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: scrollRef,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        onEnter: () => {
          document.body.classList.add('lock-screen');
        },
        onLeaveBack: () => {
          document.body.classList.remove('lock-screen');
        },
        onLeave: () => {
          document.body.classList.remove('lock-screen');
        },
      },
    });
  };