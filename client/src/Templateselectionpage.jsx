import { useState, useEffect } from "react";

const templates = [
  {
    id: 1,
    name: "Nova",
    role: "Software Engineer",
    tier: "free",
    tags: ["Modern", "ATS Friendly", "2 Column"],
    layout: "sidebar",
    accent: "#4F46E5", // Indigo
  },
  {
    id: 2,
    name: "Eclipse",
    role: "Product Designer",
    tier: "pro",
    tags: ["Minimalist", "Clean", "Elegant"],
    layout: "minimal",
    accent: "#64748B", // Slate
  },
  {
    id: 3,
    name: "Aurora",
    role: "Marketing Manager",
    tier: "free",
    tags: ["Vibrant", "Creative", "Split"],
    layout: "two_column",
    accent: "#3B82F6", // Royal Blue
  },
  {
    id: 4,
    name: "Nexus",
    role: "Executive / Director",
    tier: "pro",
    tags: ["Corporate", "Bold", "Grid"],
    layout: "corporate",
    accent: "#8B5CF6", // Deep Purple
  },
  {
    id: 5,
    name: "Vertex",
    role: "Standard ATS",
    tier: "free",
    tags: ["Classic", "Traditional", "Formal"],
    layout: "classic",
    accent: "#475569", // Dark Slate
  },
  {
    id: 6,
    name: "Crimson",
    role: "Sales / Operations",
    tier: "pro",
    tags: ["High Impact", "Sidebar", "Bold"],
    layout: "sidebar",
    accent: "#0EA5E9", // Sky Blue
  }
];

/* ─── Colorful Mini Template Previews ─── */
const previewBaseColor = "rgba(255,255,255,0.85)";
const previewLineColor = "rgba(255,255,255,0.3)";

