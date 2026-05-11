import { useState, useMemo } from "react";
import { buildResumeHTML } from "./utils/templateRenderer";

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
  .rb-array-item {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 12px;
    position: relative;
  }
  .rb-array-remove {
    position: absolute; top: 10px; right: 10px;
    background: rgba(248,113,113,0.15); color: #f87171;
    border: none; border-radius: 6px; padding: 4px 8px;
    font-size: 11px; cursor: pointer; transition: 0.2s;
  }
  .rb-array-remove:hover { background: rgba(248,113,113,0.3); }

  .rb-add-btn {
    background: rgba(167,139,250,0.1); border: 1px dashed rgba(167,139,250,0.4);
    color: #c4b5fd; padding: 10px; border-radius: 10px; cursor: pointer;
    text-align: center; font-size: 13px; font-family: inherit; transition: 0.2s;
    width: 100%; margin-top: 5px;
  }
  .rb-add-btn:hover { background: rgba(167,139,250,0.2); }

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
  .rb-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
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
  .rb-skill-add-btn:hover:not(:disabled) { background: rgba(167,139,250,0.2); }
  .rb-skill-add-btn:disabled { opacity: 0.4; cursor: not-allowed; border-color: rgba(167,139,250,0.2); }

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

const STEPS = ["Contacts", "Experience", "Education", "Projects", "Certifications", "Languages", "Skills", "Summary", "Finalize"];
const STEP_META = [
  { title: "Contact Details", subtitle: "Let's start with who you are" },
  { title: "Work Experience", subtitle: "Tell us where you've worked" },
  { title: "Education", subtitle: "Share your academic background" },
  { title: "Projects", subtitle: "Highlight key projects (Optional)" },
  { title: "Certifications", subtitle: "Add professional certifications (Optional)" },
  { title: "Languages", subtitle: "What languages do you speak? (Optional)" },
  { title: "Skills", subtitle: "What are you great at?" },
  { title: "Professional Summary", subtitle: "Summarise yourself in a few lines" },
  { title: "Finalize Resume", subtitle: "Review everything and optimize" },
];

function LivePreview({ data, selectedTemplate }) {
  const layout = selectedTemplate?.layout || 'classic';
  const accent = selectedTemplate?.accent || '#1E293B';

  const html = useMemo(() => {
    return buildResumeHTML(data, layout, accent);
  }, [data, layout, accent]);

  return (
    <div className="rb-preview-card" style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}>
      <iframe 
        srcDoc={html} 
        style={{ width: '100%', height: '100%', border: 'none', minHeight: 600 }} 
        title="Resume Preview"
      />
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
  const add = () => onChange([...data, { company: "", role: "", duration: "", description: "" }]);
  const update = (idx, field, val) => {
    const newData = [...data];
    newData[idx][field] = val;
    onChange(newData);
  };
  const remove = (idx) => onChange(data.filter((_, i) => i !== idx));

  return (
    <div className="rb-field-group">
      {data.map((exp, idx) => (
        <div key={idx} className="rb-array-item">
          <button className="rb-array-remove" onClick={() => remove(idx)}>Remove</button>
          <div className="rb-row" style={{ marginTop: 10 }}>
            <div className="rb-field">
              <label className="rb-label">Company</label>
              <input className="rb-input" placeholder="Acme Inc." value={exp.company} onChange={e => update(idx, "company", e.target.value)} />
            </div>
            <div className="rb-field">
              <label className="rb-label">Role / Position</label>
              <input className="rb-input" placeholder="Software Engineer" value={exp.role} onChange={e => update(idx, "role", e.target.value)} />
            </div>
          </div>
          <div className="rb-field" style={{ marginTop: 12 }}>
            <label className="rb-label">Duration</label>
            <input className="rb-input" placeholder="Jan 2022 – Present" value={exp.duration} onChange={e => update(idx, "duration", e.target.value)} />
          </div>
          <div className="rb-field" style={{ marginTop: 12 }}>
            <label className="rb-label">Description / Achievements</label>
            <textarea className="rb-textarea" placeholder="Describe your key responsibilities and achievements…" value={exp.description} onChange={e => update(idx, "description", e.target.value)} />
          </div>
        </div>
      ))}
      <button className="rb-add-btn" onClick={add}>+ Add Another Job</button>
    </div>
  );
}

