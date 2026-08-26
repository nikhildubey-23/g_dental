import type { Metadata } from "next";
import { Award, Heart, Shield, Clock, Users, CheckCircle } from "lucide-react";
import { clinicInfo } from "@/lib/data";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

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
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About the Doctor</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Dedicated to creating healthy, beautiful smiles for over {clinicInfo.doctor.experience} years
          </p>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn>
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <div className="text-center text-primary">
                  <div className="w-40 h-40 bg-primary/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-5xl font-bold">DG</span>
                  </div>
                  <p className="text-xl font-bold">{clinicInfo.doctor.name}</p>
                  <p className="text-slate-500">{clinicInfo.doctor.degree}</p>
                </div>
              </div>
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
                <ul className="space-y-2 mb-8">
                  {qualifications.map((qual) => (
                    <li key={qual} className="flex items-center gap-2 text-slate-600">
                      <CheckCircle size={18} className="text-primary shrink-0" />
                      {qual}
                    </li>
                  ))}
                </ul>

                <Button href="/book-appointment">Book Consultation</Button>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Values" subtitle="What drives us every day" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollFadeIn key={value.title} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-8 text-center shadow-sm h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm">{value.description}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollFadeIn>
            <Users className="text-white/30 mx-auto mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Happy Patients
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Experience the difference of personalized, expert dental care.
            </p>
            <Button href="/book-appointment" size="lg">
              Schedule Your Visit
            </Button>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}
