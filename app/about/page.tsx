import type { Metadata } from "next";
import { Award, Heart, Shield, Clock, Users, CheckCircle, MapPin } from "lucide-react";
import { clinicInfo } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import Blobs from "@/components/Blobs";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About Dr. Abhishek Gouraha | Gouraha Dant Chikitsalaya",
  description: `Learn about Dr. Abhishek Gouraha — ${clinicInfo.doctor.experience} years of experience in ${clinicInfo.doctor.specialization}. Trusted dental care in Bilaspur.`,
};

const values = [
  { icon: Heart, title: "Patient First", description: "Every treatment plan is designed with your comfort and best outcomes in mind." },
  { icon: Shield, title: "Safety & Hygiene", description: "Strict sterilization protocols and international hygiene standards." },
  { icon: Award, title: "Excellence", description: "Commitment to the highest quality in every procedure we perform." },
  { icon: Clock, title: "Convenience", description: "Flexible scheduling and efficient treatment to respect your time." },
];

const qualifications = [
  "BDS (Bachelor of Dental Surgery)",
  "MDS (Master of Dental Surgery)",
  "Fellowship in Implantology",
  "Certified in Cosmetic Dentistry",
  "Member of Indian Dental Association",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-sky-50 pt-28 pb-16">
        <Blobs />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">About the Doctor</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Dedicated to creating healthy, beautiful smiles for over {clinicInfo.doctor.experience} years
          </p>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn>
              <GlassCard hover className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                  <span className="text-5xl font-bold text-primary">DG</span>
                </div>
                <p className="text-xl font-bold text-slate-900">{clinicInfo.doctor.name}</p>
                <p className="text-slate-500">{clinicInfo.doctor.degree}</p>
              </GlassCard>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  {clinicInfo.doctor.name}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {clinicInfo.doctor.bio}
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Dr. Gouraha believes in staying at the forefront of dental technology.
                  He regularly attends international conferences and training programs to
                  bring the latest techniques and treatments to his patients in Bilaspur.
                </p>

                <h3 className="font-bold text-slate-900 mb-4">Qualifications</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {qualifications.map((qual) => (
                    <Badge
                      key={qual}
                      className="gap-1.5 bg-primary/10 text-primary px-3 py-1.5 font-medium"
                    >
                      <CheckCircle size={14} />
                      {qual}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="rounded-full bg-gradient-to-r from-primary to-primary-hover shadow-lg">
                  <a href="/book-appointment">Book Consultation</a>
                </Button>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Values" subtitle="What drives us every day" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollFadeIn key={value.title} delay={index * 0.1}>
                <GlassCard hover className="h-full p-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary">
                    <value.icon size={28} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm">{value.description}</p>
                </GlassCard>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us / Map */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Visit Us" subtitle="Find us in Bilaspur, Chhattisgarh" />
          <GlassCard hover className="overflow-hidden p-2">
            <iframe
              src={clinicInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px", borderRadius: "0.75rem" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clinic Location"
            />
          </GlassCard>
        </div>
      </section>

      {/* Clinic CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-sky-50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <ScrollFadeIn>
            <Users className="mx-auto mb-6 text-primary/40" size={48} />
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Join Our Happy Patients
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Experience the difference of personalized, expert dental care.
            </p>
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-accent to-accent-hover text-white shadow-lg">
              <a href="/book-appointment">
                <MapPin size={18} />
                Schedule Your Visit
              </a>
            </Button>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}
