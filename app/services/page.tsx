import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { resolveServiceIcon } from "@/lib/utils";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Our Services | Gouraha Dant Chikitsalaya",
  description: "Comprehensive dental services in Bilaspur — implants, root canal, braces, whitening, pediatric dentistry, oral surgery.",
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
              const Icon = resolveServiceIcon(service.icon);
              return (
                <ScrollFadeIn key={service.slug} delay={index * 0.1}>
                  <Link href={`/services/${service.slug}`}>
                    <Card hover className="h-full bg-surface">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                        <Icon size={28} className="text-primary group-hover:text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h2>
                      <p className="text-slate-600 mb-6">{service.shortDescription}</p>
                      <span className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                        View Details <ArrowRight size={16} />
                      </span>
                    </Card>
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
          <p className="text-white/80 mb-8">Book a consultation and we&apos;ll help you determine the best treatment plan.</p>
          <Button href="/book-appointment" size="lg">Book Free Consultation</Button>
        </div>
      </section>
    </>
  );
}
