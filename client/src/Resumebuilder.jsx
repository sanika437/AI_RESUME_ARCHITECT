import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }

  .rb-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem;
    font-family: 'Inter', sans-serif;
  }

  .rb-card {
    background: rgba(255,255,255,0.07);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 24px;
    padding: 2rem 2.5rem;
    width: 100%;
    max-width: 1060px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  .rb-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .rb-steps-track { display: flex; align-items: center; gap: 6px; }

  .rb-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    transition: all 0.3s;
  }
  .rb-dot.done { background: #7c3aed; }
  .rb-dot.active { background: #a78bfa; width: 24px; border-radius: 4px; }

  .rb-step-label {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .rb-heading { font-size: 20px; font-weight: 600; color: #fff; margin-bottom: 3px; }
  .rb-subtitle { font-size: 13px; color: rgba(255,255,255,0.45); margin-bottom: 1.5rem; }

  .rb-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  .rb-field-group { display: flex; flex-direction: column; gap: 12px; }

  .rb-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .rb-field { display: flex; flex-direction: column; gap: 5px; }

  .rb-label {
    font-size: 11px; font-weight: 500;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.05em; text-transform: uppercase;
  }

  .rb-input, .rb-textarea {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 10px 13px;
    font-size: 13.5px;
    font-family: 'Inter', sans-serif;
    color: #fff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    width: 100%;
  }
  .rb-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }
  .rb-input::placeholder, .rb-textarea::placeholder { color: rgba(255,255,255,0.22); }
  .rb-input:hover, .rb-textarea:hover {
    border-color: rgba(167,139,250,0.35);
    background: rgba(255,255,255,0.08);
  }
  .rb-input:focus, .rb-textarea:focus {
    border-color: #a78bfa;
    box-shadow: 0 0 0 1px #a78bfa, 0 0 12px rgba(167,139,250,0.2);
    background: rgba(167,139,250,0.07);
  }

  .rb-phone-wrap { display: flex; }
  .rb-phone-prefix {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-right: none;
    border-radius: 10px 0 0 10px;
    padding: 10px 11px;
    font-size: 13px; color: rgba(255,255,255,0.5);
    display: flex; align-items: center; white-space: nowrap;
  }
  .rb-phone-wrap .rb-input { border-radius: 0 10px 10px 0; }

  .rb-skills-wrap {
    display: flex; flex-wrap: wrap; gap: 7px;
    min-height: 44px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 8px 10px;
  }
  .rb-skill-tag {
    display: flex; align-items: center; gap: 5px;
    background: rgba(167,139,250,0.18);
    border: 1px solid rgba(167,139,250,0.35);
    border-radius: 20px; padding: 3px 10px;
    font-size: 12px; color: #c4b5fd;
  }
  .rb-skill-remove {
    cursor: pointer; color: rgba(196,181,253,0.6);
    font-size: 15px; line-height: 1;
    background: none; border: none; padding: 0; font-family: inherit;
    transition: color 0.15s;
  }
  .rb-skill-remove:hover { color: #f87171; }
  .rb-skill-input-row { display: flex; gap: 8px; margin-top: 6px; }
  .rb-skill-add-btn {
    padding: 10px 16px; border-radius: 10px;
    border: 1px solid rgba(167,139,250,0.4);
    background: rgba(167,139,250,0.1); color: #c4b5fd;
    font-size: 13px; font-family: 'Inter', sans-serif;
    cursor: pointer; white-space: nowrap; transition: background 0.2s;
  }
  .rb-skill-add-btn:hover { background: rgba(167,139,250,0.2); }

  .rb-nav { display: flex; gap: 10px; margin-top: 1.5rem; }

  .rb-btn {
    flex: 1; padding: 13px; border-radius: 12px; border: none;
    font-size: 14px; font-weight: 500; font-family: 'Inter', sans-serif;
    cursor: pointer;
    background: linear-gradient(135deg, #a78bfa, #7c3aed);
    color: #fff; letter-spacing: 0.01em;
    transition: opacity 0.2s, transform 0.15s;
  }
  .rb-btn:hover { opacity: 0.88; }
  .rb-btn:active { transform: scale(0.985); }

  .rb-btn-back {
    flex: 0 0 auto; padding: 13px 20px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.65);
    font-size: 14px; font-family: 'Inter', sans-serif;
    cursor: pointer; transition: background 0.2s;
  }
  .rb-btn-back:hover { background: rgba(255,255,255,0.1); }

  /* Preview */
  .rb-preview-col { position: sticky; top: 2rem; }
  .rb-preview-label {
    font-size: 11px; font-weight: 500;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.07em; text-transform: uppercase;
    margin-bottom: 10px;
    display: flex; align-items: center; gap: 6px;
  }
  .rb-preview-label::before {
    content: ''; display: inline-block;
    width: 6px; height: 6px; border-radius: 50%;
    background: #4ade80; box-shadow: 0 0 6px #4ade80;
  }
  .rb-preview-card {
    background: #fff; border-radius: 14px; padding: 1.5rem;
    min-height: 400px; max-height: 580px; overflow-y: auto;
    box-shadow: 0 4px 24px rgba(0,0,0,0.35);
    color: #1a1a2e; font-family: 'Inter', sans-serif;
    scrollbar-width: thin; scrollbar-color: #ede9fe #fff;
  }
  .pv-name { font-size: 22px; font-weight: 700; color: #1a1a2e; line-height: 1.2; }
  .pv-name.empty { color: #d1d5db; }
  .pv-role { font-size: 13px; font-weight: 500; color: #7c3aed; margin-top: 3px; }
  .pv-role.empty { color: #e5e7eb; }
  .pv-contacts { display: flex; flex-wrap: wrap; gap: 5px 14px; margin-top: 7px; }
  .pv-contact { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #6b7280; }
  .pv-divider { height: 1.5px; background: #ede9fe; margin: 10px 0; }
  .pv-section { margin-bottom: 12px; }
  .pv-section-title {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #7c3aed; margin-bottom: 6px;
    padding-bottom: 3px; border-bottom: 1px solid #ede9fe;
  }
  .pv-exp-role { font-size: 13px; font-weight: 600; color: #1a1a2e; }
  .pv-exp-company { font-size: 11.5px; color: #6b7280; margin-bottom: 3px; }
  .pv-exp-desc { font-size: 11.5px; color: #374151; line-height: 1.5; }
  .pv-edu-degree { font-size: 13px; font-weight: 600; color: #1a1a2e; }
  .pv-edu-college { font-size: 11.5px; color: #6b7280; }
  .pv-skills-wrap { display: flex; flex-wrap: wrap; gap: 5px; }
  .pv-skill {
    background: #ede9fe; color: #5b21b6;
    border-radius: 20px; padding: 2px 10px;
    font-size: 11px; font-weight: 500;
  }
  .pv-summary { font-size: 11.5px; color: #374151; line-height: 1.6; }
  .pv-placeholder { font-size: 11px; color: #d1d5db; text-align: center; padding: 1rem 0; }

  /* Finalize */
  .rb-finalize { text-align: center; padding: 0.5rem 0; }
  .rb-finalize-icon { font-size: 42px; margin-bottom: 12px; }
  .rb-finalize-title { font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 6px; }
  .rb-finalize-sub { font-size: 13px; color: rgba(255,255,255,0.45); margin-bottom: 1.5rem; }
  .rb-checklist { display: flex; flex-direction: column; gap: 9px; text-align: left; margin-bottom: 1rem; }
  .rb-check-item { display: flex; align-items: center; gap: 10px; font-size: 13px; }
  .rb-check-badge {
    width: 20px; height: 20px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; flex-shrink: 0;
  }
  .rb-check-badge.ok { background: rgba(74,222,128,0.18); color: #4ade80; border: 1px solid rgba(74,222,128,0.4); }
  .rb-check-badge.miss { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.1); }
`;

const STEPS = ["Contacts", "Experience", "Education", "Skills", "Summary", "Finalize"];
const STEP_META = [
  { title: "Contact Details", subtitle: "Let's start with who you are" },
  { title: "Work Experience", subtitle: "Tell us where you've worked" },
  { title: "Education", subtitle: "Share your academic background" },
  { title: "Skills", subtitle: "What are you great at?" },
  { title: "Professional Summary", subtitle: "Summarise yourself in a few lines" },
  { title: "Finalize Resume", subtitle: "Review everything and download" },
];

const PhoneIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.31 6.31l.95-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

function LivePreview({ data }) {
  const { contacts, experience, education, skills, summary } = data;
  const fullName = [contacts.firstName, contacts.lastName].filter(Boolean).join(" ");
  const hasContact = contacts.phone || contacts.email;
  const hasExp = experience.company || experience.role;
  const hasEdu = education.college || education.degree;
  const hasAny = fullName || hasContact || hasExp || hasEdu || skills.length > 0 || summary;

  return (
    <div className="rb-preview-card">
      <div className={`pv-name${fullName ? "" : " empty"}`}>{fullName || "Your Name"}</div>
      <div className={`pv-role${contacts.jobTitle ? "" : " empty"}`}>{contacts.jobTitle || "Job Title"}</div>
      {hasContact && (
        <div className="pv-contacts">
          {contacts.phone && <span className="pv-contact"><PhoneIcon />&nbsp;+91 {contacts.phone}</span>}
          {contacts.email && <span className="pv-contact"><MailIcon />&nbsp;{contacts.email}</span>}
        </div>
      )}

      <div className="pv-divider" />

      {hasExp && (
        <div className="pv-section">
          <div className="pv-section-title">Experience</div>
          {experience.role && <div className="pv-exp-role">{experience.role}</div>}
          <div className="pv-exp-company">{[experience.company, experience.duration].filter(Boolean).join(" · ")}</div>
          {experience.description && <div className="pv-exp-desc">{experience.description}</div>}
        </div>
      )}

      {hasEdu && (
        <div className="pv-section">
          <div className="pv-section-title">Education</div>
          {education.degree && <div className="pv-edu-degree">{education.degree}</div>}
          <div className="pv-edu-college">{[education.college, education.year].filter(Boolean).join(" · ")}</div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="pv-section">
          <div className="pv-section-title">Skills</div>
          <div className="pv-skills-wrap">
            {skills.map((s, i) => <span key={i} className="pv-skill">{s}</span>)}
          </div>
        </div>
      )}

      {summary && (
        <div className="pv-section">
          <div className="pv-section-title">Summary</div>
          <div className="pv-summary">{summary}</div>
        </div>
      )}

      {!hasAny && <div className="pv-placeholder">Start filling the form to see your resume here</div>}
    </div>
  );
}

function StepContacts({ data, onChange }) {
  const set = (k) => (e) => onChange({ ...data, [k]: e.target.value });
  return (
    <div className="rb-field-group">
      <div className="rb-row">
        <div className="rb-field">
          <label className="rb-label">First Name</label>
          <input className="rb-input" placeholder="John" value={data.firstName} onChange={set("firstName")} />
        </div>
        <div className="rb-field">
          <label className="rb-label">Last Name</label>
          <input className="rb-input" placeholder="Doe" value={data.lastName} onChange={set("lastName")} />
        </div>
      </div>
      <div className="rb-field">
        <label className="rb-label">Desired Job Title</label>
        <input className="rb-input" placeholder="e.g. Frontend Developer" value={data.jobTitle} onChange={set("jobTitle")} />
      </div>
      <div className="rb-field">
        <label className="rb-label">Phone</label>
        <div className="rb-phone-wrap">
          <span className="rb-phone-prefix">+91</span>
          <input className="rb-input" placeholder="98765 43210" value={data.phone} onChange={set("phone")} />
        </div>
      </div>
      <div className="rb-field">
        <label className="rb-label">Email</label>
        <input className="rb-input" type="email" placeholder="john@example.com" value={data.email} onChange={set("email")} />
      </div>
    </div>
  );
}

function StepExperience({ data, onChange }) {
  const set = (k) => (e) => onChange({ ...data, [k]: e.target.value });
  return (
    <div className="rb-field-group">
      <div className="rb-row">
        <div className="rb-field">
          <label className="rb-label">Company</label>
          <input className="rb-input" placeholder="Acme Inc." value={data.company} onChange={set("company")} />
        </div>
        <div className="rb-field">
          <label className="rb-label">Role / Position</label>
          <input className="rb-input" placeholder="Software Engineer" value={data.role} onChange={set("role")} />
        </div>
      </div>
      <div className="rb-field">
        <label className="rb-label">Duration</label>
        <input className="rb-input" placeholder="Jan 2022 – Present" value={data.duration} onChange={set("duration")} />
      </div>
      <div className="rb-field">
        <label className="rb-label">Description</label>
        <textarea className="rb-textarea" placeholder="Describe your key responsibilities and achievements…" value={data.description} onChange={set("description")} />
      </div>
    </div>
  );
}

function StepEducation({ data, onChange }) {
  const set = (k) => (e) => onChange({ ...data, [k]: e.target.value });
  return (
    <div className="rb-field-group">
      <div className="rb-field">
        <label className="rb-label">College / University</label>
        <input className="rb-input" placeholder="e.g. IIT Bombay" value={data.college} onChange={set("college")} />
      </div>
      <div className="rb-field">
        <label className="rb-label">Degree</label>
        <input className="rb-input" placeholder="B.Tech in Computer Science" value={data.degree} onChange={set("degree")} />
      </div>
      <div className="rb-field">
        <label className="rb-label">Graduation Year</label>
        <input className="rb-input" placeholder="2024" value={data.year} onChange={set("year")} />
      </div>
    </div>
  );
}

function StepSkills({ skills, onChange }) {
  const [input, setInput] = useState("");
  const add = () => {
    const t = input.trim();
    if (t && !skills.includes(t)) onChange([...skills, t]);
    setInput("");
  };
  const remove = (s) => onChange(skills.filter((x) => x !== s));
  return (
    <div className="rb-field-group">
      <div className="rb-field">
        <label className="rb-label">Added Skills</label>
        <div className="rb-skills-wrap">
          {skills.length === 0 && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>No skills yet…</span>}
          {skills.map((s) => (
            <span key={s} className="rb-skill-tag">
              {s}
              <button className="rb-skill-remove" onClick={() => remove(s)}>×</button>
            </span>
          ))}
        </div>
      </div>
      <div className="rb-field">
        <label className="rb-label">Add a Skill</label>
        <div className="rb-skill-input-row">
          <input
            className="rb-input"
            placeholder="e.g. React, Figma, Python…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          />
          <button className="rb-skill-add-btn" onClick={add}>+ Add</button>
        </div>
      </div>
    </div>
  );
}

function StepSummary({ value, onChange }) {
  return (
    <div className="rb-field-group">
      <div className="rb-field">
        <label className="rb-label">Professional Summary</label>
        <textarea
          className="rb-textarea"
          style={{ minHeight: 150 }}
          placeholder="Write a compelling summary about yourself, your experience, and what you bring to the table…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{value.length} characters</span>
      </div>
    </div>
  );
}

function StepFinalize({ data }) {
  const checks = [
    { label: "Contact info filled", ok: !!(data.contacts.firstName && data.contacts.email) },
    { label: "Work experience added", ok: !!(data.experience.company || data.experience.role) },
    { label: "Education added", ok: !!(data.education.college || data.education.degree) },
    { label: "Skills listed", ok: data.skills.length > 0 },
    { label: "Summary written", ok: data.summary.length > 30 },
  ];
  const score = checks.filter((c) => c.ok).length;
  return (
    <div className="rb-finalize">
      <div className="rb-finalize-icon">{score === 5 ? "🎉" : "📝"}</div>
      <div className="rb-finalize-title">{score === 5 ? "Resume is complete!" : `${score} of 5 sections done`}</div>
      <div className="rb-finalize-sub">{score === 5 ? "Your resume looks great. Ready to download." : "Go back to fill in missing sections for a stronger resume."}</div>
      <div className="rb-checklist">
        {checks.map((c) => (
          <div key={c.label} className="rb-check-item">
            <span className={`rb-check-badge ${c.ok ? "ok" : "miss"}`}>{c.ok ? "✓" : "–"}</span>
            <span style={{ color: c.ok ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResumeBuilder({ onContinue, onBack, templateId }) {
  const [step, setStep] = useState(0);
  const [contacts, setContacts] = useState({ firstName: "", lastName: "", jobTitle: "", phone: "", email: "" });
  const [experience, setExperience] = useState({ company: "", role: "", duration: "", description: "" });
  const [education, setEducation] = useState({ college: "", degree: "", year: "" });
  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState("");

  const allData = { contacts, experience, education, skills, summary };

  return (
    <>
      <style>{styles}</style>
      <div className="rb-wrapper">
        <div className="rb-card">
          <div className="rb-top">
            <div className="rb-steps-track">
              {STEPS.map((_, i) => (
                <div key={i} className={`rb-dot${i === step ? " active" : i < step ? " done" : ""}`} />
              ))}
            </div>
            <span className="rb-step-label">Step {step + 1} of 6 · {STEPS[step]}</span>
          </div>

          <h1 className="rb-heading">{STEP_META[step].title}</h1>
          <p className="rb-subtitle">{STEP_META[step].subtitle}</p>

          <div className="rb-body">
            <div className="rb-form-col">
              {step === 0 && <StepContacts data={contacts} onChange={setContacts} />}
              {step === 1 && <StepExperience data={experience} onChange={setExperience} />}
              {step === 2 && <StepEducation data={education} onChange={setEducation} />}
              {step === 3 && <StepSkills skills={skills} onChange={setSkills} />}
              {step === 4 && <StepSummary value={summary} onChange={setSummary} />}
              {step === 5 && <StepFinalize data={allData} />}

              <div className="rb-nav">
                {step > 0 ? <button className="rb-btn-back" onClick={() => setStep((s) => s - 1)}>← Back</button> : onBack ? <button className="rb-btn-back" onClick={onBack}>← Back</button> : null}
                {step < 5 && <button className="rb-btn" onClick={() => setStep((s) => s + 1)}>Next: {STEPS[step + 1]} →</button>}
                {step === 5 && (
                  <>
                    <button className="rb-btn" style={{background:'rgba(255,255,255,0.1)',marginRight:8}} onClick={() => { const link=document.createElement('a');link.download='resume.txt';link.href='data:text/plain,Resume';link.click(); }}>
                      ↓ Download
                    </button>
                    <button className="rb-btn" onClick={() => { if(onContinue) onContinue(allData); }}>
                      Next: Add Job Description →
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="rb-preview-col">
              <div className="rb-preview-label">Live Preview</div>
              <LivePreview data={allData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}