import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/common/animated-background";
import { BackToTop } from "@/components/common/back-to-top";
import { ThemeProvider } from "@/components/common/theme-provider";
import { constructMetadata, getPersonJsonLd } from "@/lib/metadata";
import { getPersonalInfo } from "@/lib/data/fetch-portfolio";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const personalInfo = await getPersonalInfo();
  return constructMetadata({ personalInfo });
}

// FOUC-prevention: apply stored theme synchronously before first paint
const FOUC_SCRIPT = `
  try {
    var t = localStorage.getItem('portfolio-theme');
    if (t && t !== 'blue') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch(e) {}
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personalInfo = await getPersonalInfo();
  const jsonLd = getPersonJsonLd(personalInfo);

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Inline script runs synchronously — prevents theme flash on page load */}
        <script dangerouslySetInnerHTML={{ __html: FOUC_SCRIPT }} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} font-inter bg-background text-on-surface antialiased selection:bg-primary-fixed-dim selection:text-on-primary-fixed min-h-screen flex flex-col relative overflow-x-hidden`}
      >
        <ThemeProvider>
          <AnimatedBackground />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
