import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = localFont({
  src: [
    { path: "../public/fonts/Inter-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Inter-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Inter-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Inter-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Gouraha Dant Chikitsalaya | Dr. Abhishek Gouraha Dental Clinic Bilaspur",
  description:
    "Trusted dental care in Bilaspur, Chhattisgarh. Dr. Abhishek Gouraha offers dental implants, root canal, braces, teeth whitening and more. Book your appointment today.",
  keywords: [
    "dentist bilaspur",
    "dental clinic bilaspur",
    "dr abhishek gouraha",
    "dental implants bilaspur",
    "root canal bilaspur",
    "braces bilaspur",
    "teeth whitening bilaspur",
  ],
  openGraph: {
    title: "Gouraha Dant Chikitsalaya | Dr. Abhishek Gouraha",
    description: "Trusted dental care in Bilaspur, Chhattisgarh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
