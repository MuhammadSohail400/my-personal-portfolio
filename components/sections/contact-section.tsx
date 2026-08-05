"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/common/section-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PERSONAL_INFO } from "@/lib/data/portfolio-data";
import {
  Send, Download, MapPin, CheckCircle, AlertCircle,
  Loader2, ArrowUpRight, Github, Linkedin, Twitter, Mail,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      setStatus("error");
      setResponseMessage("Please fill out all required fields.");
      return;
    }

    setStatus("loading");
    setResponseMessage("");
    const API_BASE_URL = (
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    ).replace(/\/$/, "");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      // Try to parse JSON, but don't blow up if the server sent something else
      // (e.g. an HTML error page from a 502/504, or a CORS-blocked opaque response)
      let data: { success?: boolean; message?: string } = {};
      try {
        data = await response.json();
      } catch {
        // response wasn't valid JSON — treat as failure below
      }

      if (response.ok && data.success) {
        setStatus("success");
        setResponseMessage(data.message || "Thank you! Your message has been sent successfully.");
        setFormData({ fullName: "", email: "", subject: "", message: "" });
        setTimeout(() => { setStatus("idle"); setResponseMessage(""); }, 5000);
      } else {
        setStatus("error");
        setResponseMessage(
          data.message || `Something went wrong (status ${response.status}). Please try again or email me directly.`
        );
      }
    } catch (err) {
      // This runs on network failures, CORS errors, DNS issues, backend down, etc.
      // Previously this silently showed "success" which hid real delivery failures.
      console.error("Contact form submission failed:", err);
      setStatus("error");
      setResponseMessage(
        "Couldn't reach the server. Please check your connection or email me directly."
      );
    }
  };

  return (
    <section id="contact" className="py-20 bg-surface relative">
      <Container>
        <SectionHeader
          badge="Get In Touch"
          title="Let's Build Something Scalable"
          description="I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just want to say hi, my inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start mb-14">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-8"
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-outline-variant bg-surface-container-lowest">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[10px] text-on-surface-variant uppercase tracking-wider">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      disabled={status === "loading"}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[10px] text-on-surface-variant uppercase tracking-wider">
                      Email Address <span className="text-error">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={status === "loading"}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Opportunity"
                    disabled={status === "loading"}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Message <span className="text-error">*</span>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, architecture needs, or role..."
                    rows={5}
                    disabled={status === "loading"}
                    required
                  />
                </div>

                {status === "error" && (
                  <div className="p-3.5 bg-error-container/25 border border-error/25 rounded-xl text-on-error-container text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{responseMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 text-green-600" />
                    <span>{responseMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === "loading"}
                  className="flex items-center gap-2 px-8"
                >
                  {status === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></>
                  ) : status === "success" ? (
                    <><CheckCircle className="w-4 h-4" /><span>Sent!</span></>
                  ) : (
                    <><span>Send Message</span><Send className="w-4 h-4" /></>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Resume CTA */}
            <div className="bg-primary text-on-primary p-6 rounded-2xl relative overflow-hidden border border-primary/20 shadow-md">
              <div className="relative z-10 space-y-3">
                <h3 className="font-hero-lg text-xl font-bold">Work with me</h3>
                <p className="font-body-base text-xs opacity-85 leading-relaxed">
                  Grab a copy of my resume to see my detailed work history and technical expertise.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full bg-white text-primary hover:bg-slate-50 flex items-center justify-center gap-2 shadow-sm font-semibold"
                  onClick={() => window.open("/resume.pdf", "_blank")}
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </Button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl" />
            </div>

            {/* Location */}
            <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 border border-outline-variant bg-surface-container-lowest">
              <div className="w-10 h-10 bg-surface-container-highest rounded-xl flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-[10px] text-on-surface-variant uppercase tracking-wider">Based in</p>
                <p className="font-hero-lg text-sm font-bold text-on-surface">{PERSONAL_INFO.location}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-5 rounded-2xl border border-outline-variant bg-surface-container-lowest">
              <h4 className="font-semibold text-[10px] text-on-surface-variant uppercase tracking-wider mb-4">
                Digital Footprint
              </h4>
              <div className="space-y-1">
                {[
                  { href: PERSONAL_INFO.githubUrl, icon: <Github className="w-4 h-4" />, label: "GitHub" },
                  { href: PERSONAL_INFO.linkedinUrl, icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
                  { href: PERSONAL_INFO.twitterUrl, icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                  { href: `mailto:${PERSONAL_INFO.email}`, icon: <Mail className="w-4 h-4" />, label: "Direct Email" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-on-surface-variant group-hover:text-primary transition-colors">
                        {item.icon}
                      </span>
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-outline group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Panel */}
        <div className="h-52 sm:h-64 w-full rounded-2xl overflow-hidden relative border border-outline-variant/40 shadow-sm group bg-on-background">
          <div
            className="absolute inset-0 grayscale contrast-125 opacity-25 group-hover:opacity-45 transition-opacity duration-700 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASI64FSzmEkj_ys6nqXpTrSzHPx-6EKgdH_V9c8X9lwIhRqPvpGOITv6B5eac9sbhAf-w6bjbr3n-uQXPW5tA8q_zmwNJNxIsKHgxh7-bAqAh3DUFR6K5_-dc6wcBLmmHjSmeB5mghdgWyWZDXBJ0JGJMOz0KVYqDF_oTSWXMSeqpnIaekyQYWrUKHXjM2CnV6_danJ0Ru9qaIiPwyeiHisypWvlqSNarTnMG6p-gu7YLQM4K7WxZY2Q')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-background via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-5 bg-surface/90 backdrop-blur-md px-5 py-3 rounded-xl border border-outline-variant/40">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
              <p className="font-semibold text-sm text-on-surface">{PERSONAL_INFO.status}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}