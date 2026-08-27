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
