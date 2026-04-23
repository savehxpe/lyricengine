export type AppMode = "FREESTYLE" | "SONG";

export type Vibe = "HEAVENLY_HUSTLE" | "REALITY_CHECK" | "ROMANTIC_SOUL";

export type PenGame = "STORYTELLER" | "WORDPLAY" | "PUNCHLINE";

export type Awareness =
  | "ADOLESCENT_NOIR"
  | "MATURITY_ZEN"
  | "JUVENILE_HIGH"
  | "OUTWORLD_URGENCY";

export interface StitchRequest {
  prompt: string;
  mode: Awareness;
  bpm: number;
  penGame: PenGame;
  settings: {
    vibe: Vibe;
    penGame: PenGame;
    outsiderIntensity: number;
  };
}

export interface StitchResponse {
  text: string;
  raw?: unknown;
  error?: string;
}

export const VIBE_LABELS: Record<Vibe, string> = {
  HEAVENLY_HUSTLE: "Heavenly Hustle",
  REALITY_CHECK: "Reality Check",
  ROMANTIC_SOUL: "Romantic Soul",
};

export const PEN_LABELS: Record<PenGame, string> = {
  STORYTELLER: "Storyteller",
  WORDPLAY: "Wordplay",
  PUNCHLINE: "Punchline",
};
