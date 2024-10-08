'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export const GlowingStarsBackgroundCard: AceternityComponent<{ rows?: number; cols?: number }> = ({
  className,
  children,
  rows = 6,
  cols = 18
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const highlightedStars = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () => Math.floor(Math.random() * rows * cols));
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    return () => clearInterval(interval);
  }, [cols, rows]);

  return (
    <div
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      className={cn(
        'h-full max-h-[20rem] w-full max-w-md rounded-xl border border-[#eaeaea] bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 dark:border-neutral-600',
        className
      )}
    >
      <div className="flex items-center justify-center">
        <div className="grid h-48 w-full gap-[1px] p-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {[...Array(rows * cols)].map((_, idx) => {
            const isGlowing = glowingStars.includes(idx);
            const delay = (idx % 10) * 0.1;
            const staticDelay = idx * 0.01;

            return (
              <div key={`matrix-col-${idx}}`} className="relative flex items-center justify-center">
                <Star isGlowing={mouseEnter ? true : isGlowing} delay={mouseEnter ? staticDelay : delay} />
                {mouseEnter && <Glow delay={staticDelay} />}
                <AnimatePresence mode="wait">{isGlowing && <Glow delay={delay} />}</AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-2 pb-6">{children}</div>
    </div>
  );
};

export const GlowingStarsDescription: AceternityComponent = ({ className, children }) => (
  <p className={cn('max-w-[16rem] text-base text-white', className)}>{children}</p>
);

export const GlowingStarsTitle: AceternityComponent = ({ className, children }) => (
  <h2 className={cn('text-2xl font-bold text-[#eaeaea]', className)}>{children}</h2>
);

const Star: AceternityComponent<{ isGlowing: boolean; delay: number }> = ({ isGlowing, delay }) => (
  <motion.div
    key={delay}
    initial={{ scale: 1 }}
    animate={{ scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1, background: isGlowing ? '#fff' : '#666' }}
    transition={{ duration: 2, ease: 'easeInOut', delay }}
    className={cn('relative z-20 h-[1px] w-[1px] rounded-full bg-[#666]')}
  ></motion.div>
);

const Glow: AceternityComponent<{ delay: number }> = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2, ease: 'easeInOut', delay }}
    exit={{ opacity: 0 }}
    className="absolute left-1/2 z-10 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-blue-500 shadow-2xl shadow-blue-400 blur-[1px]"
  />
);
