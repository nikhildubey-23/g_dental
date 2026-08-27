import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, HelpCircle } from "lucide-react";
import { services } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Button from "@/components/ui/LegacyButton";

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
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-white/80 text-lg max-w-2xl">{service.shortDescription}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <p className="text-slate-700 text-lg leading-relaxed">{service.description}</p>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Benefits</h2>
          </ScrollFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, index) => (
              <ScrollFadeIn key={benefit} delay={index * 0.05}>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <Check className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Treatment Process</h2>
          </ScrollFadeIn>
          <div className="space-y-6">
            {service.process.map((step, index) => (
              <ScrollFadeIn key={step.step} delay={index * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 text-white font-bold">
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
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          </ScrollFadeIn>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <ScrollFadeIn key={faq.question} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="text-primary shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for {service.title}?
          </h2>
          <p className="text-white/80 mb-8">Book a consultation to discuss your treatment options.</p>
          <Button href="/book-appointment" size="lg">Book Consultation</Button>
        </div>
      </section>
    </>
  );
}
