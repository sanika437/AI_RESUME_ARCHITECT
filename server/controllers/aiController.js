const {
  analyzeJD,
  optimizeResume,
  calculateATS,
  generateCoverLetter,
} = require("../services/geminiService");

// 🔹 Analyze JD Controller
const analyzeJDController = async (req, res) => {
  try {
    const { jd } = req.body;

    if (!jd) {
      return res.status(400).json({
        success: false,
        error: "Job Description is required",
      });
    }

    const result = await analyzeJD(jd);

    res.json({
      success: true,
      data: { skills: result },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 🔹 Optimize Resume Controller
const optimizeResumeController = async (req, res) => {
  try {
    const { resume, jd } = req.body;

    if (!resume || !jd) {
      return res.status(400).json({
        success: false,
        error: "Resume and JD required",
      });
    }

    const result = await optimizeResume(resume, jd);

    res.json({
      success: true,
      data: { optimizedResume: result },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 🔹 ATS Score Controller
const atsScoreController = async (req, res) => {
  try {
    const { resume, jd } = req.body;

    if (!resume || !jd) {
      return res.status(400).json({
        success: false,
        error: "Resume and JD required",
      });
    }

    const result = await calculateATS(resume, jd);

    res.json({
      success: true,
      data: { ats: result },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 🔹 Cover Letter Controller
const coverLetterController = async (req, res) => {
  try {
    const { resume, jd } = req.body;

    if (!resume || !jd) {
      return res.status(400).json({
        success: false,
        error: "Resume and JD required",
      });
    }

    const result = await generateCoverLetter(resume, jd);

    res.json({
      success: true,
      data: { coverLetter: result },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 🔥 FULL PIPELINE CONTROLLER
const fullProcessController = async (req, res) => {
  try {
    const { resume, jd, generateCover = true } = req.body;

    if (!resume || !jd) {
      return res.status(400).json({
        success: false,
        error: "Resume and JD required",
      });
    }

    console.log("Incoming Request:", req.body);

    const extractedSkills = await analyzeJD(jd);

    const optimizedResume = await optimizeResume(
      resume,
      jd,
      extractedSkills
    );

    const ats = await calculateATS(optimizedResume, jd);

    let coverLetter = null;
    if (generateCover) {
      coverLetter = await generateCoverLetter(optimizedResume, jd);
    }

    res.json({
      success: true,
      data: {
        extractedSkills,
        optimizedResume,
        ats,
        coverLetter,
      },
    });
  } catch (error) {
    console.error("Pipeline Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  analyzeJDController,
  optimizeResumeController,
  atsScoreController,
  coverLetterController,
  fullProcessController,
};