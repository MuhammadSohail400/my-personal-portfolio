import { Metadata } from 'next';
import { PERSONAL_INFO } from '@/lib/data/portfolio-data';

export const siteConfig = {
  name: "Muhammad Sohail | Backend & Full-Stack Developer",
  description: "Official portfolio of Muhammad Sohail — Backend Developer, Full-Stack Developer, and BSCS Student based in Karachi, Pakistan. Building scalable APIs with Node.js, Express, TypeScript, PostgreSQL, and Next.js.",
  url: "https://sohail.dev",
  ogImage: "https://sohail.dev/og-image.png",
  author: "Muhammad Sohail",
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  canonicalUrl = siteConfig.url,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    authors: [{ name: PERSONAL_INFO.name }],
    keywords: [
      "Muhammad Sohail",
      "Backend Developer",
      "Full-Stack Developer",
      "Node.js Developer",
      "Express.js",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Next.js",
      "Software Engineer Karachi",
    ],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Muhammad Sohail Portfolio",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@muhammadsohail",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: 'Backend & Full-Stack Developer',
    url: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressCountry: 'Pakistan',
    },
    sameAs: [
      PERSONAL_INFO.githubUrl,
      PERSONAL_INFO.linkedinUrl,
    ],
    knowsAbout: [
      'Backend Development',
      'Node.js',
      'Express.js',
      'TypeScript',
      'PostgreSQL',
      'MongoDB',
      'Prisma ORM',
      'Next.js',
      'REST APIs',
    ],
  };
}
