import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════
   TEMPLATE 1 – SIDEBAR LAYOUT
   Left dark sidebar: contact + skills | Right: experience
════════════════════════════════════════════════════════ */
function TemplateOnePreview({ data }) {
  const { firstName, lastName, jobTitle, phone, email, summary, experience, education, skills } = data;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <div style={{ display: "flex", height: "100%", fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 11, color: "#1a1a2e", background: "#fff", borderRadius: 8, overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: "36%", background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)", color: "#e2e8f0", padding: "24px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Avatar placeholder */}
        <div style={{ textAlign: "center", paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #0f3460, #533483)", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>
            {(firstName?.[0] || "Y")}{(lastName?.[0] || "N")}
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{fullName}</div>
          {jobTitle && <div style={{ fontSize: 9.5, color: "#94a3b8", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.08em" }}>{jobTitle}</div>}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0f3460", background: "#e2e8f0", padding: "2px 8px", borderRadius: 3, marginBottom: 8, display: "inline-block" }}>Contact</div>
          {phone && <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, fontSize: 10 }}><span style={{ color: "#64748b" }}>📞</span><span style={{ color: "#cbd5e1" }}>{phone}</span></div>}
          {email && <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10 }}><span style={{ color: "#64748b" }}>✉</span><span style={{ color: "#cbd5e1", wordBreak: "break-all" }}>{email}</span></div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0f3460", background: "#e2e8f0", padding: "2px 8px", borderRadius: 3, marginBottom: 8, display: "inline-block" }}>Skills</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, padding: "2px 7px", fontSize: 9.5, color: "#e2e8f0" }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.college && (
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0f3460", background: "#e2e8f0", padding: "2px 8px", borderRadius: 3, marginBottom: 8, display: "inline-block" }}>Education</div>
            <div style={{ fontSize: 10, color: "#cbd5e1", fontWeight: 600 }}>{education.degree || "Degree"}</div>
            <div style={{ fontSize: 9.5, color: "#94a3b8" }}>{education.college}</div>
            {education.year && <div style={{ fontSize: 9, color: "#64748b", marginTop: 2 }}>{education.year}</div>}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "24px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Summary */}
        {summary && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0f3460", borderBottom: "2px solid #0f3460", paddingBottom: 3, marginBottom: 7 }}>Profile</div>
            <p style={{ fontSize: 10, color: "#374151", lineHeight: 1.6 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.company && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0f3460", borderBottom: "2px solid #0f3460", paddingBottom: 3, marginBottom: 8 }}>Experience</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#1a1a2e" }}>{experience.role || "Role"}</div>
                <div style={{ fontSize: 10, color: "#0f3460", fontWeight: 600 }}>{experience.company}</div>
              </div>
              {experience.duration && <div style={{ fontSize: 9.5, color: "#64748b", whiteSpace: "nowrap" }}>{experience.duration}</div>}
            </div>
            {experience.description && <p style={{ fontSize: 10, color: "#374151", lineHeight: 1.6, marginTop: 4 }}>{experience.description}</p>}
          </div>
        )}

        {!summary && !experience.company && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.2 }}>
            <div style={{ textAlign: "center", fontSize: 10 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>📄</div>
              <div>Start filling the form</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   TEMPLATE 2 – CENTERED CLEAN LAYOUT
   Centered header, stacked clean sections
════════════════════════════════════════════════════════ */
function TemplateTwoPreview({ data }) {
  const { firstName, lastName, jobTitle, phone, email, summary, experience, education, skills } = data;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <div style={{ height: "100%", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 11, color: "#1c1c1c", background: "#fafaf9", borderRadius: 8, overflow: "hidden", padding: "20px 22px" }}>
      {/* Header – centered */}
      <div style={{ textAlign: "center", borderBottom: "1px solid #e5e7eb", paddingBottom: 12, marginBottom: 12 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: "-0.02em", color: "#111" }}>{fullName}</h1>
        {jobTitle && <div style={{ fontSize: 10.5, color: "#6b7280", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.12em" }}>{jobTitle}</div>}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 7, flexWrap: "wrap" }}>
          {email && <span style={{ fontSize: 9.5, color: "#6b7280" }}>✉ {email}</span>}
          {phone && <span style={{ fontSize: 9.5, color: "#6b7280" }}>✆ {phone}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#374151", marginBottom: 5 }}>Summary</div>
          <p style={{ fontSize: 10, color: "#4b5563", lineHeight: 1.65, margin: 0 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.company && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#374151", borderBottom: "1px solid #f3f4f6", paddingBottom: 3, marginBottom: 7 }}>Experience</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#111" }}>{experience.role || "Role"}</div>
              <div style={{ fontSize: 10, color: "#6b7280" }}>{experience.company}</div>
            </div>
            {experience.duration && <div style={{ fontSize: 9.5, color: "#9ca3af" }}>{experience.duration}</div>}
          </div>
          {experience.description && <p style={{ fontSize: 10, color: "#4b5563", lineHeight: 1.6, marginTop: 5 }}>{experience.description}</p>}
        </div>
      )}

      {/* Education */}
      {education.college && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#374151", borderBottom: "1px solid #f3f4f6", paddingBottom: 3, marginBottom: 7 }}>Education</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#111" }}>{education.degree || "Degree"}</div>
              <div style={{ fontSize: 10, color: "#6b7280" }}>{education.college}</div>
            </div>
            {education.year && <div style={{ fontSize: 9.5, color: "#9ca3af" }}>{education.year}</div>}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#374151", borderBottom: "1px solid #f3f4f6", paddingBottom: 3, marginBottom: 7 }}>Skills</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {skills.map((s, i) => (
              <span key={i} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 20, padding: "2px 9px", fontSize: 9.5, color: "#374151" }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {!summary && !experience.company && (
        <div style={{ paddingTop: 30, textAlign: "center", opacity: 0.18 }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>📝</div>
          <div style={{ fontSize: 10 }}>Fill the form to preview</div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   TEMPLATE 3 – COLOR BANNER + TWO-COLUMN
   Bold header banner, two columns below
════════════════════════════════════════════════════════ */
function TemplateThreePreview({ data }) {
  const { firstName, lastName, jobTitle, phone, email, summary, experience, education, skills } = data;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <div style={{ height: "100%", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 11, background: "#fff", borderRadius: 8, overflow: "hidden" }}>
      {/* Banner */}
      <div style={{ background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)", padding: "18px 20px 14px", color: "#fff" }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>{fullName}</h1>
        {jobTitle && <div style={{ fontSize: 9.5, opacity: 0.85, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>{jobTitle}</div>}
        <div style={{ display: "flex", gap: 14, marginTop: 7, flexWrap: "wrap" }}>
          {email && <span style={{ fontSize: 9, opacity: 0.8 }}>✉ {email}</span>}
          {phone && <span style={{ fontSize: 9, opacity: 0.8 }}>✆ {phone}</span>}
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: "flex", gap: 0, padding: "12px 0", height: "calc(100% - 72px)", overflow: "hidden" }}>
        {/* Left col */}
        <div style={{ flex: 3, padding: "0 14px", borderRight: "1px solid #f0fdf4", display: "flex", flexDirection: "column", gap: 10 }}>
          {summary && (
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0d9488", marginBottom: 5 }}>About</div>
              <p style={{ fontSize: 10, color: "#374151", lineHeight: 1.65, margin: 0 }}>{summary}</p>
            </div>
          )}
          {experience.company && (
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0d9488", marginBottom: 5 }}>Experience</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#111" }}>{experience.role || "Role"}</div>
                {experience.duration && <div style={{ fontSize: 9, color: "#9ca3af" }}>{experience.duration}</div>}
              </div>
              <div style={{ fontSize: 9.5, color: "#0891b2", fontWeight: 600, marginBottom: 3 }}>{experience.company}</div>
              {experience.description && <p style={{ fontSize: 9.5, color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{experience.description}</p>}
            </div>
          )}
          {!summary && !experience.company && (
            <div style={{ paddingTop: 20, textAlign: "center", opacity: 0.18 }}>
              <div style={{ fontSize: 20 }}>✏️</div>
              <div style={{ fontSize: 9.5, marginTop: 4 }}>Fill the form</div>
            </div>
          )}
        </div>

        {/* Right col */}
        <div style={{ flex: 2, padding: "0 12px", display: "flex", flexDirection: "column", gap: 10 }}>
          {education.college && (
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0d9488", marginBottom: 5 }}>Education</div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#111" }}>{education.degree || "Degree"}</div>
              <div style={{ fontSize: 9.5, color: "#6b7280" }}>{education.college}</div>
              {education.year && <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 2 }}>{education.year}</div>}
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0d9488", marginBottom: 6 }}>Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {skills.map((s, i) => (
                  <span key={i} style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 4, padding: "2px 7px", fontSize: 9.5, color: "#065f46" }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION NAV STEPS
════════════════════════════════════════════════════════ */
const STEPS = ["Contact", "Summary", "Experience", "Education", "Skills", "Finalize"];

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */
export default function ResumeDetailsForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [skillInput, setSkillInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("1");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    phone: "",
    email: "",
    summary: "",
    experience: { company: "", role: "", duration: "", description: "" },
    education: { college: "", degree: "", year: "" },
    skills: [],
  });

  useEffect(() => {
    const tmpl = localStorage.getItem("selectedTemplate") || "1";
    setSelectedTemplate(tmpl);
  }, []);

  /* ── Helpers ── */
  const setField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const setNestedField = (group, field, value) =>
    setFormData((prev) => ({ ...prev, [group]: { ...prev[group], [field]: value } }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !formData.skills.includes(s)) {
      setField("skills", [...formData.skills, s]);
    }
    setSkillInput("");
  };

  const removeSkill = (idx) =>
    setField("skills", formData.skills.filter((_, i) => i !== idx));

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addSkill(); }
  };

  const handleGenerate = () => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
    // navigate to OptimizedResumePage
    window.location.href = "/optimized-resume";
  };

  /* ── Preview routing ── */
  const PreviewComponent =
    selectedTemplate === "2" ? TemplateTwoPreview :
    selectedTemplate === "3" ? TemplateThreePreview :
    TemplateOnePreview;

  /* ── Render form section ── */
  const renderFormSection = () => {
    switch (activeStep) {
      case 0: return <ContactSection formData={formData} setField={setField} />;
      case 1: return <SummarySection formData={formData} setField={setField} />;
      case 2: return <ExperienceSection formData={formData} setNestedField={setNestedField} />;
      case 3: return <EducationSection formData={formData} setNestedField={setNestedField} />;
      case 4: return <SkillsSection formData={formData} skillInput={skillInput} setSkillInput={setSkillInput} addSkill={addSkill} removeSkill={removeSkill} handleKeyDown={handleKeyDown} />;
      case 5: return <FinalizeSection formData={formData} handleGenerate={handleGenerate} />;
      default: return null;
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <style>{globalCSS}</style>

      <div className="rdf-root">
        {/* ── TOP BAR ── */}
        <header className="rdf-topbar">
          <div className="rdf-logo">
            <span className="rdf-logo-dot" />
            ResumeForge
          </div>
          <div className="rdf-template-badge">
            Template {selectedTemplate} Active
          </div>
        </header>

        {/* ── STEP NAV ── */}
        <nav className="rdf-stepnav">
          {STEPS.map((step, i) => (
            <button
              key={step}
              className={`rdf-step-btn ${i === activeStep ? "active" : ""} ${i < activeStep ? "done" : ""}`}
              onClick={() => setActiveStep(i)}
            >
              <span className="rdf-step-num">{i < activeStep ? "✓" : i + 1}</span>
              <span className="rdf-step-label">{step}</span>
            </button>
          ))}
        </nav>

        {/* ── SPLIT SCREEN ── */}
        <div className="rdf-split">
          {/* LEFT – FORM */}
          <div className="rdf-form-panel">
            <div className="rdf-form-inner">
              <div className="rdf-section-header">
                <div className="rdf-section-icon">{["👤","✏️","💼","🎓","⚡","🚀"][activeStep]}</div>
                <div>
                  <h2 className="rdf-section-title">{STEPS[activeStep]}</h2>
                  <p className="rdf-section-sub">{sectionSubtitles[activeStep]}</p>
                </div>
              </div>

              <div className="rdf-fields-area">
                {renderFormSection()}
              </div>

              {/* Nav buttons */}
              <div className="rdf-nav-btns">
                {activeStep > 0 && (
                  <button className="rdf-btn-secondary" onClick={() => setActiveStep(s => s - 1)}>
                    ← Back
                  </button>
                )}
                {activeStep < STEPS.length - 1 ? (
                  <button className="rdf-btn-primary" onClick={() => setActiveStep(s => s + 1)}>
                    Continue →
                  </button>
                ) : (
                  <button className="rdf-btn-generate" onClick={handleGenerate}>
                    ✦ Generate Optimized Resume
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT – PREVIEW */}
          <div className="rdf-preview-panel">
            <div className="rdf-preview-label">
              <span className="rdf-live-dot" />
              Live Preview
            </div>
            <div className="rdf-preview-frame">
              <PreviewComponent data={formData} />
            </div>
            <div className="rdf-preview-footer">
              {["1", "2", "3"].map(t => (
                <button
                  key={t}
                  className={`rdf-tmpl-switch ${selectedTemplate === t ? "active" : ""}`}
                  onClick={() => { setSelectedTemplate(t); localStorage.setItem("selectedTemplate", t); }}
                >
                  T{t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Section subtitles ── */
const sectionSubtitles = [
  "Your basic contact information",
  "A brief professional summary",
  "Your most recent work experience",
  "Academic background",
  "Tools & technologies you know",
  "Review and generate your resume",
];

/* ════════════════════════════════════════════════════════
   FORM SUB-SECTIONS
════════════════════════════════════════════════════════ */
function ContactSection({ formData, setField }) {
  return (
    <div className="rdf-fields-grid">
      <Field label="First Name" placeholder="Alex" value={formData.firstName} onChange={v => setField("firstName", v)} />
      <Field label="Last Name" placeholder="Morgan" value={formData.lastName} onChange={v => setField("lastName", v)} />
      <Field label="Job Title" placeholder="Senior Software Engineer" value={formData.jobTitle} onChange={v => setField("jobTitle", v)} span={2} />
      <Field label="Phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={v => setField("phone", v)} />
      <Field label="Email" placeholder="alex@example.com" value={formData.email} onChange={v => setField("email", v)} type="email" />
    </div>
  );
}

function SummarySection({ formData, setField }) {
  return (
    <div className="rdf-fields-grid">
      <TextareaField
        label="Professional Summary"
        placeholder="Results-driven engineer with 5+ years of experience building scalable systems. Passionate about clean code and user-centric solutions..."
        value={formData.summary}
        onChange={v => setField("summary", v)}
        rows={6}
        span={2}
      />
    </div>
  );
}

function ExperienceSection({ formData, setNestedField }) {
  return (
    <div className="rdf-fields-grid">
      <Field label="Company" placeholder="Acme Corp" value={formData.experience.company} onChange={v => setNestedField("experience", "company", v)} />
      <Field label="Role / Title" placeholder="Lead Developer" value={formData.experience.role} onChange={v => setNestedField("experience", "role", v)} />
      <Field label="Duration" placeholder="Jan 2022 – Present" value={formData.experience.duration} onChange={v => setNestedField("experience", "duration", v)} span={2} />
      <TextareaField
        label="Description"
        placeholder="Describe your key responsibilities and achievements..."
        value={formData.experience.description}
        onChange={v => setNestedField("experience", "description", v)}
        rows={4}
        span={2}
      />
    </div>
  );
}

function EducationSection({ formData, setNestedField }) {
  return (
    <div className="rdf-fields-grid">
      <Field label="College / University" placeholder="MIT" value={formData.education.college} onChange={v => setNestedField("education", "college", v)} span={2} />
      <Field label="Degree" placeholder="B.Sc. Computer Science" value={formData.education.degree} onChange={v => setNestedField("education", "degree", v)} />
      <Field label="Year" placeholder="2018 – 2022" value={formData.education.year} onChange={v => setNestedField("education", "year", v)} />
    </div>
  );
}

function SkillsSection({ formData, skillInput, setSkillInput, addSkill, removeSkill, handleKeyDown }) {
  return (
    <div className="rdf-fields-grid">
      <div className="rdf-field-wrap" style={{ gridColumn: "span 2" }}>
        <label className="rdf-label">Add Skills</label>
        <div className="rdf-skill-input-row">
          <input
            className="rdf-input rdf-skill-input"
            placeholder="Type a skill and press Enter or +"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="rdf-skill-add-btn" onClick={addSkill}>+</button>
        </div>
      </div>
      {formData.skills.length > 0 && (
        <div className="rdf-tags-wrap" style={{ gridColumn: "span 2" }}>
          {formData.skills.map((s, i) => (
            <span key={i} className="rdf-skill-tag">
              {s}
              <button className="rdf-skill-remove" onClick={() => removeSkill(i)}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function FinalizeSection({ formData, handleGenerate }) {
  const completeness = [
    formData.firstName || formData.lastName,
    formData.email,
    formData.summary,
    formData.experience.company,
    formData.education.college,
    formData.skills.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="rdf-finalize">
      <div className="rdf-completeness-bar">
        <div className="rdf-comp-label">
          <span>Profile Completeness</span>
          <span className="rdf-comp-pct">{Math.round((completeness / 6) * 100)}%</span>
        </div>
        <div className="rdf-comp-track">
          <div className="rdf-comp-fill" style={{ width: `${(completeness / 6) * 100}%` }} />
        </div>
      </div>

      <div className="rdf-review-grid">
        {[
          { label: "Name", value: [formData.firstName, formData.lastName].filter(Boolean).join(" ") },
          { label: "Email", value: formData.email },
          { label: "Job Title", value: formData.jobTitle },
          { label: "Phone", value: formData.phone },
          { label: "Company", value: formData.experience.company },
          { label: "Education", value: formData.education.college },
        ].map(({ label, value }) => (
          <div key={label} className={`rdf-review-item ${value ? "filled" : "empty"}`}>
            <span className="rdf-review-label">{label}</span>
            <span className="rdf-review-value">{value || "—"}</span>
          </div>
        ))}
      </div>

      <button className="rdf-btn-generate rdf-generate-big" onClick={handleGenerate}>
        ✦ Generate Optimized Resume
      </button>
    </div>
  );
}

/* ── Reusable field components ── */
function Field({ label, placeholder, value, onChange, type = "text", span }) {
  return (
    <div className="rdf-field-wrap" style={span ? { gridColumn: `span ${span}` } : {}}>
      <label className="rdf-label">{label}</label>
      <input
        className="rdf-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

function TextareaField({ label, placeholder, value, onChange, rows = 4, span }) {
  return (
    <div className="rdf-field-wrap" style={span ? { gridColumn: `span ${span}` } : {}}>
      <label className="rdf-label">{label}</label>
      <textarea
        className="rdf-input rdf-textarea"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   GLOBAL CSS
════════════════════════════════════════════════════════ */
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .rdf-root {
    min-height: 100vh;
    background: #080A0F;
    background-image:
      radial-gradient(ellipse at 15% 0%, rgba(14,165,233,0.06) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 90%, rgba(139,92,246,0.05) 0%, transparent 55%);
    font-family: 'Sora', system-ui, sans-serif;
    color: #e2e8f0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  /* TOP BAR */
  .rdf-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    height: 52px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(8,10,15,0.9);
    backdrop-filter: blur(12px);
    flex-shrink: 0;
    z-index: 10;
  }
  .rdf-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: -0.02em;
    color: #f1f5f9;
  }
  .rdf-logo-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
    box-shadow: 0 0 8px rgba(14,165,233,0.6);
  }
  .rdf-template-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    background: rgba(14,165,233,0.1);
    border: 1px solid rgba(14,165,233,0.25);
    color: #38bdf8;
    letter-spacing: 0.04em;
  }

  /* STEP NAV */
  .rdf-stepnav {
    display: flex;
    align-items: center;
    padding: 0 28px;
    height: 48px;
    gap: 4px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    background: rgba(8,10,15,0.7);
    flex-shrink: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .rdf-stepnav::-webkit-scrollbar { display: none; }

  .rdf-step-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background: transparent;
    color: #475569;
    font-family: 'Sora', system-ui, sans-serif;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .rdf-step-btn:hover { color: #94a3b8; background: rgba(255,255,255,0.04); }
  .rdf-step-btn.active {
    background: rgba(14,165,233,0.12);
    color: #38bdf8;
    border: 1px solid rgba(14,165,233,0.25);
  }
  .rdf-step-btn.done { color: #34d399; }
  .rdf-step-btn.done .rdf-step-num {
    background: rgba(52,211,153,0.15);
    color: #34d399;
    border-color: rgba(52,211,153,0.3);
  }
  .rdf-step-num {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .rdf-step-btn.active .rdf-step-num {
    background: rgba(14,165,233,0.2);
    color: #38bdf8;
    border-color: rgba(14,165,233,0.4);
  }
  .rdf-step-label { font-size: 12px; }

  /* SPLIT */
  .rdf-split {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* FORM PANEL */
  .rdf-form-panel {
    width: 45%;
    min-width: 340px;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .rdf-form-inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 24px 28px 20px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.08) transparent;
  }
  .rdf-form-inner::-webkit-scrollbar { width: 4px; }
  .rdf-form-inner::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

  .rdf-section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 22px;
  }
  .rdf-section-icon {
    font-size: 24px;
    width: 44px; height: 44px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .rdf-section-title {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #f1f5f9;
    margin-bottom: 2px;
  }
  .rdf-section-sub {
    font-size: 12px;
    color: #475569;
    font-weight: 400;
  }

  .rdf-fields-area { flex: 1; }

  .rdf-fields-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .rdf-field-wrap { display: flex; flex-direction: column; gap: 5px; }
  .rdf-label {
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .rdf-input {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 10px;
    padding: 10px 13px;
    color: #e2e8f0;
    font-family: 'Sora', system-ui, sans-serif;
    font-size: 13px;
    transition: all 0.2s;
    outline: none;
    width: 100%;
  }
  .rdf-input::placeholder { color: #334155; }
  .rdf-input:focus {
    border-color: rgba(14,165,233,0.4);
    background: rgba(14,165,233,0.04);
    box-shadow: 0 0 0 3px rgba(14,165,233,0.08);
  }
  .rdf-textarea { resize: none; min-height: 80px; line-height: 1.6; }

  /* SKILLS */
  .rdf-skill-input-row { display: flex; gap: 8px; }
  .rdf-skill-input { flex: 1; }
  .rdf-skill-add-btn {
    width: 40px; height: 40px;
    border-radius: 10px;
    border: 1px solid rgba(14,165,233,0.3);
    background: rgba(14,165,233,0.1);
    color: #38bdf8;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
    font-family: 'Sora', system-ui, sans-serif;
  }
  .rdf-skill-add-btn:hover { background: rgba(14,165,233,0.2); }
  .rdf-tags-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    padding: 12px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    min-height: 48px;
  }
  .rdf-skill-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(14,165,233,0.12);
    border: 1px solid rgba(14,165,233,0.25);
    border-radius: 20px;
    padding: 3px 10px 3px 12px;
    font-size: 12px;
    color: #38bdf8;
    font-weight: 500;
  }
  .rdf-skill-remove {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    padding: 0;
    transition: color 0.15s;
  }
  .rdf-skill-remove:hover { color: #f87171; }

  /* FINALIZE */
  .rdf-finalize { display: flex; flex-direction: column; gap: 18px; }
  .rdf-completeness-bar { display: flex; flex-direction: column; gap: 7px; }
  .rdf-comp-label { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; font-weight: 500; }
  .rdf-comp-pct { color: #38bdf8; font-weight: 700; }
  .rdf-comp-track {
    height: 6px;
    background: rgba(255,255,255,0.06);
    border-radius: 6px;
    overflow: hidden;
  }
  .rdf-comp-fill {
    height: 100%;
    background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
    border-radius: 6px;
    transition: width 0.5s ease;
  }
  .rdf-review-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .rdf-review-item {
    padding: 9px 12px;
    border-radius: 8px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .rdf-review-item.filled { border-color: rgba(52,211,153,0.15); }
  .rdf-review-label { font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
  .rdf-review-value { font-size: 12px; color: #94a3b8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .rdf-review-item.filled .rdf-review-value { color: #e2e8f0; }

  /* NAV BUTTONS */
  .rdf-nav-btns {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 24px;
    padding-top: 18px;
    border-top: 1px solid rgba(255,255,255,0.05);
    flex-shrink: 0;
  }
  .rdf-btn-secondary {
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: #94a3b8;
    font-family: 'Sora', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .rdf-btn-secondary:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
  .rdf-btn-primary {
    padding: 10px 22px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #0ea5e9, #2563eb);
    color: #fff;
    font-family: 'Sora', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(14,165,233,0.3);
  }
  .rdf-btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(14,165,233,0.4); }
  .rdf-btn-generate {
    padding: 11px 24px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #8b5cf6, #0ea5e9);
    color: #fff;
    font-family: 'Sora', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s;
    letter-spacing: 0.02em;
    box-shadow: 0 4px 18px rgba(139,92,246,0.35);
  }
  .rdf-btn-generate:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(139,92,246,0.45); }
  .rdf-generate-big { width: 100%; padding: 14px; font-size: 14px; }

  /* PREVIEW PANEL */
  .rdf-preview-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(0,0,0,0.2);
    overflow: hidden;
    padding: 20px 24px 16px;
    gap: 12px;
  }
  .rdf-preview-label {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 600;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    flex-shrink: 0;
  }
  .rdf-live-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #34d399;
    animation: livePulse 2s ease-in-out infinite;
    box-shadow: 0 0 6px rgba(52,211,153,0.6);
  }
  @keyframes livePulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  .rdf-preview-frame {
    flex: 1;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4);
    padding: 2px;
  }
  .rdf-preview-frame > div {
    height: 100%;
  }

  .rdf-preview-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .rdf-tmpl-switch {
    padding: 5px 14px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    color: #475569;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Sora', system-ui, sans-serif;
    transition: all 0.2s;
    letter-spacing: 0.04em;
  }
  .rdf-tmpl-switch:hover { color: #94a3b8; background: rgba(255,255,255,0.06); }
  .rdf-tmpl-switch.active {
    background: rgba(14,165,233,0.12);
    border-color: rgba(14,165,233,0.3);
    color: #38bdf8;
  }

  @media (max-width: 768px) {
    .rdf-split { flex-direction: column; overflow-y: auto; }
    .rdf-form-panel { width: 100%; min-width: unset; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .rdf-preview-panel { min-height: 400px; }
    .rdf-fields-grid { grid-template-columns: 1fr; }
    .rdf-field-wrap[style*="span 2"] { grid-column: span 1 !important; }
  }
`;
