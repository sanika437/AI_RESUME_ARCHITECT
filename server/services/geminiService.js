require("dotenv").config();

// 🔹 Check API Key
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

// 🔹 Analyze JD
async function analyzeJD(jdText) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Extract only skills as a JSON array. No explanation.

Job Description:
${jdText}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!data.candidates) {
      console.error("analyzeJD error:", data);
      return [];
    }

    let text = data.candidates[0].content.parts[0].text || "";
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("analyzeJD crash:", error);
    return [];
  }
}

// 🔹 Optimize Resume (FIXED WITH FALLBACK)
async function optimizeResume(resumeText, jdText, skills = []) {
  try {
    const skillsText = Array.isArray(skills) ? skills.join(", ") : skills;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Rewrite and optimize the following resume.

Required Skills:
${skillsText}

Rules:
- Plain text only
- No markdown or placeholders
- ATS-friendly

Structure:

SUMMARY
- 2–3 lines

SKILLS
- Use "-" for each skill

PROJECTS / EXPERIENCE
- 2–4 bullet points

Resume:
${resumeText}

Job Description:
${jdText}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // ✅ IMPORTANT FIX
    if (!data.candidates) {
      console.error("optimizeResume error:", data);
      return resumeText; // fallback instead of breaking pipeline
    }

    let text = data.candidates[0].content.parts[0].text || "";

    return text
      .replace(/```json|```/g, "")
      .replace(/\*\*/g, "")
      .replace(/\[.*?\]/g, "")
      .trim();
  } catch (error) {
    console.error("optimizeResume crash:", error);
    return resumeText; // fallback
  }
}

// 🔹 ATS Score (STRICT + SAFE)
async function calculateATS(resumeText, jdText) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze the resume against the job description and return ATS score.

Rules:
- Return ONLY JSON
- Be STRICT and realistic
- Maximum score should rarely exceed 90
- ALWAYS include at least 1 suggestion or missing keyword
- Consider:
  - missing skills
  - weak descriptions
  - lack of quantification

Format:
{
  "score": number,
  "matchedKeywords": [],
  "missingKeywords": [],
  "suggestions": []
}

Resume:
${resumeText}

Job Description:
${jdText}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!data.candidates) {
      console.error("ATS error:", data);
      return {
        score: 0,
        matchedKeywords: [],
        missingKeywords: [],
        suggestions: ["ATS analysis failed. Please try again."],
      };
    }

    let text = data.candidates[0].content.parts[0].text || "";
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("ATS crash:", error);
    return {
      score: 0,
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: ["ATS failed due to error."],
    };
  }
}

// 🔹 Cover Letter
async function generateCoverLetter(resumeText, jdText) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Write a professional cover letter.

- Plain text only
- No placeholders
- Start with: Dear Hiring Manager,
- End with:
Sincerely,

Resume:
${resumeText}

Job Description:
${jdText}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!data.candidates) {
      console.error("Cover letter error:", data);
      return "Unable to generate cover letter. Please try again.";
    }

    let text = data.candidates[0].content.parts[0].text || "";

    return text
      .replace(/```json|```/g, "")
      .replace(/\*\*/g, "")
      .replace(/\[.*?\]/g, "")
      .trim();
  } catch (error) {
    console.error("Cover crash:", error);
    return "Cover letter generation failed.";
  }
}

module.exports = {
  analyzeJD,
  optimizeResume,
  calculateATS,
  generateCoverLetter,
};