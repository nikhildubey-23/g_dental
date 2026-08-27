# Premium Glassmorphism Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the existing Gouraha Dant Chikitsalaya Next.js site from its flat look to a premium soft-modern glassmorphism design across all 7 pages, wire in the real Google Map embed, add premium micro-interactions, and upgrade typography — while building on shadcn/ui primitives.

**Architecture:** Keep the existing App Router pages, `lib/data.ts` content layer, and `components/sections/*`. Introduce shadcn/ui (init then add primitives), a shared glass utility (`GlassCard` wrapper), a theme update in `globals.css` (colors + Plus Jakarta Sans heading font), and restyle each section/page in place. Preserve all existing behavior (booking forms → WhatsApp, icon resolver, etc.).

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui (Tailwind v4 + RSC-kit / opensource registry), Framer Motion, Lucide React.

## Global Constraints

- Preserve the App Router page structure and all existing routes.
- Keep `lib/data.ts` as the content source; do not remove the `mapEmbedUrl`, `whatsappLink`, or `resolveServiceIcon` interface.
- New color tokens (globals.css): primary `#0d9488`, primary-hover `#0f766e`, accent `#f59e0b`, accent-hover `#d97706`, background `#f8fafc`, card `#ffffff/60`, surface `#f1f5f9`, muted `#64748b`, text `#0f172a`; blob colors `#99f6e4`, `#bae6fd`, `#ddd6fe`.
- Add Plus Jakarta Sans as the heading font (`--font-plus-jakarta`), keep Inter as body. Both via `next/font/google` (fall back to local Inter files if network unavailable).
- Real map embed URL for the clinic (coordinates 22.0993603, 82.1534016; place id `0x3a280b01e277faef:0xf4c136daa972a5b3`):
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!3d3150!2d82.1534016!3d22.0993603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b01e277faef%3A0xf4c136daa972a5b3!2sGouraha%20Dant%20Chikitsalaya!5e0!3m2!1sen!2sin!4v1700000000000`
- Glass signature classes: `bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_40px_rgba(13,148,136,0.08)]`.
- All sections keep "use client" where they use Framer Motion; server pages stay server components.
- Do not break the WhatsApp form-submit behavior in `app/contact/page.tsx` and `app/book-appointment/page.tsx`.
- Every task must pass `npx tsc --noEmit` and, where feasible, `npm run build`.

---

### Task 1: Initialize shadcn/ui & Add Primitives

**Files:**
- Create: `components.json`, `components/ui/*` (button, card, input, textarea, label, select, accordion, dialog, badge, separator)
- Modify: `package.json`, `app/globals.css`, `lib/utils.ts` (may already have cn)

**Context:**
- The project currently has NO `components.json`. Tailwind v4 is already configured via `@theme inline` in `globals.css`. shadcn for Tailwind v4 stores tokens in CSS variables.

**Steps:**

- [ ] **Step 1: Initialize shadcn**

```bash
cd /home/nikhil/Desktop/dental_g
npx shadcn@latest init --yes --base-color slate
```

Answer prompts to accept defaults. This creates `components.json`, installs shadcn dependency, and merges shadcn's CSS variables into `app/globals.css`.

If init fails due to the custom `@theme inline` block, resolve the conflict deterministically: keep shadcn's `:root`/`.dark` CSS variable blocks that it adds, and re-apply our custom tokens (primary `#0d9488`, accent `#f59e0b`, etc.) on top. Do NOT delete Tailwind v4's `@import "tailwindcss"`.

- [ ] **Step 2: Add primitives**

```bash
cd /home/nikhil/Desktop/dental_g
npx shadcn@latest add button card input textarea label select accordion dialog badge separator --yes
```

Verify files exist under `components/ui/` (button.tsx, card.tsx, input.tsx, textarea.tsx, label.tsx, select.tsx, accordion.tsx, dialog.tsx, badge.tsx, separator.tsx).

- [ ] **Step 3: Re-apply theme tokens to globals.css**

Ensure `app/globals.css` contains these custom tokens regardless of what shadcn wrote (merge, don't replace):

```css
@theme inline {
  --color-primary: #0d9488;
  --color-primary-hover: #0f766e;
  --color-accent: #f59e0b;
  --color-accent-hover: #d97706;
  --color-surface: #f1f5f9;
  --color-blob-1: #99f6e4;
  --color-blob-2: #bae6fd;
  --color-blob-3: #ddd6fe;
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-heading: var(--font-plus-jakarta), var(--font-inter), system-ui, sans-serif;
}
```

Also add a reusable utility class under `@layer utilities`:

```css
@utility glass {
  background-color: rgb(255 255 255 / 0.6);
  backdrop-filter: blur(24px);
  border: 1px solid rgb(255 255 255 / 0.4);
  border-radius: 1.5rem;
  box-shadow: 0 8px 40px rgb(13 148 136 / 0.08);
}
```

- [ ] **Step 4: Verify**

```bash
cd /home/nikhil/Desktop/dental_g
npx tsc --noEmit
```

Expected: 0 errors. If shadcn added a new `cn` to `lib/utils.ts` that conflicts with the existing `resolveServiceIcon`, merge both into one file (keep `cn` + `resolveServiceIcon` exports intact).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: initialize shadcn/ui and add base primitives"
```

---

### Task 2: Typography — Plus Jakarta Sans Heading Font

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `--font-plus-jakarta` CSS variable + `.font-heading` mapping in globals (defined in Task 1).

- [ ] **Step 1: Add Plus Jakarta Sans via next/font/google**

Modify `app/layout.tsx`:

```tsx
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});
```

Render on `<html>`: `className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}`.

Note: If the build environment has no network access to Google Fonts at build time, keep the inter `localFont` and add a `font-heading` CSS var pointing at `var(--font-inter)` as a fallback so the build still passes. Report which path was taken.

- [ ] **Step 2: Add a heading font utility**

Add to `globals.css` under `@layer base`:

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
```

- [ ] **Step 3: Verify build**

```bash
cd /home/nikhil/Desktop/dental_g
npm run build
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: add Plus Jakarta Sans heading typography"
```

---

### Task 3: GlassCard Shared Wrapper + Update data.ts map URL

**Files:**
- Create: `components/ui/glass-card.tsx` (or add glass styles to the shadcn Card)
- Modify: `lib/data.ts` (mapEmbedUrl)

**Interfaces:**
- Produces: `GlassCard` component with props `{ children, className?, hover?: boolean }`.

- [ ] **Step 1: Update the real map embed URL in data.ts**

In `lib/data.ts`, replace `mapEmbedUrl` with:

```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!3d3150!2d82.1534016!3d22.0993603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b01e277faef%3A0xf4c136daa972a5b3!2sGouraha%20Dant%20Chikitsalaya!5e0!3m2!1sen!2sin!4v1700000000000
```

- [ ] **Step 2: Create GlassCard**

Create `components/ui/glass-card.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(13,148,136,0.16)]",
        className
      )}
    >
      {children}
    </div>
  );
}
```

(`glass` utility is defined in Task 1's globals.css `@layer utilities`.)

- [ ] **Step 3: Verify**

```bash
cd /home/nikhil/Desktop/dental_g
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/glass-card.tsx lib/data.ts
git commit -m "feat: add GlassCard wrapper and real clinic map embed URL"
```

---

### Task 4: Redesign Navbar + Floating Blobs Background

**Files:**
- Create: `components/Blobs.tsx`
- Modify: `components/Navbar.tsx`

**Interfaces:**
- Consumes: `navLinks`, `clinicInfo` from `@/lib/data`, shadcn `Button`.
- Produces: `Blobs` decorative component (animated background blobs, `"use client"`); refined glass navbar.

- [ ] **Step 1: Create Blobs component**

Create `components/Blobs.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export default function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blob-1/50 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-blob-2/50 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blob-3/40 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Restyle Navbar as floating glass pill**

Rewrite `components/Navbar.tsx` so the `<nav>` uses a floating glass pill container instead of a full-width solid bar:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, clinicInfo } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
          isScrolled ? "glass shadow-lg" : "bg-white/40 backdrop-blur-xl border border-white/30"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-white font-bold text-lg">
            G
          </span>
          <span className="hidden sm:block leading-tight">
            <span className="block font-bold text-slate-900 text-sm">Gouraha Dant</span>
            <span className="block text-xs text-slate-500">Chikitsalaya</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href={`tel:${clinicInfo.phoneLink}`} className="flex items-center gap-2 text-sm text-slate-600">
            <Phone size={16} />
            {clinicInfo.phone}
          </a>
          <Link
            href="/book-appointment"
            className="rounded-full bg-gradient-to-r from-accent to-accent-hover px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="md:hidden p-2 text-slate-900"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden mx-auto max-w-6xl mt-2 glass rounded-3xl p-5 shadow-xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl px-4 py-3 text-slate-700 font-medium hover:bg-primary/10 hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/book-appointment"
              className="mt-2 rounded-xl bg-gradient-to-r from-accent to-accent-hover px-4 py-3 text-center font-semibold text-white"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
```

Note: Because the navbar now floats (top-4 inset-x-0), the base template inline style `isScrolled ? "glass shadow-lg" : "bg-white/40 ..."` keeps it visible over the hero. All inner-page heroes already add top padding (pt-32) so content won't hide under the floating nav.

- [ ] **Step 3: Verify**

```bash
cd /home/nikhil/Desktop/dental_g
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add components/Blobs.tsx components/Navbar.tsx
git commit -m "feat: redesign navbar as floating glass pill with active states"
```

---

### Task 5: Redesign Hero Section (Light Mesh + Glass)

**Files:**
- Modify: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `clinicInfo`, `stats`, `Blobs` from Task 4.
- Produces: Premium light-mesh hero with floating trust card and CTA.

- [ ] **Step 1: Rewrite Hero**

Replace `components/sections/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Star, Phone, ArrowRight } from "lucide-react";
import { clinicInfo, stats } from "@/lib/data";
import Blobs from "@/components/Blobs";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const rating = stats[3];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e0f2f1] via-white to-[#e0f2fe] min-h-screen flex items-center pt-28">
      <Blobs />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/50 px-4 py-1.5 text-sm font-medium text-teal-700">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                {clinicInfo.name}
              </span>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
                {clinicInfo.tagline}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600">
                {clinicInfo.subtitle} — advanced dental care with a gentle, comforting touch.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-accent to-accent-hover hover:opacity-95 shadow-lg">
                  <a href="/book-appointment">
                    Book Appointment <ArrowRight size={18} />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-white/60 backdrop-blur border-white/60 text-slate-700">
                  <a href="/services">Our Services</a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right glass cards */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex flex-col gap-6"
            >
              <GlassCard hover className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-white">
                    <Star size={26} />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900">
                      {rating.value}★ Trusted
                    </p>
                    <p className="text-sm text-slate-500">{rating.label}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-hover text-white">
                    <Phone size={26} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Call us anytime</p>
                    <a href={`tel:${clinicInfo.phoneLink}`} className="text-xl font-extrabold text-slate-900 hover:text-primary">
                      {clinicInfo.phone}
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  {stats[0].value}+ Years · {stats[1].value}+ Happy Patients
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

