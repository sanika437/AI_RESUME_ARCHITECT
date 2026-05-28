import { useState, useEffect, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Epilogue:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Epilogue',sans-serif;background:#07070f;color:#e2e8f0;overflow-x:hidden}
  
  /* ── NAV ── */
  .lp-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:18px 48px;backdrop-filter:blur(20px);border-bottom:1px solid rgba(139,92,246,.1);background:rgba(7,7,15,.7);transition:all .3s}
  .lp-logo{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:800;background:linear-gradient(95deg,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-.03em;cursor:pointer}
  .lp-nav-links{display:flex;align-items:center;gap:32px}
  .lp-nav-links a{font-size:14px;font-weight:500;color:rgba(148,163,184,.7);text-decoration:none;transition:color .2s;cursor:pointer}
  .lp-nav-links a:hover{color:#a78bfa}
  .lp-nav-cta{display:flex;align-items:center;gap:12px}
  .lp-btn-ghost{padding:9px 20px;border:1px solid rgba(139,92,246,.3);border-radius:10px;font-family:'Epilogue',sans-serif;font-size:13px;font-weight:600;color:#a78bfa;background:transparent;cursor:pointer;transition:all .22s}
  .lp-btn-ghost:hover{background:rgba(139,92,246,.1);border-color:rgba(139,92,246,.6)}
  .lp-btn-primary{padding:9px 22px;border:none;border-radius:10px;font-family:'Epilogue',sans-serif;font-size:13px;font-weight:700;color:#fff;background:linear-gradient(135deg,#7c3aed,#4f46e5);cursor:pointer;transition:all .22s;box-shadow:0 4px 16px rgba(124,58,237,.35)}
  .lp-btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(124,58,237,.5)}

  /* ── BG ── */
  .lp-bg{position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse 70% 60% at 15% 10%,rgba(88,28,235,.22) 0%,transparent 65%),radial-gradient(ellipse 55% 50% at 85% 90%,rgba(37,99,235,.18) 0%,transparent 65%),linear-gradient(160deg,#0a0714 0%,#07070f 50%,#060c1a 100%)}
  .lp-grid{position:fixed;inset:0;z-index:1;background-image:linear-gradient(rgba(139,92,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.04) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)}
  .lp-orb{position:fixed;border-radius:50%;filter:blur(80px);z-index:0;pointer-events:none;animation:orbFloat 14s ease-in-out infinite alternate}
  .lp-orb-1{width:600px;height:600px;top:-200px;left:-150px;background:radial-gradient(circle,rgba(109,40,217,.28) 0%,transparent 70%)}
  .lp-orb-2{width:500px;height:500px;bottom:-160px;right:-130px;background:radial-gradient(circle,rgba(37,99,235,.22) 0%,transparent 70%);animation-delay:-6s}
  @keyframes orbFloat{0%{transform:translate(0,0)}50%{transform:translate(30px,-20px)}100%{transform:translate(-15px,25px)}}

  /* ── HERO ── */
  .lp-hero{position:relative;z-index:10;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:100px 24px 60px}
  .lp-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.3);border-radius:999px;font-size:12px;font-weight:600;color:#c4b5fd;letter-spacing:.06em;text-transform:uppercase;margin-bottom:32px;animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both}
  .lp-badge-dot{width:6px;height:6px;background:#a78bfa;border-radius:50%;animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  .lp-hero-h1{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(48px,7vw,88px);font-weight:800;line-height:1.0;letter-spacing:-.04em;color:#f1f0ff;margin-bottom:24px;animation:fadeUp .6s .1s cubic-bezier(.22,1,.36,1) both}
  .lp-grad{background:linear-gradient(95deg,#a78bfa 0%,#818cf8 45%,#60a5fa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .lp-hero-sub{font-size:clamp(16px,2vw,20px);color:rgba(148,163,184,.75);max-width:580px;line-height:1.65;margin-bottom:44px;font-weight:400;animation:fadeUp .6s .2s cubic-bezier(.22,1,.36,1) both}
  .lp-hero-btns{display:flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:center;animation:fadeUp .6s .3s cubic-bezier(.22,1,.36,1) both}
  .lp-btn-cta{padding:15px 36px;border:none;border-radius:14px;font-family:'Epilogue',sans-serif;font-size:16px;font-weight:700;color:#fff;background:linear-gradient(135deg,#7c3aed,#4f46e5);cursor:pointer;transition:all .25s;box-shadow:0 6px 24px rgba(124,58,237,.4)}
  .lp-btn-cta:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(124,58,237,.55)}
  .lp-btn-outline{padding:15px 36px;border:1px solid rgba(139,92,246,.35);border-radius:14px;font-family:'Epilogue',sans-serif;font-size:16px;font-weight:600;color:#a78bfa;background:rgba(139,92,246,.06);cursor:pointer;transition:all .25s}
  .lp-btn-outline:hover{background:rgba(139,92,246,.14);border-color:rgba(139,92,246,.6)}
  .lp-hero-stats{display:flex;align-items:center;gap:40px;margin-top:56px;padding-top:40px;border-top:1px solid rgba(139,92,246,.12);animation:fadeUp .6s .4s cubic-bezier(.22,1,.36,1) both}
  .lp-stat-num{font-family:'Bricolage Grotesque',sans-serif;font-size:32px;font-weight:800;color:#f1f0ff;line-height:1}
  .lp-stat-label{font-size:12px;color:rgba(148,163,184,.55);font-weight:500;margin-top:4px;letter-spacing:.04em;text-transform:uppercase}
  .lp-stat-div{width:1px;height:40px;background:rgba(139,92,246,.18)}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

  /* ── HOW IT WORKS ── */
  .lp-section{position:relative;z-index:10;padding:100px 48px}
  .lp-section-label{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#a78bfa;margin-bottom:16px}
  .lp-section-h2{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(32px,4vw,52px);font-weight:800;letter-spacing:-.03em;color:#f1f0ff;line-height:1.1;margin-bottom:16px}
  .lp-section-sub{font-size:17px;color:rgba(148,163,184,.65);max-width:520px;line-height:1.65}
  .lp-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;margin-top:56px}
  .lp-step{background:rgba(15,12,30,.6);border:1px solid rgba(139,92,246,.12);border-radius:20px;padding:32px;position:relative;transition:all .3s;overflow:hidden}
  .lp-step::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(167,139,250,.4),transparent)}
  .lp-step:hover{border-color:rgba(139,92,246,.3);transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,.4)}
  .lp-step-num{font-family:'Bricolage Grotesque',sans-serif;font-size:56px;font-weight:800;color:rgba(139,92,246,.15);line-height:1;margin-bottom:16px}
  .lp-step-icon{font-size:28px;margin-bottom:16px}
  .lp-step-h{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:700;color:#f1f0ff;margin-bottom:8px}
  .lp-step-p{font-size:14px;color:rgba(148,163,184,.65);line-height:1.65}

  /* ── FEATURES ── */
  .lp-features{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:56px}
  .lp-feat{background:rgba(15,12,30,.5);border:1px solid rgba(139,92,246,.1);border-radius:16px;padding:28px;transition:all .3s;position:relative;overflow:hidden}
  .lp-feat-big{grid-column:span 2}
  .lp-feat:hover{border-color:rgba(139,92,246,.25);background:rgba(15,12,30,.75)}
  .lp-feat-tag{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:rgba(139,92,246,.1);border:1px solid rgba(139,92,246,.2);border-radius:999px;font-size:11px;font-weight:600;color:#a78bfa;letter-spacing:.05em;text-transform:uppercase;margin-bottom:16px}
  .lp-feat-h{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:700;color:#f1f0ff;margin-bottom:10px}
  .lp-feat-p{font-size:14px;color:rgba(148,163,184,.65);line-height:1.7}
  .lp-feat-icon-wrap{width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,rgba(124,58,237,.2),rgba(79,70,229,.2));border:1px solid rgba(139,92,246,.2);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:20px}

  /* ── TESTIMONIALS ── */
  .lp-testimonials{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:56px}
  .lp-testi{background:rgba(15,12,30,.5);border:1px solid rgba(139,92,246,.1);border-radius:18px;padding:28px;transition:all .3s}
  .lp-testi:hover{border-color:rgba(139,92,246,.22)}
  .lp-testi-stars{color:#fbbf24;font-size:14px;margin-bottom:14px;letter-spacing:2px}
  .lp-testi-text{font-size:15px;color:rgba(203,213,225,.75);line-height:1.7;margin-bottom:20px;font-style:italic}
  .lp-testi-author{display:flex;align-items:center;gap:12px}
  .lp-testi-avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#4f46e5);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;flex-shrink:0}
  .lp-testi-name{font-size:14px;font-weight:600;color:#e2e8f0}
  .lp-testi-role{font-size:12px;color:rgba(148,163,184,.5)}

  /* ── FAQ ── */
  .lp-faq{max-width:720px;margin:56px auto 0}
  .lp-faq-item{border-bottom:1px solid rgba(139,92,246,.1);padding:20px 0;cursor:pointer}
  .lp-faq-q{display:flex;justify-content:space-between;align-items:center;font-size:16px;font-weight:600;color:#e2e8f0}
  .lp-faq-a{font-size:14px;color:rgba(148,163,184,.65);line-height:1.7;margin-top:14px;max-height:0;overflow:hidden;transition:max-height .3s ease}
  .lp-faq-a.open{max-height:200px}
  .lp-faq-icon{transition:transform .3s;color:#a78bfa;font-size:18px;flex-shrink:0}
  .lp-faq-icon.open{transform:rotate(45deg)}

  /* ── CTA SECTION ── */
  .lp-cta-section{position:relative;z-index:10;padding:100px 48px;text-align:center}
  .lp-cta-card{max-width:720px;margin:0 auto;background:linear-gradient(135deg,rgba(124,58,237,.15),rgba(79,70,229,.1));border:1px solid rgba(139,92,246,.25);border-radius:28px;padding:64px 48px;position:relative;overflow:hidden}
  .lp-cta-card::before{content:'';position:absolute;top:0;left:20%;right:20%;height:1px;background:linear-gradient(90deg,transparent,rgba(167,139,250,.6),transparent)}
  .lp-cta-h{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(28px,4vw,44px);font-weight:800;color:#f1f0ff;letter-spacing:-.03em;margin-bottom:16px}
  .lp-cta-p{font-size:16px;color:rgba(148,163,184,.65);margin-bottom:36px;line-height:1.65}

  /* ── FOOTER ── */
  .lp-footer{position:relative;z-index:10;border-top:1px solid rgba(139,92,246,.1);padding:40px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
  .lp-footer-logo{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:800;background:linear-gradient(95deg,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .lp-footer-links{display:flex;gap:24px}
  .lp-footer-links a{font-size:13px;color:rgba(148,163,184,.5);text-decoration:none;cursor:pointer;transition:color .2s}
  .lp-footer-links a:hover{color:#a78bfa}
  .lp-footer-copy{font-size:12px;color:rgba(148,163,184,.35)}

  @media(max-width:768px){
    .lp-nav{padding:16px 20px}
    .lp-nav-links{display:none}
    .lp-section{padding:70px 20px}
    .lp-features{grid-template-columns:1fr}
    .lp-feat-big{grid-column:span 1}
    .lp-hero-stats{gap:24px}
    .lp-cta-section{padding:70px 20px}
    .lp-cta-card{padding:40px 24px}
    .lp-footer{padding:32px 20px;flex-direction:column;text-align:center}
  }
`;

const steps = [
  { num: "01", icon: "📄", h: "Upload or Build Resume", p: "Upload your existing resume PDF or build one from scratch using our elegant template editor." },
  { num: "02", icon: "🎯", h: "Paste Job Description", p: "Paste any job listing and our JD Analysis Agent will extract and rank the most critical ATS keywords." },
  { num: "03", icon: "🤖", h: "AI Rewrites & Optimizes", p: "Our AI rewrites your bullet points to match the JD, boosting your ATS Score and making you stand out." },
  { num: "04", icon: "⬇️", h: "Download Pixel-Perfect PDF", p: "Get a professionally formatted, ATS-ready resume PDF instantly — ready to send to any employer." },
];

// Resume Dashboard feature removed
const features = [
  { tag: "Core", icon: "🧠", h: "Intelligent ATS Scoring", p: "Get a real-time ATS compatibility score that shows exactly how well your resume matches the job requirements. Know your chances before you apply.", big: true },
  { tag: "AI Powered", icon: "✍️", h: "Smart Rewrite Engine", p: "The AI rewrites every bullet point to sound authoritative, measurable, and keyword-rich — without losing your authentic voice." },
  { tag: "Instant", icon: "⚡", h: "Live Preview", p: "See changes reflected instantly as you edit. Split-screen view so you always know what your final PDF will look like." },
  { tag: "Pro", icon: "💌", h: "Cover Letter Generator", p: "Auto-generate a tailored cover letter matching the JD in seconds. Never start from a blank page again." },
];

const testimonials = [
  { stars: "★★★★★", text: "CareerForge Pro rewrote my resume so well that I got 3 interview calls in a week after months of silence. The ATS score went from 42% to 91%!", name: "Priya Sharma", role: "Software Engineer, Pune", avatar: "PS" },
  { stars: "★★★★★", text: "I was skeptical about AI resume tools, but this one actually understands context. It didn't just stuff keywords — it made my experience sound genuinely impressive.", name: "Rahul Mehta", role: "Product Manager, Mumbai", avatar: "RM" },
  { stars: "★★★★★", text: "The cover letter generator alone is worth the Pro subscription. Generated a perfect, tailored letter in under 30 seconds. Unbelievable.", name: "Ananya Singh", role: "UX Designer, Bangalore", avatar: "AS" },
];

const faqs = [
  { q: "Will the AI change the content of my resume?", a: "The AI rewrites your bullet points to better align with the job description keywords, making them sound more impactful. You are always in control — you can review and edit every suggestion before downloading." },
  { q: "What is an ATS and why does it matter?", a: "ATS (Applicant Tracking System) is software used by 99% of Fortune 500 companies to automatically screen resumes before a human even sees them. If your resume isn't optimized for ATS, it gets rejected before reaching the recruiter." },
  { q: "What resume formats are supported for upload?", a: "We support PDF and DOCX file formats for upload. You can also build a resume from scratch using our template editor." },
  { q: "How is my data kept private?", a: "Your resume data is encrypted in transit and at rest. We never share your personal information with third parties. You can delete your data anytime from your dashboard." },
  { q: "Can I cancel my Pro subscription anytime?", a: "Yes, absolutely. You can cancel anytime from your account settings with no hidden fees or penalties. You'll retain Pro access until the end of your billing period." },
];

export default function LandingPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <style>{CSS}</style>
      <div className="lp-bg" />
      <div className="lp-grid" />
      <div className="lp-orb lp-orb-1" />
      <div className="lp-orb lp-orb-2" />

      {/* NAV — only Sign In and Sign Up, no "Get Started Free" */}
      <nav className="lp-nav">
        <div className="lp-logo">CareerForge Pro</div>
        <div className="lp-nav-links">
          <a onClick={() => document.getElementById('how')?.scrollIntoView({behavior:'smooth'})}>How it Works</a>
          <a onClick={() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'})}>Features</a>
          <a onClick={() => document.getElementById('faq')?.scrollIntoView({behavior:'smooth'})}>FAQ</a>
        </div>
        <div className="lp-nav-cta">
          <button className="lp-btn-ghost" onClick={() => onNavigate("auth", { tab: "login" })}>Sign In</button>
          <button className="lp-btn-primary" onClick={() => onNavigate("auth", { tab: "signup" })}>Sign Up</button>
        </div>
      </nav>

      {/* HERO — "Optimize My Resume Free" button removed */}
      <section className="lp-hero">
        <div className="lp-badge">
          <span className="lp-badge-dot" />
          AI-Powered · ATS Optimized · Instant
        </div>
        <h1 className="lp-hero-h1">
          Land Your Dream Job<br />
          <span className="lp-grad">With an AI Resume</span>
        </h1>
        <p className="lp-hero-sub">
          CareerForge Pro rewrites your resume to perfectly match any job description,
          boosting your ATS score and getting you noticed by real humans — not filters.
        </p>
        <div className="lp-hero-btns">
          <button className="lp-btn-outline" onClick={() => document.getElementById('how')?.scrollIntoView({behavior:'smooth'})}>
            See How It Works
          </button>
        </div>
        <div className="lp-hero-stats">
          <div>
            <div className="lp-stat-num">94%</div>
            <div className="lp-stat-label">Avg ATS Score Lift</div>
          </div>
          <div className="lp-stat-div" />
          <div>
            <div className="lp-stat-num">12K+</div>
            <div className="lp-stat-label">Resumes Optimized</div>
          </div>
          <div className="lp-stat-div" />
          <div>
            <div className="lp-stat-num">3x</div>
            <div className="lp-stat-label">More Interview Calls</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="lp-section" id="how">
        <div className="lp-section-label">The Process</div>
        <h2 className="lp-section-h2">From Upload to <span className="lp-grad">Interview-Ready</span></h2>
        <p className="lp-section-sub">Four simple steps to transform your resume into a job-winning document optimized for every application.</p>
        <div className="lp-steps">
          {steps.map(s => (
            <div className="lp-step" key={s.num}>
              <div className="lp-step-num">{s.num}</div>
              <div className="lp-step-icon">{s.icon}</div>
              <div className="lp-step-h">{s.h}</div>
              <p className="lp-step-p">{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES — Resume Dashboard removed */}
      <section className="lp-section" id="features" style={{paddingTop:0}}>
        <div className="lp-section-label">Features</div>
        <h2 className="lp-section-h2">Everything You Need to <span className="lp-grad">Get Hired</span></h2>
        <p className="lp-section-sub">Not just a resume builder — a complete AI career toolkit built for the modern job market.</p>
        <div className="lp-features">
          {features.map(f => (
            <div className={`lp-feat ${f.big ? 'lp-feat-big' : ''}`} key={f.h}>
              <div className="lp-feat-icon-wrap">{f.icon}</div>
              <div className="lp-feat-tag">{f.tag}</div>
              <div className="lp-feat-h">{f.h}</div>
              <p className="lp-feat-p">{f.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION REMOVED */}

      {/* TESTIMONIALS */}
      <section className="lp-section" style={{paddingTop:0}}>
        <div className="lp-section-label">Testimonials</div>
        <h2 className="lp-section-h2">Real People. <span className="lp-grad">Real Results.</span></h2>
        <div className="lp-testimonials">
          {testimonials.map(t => (
            <div className="lp-testi" key={t.name}>
              <div className="lp-testi-stars">{t.stars}</div>
              <p className="lp-testi-text">"{t.text}"</p>
              <div className="lp-testi-author">
                <div className="lp-testi-avatar">{t.avatar}</div>
                <div>
                  <div className="lp-testi-name">{t.name}</div>
                  <div className="lp-testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-section" id="faq" style={{paddingTop:0}}>
        <div style={{textAlign:'center'}}>
          <div className="lp-section-label">FAQ</div>
          <h2 className="lp-section-h2">Got <span className="lp-grad">Questions?</span></h2>
        </div>
        <div className="lp-faq">
          {faqs.map((f, i) => (
            <div className="lp-faq-item" key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="lp-faq-q">
                {f.q}
                <span className={`lp-faq-icon ${openFaq === i ? 'open' : ''}`}>+</span>
              </div>
              <div className={`lp-faq-a ${openFaq === i ? 'open' : ''}`}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta-section">
        <div className="lp-cta-card">
          <h2 className="lp-cta-h">Your Next Job is One<br /><span className="lp-grad">Optimized Resume Away</span></h2>
          <p className="lp-cta-p">Join thousands of job seekers who've already landed interviews using CareerForge Pro.</p>
          <button className="lp-btn-cta" onClick={() => onNavigate("auth", { tab: "signup" })}>
            Get Started →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-logo">CareerForge Pro</div>
        <div className="lp-footer-links">
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
          <a>Contact</a>
        </div>
        <div className="lp-footer-copy">© 2025 Zaalima Development. All rights reserved.</div>
      </footer>
    </>
  );
}
