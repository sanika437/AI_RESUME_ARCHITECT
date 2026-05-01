import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to put your actual publishable key here if you want it to redirect properly.
// Since we don't have the public key in env, we'll assume standard flow or a placeholder.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Epilogue:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Epilogue',sans-serif;background:#07070f;color:#e2e8f0;overflow-x:hidden}
  
  .db-bg{position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse 70% 60% at 15% 10%,rgba(88,28,235,.15) 0%,transparent 65%),radial-gradient(ellipse 55% 50% at 85% 90%,rgba(37,99,235,.12) 0%,transparent 65%),linear-gradient(160deg,#0a0714 0%,#07070f 50%,#060c1a 100%)}
  .db-grid{position:fixed;inset:0;z-index:1;background-image:linear-gradient(rgba(139,92,246,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.03) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)}
  
  .db-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:18px 48px;backdrop-filter:blur(20px);border-bottom:1px solid rgba(139,92,246,.1);background:rgba(7,7,15,.7)}
  .db-logo{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:800;background:linear-gradient(95deg,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-.03em;}
  .db-nav-right{display:flex;align-items:center;gap:20px}
  .db-user{font-size:14px;font-weight:600;color:#c4b5fd}
  .db-logout{padding:8px 16px;border:1px solid rgba(248,113,113,.3);border-radius:8px;font-size:13px;font-weight:600;color:#f87171;background:transparent;cursor:pointer;transition:all .2s}
  .db-logout:hover{background:rgba(248,113,113,.1);border-color:rgba(248,113,113,.6)}

  .db-container{position:relative;z-index:10;max-width:1200px;margin:100px auto 40px;padding:0 24px;animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both}
  
  .db-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:40px}
  .db-welcome{font-family:'Bricolage Grotesque',sans-serif;font-size:36px;font-weight:800;color:#f1f0ff;letter-spacing:-.02em;margin-bottom:8px}
  .db-sub{font-size:16px;color:rgba(148,163,184,.7)}
  .db-btn-primary{padding:12px 24px;border:none;border-radius:12px;font-family:'Epilogue',sans-serif;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#7c3aed,#4f46e5);cursor:pointer;transition:all .22s;box-shadow:0 4px 16px rgba(124,58,237,.35);display:flex;align-items:center;gap:8px}
  .db-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(124,58,237,.5)}

  .db-grid-section{display:grid;grid-template-columns:2fr 1fr;gap:24px}
  
  .db-card{background:rgba(15,12,30,.6);border:1px solid rgba(139,92,246,.12);border-radius:20px;padding:28px;backdrop-filter:blur(10px)}
  .db-card-title{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:700;color:#f1f0ff;margin-bottom:20px;display:flex;align-items:center;gap:10px}
  
  .db-history-list{display:flex;flex-direction:column;gap:12px}
  .db-history-item{display:flex;justify-content:space-between;align-items:center;padding:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);border-radius:12px;transition:all .2s}
  .db-history-item:hover{background:rgba(255,255,255,.06);border-color:rgba(139,92,246,.3)}
  .db-item-left{display:flex;flex-direction:column;gap:4px}
  .db-item-title{font-weight:600;font-size:15px;color:#e2e8f0}
  .db-item-meta{font-size:12px;color:rgba(148,163,184,.6);display:flex;gap:12px}
  .db-ats-score{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:rgba(52,211,153,.1);color:#34d399;font-weight:700;font-size:14px;border:1px solid rgba(52,211,153,.2)}
  
  .db-pro-card{background:linear-gradient(135deg,rgba(124,58,237,.15),rgba(79,70,229,.1));border:1px solid rgba(139,92,246,.3);text-align:center;position:relative;overflow:hidden}
  .db-pro-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#a78bfa,#60a5fa)}
  .db-pro-price{font-family:'Bricolage Grotesque',sans-serif;font-size:42px;font-weight:800;color:#fff;margin:16px 0}
  .db-pro-features{text-align:left;margin-bottom:24px;font-size:14px;color:rgba(203,213,225,.8);line-height:1.8}
  .db-pro-feature{display:flex;align-items:center;gap:8px}
  .db-pro-feature::before{content:'✓';color:#a78bfa;font-weight:bold}
  .db-btn-upgrade{width:100%;padding:14px;border:none;border-radius:12px;font-family:'Epilogue',sans-serif;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#7c3aed,#4f46e5);cursor:pointer;transition:all .22s;box-shadow:0 4px 16px rgba(124,58,237,.4)}
  .db-btn-upgrade:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(124,58,237,.6)}

  .db-badge-pro{display:inline-block;padding:4px 10px;background:linear-gradient(135deg,#7c3aed,#4f46e5);border-radius:999px;font-size:11px;font-weight:700;color:#fff;margin-left:10px;vertical-align:middle;box-shadow:0 0 10px rgba(124,58,237,.5)}

  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @media(max-width:768px){
    .db-grid-section{grid-template-columns:1fr}
    .db-header{flex-direction:column;align-items:flex-start;gap:20px}
  }
`;

export default function Dashboard({ onNavigate, appData }) {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    // Check if redirect from Stripe
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      alert("Payment successful! You are now a Pro user.");
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        onNavigate("landing");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const [profileRes, historyRes] = await Promise.all([
        fetch("http://localhost:5000/api/user/profile", { headers }),
        fetch("http://localhost:5000/api/user/history", { headers })
      ]);

      if (profileRes.ok && historyRes.ok) {
        const pData = await profileRes.json();
        const hData = await historyRes.json();
        setProfile(pData);
        setHistory(hData);
      } else {
        // If unauthorized
        localStorage.removeItem("token");
        onNavigate("landing");
      }
    } catch (error) {
      console.error("Dashboard fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/user/checkout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error("Checkout error", error);
      alert("Failed to initiate checkout");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    onNavigate("landing");
  };

  if (loading) return <div style={{color:'white', padding:'50px', textAlign:'center'}}>Loading Dashboard...</div>;

  const isPro = profile?.subscription === "pro";

  return (
    <>
      <style>{CSS}</style>
      <div className="db-bg" />
      <div className="db-grid" />
      
      <nav className="db-nav">
        <div className="db-logo">CareerForge Pro</div>
        <div className="db-nav-right">
          <div className="db-user">{profile?.email}</div>
          <button className="db-logout" onClick={handleLogout}>Log Out</button>
        </div>
      </nav>

      <div className="db-container">
        <div className="db-header">
          <div>
            <h1 className="db-welcome">
              Welcome back, {profile?.name || profile?.email?.split('@')[0]}
              {isPro && <span className="db-badge-pro">PRO</span>}
            </h1>
            <p className="db-sub">Here is a summary of your career assets and activity.</p>
          </div>
          <button className="db-btn-primary" onClick={() => onNavigate("method-select")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Create New Resume
          </button>
        </div>

        <div className="db-grid-section">
          {/* History Section */}
          <div className="db-card">
            <h2 className="db-card-title">📄 Recent Documents</h2>
            {history.length === 0 ? (
              <p style={{color: 'rgba(148,163,184,0.6)', marginTop: '20px'}}>You haven't generated any resumes yet. Click "Create New Resume" to get started.</p>
            ) : (
              <div className="db-history-list">
                {history.map(item => (
                  <div className="db-history-item" key={item._id}>
                    <div className="db-item-left">
                      <div className="db-item-title">{item.title}</div>
                      <div className="db-item-meta">
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span style={{textTransform:'capitalize'}}>{item.type.replace('_', ' ')}</span>
                      </div>
                    </div>
                    {item.atsScore ? (
                      <div className="db-ats-score">{item.atsScore}</div>
                    ) : (
                      <div style={{color:'rgba(255,255,255,0.2)'}}>—</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subscription Section */}
          <div>
            {isPro ? (
              <div className="db-card" style={{borderColor: 'rgba(52,211,153,0.3)', background: 'rgba(52,211,153,0.05)'}}>
                <h2 className="db-card-title" style={{color: '#34d399'}}>🌟 Pro Active</h2>
                <p style={{color: 'rgba(203,213,225,0.8)', fontSize: '14px', lineHeight: '1.6'}}>
                  You have full access to unlimited AI rewrites, cover letter generation, and premium templates. Thank you for being a Pro member!
                </p>
              </div>
            ) : (
              <div className="db-card db-pro-card">
                <div style={{color:'#a78bfa', fontWeight:700, fontSize:'12px', letterSpacing:'2px', textTransform:'uppercase'}}>Upgrade</div>
                <div className="db-pro-price">$19<span style={{fontSize:'16px', color:'rgba(203,213,225,0.6)', fontWeight:500}}>/one-time</span></div>
                <div className="db-pro-features">
                  <div className="db-pro-feature">Unlimited AI Rewrites</div>
                  <div className="db-pro-feature">Real-time ATS Scoring</div>
                  <div className="db-pro-feature">Auto Cover Letter Generator</div>
                  <div className="db-pro-feature">Premium Resume Templates</div>
                </div>
                <button className="db-btn-upgrade" onClick={handleCheckout}>Upgrade to Pro</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
