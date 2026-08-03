"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export interface CodeBlockProps {
  filename: string;
  code: string;
  language?: string;
}

export function CodeBlock({ filename, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-outline-variant/30 shadow-2xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-outline-variant/20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-3 text-xs font-mono text-outline">{filename}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-xs text-outline hover:text-white transition-colors px-2 py-1 rounded bg-[#21262d] hover:bg-[#30363d]"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-6 font-mono text-sm overflow-x-auto code-container text-[#c9d1d9] leading-relaxed">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
