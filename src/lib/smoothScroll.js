import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

/* Scroll à inertie (Lenis) synchronisé avec GSAP ScrollTrigger.
   C'est la « respiration » du site : le scroll devient fluide et pondéré,
   et toutes les scènes ScrollTrigger restent calées dessus.
   Désactivé si prefers-reduced-motion (scroll natif). Touch = natif (perf). */

let lenis = null;
let tick = null;

export function getLenis() {
  return lenis;
}

export function initSmoothScroll() {
  if (typeof window === 'undefined' || lenis) return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  });

  lenis.on('scroll', ScrollTrigger.update);

  tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroySmoothScroll() {
  if (!lenis) return;
  if (tick) gsap.ticker.remove(tick);
  lenis.destroy();
  lenis = null;
  tick = null;
}

/* Verrouille / déverrouille le scroll (ex. menu ouvert). */
export function lockScroll(locked) {
  if (lenis) {
    locked ? lenis.stop() : lenis.start();
  }
}

/* Va en haut (changement de page). */
export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}
