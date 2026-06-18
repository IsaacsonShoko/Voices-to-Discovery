import { useReducedMotion, type MotionProps } from "framer-motion";

export function useScrollReveal(delay = 0): MotionProps {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return {
      initial: false,
      whileInView: {},
      viewport: { once: true },
    };
  }

  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}
