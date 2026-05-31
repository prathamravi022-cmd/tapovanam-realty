import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, Ruler, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Property } from "../backend";
import { formatArea, formatPrice, getPrimaryImageUrl } from "../utils/imageUrl";
import { FavoriteButton } from "./FavoriteButton";
import { PropertyStatusBadge } from "./StatusBadge";
import { ThreeDCard } from "./ThreeDCard";

interface PropertyCardProps {
  property: Property;
  index?: number;
  dealerWhatsApp?: string;
}

export function PropertyCard({
  property,
  index = 0,
  dealerWhatsApp,
}: PropertyCardProps) {
  const imageUrl = getPrimaryImageUrl(
    property.images,
    property.primaryImageIndex,
  );
  const isAvailable = property.status?.toLowerCase() === "available";

  // "New" badge: added within last 7 days
  const isNew =
    Date.now() - Number(property.dateAdded) / 1_000_000 <
    7 * 24 * 60 * 60 * 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: "easeOut" }}
    >
      <ThreeDCard intensity={12}>
        <Link
          to="/property/$id"
          params={{ id: property.propertyId }}
          className="block group outline-none"
          data-ocid="property-card"
        >
          <article
            className={[
              "bg-card rounded-2xl overflow-hidden shadow-xl transition-smooth",
              "focus-within:ring-2 focus-within:ring-ring",
              !isAvailable ? "opacity-80" : "",
            ].join(" ")}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-[200px] w-full">
              <img
                src={imageUrl}
                alt={property.title}
                className="w-full h-full object-cover transition-smooth duration-500 group-hover:scale-108"
                loading="lazy"
              />
              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

              {/* Price badge top right */}
              <div className="absolute top-3 right-3">
                <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1.5 rounded-xl shadow-gold-glow">
                  {formatPrice(property.price)}
                </span>
              </div>

              {/* Status badge top left */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <PropertyStatusBadge status={property.status} />
                {isNew && (
                  <Badge className="text-[10px] font-bold uppercase tracking-wide bg-amber-400/90 text-amber-950 border-0 px-2 py-0.5 gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    New
                  </Badge>
                )}
              </div>

              {/* Favorite button */}
              <div className="absolute top-3 right-3 mt-10">
                <FavoriteButton propertyId={property.propertyId} />
              </div>

              {/* Featured star */}
              {/* Title overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display text-lg font-semibold text-white line-clamp-1 drop-shadow">
                  {property.title}
                </h3>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <span className="text-sm line-clamp-1">
                  {property.locationName}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Ruler className="w-4 h-4 shrink-0 text-primary" />
                <span className="text-sm font-medium">
                  {formatArea(property.areaSizeSqFt)}
                </span>
              </div>
              {property.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {property.description}
                </p>
              )}
              {dealerWhatsApp && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const msg = encodeURIComponent(
                      `Hi, I am interested in ${property.title} at ${property.locationName}. Price: ${formatPrice(property.price)}, Area: ${formatArea(property.areaSizeSqFt)}. Please share more details.`,
                    );
                    window.open(
                      `https://wa.me/${dealerWhatsApp}?text=${msg}`,
                      "_blank",
                    );
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                  data-ocid="property-whatsapp-button"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              )}
            </div>
          </article>
        </Link>
      </ThreeDCard>
    </motion.div>
  );
}
