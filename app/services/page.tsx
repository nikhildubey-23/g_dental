import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { services } from "@/lib/data";
import { resolveServiceIcon } from "@/lib/utils";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Blobs from "@/components/Blobs";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Services | Gouraha Dant Chikitsalaya",
  description: "Comprehensive dental services in Bilaspur — implants, root canal, braces, whitening, pediatric dentistry, oral surgery.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-sky-50 pt-28 pb-16">
        <Blobs />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Comprehensive dental treatments with advanced technology and gentle care
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = resolveServiceIcon(service.icon);
              return (
                <ScrollFadeIn key={service.slug} delay={index * 0.1}>
                  <Link href={`/services/${service.slug}`}>
                    <GlassCard hover className="h-full p-8 group">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary transition-colors">
                        <Icon size={28} />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h2>
                      <p className="text-slate-600 mb-6">{service.shortDescription}</p>
                      <span className="inline-flex items-center gap-1 text-primary font-semibold transition-all group-hover:gap-2">
                        View Details <ArrowRight size={16} />
                      </span>
                    </GlassCard>
                  </Link>
                </ScrollFadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <GlassCard className="bg-gradient-to-br from-primary to-primary-hover p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">Not Sure Which Service You Need?</h2>
            <p className="text-white/80 mb-8">Book a consultation and we&apos;ll help you determine the best treatment plan.</p>
            <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent-hover text-white shadow-lg">
              <a href="/book-appointment">
                Book Free Consultation <Phone size={18} />
              </a>
            </Button>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
