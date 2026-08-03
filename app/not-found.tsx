"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Terminal, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-32 bg-background">
      <Container className="text-center space-y-8 max-w-xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-2 border border-primary/20">
          <Terminal className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-primary font-bold text-xs tracking-widest uppercase">
            ERROR 404
          </span>
          <h1 className="font-hero-lg text-4xl sm:text-5xl font-bold text-on-background">
            Page Not Found
          </h1>
          <p className="font-body-base text-base text-on-surface-variant leading-relaxed">
            The endpoint or resource you requested does not exist on this server. It might have been moved or removed.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              <span>Return Home</span>
            </Button>
          </Link>
          <Link href="/#projects">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Explore Projects</span>
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
