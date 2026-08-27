"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, User, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { services, clinicInfo } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Blobs from "@/components/Blobs";
import GlassCard from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const serviceOptions = [
  ...services.map((s) => s.title),
  "General Checkup",
  "Other",
];

export default function BookAppointmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.service || !formData.time) {
      return;
    }
    const text = encodeURIComponent(
      `New Appointment Request\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nDate: ${formData.date}\nTime: ${formData.time}\nMessage: ${formData.message || "N/A"}`
    );
    window.open(`${clinicInfo.whatsappLink}?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
    "7:00 PM", "7:30 PM",
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-sky-50 pt-28 pb-16">
        <Blobs />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">Book an Appointment</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Schedule your visit to {clinicInfo.name}. We&apos;ll get back to you to confirm.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            {submitted ? (
              <GlassCard className="p-12 text-center">
                <CheckCircle className="mx-auto mb-6 text-primary" size={64} />
                <h2 className="mb-4 text-3xl font-bold text-slate-900">
                  Appointment Request Received!
                </h2>
                <p className="mb-8 text-lg text-slate-600">
                  Thank you for choosing {clinicInfo.name}. Our team will contact you
                  shortly to confirm your appointment.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button asChild variant="default" size="lg">
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    <a href={clinicInfo.whatsappLink} target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 md:p-12">
                <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
                  Fill in Your Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        <User size={14} className="inline" /> Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        <Phone size={14} className="inline" /> Phone Number *
                      </Label>
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
                      <Label htmlFor="email">
                        <Mail size={14} className="inline" /> Email (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Your email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Service Required *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(v) => setFormData({ ...formData, service: v })}
                      >
                        <SelectTrigger className="w-full data-[placeholder]:text-muted-foreground">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">
                        <Calendar size={14} className="inline" /> Preferred Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Time *</Label>
                      <Select
                        value={formData.time}
                        onValueChange={(v) => setFormData({ ...formData, time: v })}
                      >
                        <SelectTrigger className="w-full data-[placeholder]:text-muted-foreground">
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      <MessageSquare size={14} className="inline" /> Additional Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific concerns or requests?"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent text-lg text-white shadow-md hover:bg-accent-hover"
                  >
                    Request Appointment
                  </Button>

                  <p className="text-center text-sm text-slate-500">
                    Or call us directly at{" "}
                    <a href={`tel:${clinicInfo.phoneLink}`} className="font-semibold text-primary">
                      {clinicInfo.phone}
                    </a>
                  </p>
                </form>
              </GlassCard>
            )}
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}
