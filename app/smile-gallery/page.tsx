"use client";

import { useState } from "react";
import { ArrowLeftRight, Sparkles } from "lucide-react";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Blobs from "@/components/Blobs";
import GlassCard from "@/components/ui/glass-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-sky-50 pt-28 pb-16">
        <Blobs />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">Smile Transformations</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            See the amazing results our patients have achieved
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium backdrop-blur transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-white/70 text-slate-600 shadow-sm hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <ScrollFadeIn key={item.id} delay={index * 0.1}>
                <button
                  type="button"
                  className="group block w-full text-left cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <GlassCard className="h-full p-0 overflow-hidden">
                    <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-slate-400 transition-transform duration-300 group-hover:scale-105">
                          <ArrowLeftRight size={32} className="mx-auto mb-2" />
                          <p className="text-sm font-medium">Before & After</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/10" />
                    </div>
                    <div className="p-6 pt-0">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {item.category}
                      </span>
                      <h3 className="mt-1 font-bold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </GlassCard>
                </button>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="rounded-2xl bg-white">
          <div className="mb-4 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-slate-400">
                <ArrowLeftRight size={48} className="mx-auto mb-2" />
                <p>Before & After Comparison</p>
              </div>
            </div>
          </div>
          {selectedItem && (
            <DialogHeader>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {selectedItem.category}
              </span>
              <DialogTitle className="text-xl font-bold text-slate-900">
                {selectedItem.title}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {selectedItem.description}
              </DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <GlassCard className="bg-gradient-to-br from-primary to-primary-hover p-10 text-white">
            <h2 className="mb-4 text-3xl font-bold">Want a Similar Transformation?</h2>
            <p className="mb-8 text-white/80">Book a consultation to discuss your smile goals.</p>
            <Button asChild size="lg" className="rounded-full bg-accent text-white shadow-lg hover:bg-accent-hover">
              <a href="/book-appointment">
                Start Your Smile Journey <Sparkles size={18} />
              </a>
            </Button>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
