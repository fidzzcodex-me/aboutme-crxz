import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "@/lib/fontawesome";
import "./globals.css";
import { profile } from "@/data/profile";
import { ThemeProvider } from "@/lib/theme-context";
import ParticleField from "@/components/ParticleField";
import "@/components/ParticleField.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = {
  metadataBase: new URL(profile.site.url),
  title: profile.site.title,
  description: profile.site.description,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: profile.site.title,
    description: profile.site.description,
    url: profile.site.url,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.site.title,
    description: profile.site.description,
  },
  alternates: {
    canonical: profile.site.url,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider>
          <a href="#main-content" className="visually-hidden">
            Skip to main content
          </a>
          <ParticleField />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
