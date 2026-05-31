import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface GlassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function GlassModal({
  open,
  onOpenChange,
  title,
  children,
  className,
}: GlassModalProps) {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.visualViewport?.height ?? window.innerHeight);
    };
    window.visualViewport?.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <>
              {/* Blurred overlay */}
              <Dialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 z-50 bg-black/40 blur-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  data-ocid="glass-modal-overlay"
                />
              </Dialog.Overlay>

              {/* Flex container for perfect mobile centering */}
              <Dialog.Content asChild>
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Card container */}
                  <motion.div
                    className={cn(
                      "w-full max-w-sm sm:max-w-md max-h-[80vh] overflow-y-auto",
                      "rounded-2xl shadow-2xl",
                      "glass-light dark:glass-dark",
                      "border border-white/30 dark:border-white/10",
                      className,
                    )}
                    style={{ maxHeight: `${viewportHeight * 0.85}px` }}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 10 }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    data-ocid="glass-modal-dialog"
                  >
                    {/* Header */}
                    {title && (
                      <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/20 dark:border-white/10">
                        <Dialog.Title className="font-display font-semibold text-foreground text-lg">
                          {title}
                        </Dialog.Title>
                        <Dialog.Close asChild>
                          <button
                            type="button"
                            className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-smooth"
                            aria-label="Close"
                            data-ocid="glass-modal-close-button"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </Dialog.Close>
                      </div>
                    )}

                    {/* Body */}
                    <div className="px-6 py-5">{children}</div>
                  </motion.div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
