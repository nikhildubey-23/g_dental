"use client";

import { clinicInfo } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Button from "@/components/ui/LegacyButton";

export default function AboutSnippet() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollFadeIn direction="left">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-primary">
                    <div className="w-32 h-32 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold">DG</span>
                    </div>
                    <p className="font-semibold">{clinicInfo.doctor.name}</p>
                    <p className="text-sm text-slate-500">{clinicInfo.doctor.degree}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white px-6 py-3 rounded-xl font-bold shadow-lg">
                {clinicInfo.doctor.experience} Years Experience
              </div>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn direction="right" delay={0.2}>
            <div>
              <p className="text-primary font-semibold mb-2">About the Doctor</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Meet {clinicInfo.doctor.name}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {clinicInfo.doctor.bio}
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                With expertise in {clinicInfo.doctor.specialization}, Dr. Gouraha
                combines advanced technology with a gentle, patient-first approach
                to deliver exceptional dental care.
              </p>
              <Button href="/about">Learn More About Us</Button>
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
