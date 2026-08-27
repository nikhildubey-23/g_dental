import Link from "next/link";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { clinicInfo, navLinks, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-xl border-t border-teal-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-white font-bold">
                G
              </span>
              <div>
                <p className="font-bold text-slate-900 leading-tight">Gouraha Dant</p>
                <p className="text-sm text-slate-500">Chikitsalaya</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Trusted dental care in Bilaspur, Chhattisgarh. Advanced technology and compassionate care.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-600 hover:text-primary text-sm">{l.label}</Link>
                </li>
              ))}
              <li><Link href="/book-appointment" className="text-slate-600 hover:text-primary text-sm">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Our Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-slate-600 hover:text-primary text-sm">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-3"><MapPin size={18} className="shrink-0 mt-0.5" /> {clinicInfo.address}</li>
              <li>
                <a href={`tel:${clinicInfo.phoneLink}`} className="flex gap-3 hover:text-primary"><Phone size={18} className="shrink-0" /> {clinicInfo.phone}</a>
              </li>
              <li className="flex gap-3"><Clock size={18} className="shrink-0" /> {clinicInfo.hours}</li>
              <li><a href={`mailto:${clinicInfo.email}`} className="flex gap-3 hover:text-primary"><Mail size={18} className="shrink-0" /> {clinicInfo.email}</a></li>
            </ul>
            <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-full border border-teal-200 bg-white/70 px-4 py-2 text-sm outline-none focus:border-primary"
              />
              <button className="rounded-full bg-gradient-to-r from-primary to-primary-hover px-4 py-2 text-sm font-medium text-white">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-teal-100">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {clinicInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
