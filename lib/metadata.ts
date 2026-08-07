import { Metadata } from 'next';
import { PERSONAL_INFO as STATIC_PERSONAL_INFO } from '@/lib/data/portfolio-data';
import type { PersonalInfo } from '@/lib/data/fetch-portfolio';

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
  personalInfo = STATIC_PERSONAL_INFO,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  personalInfo?: PersonalInfo;
} = {}): Metadata {
  return {
    title,
    description,
    authors: [{ name: personalInfo.name }],
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

export function getPersonJsonLd(personalInfo: PersonalInfo = STATIC_PERSONAL_INFO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: 'Backend & Full-Stack Developer',
    url: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressCountry: 'Pakistan',
    },
    sameAs: [
      personalInfo.githubUrl,
      personalInfo.linkedinUrl,
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
