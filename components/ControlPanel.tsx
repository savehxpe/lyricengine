"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRapStitch } from "@/lib/store";
import type { AppMode } from "@/lib/types";

const MODES: { value: AppMode; label: string; sub: string }[] = [
  { value: "FREESTYLE", label: "Freestyle", sub: "4-8 bar flex" },
  { value: "SONG", label: "Song", sub: "16 + hook + bridge" },
];

export function ControlPanel() {
  const { mode, setMode, bpm, setBpm, intensity, setIntensity } =
    useRapStitch();

  return (
    <motion.aside
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pointer-events-auto fixed left-1/2 top-6 z-40 -translate-x-1/2"
    >
      <div className="flex items-center gap-6 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-brutal text-white/80 shadow-glow-cyan backdrop-blur-xl">
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2 w-2 animate-pulse rounded-full bg-neon-cyan shadow-glow-cyan"
          />
          Rap Stitch
          <span className="text-white/30">v2.0</span>
        </span>

        <ModeToggle mode={mode} onChange={setMode} />

        <DialGroup label="BPM" value={bpm} min={60} max={180} onChange={setBpm} />

        <DialGroup
          label="Intensity"
          value={intensity}
          min={0}
          max={100}
          onChange={setIntensity}
          accent="fuchsia"
        />
      </div>
    </motion.aside>
  );
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: AppMode;
  onChange: (m: AppMode) => void;
}) {
  return (
    <div className="relative flex rounded-full border border-white/10 bg-obsidian-900/70 p-1">
      {MODES.map((m) => {
        const active = mode === m.value;
        return (
          <button
            key={m.value}
            type="button"
            onClick={() => onChange(m.value)}
            className="relative z-10 flex flex-col items-start rounded-full px-4 py-1 text-left transition-colors"
          >
            <AnimatePresence>
              {active && (
                <motion.span
                  layoutId="mode-pill"
                  className="absolute inset-0 rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/50 shadow-glow-cyan"
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                />
              )}
            </AnimatePresence>
            <span
              className={`relative font-mono text-[11px] uppercase tracking-brutal ${
                active ? "text-neon-cyan" : "text-white/60"
              }`}
            >
              {m.label}
            </span>
            <span
              className={`relative text-[9px] uppercase tracking-[0.2em] ${
                active ? "text-white/60" : "text-white/30"
              }`}
            >
              {m.sub}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function DialGroup({
  label,
  value,
  min,
  max,
  onChange,
  accent = "cyan",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  accent?: "cyan" | "fuchsia";
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const stroke = accent === "cyan" ? "#22d3ee" : "#e879f9";
  return (
    <label className="group flex items-center gap-3">
      <div className="flex flex-col">
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">
          {label}
        </span>
        <span
          className="font-mono text-sm text-white"
          style={{ textShadow: `0 0 12px ${stroke}80` }}
        >
          {value}
        </span>
      </div>
      <div className="relative h-8 w-24">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
        />
        <svg
          viewBox="0 0 100 32"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <line
            x1="2"
            y1="16"
            x2="98"
            y2="16"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          <line
            x1="2"
            y1="16"
            x2={2 + (96 * pct) / 100}
            y2="16"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx={2 + (96 * pct) / 100}
            cy="16"
            r="4"
            fill={stroke}
            opacity="0.95"
          />
        </svg>
      </div>
    </label>
  );
}
