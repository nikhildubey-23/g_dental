import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { services } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Blobs from "@/components/Blobs";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Gouraha Dant Chikitsalaya`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-sky-50 pt-28 pb-16">
        <Blobs />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{service.title}</h1>
          <p className="max-w-2xl text-lg text-slate-600">{service.shortDescription}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <p className="text-slate-700 text-lg leading-relaxed">{service.description}</p>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Benefits</h2>
          </ScrollFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, index) => (
              <ScrollFadeIn key={benefit} delay={index * 0.05}>
                <GlassCard hover className="flex items-start gap-3 p-4">
                  <Check className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700">{benefit}</span>
                </GlassCard>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Treatment Process</h2>
          </ScrollFadeIn>
          <GlassCard className="p-8">
            <div className="space-y-6">
              {service.process.map((step, index) => (
                <ScrollFadeIn key={step.step} delay={index * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{step.step}</h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </ScrollFadeIn>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          </ScrollFadeIn>
          <GlassCard className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-base font-semibold text-slate-900">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <GlassCard className="bg-gradient-to-br from-primary to-primary-hover p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready for {service.title}?
            </h2>
            <p className="text-white/80 mb-8">Book a consultation to discuss your treatment options.</p>
            <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent-hover text-white shadow-lg">
              <a href="/book-appointment">Book Consultation</a>
            </Button>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
