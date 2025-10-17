import HeroExampleCards from "./HeroExampleCards";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

export default function Home() {
  const images = [
    "/ex1.png",
    "/ex2.png",
    "/ex3.png",
  ];
  const FAST_DURATION = 20;
  const SLOW_DURATION = 75;

  const [duration, setDuration] = useState(FAST_DURATION);
  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);
  const xRounded = useTransform(xTranslation, (latest) => Math.round(latest));

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (width === 0) return;
    const halfWidth = width / 2;

    const animateFrame = (time: number) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = time;
      }
      const deltaMs = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // pixels per second: traverse halfWidth in `duration` seconds
      const speedPxPerMs = halfWidth / (duration * 1000);
      const deltaPx = speedPxPerMs * deltaMs;

      let nextX = xTranslation.get() - deltaPx;
      // Wrap seamlessly when surpassing halfWidth
      if (nextX <= -halfWidth) {
        nextX += halfWidth;
      }
      xTranslation.set(nextX);

      rafRef.current = requestAnimationFrame(animateFrame);
    };

    rafRef.current = requestAnimationFrame(animateFrame);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [width, duration, xTranslation]);

  return (
    <main className="py-8 relative overflow-hidden">
      <motion.div
        className="relative left-0 inline-flex gap-4 w-max whitespace-nowrap transform-gpu"
        style={{ x: xRounded, willChange: "transform" }}
        ref={ref}
        onHoverStart={() => {
          setDuration(SLOW_DURATION);
        }}
        onHoverEnd={() => {
          setDuration(FAST_DURATION);
        }}
      >
        {[...images, ...images].map((item, idx) => (
          <div className="shrink-0" key={idx}>
            <HeroExampleCards image={item}/>
          </div>
        ))}
      </motion.div>
    </main>
  );
  return <main>Infinite carousel</main>;
}