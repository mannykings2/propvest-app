import { C } from "../../constants/theme";

// A stat card showing a label, value, and optional sub-text
export default function Stat({ label, val, sub, col = C.brown }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", flex: 1 }}>
      <div style={{ color: C.muted, fontSize: 10, fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
      <div style={{ color: col, fontSize: 20, fontWeight: 700, marginBottom: 3 }}>{val}</div>
      {sub && <div style={{ color: C.dim, fontSize: 11 }}>{sub}</div>}
    </div>
  );
}
