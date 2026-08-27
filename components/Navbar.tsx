"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, clinicInfo } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
          isScrolled ? "glass shadow-lg" : "bg-white/40 backdrop-blur-xl border border-white/30"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-white font-bold text-lg">
            G
          </span>
          <span className="hidden sm:block leading-tight">
            <span className="block font-bold text-slate-900 text-sm">Gouraha Dant</span>
            <span className="block text-xs text-slate-500">Chikitsalaya</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href={`tel:${clinicInfo.phoneLink}`} className="flex items-center gap-2 text-sm text-slate-600">
            <Phone size={16} />
            {clinicInfo.phone}
          </a>
          <Link
            href="/book-appointment"
            className="rounded-full bg-gradient-to-r from-accent to-accent-hover px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="md:hidden p-2 text-slate-900"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden mx-auto max-w-6xl mt-2 glass rounded-3xl p-5 shadow-xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl px-4 py-3 text-slate-700 font-medium hover:bg-primary/10 hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/book-appointment"
              className="mt-2 rounded-xl bg-gradient-to-r from-accent to-accent-hover px-4 py-3 text-center font-semibold text-white"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
