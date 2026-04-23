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

  // performance mode
  isPerforming: boolean;
  isPaused: boolean;
  performanceBar: number;
  performanceProgress: number;

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
  refine: () => Promise<void>;
  togglePerformance: () => void;
  stopPerformance: () => void;
  reset: () => void;
}

let perfTimer: NodeJS.Timeout | null = null;

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

  isPerforming: false,
  isPaused: false,
  performanceBar: 0,
  performanceProgress: 0,

  setMode: (mode) => {
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

  refine: async () => {
    const { vibe, penGame, awareness, bpm, intensity, output } = get();
    if (!output) return;

    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `TECHNICAL_REFINE_ENGINE_V2:
            1. INCREASE multi-syllabic rhyme density (minimum 3-syllable chains).
            2. DEEPEN Maseru street-level imagery and Southern African textures.
            3. MAINTAIN existing narrative arc but SHARPEN the wordplay.
            4. ENSURE elite Call-and-Response (parenthetical) layers.
            
            ORIGINAL_CONTENT:
            ${output}`,
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

  togglePerformance: () => {
    const { isPerforming, isPaused, stopPerformance, output, bpm } = get();
    
    if (isPerforming && !isPaused) {
      // Pause it
      if (perfTimer) clearTimeout(perfTimer);
      set({ isPaused: true });
      return;
    }

    if (isPaused) {
      // Resume it
      set({ isPaused: false });
      const msPerLine = (60000 / bpm) * 4;
      const runStep = () => {
        const { performanceBar, isPerforming, isPaused } = get();
        if (!isPerforming || isPaused) return;

        const lines = output.split("\n").filter((l) => l.trim().length > 0);
        if (performanceBar >= lines.length - 1) {
          set({ performanceProgress: 100 });
          setTimeout(() => get().stopPerformance(), msPerLine);
          return;
        }

        const nextBar = performanceBar + 1;
        set({
          performanceBar: nextBar,
          performanceProgress: (nextBar / lines.length) * 100,
        });

        perfTimer = setTimeout(runStep, msPerLine);
      };
      perfTimer = setTimeout(runStep, msPerLine);
      return;
    }

    if (!output) return;

    const lines = output.split("\n").filter((l) => l.trim().length > 0);
    if (lines.length === 0) return;

    set({
      isPerforming: true,
      isPaused: false,
      performanceBar: 0,
      performanceProgress: 0,
    });

    const msPerLine = (60000 / bpm) * 4;

    const runStep = () => {
      const { performanceBar, isPerforming, isPaused } = get();
      if (!isPerforming || isPaused) return;

      if (performanceBar >= lines.length - 1) {
        set({ performanceProgress: 100 });
        setTimeout(() => get().stopPerformance(), msPerLine);
        return;
      }

      const nextBar = performanceBar + 1;
      set({
        performanceBar: nextBar,
        performanceProgress: (nextBar / lines.length) * 100,
      });

      perfTimer = setTimeout(runStep, msPerLine);
    };

    perfTimer = setTimeout(runStep, msPerLine);
  },

  stopPerformance: () => {
    if (perfTimer) clearTimeout(perfTimer);
    set({
      isPerforming: false,
      isPaused: false,
      performanceBar: 0,
      performanceProgress: 0,
    });
  },

  reset: () => {
    if (perfTimer) clearTimeout(perfTimer);
    set({
      draft: "",
      seed: "",
      output: "",
      error: null,
      isPerforming: false,
      isPaused: false,
      performanceBar: 0,
      performanceProgress: 0,
    });
  },
}));
