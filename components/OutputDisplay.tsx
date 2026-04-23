"use client";

import { motion } from "framer-motion";
import { useRapStitch } from "@/lib/store";
import { RhymeHighlighter } from "./RhymeHighlighter";

export function OutputDisplay() {
  const { output, showRhymes, setShowRhymes, loading, error } = useRapStitch();

  return (
    <section
      aria-label="Output Display"
      className="flex h-full flex-col rounded-2xl border border-white/10 bg-obsidian-900/40 backdrop-blur-xl"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-obsidian-900/80 px-6 py-3 backdrop-blur-xl">
        <h2 className="font-mono text-xs uppercase tracking-brutal text-white/60">
          <span className="text-neon-fuchsia">03 /</span> Output
        </h2>
        <RhymeToggle checked={showRhymes} onChange={setShowRhymes} />
      </header>

      <div className="relative flex-1 overflow-auto p-6">
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
          <motion.pre
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="whitespace-pre-wrap break-words font-mono text-sm leading-7 text-white"
          >
            <RhymeHighlighter text={output} active={showRhymes} />
          </motion.pre>
        )}
      </div>
    </section>
  );
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
