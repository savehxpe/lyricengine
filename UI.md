# UI // AESTHETIC & INTERACTION

## 1. Visual Identity
- **Palette:** Black (`#000000`) and White (`#FFFFFF`) only. No grays except for subtle internal rhymes.
- **Typography:** Monospace only. High readability, brutalist feel.
- **Layout:**
    - **Split-Screen:** 
        - Left: Raw Input / Controls. 
        - Right: Engine Output / Rhyme Map.
    - **Full-Screen Focus:** Toggle for distraction-free writing.

## 2. Component Design
- **Buttons:** Sharp edges (0px border-radius). Inverted colors on hover (Black to White).
- **Sliders:** Minimalist horizontal lines for intensity controls.
- **Tabs:** Fast navigation between [LIBRARY], [HISTORY], [SETTINGS], and [RMD].

## 3. Interaction Behavior
- **Click Events:** 
    - Click any word in Output to search for synonyms or alternate rhymes.
    - Click [TRANSFORM] triggers a loading state: "PROCESSING..." (Fast fade-in).
- **Toggle States:**
    - Active buttons stay inverted.
    - Sidebar collapses with a quick slide animation.
- **Transitions:** Extremely fast (100ms) or instant. Zero bloat.

## 4. Navigation Flow
1. **Default:** Library (Split-view).
2. **Action:** Click [HISTORY] → Overlay slides from the right.
3. **Action:** Click [SETTINGS] → Control panel replaces Sidebar.
4. **Action:** Click [RMD] → Full-screen data view.
