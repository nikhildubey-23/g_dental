"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import { clinicInfo } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function ContactPreview() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Visit Us"
          subtitle="We'd love to see you at our clinic"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollFadeIn>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                  <p className="text-slate-600">{clinicInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                  <a
                    href={`tel:${clinicInfo.phoneLink}`}
                    className="text-slate-600 hover:text-primary transition-colors"
                  >
                    {clinicInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Hours</h3>
                  <p className="text-slate-600">{clinicInfo.hours}</p>
                </div>
              </div>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-sm h-80 bg-slate-200">
              <iframe
                src={clinicInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location"
              />
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
