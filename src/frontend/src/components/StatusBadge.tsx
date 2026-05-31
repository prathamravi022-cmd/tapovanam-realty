import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LegalStatus, PropertyStatus } from "../backend";

interface PropertyStatusBadgeProps {
  status: PropertyStatus;
  className?: string;
}

export function PropertyStatusBadge({
  status,
  className,
}: PropertyStatusBadgeProps) {
  const isAvailable = status?.toLowerCase() === "available";
  return (
    <Badge
      className={cn(
        "text-xs font-semibold uppercase tracking-wide border-0 px-2.5 py-1 transition-smooth",
        isAvailable
          ? "bg-amber-500 text-amber-950 shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-[glow-pulse_2s_ease-in-out_infinite]"
          : "bg-stone-500/80 text-stone-100 shadow-[0_0_8px_rgba(245,158,11,0.15)]",
        className,
      )}
      data-ocid="property-status-badge"
    >
      {isAvailable ? "✦ Available" : "● Sold"}
    </Badge>
  );
}

interface LegalStatusBadgeProps {
  status: LegalStatus;
  className?: string;
}

export function LegalStatusBadge({ status, className }: LegalStatusBadgeProps) {
  const isApproved = status?.toLowerCase() === "approved";
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium border px-2.5 py-0.5 transition-smooth",
        isApproved
          ? "border-green-500/50 text-green-700 dark:text-green-400 bg-green-500/10"
          : "border-orange-400/50 text-orange-700 dark:text-orange-400 bg-orange-400/10",
        className,
      )}
    >
      {isApproved ? "✓ Legally Approved" : "⏳ Pending Approval"}
    </Badge>
  );
}
