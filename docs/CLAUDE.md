# CLAUDE.md — saveHXPE // OUTWORLD GLOBAL

## Project Overview

An AI-powered R&B/Soul lyric generation engine grounded in Lesotho/Southern African culture. Takes raw lyric input and transforms it using the saveHXPE persona via four modes: **TRANSFORM**, **REMIX**, **FREESTYLE**, **REFINE**.

## Tech Stack

- **Frontend:** HTML5 + vanilla JavaScript (no framework), Tailwind CSS v3.4.1
- **Backend:** Vercel serverless functions (`/api/generate.js`) — Node.js
- **LLM:** Google Gemini Flash (via `@google/generative-ai`)
- **Fonts:** Space Grotesk (sans-serif), Fragment Mono (monospace)
- **Build tools:** PostCSS + Autoprefixer + `@tailwindcss/forms`

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Single-page app — brutalist split-pane UI (input left, output right) |
| `api/generate.js` | Vercel serverless handler — Gemini API calls with mode/vibe injection |
| `PROMPTS.md` | Four core generation prompts with Pilgrimage arc rules |
| `EMOTIONAL_STORYTELLING_PROTOCOL.md` | 3-phase arc: Descent → Prayer → Miracle |
| `LIFE_STAGE_MODAL_ARCHITECTURE.md` | Three modes: Juvenile_High, Adolescent_Noir, Maturity_Zen |
| `LINGO_DICTIONARY.md` | BPM-sensitive vocabulary per life stage |
| `SKILLS_CREATIVE_WRITING.md` | Output format rules, 70/30 English/Tsotsitaal ratio, forbidden terms |
| `TSOTSI_TAAL_SOUL_GLOSSARY.md` | 44+ Tsotsitaal terms with usage examples by life stage |
| `RHYME_ENGINE.md` | Phonetic syllable mapping (PSM) for rhyme detection/highlighting |

## Architecture Decisions

- **Identity injection:** All Gemini calls include saveHXPE persona as system prompt
- **Mode switching:** Juvenile_High / Adolescent_Noir / Maturity_Zen adjusts vocab density, vibe, emotional intensity
- **BPM sensitivity:** 72–88 BPM → Adolescent_Noir; 89–110 → Maturity_Zen; 111–180 → Juvenile_High
- **Rhyme notation:** AI output uses `[[ ]]` markers; CSS highlights end-rhymes (white), internal chains (gray), slants (underline)
- **Gemini config:** temperature=0.85, maxOutputTokens=1024
- **Error codes:** Custom diagnostic strings like `UPLINK_CONFIG_MISSING`, `GEMINI_API_ERROR`

## Coding Conventions

- Vanilla JS only — no React, Vue, or other frontend frameworks
- Tailwind utility classes for all styling; avoid writing custom CSS unless necessary
- Serverless functions live in `/api/` — keep them focused and stateless
- The saveHXPE voice is defined in the markdown docs — never hardcode persona details in JS; reference the prompt files
- Output language ratio: 70% English, 30% Tsotsitaal (see `SKILLS_CREATIVE_WRITING.md`)
- Forbidden in AI output: robotic/generic terminology — refer to `SKILLS_CREATIVE_WRITING.md` for the full list

## Environment

- API key for Gemini is managed via Vercel environment variables (`GEMINI_API_KEY`)
- Never commit API keys; `.gitignore` covers `.env` files
- Deployment: Vercel (production + preview environments)
