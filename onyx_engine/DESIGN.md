# Design System Document

## 1. Overview & Creative North Star: The Writing Weapon
This design system is built for the "Writing Weapon"—a high-performance professional rap lyric engine. It rejects the soft, rounded, and "social" aesthetics of modern web apps in favor of a clinical, industrial, and sharp-edged environment. 

**Creative North Star: "The Digital Blade"**
The interface should feel like a piece of precision hardware. We break the "template" look by using extreme contrast and intentional asymmetry. This is not a playground; it is a workshop. We achieve a premium feel through a total absence of decoration, relying on perfect typography, rigid 0px geometry, and a "brutalist editorial" layout that prioritizes the speed of thought.

---

## 2. Colors: High-Velocity Contrast
While we utilize a Material-based token structure, the visual execution is strictly monochrome. The palette is a binary dialogue between light and dark.

*   **Primary (#FFFFFF):** Used for primary actions and high-intensity typography.
*   **Surface (#131313):** The void. The canvas where all writing occurs.
*   **Neutral Roles:** `on-surface-variant` (#C6C6C6) is reserved for technical metadata or secondary "ghost" text that shouldn't distract from the main verse.

### The "No-Line" Rule
Standard 1px borders are prohibited for sectioning. We define boundaries through **hard tonal shifts**.
*   Instead of drawing a line between the sidebar and the editor, the sidebar uses `surface-container-low` (#1B1B1B) while the editor uses `surface` (#131313). 
*   **Exception:** When a hard "cutting" edge is required for a CTA, use a solid `primary` (#FFFFFF) fill against the dark background.

### Surface Hierarchy & Nesting
Treat the UI as a series of interlocking steel plates. 
1.  **Level 0 (Base):** `surface` (#131313).
2.  **Level 1 (Panels):** `surface-container-low` (#1B1B1B) for navigation or lyric history.
3.  **Level 2 (Active Focus):** `surface-container-high` (#2A2A2A) for active rhyme-suggestion modules or pop-over menus.

### The "Anti-Glass" Rule
Contrary to "Modern" trends, there is no glassmorphism, no blur, and no transparency. Elements are either present and solid or invisible. Every pixel must feel deliberate and opaque.

---

## 3. Typography: Technical Authority
We use a dual-font approach to balance editorial impact with technical precision.

*   **Display & Headlines (Space Grotesk):** This is our "Editorial" voice. Its wide apertures and geometric construction feel modern and aggressive. Use `display-lg` for logo marks and `headline-md` for track titles.
*   **Body & Input (Inter):** This is our "Utility" voice. Inter provides the legibility required for high-speed lyric entry. 
    *   **The Engine Feel:** For lyric input areas, utilize `body-lg` with increased letter-spacing (-0.01em to -0.02em) to create a dense, "typewritten" appearance.
*   **Labels (Inter):** All `label-sm` and `label-md` elements should be in **ALL CAPS** with +0.05em tracking to evoke technical blueprints and hardware labels.

---

## 4. Elevation & Depth: Tonal Stacking
In this system, "Up" does not mean "Shadow." "Up" means "Lighter."

*   **The Layering Principle:** To lift a component, transition from `surface-container-lowest` to `surface-container-highest`.
*   **Zero Shadow Policy:** Traditional shadows are strictly forbidden. To create the illusion of a floating menu, use a 1px solid `primary` (#FFFFFF) border—this is the only case where a border is allowed, functioning as a "stroke" of light.
*   **Ghost Border Fallback:** If a clear distinction is needed for accessibility in inputs, use `outline-variant` (#474747). Never use 100% white for borders unless it is a primary interactive state.

---

## 5. Components: Precision Primitives

### Buttons (The "Actuators")
*   **Primary:** Solid `primary` (#FFFFFF) background, `on-primary` (#1A1C1C) text. 0px border-radius.
*   **Secondary:** Solid `surface-container-highest` (#353535) background, `on-surface` (#E2E2E2) text.
*   **Interaction:** On hover, Primary buttons invert (Black fill, White text). This high-contrast flicker provides instant tactile feedback.

### Input Fields (The "Chamber")
*   **Lyric Area:** No background, no borders. Text sits on the `surface` (#131313). Focus is indicated by a 2px solid `primary` (#FFFFFF) left-border "accent" that follows the cursor's line.
*   **Technical Inputs:** Background `surface-container-low` (#1B1B1B), 0px radius, `title-sm` typography.

### Chips & Metadata
*   Used for "Rhyme Schemes" or "BPM Tags." These are strictly rectangular. Use `surface-variant` (#353535) with `label-md` text.

### Cards & Lists
*   **Divider Forbiddance:** Never use horizontal lines. Use the **Spacing Scale `spacing-4` (0.9rem)** to create a rhythmic gap between list items. The "cut" is made by the eye, not the line.

### Engine-Specific Components
*   **The Rhyme Rail:** A vertical strip on the right using `surface-container-lowest` (#0E0E0E). Suggestions appear as `primary` text that glows/bolder on hover.
*   **The Syllable Counter:** Small, fixed-position `label-sm` text in `outline` (#919191) at the end of every line.

---

## 6. Do's and Don'ts

### Do:
*   Use `0px` border radius on **everything**.
*   Align all text to a strict vertical grid.
*   Use white space as a structural element to separate the "Rhyme Engine" from the "Lyric Editor."
*   Treat the logo as a technical stamp rather than a brand mark.

### Don't:
*   **No Gradients:** Color must be flat and unapologetic.
*   **No Rounded Corners:** Anything resembling a circle or a curve (outside of typography) is a violation.
*   **No Soft Greys:** If you need a grey, use a token from the `surface-container` tiers. Avoid "muddy" mid-tones.
*   **No Social Icons:** This is a weapon for creation, not a platform for sharing. Maintain the "engine" isolation.

### Accessibility Note:
Because we are working in high-contrast B&W, ensure that `on-surface-variant` text meets a minimum 4.5:1 contrast ratio against the background. If a "dimmed" state is too dark, move one tier up in the Surface Hierarchy.