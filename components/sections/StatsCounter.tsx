"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Users, Clock, Smile } from "lucide-react";
import { stats } from "@/lib/data";
import GlassCard from "@/components/ui/glass-card";

const iconMap = [Smile, Users, Clock, Star];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const inc = value / steps;
    const isDecimal = value % 1 !== 0;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(cur.toFixed(1)) : Math.floor(cur));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsCounter() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-sky-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = iconMap[i % iconMap.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard hover className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary">
                    <Icon size={24} />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}