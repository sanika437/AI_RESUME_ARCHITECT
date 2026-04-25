import { useState } from "react";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.083 17.64 11.775 17.64 9.2z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.909-2.258c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
    <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.576c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.576 9 3.576z" fill="#EA4335"/>
  </svg>
);
const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="url(#sp)"/>
    <defs><linearGradient id="sp" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#60a5fa"/></linearGradient></defs>
  </svg>
);
const EyeOpen = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>);
const EyeClosed = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>);
const CheckIcon = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const LockIcon = () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>);

function getStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return [{score:0,label:"",color:""},{score:1,label:"Weak",color:"#f87171"},{score:2,label:"Fair",color:"#fbbf24"},{score:3,label:"Good",color:"#60a5fa"},{score:4,label:"Strong",color:"#34d399"}][s];
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Epilogue:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .ar{font-family:'Epilogue',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px;background:#07070f;position:relative;overflow:hidden}
  .ar-bg{position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse 70% 60% at 15% 10%,rgba(88,28,235,.28) 0%,transparent 65%),radial-gradient(ellipse 55% 50% at 85% 90%,rgba(37,99,235,.22) 0%,transparent 65%),linear-gradient(160deg,#0a0714 0%,#07070f 50%,#060c1a 100%)}
  .ar-grid{position:fixed;inset:0;z-index:1;background-image:linear-gradient(rgba(139,92,246,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.055) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)}
  .ar-orb{position:fixed;border-radius:50%;filter:blur(72px);z-index:0;pointer-events:none;animation:orbFloat 12s ease-in-out infinite alternate}
  .ar-orb-1{width:500px;height:500px;top:-160px;left:-130px;background:radial-gradient(circle,rgba(109,40,217,.35) 0%,rgba(67,20,180,.12) 55%,transparent 70%)}
  .ar-orb-2{width:440px;height:440px;bottom:-140px;right:-120px;background:radial-gradient(circle,rgba(37,99,235,.30) 0%,rgba(29,78,216,.10) 55%,transparent 70%);animation-delay:-5s}
  @keyframes orbFloat{0%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-18px) scale(1.04)}66%{transform:translate(-18px,26px) scale(.97)}100%{transform:translate(12px,8px) scale(1.02)}}
  .ar-card{position:relative;z-index:10;width:100%;max-width:440px;background:rgba(15,12,30,.65);backdrop-filter:blur(28px) saturate(160%);-webkit-backdrop-filter:blur(28px) saturate(160%);border:1px solid rgba(139,92,246,.18);border-radius:28px;padding:42px 40px 38px;box-shadow:0 0 0 1px rgba(255,255,255,.04) inset,0 8px 32px rgba(0,0,0,.55),0 40px 80px rgba(0,0,0,.4),0 0 80px rgba(109,40,217,.10);animation:cardIn .55s cubic-bezier(.22,1,.36,1) both}
  .ar-card::before{content:'';position:absolute;top:0;left:20%;right:20%;height:1px;background:linear-gradient(90deg,transparent,rgba(167,139,250,.65),rgba(96,165,250,.45),transparent);border-radius:999px}
  @keyframes cardIn{from{opacity:0;transform:translateY(32px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
  .ar-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px 5px 8px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.25);border-radius:999px;font-size:11px;font-weight:600;color:#c4b5fd;letter-spacing:.05em;text-transform:uppercase;margin-bottom:24px;animation:fadeUp .5s .10s cubic-bezier(.22,1,.36,1) both}
  .ar-heading{font-family:'Bricolage Grotesque',sans-serif;font-size:29px;font-weight:800;line-height:1.15;letter-spacing:-.03em;color:#f1f0ff;margin-bottom:8px;animation:fadeUp .5s .15s cubic-bezier(.22,1,.36,1) both}
  .ar-grad{background:linear-gradient(95deg,#a78bfa 0%,#818cf8 45%,#60a5fa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .ar-sub{font-size:13.5px;color:rgba(148,163,184,.68);line-height:1.55;margin-bottom:30px;font-weight:400;animation:fadeUp .5s .18s cubic-bezier(.22,1,.36,1) both}
  .ar-tabs{display:flex;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:4px;margin-bottom:26px;gap:4px;animation:fadeUp .5s .22s cubic-bezier(.22,1,.36,1) both}
  .ar-tab{flex:1;padding:9px 0;border:none;border-radius:10px;font-family:'Epilogue',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .25s ease;background:transparent;color:rgba(148,163,184,.5);letter-spacing:.01em}
  .ar-tab.active{background:linear-gradient(135deg,rgba(109,40,217,.55),rgba(67,56,202,.55));color:#e0d9ff;box-shadow:0 2px 12px rgba(109,40,217,.30),0 0 0 1px rgba(139,92,246,.22) inset}
  .ar-tab:not(.active):hover{color:rgba(200,190,255,.6)}
  .ar-btn-google{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:13px 16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10);border-radius:14px;font-family:'Epilogue',sans-serif;font-size:14px;font-weight:500;color:#cbd5e1;cursor:pointer;transition:all .22s ease;margin-bottom:22px;animation:fadeUp .5s .26s cubic-bezier(.22,1,.36,1) both}
  .ar-btn-google:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.18);color:#e2e8f0;transform:translateY(-1px);box-shadow:0 6px 24px rgba(0,0,0,.3)}
  .ar-divider{display:flex;align-items:center;gap:12px;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(148,163,184,.32);margin-bottom:22px;animation:fadeUp .5s .28s cubic-bezier(.22,1,.36,1) both}
  .ar-divider::before,.ar-divider::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(139,92,246,.18),transparent)}
  .ar-fields{animation:fadeUp .5s .30s cubic-bezier(.22,1,.36,1) both}
  .ar-field{margin-bottom:16px}
  .ar-label{display:block;font-size:11.5px;font-weight:600;color:rgba(167,139,250,.68);letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px}
  .ar-wrap{position:relative}
  .ar-input{width:100%;padding:13px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(139,92,246,.15);border-radius:13px;font-family:'Epilogue',sans-serif;font-size:14px;color:#e2e8f0;outline:none;transition:border-color .22s,box-shadow .22s,background .22s;box-sizing:border-box;letter-spacing:.01em}
  .ar-input::placeholder{color:rgba(100,116,139,.5)}
  .ar-input:focus{border-color:rgba(139,92,246,.55);background:rgba(139,92,246,.06);box-shadow:0 0 0 3px rgba(139,92,246,.12),0 0 20px rgba(139,92,246,.08)}
  .ar-input.pr{padding-right:46px}
  .ar-input.match{border-color:rgba(52,211,153,.45);box-shadow:0 0 0 3px rgba(52,211,153,.08)}
  .ar-eye{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(100,116,139,.55);padding:2px;display:flex;align-items:center;transition:color .18s}
  .ar-eye:hover{color:rgba(167,139,250,.85)}
  .ar-strength{margin-top:9px;display:flex;align-items:center;gap:8px}
  .ar-strength-bars{display:flex;gap:4px;flex:1}
  .ar-strength-bar{height:3px;flex:1;border-radius:99px;background:rgba(255,255,255,.07);transition:background .3s ease}
  .ar-strength-txt{font-size:11px;font-weight:600;min-width:38px;text-align:right;letter-spacing:.03em}
  .ar-forgot{text-align:right;margin-top:-6px;margin-bottom:6px}
  .ar-forgot a{font-size:12px;color:rgba(139,92,246,.75);text-decoration:none;font-weight:500;transition:color .18s}
  .ar-forgot a:hover{color:#a78bfa}
  .ar-btn-primary{width:100%;padding:14px;background:linear-gradient(135deg,#7c3aed 0%,#4f46e5 60%,#4338ca 100%);border:none;border-radius:14px;font-family:'Epilogue',sans-serif;font-size:14px;font-weight:700;color:#fff;cursor:pointer;letter-spacing:.02em;transition:all .22s ease;box-shadow:0 4px 20px rgba(109,40,217,.45),0 0 0 1px rgba(167,139,250,.15) inset;margin-top:10px;position:relative;overflow:hidden;animation:fadeUp .5s .36s cubic-bezier(.22,1,.36,1) both}
  .ar-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(109,40,217,.55),0 0 0 1px rgba(167,139,250,.25) inset}
  .ar-btn-primary:active{transform:translateY(0)}
  .ar-switch{text-align:center;margin-top:20px;font-size:13px;color:rgba(100,116,139,.68);animation:fadeUp .5s .40s cubic-bezier(.22,1,.36,1) both}
  .ar-switch button{background:none;border:none;font-family:'Epilogue',sans-serif;font-size:13px;font-weight:600;color:#a78bfa;cursor:pointer;margin-left:5px;padding:0;transition:color .18s}
  .ar-switch button:hover{color:#c4b5fd}
  .ar-trust{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:22px;padding-top:20px;border-top:1px solid rgba(139,92,246,.10);font-size:11px;color:rgba(100,116,139,.48);letter-spacing:.02em;animation:fadeUp .5s .44s cubic-bezier(.22,1,.36,1) both}
  .ar-trust-dot{width:6px;height:6px;border-radius:50%;background:#34d399;box-shadow:0 0 8px rgba(52,211,153,.7);flex-shrink:0}
  .ar-terms{font-size:11px;color:rgba(100,116,139,.48);text-align:center;margin-top:12px;line-height:1.6}
  .ar-terms a{color:rgba(139,92,246,.65);text-decoration:none}
  .ar-terms a:hover{color:#a78bfa}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @media(max-width:480px){.ar-card{padding:30px 22px 26px}.ar-heading{font-size:24px}}
`;

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });

  const isLogin = mode === "login";
  const strength = getStrength(form.password);
  const pwMatch = form.confirm && form.confirm === form.password;
  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const switchMode = (m) => { setMode(m); setForm({ email: "", password: "", confirm: "" }); setShowPw(false); setShowCf(false); };
  const handleSubmit = (e) => { e.preventDefault(); if (onLogin) onLogin(); };

  return (
    <>
      <style>{CSS}</style>
      <div className="ar">
        <div className="ar-bg" /><div className="ar-grid" />
        <div className="ar-orb ar-orb-1" /><div className="ar-orb ar-orb-2" />
        <div className="ar-card">
          <div className="ar-badge"><SparkleIcon /> AI Resume Builder</div>
          <h1 className="ar-heading">{isLogin ? <>Welcome <span className="ar-grad">back</span></> : <>Start <span className="ar-grad">building</span></>}</h1>
          <p className="ar-sub">{isLogin ? "Sign in to access your resumes and templates." : "Create your free account — no credit card required."}</p>
          <div className="ar-tabs">
            {["login","signup"].map((m) => (
              <button key={m} className={`ar-tab${mode===m?" active":""}`} onClick={() => switchMode(m)}>
                {m==="login"?"Sign In":"Sign Up"}
              </button>
            ))}
          </div>
          <button className="ar-btn-google" type="button" onClick={() => onLogin && onLogin()}>
            <GoogleIcon /> Continue with Google
          </button>
          <div className="ar-divider">or continue with email</div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="ar-fields">
              <div className="ar-field">
                <label className="ar-label" htmlFor="email">Email address</label>
                <div className="ar-wrap">
                  <input id="email" name="email" type="email" autoComplete="email" className="ar-input" placeholder="you@example.com" value={form.email} onChange={change} />
                </div>
              </div>
              <div className="ar-field">
                <label className="ar-label" htmlFor="password">Password</label>
                <div className="ar-wrap">
                  <input id="password" name="password" type={showPw?"text":"password"} autoComplete={isLogin?"current-password":"new-password"} className="ar-input pr" placeholder={isLogin?"Enter your password":"Create a strong password"} value={form.password} onChange={change} />
                  <button type="button" className="ar-eye" onClick={() => setShowPw(v=>!v)}>{showPw?<EyeClosed/>:<EyeOpen/>}</button>
                </div>
                {!isLogin && form.password.length>0 && (
                  <div className="ar-strength">
                    <div className="ar-strength-bars">{[1,2,3,4].map(i=><div key={i} className="ar-strength-bar" style={{background:i<=strength.score?strength.color:undefined}}/>)}</div>
                    <span className="ar-strength-txt" style={{color:strength.color}}>{strength.label}</span>
                  </div>
                )}
              </div>
              {!isLogin && (
                <div className="ar-field">
                  <label className="ar-label" htmlFor="confirm">Confirm password</label>
                  <div className="ar-wrap">
                    <input id="confirm" name="confirm" type={showCf?"text":"password"} autoComplete="new-password" className={`ar-input pr${pwMatch?" match":""}`} placeholder="Repeat your password" value={form.confirm} onChange={change} />
                    <button type="button" className="ar-eye" onClick={()=>setShowCf(v=>!v)} style={{color:pwMatch?"#34d399":undefined}}>
                      {pwMatch?<CheckIcon/>:showCf?<EyeClosed/>:<EyeOpen/>}
                    </button>
                  </div>
                </div>
              )}
            </div>
            {isLogin && <div className="ar-forgot"><a href="#forgot">Forgot password?</a></div>}
            <button type="submit" className="ar-btn-primary">{isLogin?"Sign In":"Create Account"}</button>
            {!isLogin && <p className="ar-terms">By signing up you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</p>}
            <div className="ar-switch">
              {isLogin?"Don't have an account?":"Already have an account?"}
              <button type="button" onClick={()=>switchMode(isLogin?"signup":"login")}>{isLogin?"Sign up":"Sign in"}</button>
            </div>
          </form>
          <div className="ar-trust"><div className="ar-trust-dot"/><LockIcon/>End-to-end encrypted · SOC 2 Type II</div>
        </div>
      </div>
    </>
  );
}
