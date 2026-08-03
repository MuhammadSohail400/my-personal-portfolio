"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Download, Terminal } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home",     href: "/#home" },
  { name: "About",    href: "/#about" },
  { name: "Skills",   href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact",  href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm py-2"
          : "bg-surface/60 backdrop-blur-md border-b border-outline-variant/20 py-3"
      }`}
    >
      <Container className="flex items-center justify-between h-12">
        {/* Brand */}
        <Link
          href="/"
          className="font-hero-lg text-xl font-bold text-primary tracking-tight flex items-center gap-1.5 group"
        >
          <span className="p-1 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
            <Terminal className="w-4 h-4" />
          </span>
          <span>Sohail.dev</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 font-medium text-sm">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-all duration-200 hover:text-primary relative py-1 ${
                  isActive ? "text-primary font-semibold" : "text-on-surface-variant"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeSwitcher />
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1.5"
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </Button>
        </div>

        {/* Mobile: Theme switcher + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <button
            className="text-on-surface p-2 rounded-lg hover:bg-surface-container-low transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-surface border-b border-outline-variant/30 px-6 py-5 space-y-3 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-on-surface-variant hover:text-primary font-medium text-sm py-2.5 px-2 rounded-lg hover:bg-surface-container-low transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-outline-variant/20">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.open("/resume.pdf", "_blank");
                  }}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
