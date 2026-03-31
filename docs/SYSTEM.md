# SYSTEM // LOGIC & FLOW

## 1. System Architecture
The saveHXPE // LYRIC ENGINE operates as a modular transformation pipeline.

**Input** (Raw Lyrics/Seeds) → **Identity Injection** (IDENTITY.md) → **Processing** (PROMPTS.md + RHYME_ENGINE.md) → **Output** (Refined Performance Bars)

## 2. Processing Pipeline
1. **Extraction:** Strip input of non-essential filler.
2. **Analysis:** Scan for existing rhyme patterns using `RHYME_ENGINE.md`.
3. **Mapping:** Apply `PROMPTS.md` logic to enforce multisyllabics and internal chains.
4. **Encoding:** Infuse "Outsider" tone and Lesotho-specific localization levels (from `Settings`).
5. **Decoration:** Apply color-coded highlighting from `RHYME_ENGINE.md` for UI display.

## 3. Transformation Rules
- **Compression:** If a line is too long to fit the cadence, shorten without losing the rhyme.
- **Expansion:** If a line lacks internal weight, add a mid-point rhyme.
- **Consistency:** Maintain the "A-B-A-B" or "A-A-B-B" structure unless "Freestyle" is triggered.
- **Intensity Toggles:** Respect the Intensity Sliders from `Settings` for every generation.
