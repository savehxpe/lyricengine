"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRapStitch } from "@/lib/store";

export function StitchButton() {
  const {
    loading,
    stitch,
    refine,
    mode,
    seed,
    draft,
    isPerforming,
    isPaused,
    togglePerformance,
    output,
  } = useRapStitch();

  const canStitch =
    !loading && (seed.trim().length > 0 || draft.trim().length > 0);
  const canRefine = !loading && output.trim().length > 0;
  const canPerf = output.trim().length > 0;

  return (
    <section
      aria-label="Engine Hub"
      className="flex h-full flex-col items-center justify-center gap-8"
    >
      {/* REFINE BUTTON */}
      <motion.button
        type="button"
        onClick={() => void refine()}
        disabled={!canRefine}
        whileHover={canRefine ? { scale: 1.05, y: -2 } : undefined}
        whileTap={canRefine ? { scale: 0.95 } : undefined}
        className={`group relative flex h-10 w-32 items-center justify-center rounded-full border font-mono text-[10px] uppercase tracking-brutal transition-all
          ${
            canRefine
              ? "border-neon-fuchsia/40 bg-neon-fuchsia/5 text-neon-fuchsia/80 hover:border-neon-fuchsia/60 hover:text-neon-fuchsia shadow-glow-fuchsia/20"
              : "cursor-not-allowed border-white/5 bg-white/[0.01] text-white/20"
          }`}
      >
        <span className="relative z-10">Refine / Finalize</span>
        {loading && (
          <motion.span
            layoutId="action-pulse"
            className="absolute inset-0 rounded-full bg-neon-fuchsia/10 animate-pulse"
          />
        )}
      </motion.button>

      {/* MAIN STITCH BUTTON */}
      <div className="relative">
        <motion.button
          type="button"
          onClick={() => void stitch()}
          disabled={!canStitch}
          whileHover={canStitch ? { scale: 1.04 } : undefined}
          whileTap={canStitch ? { scale: 0.97 } : undefined}
          className={`group relative flex h-36 w-36 items-center justify-center rounded-full border font-mono text-sm uppercase tracking-brutal transition-all
            ${
              canStitch
                ? "border-neon-cyan/60 bg-neon-cyan/10 text-neon-cyan shadow-glow-cyan drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                : "cursor-not-allowed border-white/10 bg-white/[0.02] text-white/30"
            }`}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <Decipher />
                <span className="mt-2 text-[10px] text-white/60">
                  stitching…
                </span>
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <span className="text-xl font-bold">STITCH</span>
                <span className="text-[9px] text-white/40">
                  {mode === "FREESTYLE" ? "4-8 bars" : "16 + hook"}
                </span>
              </motion.span>
            )}
          </AnimatePresence>

          <span
            aria-hidden
            className={`pointer-events-none absolute -inset-3 rounded-full border border-neon-cyan/20 transition-opacity ${
              canStitch ? "opacity-100 animate-pulse-slow" : "opacity-0"
            }`}
          />
        </motion.button>
      </div>

      {/* PERFORMANCE CONTROLS */}
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          onClick={() => togglePerformance()}
          disabled={!canPerf}
          whileHover={canPerf ? { scale: 1.05, y: 2 } : undefined}
          whileTap={canPerf ? { scale: 0.95 } : undefined}
          className={`group relative flex h-12 ${isPerforming ? "w-32" : "w-40"} items-center justify-center gap-3 rounded-full border font-mono text-[10px] uppercase tracking-brutal transition-all
            ${
              canPerf
                ? isPerforming
                  ? isPaused
                    ? "border-neon-amber/60 bg-neon-amber/10 text-neon-amber shadow-glow-amber/20"
                    : "border-white bg-white text-black shadow-glow-white"
                  : "border-white/20 bg-white/5 text-white/60 hover:border-white/40 hover:text-white"
                : "cursor-not-allowed border-white/5 bg-white/[0.01] text-white/10"
            }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isPerforming && !isPaused ? "animate-pulse bg-current" : "bg-white/40"
            }`}
          />
          <span>
            {!isPerforming ? "Performance" : isPaused ? "Resume" : "Pause"}
          </span>
        </motion.button>

        {isPerforming && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            type="button"
            onClick={() => useRapStitch.getState().stopPerformance()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-neon-rose/40 bg-neon-rose/5 text-neon-rose hover:border-neon-rose/60 hover:bg-neon-rose/10 transition-all"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" />
            </svg>
          </motion.button>
        )}
      </div>

      <ol className="mt-4 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
        <li>
          <span className="text-neon-cyan">01</span> · input forge
        </li>
        <li>
          <span className="text-neon-fuchsia">02</span> · stitch engine
        </li>
        <li>
          <span className="text-white/50">03</span> · output display
        </li>
      </ol>
    </section>
  );
}

function Decipher() {
  const chars = "01XHXPE//<R1><R2>";
  return (
    <span className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          className="font-mono text-xs text-neon-cyan"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.12,
          }}
        >
          {chars[(i * 3) % chars.length]}
        </motion.span>
      ))}
    </span>
  );
}
