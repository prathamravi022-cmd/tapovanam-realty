import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowDownUp,
  ChevronDown,
  ChevronUp,
  Clock,
  Home,
  MapPin,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { Property } from "../backend";
import { PropertyStatus } from "../backend";
import { FeaturedCarousel } from "../components/FeaturedCarousel";
import { HomeHero } from "../components/HomeHero";
import { PropertyCard } from "../components/PropertyCard";
import { useDealerProfile } from "../hooks/useDealerProfile";
import { PROPERTIES_QUERY_KEY, useProperties } from "../hooks/useProperties";

// --- PropertyCardSkeleton ---
function PropertyCardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
}

// --- Sort options ---
type SortBy = "newest" | "price_asc" | "price_desc" | "area_desc";

const SORT_OPTIONS: { value: SortBy; label: string; labelHi: string }[] = [
  { value: "newest", label: "Newest First", labelHi: "नवीनतम पहले" },
  { value: "price_asc", label: "Price: Low → High", labelHi: "मूल्य: कम → अधिक" },
  {
    value: "price_desc",
    label: "Price: High → Low",
    labelHi: "मूल्य: अधिक → कम",
  },
  {
    value: "area_desc",
    label: "Area: Large → Small",
    labelHi: "क्षेत्र: बड़ा → छोटा",
  },
];

// --- Filter Panel ---
interface FilterPanelProps {
  location: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
  status: string;
  sortBy: SortBy;
  lang: "en" | "hi";
  onLocationChange: (v: string) => void;
  onMinPriceChange: (v: string) => void;
  onMaxPriceChange: (v: string) => void;
  onMinAreaChange: (v: string) => void;
  onMaxAreaChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onSortChange: (v: SortBy) => void;
  onReset: () => void;
  activeFilterCount: number;
}

function FilterPanel({
  location,
  minPrice,
  maxPrice,
  minArea,
  maxArea,
  status,
  sortBy,
  lang,
  onLocationChange,
  onMinPriceChange,
  onMaxPriceChange,
  onMinAreaChange,
  onMaxAreaChange,
  onStatusChange,
  onSortChange,
  onReset,
  activeFilterCount,
}: FilterPanelProps) {
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="bg-card border border-border rounded-xl p-5 shadow-card space-y-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold text-foreground">
          {t("Filters", "फ़िल्टर")}
        </h2>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
            data-ocid="filter-reset"
          >
            <X className="w-3 h-3" />
            {t("Clear all", "सब साफ करें")}
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-1">
          <ArrowDownUp className="w-3 h-3" />
          {t("Sort By", "क्रमबद्ध करें")}
        </Label>
        <div className="flex flex-col gap-1.5" data-ocid="filter-sort">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSortChange(opt.value)}
              className={[
                "px-3 py-1.5 rounded-lg text-xs font-medium text-left border transition-smooth",
                sortBy === opt.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50",
              ].join(" ")}
            >
              {lang === "hi" ? opt.labelHi : opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t("Status", "स्थिति")}
        </Label>
        <div className="flex gap-2 flex-wrap" data-ocid="filter-status">
          {(["available", "all", "sold"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onStatusChange(s)}
              className={[
                "px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-smooth",
                status === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50",
              ].join(" ")}
            >
              {s === "all"
                ? t("All", "सभी")
                : s === "available"
                  ? t("Available", "उपलब्ध")
                  : t("Sold", "बिका")}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label
          htmlFor="filter-location"
          className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
        >
          {t("Location", "स्थान")}
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            id="filter-location"
            placeholder={t("City, area...", "शहर, क्षेत्र...")}
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="pl-8 text-sm h-9"
            data-ocid="filter-location-input"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t("Price Range (₹)", "मूल्य सीमा (₹)")}
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder={t("Min", "न्यूनतम")}
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="text-sm h-9"
            data-ocid="filter-min-price"
          />
          <Input
            type="number"
            placeholder={t("Max", "अधिकतम")}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="text-sm h-9"
            data-ocid="filter-max-price"
          />
        </div>
      </div>

      {/* Area Range */}
      <div className="space-y-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t("Area Size (sq ft)", "क्षेत्रफल (वर्ग फुट)")}
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder={t("Min", "न्यूनतम")}
            value={minArea}
            onChange={(e) => onMinAreaChange(e.target.value)}
            className="text-sm h-9"
            data-ocid="filter-min-area"
          />
          <Input
            type="number"
            placeholder={t("Max", "अधिकतम")}
            value={maxArea}
            onChange={(e) => onMaxAreaChange(e.target.value)}
            className="text-sm h-9"
            data-ocid="filter-max-area"
          />
        </div>
      </div>
    </motion.div>
  );
}

