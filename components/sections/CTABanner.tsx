"use client";

import ScrollFadeIn from "@/components/ScrollFadeIn";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
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
