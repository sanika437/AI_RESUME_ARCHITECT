import { useState, useRef, useEffect, useCallback } from "react";

const injectStyles = () => {
  const id = "resume-start-styles";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

    @keyframes rs-floatA {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(38px,-52px) scale(1.09); }
    }
    @keyframes rs-floatB {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(-28px,42px) scale(1.06); }
    }
    @keyframes rs-floatC {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(22px,22px) scale(1.11); }
    }
    @keyframes rs-fadeUp {
      from { opacity:0; transform:translateY(30px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes rs-pulse {
      0%,100% { opacity:.55; transform:scale(1); }
      50%      { opacity:1;   transform:scale(1.3); }
    }
    @keyframes rs-checkBounce {
      0%   { transform:scale(0) rotate(-20deg); opacity:0; }
      60%  { transform:scale(1.22) rotate(4deg); opacity:1; }
      100% { transform:scale(1) rotate(0deg); opacity:1; }
    }
    @keyframes rs-chipIn {
      from { opacity:0; transform:translateY(8px) scale(.96); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
    @keyframes rs-shake {
      0%,100% { transform:translateX(0); }
      20%      { transform:translateX(-7px); }
      40%      { transform:translateX(7px); }
      60%      { transform:translateX(-4px); }
      80%      { transform:translateX(4px); }
    }
    @keyframes rs-glowPulse {
      0%,100% { box-shadow:0 0 22px rgba(139,92,246,.22), inset 0 1px 0 rgba(255,255,255,.06); }
      50%      { box-shadow:0 0 38px rgba(139,92,246,.36), inset 0 1px 0 rgba(255,255,255,.09); }
    }
    @keyframes rs-successRing {
      0%   { box-shadow:0 0 0 0 rgba(52,211,153,.45); }
      70%  { box-shadow:0 0 0 12px rgba(52,211,153,0); }
      100% { box-shadow:0 0 0 0 rgba(52,211,153,0); }
    }

    .rs-upload-zone { transition: border-color .24s ease, background .24s ease, box-shadow .24s ease, transform .24s cubic-bezier(.22,1,.36,1); }
    .rs-upload-zone:hover:not(.rs-zone-success) { border-color: rgba(139,92,246,.68)!important; background: rgba(139,92,246,.06)!important; box-shadow: 0 0 32px rgba(139,92,246,.2)!important; transform: translateY(-2px); }
    .rs-upload-zone:focus-visible { outline: 2px solid rgba(139,92,246,.6); outline-offset: 3px; }
    .rs-zone-drag { border-color: rgba(139,92,246,.9)!important; background: rgba(139,92,246,.11)!important; box-shadow: 0 0 50px rgba(139,92,246,.3)!important; transform: translateY(-3px) scale(1.012)!important; }
    .rs-zone-success { border-color: rgba(52,211,153,.75)!important; background: rgba(52,211,153,.045)!important; box-shadow: 0 0 36px rgba(52,211,153,.22)!important; animation: rs-successRing .6s ease forwards; }

    .rs-create-card { transition: border-color .24s ease, background .24s ease, box-shadow .24s ease, transform .24s cubic-bezier(.22,1,.36,1); }
    .rs-create-card:hover:not(.rs-create-active) { border-color: rgba(96,165,250,.52)!important; background: rgba(96,165,250,.06)!important; box-shadow: 0 0 28px rgba(96,165,250,.15)!important; transform: translateY(-2px); }
    .rs-create-active { border-color: rgba(96,165,250,.82)!important; background: rgba(96,165,250,.09)!important; box-shadow: 0 0 36px rgba(96,165,250,.24)!important; }

    .rs-browse-btn { transition: background .18s ease, border-color .18s ease, transform .15s ease; }
    .rs-browse-btn:hover { background: rgba(139,92,246,.22)!important; border-color: rgba(139,92,246,.5)!important; transform: translateY(-1px); }
    .rs-browse-btn:active { transform: scale(.97); }

    .rs-cont-btn { transition: transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s ease, filter .22s ease, opacity .22s ease; }
    .rs-cont-btn:not(:disabled):hover { transform: translateY(-3px)!important; box-shadow: 0 12px 44px rgba(124,58,237,.52)!important; filter: brightness(1.1); }
    .rs-cont-btn:not(:disabled):active { transform: scale(.98)!important; }
    .rs-cont-btn:disabled { opacity: .38; cursor: not-allowed; filter: grayscale(.4); }

    .rs-ani-1 { animation: rs-fadeUp .58s .00s cubic-bezier(.22,1,.36,1) both; }
    .rs-ani-2 { animation: rs-fadeUp .58s .08s cubic-bezier(.22,1,.36,1) both; }
    .rs-ani-3 { animation: rs-fadeUp .58s .16s cubic-bezier(.22,1,.36,1) both; }
    .rs-ani-4 { animation: rs-fadeUp .58s .24s cubic-bezier(.22,1,.36,1) both; }
    .rs-ani-5 { animation: rs-fadeUp .58s .32s cubic-bezier(.22,1,.36,1) both; }
    .rs-ani-6 { animation: rs-fadeUp .58s .40s cubic-bezier(.22,1,.36,1) both; }

    @media (max-width: 600px) {
      .rs-card-inner { padding: 1.5rem 1.1rem!important; }
      .rs-heading  { font-size: 1.65rem!important; }
    }
  `;
  document.head.appendChild(style);
};

/* ─── SVG Icons ─────────────────────────────────────────── */
const IconUpload = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#rsUpG)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="rsUpG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const IconCheck = ({ size = 28, color = "url(#rsCheckG)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ animation: "rs-checkBounce .38s cubic-bezier(.34,1.56,.64,1) both" }}>
    <defs>
      <linearGradient id="rsCheckG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#6ee7b7" />
      </linearGradient>
    </defs>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconEdit = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#rsEditG)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="rsEditG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const IconFile = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const IconLock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconCheckCircle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="url(#rsCCG)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="rsCCG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#6ee7b7" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

/* ─── Main Component ─────────────────────────────────────── */
export default function ResumeStartPage({ onContinue, onBack }) {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // "upload" | "create"
  const [isDragging, setIsDragging] = useState(false);
  const [shaking, setShaking] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => { injectStyles(); }, []);

  const processFile = useCallback((f) => {
    if (!f) return;
    setFile(f);
    setUploaded(true);
    setSelectedOption("upload");
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  }, [processFile]);

  const handleFileInput = (e) => {
    const f = e.target.files[0];
    if (f) processFile(f);
    e.target.value = "";
  };

  const handleContinue = () => {
    const canContinue = uploaded || selectedOption === "create";
    if (!canContinue) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    if (onContinue) onContinue(file);
  };

  const canContinue = uploaded || selectedOption === "create";

  /* zone class */
  const zoneClass = [
    "rs-upload-zone",
    isDragging ? "rs-zone-drag" : "",
    uploaded ? "rs-zone-success" : "",
  ].filter(Boolean).join(" ");

  const createClass = [
    "rs-create-card",
    selectedOption === "create" ? "rs-create-active" : "",
  ].filter(Boolean).join(" ");

  const ext = file ? file.name.split(".").pop().toUpperCase() : "";
  const kb  = file ? (file.size / 1024).toFixed(0) : "";

  /* ─── Render ──────────────────────────────────────────── */
  return (
    <div style={{
      minHeight: "100vh",
      background: "#06060e",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1.5rem",
      fontFamily: "'Sora', sans-serif",
    }}>

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage:
          "linear-gradient(rgba(139,92,246,.042) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(139,92,246,.042) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }} />

      {/* Orbs */}
      <div style={{
        position:"absolute", width:520, height:520, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(139,92,246,.2) 0%, transparent 70%)",
        top:-170, left:-140, animation:"rs-floatA 10s ease-in-out infinite",
        pointerEvents:"none", zIndex:0,
      }} />
      <div style={{
        position:"absolute", width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(96,165,250,.17) 0%, transparent 70%)",
        bottom:-110, right:-90, animation:"rs-floatB 13s ease-in-out infinite",
        pointerEvents:"none", zIndex:0,
      }} />
      <div style={{
        position:"absolute", width:250, height:250, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(168,85,247,.13) 0%, transparent 70%)",
        bottom:200, left:60, animation:"rs-floatC 8s ease-in-out infinite",
        pointerEvents:"none", zIndex:0,
      }} />

      {/* Content */}
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:600 }}>

        {/* ── Header ── */}
        <div className="rs-ani-1" style={{ textAlign:"center", marginBottom:"2.4rem" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(139,92,246,.12)", border:"1px solid rgba(139,92,246,.28)",
            borderRadius:100, padding:"5px 15px", marginBottom:"1.1rem",
          }}>
            <span style={{
              width:7, height:7, borderRadius:"50%",
              background:"linear-gradient(135deg,#a855f7,#60a5fa)",
              animation:"rs-pulse 2s ease-in-out infinite", display:"inline-block",
            }} />
            <span style={{ fontSize:12, color:"rgba(168,130,246,.95)", letterSpacing:".05em", fontWeight:500 }}>
              Resume Builder
            </span>
          </div>
          <h1 className="rs-heading" style={{
            margin:"0 0 .65rem",
            fontSize:"2.1rem", fontWeight:700, letterSpacing:"-.022em", lineHeight:1.2,
            background:"linear-gradient(135deg,#e2d9f3 0%,#a78bfa 42%,#60a5fa 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          }}>Start Your Resume</h1>
          <p style={{
            margin:0, color:"rgba(175,170,205,.58)", fontSize:".91rem",
            fontFamily:"'DM Sans',sans-serif", lineHeight:1.65,
          }}>
            Upload your existing resume or create a new one from scratch
          </p>
        </div>

        {/* ── Glass card ── */}
        <div className="rs-ani-2 rs-card-inner" style={{
          background:"rgba(255,255,255,.027)",
          backdropFilter:"blur(26px)", WebkitBackdropFilter:"blur(26px)",
          border:"1px solid rgba(255,255,255,.09)",
          borderRadius:22, padding:"2.2rem 2rem",
          boxShadow:"0 8px 56px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.06)",
          animation:"rs-glowPulse 5s 1s ease-in-out infinite",
        }}>

          {/* Section label */}
          <p className="rs-ani-2" style={{
            margin:"0 0 .85rem", fontSize:".74rem", fontWeight:600,
            color:"rgba(175,170,205,.44)", letterSpacing:".1em", textTransform:"uppercase",
          }}>Upload Resume</p>

          {/* ── Drop zone ── */}
          <div className="rs-ani-3">
            <div
              className={zoneClass}
              style={{
                border: uploaded
                  ? "2px solid rgba(52,211,153,.7)"
                  : "2px dashed rgba(139,92,246,.32)",
                borderRadius:16, padding:"2.2rem 1.2rem",
                textAlign:"center", cursor:"pointer",
                background: uploaded ? "rgba(52,211,153,.04)" : "rgba(139,92,246,.025)",
                position:"relative",
              }}
              role="button" tabIndex={0}
              onClick={() => !uploaded && fileRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && !uploaded && fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); if (!uploaded) setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {/* Icon area */}
              <div style={{
                margin:"0 auto 1rem",
                width:58, height:58, borderRadius:16,
                background: uploaded
                  ? "linear-gradient(135deg,rgba(52,211,153,.2),rgba(110,231,183,.14))"
                  : "linear-gradient(135deg,rgba(139,92,246,.2),rgba(96,165,250,.15))",
                border: uploaded
                  ? "1px solid rgba(52,211,153,.3)"
                  : "1px solid rgba(139,92,246,.28)",
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .22s ease",
              }}>
                {uploaded ? <IconCheck size={28} /> : <IconUpload size={26} />}
              </div>

              {uploaded ? (
                <>
                  {/* Success state */}
                  <p style={{ margin:"0 0 .28rem", fontSize:".96rem", fontWeight:600, color:"rgba(52,211,153,.95)" }}>
                    Resume uploaded successfully
                  </p>
                  <div style={{
                    display:"inline-flex", alignItems:"center", gap:8,
                    background:"rgba(52,211,153,.13)", border:"1px solid rgba(52,211,153,.28)",
                    borderRadius:9, padding:"6px 14px", marginTop:".9rem",
                    animation:"rs-chipIn .3s ease both",
                    fontFamily:"'DM Sans',sans-serif",
                  }}>
                    <IconFile size={13} />
                    <span style={{ fontSize:".8rem", color:"rgba(167,240,210,.88)", fontWeight:500 }}>
                      {file?.name}
                    </span>
                    <span style={{ fontSize:".75rem", color:"rgba(167,240,210,.5)", marginLeft:2 }}>
                      {ext} · {kb}KB
                    </span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:".85rem" }}>
                    <IconCheckCircle />
                    <span style={{ fontSize:".79rem", color:"rgba(110,231,183,.7)", fontFamily:"'DM Sans',sans-serif" }}>
                      File ready to use
                    </span>
                  </div>
                  <button
                    className="rs-browse-btn"
                    style={{
                      marginTop:"1rem", display:"inline-flex", alignItems:"center", gap:6,
                      background:"rgba(52,211,153,.1)", border:"1px solid rgba(52,211,153,.25)",
                      borderRadius:9, padding:"6px 16px", fontSize:".79rem",
                      color:"rgba(110,231,183,.85)", fontWeight:500, cursor:"pointer",
                      fontFamily:"'Sora',sans-serif",
                    }}
                    onClick={(e) => { e.stopPropagation(); setFile(null); setUploaded(false); setSelectedOption(null); fileRef.current?.click(); }}
                  >
                    Replace file
                  </button>
                </>
              ) : (
                <>
                  <p style={{ margin:"0 0 .28rem", fontSize:".96rem", fontWeight:600, color:"rgba(222,216,242,.9)" }}>
                    Drop your resume here
                  </p>
                  <p style={{ margin:"0 0 1.1rem", fontSize:".79rem", color:"rgba(150,144,178,.5)", fontFamily:"'DM Sans',sans-serif" }}>
                    Supports PDF, DOC, DOCX — up to 10MB
                  </p>
                  <button
                    className="rs-browse-btn"
                    style={{
                      display:"inline-flex", alignItems:"center", gap:6,
                      background:"rgba(139,92,246,.13)", border:"1px solid rgba(139,92,246,.28)",
                      borderRadius:9, padding:"7px 18px", fontSize:".81rem",
                      color:"rgba(172,138,250,.95)", fontWeight:500, cursor:"pointer",
                      fontFamily:"'Sora',sans-serif",
                    }}
                    onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                  >
                    <IconUpload size={13} />
                    Browse files
                  </button>
                </>
              )}

              <input
                ref={fileRef} type="file" accept=".pdf,.doc,.docx"
                style={{ display:"none" }} onChange={handleFileInput}
              />
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="rs-ani-4" style={{ display:"flex", alignItems:"center", gap:"1rem", margin:"1.7rem 0" }}>
            <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,.07))" }} />
            <span style={{ fontSize:".75rem", color:"rgba(150,144,178,.4)", fontWeight:600, letterSpacing:".1em" }}>OR</span>
            <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(255,255,255,.07),transparent)" }} />
          </div>

          {/* Section label */}
          <p className="rs-ani-4" style={{
            margin:"0 0 .85rem", fontSize:".74rem", fontWeight:600,
            color:"rgba(175,170,205,.44)", letterSpacing:".1em", textTransform:"uppercase",
          }}>Create from Scratch</p>

          {/* ── Create card ── */}
          <div className={`rs-ani-5 ${createClass}`}
            style={{
              border:"1px solid rgba(96,165,250,.2)",
              borderRadius:16, padding:"1.35rem 1.5rem",
              background:"rgba(96,165,250,.025)",
              display:"flex", alignItems:"center", gap:"1.1rem",
              cursor:"pointer", userSelect:"none",
            }}
            role="button" tabIndex={0}
            onClick={() => setSelectedOption("create")}
            onKeyDown={(e) => e.key === "Enter" && setSelectedOption("create")}
          >
            <div style={{
              width:50, height:50, borderRadius:14, flexShrink:0,
              background:"linear-gradient(135deg,rgba(96,165,250,.2),rgba(139,92,246,.16))",
              border:"1px solid rgba(96,165,250,.22)",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all .2s ease",
            }}>
              <IconEdit size={22} />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ margin:"0 0 .22rem", fontSize:".97rem", fontWeight:600, color:"rgba(225,218,245,.92)" }}>
                Create Resume from Scratch
              </p>
              <p style={{ margin:0, fontSize:".79rem", color:"rgba(148,142,172,.56)", fontFamily:"'DM Sans',sans-serif", lineHeight:1.5 }}>
                Build a professional resume step-by-step with guided sections
              </p>
            </div>
            {/* Check ring */}
            <div style={{
              width:22, height:22, borderRadius:"50%", flexShrink:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all .22s ease",
              border: selectedOption === "create" ? "1.5px solid transparent" : "1.5px solid rgba(96,165,250,.3)",
              background: selectedOption === "create"
                ? "linear-gradient(135deg,#60a5fa,#a855f7)"
                : "transparent",
              boxShadow: selectedOption === "create" ? "0 0 14px rgba(96,165,250,.42)" : "none",
            }}>
              {selectedOption === "create" && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ animation:"rs-checkBounce .35s cubic-bezier(.34,1.56,.64,1) both" }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>

          {/* ── Continue button ── */}
          <div className="rs-ani-6" style={{ marginTop:"1.9rem" }}>
            <button
              className="rs-cont-btn"
              style={{
                width:"100%", padding:".92rem",
                border:"none", borderRadius:13,
                background: canContinue
                  ? "linear-gradient(135deg,#7c3aed 0%,#4f46e5 50%,#2563eb 100%)"
                  : "linear-gradient(135deg,rgba(124,58,237,.4) 0%,rgba(79,70,229,.4) 50%,rgba(37,99,235,.4) 100%)",
                color:"#fff", fontSize:".96rem", fontWeight:600,
                cursor: canContinue ? "pointer" : "not-allowed",
                letterSpacing:".01em",
                boxShadow: canContinue ? "0 4px 30px rgba(124,58,237,.38)" : "none",
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                fontFamily:"'Sora',sans-serif",
                animation: shaking ? "rs-shake .42s ease" : "none",
              }}
              disabled={!canContinue}
              onClick={handleContinue}
            >
              {canContinue ? (
                <>{selectedOption ? "Continue" : "Continue"} <IconArrow /></>
              ) : (
                "Select an option to continue"
              )}
            </button>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="rs-ani-6" style={{ textAlign:"center", marginTop:"1.3rem" }}>
          <p style={{
            margin:0, fontSize:".73rem", color:"rgba(115,110,140,.4)",
            fontFamily:"'DM Sans',sans-serif",
            display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          }}>
            <IconLock />
            Your data is encrypted and never shared
          </p>
        </div>
      </div>
    </div>
  );
}