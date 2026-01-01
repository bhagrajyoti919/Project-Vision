"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
  className,
  boxClassName
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.span
        layoutId="subtext"
        className="font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        {text}
      </motion.span>
      <motion.span
        layout
        className={cn("relative w-fit overflow-hidden rounded-md border border-transparent bg-white px-2 py-1 font-sans font-bold tracking-tight text-black shadow-sm ring shadow-black/10 ring-black/10 drop-shadow-lg dark:bg-neutral-900 dark:text-white dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10", boxClassName)}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -20, filter: "blur(5px)" }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ y: 20, filter: "blur(5px)", opacity: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="inline-block whitespace-nowrap">
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
};
