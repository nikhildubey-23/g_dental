"use client";

import { motion } from "framer-motion";
import { Star, Phone, ArrowRight } from "lucide-react";
import { clinicInfo, stats } from "@/lib/data";
import Blobs from "@/components/Blobs";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const rating = stats[3];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e0f2f1] via-white to-[#e0f2fe] min-h-screen flex items-center pt-28">
      <Blobs />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/50 px-4 py-1.5 text-sm font-medium text-teal-700">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                {clinicInfo.name}
              </span>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
                {clinicInfo.tagline}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600">
                {clinicInfo.subtitle} — advanced dental care with a gentle, comforting touch.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-accent to-accent-hover hover:opacity-95 shadow-lg">
                  <a href="/book-appointment">
                    Book Appointment <ArrowRight size={18} />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-white/60 backdrop-blur border-white/60 text-slate-700">
                  <a href="/services">Our Services</a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right glass cards */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex flex-col gap-6"
            >
              <GlassCard hover className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-white">
                    <Star size={26} />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900">
                      {rating.value}★ Trusted
                    </p>
                    <p className="text-sm text-slate-500">{rating.label}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-hover text-white">
                    <Phone size={26} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Call us anytime</p>
                    <a href={`tel:${clinicInfo.phoneLink}`} className="text-xl font-extrabold text-slate-900 hover:text-primary">
                      {clinicInfo.phone}
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-5 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  {stats[0].value}+ Years · {stats[1].value}+ Happy Patients
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
