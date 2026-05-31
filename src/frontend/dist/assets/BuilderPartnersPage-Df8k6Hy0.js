import { B as jsxRuntimeExports, C as motion, a8 as Building2, W as Phone, aD as Mail } from "./index-D6obxqBN.js";
import { B as Badge } from "./badge-DMkhsvL2.js";
import { u as usePartners, U as Users, C as Card, a as CardContent, b as CircleCheck, G as Globe } from "./usePartners-ia77-uRa.js";
import { S as Skeleton } from "./skeleton-24zo03YF.js";
function PartnerCard({
  partner,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.45, delay: index * 0.07, ease: "easeOut" },
      whileHover: { y: -4, transition: { duration: 0.2 } },
      "data-ocid": `partners.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "h-full border border-border shadow-card hover:shadow-hover transition-smooth overflow-hidden group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-14 h-14 rounded-xl border border-border bg-muted flex items-center justify-center shrink-0 overflow-hidden shadow-sm", children: [
              partner.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: partner.logoUrl,
                  alt: partner.name,
                  className: "w-full h-full object-contain",
                  onError: (e) => {
                    var _a;
                    e.currentTarget.style.display = "none";
                    (_a = e.currentTarget.nextElementSibling) == null ? void 0 : _a.style.setProperty("display", "flex");
                  }
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-full h-full items-center justify-center ${partner.logoUrl ? "hidden" : "flex"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6 text-muted-foreground" })
                }
              )
            ] }),
            partner.isVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 shrink-0",
                "data-ocid": `partners.verified-badge.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  "Verified Partner"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base leading-tight line-clamp-2", children: partner.name }),
            partner.specialization && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "mt-1.5 text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-700 hover:bg-amber-100",
                children: partner.specialization
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 mt-auto", children: [
            partner.contactPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:${partner.contactPhone}`,
                className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link",
                "data-ocid": `partners.phone.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 shrink-0 text-amber-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400", children: partner.contactPhone })
                ]
              }
            ),
            partner.contactEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `mailto:${partner.contactEmail}`,
                className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link",
                "data-ocid": `partners.email.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 shrink-0 text-amber-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400", children: partner.contactEmail })
                ]
              }
            ),
            partner.websiteUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: partner.websiteUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link",
                "data-ocid": `partners.website.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 shrink-0 text-amber-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400", children: partner.websiteUrl.replace(/^https?:\/\/(www\.)?/, "") })
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function PartnerCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-14 h-14 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-28 h-6 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2 rounded mt-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 rounded" })
      ] })
    ] })
  ] });
}
function BuilderPartnersPage() {
  const { data: partners, isLoading } = usePartners();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "partners.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 py-10 sm:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-8 rounded-full bg-gradient-to-b from-amber-400 to-yellow-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400", children: "Trusted Network" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight", children: "Authorised Builder Partners" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-base max-w-xl", children: "We collaborate with verified builders and developers who share our commitment to quality and trust in every project." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-5xl mx-auto px-4 py-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 6 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton only
      /* @__PURE__ */ jsxRuntimeExports.jsx(PartnerCardSkeleton, {}, i)
    )) }) : partners && partners.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: partners.map((partner, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PartnerCard, { partner, index: i }, partner.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex flex-col items-center justify-center py-24 gap-4",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        "data-ocid": "partners.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-amber-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-xl", children: "No Partners Listed Yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center max-w-xs", children: "Our authorised builder partners will appear here. Check back soon!" })
        ]
      }
    ) })
  ] });
}
export {
  BuilderPartnersPage
};
