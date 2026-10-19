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
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If user prefers reduced motion or no IntersectionObserver, reveal immediately
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    ) {
      setIsRevealed(true);
      return;
    }

    // Immediate check: if element is already within viewport on initial render, reveal immediately
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 100) {
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
        threshold,
        // Generous positive rootMargin triggers reveal slightly before entering view,
        // eliminating lag and visible pop-in on mobile phones and desktops
        rootMargin: '100px 0px 50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Safety fallback for mobile phones (iOS Safari/Android low power modes)
    // Ensures content is NEVER stuck invisible
    const fallbackTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [threshold]);

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
