"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PERSONAL_INFO } from "@/lib/data/portfolio-data";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-surface border-t border-outline-variant/30 w-full py-10">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <Link href="/" className="font-hero-lg text-lg font-bold text-on-surface hover:text-primary transition-colors">
            Sohail.dev
          </Link>
          <p className="font-body-base text-sm text-on-surface-variant">
            © {currentYear} {PERSONAL_INFO.name} — Backend & Full-Stack Developer
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5 text-sm font-medium"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5 text-sm font-medium"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href={PERSONAL_INFO.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5 text-sm font-medium"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
            <span>Twitter</span>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-on-surface-variant hover:text-primary transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5 text-sm font-medium"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-all duration-200"
          aria-label="Back to Top"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </Container>
    </footer>
  );
}
