"use client";

import { MessageCircle } from "lucide-react";
import { clinicInfo } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a
      href={clinicInfo.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