// --- Enhanced Empty State ---
function EmptyState({
  hasFilters,
  onReset,
  lang,
}: {
  hasFilters: boolean;
  onReset: () => void;
  lang: "en" | "hi";
}) {
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
      data-ocid="property-grid.empty_state"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-5 shadow-card"
      >
        <Home className="w-10 h-10 text-muted-foreground" />
      </motion.div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        {hasFilters
          ? t("No properties match your filters", "कोई संपत्ति नहीं मिली")
          : t("No properties yet", "अभी कोई संपत्ति नहीं")}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
        {hasFilters
          ? t(
              "Try adjusting your search or filters to find the perfect plot.",
              "अपनी खोज या फ़िल्टर बदलें।",
            )
          : t(
              "Properties will appear here once the agent adds listings.",
              "एजेंट द्वारा संपत्तियां जोड़े जाने पर यहाँ दिखेंगी।",
            )}
      </p>
      {hasFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          data-ocid="empty-state-clear-filters"
          className="gap-2"
        >
          <X className="w-3.5 h-3.5" />
          {t("Clear Filters", "फ़िल्टर साफ करें")}
        </Button>
      )}
    </motion.div>
  );
}

// --- Debounce hook ---
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// --- Recently Added strip ---
function RecentlyAddedSection({
  properties,
  lang,
}: {
  properties: Property[];
  lang: "en" | "hi";
}) {
  if (properties.length === 0) return null;
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  return (
    <FeaturedCarousel
      properties={properties}
      title={t("Recently Added", "हाल ही में जोड़ी गई")}
    />
  );
}

