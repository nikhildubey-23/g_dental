# Dental Clinic Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, patient-acquisition-focused dental clinic website for Gouraha Dant Chikitsalaya using Next.js, Tailwind CSS, and Framer Motion.

**Architecture:** Static Next.js App Router site with 7 pages, global navbar/footer, Framer Motion scroll animations, and hardcoded content. All content in a centralized data file for easy client editing.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, Framer Motion, Lucide React icons

## Global Constraints

- Next.js 14+ App Router with TypeScript
- Tailwind CSS for all styling (no CSS modules, no inline styles)
- Framer Motion for scroll animations (whileInView, fade-up pattern)
- Lucide React for icons
- Static content hardcoded in `lib/data.ts`
- Inter font from Google Fonts via `next/font`
- Color palette: primary `#0891b2`, primary-dark `#0e7490`, accent `#f59e0b`, bg `#ffffff`, surface `#f8fafc`, text `#0f172a`, muted `#64748b`
- Responsive: mobile-first, breakpoints at 640px, 1024px
- WhatsApp button links to `https://wa.me/919685372425`
- Clinic phone: `09685372425` (tel:+919685372425)

---

## File Structure

```
dental_g/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, Navbar, Footer
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind directives + custom utilities
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── services/[slug]/page.tsx
│   ├── smile-gallery/page.tsx
│   ├── contact/page.tsx
│   └── book-appointment/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── ScrollFadeIn.tsx        # Reusable animation wrapper
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── AboutSnippet.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTABanner.tsx
│   │   └── ContactPreview.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── SectionHeading.tsx
├── lib/
│   ├── data.ts                 # All static content
│   └── utils.ts                # cn() helper, formatters
├── public/
│   └── images/                 # Placeholder images
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── postcss.config.mjs
```

---

### Task 1: Project Setup & Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx`, `lib/utils.ts`
- Create: `public/images/` directory

**Interfaces:**
- Produces: Working Next.js dev server with Tailwind, TypeScript, Framer Motion

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /home/nikhil/Desktop/dental_g
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --no-turbopack
```

Select defaults when prompted. This creates the base project structure.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion lucide-react
```

- [ ] **Step 3: Initialize git**

```bash
git init
git add .
git commit -m "chore: initial Next.js project setup with Tailwind, Framer Motion, Lucide"
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | head -20
kill %1
```

Expected: HTML response with Next.js content.

- [ ] **Step 5: Configure Tailwind with custom colors**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0891b2",
          dark: "#0e7490",
        },
        accent: {
          DEFAULT: "#f59e0b",
          hover: "#d97706",
        },
        surface: "#f8fafc",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 6: Create utility helper**

