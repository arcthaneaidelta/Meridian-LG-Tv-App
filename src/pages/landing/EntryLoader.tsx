import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryLoaderProps {
  onComplete: () => void;
}

export const EntryLoader: React.FC<EntryLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    // Check if user already visited in this session
    if (sessionStorage.getItem('meridian_visited')) {
      onComplete();
      return;
    }

    // Adaptive progress fill (700ms - 1100ms)
    const startTime = performance.now();
    const duration = 850;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsWiping(true);
          sessionStorage.setItem('meridian_visited', 'true');
          setTimeout(onComplete, 480);
        }, 120);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isWiping && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.52, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg select-none"
        >
          {/* Logo Mark + Wordmark */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-10 w-10 items-center justify-center rounded-md bg-screen border border-primary/40 shadow-sh-2"
            >
              <div className="h-4 w-5 rounded-xs bg-primary" />
              <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-accent" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl font-medium tracking-tight text-app-text"
            >
              Meridian
            </motion.span>
          </div>

          {/* 1px Progress Line */}
          <div className="mt-6 h-[2px] w-[140px] overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-primary transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted">
            Initializing webOS Engine
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
