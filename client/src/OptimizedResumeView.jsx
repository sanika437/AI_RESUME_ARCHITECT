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

function generateOptimizedContent(appData) {
  const jd = appData.jobDescription || {};
  const rd = (appData.resumeData && appData.resumeData.contacts) ? appData.resumeData.contacts : {};
  const firstName = rd.firstName || "";
  const lastName = rd.lastName || "";
  const name = (firstName + " " + lastName).trim() || "Alex Johnson";
  const title = rd.jobTitle || jd.role || "Software Engineer";
  const descSnippet = jd.jobDesc ? jd.jobDesc.slice(0, 80) + "..." : "building scalable, high-quality software";
  return {
    name,
    title,
    email: rd.email || "alex.johnson@email.com",
    phone: rd.phone || "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    summary: "Results-driven " + title + " with " + (jd.experience || "3+") + " years of experience delivering impactful solutions. Proven track record of collaborating cross-functionally to drive product goals and exceed KPIs. Adept at " + descSnippet + " Passionate about innovation and continuous improvement.",
    experience: [
      {
        role: title,
        company: "TechCorp Inc.",
        date: "2022 - Present",
        bullets: [
          "Led end-to-end development of core platform features, reducing load time by 40%",
          "Collaborated with PM and design team to ship 12+ features aligned with job requirements",
          "Mentored 3 junior engineers and introduced code-review practices that cut bugs by 30%",
        ],
      },
      {
        role: "Associate " + title,
        company: "StartupXYZ",
        date: "2020 - 2022",
        bullets: [
          "Built RESTful APIs consumed by 50K+ daily active users",
          "Improved CI/CD pipeline reducing deployment time from 45 min to 8 min",
        ],
      },
    ],
    skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Git", "Agile/Scrum"],
    education: { degree: "B.S. Computer Science", college: "UC Berkeley", year: "2020" },
  };
}

function generateCoverLetter(appData, resume) {
  const jd = appData.jobDescription || {};
  const name = (resume && resume.name) ? resume.name : "Alex Johnson";
  const email = (resume && resume.email) ? resume.email : "alex.johnson@email.com";
  const phone = (resume && resume.phone) ? resume.phone : "+1 (555) 234-5678";
  const role = jd.role || "the position";
  const exp = jd.experience || "3+";
  const skillsList = (resume && resume.skills) ? resume.skills.slice(0, 4).join(", ") : "software development";
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return {
    name,
    email,
    phone,
    date: today,
    paragraphs: [
      "Dear Hiring Manager,",
      "I am excited to apply for the " + role + " position. With " + exp + " years of hands-on experience building impactful solutions, I am confident that my background aligns strongly with what your team is looking for.",
      "Throughout my career I have developed deep expertise in " + skillsList + ". I have consistently delivered projects on time, collaborated with cross-functional teams, and driven measurable outcomes — including reducing load times by 40% and mentoring junior engineers to improve code quality across the board.",
      "What excites me most about this role is the opportunity to contribute to a team that values innovation and continuous improvement. I thrive in fast-paced environments and enjoy translating complex requirements into elegant, maintainable solutions.",
      "I would welcome the opportunity to discuss how my experience and passion for this work can contribute to your team's success. Thank you for your time and consideration — I look forward to hearing from you.",
      "Sincerely,\n" + name,
    ],
  };
}

export default function OptimizedResumeView({ appData, onShowATS, onBack }) {
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [clLoading, setClLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState(null);

  useEffect(() => {
    const t = setTimeout(function() {
      setResume(generateOptimizedContent(appData));
      setLoading(false);
    }, 2200);
    return function() { clearTimeout(t); };
  }, [appData]);

  const handleGenerateCL = function() {
    setClLoading(true);
    setCoverLetter(null);
    setTimeout(function() {
      setCoverLetter(generateCoverLetter(appData, resume));
      setClLoading(false);
    }, 1800);
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

              {(clLoading || coverLetter) && (
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

              {coverLetter && !clLoading && (
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
