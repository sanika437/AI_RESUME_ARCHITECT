const {
  analyzeJD,
  fullProcess,
  calculateATS,
  generateCoverLetter,
  generateCoverLetterStream,
  rewriteBullet,
} = require("../services/aiService");

// ─── Analyze JD ───────────────────────────────
const analyzeJDController = async (req, res) => {
  try {
    const { jd } = req.body;
    if (!jd) return res.status(400).json({ success: false, error: "Job Description is required" });
    const result = await analyzeJD(jd);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── ATS Score ────────────────────────────────
const atsScoreController = async (req, res) => {
  try {
    const { resume, jd } = req.body;
    if (!resume || !jd) return res.status(400).json({ success: false, error: "Resume and JD required" });
    const result = await calculateATS(resume, jd);
    res.json({ success: true, data: { ats: result } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── Cover Letter (non-streaming) ─────────────
const coverLetterController = async (req, res) => {
  try {
    const { resume, jd } = req.body;
    if (!resume || !jd) return res.status(400).json({ success: false, error: "Resume and JD required" });
    const result = await generateCoverLetter(resume, jd);
    res.json({ success: true, data: { coverLetter: result } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── Cover Letter SSE Stream ──────────────────
// Project spec: SSE streaming for "typing effect"
const coverLetterStreamController = async (req, res) => {
  try {
    const { resume, jd } = req.body;
    if (!resume || !jd) {
      return res.status(400).json({ success: false, error: "Resume and JD required" });
    }
    await generateCoverLetterStream(resume, jd, res);
  } catch (error) {
    console.error("CL stream error:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

// ─── Rewrite Bullet (AI Magic Button) ─────────
const rewriteBulletController = async (req, res) => {
  try {
    const { bullet, keyword, stream } = req.body;
    if (!bullet) return res.status(400).json({ success: false, error: "Bullet text required" });

    if (stream) {
      await rewriteBullet(bullet, keyword || "", res);
    } else {
      const result = await rewriteBullet(bullet, keyword || "");
      res.json({ success: true, data: { rewritten: result } });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── Full Pipeline (Core endpoint) ────────────
const fullProcessController = async (req, res) => {
  try {
    const { resume, jd, generateCover = false } = req.body;

    if (!resume || !jd) {
      return res.status(400).json({ success: false, error: "Resume and JD required" });
    }

    console.log(`[Groq Llama3] Processing: resume=${resume.length} chars`);

    const result = await fullProcess(resume, jd);

    // Optional cover letter
    let coverLetter = null;
    if (generateCover) {
      const resumeSnippet = result.optimizedResume
        ? `${result.optimizedResume.name}\n${result.optimizedResume.summary}\nSkills: ${(result.optimizedResume.skills || []).join(", ")}`
        : resume.substring(0, 800);
      coverLetter = await generateCoverLetter(resumeSnippet, jd);
    }

    res.json({
      success: true,
      data: {
        extractedSkills: result.extractedSkills || [],
        optimizedResume: result.optimizedResume,
        ats: result.ats,
        coverLetter,
      },
    });
  } catch (error) {
    console.error("Pipeline error:", error.message);

    // Check for rate limit / quota errors
    const isQuota = error.message?.toLowerCase().includes("quota") ||
                    error.message?.toLowerCase().includes("resource_exhausted") ||
                    error.message?.toLowerCase().includes("429");

    res.status(isQuota ? 429 : 500).json({
      success: false,
      error: isQuota
        ? "Gemini API quota exceeded. Please wait 1 minute and try again."
        : error.message,
      isQuotaError: isQuota,
    });
  }
};

// Legacy compat
const optimizeResumeController = fullProcessController;

module.exports = {
  analyzeJDController,
  atsScoreController,
  coverLetterController,
  coverLetterStreamController,
  rewriteBulletController,
  optimizeResumeController,
  fullProcessController,
};
