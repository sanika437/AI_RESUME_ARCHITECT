import { useState } from "react";

const templates = [
  {
    id: 1,
    name: "Nova",
    role: "Software Engineer",
    tier: "free",
    tags: ["Modern", "ATS Friendly", "2 Column"],
    layout: "sidebar",
    accent: "#00D4FF",
    accentBg: "rgba(0,212,255,0.08)",
  },
  {
    id: 2,
    name: "Meridian",
    role: "Product Manager",
    tier: "free",
    tags: ["Minimal", "ATS Friendly", "Clean"],
    layout: "centered",
    accent: "#A78BFA",
    accentBg: "rgba(167,139,250,0.08)",
  },
  {
    id: 3,
    name: "Prism",
    role: "UX Designer",
    tier: "pro",
    tags: ["Creative", "Bold", "Visual"],
    layout: "prism",
    accent: "#F472B6",
    accentBg: "rgba(244,114,182,0.08)",
  },
  {
    id: 4,
    name: "Atlas",
    role: "Data Scientist",
    tier: "free",
    tags: ["Technical", "2 Column", "Dense"],
    layout: "atlas",
    accent: "#34D399",
    accentBg: "rgba(52,211,153,0.08)",
  },
  {
    id: 5,
    name: "Vertex",
    role: "Marketing Lead",
    tier: "pro",
    tags: ["Creative", "Colorful", "Bold"],
    layout: "vertex",
    accent: "#FB923C",
    accentBg: "rgba(251,146,60,0.08)",
  },
  {
    id: 6,
    name: "Clarity",
    role: "Finance Analyst",
    tier: "free",
    tags: ["Classic", "ATS Friendly", "Formal"],
    layout: "classic",
    accent: "#60A5FA",
    accentBg: "rgba(96,165,250,0.08)",
  },
  {
    id: 7,
    name: "Onyx",
    role: "Full Stack Dev",
    tier: "pro",
    tags: ["Dark", "Modern", "Sidebar"],
    layout: "onyx",
    accent: "#E879F9",
    accentBg: "rgba(232,121,249,0.08)",
  },
  {
    id: 8,
    name: "Zinc",
    role: "DevOps Engineer",
    tier: "free",
    tags: ["Minimal", "Technical", "Clean"],
    layout: "zinc",
    accent: "#94A3B8",
    accentBg: "rgba(148,163,184,0.08)",
  },
  {
    id: 9,
    name: "Aether",
    role: "Creative Director",
    tier: "pro",
    tags: ["Editorial", "Creative", "Visual"],
    layout: "aether",
    accent: "#FBBF24",
    accentBg: "rgba(251,191,36,0.08)",
  },
  {
    id: 10,
    name: "Forge",
    role: "Backend Engineer",
    tier: "free",
    tags: ["ATS Friendly", "Structured", "2 Column"],
    layout: "forge",
    accent: "#2DD4BF",
    accentBg: "rgba(45,212,191,0.08)",
  },
];

