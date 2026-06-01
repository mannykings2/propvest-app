import { C } from "../../constants/theme";
import Bar from "../../components/ui/Bar";
import Chip from "../../components/ui/Chip";

export default function PropCard({ p, onSelect, propTab }) {
  const accentCol = propTab === "rental" ? C.brown : C.greenL;
  const fmtM = n => n >= 1000000000 ? "₦" + (n / 1000000000).toFixed(1) + "B" : "₦" + (n / 1000000).toFixed(0) + "M";
  return (
    <div onClick={() => onSelect(p)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 18px", cursor: "pointer", transition: "all .2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = accentCol; e.currentTarget.style.background = C.cardH; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div><div style={{ color: C.white, fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{p.name}</div><div style={{ color: C.muted, fontSize: 12 }}>{p.loc} · {p.type}</div></div>
        <Chip text={p.tag} col={p.tag === "NEAR FULL" ? C.goldL : p.tag === "NEW" ? C.greenG : C.brownL} />
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
        <div><span style={{ color: C.muted, fontSize: 11 }}>{p.incomeType === "rental" ? "Rental Yield: " : "Capital Growth: "}</span><span style={{ color: C.greenG, fontWeight: 700, fontSize: 13 }}>{p.yieldPct}%</span></div>
        <div><span style={{ color: C.muted, fontSize: 11 }}>Per slot: </span><span style={{ color: C.brownL, fontWeight: 600, fontSize: 13 }}>{"₦" + (p.entry / 1000000).toFixed(0) + "M"}</span></div>
        <div><span style={{ color: C.muted, fontSize: 11 }}>Value: </span><span style={{ color: C.goldL, fontWeight: 700, fontSize: 13 }}>{fmtM(p.totalValue)}</span></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1 }}><Bar pct={p.funded} col={accentCol} /></div>
        <span style={{ color: C.dim, fontSize: 10, fontFamily: "monospace" }}>{p.funded}% · {p.slotsLeft} left</span>
      </div>
      {p.incomeType === "rental" ? (
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ background: `${C.greenG}15`, border: `1px solid ${C.greenG}33`, borderRadius: 6, padding: "4px 10px", fontSize: 10, color: C.greenG, fontWeight: 600 }}>💰 Monthly Income</div>
          <div style={{ background: `${C.brownL}15`, border: `1px solid ${C.brownL}33`, borderRadius: 6, padding: "4px 10px", fontSize: 10, color: C.brownL, fontWeight: 600 }}>₦{p.monthly.toLocaleString()}/slot</div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ background: `${C.greenL}15`, border: `1px solid ${C.greenL}33`, borderRadius: 6, padding: "4px 10px", fontSize: 10, color: C.greenL, fontWeight: 600 }}>📈 Capital Gain at Exit</div>
          <div style={{ background: `${C.goldL}15`, border: `1px solid ${C.goldL}33`, borderRadius: 6, padding: "4px 10px", fontSize: 10, color: C.goldL, fontWeight: 600 }}>No Monthly Income</div>
        </div>
      )}
    </div>
  );
}
