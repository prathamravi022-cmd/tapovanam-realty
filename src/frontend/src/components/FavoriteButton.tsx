import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useFavorites } from "../hooks/useFavorites";

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
}

export function FavoriteButton({ propertyId, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(propertyId);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(propertyId);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center",
        "glass-light dark:glass-dark shadow-md",
        "transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      data-ocid="favorite-button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {fav ? (
          <motion.span
            key="filled"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1.4, 1], opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
          >
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          </motion.span>
        ) : (
          <motion.span
            key="outline"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Heart className="w-4 h-4 text-white drop-shadow" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
