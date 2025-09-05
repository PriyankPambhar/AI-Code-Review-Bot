export async function fetchAnalysis(code) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing API key. Please set REACT_APP_GEMINI_API_KEY in your .env file.");
  }
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
  const systemPrompt = `You are an AI-powered Code Review Bot. Analyze the following code and respond ONLY with valid JSON in this exact structure:
{
  "summary": "Short overall assessment in 2–3 sentences.",
  "strengths": ["..."],
  "issues": ["..."],
  "suggestions": ["..."],
  "scores": {
    "security": 0-100,
    "structure_readability": 0-100,
    "space_performance_optimization": 0-100
  }
}
Rules:
- No text outside JSON.
- Scores are integers (0-100).
- Keep lists concise (max 6 items each).`;

  const userQuery = `${systemPrompt}\n\nHere is the code to review:\n${code}`;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: userQuery }] }] }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Gemini API error ${res.status}: ${txt || res.statusText}`);
  }

  const data = await res.json();
  let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  if (!text) throw new Error("No content returned by Gemini.");

  text = text.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/, "");
  }
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last !== -1) text = text.slice(first, last+1);

  const parsed = JSON.parse(text);

  const s = parsed.scores || {};
  const coerce = (v) => {
    const n = Number.parseInt(v, 10);
    if (!Number.isFinite(n)) return 0;
    return Math.min(100, Math.max(0, Math.round(n)));
  };
  parsed.scores = {
    security: coerce(s.security),
    structure_readability: coerce(s.structure_readability),
    space_performance_optimization: coerce(s.space_performance_optimization),
  };
  parsed.strengths = Array.isArray(parsed.strengths) ? parsed.strengths : [];
  parsed.issues = Array.isArray(parsed.issues) ? parsed.issues : [];
  parsed.suggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];

  return parsed;
}
