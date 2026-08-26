import Hero from "@/components/sections/Hero";
import AboutSnippet from "@/components/sections/AboutSnippet";
import ServicesPreview from "@/components/sections/ServicesPreview";
import StatsCounter from "@/components/sections/StatsCounter";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import ContactPreview from "@/components/sections/ContactPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <ServicesPreview />
      <StatsCounter />
      <Testimonials />
      <CTABanner />
      <ContactPreview />
    </>
  );
}
