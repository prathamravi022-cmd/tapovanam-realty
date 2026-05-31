import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const doneRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
    }, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-card"
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      data-ocid="splash-screen"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.48 0.15 246 / 0.8) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.68 0.13 64 / 0.8) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* 3D Monogram */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        className="relative mb-6"
        style={{ perspective: "800px" }}
      >
        {/* Outer ring */}
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.48 0.15 246) 0%, oklch(0.68 0.13 64) 100%)",
            boxShadow:
              "0 20px 60px oklch(0.48 0.15 246 / 0.4), 0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
            transform: "perspective(400px) rotateX(5deg)",
          }}
        >
          {/* Inner shine */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)",
            }}
          />
          <span
            className="font-display font-bold text-white relative z-10"
            style={{
              fontSize: "2rem",
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            TR
          </span>
        </div>

        {/* Shadow beneath */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full opacity-30"
          style={{
            background: "oklch(0.48 0.15 246)",
            filter: "blur(6px)",
          }}
        />
      </motion.div>

      {/* Brand Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="font-display font-bold text-foreground text-2xl tracking-tight">
          Tapovanam
        </h1>
        <p className="font-display text-primary text-base font-medium mt-0.5 tracking-wide">
          Realty Services
        </p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-3 text-sm text-muted-foreground tracking-widest uppercase"
      >
        Premium Land & Plots
      </motion.p>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 flex items-center gap-1.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.2,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
