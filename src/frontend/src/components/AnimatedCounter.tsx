import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Round display value
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          animate(motionVal, value, {
            duration,
            ease: "easeOut",
          });
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasStarted, motionVal]);

  // Re-animate when value changes after initial start
  useEffect(() => {
    if (hasStarted) {
      animate(motionVal, value, {
        duration: duration * 0.6,
        ease: "easeOut",
      });
    }
  }, [value, hasStarted, duration, motionVal]);

  return (
    <motion.span
      ref={containerRef}
      className={cn("tabular-nums", className)}
      data-ocid="animated-counter"
    >
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </motion.span>
  );
}
