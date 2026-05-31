import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Heart,
  Loader2,
  PackageOpen,
  Search,
} from "lucide-react";
import { motion } from "motion/react";

type AnimationType = "loading" | "empty" | "search" | "success" | "heart";
type AnimationSize = "sm" | "md" | "lg";

const sizeMap: Record<AnimationSize, string> = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

const iconSizeMap: Record<AnimationSize, number> = {
  sm: 20,
  md: 40,
  lg: 56,
};

interface LottieAnimationProps {
  type: AnimationType;
  size?: AnimationSize;
  className?: string;
}

export function LottieAnimation({
  type,
  size = "md",
  className,
}: LottieAnimationProps) {
  const sz = iconSizeMap[size];

  const animations: Record<AnimationType, React.ReactNode> = {
    loading: (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1,
          ease: "linear",
        }}
      >
        <Loader2 size={sz} className="text-primary" />
      </motion.div>
    ),

    empty: (
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <PackageOpen size={sz} className="text-muted-foreground" />
      </motion.div>
    ),

    search: (
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2.5,
          ease: "easeInOut",
        }}
      >
        <Search size={sz} className="text-primary" />
      </motion.div>
    ),

    success: (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <CheckCircle2
          size={sz}
          className="text-green-500 dark:text-green-400"
        />
      </motion.div>
    ),

    heart: (
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 0.8,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
      >
        <Heart size={sz} className="text-red-500 fill-red-500" />
      </motion.div>
    ),
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        sizeMap[size],
        className,
      )}
      data-ocid="lottie-animation"
    >
      {animations[type]}
    </div>
  );
}
