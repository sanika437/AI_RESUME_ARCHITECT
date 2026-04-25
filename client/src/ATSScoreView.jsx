import { useState, useEffect, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Epilogue:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .ats-page{min-height:100vh;background:#07070f;display:flex;flex-direction:column;align-items:center;padding:40px 20px 80px;position:relative;overflow:hidden;font-family:'Epilogue',sans-serif}
  .ats-bg{position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse 55% 50% at 15% 15%,rgba(16,185,129,.15) 0%,transparent 60%),radial-gradient(ellipse 50% 45% at 80% 80%,rgba(88,28,235,.18) 0%,transparent 60%),#07070f}
  .ats-grid{position:fixed;inset:0;z-index:1;background-image:linear-gradient(rgba(16,185,129,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,.03) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%)}
  .ats-inner{position:relative;z-index:10;width:100%;max-width:760px}
  .ats-top-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;animation:atsFadeUp .5s cubic-bezier(.22,1,.36,1) both}
  .ats-back-btn{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:9px 16px;font-family:'Epilogue',sans-serif;font-size:13px;font-weight:500;color:rgba(200,195,230,.7);cursor:pointer;transition:all .2s}
  .ats-back-btn:hover{background:rgba(255,255,255,.09);color:#e2e8f0}
  .ats-home-btn{display:flex;align-items:center;gap:8px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.25);border-radius:10px;padding:9px 16px;font-family:'Epilogue',sans-serif;font-size:13px;font-weight:600;color:#c4b5fd;cursor:pointer;transition:all .2s}
  .ats-home-btn:hover{background:rgba(139,92,246,.22);transform:translateY(-1px)}
  .ats-heading{font-family:'Bricolage Grotesque',sans-serif;font-size:32px;font-weight:800;color:#f1f0ff;letter-spacing:-.03em;margin-bottom:8px;animation:atsFadeUp .5s .1s cubic-bezier(.22,1,.36,1) both}
  .ats-sub{font-size:14px;color:rgba(148,163,184,.6);margin-bottom:36px;animation:atsFadeUp .5s .15s cubic-bezier(.22,1,.36,1) both}
  .ats-score-hero{background:rgba(15,12,30,.7);backdrop-filter:blur(24px);border:1px solid rgba(16,185,129,.2);border-radius:24px;padding:40px;display:flex;align-items:center;gap:48px;margin-bottom:24px;animation:atsFadeUp .5s .2s cubic-bezier(.22,1,.36,1) both;box-shadow:0 8px 48px rgba(0,0,0,.4),0 0 60px rgba(16,185,129,.08)}
  .ats-ring-wrap{flex-shrink:0;position:relative}
  .ats-ring-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
  .ats-ring-score{font-family:'Bricolage Grotesque',sans-serif;font-size:42px;font-weight:800;line-height:1;background:linear-gradient(135deg,#34d399,#10b981);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .ats-ring-unit{font-size:13px;color:rgba(148,163,184,.6);margin-top:2px;font-weight:500}
  .ats-score-meta{flex:1;min-width:0}
  .ats-score-grade{font-size:22px;font-weight:700;color:#34d399;margin-bottom:6px;font-family:'Bricolage Grotesque',sans-serif}
  .ats-score-desc{font-size:14px;color:rgba(148,163,184,.7);line-height:1.6;margin-bottom:16px}
  .ats-score-tags{display:flex;flex-wrap:wrap;gap:8px}
  .ats-tag{display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;font-size:11.5px;font-weight:600;letter-spacing:.02em}
  .ats-tag-pass{background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.25);color:#6ee7b7}
  .ats-tag-warn{background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.25);color:#fcd34d}
  .ats-breakdown{background:rgba(15,12,30,.7);backdrop-filter:blur(20px);border:1px solid rgba(139,92,246,.12);border-radius:20px;padding:28px 32px;margin-bottom:24px;animation:atsFadeUp .5s .28s cubic-bezier(.22,1,.36,1) both}
  .ats-breakdown-title{font-size:15px;font-weight:700;color:#e2e8f0;margin-bottom:20px;display:flex;align-items:center;gap:8px}
  .ats-bar-item{margin-bottom:16px}
  .ats-bar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px}
  .ats-bar-label{font-size:13px;font-weight:500;color:rgba(200,195,230,.8)}
  .ats-bar-score{font-size:13px;font-weight:700}
  .ats-bar-track{height:7px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden}
  .ats-bar-fill{height:100%;border-radius:99px;transition:width 1.4s cubic-bezier(.22,1,.36,1);width:0}
  .ats-keywords{background:rgba(15,12,30,.7);backdrop-filter:blur(20px);border:1px solid rgba(139,92,246,.12);border-radius:20px;padding:28px 32px;margin-bottom:24px;animation:atsFadeUp .5s .35s cubic-bezier(.22,1,.36,1) both}
  .ats-kw-grid{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
  .ats-kw{padding:5px 13px;border-radius:7px;font-size:12px;font-weight:500;font-family:'Epilogue',sans-serif}
  .ats-kw-found{background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.22);color:#6ee7b7}
  .ats-kw-missing{background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.2);color:#fca5a5;text-decoration:line-through;opacity:.7}
  .ats-tips{background:rgba(15,12,30,.7);backdrop-filter:blur(20px);border:1px solid rgba(139,92,246,.12);border-radius:20px;padding:28px 32px;animation:atsFadeUp .5s .42s cubic-bezier(.22,1,.36,1) both}
  .ats-tip-item{display:flex;gap:12px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.05)}
  .ats-tip-item:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none}
  .ats-tip-icon{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .ats-tip-text{flex:1}
  .ats-tip-title{font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px}
  .ats-tip-desc{font-size:12px;color:rgba(148,163,184,.6);line-height:1.6}
  @keyframes atsFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @media(max-width:600px){.ats-score-hero{flex-direction:column;text-align:center;padding:28px 20px}.ats-breakdown,.ats-keywords,.ats-tips{padding:20px}.ats-heading{font-size:26px}}
`;

const CATEGORIES = [
  { label: "Keyword Match",      score: 87, color: "#34d399" },
  { label: "Formatting",         score: 94, color: "#34d399" },
  { label: "Readability",        score: 78, color: "#60a5fa" },
  { label: "Quantified Impact",  score: 72, color: "#fbbf24" },
  { label: "Section Completeness", score: 91, color: "#34d399" },
  { label: "Job Title Match",    score: 95, color: "#34d399" },
];

const OVERALL = 86;

const KEYWORDS_FOUND = ["React", "TypeScript", "Node.js", "REST API", "Agile", "CI/CD", "AWS", "PostgreSQL", "Docker"];
const KEYWORDS_MISSING = ["GraphQL", "Redis", "Kubernetes"];

const TIPS = [
  { icon: "💡", color: "rgba(251,191,36,.12)", border: "rgba(251,191,36,.25)", title: "Add quantified impact", desc: "Include specific metrics (e.g. '40% faster load time', '$2M revenue impact') in your experience bullets." },
  { icon: "🔍", color: "rgba(248,113,113,.1)", border: "rgba(248,113,113,.2)", title: "Missing keywords: GraphQL, Redis", desc: "Add these technologies to your skills or experience if you have exposure to them." },
  { icon: "✅", color: "rgba(52,211,153,.1)", border: "rgba(52,211,153,.22)", title: "Great formatting", desc: "Your resume uses a clean single-column layout that ATS systems parse with high accuracy." },
];

function AnimatedRing({ score }) {
  const r = 68, cx = 80, cy = 80;
  const circ = 2 * Math.PI * r;
  const [dash, setDash] = useState(circ);

  useEffect(() => {
    const t = setTimeout(() => setDash(circ * (1 - score / 100)), 300);
    return () => clearTimeout(t);
  }, [score, circ]);

  return (
    <svg width="160" height="160" viewBox="0 0 160 160">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="10" />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="url(#atsGrad)" strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={dash}
        transform="rotate(-90 80 80)"
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)" }}
      />
      <defs>
        <linearGradient id="atsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BarItem({ label, score, color, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setWidth(score), 400 + delay);
    return () => clearTimeout(t);
  }, [score, delay]);

  const textColor = score >= 80 ? "#34d399" : score >= 60 ? "#fbbf24" : "#f87171";

  return (
    <div className="ats-bar-item">
      <div className="ats-bar-header">
        <span className="ats-bar-label">{label}</span>
        <span className="ats-bar-score" style={{ color: textColor }}>{score}%</span>
      </div>
      <div className="ats-bar-track">
        <div className="ats-bar-fill" style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
      </div>
    </div>
  );
}

export default function ATSScoreView({ appData, onBack, onHome }) {
  const jd = appData?.jobDescription || {};

  return (
    <>
      <style>{CSS}</style>
      <div className="ats-page">
        <div className="ats-bg" /><div className="ats-grid" />
        <div className="ats-inner">
          <div className="ats-top-bar">
            <button className="ats-back-btn" onClick={onBack}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back to Resume
            </button>
            <button className="ats-home-btn" onClick={onHome}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Start Over
            </button>
          </div>

          <h1 className="ats-heading">ATS Score Report</h1>
          <p className="ats-sub">
            {jd.role ? `Analyzed for "${jd.role}" — ` : ""}
            Your resume scored <strong style={{color:"#34d399"}}>{OVERALL}/100</strong> against ATS filters.
          </p>

          {/* Hero Score */}
          <div className="ats-score-hero">
            <div className="ats-ring-wrap">
              <AnimatedRing score={OVERALL} />
              <div className="ats-ring-label">
                <span className="ats-ring-score">{OVERALL}</span>
                <span className="ats-ring-unit">/ 100</span>
              </div>
            </div>
            <div className="ats-score-meta">
              <div className="ats-score-grade">Excellent Match 🎉</div>
              <p className="ats-score-desc">
                Your resume is highly optimized and likely to pass most ATS systems. A few minor improvements can push it closer to 95+.
              </p>
              <div className="ats-score-tags">
                <span className="ats-tag ats-tag-pass">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ATS Compatible
                </span>
                <span className="ats-tag ats-tag-pass">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Keyword Rich
                </span>
                <span className="ats-tag ats-tag-warn">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
                  3 keywords missing
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="ats-breakdown">
            <div className="ats-breakdown-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Score Breakdown
            </div>
            {CATEGORIES.map((c, i) => (
              <BarItem key={c.label} label={c.label} score={c.score} color={c.color} delay={i * 80} />
            ))}
          </div>

          {/* Keywords */}
          <div className="ats-keywords">
            <div className="ats-breakdown-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Keyword Analysis
            </div>
            <p style={{fontSize:12,color:"rgba(148,163,184,.6)",marginBottom:4}}>Found in your resume ({KEYWORDS_FOUND.length}) · Missing ({KEYWORDS_MISSING.length})</p>
            <div className="ats-kw-grid">
              {KEYWORDS_FOUND.map(k => <span key={k} className="ats-kw ats-kw-found">✓ {k}</span>)}
              {KEYWORDS_MISSING.map(k => <span key={k} className="ats-kw ats-kw-missing">✗ {k}</span>)}
            </div>
          </div>

          {/* Tips */}
          <div className="ats-tips">
            <div className="ats-breakdown-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Improvement Tips
            </div>
            {TIPS.map((tip, i) => (
              <div key={i} className="ats-tip-item">
                <div className="ats-tip-icon" style={{background:tip.color,border:`1px solid ${tip.border}`}}>{tip.icon}</div>
                <div className="ats-tip-text">
                  <div className="ats-tip-title">{tip.title}</div>
                  <div className="ats-tip-desc">{tip.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
