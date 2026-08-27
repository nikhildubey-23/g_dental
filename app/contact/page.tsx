"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Mail, Send, CheckCircle } from "lucide-react";
import { clinicInfo } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Blobs from "@/components/Blobs";
import GlassCard from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const infoCards = [
  { icon: MapPin, title: "Our Address", value: clinicInfo.address, href: null },
  { icon: Phone, title: "Phone", value: clinicInfo.phone, href: `tel:${clinicInfo.phoneLink}` },
  { icon: Mail, title: "Email", value: clinicInfo.email, href: `mailto:${clinicInfo.email}` },
  { icon: Clock, title: "Working Hours", value: clinicInfo.hours, sub: "Sunday: Closed", href: null },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `New Contact Message\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || "N/A"}\nMessage: ${formData.message}`
    );
    window.open(`${clinicInfo.whatsappLink}?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-sky-50 pt-28 pb-16">
        <Blobs />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            We&apos;re here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white pb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GlassCard className="overflow-hidden p-1">
            <iframe
              src={clinicInfo.mapEmbedUrl}
              width="100%"
              height="480"
              style={{ border: 0, borderRadius: "1.25rem" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clinic Location"
            />
          </GlassCard>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Info */}
            <ScrollFadeIn>
              <div>
                <h2 className="mb-8 text-3xl font-bold text-slate-900">Get in Touch</h2>
                <div className="space-y-6">
                  {infoCards.map((card) => (
                    <GlassCard key={card.title} hover className="flex items-start gap-4 p-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary">
                        <card.icon size={24} />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-slate-900">{card.title}</h3>
                        {card.href ? (
                          <a href={card.href} className="text-slate-600 transition-colors hover:text-primary">
                            {card.value}
                          </a>
                        ) : (
                          <p className="text-slate-600">{card.value}</p>
                        )}
                        {card.sub && <p className="mt-1 text-sm text-slate-500">{card.sub}</p>}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </ScrollFadeIn>

            {/* Form */}
            <ScrollFadeIn delay={0.2}>
              <GlassCard className="p-8">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">Send Us a Message</h2>

                {submitted ? (
                  <div className="py-12 text-center">
                    <CheckCircle className="mx-auto mb-4 text-primary" size={48} />
                    <h3 className="mb-2 text-xl font-bold text-slate-900">Message Sent!</h3>
                    <p className="text-slate-600">We&apos;ll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Your email (optional)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help you?"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-accent text-white shadow-md hover:bg-accent-hover"
                      size="lg"
                    >
                      <Send size={18} />
                      Send Message
                    </Button>
                  </form>
                )}
              </GlassCard>
            </ScrollFadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
