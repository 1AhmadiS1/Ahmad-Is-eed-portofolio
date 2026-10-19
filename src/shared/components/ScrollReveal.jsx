import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — Triggers a smooth, cascading wave reveal animation
 * when the element or section scrolls into view.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className] - Extra classes
 * @param {number} [props.delay=0] - Delay in milliseconds
 * @param {number} [props.threshold=0.12] - Intersection threshold (0 to 1)
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.12,
}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
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
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
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
