"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRapStitch } from "@/lib/store";
import { RhymeHighlighter } from "./RhymeHighlighter";

export function OutputDisplay() {
  const {
    output,
    showRhymes,
    setShowRhymes,
    loading,
    error,
    isPerforming,
    isPaused,
    performanceBar,
    performanceProgress,
  } = useRapStitch();

  const lines = output.split("\n").filter((l) => l.trim().length > 0);

  return (
    <section
      aria-label="Output Display"
      className="flex h-full flex-col rounded-2xl border border-white/10 bg-obsidian-900/40 backdrop-blur-xl overflow-hidden"
    >
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-obsidian-900/80 px-6 py-3 backdrop-blur-xl">
        <h2 className="font-mono text-xs uppercase tracking-brutal text-white/60">
          <span className="text-neon-fuchsia">03 /</span> Output
        </h2>
        <div className="flex items-center gap-6">
          {isPerforming && (
            <div className="flex items-center gap-4">
              <div className="font-mono text-[10px] text-white/40">
                BAR <span className="text-white">{performanceBar + 1}</span> / {lines.length}
              </div>
              <div className={`flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest ${isPaused ? "text-white/40" : "text-neon-cyan animate-pulse"}`}>
                <span className={`h-1 w-1 rounded-full ${isPaused ? "bg-white/20" : "bg-neon-cyan"}`} />
                {isPaused ? "Performance_Paused" : "Live_Performance"}
              </div>
            </div>
          )}
          <RhymeToggle checked={showRhymes} onChange={setShowRhymes} />
        </div>
      </header>

      {/* Cinematic Progress Bar */}
      <AnimatePresence>
        {isPerforming && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            className="z-10 h-0.5 w-full bg-white/5 origin-left"
          >
            <motion.div
              className="h-full bg-neon-cyan shadow-glow-cyan"
              style={{ width: `${performanceProgress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex-1 overflow-auto p-6 scroll-smooth">
        {error && (
          <pre className="whitespace-pre-wrap font-mono text-xs text-neon-rose">
            {error}
          </pre>
        )}

        {!error && !output && !loading && <EmptyState />}

        {loading && (
          <div className="flex flex-col gap-2 font-mono text-xs text-white/40">
            <SkeletonLine width="70%" />
            <SkeletonLine width="90%" />
            <SkeletonLine width="55%" />
            <SkeletonLine width="80%" />
            <SkeletonLine width="45%" />
          </div>
        )}

        {!loading && output && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-2 font-mono text-sm leading-relaxed text-white"
          >
            {lines.map((line, idx) => (
              <LyricLine
                key={idx}
                text={line}
                showRhymes={showRhymes}
                isPerforming={isPerforming}
                isActive={isPerforming && idx === performanceBar}
                isPast={isPerforming && idx < performanceBar}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function LyricLine({
  text,
  showRhymes,
  isPerforming,
  isActive,
  isPast,
}: {
  text: string;
  showRhymes: boolean;
  isPerforming: boolean;
  isActive: boolean;
  isPast: boolean;
}) {
  const ref = useActiveScroll(isActive);

  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: isPerforming ? (isActive ? 1 : isPast ? 0.3 : 0.15) : 1,
        x: isActive ? 4 : 0,
        scale: isActive ? 1.02 : 1,
        filter: isActive ? "brightness(1.2)" : "brightness(1)",
      }}
      transition={{ duration: 0.3 }}
      className={`relative whitespace-pre-wrap break-words transition-colors ${
        isActive ? "text-neon-cyan font-semibold" : "text-white"
      }`}
    >
      <RhymeHighlighter text={text} active={showRhymes} />
      
      {isActive && (
        <motion.span
          layoutId="active-indicator"
          className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-glow-cyan"
        />
      )}

      {isActive && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          className="pointer-events-none absolute inset-0 -z-10 bg-neon-cyan/5 blur-sm"
        />
      )}
    </motion.div>
  );
}

function useActiveScroll(isActive: boolean) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isActive]);
  return ref;
}


function RhymeToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-brutal text-white/50">
        Rhyme Map
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-10 rounded-full border border-white/15 transition-colors ${
          checked ? "bg-neon-cyan/25" : "bg-white/[0.04]"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`absolute top-1/2 block h-3.5 w-3.5 -translate-y-1/2 rounded-full ${
            checked
              ? "right-1 bg-neon-cyan shadow-glow-cyan"
              : "left-1 bg-white/40"
          }`}
        />
      </button>
    </label>
  );
}

function SkeletonLine({ width }: { width: string }) {
  return (
    <span
      className="block h-3 animate-pulse rounded bg-white/10"
      style={{ width }}
    />
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-start gap-4 font-mono text-xs leading-7 text-white/40">
      <p className="text-white/60">&gt; awaiting stitch_</p>
      <p>
        drop a seed, paste a draft, pick a vibe.
        <br />
        hit STITCH. the engine answers in bars.
      </p>
      <p className="text-white/30">
        {"// multisyllabic tagging arrives as "}
        <span className="text-neon-cyan">&lt;r1&gt;</span>…
        <span className="text-neon-fuchsia">&lt;r5&gt;</span>
      </p>
    </div>
  );
}
