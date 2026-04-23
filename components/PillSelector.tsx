"use client";

import { motion } from "framer-motion";

export interface PillOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

export function PillSelector<T extends string>({
  label,
  options,
  value,
  onChange,
  layoutId,
  accent = "cyan",
}: {
  label: string;
  options: PillOption<T>[];
  value: T;
  onChange: (v: T) => void;
  layoutId: string;
  accent?: "cyan" | "fuchsia";
}) {
  const ring = accent === "cyan" ? "ring-neon-cyan/50" : "ring-neon-fuchsia/50";
  const bg = accent === "cyan" ? "bg-neon-cyan/10" : "bg-neon-fuchsia/10";
  const txt = accent === "cyan" ? "text-neon-cyan" : "text-neon-fuchsia";
  const shadow =
    accent === "cyan" ? "shadow-glow-cyan" : "shadow-glow-fuchsia";

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-brutal text-white/40">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className="relative rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
              title={opt.hint}
            >
              {active && (
                <motion.span
                  layoutId={layoutId}
                  className={`absolute inset-0 rounded-full ${bg} ring-1 ${ring} ${shadow}`}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className={`relative ${active ? txt : ""}`}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
