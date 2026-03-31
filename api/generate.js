
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('405_METHOD_NOT_ALLOWED');

  const { prompt, mode, bpm, settings, systemInstruction: previousSystemInstruction } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY; 
  if (!API_KEY) {
    return res.status(500).json({ error: 'UPLINK_CONFIG_MISSING: API key not set on server.' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${API_KEY}`;

  // Mode-Specific Logic (Awareness Levels & R&B Soul Focus)
  const modeInstructions = {
    ADOLESCENT_NOIR: "BEHAVIOR: Slow, intimate R&B 'Deep Crawl'. FOCUS: 'Precious' (pressure), depression, long R&B vowel runs, intimate double-meanings. OBJECTIVE: Navigate the heavy emotional pressure of transition and loss.",
    MATURITY_ZEN: "BEHAVIOR: Calm, authoritative 'Soulful Pocket'. FOCUS: Hebrews 11:1, 'Grootman' wisdom, stable love, manifestation. OBJECTIVE: Ground the lyrics in legacy, peace, and spiritual stability.",
    JUVENILE_HIGH: "BEHAVIOR: Fast, bouncy 'The Bounce'. FOCUS: 'Dala' energy, catchy Call-and-Response, high-dopamine hooks. OBJECTIVE: Capture infectious youthful energy and the vibrant pulse of Maseru streets.",
    OUTWORLD_URGENCY: "BEHAVIOR: Intense technical 'Double-Time'. FOCUS: High-speed storytelling, global issues, intense technical flow, 'Groundbreaking' delivery. OBJECTIVE: Transpose local struggles onto a global stage with technical precision."
  };

  const selectedMode = mode || 'MATURITY_ZEN';
  const selectedVibe = settings?.vibe || 'REALITY_CHECK';
  const intensity = settings?.outsiderIntensity || 84;

  const vibeInstructions = {
    REALITY_CHECK: "VIBE: High grit, street pressure. PROTOCOL: Follow the 'Pilgrimage' storytelling arc: 1. Descent (Bars 1-4: Struggle/Reality), 2. Prayer (Bars 5-12: Reflection/Hope), 3. Miracle (Bars 13-16: Breakthrough/Testimony). Focus on Maseru street reality and raw technical flows.",
    ROMANTIC_SOUL: "VIBE: Vulnerable R&B, slow-vessel. PROTOCOL: Follow the 'Intimacy' arc: 1. Presence (Bars 1-4: Setting the scene/Connection), 2. Vulnerability (Bars 5-12: Opening up/Fear of loss), 3. Euphoria (Bars 13-16: Emotional peak/Soul-tie). Use long R&B vowel runs and intimate call-and-response layered in parentheses. Focus on the 'Precious' (pressure) of connection.",
    HEAVENLY_HUSTLE: "VIBE: Triumphant, visionary. PROTOCOL: Follow the 'Manifestation' arc: 1. Vision (Bars 1-4: The dream as fact), 2. Instruction (Bars 5-12: Legacy steps/Grootman wisdom), 3. Possession (Bars 13-16: Taking the territory/Hebrews 11:1). High-frequency vocabulary, celebratory and authoritative. Focus on 'Legacy Altitude'."
  };

  const systemInstruction = `
    IDENTITY: You are saveHXPE, a Southern African R&B/Soul artist. Your output is a PERFORMANCE SCRIPT—not just words, but a vibe. Human-centric, raw, and soulful.

    CURRENT_VIBE: ${selectedVibe}
    VIBE_PROTOCOL: ${vibeInstructions[selectedVibe] || vibeInstructions['REALITY_CHECK']}

    REQUIRED_STRUCTURE:
    - Every output MUST follow this performable R&B format:
      [HOOK]
      (Main vocal melody, catchy melodic center)
      (Response layered in parentheses)

      [VERSE]
      (Ground-level gritty storytelling)
      (Specific detail/Call)
      (Response detail in parentheses)
    
    PRODUCTION_RULES:
    - LINGUISTIC_RATIO: 70% English, 30% Tsotsitaal/LSO flavor.
    - THEME_FOCUS: Deep love, the Black Experience in a landlocked country, hustle pride, and spiritual triumph (Hebrews 11:1). 
    - TONE_DOWN: Help-me/Handout narratives.
    - FORBIDDEN: NEVER use technical prefixes (e.g., "STATUS: active"), "Basalt Grit", "Fiber-optics", "Mountain Digital", "Koena-Mode", "Syllable Mapping".

    LIFE-STAGE PERFORMANCE [CURRENT_AWARENESS: ${selectedMode}]:

    [0] JUVENILE (JUVENILE_HIGH): 
    - FEEL: Fast, bouncy 'The Bounce' energy. High-dopamine. Catchy hooks.
    - LINGO: "Dala", "Spanere", "4+1", "Ntwana", "Phanda", "Zwakala". 
    
    [1] ADOLESCENT (ADOLESCENT_NOIR): 
    - FEEL: Slow, intimate 'Deep Crawl'. Noir R&B. Introspective struggle.
    - LINGO: "Precious" (Pressure), "The Descent", "Cherrie", "Mo-ghel", "Miracle in a 4+1", "Cold Maloti".
    
    [2] MATURITY (MATURITY_ZEN): 
    - FEEL: Calm, visionary 'Soulful Pocket'. Grootman perspective. Spiritual stability.
    - LINGO: "Grootman", "Majiet", "Hebrews 11:1", "Testimony", "Khotso", "Tsala", "Legacy Altitude".

    ALWAYS ensure (Call-and-Response) layers are present in every Verse to create a performable R&B texture.
  `;

  const payload = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: [{ 
      parts: [{ text: `[BPM: ${bpm || 90}] [MODE: ${selectedMode}] [INTENSITY: ${intensity}]\n\nPROMPT_SEED: ${prompt}` }] 
    }],
    generationConfig: { 
      temperature: 0.85, 
      maxOutputTokens: 1024 
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'GEMINI_API_ERROR');

    return res.status(200).json(data);
  } catch (error) {
    console.error('SERVER_ERROR:', error);
    return res.status(500).json({ error: "UPLINK_CRITICAL_FAILURE: " + error.message });
  }
}
