"use client";

import { useRapStitch } from "@/lib/store";
import { PillSelector } from "./PillSelector";
import type { PenGame, Vibe } from "@/lib/types";

const VIBES: { value: Vibe; label: string; hint: string }[] = [
  { value: "HEAVENLY_HUSTLE", label: "Heavenly", hint: "Boss energy + luxury" },
  { value: "REALITY_CHECK", label: "Reality", hint: "Systemic truth, brutal" },
  { value: "ROMANTIC_SOUL", label: "Romantic", hint: "Vulnerable player" },
];

const PENS: { value: PenGame; label: string; hint: string }[] = [
  { value: "STORYTELLER", label: "Story", hint: "Narrative + imagery" },
  { value: "WORDPLAY", label: "Wordplay", hint: "Similes + metaphors" },
  { value: "PUNCHLINE", label: "Punchline", hint: "4-bar KOs" },
];

export function InputForge() {
  const {
    draft,
    setDraft,
    seed,
    setSeed,
    vibe,
    setVibe,
    penGame,
    setPenGame,
  } = useRapStitch();

  return (
    <section
      aria-label="Input Forge"
      className="flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-obsidian-900/40 p-6 backdrop-blur-xl"
    >
      <header className="flex items-baseline justify-between">
        <h2 className="font-mono text-xs uppercase tracking-brutal text-white/60">
          <span className="text-neon-cyan">01 /</span> Input Forge
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
          Paste · Seed · Vibe
        </span>
      </header>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="seed"
          className="font-mono text-[10px] uppercase tracking-brutal text-white/40"
        >
          Seed — word / letter / emotion
        </label>
        <input
          id="seed"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          placeholder="e.g. Maseru dust"
          className="rounded-lg border border-white/10 bg-transparent px-3 py-2 font-mono text-sm text-white placeholder:text-white/20 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/60"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label
          htmlFor="draft"
          className="font-mono text-[10px] uppercase tracking-brutal text-white/40"
        >
          Raw Draft
        </label>
        <textarea
          id="draft"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="paste bars, fragments, notebook pages…"
          className="min-h-[180px] flex-1 resize-none rounded-lg border border-white/10 bg-transparent px-3 py-3 font-mono text-sm leading-6 text-white placeholder:text-white/20 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/60"
        />
      </div>

      <PillSelector
        label="Vibe"
        layoutId="vibe-pill"
        options={VIBES}
        value={vibe}
        onChange={setVibe}
        accent="cyan"
      />

      <PillSelector
        label="Pen Game"
        layoutId="pen-pill"
        options={PENS}
        value={penGame}
        onChange={setPenGame}
        accent="fuchsia"
      />
    </section>
  );
}
