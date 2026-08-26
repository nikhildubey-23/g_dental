import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
