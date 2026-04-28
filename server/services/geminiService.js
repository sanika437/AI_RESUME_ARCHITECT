require("dotenv").config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in .env file");
}

// Use gemini-2.0-flash (gemini-1.5-flash is deprecated)
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

async function callGemini(prompt, maxTokens = 2048) {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: maxTokens },
    }),
  });
  const data = await response.json();
  if (!data.candidates) {
    console.error("Gemini API error:", JSON.stringify(data));
    throw new Error(`Gemini API error: ${data.error?.message || "Unknown error"}`);
  }
  return data.candidates[0].content.parts[0].text || "";
}

// 🔹 Analyze JD
async function analyzeJD(jdText) {
  try {
    const text = await callGemini(`Extract required skills as a JSON array. Return ONLY the JSON array, no other text.\n\nJob Description:\n${jdText}`);
    const clean = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    return JSON.parse(clean);
  } catch (error) {
    console.error("analyzeJD error:", error.message);
    return [];
  }
}

// 🔹 Optimize Resume
async function optimizeResume(resumeText, jdText, skills = []) {
  try {
    const skillsText = Array.isArray(skills) ? skills.join(", ") : skills;
    const text = await callGemini(`Rewrite and optimize the following resume for ATS.

Required Skills: ${skillsText}

Rules:
- Plain text only, no markdown
- ATS-friendly structure
- Sections: SUMMARY, SKILLS, EXPERIENCE/PROJECTS, EDUCATION

Resume:
${resumeText}

Job Description:
${jdText}`);
    return text.replace(/```json|```/g, "").replace(/\*\*/g, "").trim();
  } catch (error) {
    console.error("optimizeResume error:", error.message);
    return resumeText;
  }
}

// 🔹 ATS Score
async function calculateATS(resumeText, jdText) {
  try {
    const text = await callGemini(`Analyze the resume against the job description and return ATS score as JSON only.

Format (return ONLY this JSON, no other text):
{
  "score": number between 50-90,
  "matchedKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["missing1", "missing2"],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
}

Resume:
${resumeText}

Job Description:
${jdText}`);
    const clean = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    const jsonStart = clean.indexOf("{");
    const jsonEnd = clean.lastIndexOf("}");
    return JSON.parse(clean.substring(jsonStart, jsonEnd + 1));
  } catch (error) {
    console.error("calculateATS error:", error.message);
    return { score: 0, matchedKeywords: [], missingKeywords: [], suggestions: ["ATS analysis failed. Please try again."] };
  }
}

// 🔹 Generate Cover Letter
async function generateCoverLetter(resumeText, jdText) {
  try {
    const text = await callGemini(`Write a professional cover letter based on the resume and job description.

Rules:
- Plain text only, no markdown, no placeholders like [Company Name]
- Start with: Dear Hiring Manager,
- 3-4 paragraphs
- End with: Sincerely,\n[candidate name from resume]
- Be specific about skills from the resume

Resume:
${resumeText}

Job Description:
${jdText}`);
    return text.replace(/```json|```/g, "").replace(/\*\*/g, "").trim();
  } catch (error) {
    console.error("generateCoverLetter error:", error.message);
    return "Unable to generate cover letter. Please try again.";
  }
}

module.exports = { analyzeJD, optimizeResume, calculateATS, generateCoverLetter };
