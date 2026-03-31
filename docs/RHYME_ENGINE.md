# RHYME ENGINE // TECHNICAL DETECTION

## 1. Detection Logic
The engine uses Phonetic Syllable Mapping (PSM) to identify rhyme points.

### Syllable Splitting
- Words are split based on vowel sounds (approximate: `AEIOUY`).
- Example: "Mountain" → `Moun-tain`.

### Grouping Logic
1. **End-Rhyme Group:** Matches the last 3-5 syllables of consecutive lines.
2. **Internal Chain Group:** Matches recurring vowel sounds within a single line or across a couplet.
3. **Consonant Matching:** Prioritizes slant rhymes (e.g., "Power" and "Tower" is 100%, "Power" and "Valour" is 70%).

## 2. Highlighting System
The UI uses CSS classes to color-code rhymes for the visual interface.

- **Class: `rhyme-end`** → Color: `#FFFFFF` (Bold/White on Black). Used for primary multisyllabics.
- **Class: `rhyme-internal`** → Color: `#AAAAAA` (Light Gray). Used for internal chains.
- **Class: `rhyme-slant`** → Style: `underline`. Used for partial/imperfect rhymes.

**Toggle Logic:**
- [SHOW RHYMES]: Adds the CSS classes to the `[[syllable]]` markers.
- [HIDE RHYMES]: Removes classes/markers for a "clean" read.

## 3. Highlighting Workflow
- AI outputs bars with `[[ ]]` markers.
- Engine scans for identical strings inside `[[ ]]`.
- Engine assigns colors based on position (End vs. Internal).
- UI renders the visual map.
