import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export function ThreeDCard({
  children,
  className,
  intensity = 15,
  glare = true,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]),
    springConfig,
  );
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
  }

  function handleMouseEnter() {
    scale.set(1.02);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el || !e.touches[0]) return;
    const rect = el.getBoundingClientRect();
    const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
    const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
    rawX.set(x * 0.5);
    rawY.set(y * 0.5);
  }

  function handleTouchEnd() {
    rawX.set(0);
    rawY.set(0);
  }

  const glareGradient = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
  );

  return (
    <div ref={cardRef} className={cn("card-tilt", className)}>
      <motion.div
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-full"
      >
        {children}
        {glare && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none z-10"
            style={{ background: glareGradient }}
          />
        )}
      </motion.div>
    </div>
  );
}
