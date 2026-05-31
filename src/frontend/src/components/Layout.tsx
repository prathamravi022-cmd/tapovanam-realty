import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  Languages,
  Moon,
  ShieldCheck,
  Sun,
  UserCircle2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDarkMode } from "../hooks/useDarkMode";
import { DealerProfileModal } from "./DealerProfileModal";
import { SplashScreen } from "./SplashScreen";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langHi, setLangHi] = useState(false);
  const [dealerModalOpen, setDealerModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof sessionStorage === "undefined") return false;
    const seen = sessionStorage.getItem("tapovanam_splash_seen");
    return !seen;
  });
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Separate logo state — stored independently from dealer profile photo
  const [logoUrl, setLogoUrl] = useState<string>(() => {
    return localStorage.getItem("tapovanam_logo_url") ?? "";
  });

  async function handleLogoFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("File read failed"));
        reader.readAsDataURL(file);
      });
      localStorage.setItem("tapovanam_logo_url", dataUrl);
      setLogoUrl(dataUrl);
      toast.success("Logo uploaded successfully!");
    } catch {
      toast.error("Logo upload failed");
    }
    e.target.value = "";
  }

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSplashComplete() {
    sessionStorage.setItem("tapovanam_splash_seen", "1");
    setShowSplash(false);
  }

  return (
    <div className="min-h-screen flex flex-col relative z-0">
      {/* Global video background — fixed, behind everything */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="global-video-bg"
        tabIndex={-1}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          type="video/mp4"
        />
      </video>
      {/* Fallback gradient behind video */}
      <div className="global-video-fallback" aria-hidden="true" />

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Header */}
      <header
        className={[
          "sticky top-0 z-40 border-b border-border transition-all duration-300",
          isScrolled
            ? "glass-light dark:glass-dark shadow-elevation"
            : "bg-card shadow-card",
        ].join(" ")}
        data-ocid="layout-header"
      >
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            {/* Logo area — separate click zone from text link */}
            <div className="relative shrink-0">
              <Link
                to="/"
                className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
                data-ocid="nav-home"
              >
                {/* Logo: uploaded image or fallback SVG */}
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Tapovanam Realty Services Logo"
                    className="w-11 h-11 rounded-lg object-cover shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Tapovanam Realty Services Logo"
                    className="shrink-0 drop-shadow-sm"
                    role="img"
                  >
                    <title>Tapovanam Realty Services Logo</title>
                    <circle cx="22" cy="10" r="4" fill="url(#sunGrad)" />
                    <line
                      x1="22"
                      y1="4"
                      x2="22"
                      y2="2"
                      stroke="#C9860A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="22"
                      y1="18"
                      x2="22"
                      y2="16"
                      stroke="#C9860A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="16"
                      y1="10"
                      x2="14"
                      y2="10"
                      stroke="#C9860A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="30"
                      y1="10"
                      x2="28"
                      y2="10"
                      stroke="#C9860A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="17.8"
                      y1="5.8"
                      x2="16.4"
                      y2="4.4"
                      stroke="#C9860A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="27.6"
                      y1="15.6"
                      x2="26.2"
                      y2="14.2"
                      stroke="#C9860A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="26.2"
                      y1="5.8"
                      x2="27.6"
                      y2="4.4"
                      stroke="#C9860A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="16.4"
                      y1="15.6"
                      x2="17.8"
                      y2="14.2"
                      stroke="#C9860A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <polygon points="22,17 12,25 32,25" fill="url(#roofGrad)" />
                    <rect
                      x="14"
                      y="25"
                      width="16"
                      height="13"
                      rx="1"
                      fill="url(#wallGrad)"
                    />
                    <rect
                      x="19.5"
                      y="30"
                      width="5"
                      height="8"
                      rx="1"
                      fill="#8B5E07"
                    />
                    <rect
                      x="15.5"
                      y="27"
                      width="3.5"
                      height="3.5"
                      rx="0.5"
                      fill="url(#windowGrad)"
                    />
                    <rect
                      x="25"
                      y="27"
                      width="3.5"
                      height="3.5"
                      rx="0.5"
                      fill="url(#windowGrad)"
                    />
                    <ellipse
                      cx="8"
                      cy="28"
                      rx="3.5"
                      ry="4.5"
                      fill="url(#treeGrad)"
                    />
                    <rect
                      x="7.2"
                      y="32"
                      width="1.6"
                      height="6"
                      rx="0.8"
                      fill="#8B6914"
                    />
                    <ellipse
                      cx="36"
                      cy="28"
                      rx="3.5"
                      ry="4.5"
                      fill="url(#treeGrad)"
                    />
                    <rect
                      x="35.2"
                      y="32"
                      width="1.6"
                      height="6"
                      rx="0.8"
                      fill="#8B6914"
                    />
                    <polygon
                      points="22,17 12,25 32,25"
                      fill="url(#roofShimmer)"
                      opacity="0.35"
                    />
                    <defs>
                      <linearGradient
                        id="sunGrad"
                        x1="18"
                        y1="6"
                        x2="26"
                        y2="14"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFD966" />
                        <stop offset="1" stopColor="#C9860A" />
                      </linearGradient>
                      <linearGradient
                        id="roofGrad"
                        x1="12"
                        y1="17"
                        x2="32"
                        y2="25"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#D4960E" />
                        <stop offset="0.5" stopColor="#F5C842" />
                        <stop offset="1" stopColor="#A86D08" />
                      </linearGradient>
                      <linearGradient
                        id="roofShimmer"
                        x1="12"
                        y1="17"
                        x2="32"
                        y2="25"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" stopOpacity="0" />
                        <stop
                          offset="0.4"
                          stopColor="white"
                          stopOpacity="0.7"
                        />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient
                        id="wallGrad"
                        x1="14"
                        y1="25"
                        x2="30"
                        y2="38"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FDE99A" />
                        <stop offset="1" stopColor="#E8C05A" />
                      </linearGradient>
                      <linearGradient
                        id="windowGrad"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                        gradientUnits="objectBoundingBox"
                      >
                        <stop stopColor="#B8E0F7" />
                        <stop offset="1" stopColor="#7BBFDB" />
                      </linearGradient>
                      <linearGradient
                        id="treeGrad"
                        x1="4.5"
                        y1="23.5"
                        x2="11.5"
                        y2="32.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#6DB86A" />
                        <stop offset="1" stopColor="#3A7A38" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </Link>
              {/* Upload overlay — outside Link to prevent navigation conflict */}
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-lg transition-colors opacity-0 hover:opacity-100 z-10"
                aria-label="Upload logo"
                data-ocid="logo-upload-button"
              >
                <span className="text-white text-[10px] font-semibold leading-none">
                  Upload
                </span>
              </button>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoFileChange}
                data-ocid="logo-upload-input"
              />
            </div>
            <Link
              to="/"
              className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              aria-label="Go to home"
            >
              <span className="font-display font-semibold text-foreground leading-none truncate max-w-[150px] sm:max-w-none">
                <span className="text-sm sm:text-base">Tapovanam</span>
                <span className="text-primary text-sm sm:text-base">
                  {" "}
                  Realty
                </span>
              </span>
            </Link>
          </div>

          {/* Nav actions */}
          <nav
            className="flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {/* Dashboard button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                window.location.href = "/admin";
              }}
              className="gap-1.5 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 px-2 font-medium"
              aria-label="Property Dashboard"
              data-ocid="nav-dashboard"
            >
              <BarChart2 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>

            {/* Dealer Profile button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setDealerModalOpen(true)}
              className="gap-1.5 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 px-2 font-medium"
              aria-label="View dealer profile"
              data-ocid="nav-dealer-profile"
            >
              <UserCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">Shubham Sharma</span>
            </Button>

            {/* Language toggle */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setLangHi((h) => !h)}
              className="gap-1 text-xs text-muted-foreground hover:text-foreground px-2"
              aria-label="Toggle language"
              data-ocid="nav-lang-toggle"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{langHi ? "HI" : "EN"}</span>
            </Button>

            {/* Dark mode toggle */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-muted-foreground hover:text-foreground px-2"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              data-ocid="nav-darkmode-toggle"
            >
              <motion.span
                key={isDark ? "moon" : "sun"}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </motion.span>
            </Button>
          </nav>
        </div>
      </header>

      {/* Dealer Profile Modal */}
      <DealerProfileModal
        open={dealerModalOpen}
        onOpenChange={setDealerModalOpen}
      />

      {/* Main content — semi-transparent so video shows through */}
      <main className="flex-1 relative z-0" id="main-content">
        <div className="bg-background/90 dark:bg-background/90 backdrop-blur-sm min-h-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-foreground text-sm">
              Tapovanam<span className="text-primary"> Realty Services</span>
            </span>
            <span className="text-muted-foreground text-sm ml-1">
              — Premium Land &amp; Plot Listings
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">.</p>
        </div>
      </footer>
    </div>
  );
}
