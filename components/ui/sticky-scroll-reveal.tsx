'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const StickyScroll: AceternityComponent<{
  content: StickyScrollItem[];
  contentClassName?: string;
}> = ({ content, contentClassName }) => {
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({ container: ref, offset: ['start start', 'end start'] });

  const backgroundColors = ['var(--slate-900)', 'var(--black)', 'var(--neutral-900)'];
  const linearGradients = useMemo(
    () => [
      'linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))',
      'linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))',
      'linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))'
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const breakpoints = content.map((_, index) => index / content.length);
    const closest = breakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      return distance < Math.abs(latest - breakpoints[acc]) ? index : acc;
    }, 0);

    setActiveIndex(closest);
  });

  useEffect(
    () => setBackgroundGradient(linearGradients[activeIndex % linearGradients.length]),
    [activeIndex, linearGradients]
  );

  return (
    <motion.div
      ref={ref}
      animate={{ backgroundColor: backgroundColors[activeIndex % backgroundColors.length] }}
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.id} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeIndex === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeIndex === index ? 1 : 0.3 }}
                className="text-kg mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn('sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block', contentClassName)}
      >
        {content[activeIndex].content ?? null}
      </div>
    </motion.div>
  );
};

type StickyScrollItem = { id: React.Key; title: string; description: string; content?: StringNode };
