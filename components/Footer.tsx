import Link from "next/link";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { clinicInfo, navLinks, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <p className="font-bold leading-tight">Gouraha Dant</p>
                <p className="text-sm text-slate-400">Chikitsalaya</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Trusted dental care in Bilaspur, Chhattisgarh. Providing world-class
              dental treatments with advanced technology and compassionate care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book-appointment"
                  className="text-slate-400 hover:text-accent text-sm transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-accent text-sm transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                {clinicInfo.address}
              </li>
              <li>
                <a
                  href={`tel:${clinicInfo.phoneLink}`}
                  className="flex items-center gap-3 text-slate-400 hover:text-accent text-sm transition-colors"
                >
                  <Phone size={18} className="shrink-0" />
                  {clinicInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Clock size={18} className="shrink-0" />
                {clinicInfo.hours}
              </li>
              <li>
                <a
                  href={`mailto:${clinicInfo.email}`}
                  className="flex items-center gap-3 text-slate-400 hover:text-accent text-sm transition-colors"
                >
                  <Mail size={18} className="shrink-0" />
                  {clinicInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {clinicInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
