"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { resolveServiceIcon } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Card from "@/components/ui/Card";

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
            const Icon = resolveServiceIcon(service.icon);
            return (
              <ScrollFadeIn key={service.slug} delay={index * 0.1}>
                <Link href={`/services/${service.slug}`}>
                  <Card hover className="h-full">
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
                  </Card>
                </Link>
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
