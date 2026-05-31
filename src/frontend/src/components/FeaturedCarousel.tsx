import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import type { Property } from "../backend";
import { formatArea, formatPrice, getPrimaryImageUrl } from "../utils/imageUrl";
import { PropertyStatusBadge } from "./StatusBadge";

interface FeaturedCarouselProps {
  properties: Property[];
  title: string;
}

export function FeaturedCarousel({ properties, title }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (properties.length === 0) return null;

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-6" data-ocid="featured-carousel-section">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
            {title}
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-smooth shadow-card"
              aria-label="Scroll left"
              data-ocid="carousel-scroll-left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-smooth shadow-card"
              aria-label="Scroll right"
              data-ocid="carousel-scroll-right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {properties.map((property, i) => {
            const img = getPrimaryImageUrl(
              property.images,
              property.primaryImageIndex,
            );
            return (
              <motion.div
                key={property.propertyId}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="snap-start shrink-0 w-[240px] sm:w-[280px]"
                data-ocid={`featured-card.item.${i + 1}`}
              >
                <Link
                  to="/property/$id"
                  params={{ id: property.propertyId }}
                  className="block group"
                >
                  <div className="bg-card rounded-xl overflow-hidden shadow-card border border-border/50 hover:shadow-hover transition-smooth">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={img}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2">
                        <PropertyStatusBadge status={property.status} />
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg">
                          {formatPrice(property.price)}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-3 right-3">
                        <p className="text-white text-sm font-display font-semibold line-clamp-1 drop-shadow">
                          {property.title}
                        </p>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-muted-foreground text-xs line-clamp-1">
                        {property.locationName}
                      </p>
                      <p className="text-foreground text-xs font-medium mt-1">
                        {formatArea(property.areaSizeSqFt)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
