import { useEffect, useState } from "react";
import type { Property } from "../backend";
import { PropertyStatus } from "../backend";
import { AnimatedCounter } from "./AnimatedCounter";

interface HomeHeroProps {
  properties: Property[];
  isLoading: boolean;
  lang: "en" | "hi";
}

/* ─── AnimatedHeading: character-by-character entrance ─── */
function AnimatedHeading({
  text,
  delay = 200,
}: { text: string; delay?: number }) {
  const lines = text.split("\n");
  const charDelay = 30; // ms
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <h1
      className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight mb-4"
      style={{ letterSpacing: "-0.04em" }}
    >
      {lines.map((line, lineIdx) => (
        <span key={line} className="block">
          {line.split("").map((char, charIdx) => {
            const d = lineIdx * line.length * charDelay + charIdx * charDelay;
            return (
              <span
                key={`${line}-${char.charCodeAt(0)}-${charIdx}`}
                className="inline-block transition-all duration-500"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateX(0)" : "translateX(-18px)",
                  transitionDelay: `${d}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

/* ─── FadeIn wrapper ─── */
function FadeIn({
  children,
  delay = 0,
  duration = 1000,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="transition-opacity"
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

export function HomeHero({ properties, isLoading, lang }: HomeHeroProps) {
  const available = properties.filter(
    (p) => p.status === PropertyStatus.available,
  ).length;
  const sold = properties.filter(
    (p) => p.status === PropertyStatus.sold,
  ).length;
  const total = isLoading ? 0 : properties.length;

  const headingText =
    lang === "hi"
      ? "आपकी सपनों की संपत्ति\nयहीं आपका इंतज़ार कर रही है"
      : "Your Dream Property\nAwaits You Here";

  const subheadingText =
    lang === "hi"
      ? "भारत के प्रमुख स्थानों पर प्रीमियम प्लॉट और भूमि खोजें।"
      : "Discover premium plots and land in prime locations across India.";

  return (
    <div
      className="relative overflow-hidden"
      style={{ minHeight: "100vh" }}
      data-ocid="hero-section"
    >
      {/* Video background — fixed behind hero content, same as Layout */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="global-video-bg"
        tabIndex={-1}
        aria-hidden="true"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      {/* Fallback gradient if video fails to load */}
      <div className="global-video-fallback" aria-hidden="true" />
      {/* Content pushed to bottom */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-end h-screen pb-12 lg:pb-16">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 pt-6 px-6 md:px-12 lg:px-16">
          <div className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            <span className="text-2xl font-semibold tracking-tight text-white">
              Tapovanam Realty
            </span>
            <div className="hidden md:flex items-center gap-8">
              {["Properties", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
            {/* No right-side button */}
            <div className="w-0 md:w-auto" />
          </div>
        </nav>

        {/* Hero grid */}
        <div className="lg:grid lg:grid-cols-2 lg:items-end gap-8">
          {/* Left column */}
          <div>
            <AnimatedHeading text={headingText} delay={200} />
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl">
                {subheadingText}
              </p>
            </FadeIn>
            {/* Buttons removed as requested */}
          </div>

          {/* Right column — glass tag */}
          <div className="flex items-end justify-start lg:justify-end mt-6 lg:mt-0">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                  Buy. Sell. Invest.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Stats row */}
        <FadeIn delay={1600} duration={1000}>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-8">
            {(
              [
                {
                  label: lang === "hi" ? "कुल संपत्तियां" : "Total Plots",
                  value: total,
                  color: "text-white",
                },
                {
                  label: lang === "hi" ? "उपलब्ध" : "Available",
                  value: available,
                  color: "text-green-300",
                },
                {
                  label: lang === "hi" ? "बिका हुआ" : "Sold",
                  value: sold,
                  color: "text-amber-300",
                },
              ] as const
            ).map(({ label, value, color }) => (
              <div
                key={label}
                className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 min-w-[90px] text-center shadow-lg"
              >
                <div
                  className={`font-display text-3xl sm:text-4xl font-bold ${color}`}
                >
                  <AnimatedCounter value={value} />
                </div>
                <div className="text-white/70 text-xs mt-1 tracking-wide">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