function StepEducation({ data, onChange }) {
  const add = () => onChange([...data, { college: "", degree: "", year: "" }]);
  const update = (idx, field, val) => {
    const newData = [...data];
    newData[idx][field] = val;
    onChange(newData);
  };
  const remove = (idx) => onChange(data.filter((_, i) => i !== idx));

  return (
    <div className="rb-field-group">
      {data.map((edu, idx) => (
        <div key={idx} className="rb-array-item">
          <button className="rb-array-remove" onClick={() => remove(idx)}>Remove</button>
          <div className="rb-field" style={{ marginTop: 10 }}>
            <label className="rb-label">College / University</label>
            <input className="rb-input" placeholder="e.g. IIT Bombay" value={edu.college} onChange={e => update(idx, "college", e.target.value)} />
          </div>
          <div className="rb-field" style={{ marginTop: 12 }}>
            <label className="rb-label">Degree</label>
            <input className="rb-input" placeholder="B.Tech in Computer Science" value={edu.degree} onChange={e => update(idx, "degree", e.target.value)} />
          </div>
          <div className="rb-field" style={{ marginTop: 12 }}>
            <label className="rb-label">Graduation Year</label>
            <input className="rb-input" placeholder="2024" value={edu.year} onChange={e => update(idx, "year", e.target.value)} />
          </div>
        </div>
      ))}
      <button className="rb-add-btn" onClick={add}>+ Add Another Degree</button>
    </div>
  );
}

function StepProjects({ data, onChange }) {
  const add = () => onChange([...data, { name: "", description: "", tech: "" }]);
  const update = (idx, field, val) => {
    const newData = [...data];
    newData[idx][field] = val;
    onChange(newData);
  };
  const remove = (idx) => onChange(data.filter((_, i) => i !== idx));

  return (
    <div className="rb-field-group">
      {data.map((proj, idx) => (
        <div key={idx} className="rb-array-item">
          <button className="rb-array-remove" onClick={() => remove(idx)}>Remove</button>
          <div className="rb-row" style={{ marginTop: 10 }}>
            <div className="rb-field">
              <label className="rb-label">Project Name</label>
              <input className="rb-input" placeholder="E-commerce App" value={proj.name} onChange={e => update(idx, "name", e.target.value)} />
            </div>
            <div className="rb-field">
              <label className="rb-label">Tech Stack</label>
              <input className="rb-input" placeholder="React, Node.js" value={proj.tech} onChange={e => update(idx, "tech", e.target.value)} />
            </div>
          </div>
          <div className="rb-field" style={{ marginTop: 12 }}>
            <label className="rb-label">Description</label>
            <textarea className="rb-textarea" placeholder="What did this project do?..." value={proj.description} onChange={e => update(idx, "description", e.target.value)} />
          </div>
        </div>
      ))}
      <button className="rb-add-btn" onClick={add}>+ Add Another Project</button>
    </div>
  );
}