Note: uses shadcn `Button` (which supports `asChild`). If the local shadcn Button lacks `asChild`, wrap the `<a>` with the glass gradient classes directly instead and keep `Button` for the outline variant only if compatible — report which approach. Ensure imports match what shadcn generated (`@/components/ui/button`).

- [ ] **Step 2: Verify**

```bash
cd /home/nikhil/Desktop/dental_g
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: redesign hero with light mesh and floating glass cards"
```

---

### Task 6: Treatment Marquee + Restyle ServicesPreview

**Files:**
- Modify: `components/sections/ServicesPreview.tsx`

**Interfaces:**
- Consumes: `services`, `resolveServiceIcon` from `@/lib/utils`, `GlassCard`.
- Produces: treatment marquee + glass service cards.

- [ ] **Step 1: Rewrite ServicesPreview with marquee + glass cards**

Replace `components/sections/ServicesPreview.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { resolveServiceIcon } from "@/lib/utils";
import GlassCard from "@/components/ui/glass-card";

export default function ServicesPreview() {
  return (
    <section className="relative py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Treatment marquee */}
        <div className="relative overflow-hidden rounded-3xl bg-teal-50/60 border border-teal-100 py-4 mb-14">
          <div className="flex w-max animate-marquee gap-10 px-10">
            {[...services, ...services].map((s, i) => (
              <span key={i} className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-teal-700">
                {s.title}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Our Services</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Comprehensive dental care with advanced technology and gentle hands
          </p>
          <span className="mx-auto mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = resolveServiceIcon(service.icon);
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <GlassCard hover className="p-8 h-full">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 text-primary">
                      <Icon size={26} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-slate-900">{service.title}</h3>
                    <p className="mb-4 text-slate-600 leading-relaxed">{service.shortDescription}</p>
                    <span className="inline-flex items-center gap-1 font-semibold text-primary">
                      Learn More <ArrowRight size={16} />
                    </span>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add marquee keyframe + pause**

Add to `globals.css` under `@layer utilities`:

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

- [ ] **Step 3: Verify**

```bash
cd /home/nikhil/Desktop/dental_g
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/ServicesPreview.tsx app/globals.css
git commit -m "feat: add treatment marquee and glass service cards"
```

---

### Task 7: Restyle AboutSnippet + StatsCounter

**Files:**
- Modify: `components/sections/AboutSnippet.tsx`, `components/sections/StatsCounter.tsx`

**Interfaces:**
- Consumes: `clinicInfo`, `stats`, `GlassCard`, `Blobs`.
- Produces: Glass about section + glass animated stat cards.

- [ ] **Step 1: Restyle AboutSnippet**

Replace `components/sections/AboutSnippet.tsx` with a glass two-column layout:

```tsx
"use client";

