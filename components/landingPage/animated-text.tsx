"use client";
import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { JSX } from "react";

interface AnimatedTextProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export function AnimatedText({
  as: Component = "p",
  className,
  children,
  delay = 0,
}: AnimatedTextProps) {
  // Framer Motion doesn't type motion(Component) well by default,
  // so we manually tell TypeScript it's a React.ElementType
  const MotionComponent = motion(Component as React.ElementType);

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={clsx(className)}
    >
      {children}
    </MotionComponent>
  );
}
