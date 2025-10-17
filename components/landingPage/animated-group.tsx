"use client";
import { motion } from "framer-motion";
import clsx from "clsx";

interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  preset?: "slide" | "blur-slide";
}

const presets = {
  slide: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
  "blur-slide": {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

export function AnimatedGroup({
  children,
  className,
  preset = "slide",
}: AnimatedGroupProps) {
  return (
    <motion.div
      className={clsx(className)}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={presets[preset]}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
