import { useEffect, useRef, useState } from 'react';

export default function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!options.repeat) observer.unobserve(el);
        } else if (options.repeat) {
          setIsVisible(false);
        }
      },
      { threshold: options.threshold || 0.1, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.repeat]);

  return [ref, isVisible];
}
