'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export const DirectionAwareHover: AceternityComponent<{
  src: string;
  childrenClassName?: string;
  imageClassName?: string;
}> = ({ src, children, childrenClassName, imageClassName, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  const variants = {
    initial: { x: 0 },
    exit: { x: 0, y: 0 },
    top: { y: 20 },
    bottom: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  };

  const textVariants = {
    initial: { y: 0, x: 0, opacity: 0 },
    exit: { y: 0, x: 0, opacity: 0 },
    top: { y: -20, opacity: 1 },
    bottom: { y: 2, opacity: 1 },
    left: { x: -2, opacity: 1 },
    right: { x: 20, opacity: 1 }
  };

  const [direction, setDirection] = useState<DirectionSide>('left');

  const getDirection = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>, obj: HTMLElement) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = e.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = e.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  }, []);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!ref.current) return;

      const direction = getDirection(event, ref.current);

      switch (direction) {
        case 0:
          setDirection('top');
          break;
        case 1:
          setDirection('right');
          break;
        case 2:
          setDirection('bottom');
          break;
        case 3:
          setDirection('left');
          break;
        default:
          setDirection('left');
          break;
      }
    },
    [getDirection]
  );

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        'group/card relative h-60 w-60 overflow-hidden rounded-lg bg-transparent md:h-96 md:w-96',
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div className="relative h-full w-full" initial="initial" whileHover={direction} exit="exit">
          <motion.div className="absolute inset-0 z-10 hidden h-full w-full bg-black/40 transition duration-500 group-hover/card:block" />
          <motion.div
            variants={variants}
            className="relative h-full w-full bg-gray-50 dark:bg-black"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Image
              alt="image"
              className={cn('h-full w-full scale-[1.15] object-cover', imageClassName)}
              width="1000"
              height="1000"
              src={src}
            />
          </motion.div>
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={cn('absolute bottom-4 left-4 z-40 text-white', childrenClassName)}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
