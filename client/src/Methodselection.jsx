import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .ms-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-family: 'Inter', sans-serif;
  }

  .ms-card {
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px;
    padding: 2.5rem;
    width: 100%;
    max-width: 520px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .ms-steps {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 2rem;
  }

  .ms-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transition: all 0.2s;
  }

  .ms-dot.active {
    background: #a78bfa;
    width: 24px;
    border-radius: 4px;
  }

  .ms-heading {
    font-size: 22px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 6px;
    line-height: 1.3;
  }

  .ms-subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 1.75rem;
    line-height: 1.5;
  }

  .ms-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 1.75rem;
  }

  .ms-option {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    padding: 1.1rem 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    user-select: none;
  }

  .ms-option:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(167, 139, 250, 0.45);
  }

  .ms-option.selected {
    border-color: #a78bfa;
    background: rgba(167, 139, 250, 0.1);
    box-shadow: 0 0 0 1px #a78bfa, 0 0 14px rgba(167, 139, 250, 0.25);
  }

  .ms-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }

  .ms-option.selected .ms-icon {
    background: rgba(167, 139, 250, 0.18);
  }

  .ms-icon svg {
    width: 20px;
    height: 20px;
  }

  .ms-text {
    flex: 1;
  }

  .ms-title {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: 3px;
  }

  .ms-desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.4;
  }

  .ms-radio {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.2s;
  }

  .ms-option.selected .ms-radio {
    border-color: #a78bfa;
  }

  .ms-radio-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #a78bfa;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.2s, transform 0.2s;
  }

  .ms-option.selected .ms-radio-dot {
    opacity: 1;
    transform: scale(1);
  }

  .ms-btn {
    width: 100%;
    padding: 13px;
    border-radius: 12px;
    border: none;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    background: linear-gradient(135deg, #a78bfa, #7c3aed);
    color: #ffffff;
    letter-spacing: 0.01em;
  }

  .ms-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .ms-btn:not(:disabled):hover {
    opacity: 0.88;
  }

  .ms-btn:not(:disabled):active {
    transform: scale(0.985);
  }
`;

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);

const ScratchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const options = [
  {
    id: "upload",
    title: "I already have a resume",
    desc: "Upload your existing resume and we'll help you enhance it",
    Icon: UploadIcon,
  },
  {
    id: "scratch",
    title: "Start from scratch",
    desc: "Build a brand new resume step by step with guided prompts",
    Icon: ScratchIcon,
  },
];

export default function MethodSelection({ onContinue }) {
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (selected && onContinue) onContinue(selected);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ms-wrapper">
        <div className="ms-card">
          <div className="ms-steps">
            <div className="ms-dot" />
            <div className="ms-dot active" />
            <div className="ms-dot" />
            <div className="ms-dot" />
          </div>

          <h1 className="ms-heading">How will you make your resume?</h1>
          <p className="ms-subtitle">Choose how you want to start building your resume</p>

          <div className="ms-options">
            {options.map(({ id, title, desc, Icon }) => (
              <div
                key={id}
                className={`ms-option${selected === id ? " selected" : ""}`}
                onClick={() => setSelected(id)}
              >
                <div className="ms-icon">
                  <Icon />
                </div>
                <div className="ms-text">
                  <div className="ms-title">{title}</div>
                  <div className="ms-desc">{desc}</div>
                </div>
                <div className="ms-radio">
                  <div className="ms-radio-dot" />
                </div>
              </div>
            ))}
          </div>

          <button className="ms-btn" disabled={!selected} onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
}