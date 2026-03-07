import { useEffect, useRef } from "react";

const useFadeIn = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use requestAnimationFrame to ensure layout is settled before observing
    const raf = requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(el);

      // Store cleanup ref
      el._fadeObserver = observer;
    });

    return () => {
      cancelAnimationFrame(raf);
      if (el._fadeObserver) {
        el._fadeObserver.disconnect();
        delete el._fadeObserver;
      }
    };
  }, []);

  return ref;
};

export default useFadeIn;
