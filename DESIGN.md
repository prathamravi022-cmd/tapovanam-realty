# Design Brief

# Design Brief

## Purpose & Tone
Premium real estate showcase platform for Tapovanam Realty Services. Editorial minimalism elevated with modern interactivity—clean, trustworthy, tactile. 3D card interactions, glassmorphism modals, neon accent status, smooth choreography. Property imagery hero; premium tech polish.
Professional real estate property showcase tool for agents presenting land/plot listings to customers. Editorial minimalism—clean, trustworthy, focused. Zero clutter, premium polish.

## Visual Direction
Minimalist editorial + premium tech. Light neutral surfaces, deep teal primary, warm earth secondary. Neon glow success/destructive badges. Glassmorphic modals with backdrop blur. 3D card tilt, smooth Framer Motion transitions, Lottie loaders. Serif headlines (Lora), refined sans body (General Sans). Property images dominate with layered depth hero section.
Minimalist editorial aesthetic with premium depth. Light neutral surfaces, deep teal primary accent, warm earth secondary. Serif headlines convey credibility; refined sans-serif body ensures readability. Property images dominate; data hierarchy guides attention.

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Purpose |
|-------|-------------|-----------|---------|
| Primary | `0.48 0.15 246` | `0.72 0.16 256` | CTAs, highlights, links |
| Secondary | `0.68 0.13 64` | `0.65 0.14 68` | Property badges, warm accents |
| Destructive | `0.54 0.19 28` | `0.65 0.19 22` | Delete, warning states |
| Neon Success | `0.72 0.18 142` | `0.72 0.18 142` | Available status glow badge |
| Neon Destructive | `0.63 0.21 25` | `0.68 0.22 28` | Sold status glow badge |
| Glass Light | rgba(255,255,255,0.7) | rgba(100,100,150,0.15) | Modal glassmorphism |
| Muted | `0.93 0 0` | `0.28 0 0` | Secondary text, dividers |
| Background | `0.98 0 0` | `0.14 0 0` | Main canvas |
| Card | `1.0 0 0` | `0.18 0 0` | Elevated surfaces |
| Foreground | `0.2 0 0` | `0.95 0 0` | Primary text |

## Typography

| Role | Font | Scale | Weight | Leading |
|------|------|-------|--------|---------|
| Display | Lora (Serif) | 32px–48px | 600–700 | 1.2 |
| Body | General Sans (Sans) | 16px | 400–500 | 1.6 |
| Mono | JetBrains Mono | 14px | 400 | 1.5 |
| Badge | General Sans | 12px–14px | 600 | 1.4 |
| Body | General Sans (Sans) | 16px | 400–500 | 1.6 |
| Mono | JetBrains Mono | 14px | 400 | 1.5 |

## Structural Zones

| Zone | Surface | Border | Purpose |
|------|---------|--------|---------|
| Header | `bg-card border-b border-border` + dark mode toggle | Subtle divider | Navigation, branding, mode switch |
| Hero Section | `bg-gradient-to-br from-card to-muted/30` with parallax depth | None | Layered depth-entry image + search |
| Property Card | `bg-card shadow-card` with 3D tilt on hover | `border-border` | Main content; neon status badge |
| Modal/Glass | `.glass-light` / `.glass-dark` with backdrop blur | `border-glass` | Premium property detail overlay |
| Map Section | `bg-card shadow-elevation` with Google Maps embed | `border-border` | Location display + route planner |
| Favorites | Heart icon with `animate-heart-pulse` on click | None | Smooth heart scale animation |
| Footer | `bg-muted/10` | `border-t border-border` | Secondary info; Footer shows only "." |
| Property Card | `bg-card shadow-card` | `border-border` | Main content presentation |
| Detail View | `bg-background` | None | Clean reading surface |
| Footer | `bg-muted/10` | `border-t border-border` | Secondary info, legal |
| Map Section | `bg-card shadow-elevation` | `border-border` | Elevated container for maps |

## Shape Language
Minimal rounding: `0.5rem` (8px) for cards, `0.25rem` (4px) for inputs, no rounding for icons. Tight spacing density (16px base grid).

## Elevation & Depth
Shadow hierarchy: `shadow-card` (subtle, resting), `shadow-elevation` (interactive), `shadow-hover` (focus/hover), `shadow-neon-success` (glow), `shadow-neon-destructive` (glow). Depth via shadows + glassmorphism + 3D perspective. Neon glow on status badges only; no full-page gradients.
Shadow hierarchy: `shadow-card` (subtle, resting), `shadow-elevation` (interactive), `shadow-hover` (focus/hover). No gradients; depth via shadows only.

## Motion & Animation
Smooth transitions: 0.3s cubic-bezier(0.4, 0, 0.2, 1). Entrance: fade-in (0.4s), slide-up (0.3s), float-in (0.5s). Card hover: 3D tilt + shadow-card → shadow-hover. Heart favorite: animate-heart-pulse (0.6s scale 1→1.3→1). Modals: slide-up + blur-backdrop. Lottie loaders on property fetch. Glow-pulse on neon badges (2s). Page transitions via Framer Motion staggered children.
Smooth transitions: 0.3s cubic-bezier(0.4, 0, 0.2, 1). Entrance animations: fade-in (0.4s), slide-up (0.3s). Card hover: shadow-card → shadow-hover transition.

## Component Patterns
**Property Cards**: Image + title + location + price + status badge. Hover state lifts with shadow-hover. Click opens detail view.  
**Detail View**: Hero image gallery (swipeable) + map section + data grid + CTA button.  
**Forms**: Clean inputs with border-input background. Labels in medium weight. Error state: destructive text + red border.

## Constraints
- No full-page backgrounds or decorative patterns
- All color values via CSS tokens (no arbitrary colors)
- Mobile-first responsive (sm, md, lg breakpoints)
- One serif font (display), one sans-serif (body)
- Shadows for depth only; no glows or neon effects
- Card maximum width on desktop: 400px (maintains mobile-first intent)

## Signature Detail
**3D Tilt Cards**: Property cards tilt subtly on mouse/touch (via Framer Motion + perspective). **Neon Status Badges**: Available = bright green glow; Sold = red glow. **Hero Parallax**: Depth-layered background with image parallax on scroll. **Glass Modals**: Property details in frosted-glass overlay with blur backdrop. **Heart Animation**: Favorites trigger pulse animation (1→1.3→1 scale). **Google Maps**: Professional styling, premium markers, shareable property links. **Smooth Choreography**: Staggered card entrances, button ripple effects, modal slide-up. Property images fill 60% viewport on mobile—"land is the hero."
Property images fill 60% of viewport on mobile, creating visual hierarchy that says "land is the hero." Warm secondary accent on status badges creates subtle warmth without compromising minimalism. Maps embedded with clean, high-contrast markers for location clarity.

## Customization Hooks
- Neon glow tokens (`--neon-success`, `--neon-destructive`) for quick badge color pivots
- Glass tokens (`--glass-light`, `--glass-dark`) for modal backdrop customization
- 3D perspective via `.card-tilt` class for future 3D elements
- Animation utilities (`animate-glow-pulse`, `animate-float-in`, `animate-heart-pulse`) for micro-interactions
- Shadow system + neon shadows for depth and visual excitement
- Framer Motion integration for choreographed page transitions
- Lottie animation hooks for loading states and microinteractions
- `--accent` token for quick brand color pivots
- Utility classes for section backgrounds (`bg-muted/10`, `bg-card`) enable layout flexibility
- Animation utilities (`animate-fade-in`, `animate-slide-up`) support future microinteractions
- Shadow system (`shadow-card`, `shadow-elevation`) scales for new components
