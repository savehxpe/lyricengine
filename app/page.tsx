import { ClientShell } from "@/components/ClientShell";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <ClientShell />

      <footer className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 font-mono text-[10px] uppercase tracking-brutal text-white/30">
        Maseru Noir · saveHXPE
      </footer>
    </main>
  );
}
