import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/gsap';
import { scrollToTop } from '../lib/smoothScroll';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop(true);
    const r = requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      cancelAnimationFrame(r);
      clearTimeout(t);
    };
  }, [pathname]);
  return null;
}
