"use client";

import { motion } from "framer-motion";

/**
 * Static aurora-gradient backdrop used when WebGL isn't available
 * (sandboxed browsers, hardware accel off, GPU driver issues).
 * Matches the Maseru Noir palette without R3F.
 */
export function Background2DFallback() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-obsidian-950"
    >
      {/* radial gradient auras */}
      <motion.div
        className="absolute -left-1/4 top-1/4 h-[60vmin] w-[60vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 65%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/2 h-[55vmin] w-[55vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,121,249,0.18) 0%, transparent 65%)",
        }}
        animate={{ x: [0, -60, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 left-1/3 h-[50vmin] w-[50vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 30, -40, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* diagonal scanline */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 45%, rgba(255,255,255,0.04) 50%, transparent 55%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-950/40 to-obsidian-950" />
    </div>
  );
}
