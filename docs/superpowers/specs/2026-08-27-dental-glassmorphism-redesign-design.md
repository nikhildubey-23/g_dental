# Premium Glassmorphism Redesign — Dental Clinic Website

## Overview

Redesign the existing Gouraha Dant Chikitsalaya website from its current clean-but-flat look to a **soft modern glassmorphism** premium aesthetic. Restyle all 7 pages, add micro-interactions and premium extras, wire in the real Google Map embed, and upgrade typography.

## Design Direction

- **Soft modern glassmorphism:** layered depth through gradient blobs + frosted-glass (`backdrop-blur`) surfaces with white borders and soft shadows.
- **Light gradient mesh hero** with floating animated blobs.
- Build on **shadcn/ui** accessible primitives, re-themed via CSS variables / Tailwind tokens.

## Google Map

The embedded map must use the real clinic location:
- Coordinates: `22.0993603, 82.1534016`
- Place ID from shared URL: `0x3a280b01e277faef:0xf4c136daa972a5b3`
- Embed URL:
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!3d3150!2d82.1534016!3d22.0993603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b01e277faef%3A0xf4c136daa972a5b3!2sGouraha%20Dant%20Chikitsalaya!5e0!3m2!1sen!2sin!4v1700000000000`
- Used in: `components/sections/ContactPreview.tsx`, `app/contact/page.tsx`, `app/about/page.tsx`

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#0d9488` | Buttons, links, active states |
| `primary-foreground` | `#ffffff` | Text on primary |
| `primary-hover` | `#0f766e` | Button hover |
| `accent` | `#f59e0b` | CTA, highlights |
| `accent-hover` | `#d97706` | CTA hover |
| `background` | `#f8fafc` | Page base |
| `card` | `#ffffff/60` | Glass card bg (with blur) |
| `surface` | `#f1f5f9` | Section alt bg |
| `muted` | `#64748b` | Secondary text |
| `text` | `#0f172a` | Headings/body |
| `blob-1` | `#99f6e4` | Teal mesh blob |
| `blob-2` | `#bae6fd` | Sky mesh blob |
| `blob-3` | `#ddd6fe` | Violet mesh blob |

## Typography

- **Headings:** Plus Jakarta Sans (Google Fonts, `next/font/google`)
- **Body:** Inter (Google Fonts, `next/font/google`)
- Load both with CSS variables applied to `tailwind` theme / `globals.css`.

## Signature Glass Utility

Centralized utility pattern used across all cards/panels:

```tsx
className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_40px_rgba(13,148,136,0.08)]"
```

Floating gradient blobs behind glass:
```tsx
<div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-200/50 rounded-full blur-3xl animate-blob" />
```

## shadcn/ui Components (add via registry)

Restyle these primitives to match the glass theme:
- Button (variants: default, outline, ghost)
- Card (glass-styled)
- Input, Textarea, Label, Select
- Accordion (service FAQs)
- Dialog (smile gallery lightbox)
- Badge (category tags, service chips)
- Separator

## Pages & Sections (redesigned)

### Global
- **Navbar:** floating glass pill nav (sticky, `backdrop-blur-xl bg-white/70`), active-link pill highlight, mobile glass drawer.
- **Footer:** glass top-border, newsletter input + subscribe button, contact columns, social icons, copyright bar.
- **WhatsAppButton:** keep, restyle as glass + green icon with pulse ring.

### Homepage
- **Hero:** light gradient mesh bg, animated floating blobs, gradient-text headline, subtext, glass CTA buttons, floating trust card ("4.9★ 10,000+ patients") and booking/phone glass card, scroll indicator, staggered Framer Motion reveals. Add a **treatment marquee** strip.
- **AboutSnippet:** two-column, glass image frame with floating experience badge, bio, "Learn More" glass button.
- **ServicesPreview:** glass service cards with gradient icon chips, hover lift + subtle scale, "Learn More" link. 3-col grid.
- **StatsCounter:** glass KPI cards, animated counters, icon chips.
- **Testimonials:** glass carousel, quote icon, star ratings, prev/next glass buttons, dots.
- **CTABanner:** gradient teal banner with glass foreground panel, big heading, amber CTA.
- **ContactPreview:** glass info cards (address/phone/hours) + real Google Map embed in rounded glass frame.

### Inner pages (reskin existing logic to glass theme)
- **About:** doctor profile with glass frame, qualifications checklist, values cards, map embeds.
- **Services overview + detail:** glass hero, icon chips, benefits checklist, process timeline, **Accordion** for FAQs, related services.
- **Smile Gallery:** filters as glass pill buttons, grid with hover zoom, **Dialog** lightbox (before/after), CTA.
- **Contact:** full-width real map, glass info cards, glass form (Input/Textarea) with WhatsApp submit.
- **Book Appointment:** glass form (Input, Select, date/time), success glass panel, WhatsApp quick action.

## Micro-interactions & Extras
- Scroll-triggered fade-up reveals (existing ScrollFadeIn, refactored to glass)
- Floating blob animation (Framer Motion `animate` loop)
- Treatment marquee (auto-scrolling strip)
- Number count-up on stats
- Hover zoom on gallery images
- Button hover gradients/shadows
- Marquee + glass hover states everywhere

## Existing Architecture (keep)
- App Router pages, `lib/data.ts` content layer, `components/sections/*`, `lib/utils.ts` (cn, plus new `resolveServiceIcon`).

## Security / Best Practices
- No hardcoded secrets.
- External images via Unsplash (hero/gallery placeholders) — replaceable with real clinic photos later.
- `next.config.ts` add `images.remotePatterns` only if using `next/image`; otherwise keep CSS backgrounds.
