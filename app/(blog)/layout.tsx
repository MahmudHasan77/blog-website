import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/(blog)/components/Header";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Let's Learn About Islam",
  description:
    "A blog about Islam, Muslim culture,Islamic Values and Moral Education: Application in Society and Personal Life, and current events in the Muslim world,Core Teachings of Islam ,Islamic Way of Life ,Islam and Morality ,Family in Islam ,Compassion through Islam ,Sunnah: Source of Inspiration ,Introduction to the Holy Sunnah ,Sunnah: Moral and Spiritual Guidance for Humanity , Prophet's Sunnah: Application and Lessons in Modern Life",
  keywords:
    "islam , islamic blog , what is the islam , quran , what is the quran, quranic blog , sunnah , sunnah blog,what is the sunnah , ",
  openGraph: {
    title: "Let's Learn About Islam",
    description:
      "A blog about Islam, Muslim culture,Islamic Values and Moral Education: Application in Society and Personal Life, and current events in the Muslim world,Core Teachings of Islam ,Islamic Way of Life ,Islam and Morality ,Family in Islam ,Compassion through Islam ,Sunnah: Source of Inspiration ,Introduction to the Holy Sunnah ,Sunnah: Moral and Spiritual Guidance for Humanity , Prophet's Sunnah: Application and Lessons in Modern Life",
    images: [
      "http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdpf3ipd7p%2Fimage%2Fupload%2Fv1758019279%2Fwqbhrscygh3gjn8iuxe0.jpg&w=640&q=75",
    ],
    url: "http://localhost:3000",
  },
  twitter: {
    title: "Let's Learn About Islam",
    description:
      "A blog about Islam, Muslim culture,Islamic Values and Moral Education: Application in Society and Personal Life, and current events in the Muslim world,Core Teachings of Islam ,Islamic Way of Life ,Islam and Morality ,Family in Islam ,Compassion through Islam ,Sunnah: Source of Inspiration ,Introduction to the Holy Sunnah ,Sunnah: Moral and Spiritual Guidance for Humanity , Prophet's Sunnah: Application and Lessons in Modern Life",
    images: [
      "http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdpf3ipd7p%2Fimage%2Fupload%2Fv1758019279%2Fwqbhrscygh3gjn8iuxe0.jpg&w=640&q=75",
    ],

    card: "summary_large_image",
    creator:"Mahmud Hasan"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-200`}
      >
        <Toaster />
        <Header />
        <div className="p-1">{children}</div>
<Footer/>
      </body>
    </html>
  );
}
