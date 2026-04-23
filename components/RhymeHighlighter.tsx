"use client";

import { Fragment, useMemo } from "react";

const PALETTE = [
  "text-neon-cyan",
  "text-neon-fuchsia",
  "text-neon-amber",
  "text-neon-emerald",
  "text-neon-rose",
  "text-neon-violet",
  "text-neon-lime",
] as const;

const TAG_RE = /<r([1-5])>([\s\S]*?)<\/r\1>/g;

type Segment =
  | { kind: "plain"; text: string }
  | { kind: "rhyme"; id: number; text: string };

function parseTagged(input: string): Segment[] {
  const segs: Segment[] = [];
  let last = 0;
  const re = new RegExp(TAG_RE.source, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(input)) !== null) {
    if (m.index > last) {
      segs.push({ kind: "plain", text: input.slice(last, m.index) });
    }
    segs.push({ kind: "rhyme", id: Number(m[1]), text: m[2] });
    last = m.index + m[0].length;
  }
  if (last < input.length) {
    segs.push({ kind: "plain", text: input.slice(last) });
  }
  return segs;
}

function stripTags(input: string): string {
  return input.replace(TAG_RE, "$2");
}

function hasTags(input: string): boolean {
  return new RegExp(TAG_RE.source).test(input);
}

function rhymeKey(raw: string): string | null {
  const clean = raw.toLowerCase().replace(/[^a-z]/g, "");
  if (clean.length < 2) return null;
  const m = clean.match(/([aeiouy]+)([^aeiouy]*)$/);
  if (!m) return null;
  const suffix = `${m[1]}${m[2]}`;
  return suffix.length >= 2 ? suffix : null;
}

function computeFallbackMap(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  const words = text.split(/\s+/);
  for (const w of words) {
    const key = rhymeKey(w);
    if (!key) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const multi = [...counts.entries()]
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, PALETTE.length);
  const map = new Map<string, number>();
  multi.forEach(([k], i) => map.set(k, i));
  return map;
}

export function RhymeHighlighter({
  text,
  active,
}: {
  text: string;
  active: boolean;
}) {
  const content = useMemo(() => {
    if (!active) {
      return <>{stripTags(text)}</>;
    }
    if (hasTags(text)) {
      return renderTagged(text);
    }
    return renderFallback(text);
  }, [text, active]);

  return content;
}

function renderTagged(text: string) {
  const segs = parseTagged(text);
  return (
    <>
      {segs.map((s, i) =>
        s.kind === "plain" ? (
          <Fragment key={i}>{s.text}</Fragment>
        ) : (
          <span
            key={i}
            className={`${PALETTE[(s.id - 1) % PALETTE.length]} font-semibold`}
            style={{
              textShadow: "0 0 8px currentColor",
            }}
            data-rhyme-id={s.id}
          >
            {s.text}
          </span>
        )
      )}
    </>
  );
}

function renderFallback(text: string) {
  const map = computeFallbackMap(text);
  if (map.size === 0) return <>{text}</>;

  // tokenize preserving whitespace + punctuation
  const tokens = text.split(/(\s+)/);
  return (
    <>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return <Fragment key={i}>{tok}</Fragment>;
        const leading = tok.match(/^[^a-zA-Z']+/)?.[0] ?? "";
        const trailing = tok.match(/[^a-zA-Z']+$/)?.[0] ?? "";
        const core = tok.slice(leading.length, tok.length - trailing.length);
        const key = rhymeKey(core);
        const bucket = key ? map.get(key) : undefined;
        if (bucket === undefined) return <Fragment key={i}>{tok}</Fragment>;
        return (
          <Fragment key={i}>
            {leading}
            <span
              className={`${PALETTE[bucket % PALETTE.length]} font-semibold`}
              style={{ textShadow: "0 0 8px currentColor" }}
              data-rhyme-bucket={bucket}
            >
              {core}
            </span>
            {trailing}
          </Fragment>
        );
      })}
    </>
  );
}
