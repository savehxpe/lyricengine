import { create } from "zustand";
import type {
  AppMode,
  Awareness,
  PenGame,
  StitchResponse,
  Vibe,
} from "./types";

interface RapStitchState {
  // control dials
  mode: AppMode;
  vibe: Vibe;
  penGame: PenGame;
  awareness: Awareness;
  bpm: number;
  intensity: number;

  // engine io
  draft: string;
  seed: string;
  output: string;
  loading: boolean;
  error: string | null;

  // view toggles
  showRhymes: boolean;

  // actions
  setMode: (mode: AppMode) => void;
  setVibe: (vibe: Vibe) => void;
  setPenGame: (pen: PenGame) => void;
  setAwareness: (a: Awareness) => void;
  setBpm: (bpm: number) => void;
  setIntensity: (n: number) => void;
  setDraft: (draft: string) => void;
  setSeed: (seed: string) => void;
  setShowRhymes: (on: boolean) => void;

  stitch: () => Promise<void>;
  reset: () => void;
}

export const useRapStitch = create<RapStitchState>((set, get) => ({
  mode: "FREESTYLE",
  vibe: "REALITY_CHECK",
  penGame: "STORYTELLER",
  awareness: "MATURITY_ZEN",
  bpm: 90,
  intensity: 84,

  draft: "",
  seed: "",
  output: "",
  loading: false,
  error: null,

  showRhymes: true,

  setMode: (mode) => {
    // map app mode -> backend awareness default
    const awareness: Awareness =
      mode === "FREESTYLE" ? "MATURITY_ZEN" : "OUTWORLD_URGENCY";
    set({ mode, awareness });
  },
  setVibe: (vibe) => set({ vibe }),
  setPenGame: (penGame) => set({ penGame }),
  setAwareness: (awareness) => set({ awareness }),
  setBpm: (bpm) => set({ bpm: Math.max(60, Math.min(180, Math.round(bpm))) }),
  setIntensity: (intensity) =>
    set({ intensity: Math.max(0, Math.min(100, Math.round(intensity))) }),
  setDraft: (draft) => set({ draft }),
  setSeed: (seed) => set({ seed }),
  setShowRhymes: (showRhymes) => set({ showRhymes }),

  stitch: async () => {
    const { mode, vibe, penGame, awareness, bpm, intensity, draft, seed } =
      get();
    const seedLine = seed.trim();
    const draftLine = draft.trim();
    const promptParts: string[] = [];
    if (seedLine) promptParts.push(`SEED: ${seedLine}`);
    if (draftLine) promptParts.push(`DRAFT:\n${draftLine}`);
    promptParts.push(
      mode === "SONG"
        ? "STRUCTURE: Deliver [HOOK] + 16-bar [VERSE] + [BRIDGE]."
        : "STRUCTURE: 4-8 bars, dense freestyle flex."
    );
    const prompt = promptParts.join("\n\n");

    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          mode: awareness,
          bpm,
          penGame,
          settings: {
            vibe,
            penGame,
            outsiderIntensity: intensity,
          },
        }),
      });
      const data = (await res.json()) as StitchResponse;
      if (!res.ok || data.error) {
        throw new Error(data.error || `HTTP_${res.status}`);
      }
      set({ output: data.text || "", loading: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      set({ loading: false, error: msg });
    }
  },

  reset: () =>
    set({
      draft: "",
      seed: "",
      output: "",
      error: null,
    }),
}));
