import { Variants } from 'framer-motion';

export const easeOutCustom = [0.22, 1, 0.36, 1] as const;
export const easeInOutCustom = [0.65, 0, 0.35, 1] as const;

// 1. Rise: opacity 0->1, translateY 16->0 px, 520 ms ease-out
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: easeOutCustom },
  },
};

// 2. Stagger container: children use Rise with 60ms offsets
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// 3. Mask reveal: clip-path inset(0 0 100% 0) -> inset(0), 520ms
export const maskRevealVariants: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.52, ease: easeOutCustom },
  },
};

// Simple fade
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.26, ease: easeOutCustom } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } },
};

// Drawer slide from right
export const drawerVariants: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.26, ease: easeOutCustom } },
  exit: { x: '100%', opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } },
};

// Modal scale up
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.26, ease: easeOutCustom } },
  exit: { opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.18, ease: 'easeIn' } },
};
