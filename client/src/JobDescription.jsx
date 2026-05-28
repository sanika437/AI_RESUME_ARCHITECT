import { useState } from "react";

const EXPERIENCE_LEVELS = [
  { value: "", label: "Select experience level" },
  { value: "fresher", label: "Fresher" },
  { value: "1-3", label: "1–3 Years" },
  { value: "3-5", label: "3–5 Years" },
  { value: "5+", label: "5+ Years" },
];

export default function JobDescriptionForm({ onContinue, onBack, mode }) {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const handleSubmit = () => {
    if (!role || !experience || !jobDesc) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onContinue) onContinue({ role, experience, jobDesc });
    }, 2000);
  };

  const isValid = role.trim() && experience && jobDesc.trim();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Epilogue:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Epilogue', sans-serif;
          background: #06060e;
          min-height: 100vh;
        }

        .page-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse 90% 70% at 50% 0%, #1a0e2e 0%, #06060e 60%);
        }

        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.45;
          z-index: 0;
        }
        .orb-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, #7c3aed 0%, #4f1d96 60%, transparent 100%);
          top: -160px; left: -120px;
          animation: drift1 14s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 440px; height: 440px;
          background: radial-gradient(circle, #0ea5e9 0%, #0369a1 60%, transparent 100%);
          bottom: -140px; right: -100px;
          animation: drift2 18s ease-in-out infinite alternate;
        }
        .orb-3 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, #f472b6 0%, #be185d 60%, transparent 100%);
          top: 40%; left: 60%;
          opacity: 0.2;
          animation: drift3 22s ease-in-out infinite alternate;
        }

        @keyframes drift1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes drift2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-30px, -40px) scale(1.1); }
        }
        @keyframes drift3 {
          from { transform: translate(0, 0); }
          to   { transform: translate(-50px, 30px); }
        }

        .grid-overlay {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        .glass-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 560px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(24px) saturate(1.4);
          -webkit-backdrop-filter: blur(24px) saturate(1.4);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 28px;
          padding: clamp(32px, 6vw, 52px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 80px rgba(0,0,0,0.55),
            0 4px 16px rgba(0,0,0,0.3);
          animation: cardIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .card-top-line {
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.7) 30%, rgba(99,179,237,0.7) 70%, transparent);
          border-radius: 1px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(167,139,250,0.25);
          border-radius: 100px;
          padding: 5px 13px 5px 9px;
          font-size: 0.72rem;
          font-weight: 500;
          color: #c4b5fd;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 20px;
          animation: cardIn 0.7s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .badge-pulse {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 0 0 rgba(167,139,250,0.5);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%  { box-shadow: 0 0 0 0 rgba(167,139,250,0.5); }
          70% { box-shadow: 0 0 0 7px rgba(167,139,250,0); }
          100%{ box-shadow: 0 0 0 0 rgba(167,139,250,0); }
        }

        .heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(1.9rem, 5vw, 2.6rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: #f1f0f5;
          margin-bottom: 10px;
          animation: cardIn 0.7s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .heading-accent {
          background: linear-gradient(90deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.38);
          line-height: 1.6;
          font-weight: 300;
          margin-bottom: 36px;
          max-width: 360px;
          animation: cardIn 0.7s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent);
          margin-bottom: 32px;
          animation: cardIn 0.7s 0.22s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          animation: cardIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .field:nth-child(1) { animation-delay: 0.25s; }
        .field:nth-child(2) { animation-delay: 0.3s; }
        .field:nth-child(3) { animation-delay: 0.35s; }
        .field:nth-child(4) { animation-delay: 0.4s; }

        .field-label {
          font-family: 'Epilogue', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          display: flex;
          align-items: center;
        }

        .field-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .char-count {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.2);
          font-weight: 400;
        }

        .inp {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 14px 18px;
          font-family: 'Epilogue', sans-serif;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.85);
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          appearance: none;
        }
        .inp::placeholder { color: rgba(255,255,255,0.2); }
        .inp:hover {
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.06);
        }
        .inp:focus {
          border-color: rgba(167,139,250,0.55);
          background: rgba(167,139,250,0.06);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.1), 0 0 20px rgba(167,139,250,0.08);
        }

        .select-wrap { position: relative; }
        .select-wrap select { padding-right: 42px; cursor: pointer; }
        .select-arrow {
          position: absolute;
          right: 15px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: rgba(255,255,255,0.3);
          transition: color 0.2s;
        }
        .select-wrap:hover .select-arrow { color: rgba(255,255,255,0.5); }

        .inp-textarea {
          resize: vertical;
          min-height: 148px;
          line-height: 1.65;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 480px) {
          .two-col { grid-template-columns: 1fr; }
        }

        .btn-wrap {
          padding-top: 8px;
          animation: cardIn 0.7s 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .btn {
          width: 100%;
          position: relative;
          overflow: hidden;
          padding: 16px 28px;
          border: none;
          border-radius: 16px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #fff;
          cursor: pointer;
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 40%, #4c1d95 100%);
          box-shadow:
            0 0 0 1px rgba(167,139,250,0.2),
            0 4px 24px rgba(109,40,217,0.45),
            0 1px 4px rgba(0,0,0,0.3);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, opacity 0.15s ease;
        }
        .btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
          border-radius: inherit;
          pointer-events: none;
        }
        .btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .btn:not(:disabled):hover::after { left: 160%; }
        .btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 0 1px rgba(167,139,250,0.3),
            0 8px 32px rgba(109,40,217,0.55),
            0 2px 8px rgba(0,0,0,0.4);
        }
        .btn:not(:disabled):active {
          transform: translateY(0) scale(0.99);
          box-shadow: 0 2px 12px rgba(109,40,217,0.35);
        }
        .btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          position: relative;
          z-index: 1;
        }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .hint {
          text-align: center;
          margin-top: 11px;
          font-size: 0.74rem;
          color: rgba(255,255,255,0.18);
          animation: cardIn 0.5s 0.5s both;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 7px 14px;
          font-family: 'Epilogue', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(200,195,230,0.65);
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 20px;
          animation: cardIn 0.5s 0.05s both;
        }
        .back-btn:hover {
          background: rgba(255,255,255,0.09);
          color: rgba(230,225,255,0.9);
          border-color: rgba(167,139,250,0.3);
        }

        .footer-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 28px;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.18);
          animation: cardIn 0.7s 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .footer-note svg { opacity: 0.5; }

        .step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px; height: 20px;
          border-radius: 6px;
          background: rgba(167,139,250,0.12);
          border: 1px solid rgba(167,139,250,0.2);
          font-size: 0.65rem;
          font-weight: 700;
          color: #a78bfa;
          flex-shrink: 0;
          margin-right: 6px;
        }
      `}</style>

      <div className="page-wrap">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />

        <div className="glass-card">
          <div className="card-top-line" />

          {onBack && (
            <button className="back-btn" onClick={onBack}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>
          )}

          <div className="badge">
            <span className="badge-pulse" />
            AI-Powered Resume Builder
          </div>

          <h1 className="heading">
            Enter Job<br />
            <span className="heading-accent">Description</span>
          </h1>

          <p className="subtitle">
            Paste any job posting and our AI will craft a perfectly tailored resume that speaks directly to what hiring managers want.
          </p>

          <div className="divider" />

          <div className="field-group">
            <div className="two-col">
              <div className="field">
                <label className="field-label">
                  <span className="step-num">1</span> Job Role
                </label>
                <input
                  className="inp"
                  type="text"
                  placeholder="e.g. Product Designer"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  onFocus={() => setFocused("role")}
                  onBlur={() => setFocused("")}
                />
              </div>

              <div className="field">
                <label className="field-label">
                  <span className="step-num">2</span> Experience
                </label>
                <div className="select-wrap">
                  <select
                    className="inp"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    onFocus={() => setFocused("exp")}
                    onBlur={() => setFocused("")}
                  >
                    {EXPERIENCE_LEVELS.map(opt => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={!opt.value}
                        style={{ background: "#1a1030", color: opt.value ? "#f0edff" : "#6b5b95" }}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <span className="select-arrow">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2.5 4.5L6.5 8.5L10.5 4.5" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="field-label-row">
                <label className="field-label">
                  <span className="step-num">3</span> Job Description
                </label>
                <span className="char-count">{jobDesc.length} chars</span>
              </div>
              <textarea
                className="inp inp-textarea"
                placeholder="Paste the full job description here — responsibilities, required skills, qualifications, and any other details…"
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
                onFocus={() => setFocused("desc")}
                onBlur={() => setFocused("")}
                rows={6}
              />
            </div>

            <div className="btn-wrap">
              <button
                className="btn"
                disabled={!isValid || loading}
                onClick={handleSubmit}
              >
                <span className="btn-inner">
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Generating your resume…
                    </>
                  ) : (
                    <>
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path d="M8.5 1.5L10.7 6.3L16 7.1L12.2 10.8L13.1 16L8.5 13.6L3.9 16L4.8 10.8L1 7.1L6.3 6.3L8.5 1.5Z"
                          fill="rgba(255,255,255,0.9)" />
                      </svg>
                      Generate Optimized Resume
                    </>
                  )}
                </span>
              </button>

              {!isValid && !loading && (
                <p className="hint">Complete all fields above to continue →</p>
              )}
            </div>
          </div>

          <div className="footer-note">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Encrypted & secure — your data is never stored
          </div>
        </div>
      </div>
    </>
  );
}
