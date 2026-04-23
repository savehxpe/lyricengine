"use client";

import dynamic from "next/dynamic";
import { ControlPanel } from "./ControlPanel";
import { EngineLayout } from "./EngineLayout";

const Background3D = dynamic(() => import("./Background3D"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-obsidian-950" aria-hidden />
  ),
});

export function ClientShell() {
  return (
    <>
      <Background3D />
      <div className="pointer-events-none fixed inset-0 -z-[1] grid-fade" />
      <ControlPanel />
      <EngineLayout />
    </>
  );
}