/* ─── Mini template preview renderers ─── */
function PreviewSidebar({ accent }) {
  return (
    <div style={{ display: "flex", height: "100%", gap: 6 }}>
      <div style={{ width: 52, background: "rgba(255,255,255,0.04)", borderRadius: 4, padding: 6, display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: accent, opacity: 0.7, margin: "0 auto" }} />
        <div style={{ height: 3, background: accent, opacity: 0.4, borderRadius: 2 }} />
        {[70, 55, 65, 40].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.15)", borderRadius: 2 }} />
        ))}
        <div style={{ height: 3, background: accent, opacity: 0.3, borderRadius: 2, marginTop: 4 }} />
        {[60, 50, 70].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, paddingTop: 4 }}>
        <div style={{ height: 3, width: "80%", background: "rgba(255,255,255,0.25)", borderRadius: 2 }} />
        <div style={{ height: 2, width: "55%", background: accent, opacity: 0.5, borderRadius: 2 }} />
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 2, margin: "3px 0" }} />
        {[3, 2, 2, 3, 2].map((h, i) => (
          <div key={i} style={{ height: h, width: `${[90, 75, 85, 65, 80][i]}%`, background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
        ))}
        <div style={{ height: 2, width: "40%", background: accent, opacity: 0.35, borderRadius: 2, marginTop: 4 }} />
        {[2, 2, 2].map((h, i) => (
          <div key={i} style={{ height: h, width: `${[85, 70, 90][i]}%`, background: "rgba(255,255,255,0.08)", borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );
}

function PreviewCentered({ accent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "4px 8px" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: accent, opacity: 0.6 }} />
      <div style={{ height: 3, width: "70%", background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
      <div style={{ height: 2, width: "45%", background: accent, opacity: 0.4, borderRadius: 2 }} />
      <div style={{ height: 1, width: "100%", background: "rgba(255,255,255,0.07)", margin: "3px 0" }} />
      {[80, 95, 70, 88].map((w, i) => (
        <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.12)", borderRadius: 2 }} />
      ))}
      <div style={{ height: 2, width: "50%", background: accent, opacity: 0.3, borderRadius: 2, marginTop: 4 }} />
      {[75, 90, 65].map((w, i) => (
        <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.09)", borderRadius: 2 }} />
      ))}
    </div>
  );
}

function PreviewPrism({ accent }) {
  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 36, background: `linear-gradient(135deg, ${accent}55, ${accent}22)`, display: "flex", alignItems: "center", paddingLeft: 8, gap: 6 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", opacity: 0.15 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 3, width: 50, background: "#fff", opacity: 0.4, borderRadius: 2 }} />
          <div style={{ height: 2, width: 35, background: accent, opacity: 0.6, borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ marginTop: 44, padding: "0 8px", display: "flex", flexDirection: "column", gap: 3 }}>
        {[80, 65, 90, 55, 75].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
        ))}
        <div style={{ height: 2, width: "45%", background: accent, opacity: 0.4, borderRadius: 2, marginTop: 3 }} />
        {[70, 85, 60].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.07)", borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );
}

function PreviewAtlas({ accent }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 5, padding: 2 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ height: 4, width: "55%", background: "rgba(255,255,255,0.25)", borderRadius: 2 }} />
        <div style={{ height: 2, width: "30%", background: accent, opacity: 0.4, borderRadius: 2 }} />
      </div>
      <div style={{ height: 1, background: accent, opacity: 0.3 }} />
      <div style={{ display: "flex", gap: 5, flex: 1 }}>
        {[0, 1].map(col => (
          <div key={col} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ height: 2, width: "70%", background: accent, opacity: 0.35, borderRadius: 2 }} />
            {[85, 70, 90, 65, 80].map((w, i) => (
              <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.08)", borderRadius: 2 }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewVertex({ accent }) {
  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: accent, opacity: 0.8 }} />
      <div style={{ marginLeft: 12, display: "flex", flexDirection: "column", gap: 4, paddingTop: 6 }}>
        <div style={{ height: 4, width: "60%", background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
        <div style={{ height: 2, width: "40%", background: accent, opacity: 0.5, borderRadius: 2 }} />
        <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
          {[accent + "55", accent + "33", accent + "44"].map((bg, i) => (
            <div key={i} style={{ height: 10, width: 24, background: bg, borderRadius: 3 }} />
          ))}
        </div>
        {[90, 75, 85, 60, 80].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.09)", borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );
}

function PreviewClassic({ accent }) {
  return (
    <div style={{ padding: "4px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
      <div style={{ borderBottom: `1.5px solid ${accent}55`, paddingBottom: 5, marginBottom: 2 }}>
        <div style={{ height: 3, width: "65%", background: "rgba(255,255,255,0.28)", borderRadius: 2 }} />
        <div style={{ height: 2, width: "45%", background: "rgba(255,255,255,0.13)", borderRadius: 2, marginTop: 2 }} />
      </div>
      {["EXPERIENCE", "EDUCATION", "SKILLS"].map((section, idx) => (
        <div key={idx}>
          <div style={{ height: 2, width: 40, background: accent, opacity: 0.45, borderRadius: 2, marginBottom: 2 }} />
          {[75, 60, 80].map((w, i) => (
            <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 2 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

function PreviewOnyx({ accent }) {
  return (
    <div style={{ display: "flex", height: "100%", gap: 0 }}>
      <div style={{ width: 58, background: "rgba(0,0,0,0.4)", borderRadius: "4px 0 0 4px", padding: 6, display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${accent}`, opacity: 0.8, marginBottom: 2 }} />
        {[65, 80, 55, 70, 60].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: i === 0 ? accent : "rgba(255,255,255,0.12)", opacity: i === 0 ? 0.5 : 1, borderRadius: 2 }} />
        ))}
        <div style={{ width: "80%", height: 1, background: "rgba(255,255,255,0.08)", margin: "3px 0" }} />
        {[50, 70, 45].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.08)", borderRadius: 2 }} />
        ))}
      </div>
      <div style={{ flex: 1, padding: "6px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ height: 3, width: "80%", background: "rgba(255,255,255,0.22)", borderRadius: 2 }} />
        <div style={{ height: 2, width: "55%", background: accent, opacity: 0.4, borderRadius: 2 }} />
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "2px 0" }} />
        {[85, 70, 90, 65].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.07)", borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );
}

function PreviewZinc({ accent }) {
  return (
    <div style={{ padding: "6px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
      <div style={{ height: 3, width: "50%", background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />
      <div style={{ height: 1.5, width: "35%", background: accent, opacity: 0.3, borderRadius: 2 }} />
      <div style={{ display: "flex", gap: 4, marginTop: 2, marginBottom: 2 }}>
        {["EXP", "EDU", "SKL"].map((label, i) => (
          <div key={i} style={{ flex: 1, height: 12, background: "rgba(255,255,255,0.04)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ height: 1.5, width: "60%", background: "rgba(255,255,255,0.1)", borderRadius: 1 }} />
          </div>
        ))}
      </div>
      {[90, 75, 85, 60, 80, 70].map((w, i) => (
        <div key={i} style={{ height: 2, width: `${w}%`, background: i % 3 === 0 ? `${accent}44` : "rgba(255,255,255,0.07)", borderRadius: 2 }} />
      ))}
    </div>
  );
}

function PreviewAether({ accent }) {
  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 70, height: 70, borderRadius: "50%", background: accent, opacity: 0.12 }} />
      <div style={{ padding: "6px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ height: 4, width: "60%", background: "rgba(255,255,255,0.28)", borderRadius: 2, fontWeight: "bold" }} />
        <div style={{ height: 2, width: "40%", background: accent, opacity: 0.5, borderRadius: 2 }} />
        <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: accent, opacity: 0.3 + i * 0.15 }} />
          ))}
        </div>
        {[95, 80, 90, 65, 75].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.08)", borderRadius: 2 }} />
        ))}
        <div style={{ height: 1.5, width: "50%", background: accent, opacity: 0.25, borderRadius: 2, marginTop: 3 }} />
        {[70, 85].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.06)", borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );
}

function PreviewForge({ accent }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 3, padding: 2 }}>
      <div style={{ background: `${accent}18`, borderRadius: 4, padding: "4px 6px", marginBottom: 2 }}>
        <div style={{ height: 3, width: "55%", background: "rgba(255,255,255,0.22)", borderRadius: 2 }} />
        <div style={{ height: 2, width: "38%", background: accent, opacity: 0.4, borderRadius: 2, marginTop: 2 }} />
      </div>
      <div style={{ display: "flex", gap: 5, flex: 1 }}>
        <div style={{ flex: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 2, width: "70%", background: accent, opacity: 0.35, borderRadius: 2 }} />
          {[90, 80, 95, 70, 85, 75].map((w, i) => (
            <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.08)", borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 2, width: "80%", background: accent, opacity: 0.3, borderRadius: 2 }} />
          {[70, 85, 60, 75, 55].map((w, i) => (
            <div key={i} style={{ height: 2, width: `${w}%`, background: "rgba(255,255,255,0.07)", borderRadius: 2 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const previewComponents = {
  sidebar: PreviewSidebar,
  centered: PreviewCentered,
  prism: PreviewPrism,
  atlas: PreviewAtlas,
  vertex: PreviewVertex,
  classic: PreviewClassic,
  onyx: PreviewOnyx,
  zinc: PreviewZinc,
  aether: PreviewAether,
  forge: PreviewForge,
};

function TemplatePreview({ layout, accent }) {
  const Component = previewComponents[layout] || PreviewSidebar;
  return <Component accent={accent} />;
}

/* ─── Styles ─── */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0A0B0F",
    backgroundImage: `
      radial-gradient(ellipse at 20% 10%, rgba(0,212,255,0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(167,139,250,0.04) 0%, transparent 50%)
    `,
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
    background: "rgba(0,212,255,0.08)",
    border: "1px solid rgba(0,212,255,0.2)",
    borderRadius: 20,
    padding: "5px 14px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#00D4FF",
    marginBottom: 20,
  },
  title: {
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: 800,
    lineHeight: 1.1,
    background: "linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: 12,
    letterSpacing: "-0.03em",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    maxWidth: 480,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  gridContainer: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 24px",
  },
  filterBar: {
    display: "flex",
    gap: 8,
    marginBottom: 32,
    flexWrap: "wrap",
  },
  filterBtn: (active) => ({
    padding: "6px 16px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "all 0.2s",
    border: active ? "1px solid rgba(0,212,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
    background: active ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.03)",
    color: active ? "#00D4FF" : "#64748B",
  }),
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 20,
  },
  card: (selected, isPro, accent, accentBg) => ({
    position: "relative",
    borderRadius: 14,
    background: selected
      ? `linear-gradient(145deg, ${accentBg}, rgba(255,255,255,0.03))`
      : "rgba(255,255,255,0.025)",
    border: selected
      ? `1.5px solid ${accent}80`
      : "1.5px solid rgba(255,255,255,0.07)",
    cursor: isPro ? "not-allowed" : "pointer",
    transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
    overflow: "hidden",
    boxShadow: selected ? `0 0 24px ${accent}22` : "none",
    filter: isPro ? "saturate(0.6) brightness(0.7)" : "none",
  }),
  previewBox: (accent, selected) => ({
    height: 155,
    margin: "12px 12px 0",
    borderRadius: 8,
    background: "rgba(255,255,255,0.02)",
    border: `1px solid ${selected ? accent + "30" : "rgba(255,255,255,0.05)"}`,
    overflow: "hidden",
    padding: 8,
    position: "relative",
    transition: "border-color 0.25s",
  }),
  cardBody: {
    padding: "12px 14px 14px",
  },
  cardName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#F1F5F9",
    letterSpacing: "-0.01em",
  },
  cardRole: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
    marginBottom: 8,
    fontWeight: 500,
  },
  tagsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 10,
  },
  tag: (accent) => ({
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 7px",
    borderRadius: 10,
    background: `${accent}15`,
    color: accent,
    border: `1px solid ${accent}30`,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  }),
  tierBadge: (isPro) => ({
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 9,
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: 10,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    background: isPro
      ? "linear-gradient(135deg, #7C3AED, #A855F7)"
      : "rgba(52,211,153,0.15)",
    color: isPro ? "#fff" : "#34D399",
    border: isPro ? "none" : "1px solid rgba(52,211,153,0.3)",
    boxShadow: isPro ? "0 2px 8px rgba(124,58,237,0.4)" : "none",
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
    boxShadow: `0 2px 10px ${accent}55`,
  }),
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(10,11,15,0.92)",
    backdropFilter: "blur(20px)",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    zIndex: 100,
  },
  countText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: 500,
  },
  continueBtn: (enabled, accent) => ({
    padding: "12px 32px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.02em",
    border: "none",
    cursor: enabled ? "pointer" : "not-allowed",
    transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
    background: enabled
      ? `linear-gradient(135deg, ${accent || "#00D4FF"}, ${accent ? accent + "CC" : "#0EA5E9"})`
      : "rgba(255,255,255,0.06)",
    color: enabled ? "#000" : "#334155",
    boxShadow: enabled ? `0 4px 20px ${accent || "#00D4FF"}40` : "none",
    transform: enabled ? "scale(1)" : "scale(0.98)",
    minWidth: 260,
  }),
};

/* ─── Main Component ─── */
export default function TemplateSelectionPage({ onContinue, onBack }) {
  const [selected, setSelected] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Free", "Pro", "ATS Friendly", "Creative", "Minimal"];

  const filtered = templates.filter((t) => {
    if (filter === "All") return true;
    if (filter === "Free") return t.tier === "free";
    if (filter === "Pro") return t.tier === "pro";
    return t.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()));
  });

  const handleSelect = (template) => {
    if (template.tier === "pro") return;
    setSelected(template);
  };

  const handleContinue = () => {
    if (!selected) return;
    if (onContinue) onContinue(selected.id);
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .template-card:hover {
          transform: scale(1.025) translateY(-3px) !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4) !important;
        }
        .template-card.pro-card:hover {
          transform: none !important;
          box-shadow: none !important;
        }
        .continue-btn:hover:not(:disabled) {
          transform: scale(1.04) !important;
          filter: brightness(1.08);
        }
        .filter-btn:hover {
          opacity: 0.85;
        }
      `}</style>

      <div style={styles.page}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.eyebrow}>
            <span>✦</span>
            <span>Resume Builder</span>
          </div>
          <h1 style={styles.title}>Choose Your Template</h1>
          <p style={styles.subtitle}>
            Select from professionally crafted layouts. Each template is optimized for
            readability and recruiter impact.
          </p>
        </div>

        {/* Grid */}
        <div style={styles.gridContainer}>
          {/* Filter Bar */}
          <div style={styles.filterBar}>
            {filters.map((f) => (
              <button
                key={f}
                className="filter-btn"
                style={styles.filterBtn(filter === f)}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Template Grid */}
          <div style={styles.grid}>
            {filtered.map((template) => {
              const isSelected = selected?.id === template.id;
              const isPro = template.tier === "pro";

              return (
                <div
                  key={template.id}
                  className={`template-card${isPro ? " pro-card" : ""}`}
                  style={styles.card(isSelected, isPro, template.accent, template.accentBg)}
                  onClick={() => handleSelect(template)}
                  onMouseEnter={() => setHoveredId(template.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Tier Badge */}
                  <span style={styles.tierBadge(isPro)}>
                    {isPro ? "✦ Pro" : "Free"}
                  </span>

                  {/* Selected Badge */}
                  {isSelected && (
                    <span style={styles.selectedBadge(template.accent)}>
                      ✔ Selected
                    </span>
                  )}

                  {/* Preview Box */}
                  <div style={styles.previewBox(template.accent, isSelected)}>
                    <TemplatePreview layout={template.layout} accent={template.accent} />
                    {isPro && <div style={styles.lockIcon}>🔒</div>}
                    {isPro && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(10,11,15,0.45)",
                          borderRadius: 7,
                        }}
                      />
                    )}
                  </div>

                  {/* Card Body */}
                  <div style={styles.cardBody}>
                    <div style={styles.cardName}>{template.name}</div>
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

        {/* Footer */}
        <div style={styles.footer}>
          <span style={styles.countText}>
            {templates.filter((t) => t.tier === "free").length} free templates available
          </span>
          <button
            className="continue-btn"
            style={styles.continueBtn(!!selected, selected?.accent)}
            onClick={handleContinue}
            disabled={!selected}
          >
            {selected
              ? `✦ Generate Resume with ${selected.name}`
              : "Select a Template to Continue"}
          </button>
        </div>
      </div>
    </>
  );
}
