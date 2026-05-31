import type { ExternalBlob } from "../backend";

/**
 * Returns a displayable URL for an ExternalBlob image.
 * Falls back to the placeholder if the image is null/undefined.
 */
export function getImageUrl(image: ExternalBlob | null | undefined): string {
  if (!image) return "/assets/images/placeholder.svg";
  return image.getDirectURL();
}

/**
 * Returns the primary image URL from an array of images given a primary index.
 */
export function getPrimaryImageUrl(
  images: ExternalBlob[],
  primaryImageIndex: bigint,
): string {
  if (!images || images.length === 0) return "/assets/images/placeholder.svg";
  const idx = Number(primaryImageIndex);
  const image = images[idx] ?? images[0];
  return getImageUrl(image);
}

/**
 * Formats price as a human-readable currency string.
 */
export function formatPrice(price: bigint): string {
  const num = Number(price);
  if (num >= 10_000_000) {
    return `₹${(num / 10_000_000).toFixed(2)} Cr`;
  }
  if (num >= 100_000) {
    return `₹${(num / 100_000).toFixed(2)} L`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

/**
 * Formats area in sq ft with optional sq yard conversion display.
 */
export function formatArea(areaSqFt: number): string {
  if (areaSqFt >= 43560) {
    return `${(areaSqFt / 43560).toFixed(2)} Acres`;
  }
  return `${areaSqFt.toLocaleString("en-IN")} sq ft`;
}
