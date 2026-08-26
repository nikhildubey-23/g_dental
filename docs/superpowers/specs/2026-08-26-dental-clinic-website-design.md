# Gouraha Dant Chikitsalaya — Premium Dental Clinic Website

## Overview

A premium, patient-acquisition-focused website for **Gouraha Dant Chikitsalaya (Dr. Abhishek Gouraha Dental Clinic)** in Bilaspur, Chhattisgarh. Built with Next.js, Tailwind CSS, and Framer Motion. Static content, no CMS. Designed as a sellable demo.

## Clinic Details

- **Name:** Gouraha Dant Chikitsalaya (Dr. Abhishek Gouraha Dental Clinic)
- **Address:** Seepat Rd, Near Khandelwal Bajaj, Shree Vihar, Ashok Nagar, Sarkanda, Bilaspur, Chhattisgarh 495006
- **Phone:** 09685372425
- **Doctor:** Dr. Abhishek Gouraha

## Tech Stack

- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS
- Framer Motion (scroll animations, page transitions)
- Static generation (no backend)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, about snippet, services preview, testimonials, stats, CTA, contact preview |
| `/about` | Dr. Abhishek Gouraha profile, qualifications, experience, clinic philosophy |
| `/services` | All services overview with cards |
| `/services/[slug]` | Individual service detail page |
| `/smile-gallery` | Before/after photo gallery |
| `/contact` | Map, address, phone, contact form, hours |
| `/book-appointment` | Dedicated appointment booking form |

### Service Pages (slugs)

- dental-implants
- root-canal
- braces-and-orthodontics
- teeth-whitening
- pediatric-dentistry
- oral-surgery

## Global Components

- **Navbar:** Responsive, sticky top, logo left, nav links center, "Book Appointment" CTA button right. Mobile hamburger menu with slide-in drawer.
- **Footer:** 3-column layout — clinic info, quick links, contact details. Copyright bar at bottom.
- **WhatsApp Button:** Fixed bottom-right floating button, links to `https://wa.me/919685372425`. Green WhatsApp icon.

## Visual Design

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#0891b2` | Headers, links, accents |
| `primary-dark` | `#0e7490` | Hover states, depth |
| `accent` | `#f59e0b` | CTA buttons, highlights |
| `background` | `#ffffff` | Page background |
| `surface` | `#f8fafc` | Section alternating bg |
| `text` | `#0f172a` | Body text |
| `muted` | `#64748b` | Secondary text |

### Typography

- **Font:** Inter (Google Fonts)
- **Headings:** 700 weight, tight letter-spacing
- **Body:** 400 weight, 1.6 line-height

### Design Principles

- Soft rounded corners (`rounded-lg`, `rounded-xl`)
- Subtle shadows (`shadow-sm`, `shadow-md`)
- No heavy borders — use spacing and shadow for separation
- Full-width hero with dark gradient overlay
- Scroll-triggered fade-up animations via Framer Motion

## Homepage Sections (Detailed)

### 1. Hero

- Full viewport height (`min-h-screen`)
- Background: dental clinic/smile stock image with gradient overlay (`from-black/60 to-transparent`)
- Content: centered text
  - Headline: "Your Smile, Our Priority"
  - Sub: "Gouraha Dant Chikitsalaya — Trusted Dental Care in Bilaspur"
  - Two CTAs: "Book Appointment" (primary amber), "Our Services" (outline white)
- Framer Motion fade-in on load

### 2. About Snippet

- Two-column layout (image left, text right)
- Dr. photo (placeholder), name, "BDS, MDS — 15+ Years Experience"
- Brief 2-3 line intro
- "Learn More →" link to /about
- Scroll fade-up animation

### 3. Services Preview

- Section heading: "Our Services"
- 6 cards in responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- Each card: icon (Lucide), title, 2-line description
- Hover: slight scale (1.02) + shadow increase
- Cards link to individual service pages
- Services: Dental Implants, Root Canal, Braces & Orthodontics, Teeth Whitening, Pediatric Dentistry, Oral Surgery

### 4. Stats Counter

- Single row with 4 stats
- Animated count-up on scroll into view
- Stats: "15+ Years" | "10,000+ Happy Patients" | "50,000+ Treatments" | "4.9 Google Rating"
- Teal background, white text

### 5. Testimonials

- Section heading: "What Our Patients Say"
- Carousel with 3-4 patient reviews
- Each: quote text, patient name, star rating (5 stars)
- Auto-play with dot navigation + arrow buttons
- Fade transition between slides

### 6. CTA Banner

- Full-width, primary teal background
- Headline: "Ready for Your Perfect Smile?"
- Sub: "Book your free consultation today"
- Amber CTA button: "Book Now"
- Subtle background pattern or gradient

### 7. Contact Preview

- Two-column: contact info left, mini form right
- Left: address, phone (clickable tel: link), hours (Mon-Sat 10AM-8PM)
- Right: name, phone, message fields + submit button
- Embedded Google Maps iframe below (full-width)

## Service Detail Page Template

- Hero banner with service name
- Service description (2-3 paragraphs)
- Benefits list (checkmark icons)
- Treatment process (step-by-step)
- FAQ accordion (3-4 questions)
- CTA: "Book Consultation for [Service]"
- Related services links

## Smile Gallery Page

- Hero: "Our Smile Transformations"
- Filter tabs: All, Implants, Braces, Whitening, Smile Makeover
- Grid of before/after image pairs (placeholder images)
- Lightbox/modal on click (before/after slider)
- CTA at bottom: "Want a Similar Transformation?"

## About Page

- Hero with Dr. name
- Photo + detailed bio
- Qualifications, experience timeline
- Clinic philosophy / values
- Certifications section
- CTA: "Meet Dr. Gouraha — Book Now"

## Contact Page

- Full-width Google Maps embed at top
- Contact cards: address, phone, email, hours
- Full contact form (name, phone, email, message, preferred date)
- Driving directions / landmark reference

## Book Appointment Page

- Clean form: name, phone, email, service dropdown, preferred date, time slot, message
- Success state with confirmation message
- WhatsApp quick booking option

## Placeholder Content

All content is hardcoded static data. Placeholder text and images will be used. Images will use:
- Unsplash/Pexels dental stock photos (or solid color placeholders)
- Placeholder doctor photo
- Placeholder before/after images

## SEO

- Proper `<title>` and `<meta description>` per page
- Open Graph tags
- Semantic HTML (proper heading hierarchy, alt text)
- Next.js `metadata` export per page

## Responsive Breakpoints

- Mobile: < 640px (single column, hamburger nav)
- Tablet: 640px - 1024px (2-column grids)
- Desktop: > 1024px (full layout, 3-column grids)

## Animations (Framer Motion)

- Hero: fade-in on page load
- Sections: fade-up on scroll (`whileInView`)
- Service cards: stagger animation on scroll
- Stats: count-up animation on scroll
- Testimonials: slide transition
- Page transitions: fade between routes
