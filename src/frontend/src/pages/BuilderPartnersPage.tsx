import type { BuilderPartner } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Building2,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { usePartners } from "../hooks/usePartners";

// ─── Partner Card ──────────────────────────────────────────────────────────
function PartnerCard({
  partner,
  index,
}: { partner: BuilderPartner; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      data-ocid={`partners.item.${index + 1}`}
    >
      <Card className="h-full border border-border shadow-card hover:shadow-hover transition-smooth overflow-hidden group">
        {/* Gold top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

        <CardContent className="p-5 flex flex-col gap-4">
          {/* Logo + verified */}
          <div className="flex items-start justify-between gap-3">
            <div className="w-14 h-14 rounded-xl border border-border bg-muted flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
              {partner.logoUrl ? (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                    (
                      e.currentTarget.nextElementSibling as HTMLElement | null
                    )?.style.setProperty("display", "flex");
                  }}
                />
              ) : null}
              <div
                className={`w-full h-full items-center justify-center ${
                  partner.logoUrl ? "hidden" : "flex"
                }`}
              >
                <Building2 className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>

            {partner.isVerified && (
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 shrink-0"
                data-ocid={`partners.verified-badge.${index + 1}`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Partner
              </div>
            )}
          </div>

          {/* Name + specialization */}
          <div>
            <h3 className="font-display font-bold text-foreground text-base leading-tight line-clamp-2">
              {partner.name}
            </h3>
            {partner.specialization && (
              <Badge
                variant="secondary"
                className="mt-1.5 text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-700 hover:bg-amber-100"
              >
                {partner.specialization}
              </Badge>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-2 mt-auto">
            {partner.contactPhone && (
              <a
                href={`tel:${partner.contactPhone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
                data-ocid={`partners.phone.${index + 1}`}
              >
                <Phone className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                <span className="truncate group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400">
                  {partner.contactPhone}
                </span>
              </a>
            )}
            {partner.contactEmail && (
              <a
                href={`mailto:${partner.contactEmail}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
                data-ocid={`partners.email.${index + 1}`}
              >
                <Mail className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                <span className="truncate group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400">
                  {partner.contactEmail}
                </span>
              </a>
            )}
            {partner.websiteUrl && (
              <a
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
                data-ocid={`partners.website.${index + 1}`}
              >
                <Globe className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                <span className="truncate group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400">
                  {partner.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Skeleton grid ──────────────────────────────────────────────────────────
function PartnerCardSkeleton() {
  return (
    <Card className="border border-border overflow-hidden">
      <div className="h-1 w-full bg-muted" />
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <Skeleton className="w-14 h-14 rounded-xl" />
          <Skeleton className="w-28 h-6 rounded-full" />
        </div>
        <div>
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-4 w-1/2 rounded mt-2" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export function BuilderPartnersPage() {
  const { data: partners, isLoading } = usePartners();

  return (
    <div className="min-h-screen bg-background" data-ocid="partners.page">
      {/* Hero banner */}
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-amber-400 to-yellow-500" />
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400">
                Trusted Network
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
              Authorised Builder Partners
            </h1>
            <p className="mt-2 text-muted-foreground text-base max-w-xl">
              We collaborate with verified builders and developers who share our
              commitment to quality and trust in every project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners grid */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton only
              <PartnerCardSkeleton key={i} />
            ))}
          </div>
        ) : partners && partners.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner, i) => (
              <PartnerCard key={partner.id} partner={partner} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-24 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="partners.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="font-display font-semibold text-foreground text-xl">
              No Partners Listed Yet
            </h2>
            <p className="text-muted-foreground text-sm text-center max-w-xs">
              Our authorised builder partners will appear here. Check back soon!
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
