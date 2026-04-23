"use client";

import { InputForge } from "./InputForge";
import { StitchButton } from "./StitchButton";
import { OutputDisplay } from "./OutputDisplay";

export function EngineLayout() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pb-10 pt-28">
      <div className="grid min-h-[70vh] grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <InputForge />
        <div className="flex w-full md:w-[220px]">
          <StitchButton />
        </div>
        <OutputDisplay />
      </div>
    </div>
  );
}
