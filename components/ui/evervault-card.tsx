'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { generateRandomString } from '@/lib/utils/string';

export const EvervaultCard: AceternityComponent<{ text?: string }> = ({ text, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState('');

  useEffect(() => setRandomString(generateRandomString(1500)), []);

  const onMouseMove = useCallback(
    ({ currentTarget, clientX, clientY }: any) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);

      setRandomString(generateRandomString(1500));
    },
    [mouseX, mouseY]
  );

  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      className={cn(
        'relative flex aspect-square h-full w-full items-center justify-center bg-transparent p-0.5',
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-transparent"
      >
        <div className="pointer-events-none">
          <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 backdrop-blur-xl transition duration-500 group-hover/card:opacity-100"
            style={style}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
            style={style}
          >
            <p className="absolute inset-x-0 h-full whitespace-pre-wrap break-words font-mono text-xs font-bold text-white transition duration-500">
              {randomString}
            </p>
          </motion.div>
        </div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full text-4xl font-bold text-white">
            <div className="absolute h-full w-full rounded-full bg-white/[0.8] blur-sm dark:bg-black/[0.8]" />
            <span className="z-20 text-black dark:text-white">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Icon = ({ ...rest }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    {...rest}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);
