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