// --- Main Home Page ---
export function HomePage() {
  const [urlParams, setUrlParams] = useState<URLSearchParams>(
    () => new URLSearchParams(window.location.search),
  );
  const queryClient = useQueryClient();
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  useEffect(() => {
    const handlePop = () =>
      setUrlParams(new URLSearchParams(window.location.search));
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  function updateParams(updates: Record<string, string | undefined>) {
    const next = new URLSearchParams(urlParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    }
    const newUrl = `${window.location.pathname}?${next.toString()}`;
    window.history.replaceState(null, "", newUrl);
    setUrlParams(next);
  }

  const [searchInput, setSearchInput] = useState(
    urlParams.get("location") ?? "",
  );
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showConstructionOnly, setShowConstructionOnly] = useState(false);

  const location = urlParams.get("location") ?? "";
  const minPrice = urlParams.get("minPrice") ?? "";
  const maxPrice = urlParams.get("maxPrice") ?? "";
  const minArea = urlParams.get("minArea") ?? "";
  const maxArea = urlParams.get("maxArea") ?? "";
  const status = urlParams.get("status") ?? "available";

  const debouncedSearch = useDebounce(searchInput, 300);

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const next = new URLSearchParams(window.location.search);
    if (debouncedSearch) {
      next.set("location", debouncedSearch);
    } else {
      next.delete("location");
    }
    const newUrl = `${window.location.pathname}?${next.toString()}`;
    window.history.replaceState(null, "", newUrl);
    setUrlParams(next);
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleReset = useCallback(() => {
    setSearchInput("");
    setSortBy("newest");
    window.history.replaceState(null, "", window.location.pathname);
    setUrlParams(new URLSearchParams());
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    setTimeout(() => setIsRefreshing(false), 600);
  }, [queryClient]);

  const { data: properties, isLoading } = useProperties();
  const { data: dealerProfile } = useDealerProfile();

  const filtered = useMemo<Property[]>(() => {
    if (!properties) return [];
    const base = properties.filter((p) => {
      if (status === "available" && p.status !== PropertyStatus.available)
        return false;
      if (status === "sold" && p.status !== PropertyStatus.sold) return false;
      const q = location.toLowerCase().trim();
      if (
        q &&
        !p.title.toLowerCase().includes(q) &&
        !p.locationName.toLowerCase().includes(q)
      )
        return false;
      if (minPrice && Number(p.price) < Number(minPrice)) return false;
      if (maxPrice && Number(p.price) > Number(maxPrice)) return false;
      if (minArea && p.areaSizeSqFt < Number(minArea)) return false;
      if (maxArea && p.areaSizeSqFt > Number(maxArea)) return false;
      if (showConstructionOnly && !p.isConstructionSite) return false;
      return true;
    });

    return [...base].sort((a, b) => {
      if (sortBy === "price_asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price_desc") return Number(b.price) - Number(a.price);
      if (sortBy === "area_desc") return b.areaSizeSqFt - a.areaSizeSqFt;
      return Number(b.dateAdded) - Number(a.dateAdded);
    });
  }, [
    properties,
    status,
    location,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    sortBy,
    showConstructionOnly,
  ]);

  const featuredProperties = useMemo<Property[]>(() => {
    if (!properties || properties.length === 0) return [];
    return [...properties]
      .sort((a, b) => Number(b.dateAdded) - Number(a.dateAdded))
      .slice(0, 4);
  }, [properties]);

  const recentProperties = useMemo<Property[]>(() => {
    if (!properties || properties.length <= 4) return [];
    return [...properties]
      .sort((a, b) => Number(b.dateAdded) - Number(a.dateAdded))
      .slice(4, 7);
  }, [properties]);

  const activeFilterCount = [
    location,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    status !== "available" ? status : "",
    sortBy !== "newest" ? sortBy : "",
  ].filter(Boolean).length;

  const hasFilters = activeFilterCount > 0;
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <HomeHero
        properties={properties ?? []}
        isLoading={isLoading}
        lang={lang}
      />

      {/* Featured carousel */}
      {!isLoading && featuredProperties.length > 0 && (
        <div className="bg-muted/30 border-y border-border/50">
          <FeaturedCarousel
            properties={featuredProperties}
            title={t("Featured Properties", "विशेष संपत्तियां")}
          />
        </div>
      )}

      {/* Sticky search/filter bar */}
      <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-sm border-b border-border shadow-card">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder={t(
                  "Search locations, plots...",
                  "स्थान, प्लॉट खोजें...",
                )}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 pr-9 h-10 bg-background text-foreground placeholder:text-gray-400 border-input focus:border-primary text-sm"
                data-ocid="home-search-input"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                  data-ocid="search-clear"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters((v) => !v)}
              className={[
                "shrink-0 gap-1.5 h-10 px-3",
                showFilters
                  ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                  : "",
              ].join(" ")}
              data-ocid="filter-toggle"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">
                {t("Filters", "फ़िल्टर")}
              </span>
              {activeFilterCount > 0 && (
                <Badge className="ml-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary-foreground text-primary">
                  {activeFilterCount}
                </Badge>
              )}
              {showFilters ? (
                <ChevronUp className="w-3.5 h-3.5 hidden sm:block" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 hidden sm:block" />
              )}
            </Button>

            {/* Language toggle */}
            <button
              type="button"
              onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
              className="shrink-0 h-10 px-3 rounded-lg border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted transition-smooth"
              aria-label="Toggle language"
              data-ocid="lang-toggle"
            >
              {lang === "en" ? "EN" : "HI"}
            </button>

            {/* Construction Sites toggle */}
            <button
              type="button"
              onClick={() => setShowConstructionOnly((v) => !v)}
              className={[
                "shrink-0 h-10 px-3 rounded-lg border text-xs font-semibold transition-smooth",
                showConstructionOnly
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-card text-foreground border-border hover:border-amber-400 hover:text-amber-700",
              ].join(" ")}
              aria-label="Toggle construction sites"
              data-ocid="construction-toggle"
            >
              🏗
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              aria-label="Refresh listings"
              className="shrink-0 h-10 w-10"
              data-ocid="refresh-btn"
            >
              <RefreshCw
                className={["w-4 h-4", isRefreshing ? "animate-spin" : ""].join(
                  " ",
                )}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-6 lg:items-start">
          {/* Filter panel */}
          <div
            className={[
              "lg:sticky lg:top-20",
              showFilters ? "block mb-5" : "hidden lg:block",
            ].join(" ")}
          >
            <AnimatePresence>
              <FilterPanel
                location={location}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minArea={minArea}
                maxArea={maxArea}
                status={status}
                sortBy={sortBy}
                lang={lang}
                onLocationChange={(v) =>
                  updateParams({ location: v || undefined })
                }
                onMinPriceChange={(v) =>
                  updateParams({ minPrice: v || undefined })
                }
                onMaxPriceChange={(v) =>
                  updateParams({ maxPrice: v || undefined })
                }
                onMinAreaChange={(v) =>
                  updateParams({ minArea: v || undefined })
                }
                onMaxAreaChange={(v) =>
                  updateParams({ maxArea: v || undefined })
                }
                onStatusChange={(v) =>
                  updateParams({ status: v !== "available" ? v : undefined })
                }
                onSortChange={setSortBy}
                onReset={handleReset}
                activeFilterCount={activeFilterCount}
              />
            </AnimatePresence>
          </div>

          {/* Property listings */}
          <div>
            {/* Recently added between featured and main grid */}
            {!isLoading && recentProperties.length > 0 && (
              <div className="mb-6 -mx-4 sm:mx-0">
                <RecentlyAddedSection
                  properties={recentProperties}
                  lang={lang}
                />
              </div>
            )}

            {/* Section heading + count */}
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-amber-700 dark:text-amber-400">
                {showConstructionOnly
                  ? t("Construction Sites", "निर्माण स्थल")
                  : t("Browse Properties", "संपत्तियां देखें")}
              </h2>
              {!isLoading && (
                <span className="text-sm text-muted-foreground shrink-0 ml-3">
                  {filtered.length}{" "}
                  {filtered.length === 1
                    ? t("listing", "संपत्ति")
                    : t("listings", "संपत्तियां")}
                </span>
              )}
            </div>

            {/* Loading skeletons */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map(
                  (id) => (
                    <PropertyCardSkeleton key={id} />
                  ),
                )}
              </div>
            )}

            {/* Empty state */}
            <AnimatePresence>
              {!isLoading && filtered.length === 0 && (
                <EmptyState
                  hasFilters={hasFilters}
                  onReset={handleReset}
                  lang={lang}
                />
              )}
            </AnimatePresence>

            {/* Property grid with stagger animation */}
            {!isLoading && filtered.length > 0 && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                data-ocid="property-grid"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {filtered.map((property, idx) => (
                  <motion.div
                    key={property.propertyId}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.97 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    data-ocid={`property-grid.item.${idx + 1}`}
                  >
                    <PropertyCard
                      property={property}
                      dealerWhatsApp={dealerProfile?.whatsappNumber || ""}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!isLoading &&
              recentProperties.length === 0 &&
              featuredProperties.length === 0 &&
              properties &&
              properties.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {t("All listings shown above", "सभी संपत्तियां ऊपर दिखाई गई हैं")}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
