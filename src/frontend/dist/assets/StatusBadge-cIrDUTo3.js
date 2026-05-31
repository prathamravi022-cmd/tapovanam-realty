import { B as jsxRuntimeExports, D as cn } from "./index-D6obxqBN.js";
import { B as Badge } from "./badge-DMkhsvL2.js";
function getImageUrl(image) {
  if (!image) return "/assets/images/placeholder.svg";
  return image.getDirectURL();
}
function getPrimaryImageUrl(images, primaryImageIndex) {
  if (!images || images.length === 0) return "/assets/images/placeholder.svg";
  const idx = Number(primaryImageIndex);
  const image = images[idx] ?? images[0];
  return getImageUrl(image);
}
function formatPrice(price) {
  const num = Number(price);
  if (num >= 1e7) {
    return `₹${(num / 1e7).toFixed(2)} Cr`;
  }
  if (num >= 1e5) {
    return `₹${(num / 1e5).toFixed(2)} L`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}
function formatArea(areaSqFt) {
  if (areaSqFt >= 43560) {
    return `${(areaSqFt / 43560).toFixed(2)} Acres`;
  }
  return `${areaSqFt.toLocaleString("en-IN")} sq ft`;
}
function PropertyStatusBadge({
  status,
  className
}) {
  const isAvailable = (status == null ? void 0 : status.toLowerCase()) === "available";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      className: cn(
        "text-xs font-semibold uppercase tracking-wide border-0 px-2.5 py-1 transition-smooth",
        isAvailable ? "bg-amber-500 text-amber-950 shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-[glow-pulse_2s_ease-in-out_infinite]" : "bg-stone-500/80 text-stone-100 shadow-[0_0_8px_rgba(245,158,11,0.15)]",
        className
      ),
      "data-ocid": "property-status-badge",
      children: isAvailable ? "✦ Available" : "● Sold"
    }
  );
}
function LegalStatusBadge({ status, className }) {
  const isApproved = (status == null ? void 0 : status.toLowerCase()) === "approved";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: cn(
        "text-xs font-medium border px-2.5 py-0.5 transition-smooth",
        isApproved ? "border-green-500/50 text-green-700 dark:text-green-400 bg-green-500/10" : "border-orange-400/50 text-orange-700 dark:text-orange-400 bg-orange-400/10",
        className
      ),
      children: isApproved ? "✓ Legally Approved" : "⏳ Pending Approval"
    }
  );
}
export {
  LegalStatusBadge as L,
  PropertyStatusBadge as P,
  formatArea as a,
  getImageUrl as b,
  formatPrice as f,
  getPrimaryImageUrl as g
};