import Link from "next/link";
import { clinicInfo } from "@/lib/data";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function AboutSnippet() {
  return (
    <section className="relative py-24 overflow-hidden bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <GlassCard hover className="p-8 text-center">
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-3xl font-extrabold text-primary">
                DG
              </div>
              <h3 className="text-xl font-bold text-slate-900">{clinicInfo.doctor.name}</h3>
              <p className="text-slate-500">{clinicInfo.doctor.degree}</p>
              <span className="mt-4 inline-block rounded-full bg-accent/15 px-4 py-1 text-sm font-semibold text-accent">
                {clinicInfo.doctor.experience} Years Experience
              </span>
            </GlassCard>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">About the Doctor</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">
              Meet {clinicInfo.doctor.name}
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">{clinicInfo.doctor.bio}</p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              With expertise in {clinicInfo.doctor.specialization}, Dr. Gouraha combines advanced
              technology with a gentle, patient-first approach.
            </p>
            <Button asChild className="mt-8 rounded-full bg-gradient-to-r from-primary to-primary-hover shadow-lg">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Restyle StatsCounter as glass KPI cards**

Replace `components/sections/StatsCounter.tsx`:

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Users, Clock, Smile } from "lucide-react";
import { stats } from "@/lib/data";
import GlassCard from "@/components/ui/glass-card";

const iconMap = [Smile, Users, Clock, Star];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const inc = value / steps;
    const isDecimal = value % 1 !== 0;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(cur.toFixed(1)) : Math.floor(cur));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsCounter() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-teal-50 to-sky-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = iconMap[i % iconMap.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard hover className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary">
                    <Icon size={24} />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

```bash
cd /home/nikhil/Desktop/dental_g
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/AboutSnippet.tsx components/sections/StatsCounter.tsx
git commit -m "feat: glass about section and glass animated stat cards"
```

---

### Task 8: Restyle Testimonials + CTABanner + ContactPreview

**Files:**
- Modify: `components/sections/Testimonials.tsx`, `components/sections/CTABanner.tsx`, `components/sections/ContactPreview.tsx`

**Interfaces:**
- Consumes: `testimonials`, `clinicInfo`, `GlassCard`, shadcn `Card`/`Button`.

- [ ] **Step 1: Restyle Testimonials as glass carousel**

Replace `components/sections/Testimonials.tsx` using `GlassCard`, `Star`, and `AnimatePresence` (keep the existing carousel logic but swap `bg-surface` for `glass`) plus add `aria-label` on prev/next buttons:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import GlassCard from "@/components/ui/glass-card";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">What Our Patients Say</h2>
        <span className="mx-auto mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />

        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard className="p-10">
                <Quote size={40} className="mx-auto mb-6 text-primary/30" />
                <p className="text-lg text-slate-700 italic leading-relaxed">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div className="mt-5 flex justify-center gap-1">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 font-bold text-slate-900">{testimonials[current].name}</p>
                <p className="text-sm text-primary">{testimonials[current].treatment}</p>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 backdrop-blur border border-white/60 shadow-md hover:bg-white hover:shadow-lg transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 backdrop-blur border border-white/60 shadow-md hover:bg-white hover:shadow-lg transition"
          >
            <ChevronRight size={20} />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${i === current ? "bg-primary" : "bg-slate-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Restyle CTABanner with glass foreground panel**

Replace `components/sections/CTABanner.tsx`:

```tsx
"use client";

import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function CTABanner() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary to-primary-hover">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-white" />
          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-white" />
        </div>
        <GlassCard className="relative z-10 mx-auto max-w-2xl p-10 border-white/50 bg-white/20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready for Your Perfect Smile?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Book your free consultation today and take the first step toward a healthier, confident smile.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-accent hover:bg-accent-hover text-white shadow-lg">
            <a href="/book-appointment">Book Your Free Consultation</a>
          </Button>
        </GlassCard>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Restyle ContactPreview with real map**

Replace `components/sections/ContactPreview.tsx` — keep the info cards but make them glass and use the real `clinicInfo.mapEmbedUrl` in a rounded glass frame:

```tsx
"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import { clinicInfo } from "@/lib/data";
import GlassCard from "@/components/ui/glass-card";

export default function ContactPreview() {
  const items = [
    { Icon: MapPin, label: "Address", value: clinicInfo.address },
    { Icon: Phone, label: "Phone", value: clinicInfo.phone, href: `tel:${clinicInfo.phoneLink}` },
    { Icon: Clock, label: "Hours", value: clinicInfo.hours },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Visit Us</h2>
          <span className="mx-auto mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {items.map(({ Icon, label, value, href }) => (
              <GlassCard key={label} hover className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{label}</h3>
                  {href ? (
                    <a href={href} className="text-slate-600 hover:text-primary">{value}</a>
                  ) : (
                    <p className="text-slate-600">{value}</p>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="overflow-hidden p-2">
            <iframe
              src={clinicInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clinic Location"
            />
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

```bash
cd /home/nikhil/Desktop/dental_g
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Testimonials.tsx components/sections/CTABanner.tsx components/sections/ContactPreview.tsx
git commit -m "feat: glass testimonials, CTA banner, and contact preview with real map"
```

---

### Task 9: Restyle Footer + WhatsApp Button

**Files:**
- Modify: `components/Footer.tsx`, `components/WhatsAppButton.tsx`

**Interfaces:**
- Consumes: `clinicInfo`, `navLinks`, `services` from `@/lib/data`.

- [ ] **Step 1: Restyle Footer**

Replace `components/Footer.tsx` with a light glass-footer design (keep 4 columns + newsletter input):

```tsx
import Link from "next/link";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { clinicInfo, navLinks, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-xl border-t border-teal-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-white font-bold">
                G
              </span>
              <div>
                <p className="font-bold text-slate-900 leading-tight">Gouraha Dant</p>
                <p className="text-sm text-slate-500">Chikitsalaya</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Trusted dental care in Bilaspur, Chhattisgarh. Advanced technology and compassionate care.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-600 hover:text-primary text-sm">{l.label}</Link>
                </li>
              ))}
              <li><Link href="/book-appointment" className="text-slate-600 hover:text-primary text-sm">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Our Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-slate-600 hover:text-primary text-sm">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-3"><MapPin size={18} className="shrink-0 mt-0.5" /> {clinicInfo.address}</li>
              <li>
                <a href={`tel:${clinicInfo.phoneLink}`} className="flex gap-3 hover:text-primary"><Phone size={18} className="shrink-0" /> {clinicInfo.phone}</a>
              </li>
              <li className="flex gap-3"><Clock size={18} className="shrink-0" /> {clinicInfo.hours}</li>
              <li><a href={`mailto:${clinicInfo.email}`} className="flex gap-3 hover:text-primary"><Mail size={18} className="shrink-0" /> {clinicInfo.email}</a></li>
            </ul>
            <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-full border border-teal-200 bg-white/70 px-4 py-2 text-sm outline-none focus:border-primary"
              />
              <button className="rounded-full bg-gradient-to-r from-primary to-primary-hover px-4 py-2 text-sm font-medium text-white">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-teal-100">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {clinicInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Restyle WhatsApp button with pulse**

Replace `components/WhatsAppButton.tsx`:

```tsx
"use client";

import { MessageCircle } from "lucide-react";
import { clinicInfo } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a
      href={clinicInfo.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
      <MessageCircle size={28} className="relative" />
    </a>
  );
}
```

- [ ] **Step 3: Verify**

```bash
cd /home/nikhil/Desktop/dental_g
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx components/WhatsAppButton.tsx
git commit -m "feat: glass footer with newsletter and pulsating WhatsApp button"
```

---

### Task 10: Restyle About + Services Pages

**Files:**
- Modify: `app/about/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx`

**Interfaces:**
- Consumes: `clinicInfo`, `services`, `resolveServiceIcon`, `GlassCard`, shadcn `Accordion`, `Badge`, `Button`, `Blobs`.

**Steps:**

- [ ] **Step 1: Restyle About page**

Update `app/about/page.tsx` to use glass sections: gradient hero, `GlassCard` doctor profile frame, glass values cards, real map embed, `Blobs` background. Replace the solid teal hero backgrounds with the light gradient + blobs. Keep the same exported `Metadata` and content.

Key change — hero section:

```tsx
<section className="relative overflow-hidden pt-28 pb-16 bg-gradient-to-br from-teal-50 via-white to-sky-50">
  <Blobs />
  <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">About the Doctor</h1>
    <p className="mx-auto mt-4 max-w-2xl text-slate-600">
      Dedicated to creating healthy, beautiful smiles for over {clinicInfo.doctor.experience} years
    </p>
  </div>
</section>
```

Wrap the values grid in `GlassCard`. Add a map section using `clinicInfo.mapEmbedUrl` inside `GlassCard`. Convert the qualifications list to use shadcn `Badge` components.

- [ ] **Step 2: Restyle Services overview page**

Update `app/services/page.tsx` — glass hero (same pattern as About), glass service cards using `GlassCard` + `resolveServiceIcon`, gradient CTA. Keep the `Metadata` and `iconMap`→resolver already used.

- [ ] **Step 3: Restyle service detail page**

Update `app/services/[slug]/page.tsx`:
- Replace solid hero with the light gradient + blobs pattern.
- Convert the FAQ list to shadcn `Accordion` (accordion items with `Question`/`Answer`).
- Wrap benefits/process in `GlassCard`s.
- Keep `generateStaticParams`/`generateMetadata`, `notFound`, and await-params logic.

- [ ] **Step 4: Verify**

```bash
cd /home/nikhil/Desktop/dental_g
npm run build
```

Expected: build succeeds with all service pages statically generated.

- [ ] **Step 5: Commit**

```bash
git add app/about app/services
git commit -m "feat: glass about and services pages with accordion FAQs"
```

---

### Task 11: Restyle Smile Gallery, Contact, Booking Pages

**Files:**
- Modify: `app/smile-gallery/page.tsx`, `app/contact/page.tsx`, `app/book-appointment/page.tsx`

**Interfaces:**
- Consumes: `services`, `clinicInfo`, shadcn `Dialog`, `Input`, `Textarea`, `Select`, `GlassCard`, `Blobs`.
- Preserve: WhatsApp form-submit behavior in contact + booking.

**Steps:**

- [ ] **Step 1: Restyle Smile Gallery**

Update `app/smile-gallery/page.tsx`:
- Glass hero (light gradient + blobs).
- Filter tabs as glass pill buttons (rounded-full white/70 backdrop-blur, active = primary bg white text).
- Gallery grid with hover zoom (add `group-hover:scale-105` on the placeholder image block).
- Replace the custom lightbox modal with shadcn `Dialog` (DialogContent) showing title/description.
- Keep CTA at bottom (glass).

- [ ] **Step 2: Restyle Contact page**

Update `app/contact/page.tsx`:
- Glass hero.
- Full-width real map in a `GlassCard` frame.
- Glass info cards.
- Swap manual form inputs for shadcn `Input`/`Textarea`/`Label`.
- **Keep the WhatsApp submit behavior** (`handleSubmit` opening `wa.me` with pre-filled text). Only restyle.

- [ ] **Step 3: Restyle Booking page**

Update `app/book-appointment/page.tsx`:
- Glass hero.
- Use shadcn `Input`, `Label`, and `Select` for service/time dropdowns (or keep native select if shadcn Select integration is heavy — report choice). Keep date/time inputs.
- Success state as `GlassCard`.
- **Keep the WhatsApp submit behavior.**

- [ ] **Step 4: Verify**

```bash
cd /home/nikhil/Desktop/dental_g
npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/smile-gallery app/contact app/book-appointment
git commit -m "feat: glass gallery, contact, and booking pages"
```

---

### Task 12: Final Polish & Full Build Verification

**Files:**
- Modify: as needed to fix any issues.

**Steps:**

- [ ] **Step 1: Run full typecheck + lint**

```bash
cd /home/nikhil/Desktop/dental_g
npx tsc --noEmit
npm run lint
```

Fix any errors.

- [ ] **Step 2: Run production build**

```bash
cd /home/nikhil/Desktop/dental_g
npm run build
```

Expected: build succeeds, all routes generated, no errors/warnings.

- [ ] **Step 3: Start dev server and smoke-test all pages**

```bash
npm run dev &
sleep 6
for p in / /about /services /services/dental-implants /smile-gallery /contact /book-appointment; do
  echo "$p -> $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)"
done
kill %1
```

Expected: all return 200.

- [ ] **Step 4: Commit any fixes + tag**

```bash
git add -A
git commit -m "chore: final polish and build verification" || echo "nothing to commit"
git tag -f -a v2.0.0 -m "v2.0.0: Premium glassmorphism redesign"
```
