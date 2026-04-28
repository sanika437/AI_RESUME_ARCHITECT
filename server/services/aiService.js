require("dotenv").config();

// ✅ Using Groq API — FREE, NO credit card required
// Model: llama-3.3-70b-versatile (Llama 3.3 70B by Meta, runs on Groq)
// Get free key at: https://console.groq.com → Sign Up → API Keys
// Free limits: ~14,400 req/day — very generous!

const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

if (!process.env.GROQ_API_KEY) {
  console.warn("⚠️  Missing GROQ_API_KEY in .env — get free key at https://console.groq.com");
}

// ─────────────────────────────────────────────
// Core: Standard Groq call (OpenAI-compatible)
// ─────────────────────────────────────────────
async function callAI(prompt, maxTokens = 2048) {
  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: maxTokens,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();

  if (data.error) {
    const errMsg = data.error?.message || JSON.stringify(data.error);
    console.error("Groq API error:", errMsg);
    throw new Error(`Groq API error: ${errMsg}`);
  }

  if (!data.choices || !data.choices[0]) {
    throw new Error("Empty response from Groq API");
  }

  return data.choices[0].message.content || "";
}

// ─────────────────────────────────────────────
// SSE Streaming: Groq stream → Express res
// ─────────────────────────────────────────────
async function streamAI(prompt, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: 1500,
      temperature: 0.4,
      stream: true,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  for await (const chunk of response.body) {
    const text = new TextDecoder().decode(chunk);
    const lines = text.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ") && !line.includes("[DONE]")) {
        try {
          const json = JSON.parse(line.slice(6));
          const part = json?.choices?.[0]?.delta?.content;
          if (part) {
            res.write(`data: ${JSON.stringify({ text: part })}\n\n`);
          }
        } catch (_) {}
      }
    }
  }

  res.write("data: [DONE]\n\n");
  res.end();
}

// ─────────────────────────────────────────────
// Helper: strip JSON from markdown code fences
// ─────────────────────────────────────────────
function extractJSON(text) {
  let clean = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const start = clean.indexOf("{");
  const end = clean.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in response");
  return JSON.parse(clean.substring(start, end + 1));
}

// ─────────────────────────────────────────────
// 1. JD Analysis Agent
// ─────────────────────────────────────────────
async function analyzeJD(jdText) {
  try {
    const text = await callAI(
      `You are a JD Analysis Agent. Extract and rank critical keywords from this Job Description.

Return ONLY a valid JSON object, no markdown, no extra text:
{
  "requiredSkills": ["skill1", "skill2"],
  "preferredSkills": ["skill3", "skill4"],
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "role": "extracted job title",
  "experience": "experience level"
}

Job Description:
${jdText}`,
      800
    );
    return extractJSON(text);
  } catch (error) {
    console.error("analyzeJD error:", error.message);
    return { requiredSkills: [], preferredSkills: [], keywords: [], role: "", experience: "" };
  }
}

