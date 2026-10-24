"use client";

import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { tokenize, type CodeLanguage, type TokenKind } from "@/lib/highlight";

const tokenClass: Record<TokenKind, string> = {
  keyword: "text-violet-300",
  string: "text-emerald-300",
  comment: "text-slate-500 italic",
  number: "text-amber-300",
  function: "text-cyan-300",
  plain: "text-slate-200",
};

export function CodeBlock({ code, language, title }: { code: string; language: CodeLanguage; title: string }) {
  const [copied, setCopied] = useState(false);
  const tokens = useMemo(() => tokenize(code, language), [code, language]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#070a12]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          <span className="truncate text-xs text-slate-400">{title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
            {language}
          </span>
          <button
            type="button"
            onClick={copy}
            className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </figcaption>
      <pre className="max-h-[560px] overflow-auto p-4 font-mono text-[12.5px] leading-relaxed">
        <code>
          {tokens.map((t, i) => (
            <span key={i} className={tokenClass[t.kind]}>
              {t.text}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
