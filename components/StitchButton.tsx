"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRapStitch } from "@/lib/store";

export function StitchButton() {
  const { loading, stitch, mode, seed, draft } = useRapStitch();
  const canStitch = !loading && (seed.trim().length > 0 || draft.trim().length > 0);

  return (
    <section
      aria-label="Engine"
      className="flex h-full flex-col items-center justify-center gap-6"
    >
      <div className="relative">
        <motion.button
          type="button"
          onClick={() => void stitch()}
          disabled={!canStitch}
          whileHover={canStitch ? { scale: 1.04 } : undefined}
          whileTap={canStitch ? { scale: 0.97 } : undefined}
          className={`group relative flex h-32 w-32 items-center justify-center rounded-full border font-mono text-sm uppercase tracking-brutal transition-all
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
          <span
            aria-hidden
            className={`pointer-events-none absolute -inset-6 rounded-full border border-neon-cyan/10 transition-opacity ${
              canStitch ? "opacity-100 animate-spin-slow" : "opacity-0"
            }`}
          />
        </motion.button>
      </div>

      <ol className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
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
