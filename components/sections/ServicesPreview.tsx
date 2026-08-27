"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { resolveServiceIcon } from "@/lib/utils";
import GlassCard from "@/components/ui/glass-card";

export default function ServicesPreview() {
  return (
    <section className="relative py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Treatment marquee */}
        <div className="relative overflow-hidden rounded-3xl bg-teal-50/60 border border-teal-100 py-4 mb-14">
          <div className="flex w-max animate-marquee gap-10 px-10">
            {[...services, ...services].map((s, i) => (
              <span key={i} className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-teal-700">
                {s.title}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Our Services</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Comprehensive dental care with advanced technology and gentle hands
          </p>
          <span className="mx-auto mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = resolveServiceIcon(service.icon);
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <GlassCard hover className="p-8 h-full">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 text-primary">
                      <Icon size={26} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-slate-900">{service.title}</h3>
                    <p className="mb-4 text-slate-600 leading-relaxed">{service.shortDescription}</p>
                    <span className="inline-flex items-center gap-1 font-semibold text-primary">
                      Learn More <ArrowRight size={16} />
                    </span>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