// ─────────────────────────────────────────────
// 2. Full Pipeline: Optimize Resume + ATS Score
// ─────────────────────────────────────────────
async function fullProcess(resumeText, jdText) {
  const prompt = `You are a professional Resume Optimizer and ATS Scoring expert.

Analyze the Job Description and rewrite the resume to maximize ATS score by including critical JD keywords.

Job Description:
${jdText}

Current Resume:
${resumeText}

Return ONLY a valid JSON object (no markdown, no code blocks, no extra text):
{
  "extractedSkills": ["skill1", "skill2", "skill3"],
  "optimizedResume": {
    "name": "candidate full name from resume",
    "email": "email from resume",
    "phone": "phone from resume",
    "location": "city/state from resume",
    "linkedin": "linkedin url if present, else empty string",
    "title": "optimized job title matching the JD role",
    "summary": "2-3 sentence ATS-optimized summary using JD keywords",
    "skills": ["jd_keyword1", "jd_keyword2", "skill3", "skill4", "skill5", "skill6"],
    "experience": [
      {
        "role": "Job Title",
        "company": "Company Name",
        "date": "Start - End",
        "bullets": [
          "Rewritten bullet using JD keyword, quantified if possible",
          "Another achievement matching JD requirements"
        ]
      }
    ],
    "education": [
      {
        "degree": "Degree Name",
        "college": "Institution Name",
        "year": "Year"
      }
    ],
    "projects": [
      {
        "name": "Project Name",
        "description": "Project description using JD keywords",
        "tech": ["tech1", "tech2"]
      }
    ]
  },
  "ats": {
    "score": 78,
    "matchedKeywords": ["keyword1", "keyword2"],
    "missingKeywords": ["missing1", "missing2"],
    "suggestions": [
      "Add quantified achievements",
      "Include missing keyword X",
      "Specific improvement suggestion"
    ]
  }
}

Rules:
- EXTRACT REAL INFO (name, email, phone) from the resume text provided
- Rewrite bullet points to sound authoritative and include JD keywords
- ATS score: realistic range 55-90
- If no work experience: return empty experience array []
- Return ONLY the JSON object, nothing else`;

  const text = await callAI(prompt, 3500);

  let clean = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const start = clean.indexOf("{");
  const end = clean.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON in response");
  clean = clean.substring(start, end + 1);

  return JSON.parse(clean);
}

// ─────────────────────────────────────────────
// 3. ATS Score Calculator
// ─────────────────────────────────────────────
async function calculateATS(resumeText, jdText) {
  try {
    const text = await callAI(
      `Analyze this resume against the job description. Return ONLY valid JSON, no other text:
{
  "score": 75,
  "matchedKeywords": ["kw1", "kw2"],
  "missingKeywords": ["m1", "m2"],
  "suggestions": ["s1", "s2", "s3"]
}

Resume:
${resumeText}

Job Description:
${jdText}`,
      600
    );
    return extractJSON(text);
  } catch {
    return { score: 60, matchedKeywords: [], missingKeywords: [], suggestions: ["Try again."] };
  }
}

// ─────────────────────────────────────────────
// 4. Cover Letter Generator (SSE streaming)
// ─────────────────────────────────────────────
async function generateCoverLetterStream(resumeText, jdText, res) {
  const prompt = `Write a professional, personalized cover letter.

Rules:
- Plain text only, no markdown, no asterisks
- No placeholders like [Company Name] — use actual candidate info from resume
- Start exactly with: Dear Hiring Manager,
- 3-4 paragraphs, specific to this candidate and job
- End with: Sincerely,\n[candidate's actual name]
- Do NOT fabricate achievements not in the resume

Resume:
${resumeText}

Job Description:
${jdText}`;

  await streamAI(prompt, res);
}

// ─────────────────────────────────────────────
// 5. Cover Letter (non-streaming fallback)
// ─────────────────────────────────────────────
async function generateCoverLetter(resumeText, jdText) {
  try {
    const text = await callAI(
      `Write a professional cover letter. Plain text only. No placeholders. No markdown.
Start: Dear Hiring Manager,
End: Sincerely,\n[name from resume]

Resume:
${resumeText}

Job Description:
${jdText}`,
      1000
    );
    return text.replace(/```/g, "").replace(/\*\*/g, "").trim();
  } catch (error) {
    console.error("coverLetter error:", error.message);
    return "Unable to generate cover letter. Please try again.";
  }
}

// ─────────────────────────────────────────────
// 6. Bullet Point Rewriter
// ─────────────────────────────────────────────
async function rewriteBullet(bullet, keyword, res) {
  const prompt = `Rewrite this resume bullet point to sound authoritative and include the keyword "${keyword}". 
Return only the rewritten bullet, no explanation, no formatting.

Original: ${bullet}`;

  if (res) {
    await streamAI(prompt, res);
  } else {
    return await callAI(prompt, 200);
  }
}

module.exports = {
  analyzeJD,
  fullProcess,
  calculateATS,
  generateCoverLetter,
  generateCoverLetterStream,
  rewriteBullet,
  streamAI,
  callAI,
};
