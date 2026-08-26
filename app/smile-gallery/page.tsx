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
