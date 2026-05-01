import { useState, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Epilogue:wght@300;400;500;600;700&family=Crimson+Pro:wght@400;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .orv-page{min-height:100vh;background:#07070f;display:flex;flex-direction:column;align-items:center;padding:40px 20px 60px;position:relative;overflow:hidden;font-family:'Epilogue',sans-serif}
  .orv-bg{position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse 60% 50% at 20% 10%,rgba(88,28,235,.22) 0%,transparent 65%),radial-gradient(ellipse 50% 45% at 80% 85%,rgba(37,99,235,.18) 0%,transparent 65%),#07070f}
  .orv-grid{position:fixed;inset:0;z-index:1;background-image:linear-gradient(rgba(139,92,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.04) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%)}
  .orv-inner{position:relative;z-index:10;width:100%;max-width:900px}
  .orv-top-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;animation:orvFadeUp .5s cubic-bezier(.22,1,.36,1) both}
  .orv-back-btn{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:9px 16px;font-family:'Epilogue',sans-serif;font-size:13px;font-weight:500;color:rgba(200,195,230,.7);cursor:pointer;transition:all .2s}
  .orv-back-btn:hover{background:rgba(255,255,255,.08);color:#e2e8f0}
  .orv-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px 5px 10px;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.25);border-radius:999px;font-size:11px;font-weight:600;color:#6ee7b7;letter-spacing:.05em;text-transform:uppercase}
  .orv-badge-dot{width:6px;height:6px;border-radius:50%;background:#34d399;box-shadow:0 0 8px rgba(52,211,153,.8);animation:orvPulse 2s ease-in-out infinite}
  @keyframes orvPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
  .orv-heading{font-family:'Bricolage Grotesque',sans-serif;font-size:32px;font-weight:800;color:#f1f0ff;letter-spacing:-.03em;margin-bottom:8px;animation:orvFadeUp .5s .1s cubic-bezier(.22,1,.36,1) both}
  .orv-sub{font-size:14px;color:rgba(148,163,184,.6);margin-bottom:32px;animation:orvFadeUp .5s .15s cubic-bezier(.22,1,.36,1) both}
  .orv-actions{display:flex;gap:12px;margin-bottom:32px;flex-wrap:wrap;animation:orvFadeUp .5s .2s cubic-bezier(.22,1,.36,1) both}
  .orv-btn{display:flex;align-items:center;gap:8px;padding:12px 22px;border-radius:12px;font-family:'Epilogue',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;transition:all .22s;border:none;letter-spacing:.01em}
  .orv-btn-primary{background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;box-shadow:0 4px 20px rgba(109,40,217,.4)}
  .orv-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(109,40,217,.5)}
  .orv-btn-secondary{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12) !important;color:rgba(200,195,230,.85)}
  .orv-btn-secondary:hover{background:rgba(255,255,255,.1);color:#e2e8f0}
  .orv-btn-ats{background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.25) !important;color:#6ee7b7}
  .orv-btn-ats:hover{background:rgba(52,211,153,.18);transform:translateY(-2px)}
  .orv-resume-card{background:rgba(15,12,30,.7);backdrop-filter:blur(20px);border:1px solid rgba(139,92,246,.15);border-radius:20px;overflow:hidden;animation:orvFadeUp .5s .25s cubic-bezier(.22,1,.36,1) both;box-shadow:0 8px 48px rgba(0,0,0,.5)}
  .orv-resume-toolbar{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.06);background:rgba(0,0,0,.2)}
  .orv-toolbar-dots{display:flex;gap:6px}
  .orv-td{width:10px;height:10px;border-radius:50%}
  .orv-resume-body{padding:40px 48px;background:#fff;min-height:600px;font-family:'Crimson Pro',Georgia,serif}
  .orv-resume-name{font-size:28px;font-weight:600;color:#1a1a2e;margin-bottom:2px}
  .orv-resume-title{font-size:13px;color:#6366f1;font-weight:500;letter-spacing:.05em;text-transform:uppercase;margin-bottom:14px}
  .orv-resume-contact{display:flex;gap:18px;font-size:12px;color:#64748b;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #1a1a2e;flex-wrap:wrap}
  .orv-resume-section{margin-bottom:18px}
  .orv-resume-sh{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#1a1a2e;border-bottom:1.5px solid #e2e8f0;padding-bottom:4px;margin-bottom:10px}
  .orv-resume-p{font-size:12px;color:#374151;line-height:1.7}
  .orv-resume-exp-item{margin-bottom:12px}
  .orv-resume-exp-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:3px}
  .orv-resume-role{font-size:13px;font-weight:600;color:#1a1a2e}
  .orv-resume-company{font-size:12px;color:#6366f1;font-weight:500}
  .orv-resume-date{font-size:11px;color:#94a3b8}
  .orv-resume-bullets{list-style:disc;padding-left:16px;font-size:12px;color:#374151;line-height:1.7}
  .orv-resume-skills{display:flex;flex-wrap:wrap;gap:6px}
  .orv-resume-skill{background:#f1f5f9;border-radius:4px;padding:3px 10px;font-size:11px;color:#475569;font-family:'Epilogue',sans-serif}
  .orv-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:400px;gap:20px}
  .orv-spinner{width:48px;height:48px;border:3px solid rgba(139,92,246,.2);border-top-color:#a78bfa;border-radius:50%;animation:orvSpin 0.8s linear infinite}
  @keyframes orvSpin{to{transform:rotate(360deg)}}
  .orv-loading-text{font-size:14px;color:rgba(148,163,184,.7);animation:orvBlink 1.5s ease-in-out infinite}
  @keyframes orvBlink{0%,100%{opacity:.5}50%{opacity:1}}
  @keyframes orvFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @media(max-width:600px){.orv-resume-body{padding:24px 20px}.orv-actions{flex-direction:column}.orv-btn{justify-content:center}}
  .orv-cover-section{margin-top:40px;animation:orvFadeUp .5s .35s cubic-bezier(.22,1,.36,1) both}
  .orv-cover-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px}
  .orv-cover-title{font-family:'Bricolage Grotesque',sans-serif;font-size:24px;font-weight:800;color:#f1f0ff;letter-spacing:-.03em}
  .orv-cover-sub{font-size:13px;color:rgba(148,163,184,.6);margin-top:4px}
  .orv-gen-btn{display:flex;align-items:center;gap:8px;padding:12px 22px;border-radius:12px;font-family:'Epilogue',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;transition:all .22s;border:none;background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff;box-shadow:0 4px 20px rgba(14,165,233,.35);white-space:nowrap}
  .orv-gen-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(14,165,233,.5)}
  .orv-gen-btn:disabled{opacity:.45;cursor:not-allowed;transform:none}
  .orv-cover-card{background:rgba(15,12,30,.7);backdrop-filter:blur(20px);border:1px solid rgba(99,179,237,.15);border-radius:20px;overflow:hidden;box-shadow:0 8px 48px rgba(0,0,0,.5)}
  .orv-cover-toolbar{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.06);background:rgba(0,0,0,.2)}
  .orv-cover-body{padding:40px 48px;background:#fff;min-height:400px;font-family:'Crimson Pro',Georgia,serif;font-size:13px;color:#374151;line-height:1.85}
  .orv-cover-body p{margin-bottom:16px}
  .cl-name{font-size:18px;font-weight:600;color:#1a1a2e;margin-bottom:2px}
  .cl-contact{font-size:11px;color:#64748b;margin-bottom:24px;padding-bottom:16px;border-bottom:1.5px solid #e2e8f0}
  .orv-dl-bar{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;animation:orvFadeUp .4s .1s both}
  .orv-btn-dl-cl{display:flex;align-items:center;gap:8px;padding:12px 22px;border-radius:12px;font-family:'Epilogue',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;transition:all .22s;border:1px solid rgba(99,179,237,.3);background:rgba(99,179,237,.12);color:#7dd3fc}
  .orv-btn-dl-cl:hover{background:rgba(99,179,237,.22);transform:translateY(-2px)}
  .orv-cover-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:260px;gap:18px;background:#fff}
  .orv-cover-spinner{width:38px;height:38px;border:3px solid rgba(99,179,237,.2);border-top-color:#7dd3fc;border-radius:50%;animation:orvSpin 0.8s linear infinite}
  .orv-cover-loading-text{font-size:13px;color:rgba(148,163,184,.7);animation:orvBlink 1.5s ease-in-out infinite}
  .orv-cl-spin{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;display:inline-block;animation:orvSpin .75s linear infinite}
`;

function generateOptimizedContent(appData, optimizedData) {
  const jd = appData.jobDescription || {};

  // ✅ If backend returned a structured optimizedResume object, use it directly
  if (optimizedData && typeof optimizedData === 'object' && optimizedData.name) {
    return {
      name: optimizedData.name || "Candidate Name",
      title: optimizedData.title || jd.role || "Software Engineer",
      email: optimizedData.email || "",
      phone: optimizedData.phone || "",
      location: optimizedData.location || "",
      linkedin: optimizedData.linkedin || "",
      summary: optimizedData.summary || "",
      experience: Array.isArray(optimizedData.experience) ? optimizedData.experience : [],
      skills: Array.isArray(optimizedData.skills) ? optimizedData.skills : [],
      education: Array.isArray(optimizedData.education)
        ? optimizedData.education[0] || { degree: "", college: "", year: "" }
        : (optimizedData.education || { degree: "", college: "", year: "" }),
    };
  }

  // Fallback: build from appData when API is unavailable
  const rd = (appData.resumeData && appData.resumeData.contacts) ? appData.resumeData.contacts : {};
  const firstName = rd.firstName || "";
  const lastName = rd.lastName || "";
  const name = (firstName + " " + lastName).trim() || "";
  const title = rd.jobTitle || jd.role || "Software Developer";
  return {
    name: name || "(Your name will appear here when AI processes your resume)",
    title,
    email: rd.email || "",
    phone: rd.phone || "",
    location: "",
    linkedin: "",
    summary: "Motivated " + title + " with hands-on experience in backend development. Skilled at building scalable REST APIs and working with databases. Seeking to contribute to a " + (jd.role || "software engineering") + " role.",
    experience: [],
    skills: ["JavaScript", "Node.js", "REST APIs", "MySQL", "Git"],
    education: { degree: rd.degree || "B.Tech Computer Science", college: rd.college || "", year: rd.year || "" },
  };
}

function generateCoverLetterLocal(appData, resume) {
  const jd = appData.jobDescription || {};
  const name = (resume && resume.name && resume.name !== "Your Name") ? resume.name : "Candidate";
  const email = (resume && resume.email && !resume.email.includes("example.com")) ? resume.email : "";
  const phone = (resume && resume.phone && !resume.phone.includes("00000")) ? resume.phone : "";
  const role = jd.role || "the position";
  // Fix: don't use jd.experience as "years" — it could be "fresher", "2 years", etc.
  const rawExp = jd.experience || "";
  const expPhrase = rawExp.toLowerCase() === "fresher" || rawExp === ""
    ? "a strong foundation in"
    : "experience in";
  const skillsList = (resume && resume.skills && resume.skills.length > 0)
    ? resume.skills.slice(0, 4).join(", ")
    : "backend development and software engineering";
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return {
    name,
    email: email || "—",
    phone: phone || "—",
    date: today,
    paragraphs: [
      "Dear Hiring Manager,",
      "I am writing to express my interest in the " + role + " position. I bring " + expPhrase + " " + skillsList + ", and I am eager to contribute to your team with a strong work ethic and a passion for building reliable, scalable software.",
      "My background includes hands-on work with the technologies relevant to this role. I enjoy solving complex problems, writing clean and maintainable code, and collaborating effectively with team members to deliver quality results on time.",
      "I am particularly drawn to this opportunity because it aligns well with my technical skills and my goal of growing as a backend developer. I am confident that I can make meaningful contributions from day one.",
      "Thank you for considering my application. I would welcome the chance to discuss how my skills and enthusiasm align with your team's needs.",
      "Sincerely,\n" + name,
    ],
  };
}

function parseCoverLetter(text, appData, resume) {
  const lines = text.split('\n').filter(l => l.trim());
  const jd = appData.jobDescription || {};
  const name = (resume && resume.name) ? resume.name : "Alex Johnson";
  const email = (resume && resume.email) ? resume.email : "alex.johnson@email.com";
  const phone = (resume && resume.phone) ? resume.phone : "+1 (555) 234-5678";
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  
  return {
    name,
    email,
    phone,
    date: today,
    paragraphs: lines,
  };
}

export default function OptimizedResumeView({ appData, onShowATS, onBack }) {
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [clLoading, setClLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateResume = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ FIX 1: Actually extract text from the uploaded PDF/DOCX file
        let resumeText = "";
        if (appData.method === "upload" && appData.uploadedFile) {
          try {
            const formData = new FormData();
            formData.append("resume", appData.uploadedFile);
            const extractRes = await fetch("/api/pdf/extract-text", {
              method: "POST",
              body: formData,
            });
            const extractData = await extractRes.json();
            if (extractData.success && extractData.text) {
              resumeText = extractData.text;
            } else {
              throw new Error(extractData.error || "Text extraction failed");
            }
          } catch (extractErr) {
            console.error("PDF extraction error:", extractErr);
            setError("⚠️ Could not extract text from your PDF. Using form data instead.");
            // Fallback to form data if available
            if (appData.resumeData) {
              const rd = appData.resumeData.contacts || {};
              resumeText = `${rd.firstName || ""} ${rd.lastName || ""}\n${rd.email || ""}\n${rd.phone || ""}\n\n${appData.resumeData.summary || ""}`;
            }
          }
        } else if (appData.resumeData) {
          // Built from form — construct structured text
          const rd = appData.resumeData.contacts || {};
          resumeText = `${rd.firstName || ""} ${rd.lastName || ""}\n`;
          resumeText += `Email: ${rd.email || ""}\nPhone: ${rd.phone || ""}\n\n`;
          resumeText += `SUMMARY\n${appData.resumeData.summary || ""}\n\n`;
          if (appData.resumeData.skills) {
            resumeText += `SKILLS\n${appData.resumeData.skills}\n\n`;
          }
          if (appData.resumeData.experience) {
            resumeText += `EXPERIENCE\n${appData.resumeData.experience}\n\n`;
          }
          if (appData.resumeData.education) {
            resumeText += `EDUCATION\n${appData.resumeData.education}\n`;
          }
        }

        if (!resumeText.trim()) {
          resumeText = "Entry-level software developer seeking backend developer position. Familiar with programming fundamentals, data structures, and REST APIs.";
        }

        const jd = appData.jobDescription || {};
        const jobDescText = `Role: ${jd.role}\nExperience: ${jd.experience}\n${jd.jobDesc}`;

        // ✅ FIX 2: Call backend API with real resume text
        const response = await fetch("/api/ai/full-process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resume: resumeText,
            jd: jobDescText,
            generateCover: false,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to optimize resume");
        }

        const data = await response.json();

        if (data.success) {
          // ✅ FIX 3: Store structured optimizedResume object
          appData.optimizedResume = data.data.optimizedResume;
          appData.optimizedResumeText = typeof data.data.optimizedResume === "object"
            ? JSON.stringify(data.data.optimizedResume)
            : data.data.optimizedResume;
          appData.atsData = data.data.ats;
          if (data.isDemoMode) {
            setError("⚠️ AI service is busy. Showing a structured template — please re-submit in a moment for AI-optimized content.");
          }
          const generatedResume = generateOptimizedContent(appData, data.data.optimizedResume);
          setResume(generatedResume);
          
          try {
            const token = localStorage.getItem("token");
            if (token && !data.isDemoMode) {
              fetch("http://localhost:5000/api/user/history", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                  type: "resume",
                  title: `${generatedResume.title || "Resume"} for ${jd.role || "Job"}`,
                  data: generatedResume,
                  atsScore: data.data.ats?.score || null
                })
              });
            }
          } catch(e) {}
        } else {
          throw new Error(data.error || "Failed to optimize resume");
        }
      } catch (err) {
        console.error("Error generating resume:", err);
        if (err.message && (err.message.includes("quota") || err.message.includes("RESOURCE_EXHAUSTED"))) {
          setError("⚠️ API quota exceeded. Please wait 1 minute and try again.");
        } else {
          setError("⚠️ " + (err.message || "Could not connect to AI service. Showing template."));
        }
        setResume(generateOptimizedContent(appData));
      } finally {
        setLoading(false);
      }
    };

    generateResume();
  }, [appData]);

  // SSE streaming state for cover letter typing effect (Project 2 requirement)
  const [streamedText, setStreamedText] = useState("");

  const handleGenerateCL = async function() {
    try {
      setClLoading(true);
      setCoverLetter(null);
      setStreamedText("");

      const jd = appData.jobDescription || {};
      const jobDescText = `Role: ${jd.role}\nExperience: ${jd.experience}\n${jd.jobDesc}`;

      // Build resume text from the structured resume object
      let resumeForCL = "";
      if (resume) {
        resumeForCL = `${resume.name}\nEmail: ${resume.email}\nPhone: ${resume.phone}\nTitle: ${resume.title}\n\nSummary: ${resume.summary}\n\nSkills: ${resume.skills.join(", ")}`;
        if (resume.experience && resume.experience.length > 0) {
          resumeForCL += "\n\nExperience:\n" + resume.experience.map(e =>
            `${e.role} at ${e.company} (${e.date})\n${(e.bullets || []).map(b => "- " + b).join("\n")}`
          ).join("\n\n");
        }
      } else {
        resumeForCL = "Software developer seeking " + (jd.role || "software engineering") + " role.";
      }

      // ✅ Use SSE streaming endpoint for "typing effect" as required by project spec
      const response = await fetch("/api/ai/cover-letter-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeForCL, jd: jobDescText }),
      });

      if (!response.ok) throw new Error("Stream request failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      // Show the cover letter card immediately while streaming
      setCoverLetter({ streaming: true, name: resume?.name || "", email: resume?.email || "", phone: resume?.phone || "", date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), paragraphs: [] });
      setClLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") break;
            try {
              const json = JSON.parse(payload);
              if (json.text) {
                fullText += json.text;
                setStreamedText(fullText);
              }
            } catch (_) {}
          }
        }
      }

      // Convert streamed plain text to paragraphs
      const paragraphs = fullText.split("\n").filter(l => l.trim());
      const clData = parseCoverLetter(fullText, appData, resume);
      setCoverLetter(clData);
      setStreamedText("");

      try {
        const token = localStorage.getItem("token");
        if (token) {
          fetch("http://localhost:5000/api/user/history", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              type: "cover_letter",
              title: `Cover Letter for ${jd.role || "Job"}`,
              data: clData
            })
          });
        }
      } catch(e) {}

    } catch (err) {
      console.error("Cover letter error:", err);
      setClLoading(false);
      setStreamedText("");
      // Fallback to non-streaming endpoint
      try {
        const jd = appData.jobDescription || {};
        const res2 = await fetch("/api/ai/cover-letter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resume: resume ? `${resume.name}\n${resume.summary}\nSkills: ${resume.skills.join(", ")}` : "Developer",
            jd: `Role: ${jd.role}\n${jd.jobDesc}`,
          }),
        });
        const data = await res2.json();
        if (data.success && data.data.coverLetter?.length > 50) {
          const clData = parseCoverLetter(data.data.coverLetter, appData, resume);
          setCoverLetter(clData);
          try {
            const token = localStorage.getItem("token");
            if (token) {
              fetch("http://localhost:5000/api/user/history", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                  type: "cover_letter",
                  title: `Cover Letter for ${jd.role || "Job"}`,
                  data: clData
                })
              });
            }
          } catch(e) {}
          return;
        }
      } catch (_) {}
      setCoverLetter(generateCoverLetterLocal(appData, resume));
    }
  };

  const handleDownloadCL = function() {
    if (!coverLetter) return;
    var lines = [coverLetter.name, coverLetter.email + " | " + coverLetter.phone, coverLetter.date, ""].concat(coverLetter.paragraphs);
    var txt = lines.join("\n\n");
    var a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(txt);
    a.download = "cover_letter.txt";
    a.click();
  };

  const handleDownload = function() {
    if (!resume) return;
    var expText = resume.experience.map(function(e) {
      return e.role + " @ " + e.company + " (" + e.date + ")\n" + e.bullets.map(function(b) { return "- " + b; }).join("\n");
    }).join("\n\n");
    var txt = resume.name + "\n" + resume.title + "\n" + resume.email + " | " + resume.phone
      + "\n\nSUMMARY\n" + resume.summary
      + "\n\nEXPERIENCE\n" + expText
      + "\n\nSKILLS\n" + resume.skills.join(", ")
      + "\n\nEDUCATION\n" + resume.education.degree + " - " + resume.education.college + " " + resume.education.year;
    var a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(txt);
    a.download = "optimized_resume.txt";
    a.click();
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="orv-page">
        <div className="orv-bg" /><div className="orv-grid" />
        <div className="orv-inner">
          <div className="orv-top-bar">
            <button className="orv-back-btn" onClick={onBack}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back
            </button>
            <div className="orv-badge">
              <span className="orv-badge-dot" />
              AI Optimized
            </div>
          </div>

          <h1 className="orv-heading">Your Optimized Resume</h1>
          <p className="orv-sub">Tailored to the job description using AI. Download or check your ATS score below.</p>

          {error && (
            <div style={{
              background: "rgba(251,191,36,.1)",
              border: "1px solid rgba(251,191,36,.3)",
              borderRadius: "12px",
              padding: "12px 16px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              animation: "orvFadeUp .5s both"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span style={{fontSize: "13px", color: "#fbbf24", fontWeight: 500}}>{error}</span>
            </div>
          )}

          {!loading && (
            <div className="orv-actions">
              <button className="orv-btn orv-btn-primary" onClick={handleDownload}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Resume
              </button>
              <button className="orv-btn orv-btn-ats" onClick={onShowATS}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                View ATS Score
              </button>
              <button className="orv-btn orv-btn-secondary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit Resume
              </button>
            </div>
          )}

          <div className="orv-resume-card">
            <div className="orv-resume-toolbar">
              <div className="orv-toolbar-dots">
                <div className="orv-td" style={{background:"#ff5f57"}}/>
                <div className="orv-td" style={{background:"#ffbd2e"}}/>
                <div className="orv-td" style={{background:"#28ca41"}}/>
              </div>
              <span style={{fontSize:12,color:"rgba(148,163,184,.5)",fontFamily:"Epilogue,sans-serif"}}>optimized_resume.pdf</span>
              <div style={{width:60}}/>
            </div>

            {loading ? (
              <div className="orv-loading" style={{background:"#fff"}}>
                <div className="orv-spinner"/>
                <p className="orv-loading-text">AI is optimizing your resume...</p>
              </div>
            ) : resume && (
              <div className="orv-resume-body">
                <div className="orv-resume-name">{resume.name}</div>
                <div className="orv-resume-title">{resume.title}</div>
                <div className="orv-resume-contact">
                  <span>{resume.email}</span>
                  <span>{resume.phone}</span>
                  <span>{resume.location}</span>
                  <span>{resume.linkedin}</span>
                </div>
                <div className="orv-resume-section">
                  <div className="orv-resume-sh">Professional Summary</div>
                  <p className="orv-resume-p">{resume.summary}</p>
                </div>
                <div className="orv-resume-section">
                  <div className="orv-resume-sh">Experience</div>
                  {resume.experience.map(function(exp, i) {
                    return (
                      <div key={i} className="orv-resume-exp-item">
                        <div className="orv-resume-exp-header">
                          <div>
                            <div className="orv-resume-role">{exp.role}</div>
                            <div className="orv-resume-company">{exp.company}</div>
                          </div>
                          <div className="orv-resume-date">{exp.date}</div>
                        </div>
                        <ul className="orv-resume-bullets">
                          {exp.bullets.map(function(b, j) { return <li key={j}>{b}</li>; })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <div className="orv-resume-section">
                  <div className="orv-resume-sh">Skills</div>
                  <div className="orv-resume-skills">
                    {resume.skills.map(function(s, i) { return <span key={i} className="orv-resume-skill">{s}</span>; })}
                  </div>
                </div>
                <div className="orv-resume-section">
                  <div className="orv-resume-sh">Education</div>
                  <div className="orv-resume-role">{resume.education.degree}</div>
                  <div className="orv-resume-company">{resume.education.college}</div>
                  <div className="orv-resume-date">{resume.education.year}</div>
                </div>
              </div>
            )}
          </div>

          {!loading && (
            <div className="orv-cover-section">
              <div className="orv-cover-header">
                <div>
                  <div className="orv-cover-title">Cover Letter</div>
                  <div className="orv-cover-sub">AI-crafted to match the job description perfectly.</div>
                </div>
                <button className="orv-gen-btn" onClick={handleGenerateCL} disabled={clLoading}>
                  {clLoading ? (
                    <>
                      <span className="orv-cl-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                      {coverLetter ? "Regenerate Cover Letter" : "Generate Cover Letter"}
                    </>
                  )}
                </button>
              </div>

              {(clLoading || coverLetter || streamedText) && (
                <div className="orv-cover-card">
                  <div className="orv-cover-toolbar">
                    <div className="orv-toolbar-dots">
                      <div className="orv-td" style={{background:"#ff5f57"}}/>
                      <div className="orv-td" style={{background:"#ffbd2e"}}/>
                      <div className="orv-td" style={{background:"#28ca41"}}/>
                    </div>
                    <span style={{fontSize:12,color:"rgba(148,163,184,.5)",fontFamily:"Epilogue,sans-serif"}}>cover_letter.txt</span>
                    <div style={{width:60}}/>
                  </div>
                  {clLoading ? (
                    <div className="orv-cover-loading">
                      <div className="orv-cover-spinner"/>
                      <p className="orv-cover-loading-text">AI is writing your cover letter...</p>
                    </div>
                  ) : streamedText ? (
                    /* ✅ SSE Streaming "typing effect" as required by project spec */
                    <div className="orv-cover-body">
                      {coverLetter && <div className="cl-name">{coverLetter.name}</div>}
                      {coverLetter && <div className="cl-contact">{coverLetter.email} | {coverLetter.phone} | {coverLetter.date}</div>}
                      <p style={{whiteSpace:"pre-wrap", fontFamily:"'Crimson Pro',Georgia,serif", fontSize:13, color:"#374151", lineHeight:1.85}}>
                        {streamedText}
                        <span style={{display:"inline-block", width:2, height:"1em", background:"#6366f1", marginLeft:2, animation:"orvBlink 0.8s ease-in-out infinite", verticalAlign:"text-bottom"}}/>
                      </p>
                    </div>
                  ) : coverLetter && (
                    <div className="orv-cover-body">
                      <div className="cl-name">{coverLetter.name}</div>
                      <div className="cl-contact">{coverLetter.email} | {coverLetter.phone} | {coverLetter.date}</div>
                      {coverLetter.paragraphs.map(function(para, i) {
                        return <p key={i} style={{whiteSpace:"pre-line"}}>{para}</p>;
                      })}
                    </div>
                  )}
                </div>
              )}

              {coverLetter && !clLoading && !streamedText && (
                <div className="orv-dl-bar">
                  <button className="orv-btn-dl-cl" onClick={handleDownloadCL}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download Cover Letter
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
