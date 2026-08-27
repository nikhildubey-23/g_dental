"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import { clinicInfo } from "@/lib/data";
import GlassCard from "@/components/ui/glass-card";

export default function ContactPreview() {
  const items = [
    { Icon: MapPin, label: "Address", value: clinicInfo.address },
    { Icon: Phone, label: "Phone", value: clinicInfo.phone, href: `tel:${clinicInfo.phoneLink}` },
    { Icon: Clock, label: "Hours", value: clinicInfo.hours },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Visit Us</h2>
          <span className="mx-auto mt-5 block h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {items.map(({ Icon, label, value, href }) => (
              <GlassCard key={label} hover className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{label}</h3>
                  {href ? (
                    <a href={href} className="text-slate-600 hover:text-primary">{value}</a>
                  ) : (
                    <p className="text-slate-600">{value}</p>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="overflow-hidden p-2">
            <iframe
              src={clinicInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clinic Location"
            />
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
