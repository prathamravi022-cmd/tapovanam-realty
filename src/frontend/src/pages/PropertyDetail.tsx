import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useParams, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Eye,
  HardHat,
  Heart,
  MapPin,
  Maximize2,
  MessageCircle,
  Navigation,
  Phone,
  QrCode,
  Ruler,
  Share2,
  StickyNote,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import PropertyMap from "../components/PropertyMap";
import {
  LegalStatusBadge,
  PropertyStatusBadge,
} from "../components/StatusBadge";
import { useProperties } from "../hooks/useProperties";
import { useProperty } from "../hooks/useProperty";
import { type ConstructionSiteFields, PropertyStatus } from "../types";
import type { Property } from "../types";
import {
  formatArea,
  formatPrice,
  getImageUrl,
  getPrimaryImageUrl,
} from "../utils/imageUrl";

// ─── Glass Modal ─────────────────────────────────────────────────────────────

function GlassModal({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          data-ocid="glass-modal"
        >
          <div className="absolute inset-0 bg-black/60 blur-backdrop" />
          <motion.div
            className={cn(
              "relative z-10 glass-light dark:glass-dark rounded-2xl shadow-elevation max-w-lg w-full",
              className,
            )}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 bg-black/10 hover:bg-black/20 rounded-full p-1.5 transition-smooth"
              aria-label="Close"
              data-ocid="glass-modal.close_button"
            >
              <X className="w-4 h-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Enhanced Image Gallery ──────────────────────────────────────────────────

function ImageGallery({ property }: { property: Property }) {
  const { images, primaryImageIndex } = property;
  const primaryIdx = Number(primaryImageIndex);
  const orderedIndices = [
    primaryIdx,
    ...Array.from({ length: images.length }, (_, i) => i).filter(
      (i) => i !== primaryIdx,
    ),
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const count = orderedIndices.length || 1;

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setCurrent((c) => (c + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const currentImageUrl =
    images.length > 0
      ? getImageUrl(images[orderedIndices[current]])
      : "/assets/images/placeholder.svg";

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = currentImageUrl;
    a.download = `property-${property.propertyId}-${current + 1}.jpg`;
    a.click();
  };

  const galleryContent = (
    <section
      className="relative overflow-hidden bg-muted"
      style={{ height: fullscreen ? "100dvh" : "min(65vh, 460px)" }}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart === null) return;
        const delta = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) go(delta > 0 ? 1 : -1);
        setTouchStart(null);
      }}
      aria-label="Property gallery"
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.img
          key={current}
          src={currentImageUrl}
          alt={`View ${current + 1} of ${count}`}
          className="absolute inset-0 w-full h-full object-cover select-none"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 0] }}
          draggable={false}
        />
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      {/* Top controls */}
      <div className="absolute top-3 left-0 right-0 flex items-center justify-between px-3">
        {count > 1 && (
          <span className="bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {current + 1} / {count}
          </span>
        )}
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-smooth backdrop-blur-sm"
            aria-label="Download image"
            data-ocid="gallery-download-btn"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setFullscreen((f) => !f)}
            className="bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-smooth backdrop-blur-sm"
            aria-label={fullscreen ? "Exit fullscreen" : "View fullscreen"}
            data-ocid="gallery-fullscreen-btn"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Arrow navigation */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2.5 transition-smooth backdrop-blur-sm shadow-elevation"
            aria-label="Previous"
            data-ocid="gallery-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2.5 transition-smooth backdrop-blur-sm shadow-elevation"
            aria-label="Next"
            data-ocid="gallery-next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Thumbnail strip */}
      {count > 1 && images.length > 0 && (
        <div className="absolute bottom-3 left-0 right-0 flex gap-2 px-3 overflow-x-auto justify-center">
          {orderedIndices.map((imgIdx, i) => (
            <button
              key={imgIdx}
              type="button"
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={cn(
                "shrink-0 w-12 h-9 rounded-lg overflow-hidden border-2 transition-smooth",
                i === current
                  ? "border-white shadow-elevation scale-105"
                  : "border-white/30 hover:border-white/60 opacity-70 hover:opacity-100",
              )}
              aria-label={`Go to view ${i + 1}`}
              data-ocid={`gallery-thumb-${i + 1}`}
            >
              <img
                src={getImageUrl(images[imgIdx])}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );

  if (fullscreen) {
    return <div className="fixed inset-0 z-50 bg-black">{galleryContent}</div>;
  }

  return galleryContent;
}

// ─── Google Maps Section ─────────────────────────────────────────────────────

// GoogleMapsSection removed — now using Leaflet via PropertyMap

// ─── Contact Section ─────────────────────────────────────────────────────────

function ContactSection({ property }: { property: Property }) {
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [siteVisitSent, setSiteVisitSent] = useState(false);
  const [visitName, setVisitName] = useState("");
  const [visitPhone, setVisitPhone] = useState("");

  const raw = property as unknown as Record<string, unknown>;
  const contactPhone = raw.contactPhone as string | undefined;
  const contactWhatsApp = raw.contactWhatsApp as string | undefined;
  const whatsappNumber = contactWhatsApp || contactPhone;
  const phoneNumber = contactPhone || contactWhatsApp;

  const handleSiteVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSiteVisitSent(true);
    setTimeout(() => {
      setSiteVisitOpen(false);
      setSiteVisitSent(false);
      setVisitName("");
      setVisitPhone("");
    }, 2500);
  };

  return (
    <>
      <div
        className="glass-light dark:glass-dark rounded-2xl p-5 space-y-3"
        data-ocid="contact-section"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Contact Agent</p>
            <p className="text-sm font-semibold text-foreground">
              Tapovanam Realty Services
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="whatsapp-btn"
            >
              <Button className="w-full gap-2 font-semibold bg-[#25D366] hover:bg-[#20b857] text-white">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          )}
          {phoneNumber && (
            <a href={`tel:${phoneNumber}`} data-ocid="call-btn">
              <Button variant="outline" className="w-full gap-2 font-semibold">
                <Phone className="w-4 h-4" />
                Call Agent
              </Button>
            </a>
          )}
          {!whatsappNumber && !phoneNumber && (
            <p className="text-sm text-muted-foreground text-center py-1">
              📞 Contact us at Tapovanam Realty Services for more info.
            </p>
          )}
          <Button
            variant="outline"
            className="w-full gap-2 font-semibold border-primary/40 text-primary hover:bg-primary/5"
            onClick={() => setSiteVisitOpen(true)}
            data-ocid="site-visit-btn"
          >
            <MapPin className="w-4 h-4" />
            Request Site Visit
          </Button>
        </div>
      </div>
      <GlassModal open={siteVisitOpen} onClose={() => setSiteVisitOpen(false)}>
        <div className="p-6">
          <h3 className="font-display text-lg font-bold text-foreground mb-1">
            Request a Site Visit
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Leave your details and our agent will get in touch.
          </p>
          {siteVisitSent ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6"
              data-ocid="site-visit-modal.success_state"
            >
              <div className="text-4xl mb-2">✅</div>
              <p className="font-semibold text-foreground">Request Sent!</p>
              <p className="text-sm text-muted-foreground">
                We'll contact you shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSiteVisitSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={visitName}
                onChange={(e) => setVisitName(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="site-visit-modal.input"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={visitPhone}
                onChange={(e) => setVisitPhone(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSiteVisitOpen(false)}
                  data-ocid="site-visit-modal.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 font-semibold"
                  data-ocid="site-visit-modal.submit_button"
                >
                  Send Request
                </Button>
              </div>
            </form>
          )}
        </div>
      </GlassModal>
    </>
  );
}

// ─── QR Code Section ─────────────────────────────────────────────────────────

function QRCodeSection({ propertyId }: { propertyId: string }) {
  const [qrOpen, setQrOpen] = useState(false);
  const url = `${window.location.origin}/property/${propertyId}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=1a1a2e&margin=10`;
  const qrLargeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=1a1a2e&margin=20`;

  return (
    <>
      <div
        className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-card"
        data-ocid="qr-section"
      >
        <button
          type="button"
          onClick={() => setQrOpen(true)}
          className="shrink-0 rounded-xl overflow-hidden border-2 border-border hover:border-primary/40 transition-smooth shadow-card"
          aria-label="Expand QR code"
          data-ocid="qr-expand-btn"
        >
          <img src={qrSrc} alt="QR Code" className="w-16 h-16 block" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">
            Share this Plot
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{url}</p>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(url)}
            className="mt-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-smooth flex items-center gap-1"
            data-ocid="qr-copy-btn"
          >
            <Copy className="w-3 h-3" />
            Copy Link
          </button>
        </div>
        <button
          type="button"
          onClick={() => setQrOpen(true)}
          className="shrink-0 rounded-full p-2 bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-smooth"
          aria-label="View QR code fullscreen"
          data-ocid="qr-fullscreen-btn"
        >
          <QrCode className="w-5 h-5" />
        </button>
      </div>
      <GlassModal open={qrOpen} onClose={() => setQrOpen(false)}>
        <div className="p-6 text-center" data-ocid="qr-modal">
          <h3 className="font-display text-lg font-bold text-foreground mb-1">
            Scan to Share
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Scan this QR code to open this property listing.
          </p>
          <div className="inline-block rounded-2xl overflow-hidden shadow-elevation border border-border">
            <img
              src={qrLargeSrc}
              alt="QR Code Large"
              className="w-48 h-48 block"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3 break-all px-4">
            {url}
          </p>
        </div>
      </GlassModal>
    </>
  );
}

// ─── Virtual Tour ─────────────────────────────────────────────────────────────

function VirtualTourSection({ notes }: { notes: string | undefined }) {
  if (!notes) return null;
  const ytMatch = notes.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/,
  );
  if (!ytMatch) return null;
  const videoId = ytMatch[1];
  return (
    <section aria-label="Virtual Tour" data-ocid="virtual-tour-section">
      <h2 className="font-display text-lg font-semibold text-foreground mb-3">
        🎬 Virtual Tour
      </h2>
      <div className="rounded-2xl overflow-hidden shadow-card border border-border aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Virtual Tour"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}

// ─── Similar Properties ──────────────────────────────────────────────────────

function SimilarProperties({
  currentId,
  locationName,
  price,
}: {
  currentId: string;
  locationName: string;
  price: bigint;
}) {
  const router = useRouter();
  const { data: allProps } = useProperties();
  const similar = (allProps ?? [])
    .filter(
      (p) =>
        p.propertyId !== currentId &&
        (p.locationName === locationName ||
          Math.abs(Number(p.price) - Number(price)) / Number(price) < 0.3),
    )
    .slice(0, 6);
  if (!similar.length) return null;
  return (
    <section aria-label="Similar properties" data-ocid="similar-section">
      <h2 className="font-display text-lg font-semibold text-foreground mb-3">
        Similar Listings
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {similar.map((p, i) => (
          <motion.button
            key={p.propertyId}
            type="button"
            className="shrink-0 w-48 bg-card border border-border rounded-2xl overflow-hidden shadow-card text-left transition-smooth hover:shadow-hover"
            onClick={() => router.navigate({ to: `/property/${p.propertyId}` })}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            data-ocid={`similar-property-${i + 1}`}
          >
            <div className="h-28 bg-muted overflow-hidden">
              <img
                src={getPrimaryImageUrl(p.images, p.primaryImageIndex)}
                alt={p.title}
                className="w-full h-full object-cover transition-smooth hover:scale-105"
              />
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-primary">
                {formatPrice(p.price)}
              </p>
              <p className="text-xs font-medium text-foreground truncate mt-0.5">
                {p.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {p.locationName}
              </p>
              <span
                className={cn(
                  "inline-block mt-1.5 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full",
                  p.status === PropertyStatus.available
                    ? "bg-primary/15 text-primary"
                    : "bg-secondary/20 text-secondary-foreground",
                )}
              >
                {p.status === PropertyStatus.available ? "Available" : "Sold"}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

// ─── Construction Progress Section ─────────────────────────────────────────

function ConstructionProgressSection({
  fields,
}: {
  fields: ConstructionSiteFields;
}) {
  const progressPct = Math.max(
    0,
    Math.min(100, Number(fields.progressPercentage)),
  );

  return (
    <motion.section
      aria-label="Construction progress"
      className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-amber-500/5 backdrop-blur-sm p-5 shadow-card"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      data-ocid="construction-progress-section"
    >
      {/* Ambient gold glow */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
          <HardHat className="w-5 h-5 text-amber-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-base font-bold text-foreground">
            Construction Progress
          </h2>
          {fields.currentPhase && (
            <span className="inline-flex items-center gap-1 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {fields.currentPhase}
            </span>
          )}
        </div>
        <span
          className="shrink-0 text-2xl font-bold text-amber-500 font-display"
          data-ocid="construction-progress-pct"
        >
          {progressPct}%
        </span>
      </div>

      {/* Animated progress bar */}
      <div
        className="w-full h-3 rounded-full bg-amber-400/15 overflow-hidden mb-4"
        data-ocid="construction-progress-bar"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 shadow-sm"
          initial={{ width: 0 }}
          whileInView={{ width: `${progressPct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>

      {/* Dates grid */}
      {(fields.constructionStartDate || fields.expectedCompletionDate) && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {fields.constructionStartDate && (
            <div className="bg-amber-400/10 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs text-amber-600/80 dark:text-amber-400/80 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                Start Date
              </div>
              <p className="text-sm font-semibold text-foreground">
                {fields.constructionStartDate}
              </p>
            </div>
          )}
          {fields.expectedCompletionDate && (
            <div className="bg-amber-400/10 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs text-amber-600/80 dark:text-amber-400/80 mb-1">
                <Clock className="w-3.5 h-3.5" />
                Expected Completion
              </div>
              <p className="text-sm font-semibold text-foreground">
                {fields.expectedCompletionDate}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Live updates */}
      {fields.liveUpdates && (
        <div
          className="border-l-4 border-amber-500 bg-amber-400/8 rounded-r-xl px-4 py-3"
          data-ocid="construction-live-updates"
        >
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
            Live Update
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
            {fields.liveUpdates}
          </p>
        </div>
      )}
    </motion.section>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PropertyDetailSkeleton() {
  return (
    <div data-ocid="property-detail-skeleton">
      <Skeleton className="w-full" style={{ height: "min(65vh, 460px)" }} />
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function PropertyDetailPage() {
  const { id } = useParams({ from: "/property/$id" });
  const router = useRouter();
  const { actor } = useActor(createActor);

  const { data: property, isLoading, isError } = useProperty(id);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (!actor || !id) return;
    const a = actor as unknown as Record<string, unknown>;
    if (typeof a.incrementViewCount === "function") {
      (a.incrementViewCount as (id: string) => Promise<void>)(id).catch(
        () => {},
      );
    }
  }, [actor, id]);

  const handleShare = async () => {
    const url = window.location.href;
    const shareTitle = property?.title ?? "Check out this property";
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url });
        return;
      } catch {
        /* fallback */
      }
    }
    setShareOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) return <PropertyDetailSkeleton />;

  if (isError || !property) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center"
        data-ocid="property-not-found"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <MapPin className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Property Not Found
        </h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs">
          This property may have been removed or the link is incorrect.
        </p>
        <Button
          onClick={() => router.history.back()}
          variant="outline"
          className="gap-2"
          data-ocid="error-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Button>
      </div>
    );
  }

  const {
    title,
    price,
    areaSizeSqFt,
    locationName,
    description,
    notes,
    latitude,
    longitude,
    legalStatus,
    status,
    dateAdded,
    propertyId,
  } = property;

  const dateAdded_ = new Date(Number(dateAdded) / 1_000_000);
  const dateStr = dateAdded_.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const daysAgo = Math.floor(
    (Date.now() - dateAdded_.getTime()) / (1000 * 60 * 60 * 24),
  );
  const listingAge =
    daysAgo === 0
      ? "Listed today"
      : daysAgo === 1
        ? "Listed yesterday"
        : `Listed ${daysAgo} days ago`;

  const sqYards = (areaSizeSqFt / 9).toFixed(2);
  const acres = (areaSizeSqFt / 43560).toFixed(4);
  const pricePerSqFt = (Number(price) / areaSizeSqFt).toFixed(0);

  const viewCount = (property as unknown as Record<string, unknown>)
    .viewCount as number | undefined;
  const tags = (property as unknown as Record<string, unknown>).tags as
    | string[]
    | undefined;
  const isAvailable = status === PropertyStatus.available;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${formatPrice(price)} | ${locationName}\n${window.location.href}`)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      data-ocid="property-detail-page"
    >
      <ImageGallery property={property} />

      <div className="max-w-2xl mx-auto px-4 pt-4 pb-16 space-y-6">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.history.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth -ml-0.5 focus-visible:ring-2 focus-visible:ring-ring rounded"
          data-ocid="back-btn"
          aria-label="Back to property list"
        >
          <ArrowLeft className="w-4 h-4" />
          All Listings
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="font-display text-2xl font-bold text-foreground leading-tight flex-1 min-w-0">
              {title}
            </h1>
            <div className="flex items-center gap-2 shrink-0 mt-1">
              <button
                type="button"
                onClick={() => setIsFavorite((f) => !f)}
                className={cn(
                  "rounded-full p-2 transition-smooth",
                  isFavorite
                    ? "bg-red-500/10 text-red-500"
                    : "bg-muted text-muted-foreground hover:text-red-400",
                )}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                data-ocid="favorite-btn"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-smooth",
                    isFavorite && "fill-red-500",
                  )}
                />
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-full p-2 bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                aria-label="Share property"
                data-ocid="share-btn"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p
            className="font-display text-3xl font-bold text-primary mb-3"
            data-ocid="property-price"
          >
            {formatPrice(price)}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full transition-smooth",
                isAvailable
                  ? "bg-primary/15 text-primary shadow-neon-success"
                  : "bg-secondary/20 text-secondary-foreground shadow-neon-destructive",
              )}
              data-ocid="property-status-neon"
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  isAvailable ? "bg-primary animate-pulse" : "bg-secondary",
                )}
              />
              {isAvailable ? "Available" : "Sold"}
            </span>
            <LegalStatusBadge status={legalStatus} />
            <span className="inline-flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-xs font-medium text-foreground">
              <Ruler className="w-3 h-3 text-primary" />
              {formatArea(areaSizeSqFt)}
            </span>
            <span className="inline-flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-xs font-medium text-foreground">
              <MapPin className="w-3 h-3 text-primary" />
              {locationName}
            </span>
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs font-medium border-primary/30 text-primary bg-primary/5 px-2.5 py-0.5"
                >
                  <Tag className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.35 }}
          data-ocid="property-stats-card"
        >
          <div className="grid grid-cols-2 divide-x divide-y divide-border">
            {(
              [
                { label: "Property ID", value: propertyId, icon: "🏷️" },
                {
                  label: "Area (sq ft)",
                  value: areaSizeSqFt.toLocaleString("en-IN"),
                  icon: "📐",
                },
                { label: "Area (sq yd)", value: sqYards, icon: "📏" },
                { label: "Area (acres)", value: acres, icon: "🌿" },
                {
                  label: "Price/sq ft",
                  value: `₹${Number(pricePerSqFt).toLocaleString("en-IN")}`,
                  icon: "💰",
                },
                { label: "Date Listed", value: dateStr, icon: "📅" },
              ] as const
            ).map(({ label, value, icon }) => (
              <div key={label} className="p-3">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{icon}</span>
                  {label}
                </p>
                <p className="text-sm font-semibold text-foreground mt-0.5 break-words">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-border px-3 py-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Eye className="w-3.5 h-3.5" />
            {viewCount !== undefined ? (
              <span>{viewCount.toLocaleString()} views</span>
            ) : (
              <span>{listingAge}</span>
            )}
            <span className="ml-auto text-primary font-medium">
              ID: {propertyId}
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.section
          aria-label="Description"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.35 }}
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">
            About this Plot
          </h2>
          <p
            className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
            data-ocid="property-description"
          >
            {description}
          </p>
        </motion.section>

        {/* Notes */}
        {notes && notes.trim().length > 0 && (
          <motion.section
            aria-label="Additional notes"
            className="bg-secondary/10 border border-secondary/20 rounded-2xl p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            data-ocid="property-notes"
          >
            <div className="flex items-center gap-2 mb-2">
              <StickyNote className="w-4 h-4 text-secondary" />
              <h3 className="font-display text-sm font-semibold text-foreground">
                Additional Notes
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {notes}
            </p>
          </motion.section>
        )}

        {property.isConstructionSite &&
          property.constructionFields &&
          property.constructionFields[0] && (
            <ConstructionProgressSection
              fields={property.constructionFields[0]}
            />
          )}

        <VirtualTourSection notes={notes} />

        {/* Contact */}
        <motion.section
          aria-label="Contact agent"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Contact &amp; Inquiry
          </h2>
          <ContactSection property={property} />
        </motion.section>

        {/* Map */}
        <motion.section
          aria-label="Location map"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Location on Map
          </h2>
          <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Property Location
            </h3>
            {latitude && longitude ? (
              <>
                <PropertyMap
                  properties={[property]}
                  mode="view"
                  className="mb-3"
                />
                <div className="flex gap-2 flex-wrap mt-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-colors"
                    data-ocid="get-directions-btn"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${latitude},${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-xl text-sm font-medium transition-colors"
                    data-ocid="open-google-maps-btn"
                  >
                    <MapPin className="w-4 h-4" />
                    Open in Maps
                  </a>
                </div>
                <div className="mt-2 text-xs text-muted-foreground text-center">
                  {latitude.toFixed(6)}°N, {longitude.toFixed(6)}°E
                </div>
              </>
            ) : (
              <div className="text-muted-foreground text-sm text-center py-8">
                No location set for this property
              </div>
            )}
          </div>
        </motion.section>

        {/* QR Code */}
        <motion.section
          aria-label="QR code share"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <QRCodeSection propertyId={propertyId} />
        </motion.section>

        <SimilarProperties
          currentId={propertyId}
          locationName={locationName}
          price={price}
        />
      </div>

      {/* Share Modal */}
      <GlassModal open={shareOpen} onClose={() => setShareOpen(false)}>
        <div className="p-6" data-ocid="share-modal">
          <h3 className="font-display text-lg font-bold text-foreground mb-1">
            Share Property
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{title}</p>
          <div className="space-y-2">
            <Button
              className="w-full gap-2 font-semibold"
              style={{ background: "#25D366" }}
              onClick={() => window.open(whatsappShareUrl, "_blank")}
              data-ocid="share-modal.whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4" />
              Share via WhatsApp
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2 font-semibold"
              onClick={handleCopyLink}
              data-ocid="share-modal.copy-btn"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </div>
      </GlassModal>
    </motion.div>
  );
}