Create `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install clsx and tailwind-merge:

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 7: Set up globals.css**

Replace `app/globals.css`:

```css
@import "tailwindcss";

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-white text-slate-900 antialiased;
  }
}
```

- [ ] **Step 8: Set up root layout with Inter font**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gouraha Dant Chikitsalaya | Dr. Abhishek Gouraha Dental Clinic Bilaspur",
  description:
    "Trusted dental care in Bilaspur, Chhattisgarh. Dr. Abhishek Gouraha offers dental implants, root canal, braces, teeth whitening and more. Book your appointment today.",
  keywords: [
    "dentist bilaspur",
    "dental clinic bilaspur",
    "dr abhishek gouraha",
    "dental implants bilaspur",
    "root canal bilaspur",
    "braces bilaspur",
    "teeth whitening bilaspur",
  ],
  openGraph: {
    title: "Gouraha Dant Chikitsalaya | Dr. Abhishek Gouraha",
    description: "Trusted dental care in Bilaspur, Chhattisgarh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
```

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "feat: configure Tailwind, fonts, root layout, and utilities"
```

---

### Task 2: Static Data Layer

**Files:**
- Create: `lib/data.ts`

**Interfaces:**
- Produces: All clinic data, services, testimonials exportable from `@/lib/data`

- [ ] **Step 1: Create data file with all clinic content**

Create `lib/data.ts`:

```typescript
export const clinicInfo = {
  name: "Gouraha Dant Chikitsalaya",
  fullName: "Gouraha Dant Chikitsalaya (Dr. Abhishek Gouraha Dental Clinic)",
  doctor: {
    name: "Dr. Abhishek Gouraha",
    degree: "BDS, MDS",
    experience: "15+",
    specialization: "Cosmetic & Implant Dentistry",
    bio: "Dr. Abhishek Gouraha is a renowned dental surgeon with over 15 years of experience in advanced dental procedures. He specializes in dental implants, cosmetic dentistry, and smile makeovers. Having successfully treated over 10,000 patients, he is committed to providing world-class dental care in Bilaspur.",
  },
  address: "Seepat Rd, Near Khandelwal Bajaj, Shree Vihar, Ashok Nagar, Sarkanda, Bilaspur, Chhattisgarh 495006",
  phone: "09685372425",
  phoneLink: "+919685372425",
  whatsappLink: "https://wa.me/919685372425",
  hours: "Mon - Sat: 10:00 AM - 8:00 PM",
  email: "info@gourahadental.com",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.5!2!3d!1m2!1s0x0%3A0x0!2zNDk1MDA2!5m2!1m4!1s0x0%3A0x0!2zNDk1MDA2",
  tagline: "Your Smile, Our Priority",
  subtitle: "Trusted Dental Care in Bilaspur, Chhattisgarh",
};

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  benefits: string[];
  process: { step: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "dental-implants",
    title: "Dental Implants",
    shortDescription: "Permanent tooth replacement that looks and feels natural. Advanced implant technology for a confident smile.",
    description: "Dental implants are the gold standard for replacing missing teeth. They are titanium posts surgically placed into the jawbone, providing a strong foundation for replacement teeth that look, feel, and function like natural teeth. Our clinic uses advanced implant technology to ensure precise placement and long-lasting results.",
    icon: "lucide: Smile",
    benefits: [
      "Permanent and durable solution",
      "Natural look and feel",
      "Preserves jawbone health",
      "No damage to adjacent teeth",
      "Improved speech and chewing",
      "Boosts confidence and appearance",
    ],
    process: [
      { step: "Consultation", description: "Digital X-ray and 3D scan to assess jawbone condition" },
      { step: "Implant Placement", description: "Surgical placement of titanium implant under local anesthesia" },
      { step: "Healing Period", description: "3-6 months for osseointegration (bone fusion)" },
      { step: "Crown Placement", description: "Custom-made porcelain crown attached to the implant" },
    ],
    faqs: [
      { question: "How long do dental implants last?", answer: "With proper care, dental implants can last a lifetime. The crown may need replacement after 10-15 years." },
      { question: "Is the implant procedure painful?", answer: "The procedure is done under local anesthesia, so you won't feel pain during surgery. Mild discomfort for a few days after is normal." },
      { question: "Am I a candidate for implants?", answer: "Most adults with adequate jawbone density and good general health are candidates. A consultation will determine your suitability." },
    ],
  },
  {
    slug: "root-canal",
    title: "Root Canal Treatment",
    shortDescription: "Save your natural tooth with painless root canal treatment using advanced techniques.",
    description: "Root canal treatment saves a severely damaged or infected tooth by removing the pulp, cleaning and shaping the root canal, then filling and sealing it. Modern techniques make the procedure comfortable and efficient, preserving your natural tooth for years to come.",
    icon: "lucide: Stethoscope",
    benefits: [
      "Saves your natural tooth",
      "Painless procedure with modern techniques",
      "Prevents spread of infection",
      "Restores normal biting force",
      "Maintains natural appearance",
      "Cost-effective long-term solution",
    ],
    process: [
      { step: "Diagnosis", description: "X-ray and sensitivity tests to confirm the need for root canal" },
      { step: "Anesthesia", description: "Local anesthesia to ensure complete comfort" },
      { step: "Cleaning", description: "Removal of infected pulp and cleaning of root canals" },
      { step: "Filling", description: "Canals filled with biocompatible material and sealed" },
      { step: "Crown", description: "Custom crown placed to restore strength and appearance" },
    ],
    faqs: [
      { question: "Does root canal hurt?", answer: "Modern root canal treatment is virtually painless. You'll be completely numb during the procedure." },
      { question: "How long does a root canal take?", answer: "Most root canals are completed in 1-2 visits, each lasting 30-60 minutes." },
      { question: "What after a root canal?", answer: "Avoid chewing on the treated tooth until the crown is placed. Maintain good oral hygiene." },
    ],
  },
  {
    slug: "braces-and-orthodontics",
    title: "Braces & Orthodontics",
    shortDescription: "Straighten your teeth with metal braces, ceramic braces, or clear aligners.",
    description: "Orthodontic treatment corrects misaligned teeth, bite issues, and gaps using braces or clear aligners. We offer metal braces, ceramic braces, and invisible aligners to suit every lifestyle and budget. A beautiful, straight smile is within your reach at any age.",
    icon: "lucide: AlignCenter",
    benefits: [
      "Straighter, more aligned teeth",
      "Improved bite and jaw alignment",
      "Better oral hygiene",
      "Reduced risk of tooth damage",
      "Enhanced facial aesthetics",
      "Multiple options: metal, ceramic, invisible",
    ],
    process: [
      { step: "Assessment", description: "Digital scans and X-rays to plan your treatment" },
      { step: "Appliance Fitting", description: "Custom braces or aligners fitted to your teeth" },
      { step: "Active Treatment", description: "Regular adjustments every 4-6 weeks" },
      { step: "Retention", description: "Retainers to maintain your new smile" },
    ],
    faqs: [
      { question: "What age is best for braces?", answer: "Orthodontic treatment can be done at any age. Early assessment at age 7 is recommended for children." },
      { question: "How long do I need to wear braces?", answer: "Treatment typically lasts 12-24 months depending on the complexity of your case." },
      { question: "Are clear aligners as effective as braces?", answer: "For most cases, yes. Clear aligners are great for mild to moderate alignment issues." },
    ],
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    shortDescription: "Professional teeth whitening for a brighter, more confident smile in just one visit.",
    description: "Professional teeth whitening removes stains and discoloration, brightening your smile by several shades in just one session. We use safe, dentist-supervised whitening systems that deliver dramatic results without damaging your enamel.",
    icon: "lucide: Sparkles",
    benefits: [
      "Instantly brighter smile",
      "Safe and supervised procedure",
      "Removes deep stains and discoloration",
      "Boosts confidence immediately",
      "Non-invasive treatment",
      "Results last 6-12 months with care",
    ],
    process: [
      { step: "Consultation", description: "Assessment of current tooth shade and staining" },
      { step: "Preparation", description: "Gum protection and teeth cleaning" },
      { step: "Whitening", description: "Professional-grade whitening gel applied with LED activation" },
      { step: "Results", description: "Instant visible improvement, take-home kits available" },
    ],
    faqs: [
      { question: "Is teeth whitening safe?", answer: "Yes, professional whitening is completely safe and supervised by a dentist." },
      { question: "How long do results last?", answer: "Results typically last 6-12 months. Avoiding staining foods and drinks helps maintain results." },
      { question: "How many shades whiter can I get?", answer: "Most patients see improvement of 4-8 shades in a single session." },
    ],
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    shortDescription: "Gentle, kid-friendly dental care to build healthy oral habits from an early age.",
    description: "Pediatric dentistry focuses on the oral health of children from infancy through adolescence. Our child-friendly environment and gentle approach make dental visits fun and stress-free, helping kids develop positive attitudes toward dental care that last a lifetime.",
    icon: "lucide: Baby",
    benefits: [
      "Kid-friendly, welcoming environment",
      "Gentle and耐心 approach",
      "Early detection of dental issues",
      "Preventive treatments (sealants, fluoride)",
      "Education on oral hygiene habits",
      "Sedation options for anxious children",
    ],
    process: [
      { step: "First Visit", description: "Fun, pressure-free introduction to dental care" },
      { step: "Check-up", description: "Comprehensive exam with kid-friendly explanations" },
      { step: "Prevention", description: "Fluoride treatments and dental sealants as needed" },
      { step: "Ongoing Care", description: "Regular visits to build lifelong healthy habits" },
    ],
    faqs: [
      { question: "When should my child first see a dentist?", answer: "The American Academy of Pediatrics recommends the first dental visit by age 1 or within 6 months of the first tooth erupting." },
      { question: "How do I prepare my child for a dental visit?", answer: "Keep it positive, read children's books about dentist visits, and avoid using words like 'pain' or 'shot'." },
      { question: "Are dental X-rays safe for children?", answer: "Yes, dental X-rays use very low radiation and are safe when used as needed." },
    ],
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery",
    shortDescription: "Expert oral surgical procedures including wisdom tooth removal and jaw treatments.",
    description: "Oral surgery encompasses a range of surgical procedures performed in the mouth and jaw area. From wisdom tooth extraction to corrective jaw surgery, our experienced surgeon uses advanced techniques for faster healing and better outcomes.",
    icon: "lucide: Shield",
    benefits: [
      "Expert surgical care",
      "Advanced technology for precision",
      "Minimally invasive techniques",
      "Faster recovery times",
      "Comprehensive pre and post-op care",
      "Sedation options for comfort",
    ],
    process: [
      { step: "Evaluation", description: "3D imaging and thorough examination" },
      { step: "Treatment Plan", description: "Detailed discussion of procedure and recovery" },
      { step: "Surgery", description: "Performed under local anesthesia or sedation" },
      { step: "Recovery", description: "Detailed post-op instructions and follow-up" },
    ],
    faqs: [
      { question: "When should wisdom teeth be removed?", answer: "Wisdom teeth should be removed if they're impacted, causing pain, infection, or crowding other teeth." },
      { question: "How long is recovery from oral surgery?", answer: "Most patients recover within 3-7 days. Full healing may take 2-4 weeks." },
      { question: "Can I eat normally after oral surgery?", answer: "You'll need soft foods for a few days. We provide detailed dietary guidelines for recovery." },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    text: "Dr. Gouraha made my dental implant procedure completely painless. The results are amazing — I can smile confidently again! Best dentist in Bilaspur.",
    treatment: "Dental Implants",
  },
  {
    id: 2,
    name: "Rahul Verma",
    rating: 5,
    text: "My daughter was terrified of dentists, but the team at Gouraha Dental made her feel so comfortable. Now she actually looks forward to her check-ups!",
    treatment: "Pediatric Dentistry",
  },
  {
    id: 3,
    name: "Sunita Devi",
    rating: 5,
    text: "I got my teeth whitening done here and the results were instant! Professional service, clean clinic, and very affordable prices. Highly recommended!",
    treatment: "Teeth Whitening",
  },
  {
    id: 4,
    name: "Amit Patel",
    rating: 5,
    text: "Had a severe toothache and Dr. Gouraha treated me the same day. Root canal was done perfectly — zero pain. Thank you for the excellent care!",
    treatment: "Root Canal",
  },
];

