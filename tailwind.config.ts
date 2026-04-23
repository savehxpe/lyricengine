import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        display: [
          "var(--font-display)",
          "Space Grotesk",
          "Inter",
          "sans-serif",
        ],
      },
      colors: {
        obsidian: {
          950: "#05060a",
          900: "#0a0b10",
          800: "#11131a",
          700: "#1a1d26",
        },
        neon: {
          cyan: "#22d3ee",
          fuchsia: "#e879f9",
          amber: "#fbbf24",
          emerald: "#34d399",
          rose: "#fb7185",
          violet: "#a78bfa",
          lime: "#a3e635",
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(34,211,238,0.55), 0 0 60px rgba(34,211,238,0.25)",
        "glow-fuchsia": "0 0 24px rgba(232,121,249,0.55), 0 0 60px rgba(232,121,249,0.25)",
        "glow-white": "0 0 24px rgba(255,255,255,0.55), 0 0 60px rgba(255,255,255,0.25)",
      },
      dropShadow: {
        "glow-cyan": "0 0 20px rgba(34,211,238,0.6)",
        "glow-fuchsia": "0 0 20px rgba(232,121,249,0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
        flicker: "flicker 3.5s infinite",
      },
      keyframes: {
        flicker: {
          "0%, 18%, 22%, 25%, 53%, 57%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.55" },
        },
      },
      letterSpacing: {
        brutal: "0.22em",
      },
    },
  },
  plugins: [forms],
};

export default config;
