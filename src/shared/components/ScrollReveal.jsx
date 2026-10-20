import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — Smooth, high-performance wave reveal animation.
 * Optimized for mobile devices, high refresh rates (60/120Hz), and instant viewport checks.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className] - Extra classes
 * @param {number} [props.delay=0] - Delay in milliseconds
 * @param {number} [props.threshold=0.02] - Intersection threshold (0 to 1)
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.02,
}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    ) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || isRevealed) return;

    // Immediate check: only reveal immediately if already visibly in viewport on page load
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= viewportHeight * 0.75) {
        setIsRevealed(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.04,
        // Triggers as the section arrives into the bottom of the viewport for an eye-appealing wave entrance
        rootMargin: '0px 0px -30px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, isRevealed]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`scroll-reveal ${isRevealed ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
