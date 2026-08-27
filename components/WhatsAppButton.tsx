"use client";

import { MessageCircle } from "lucide-react";
import { clinicInfo } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a
      href={clinicInfo.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
      <MessageCircle size={28} className="relative" />
    </a>
  );
}