function PreviewClassic({ accent }) {
  return (
    <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: 3, height: "100%", background: "rgba(10,12,18,0.8)" }}>
      <div style={{ borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 4, textAlign: "center" }}>
        <div style={{ height: 4, width: "60%", background: previewBaseColor, borderRadius: 1, margin: "0 auto" }} />
        <div style={{ height: 2, width: "40%", background: previewLineColor, borderRadius: 1, margin: "3px auto 0" }} />
      </div>
      {["EXP", "EDU", "SKL"].map((section, idx) => (
        <div key={idx} style={{ marginBottom: 4 }}>
          <div style={{ height: 2, width: "100%", borderBottom: `1px solid ${previewLineColor}`, marginBottom: 3 }}>
            <div style={{ height: 3, width: 40, background: accent, borderRadius: 1 }} />
          </div>
          {[75, 60, 80].map((w, i) => (
            <div key={i} style={{ height: 2, width: `${w}%`, background: previewLineColor, borderRadius: 1, marginBottom: 2 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

function PreviewMinimal({ accent }) {
  return (
    <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: 3, height: "100%", background: "rgba(10,12,18,0.8)" }}>
      <div style={{ height: 5, width: "60%", background: accent, borderRadius: 1 }} />
      <div style={{ height: 2, width: "30%", background: previewLineColor, borderRadius: 1, marginBottom: 6 }} />
      {[1, 2, 3].map(idx => (
        <div key={idx} style={{ marginBottom: 5 }}>
          <div style={{ height: 3, width: 35, background: accent, opacity: 0.9, marginBottom: 2 }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <div style={{ height: 2, width: "40%", background: previewLineColor }} />
            <div style={{ height: 2, width: "20%", background: previewLineColor }} />
          </div>
          <div style={{ height: 2, width: "80%", background: previewLineColor, marginBottom: 1, opacity: 0.5 }} />
          <div style={{ height: 2, width: "60%", background: previewLineColor, opacity: 0.5 }} />
        </div>
      ))}
    </div>
  );
}

function PreviewSidebar({ accent }) {
  return (
    <div style={{ display: "flex", height: "100%", background: "rgba(10,12,18,0.8)", overflow: "hidden" }}>
      <div style={{ width: "35%", background: accent, padding: "10px 6px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ height: 4, width: "90%", background: "rgba(255,255,255,0.9)", borderRadius: 1, marginBottom: 4 }} />
        <div style={{ height: 2, width: "60%", background: "rgba(255,255,255,0.6)", borderRadius: 1, marginBottom: 8 }} />
        
        <div style={{ height: 2, width: "80%", background: "rgba(255,255,255,0.4)" }} />
        <div style={{ height: 2, width: "70%", background: "rgba(255,255,255,0.4)" }} />
        <div style={{ height: 2, width: "85%", background: "rgba(255,255,255,0.4)" }} />
      </div>
      <div style={{ width: "65%", padding: "10px 8px", display: "flex", flexDirection: "column", gap: 5 }}>
        {[1, 2, 3].map(idx => (
          <div key={idx} style={{ marginBottom: 2 }}>
            <div style={{ height: 3, width: "40%", background: accent, borderRadius: 1, marginBottom: 2 }} />
            <div style={{ height: 2, width: "100%", background: previewLineColor, marginBottom: 1 }} />
            <div style={{ height: 2, width: "85%", background: previewLineColor, marginBottom: 1 }} />
            <div style={{ height: 2, width: "60%", background: previewLineColor }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewTwoColumn({ accent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "rgba(10,12,18,0.8)" }}>
      <div style={{ padding: "8px", borderBottom: `3px solid ${accent}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end", background: "rgba(255,255,255,0.05)" }}>
        <div style={{ width: "60%" }}>
          <div style={{ height: 5, width: "80%", background: previewBaseColor, marginBottom: 2 }} />
          <div style={{ height: 2, width: "50%", background: accent }} />
        </div>
        <div style={{ width: "30%", display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-end" }}>
          <div style={{ height: 1.5, width: "80%", background: previewLineColor }} />
          <div style={{ height: 1.5, width: "60%", background: previewLineColor }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px", flex: 1, padding: "8px" }}>
        <div style={{ width: "60%", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ height: 2, width: "100%", borderBottom: `1px solid ${previewLineColor}`, marginBottom: 1 }}>
             <div style={{ height: 2, width: "30%", background: accent }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
            <div style={{ height: 2, width: "40%", background: previewBaseColor, opacity: 0.8 }} />
            <div style={{ height: 2, width: "20%", background: accent }} />
          </div>
          <div style={{ height: 2, width: "90%", background: previewLineColor, opacity: 0.5 }} />
          <div style={{ height: 2, width: "80%", background: previewLineColor, opacity: 0.5 }} />
        </div>
        <div style={{ width: "40%", display: "flex", flexDirection: "column", gap: 4 }}>
           <div style={{ height: 2, width: "100%", borderBottom: `1px solid ${previewLineColor}`, marginBottom: 1 }}>
             <div style={{ height: 2, width: "40%", background: accent }} />
          </div>
          <div style={{ height: 2, width: "80%", background: previewLineColor }} />
          <div style={{ height: 2, width: "60%", background: previewLineColor }} />
          <div style={{ height: 2, width: "90%", background: previewLineColor }} />
        </div>
      </div>
    </div>
  );
}

function PreviewCorporate({ accent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "rgba(10,12,18,0.8)", padding: "6px" }}>
      <div style={{ background: accent, padding: "10px", borderRadius: 4, marginBottom: 8, display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ height: 5, width: "60%", background: "rgba(255,255,255,0.9)", borderRadius: 1 }} />
        <div style={{ height: 2, width: "40%", background: "rgba(255,255,255,0.7)", borderRadius: 1 }} />
      </div>
      <div style={{ display: "flex", gap: "8px", flex: 1 }}>
        <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ height: 2, width: "100%", borderBottom: `1px solid ${previewLineColor}`, marginBottom: 1 }}>
             <div style={{ height: 2, width: "50%", background: accent }} />
          </div>
          <div style={{ height: 2, width: "80%", background: previewLineColor }} />
          <div style={{ height: 2, width: "60%", background: previewLineColor }} />
        </div>
        <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: 4 }}>
           <div style={{ height: 2, width: "100%", borderBottom: `1px solid ${previewLineColor}`, marginBottom: 1 }}>
             <div style={{ height: 2, width: "60%", background: accent }} />
          </div>
          <div style={{ height: 2, width: "90%", background: previewLineColor }} />
          <div style={{ height: 2, width: "70%", background: previewLineColor }} />
        </div>
      </div>
    </div>
  );
}

const previewComponents = {
  classic: PreviewClassic,
  minimal: PreviewMinimal,
  sidebar: PreviewSidebar,
  two_column: PreviewTwoColumn,
  corporate: PreviewCorporate,
};

function TemplatePreview({ layout, accent }) {
  const Component = previewComponents[layout] || PreviewClassic;
  return <Component accent={accent} />;
}

/* ─── Styles ─── */
const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    zIndex: 10,
    fontFamily: "'Sora', 'DM Sans', system-ui, sans-serif",
    color: "#E2E8F0",
    paddingBottom: 120,
  },
  header: {
    padding: "48px 0 40px",
    textAlign: "center",
    position: "relative",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: "5px 14px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#FFF",
    marginBottom: 20,
  },
  title: {
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: 800,
    lineHeight: 1.1,
    background: "linear-gradient(135deg, #FFF 0%, #AAA 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: "clamp(15px, 2vw, 17px)",
    color: "#94A3B8",
    maxWidth: 600,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  gridContainer: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px",
  },
  filterBar: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginBottom: 40,
    flexWrap: "wrap",
  },
  filterBtn: (isActive) => ({
    padding: "8px 20px",
    borderRadius: 30,
    border: `1px solid ${isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)"}`,
    background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
    color: isActive ? "#FFF" : "#94A3B8",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 30,
  },
  card: (isSelected, isLocked, accent) => ({
    position: "relative",
    background: "rgba(20,22,30,0.4)",
    border: `1px solid ${isSelected ? accent : "rgba(255,255,255,0.08)"}`,
    borderRadius: 20,
    padding: 16,
    cursor: isLocked ? "not-allowed" : "pointer",
    transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
    boxShadow: isSelected ? `0 8px 30px ${accent}40` : "none",
    opacity: isLocked ? 0.75 : 1,
  }),
  tierBadge: (isPro) => ({
    position: "absolute",
    top: -12,
    right: 20,
    background: isPro ? "linear-gradient(135deg, #F59E0B, #D97706)" : "linear-gradient(135deg, #10B981, #059669)",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 12,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 10,
  }),
  selectedBadge: (accent) => ({
    position: "absolute",
    top: 10,
    left: 10,
    background: accent,
    color: "#000",
    fontSize: 10,
    fontWeight: 800,
    padding: "3px 9px",
    borderRadius: 10,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: 3,
    boxShadow: `0 2px 10px ${accent}80`,
    zIndex: 10,
  }),
  previewBox: (isSelected, accent) => ({
    height: 280,
    background: "rgba(10,12,18,0.6)",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
    border: `1px solid ${isSelected ? accent : "rgba(255,255,255,0.1)"}`,
  }),
  lockIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 22,
    zIndex: 2,
    opacity: 0.5,
  },
  cardBody: {
    padding: "0 8px",
  },
  cardName: {
    fontSize: 20,
    fontWeight: 800,
    color: "#FFF",
    marginBottom: 4,
    letterSpacing: "-0.01em",
  },
  cardRole: {
    fontSize: 13,
    color: "#94A3B8",
    marginBottom: 12,
    fontWeight: 500,
  },
  tagsRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  tag: (accent) => ({
    fontSize: 11,
    color: accent,
    background: `${accent}15`,
    border: `1px solid ${accent}30`,
    padding: "4px 10px",
    borderRadius: 20,
    fontWeight: 600,
  }),
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(10,11,15,0.98)",
    backdropFilter: "blur(24px)",
    borderTop: "1px solid rgba(255,255,255,0.15)",
    padding: "20px 32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    zIndex: 100,
    boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
  },
  countText: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: 500,
  },
  continueBtn: (enabled, accent) => ({
    padding: "12px 32px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: "0.03em",
    border: "none",
    cursor: enabled ? "pointer" : "not-allowed",
    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    background: enabled ? accent : "rgba(255,255,255,0.08)",
    color: enabled ? "#FFF" : "#475569",
    textShadow: enabled ? "0 1px 2px rgba(0,0,0,0.4)" : "none",
    boxShadow: enabled ? `0 8px 32px ${accent}60, inset 0 2px 0 rgba(255,255,255,0.3)` : "none",
    transform: enabled ? "scale(1)" : "scale(0.98)",
    minWidth: 260,
    textTransform: "uppercase",
  }),
};

/* ─── Main Component ─── */
export default function TemplateSelectionPage({ onContinue, onBack }) {
  const [selected, setSelected] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [isProUser, setIsProUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/user/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          if (data && data.subscription === "pro") setIsProUser(true);
        })
        .catch(e => console.error("Error fetching profile", e));
    }
  }, []);

  const filters = ["All", "Free", "Pro", "Minimalist", "Modern", "Corporate"];

  const filtered = templates.filter((t) => {
    if (filter === "All") return true;
    if (filter === "Free") return t.tier === "free";
    if (filter === "Pro") return t.tier === "pro";
    return t.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()));
  });

  const handleSelect = (template) => {
    if (template.tier === "pro" && !isProUser) return;
    setSelected(template);
  };

  const handleContinue = () => {
    if (!selected) return;
    if (onContinue) onContinue(selected);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07070f; }
        .ts-bg { position: fixed; inset: 0; z-index: 0; background: radial-gradient(ellipse 70% 60% at 15% 10%, rgba(88,28,235,0.28) 0%, transparent 65%), radial-gradient(ellipse 55% 50% at 85% 90%, rgba(37,99,235,0.22) 0%, transparent 65%), linear-gradient(160deg, #0a0714 0%, #07070f 50%, #060c1a 100%); }
        .ts-grid { position: fixed; inset: 0; z-index: 1; background-image: linear-gradient(rgba(139,92,246,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.055) 1px, transparent 1px); background-size: 52px 52px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%); }
        .ts-orb { position: fixed; border-radius: 50%; filter: blur(72px); z-index: 0; pointer-events: none; animation: orbFloat 12s ease-in-out infinite alternate; }
        .ts-orb-1 { width: 500px; height: 500px; top: -160px; left: -130px; background: radial-gradient(circle, rgba(109,40,217,0.35) 0%, rgba(67,20,180,0.12) 55%, transparent 70%); }
        .ts-orb-2 { width: 440px; height: 440px; bottom: -140px; right: -120px; background: radial-gradient(circle, rgba(37,99,235,0.30) 0%, rgba(29,78,216,0.10) 55%, transparent 70%); animation-delay: -5s; }
        @keyframes orbFloat { 0% { transform: translate(0, 0) scale(1); } 33% { transform: translate(28px, -18px) scale(1.04); } 66% { transform: translate(-18px, 26px) scale(0.97); } 100% { transform: translate(12px, 8px) scale(1.02); } }
        .template-card:hover {
          transform: scale(1.025) translateY(-3px) !important;
        }
        .template-card.pro-card:hover {
          transform: none !important;
          box-shadow: none !important;
        }
        .continue-btn:hover:not(:disabled) {
          transform: scale(1.04) !important;
          filter: brightness(1.1);
        }
        .filter-btn:hover {
          opacity: 0.85;
        }
      `}</style>

      <div className="ts-bg" />
      <div className="ts-grid" />
      <div className="ts-orb ts-orb-1" />
      <div className="ts-orb ts-orb-2" />

      <div style={styles.page}>
        <div style={styles.header}>
          <div style={styles.eyebrow}>
            <span>✦</span>
            <span>Resume Builder</span>
          </div>
          <h1 style={styles.title}>Choose Your Template</h1>
          <p style={styles.subtitle}>
            Select from our vibrant, professionally crafted structural layouts.
            Find the aesthetic that perfectly matches your career goals.
          </p>
        </div>

        <div style={styles.gridContainer}>
          <div style={styles.filterBar}>
            {filters.map((f) => (
              <button key={f} className="filter-btn" style={styles.filterBtn(filter === f)} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>

          <div style={styles.grid}>
            {filtered.map((template) => {
              const isSelected = selected?.id === template.id;
              const isProTemplate = template.tier === "pro";
              const isLocked = isProTemplate && !isProUser;

              return (
                <div
                  key={template.id}
                  className={`template-card${isLocked ? " pro-card" : ""}`}
                  style={styles.card(isSelected, isLocked, template.accent)}
                  onClick={() => handleSelect(template)}
                  onMouseEnter={() => setHoveredId(template.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <span style={styles.tierBadge(isProTemplate)}>
                    {isProTemplate ? "✦ Pro" : "Free"}
                  </span>

                  {isSelected && (
                    <span style={styles.selectedBadge(template.accent)}>
                      ✔ Selected
                    </span>
                  )}

                  <div style={styles.previewBox(isSelected, template.accent)}>
                    <TemplatePreview layout={template.layout} accent={template.accent} />
                    {isLocked && <div style={styles.lockIcon}>🔒</div>}
                    {isLocked && <div style={{ position: "absolute", inset: 0, background: "rgba(10,11,15,0.45)", borderRadius: 7 }} />}
                  </div>

                  <div style={styles.cardBody}>
                    <div style={{...styles.cardName, color: isSelected || hoveredId === template.id ? template.accent : "#FFF", transition: "color 0.3s"}}>
                      {template.name}
                    </div>
                    <div style={styles.cardRole}>{template.role}</div>
                    <div style={styles.tagsRow}>
                      {template.tags.map((tag) => (
                        <span key={tag} style={styles.tag(template.accent)}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.footer}>
          <span style={styles.countText}>
            {templates.filter((t) => t.tier === "free").length} free templates available
          </span>
          <button className="continue-btn" style={styles.continueBtn(!!selected, selected?.accent)} onClick={handleContinue} disabled={!selected}>
            {selected ? `✦ Generate Resume with ${selected.name}` : "Select a Template to Continue"}
          </button>
        </div>
      </div>
    </>
  );
}