function StepCertifications({ data, onChange }) {
  const add = () => onChange([...data, { name: "", issuer: "", year: "" }]);
  const update = (idx, field, val) => {
    const newData = [...data];
    newData[idx][field] = val;
    onChange(newData);
  };
  const remove = (idx) => onChange(data.filter((_, i) => i !== idx));

  return (
    <div className="rb-field-group">
      {data.map((cert, idx) => (
        <div key={idx} className="rb-array-item">
          <button className="rb-array-remove" onClick={() => remove(idx)}>Remove</button>
          <div className="rb-field" style={{ marginTop: 10 }}>
            <label className="rb-label">Certification Name</label>
            <input className="rb-input" placeholder="AWS Certified Solutions Architect" value={cert.name} onChange={e => update(idx, "name", e.target.value)} />
          </div>
          <div className="rb-row" style={{ marginTop: 12 }}>
            <div className="rb-field">
              <label className="rb-label">Issuer</label>
              <input className="rb-input" placeholder="Amazon Web Services" value={cert.issuer} onChange={e => update(idx, "issuer", e.target.value)} />
            </div>
            <div className="rb-field">
              <label className="rb-label">Year</label>
              <input className="rb-input" placeholder="2023" value={cert.year} onChange={e => update(idx, "year", e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <button className="rb-add-btn" onClick={add}>+ Add Another Certification</button>
    </div>
  );
}

function StepLanguages({ data, onChange }) {
  const add = () => onChange([...data, { language: "", proficiency: "" }]);
  const update = (idx, field, val) => {
    const newData = [...data];
    newData[idx][field] = val;
    onChange(newData);
  };
  const remove = (idx) => onChange(data.filter((_, i) => i !== idx));

  return (
    <div className="rb-field-group">
      {data.map((lang, idx) => (
        <div key={idx} className="rb-array-item" style={{ padding: "10px 16px" }}>
          <button className="rb-array-remove" style={{ top: 20 }} onClick={() => remove(idx)}>Remove</button>
          <div className="rb-row">
            <div className="rb-field">
              <label className="rb-label">Language</label>
              <input className="rb-input" placeholder="English" value={lang.language} onChange={e => update(idx, "language", e.target.value)} />
            </div>
            <div className="rb-field" style={{ paddingRight: 70 }}>
              <label className="rb-label">Proficiency</label>
              <input className="rb-input" placeholder="Native / Fluent" value={lang.proficiency} onChange={e => update(idx, "proficiency", e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <button className="rb-add-btn" onClick={add}>+ Add Another Language</button>
    </div>
  );
}

function StepSkills({ skills, onChange }) {
  const [input, setInput] = useState("");
  
  const add = () => {
    const t = input.trim();
    if (t && !skills.includes(t)) {
      onChange([...skills, t]);
      setInput("");
    }
  };
  
  const remove = (s) => onChange(skills.filter((x) => x !== s));
  const handleKeyDown = (e) => { if (e.key === "Enter") { e.preventDefault(); add(); } };
  
  return (
    <div className="rb-field-group">
      <div className="rb-field">
        <label className="rb-label">Added Skills ({skills.length})</label>
        <div className="rb-skills-wrap">
          {skills.length === 0 && (
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>No skills added yet.</span>
          )}
          {skills.map((s, idx) => (
            <span key={`${s}-${idx}`} className="rb-skill-tag">
              {s}
              <button type="button" className="rb-skill-remove" onClick={() => remove(s)}>×</button>
            </span>
          ))}
        </div>
      </div>
      <div className="rb-field">
        <label className="rb-label">Add a Skill</label>
        <div className="rb-skill-input-row">
          <input type="text" className="rb-input" placeholder="e.g. React, Figma, Python…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
          <button type="button" className="rb-skill-add-btn" onClick={add} disabled={!input.trim()}>+ Add</button>
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
    { label: "Work experience added", ok: data.experience.length > 0 && !!data.experience[0].company },
    { label: "Education added", ok: data.education.length > 0 && !!data.education[0].college },
    { label: "Skills listed", ok: data.skills.length > 0 },
    { label: "Summary written", ok: data.summary.length > 30 },
  ];
  const score = checks.filter((c) => c.ok).length;
  return (
    <div className="rb-finalize">
      <div className="rb-finalize-icon">{score === 5 ? "🎉" : "📝"}</div>
      <div className="rb-finalize-title">{score === 5 ? "Resume is complete!" : `${score} of 5 core sections done`}</div>
      <div className="rb-finalize-sub">{score === 5 ? "Your resume looks great. Ready to optimize." : "Go back to fill in missing core sections for a stronger resume."}</div>
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

export default function ResumeBuilder({ onContinue, onBack, templateId, selectedTemplate }) {
  const [step, setStep] = useState(0);
  const [contacts, setContacts] = useState({ firstName: "", lastName: "", jobTitle: "", phone: "", email: "" });
  const [experience, setExperience] = useState([{ company: "", role: "", duration: "", description: "" }]);
  const [education, setEducation] = useState([{ college: "", degree: "", year: "" }]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState("");

  const allData = { contacts, experience, education, projects, certifications, languages, skills, summary };

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
            <span className="rb-step-label">Step {step + 1} of {STEPS.length} · {STEPS[step]}</span>
          </div>

          <h1 className="rb-heading">{STEP_META[step].title}</h1>
          <p className="rb-subtitle">{STEP_META[step].subtitle}</p>

          <div className="rb-body">
            <div className="rb-form-col" style={{maxHeight: '600px', overflowY: 'auto', paddingRight: '10px'}}>
              {step === 0 && <StepContacts data={contacts} onChange={setContacts} />}
              {step === 1 && <StepExperience data={experience} onChange={setExperience} />}
              {step === 2 && <StepEducation data={education} onChange={setEducation} />}
              {step === 3 && <StepProjects data={projects} onChange={setProjects} />}
              {step === 4 && <StepCertifications data={certifications} onChange={setCertifications} />}
              {step === 5 && <StepLanguages data={languages} onChange={setLanguages} />}
              {step === 6 && <StepSkills skills={skills} onChange={setSkills} />}
              {step === 7 && <StepSummary value={summary} onChange={setSummary} />}
              {step === 8 && <StepFinalize data={allData} />}

              <div className="rb-nav">
                {step > 0 ? <button className="rb-btn-back" onClick={() => setStep((s) => s - 1)}>← Back</button> : onBack ? <button className="rb-btn-back" onClick={onBack}>← Back</button> : null}
                {step < STEPS.length - 1 && <button className="rb-btn" onClick={() => setStep((s) => s + 1)}>Next: {STEPS[step + 1]} →</button>}
                {step === STEPS.length - 1 && (
                  <button className="rb-btn" onClick={() => { if(onContinue) onContinue(allData); }}>
                    Next: Add Job Description to Optimize →
                  </button>
                )}
              </div>
            </div>

            <div className="rb-preview-col" style={{position: 'sticky', top: 0}}>
              <div className="rb-preview-label">Live Preview</div>
              <LivePreview data={allData} selectedTemplate={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}