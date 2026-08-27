"use client";

import Link from "next/link";
import { clinicInfo } from "@/lib/data";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function AboutSnippet() {
  return (
    <section className="relative overflow-hidden bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <GlassCard hover className="p-8 text-center">
              <div className="mb-5 mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-3xl font-extrabold text-primary">
                DG
              </div>
              <h3 className="text-xl font-bold text-slate-900">{clinicInfo.doctor.name}</h3>
              <p className="text-slate-500">{clinicInfo.doctor.degree}</p>
              <span className="mt-4 inline-block rounded-full bg-accent/15 px-4 py-1 text-sm font-semibold text-accent">
                {clinicInfo.doctor.experience} Years Experience
              </span>
            </GlassCard>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">About the Doctor</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">
              Meet {clinicInfo.doctor.name}
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">{clinicInfo.doctor.bio}</p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              With expertise in {clinicInfo.doctor.specialization}, Dr. Gouraha combines advanced
              technology with a gentle, patient-first approach.
            </p>
            <Button asChild className="mt-8 rounded-full bg-gradient-to-r from-primary to-primary-hover shadow-lg">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}