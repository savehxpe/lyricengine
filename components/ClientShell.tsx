"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ControlPanel } from "./ControlPanel";
import { EngineLayout } from "./EngineLayout";
import { Background2DFallback } from "./Background2DFallback";
import { ErrorBoundary } from "./ErrorBoundary";
import { isWebGLAvailable } from "@/lib/webgl";

const Background3D = dynamic(() => import("./Background3D"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-obsidian-950" aria-hidden />
  ),
});

export function ClientShell() {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  return (
    <>
      {webgl === null ? (
        <div className="fixed inset-0 -z-10 bg-obsidian-950" aria-hidden />
      ) : webgl ? (
        <ErrorBoundary fallback={<Background2DFallback />}>
          <Background3D />
        </ErrorBoundary>
      ) : (
        <Background2DFallback />
      )}
      <div className="pointer-events-none fixed inset-0 -z-[1] grid-fade" />
      <ControlPanel />
      <EngineLayout />
    </>
  );
}