export const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 10000, suffix: "+", label: "Happy Patients" },
  { value: 50000, suffix: "+", label: "Treatments Done" },
  { value: 4.9, suffix: "", label: "Google Rating" },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/smile-gallery", label: "Smile Gallery" },
  { href: "/contact", label: "Contact" },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add centralized clinic data layer with services, testimonials, stats"
```

---

### Task 3: Reusable UI Components

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/SectionHeading.tsx`, `components/ScrollFadeIn.tsx`

**Interfaces:**
- Consumes: `lib/utils.ts` (cn function)
- Produces: Button, Card, SectionHeading, ScrollFadeIn components reusable across all pages

- [ ] **Step 1: Create Button component**

Create `components/ui/Button.tsx`:

```tsx
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 cursor-pointer";

  const variants = {
    primary: "bg-accent hover:bg-accent-hover text-white shadow-md hover:shadow-lg",
    secondary: "bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg",
    outline: "border-2 border-white text-white hover:bg-white hover:text-slate-900",
    ghost: "text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create SectionHeading component**

Create `components/ui/SectionHeading.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="w-20 h-1 bg-accent mx-auto mt-6 rounded-full" />
    </div>
  );
}
```

- [ ] **Step 3: Create ScrollFadeIn animation wrapper**

Create `components/ScrollFadeIn.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function ScrollFadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollFadeInProps) {
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/
git commit -m "feat: add reusable UI components (Button, SectionHeading, ScrollFadeIn)"
```

---

### Task 4: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`
- Modify: `app/layout.tsx` (already imports Navbar)

**Interfaces:**
- Consumes: `navLinks` from `@/lib/data`, `Button` from `@/components/ui/Button`
- Produces: Responsive sticky navbar with mobile drawer

- [ ] **Step 1: Create Navbar component**

Create `components/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, clinicInfo } from "@/lib/data";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div className="hidden sm:block">
              <p
                className={`font-bold text-sm leading-tight ${
                  isScrolled ? "text-slate-900" : "text-white"
                }`}
              >
                Gouraha Dant
              </p>
              <p
                className={`text-xs ${
                  isScrolled ? "text-slate-500" : "text-white/70"
                }`}
              >
                Chikitsalaya
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-slate-700" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${clinicInfo.phoneLink}`}
              className={`flex items-center gap-2 text-sm ${
                isScrolled ? "text-slate-700" : "text-white"
              }`}
            >
              <Phone size={16} />
              {clinicInfo.phone}
            </a>
            <Button href="/book-appointment" size="sm">
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${
              isScrolled ? "text-slate-900" : "text-white"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-slate-700 font-medium hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${clinicInfo.phoneLink}`}
              className="flex items-center gap-2 py-2 text-slate-700"
            >
              <Phone size={16} />
              {clinicInfo.phone}
            </a>
            <Button href="/book-appointment" className="w-full mt-4">
              Book Appointment
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add responsive sticky navbar with mobile drawer"
```

---

### Task 5: Footer & WhatsApp Button

**Files:**
- Create: `components/Footer.tsx`, `components/WhatsAppButton.tsx`

**Interfaces:**
- Consumes: `clinicInfo`, `navLinks`, `services` from `@/lib/data`
- Produces: Global footer and floating WhatsApp button

- [ ] **Step 1: Create Footer**

Create `components/Footer.tsx`:

```tsx
import Link from "next/link";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { clinicInfo, navLinks, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <p className="font-bold leading-tight">Gouraha Dant</p>
                <p className="text-sm text-slate-400">Chikitsalaya</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Trusted dental care in Bilaspur, Chhattisgarh. Providing world-class
              dental treatments with advanced technology and compassionate care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book-appointment"
                  className="text-slate-400 hover:text-accent text-sm transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-accent text-sm transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                {clinicInfo.address}
              </li>
              <li>
                <a
                  href={`tel:${clinicInfo.phoneLink}`}
                  className="flex items-center gap-3 text-slate-400 hover:text-accent text-sm transition-colors"
                >
                  <Phone size={18} className="shrink-0" />
                  {clinicInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Clock size={18} className="shrink-0" />
                {clinicInfo.hours}
              </li>
              <li>
                <a
                  href={`mailto:${clinicInfo.email}`}
                  className="flex items-center gap-3 text-slate-400 hover:text-accent text-sm transition-colors"
                >
                  <Mail size={18} className="shrink-0" />
                  {clinicInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {clinicInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create WhatsApp button**

Create `components/WhatsAppButton.tsx`:

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
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx components/WhatsAppButton.tsx
git commit -m "feat: add global footer and floating WhatsApp button"
```

---

### Task 6: Homepage Sections (Hero, About, Services)

**Files:**
- Create: `components/sections/Hero.tsx`, `components/sections/AboutSnippet.tsx`, `components/sections/ServicesPreview.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `clinicInfo`, `services` from `@/lib/data`, `Button`, `SectionHeading`, `ScrollFadeIn`
- Produces: First 3 homepage sections

- [ ] **Step 1: Create Hero section**

Create `components/sections/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { clinicInfo } from "@/lib/data";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-accent font-semibold text-lg mb-4 tracking-wide uppercase">
            Welcome to {clinicInfo.name}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {clinicInfo.tagline}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
            {clinicInfo.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/book-appointment" size="lg">
              Book Appointment
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Our Services
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Create About Snippet section**

Create `components/sections/AboutSnippet.tsx`:

```tsx
"use client";

import { clinicInfo } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Button from "@/components/ui/Button";

export default function AboutSnippet() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollFadeIn direction="left">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-primary">
                    <div className="w-32 h-32 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold">DG</span>
                    </div>
                    <p className="font-semibold">{clinicInfo.doctor.name}</p>
                    <p className="text-sm text-slate-500">{clinicInfo.doctor.degree}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white px-6 py-3 rounded-xl font-bold shadow-lg">
                {clinicInfo.doctor.experience} Years Experience
              </div>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn direction="right" delay={0.2}>
            <div>
              <p className="text-primary font-semibold mb-2">About the Doctor</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Meet {clinicInfo.doctor.name}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {clinicInfo.doctor.bio}
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                With expertise in {clinicInfo.doctor.specialization}, Dr. Gouraha
                combines advanced technology with a gentle, patient-first approach
                to deliver exceptional dental care.
              </p>
              <Button href="/about">Learn More About Us</Button>
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Services Preview section**

Create `components/sections/ServicesPreview.tsx`:

```tsx
"use client";

import Link from "next/link";
import { Smile, Stethoscope, AlignCenter, Sparkles, Baby, Shield, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const iconMap: Record<string, React.ElementType> = {
  Smile,
  Stethoscope,
  AlignCenter,
  Sparkles,
  Baby,
  Shield,
};

export default function ServicesPreview() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive dental care with advanced technology and gentle hands"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon.split(": ")[1]] || Smile;
            return (
              <ScrollFadeIn key={service.slug} delay={index * 0.1}>
                <Link href={`/services/${service.slug}`}>
                  <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group h-full">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon size={28} className="text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                      Learn More <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Assemble homepage**

Replace `app/page.tsx`:

```tsx
import Hero from "@/components/sections/Hero";
import AboutSnippet from "@/components/sections/AboutSnippet";
import ServicesPreview from "@/components/sections/ServicesPreview";
import StatsCounter from "@/components/sections/StatsCounter";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import ContactPreview from "@/components/sections/ContactPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <ServicesPreview />
      <StatsCounter />
      <Testimonials />
      <CTABanner />
      <ContactPreview />
    </>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/sections/
git commit -m "feat: add homepage sections (Hero, About, Services, Stats, Testimonials, CTA, Contact)"
```

---

### Task 7: Homepage Sections (Stats, Testimonials, CTA, Contact)

**Files:**
- Create: `components/sections/StatsCounter.tsx`, `components/sections/Testimonials.tsx`, `components/sections/CTABanner.tsx`, `components/sections/ContactPreview.tsx`

**Interfaces:**
- Consumes: `stats`, `testimonials`, `clinicInfo` from `@/lib/data`
- Produces: Remaining homepage sections

- [ ] **Step 1: Create Stats Counter**

Create `components/sections/StatsCounter.tsx`:

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/data";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const isDecimal = value % 1 !== 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center text-white"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Testimonials section**

Create `components/sections/Testimonials.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Patients Say"
          subtitle="Real stories from our happy patients"
        />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-surface rounded-2xl p-8 md:p-12 text-center"
            >
              <Quote size={40} className="text-primary/20 mx-auto mb-6" />
              <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-6 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="font-bold text-slate-900">{testimonials[current].name}</p>
              <p className="text-sm text-primary">{testimonials[current].treatment}</p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === current ? "bg-primary" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create CTA Banner**

Create `components/sections/CTABanner.tsx`:

```tsx
"use client";

import ScrollFadeIn from "@/components/ScrollFadeIn";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollFadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready for Your Perfect Smile?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Book your free consultation today and take the first step toward a
            healthier, more confident smile.
          </p>
          <Button href="/book-appointment" size="lg">
            Book Your Free Consultation
          </Button>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Contact Preview**

Create `components/sections/ContactPreview.tsx`:

```tsx
"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import { clinicInfo } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function ContactPreview() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Visit Us"
          subtitle="We'd love to see you at our clinic"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollFadeIn>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                  <p className="text-slate-600">{clinicInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                  <a
                    href={`tel:${clinicInfo.phoneLink}`}
                    className="text-slate-600 hover:text-primary transition-colors"
                  >
                    {clinicInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Hours</h3>
                  <p className="text-slate-600">{clinicInfo.hours}</p>
                </div>
              </div>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-sm h-80 bg-slate-200">
              <iframe
                src={clinicInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location"
              />
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/
git commit -m "feat: add Stats, Testimonials, CTA Banner, and Contact Preview sections"
```

---

### Task 8: About Page

**Files:**
- Create: `app/about/page.tsx`

**Interfaces:**
- Consumes: `clinicInfo`, `services` from `@/lib/data`, all UI components
- Produces: About page with doctor profile, qualifications, values

- [ ] **Step 1: Create About page**

Create `app/about/page.tsx`:

```tsx
import type { Metadata } from "next";
import { Award, Heart, Shield, Clock, Users, CheckCircle } from "lucide-react";
import { clinicInfo } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Dr. Abhishek Gouraha | Gouraha Dant Chikitsalaya",
  description: `Learn about Dr. Abhishek Gouraha — ${clinicInfo.doctor.experience} years of experience in ${clinicInfo.doctor.specialization}. Trusted dental care in Bilaspur.`,
};

const values = [
  { icon: Heart, title: "Patient First", description: "Every treatment plan is designed with your comfort and best outcomes in mind." },
  { icon: Shield, title: "Safety & Hygiene", description: "Strict sterilization protocols and international hygiene standards." },
  { icon: Award, title: "Excellence", description: "Commitment to the highest quality in every procedure we perform." },
  { icon: Clock, title: "Convenience", description: "Flexible scheduling and efficient treatment to respect your time." },
];

const qualifications = [
  "BDS (Bachelor of Dental Surgery)",
  "MDS (Master of Dental Surgery)",
  "Fellowship in Implantology",
  "Certified in Cosmetic Dentistry",
  "Member of Indian Dental Association",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About the Doctor</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Dedicated to creating healthy, beautiful smiles for over {clinicInfo.doctor.experience} years
          </p>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn>
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <div className="text-center text-primary">
                  <div className="w-40 h-40 bg-primary/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-5xl font-bold">DG</span>
                  </div>
                  <p className="text-xl font-bold">{clinicInfo.doctor.name}</p>
                  <p className="text-slate-500">{clinicInfo.doctor.degree}</p>
                </div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  {clinicInfo.doctor.name}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {clinicInfo.doctor.bio}
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Dr. Gouraha believes in staying at the forefront of dental technology.
                  He regularly attends international conferences and training programs to
                  bring the latest techniques and treatments to his patients in Bilaspur.
                </p>

                <h3 className="font-bold text-slate-900 mb-4">Qualifications</h3>
                <ul className="space-y-2 mb-8">
                  {qualifications.map((qual) => (
                    <li key={qual} className="flex items-center gap-2 text-slate-600">
                      <CheckCircle size={18} className="text-primary shrink-0" />
                      {qual}
                    </li>
                  ))}
                </ul>

                <Button href="/book-appointment">Book Consultation</Button>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Values" subtitle="What drives us every day" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollFadeIn key={value.title} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-8 text-center shadow-sm h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm">{value.description}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollFadeIn>
            <Users className="text-white/30 mx-auto mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Happy Patients
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Experience the difference of personalized, expert dental care.
            </p>
            <Button href="/book-appointment" size="lg">
              Schedule Your Visit
            </Button>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add About page with doctor profile, qualifications, and values"
```

---

### Task 9: Services Pages

**Files:**
- Create: `app/services/page.tsx`, `app/services/[slug]/page.tsx`

**Interfaces:**
- Consumes: `services` from `@/lib/data`
- Produces: Services overview page + dynamic service detail pages

- [ ] **Step 1: Create Services overview page**

Create `app/services/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Smile, Stethoscope, AlignCenter, Sparkles, Baby, Shield, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Services | Gouraha Dant Chikitsalaya",
  description: "Comprehensive dental services in Bilaspur — implants, root canal, braces, whitening, pediatric dentistry, oral surgery.",
};

const iconMap: Record<string, React.ElementType> = {
  Smile,
  Stethoscope,
  AlignCenter,
  Sparkles,
  Baby,
  Shield,
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Comprehensive dental treatments with advanced technology and gentle care
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon.split(": ")[1]] || Smile;
              return (
                <ScrollFadeIn key={service.slug} delay={index * 0.1}>
                  <Link href={`/services/${service.slug}`}>
                    <div className="bg-surface rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group h-full">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                        <Icon size={28} className="text-primary group-hover:text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h2>
                      <p className="text-slate-600 mb-6">{service.shortDescription}</p>
                      <span className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                        View Details <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </ScrollFadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-white/80 mb-8">Book a consultation and we'll help you determine the best treatment plan.</p>
          <Button href="/book-appointment" size="lg">Book Free Consultation</Button>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create individual service detail page**

Create `app/services/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, HelpCircle, ChevronDown } from "lucide-react";
import { services } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Button from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Gouraha Dant Chikitsalaya`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-white/80 text-lg max-w-2xl">{service.shortDescription}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <p className="text-slate-700 text-lg leading-relaxed">{service.description}</p>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Benefits</h2>
          </ScrollFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, index) => (
              <ScrollFadeIn key={benefit} delay={index * 0.05}>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <Check className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Treatment Process</h2>
          </ScrollFadeIn>
          <div className="space-y-6">
            {service.process.map((step, index) => (
              <ScrollFadeIn key={step.step} delay={index * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{step.step}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          </ScrollFadeIn>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <ScrollFadeIn key={faq.question} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="text-primary shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for {service.title}?
          </h2>
          <p className="text-white/80 mb-8">Book a consultation to discuss your treatment options.</p>
          <Button href="/book-appointment" size="lg">Book Consultation</Button>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/services/
git commit -m "feat: add Services overview page and dynamic service detail pages"
```

---

### Task 10: Smile Gallery Page

**Files:**
- Create: `app/smile-gallery/page.tsx`

**Interfaces:**
- Consumes: UI components
- Produces: Before/after gallery with filter tabs and lightbox

- [ ] **Step 1: Create Smile Gallery page**

Create `app/smile-gallery/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeftRight } from "lucide-react";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const categories = ["All", "Implants", "Braces", "Whitening", "Smile Makeover"];

const galleryItems = [
  { id: 1, category: "Implants", title: "Single Tooth Implant", description: "Complete restoration of a missing front tooth" },
  { id: 2, category: "Implants", title: "Full Mouth Implants", description: "Complete smile rehabilitation with implants" },
  { id: 3, category: "Braces", title: "Metal Braces Alignment", description: "Correction of severe crowding in 18 months" },
  { id: 4, category: "Braces", title: "Invisible Aligners", description: "Subtle alignment for mild spacing issues" },
  { id: 5, category: "Whitening", title: "Professional Whitening", description: "8 shades brighter in a single session" },
  { id: 6, category: "Smile Makeover", title: "Complete Smile Design", description: "Porcelain veneers for a Hollywood smile" },
];

export default function SmileGalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smile Transformations</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            See the amazing results our patients have achieved
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, index) => (
              <ScrollFadeIn key={item.id} delay={index * 0.1}>
                <div
                  className="cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden mb-4 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-slate-400">
                        <ArrowLeftRight size={32} className="mx-auto mb-2" />
                        <p className="text-sm font-medium">Before & After</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors rounded-xl" />
                  </div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <ArrowLeftRight size={48} className="mx-auto mb-2" />
                  <p>Before & After Comparison</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase">{selectedItem.category}</span>
                    <h3 className="text-xl font-bold text-slate-900">{selectedItem.title}</h3>
                    <p className="text-slate-600 mt-1">{selectedItem.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want a Similar Transformation?</h2>
          <p className="text-white/80 mb-8">Book a consultation to discuss your smile goals.</p>
          <a
            href="/book-appointment"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Start Your Smile Journey
          </a>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/smile-gallery/
git commit -m "feat: add Smile Gallery page with filter tabs and lightbox modal"
```

---

### Task 11: Contact Page

**Files:**
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `clinicInfo` from `@/lib/data`
- Produces: Full contact page with map, info, and form

- [ ] **Step 1: Create Contact page**

Create `app/contact/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Mail, Send, CheckCircle } from "lucide-react";
import { clinicInfo } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            We&apos;re here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 bg-slate-200 w-full">
        <iframe
          src={clinicInfo.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Clinic Location"
        />
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <ScrollFadeIn>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Our Address</h3>
                      <p className="text-slate-600">{clinicInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                      <a href={`tel:${clinicInfo.phoneLink}`} className="text-slate-600 hover:text-primary transition-colors">
                        {clinicInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                      <a href={`mailto:${clinicInfo.email}`} className="text-slate-600 hover:text-primary transition-colors">
                        {clinicInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Working Hours</h3>
                      <p className="text-slate-600">{clinicInfo.hours}</p>
                      <p className="text-slate-500 text-sm mt-1">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Form */}
            <ScrollFadeIn delay={0.2}>
              <div className="bg-surface rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="text-primary mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600">We&apos;ll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Your email (optional)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/contact/
git commit -m "feat: add Contact page with map, info cards, and contact form"
```

---

### Task 12: Book Appointment Page

**Files:**
- Create: `app/book-appointment/page.tsx`

**Interfaces:**
- Consumes: `services`, `clinicInfo` from `@/lib/data`
- Produces: Dedicated booking form page

- [ ] **Step 1: Create Book Appointment page**

Create `app/book-appointment/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { services, clinicInfo } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function BookAppointmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
    "7:00 PM", "7:30 PM",
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Schedule your visit to {clinicInfo.name}. We&apos;ll get back to you to confirm.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            {submitted ? (
              <div className="bg-surface rounded-2xl p-12 text-center">
                <CheckCircle className="text-primary mx-auto mb-6" size={64} />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Appointment Request Received!
                </h2>
                <p className="text-slate-600 text-lg mb-8">
                  Thank you for choosing {clinicInfo.name}. Our team will contact you
                  shortly to confirm your appointment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Back to Home
                  </a>
                  <a
                    href={clinicInfo.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                  Fill in Your Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      <User size={14} className="inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      <Phone size={14} className="inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      <Mail size={14} className="inline mr-1" />
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="General Checkup">General Checkup</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      <Calendar size={14} className="inline mr-1" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      <Clock size={14} className="inline mr-1" />
                      Preferred Time *
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="">Select a time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    <MessageSquare size={14} className="inline mr-1" />
                    Additional Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Any specific concerns or requests?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 bg-accent hover:bg-accent-hover text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-md hover:shadow-lg text-lg"
                >
                  Request Appointment
                </button>

                <p className="text-center text-slate-500 text-sm mt-4">
                  Or call us directly at{" "}
                  <a href={`tel:${clinicInfo.phoneLink}`} className="text-primary font-semibold">
                    {clinicInfo.phone}
                  </a>
                </p>
              </form>
            )}
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/book-appointment/
git commit -m "feat: add Book Appointment page with full booking form"
```

---

### Task 13: Final Polish & Build Verification

**Files:**
- Modify: Various (if any fixes needed)

**Interfaces:**
- Consumes: All previous tasks
- Produces: Working build, no errors

- [ ] **Step 1: Run dev server and check all pages**

```bash
npm run dev &
sleep 5

# Test each page
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/about
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/services
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/services/dental-implants
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/smile-gallery
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/contact
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/book-appointment

kill %1
```

Expected: All return HTTP 200.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 3: Fix any lint/type errors**

```bash
npm run lint
```

Fix any issues found.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: final polish and build verification"
```

- [ ] **Step 5: Tag the release**

```bash
git tag -a v1.0.0 -m "v1.0.0: Dental clinic website - complete"
```
