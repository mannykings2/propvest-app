import { C } from "../../constants/theme";
import { INVESTMENTS } from "../../constants/data";
import Bar from "../../components/ui/Bar";
import Chip from "../../components/ui/Chip";
import Stat from "../../components/ui/Stat";
import AddFundsWidget from "./AddFundsWidget";

export default function Dashboard({ nav }) {
  return (<div style={{ paddingBottom: 8 }}>
    <div style={{ background: `linear-gradient(135deg,${C.brownD},${C.brown})`, borderRadius: 16, padding: "26px 28px", marginBottom: 22, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -20, top: -20, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
      <div style={{ color: C.cream, fontSize: 13, marginBottom: 4, opacity: .85 }}>Good morning, Chukwuemeka 👋</div>
      <div style={{ color: C.white, fontSize: 11, opacity: .7, marginBottom: 2 }}>Total Portfolio Value</div>
      <div style={{ color: C.white, fontSize: 36, fontWeight: 700, marginBottom: 4 }}>₦13,130,000</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
        {[["+16.4% avg", "#7FFFD4"], [" 3 co-investments", C.goldL], [" 1 off-plan", C.tealG]].map(([txt, col]) => (
          <span key={txt} style={{ color: col, fontSize: 12, fontWeight: 700 }}>{txt}</span>
        ))}
      </div>
    </div>
    <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
      <Stat label="THIS MONTH" val="₦142,500" sub="Rental income" col={C.greenG} />
      <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ color: C.muted, fontSize: 9, fontFamily: "monospace", letterSpacing: .8, marginBottom: 6 }}>MAIN WALLET</div>
        <div style={{ color: C.goldL, fontWeight: 700, fontSize: 16, marginBottom: 2 }}>₦156,000</div>
        <div style={{ color: C.muted, fontSize: 10 }}>Deposited funds</div>
      </div>
      <div style={{ flex: 1, background: `${C.brown}12`, border: `1px solid ${C.brownL}33`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ color: C.muted, fontSize: 9, fontFamily: "monospace", letterSpacing: .8, marginBottom: 6 }}>EARNINGS</div>
        <div style={{ color: C.brownL, fontWeight: 700, fontSize: 16, marginBottom: 2 }}>₦284,000</div>
        <div style={{ color: C.muted, fontSize: 10 }}>Rental + equity returns</div>
      </div>
    </div>
    <div style={{ color: C.creamD, fontSize: 11, fontFamily: "monospace", letterSpacing: 1, marginBottom: 12 }}>QUICK ACTIONS</div>
    <AddFundsWidget />
    <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
      {[["🏘", "Browse", "Properties", C.brown], ["🏗", "Off-Plan", "OffPlan", C.tealL], ["🏦", "Withdraw\nto Bank", "Withdraw", C.greenL], ["📊", "Portfolio", "Portfolio", "#3A4A6A"]].map(([icon, label, screen, col]) => (
        <button key={screen} onClick={() => nav(screen)} style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 4px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, transition: "all .2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = col; e.currentTarget.style.background = C.cardH; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
          <span style={{ color: C.dim, fontSize: 10, textAlign: "center", lineHeight: 1.3, whiteSpace: "pre-line" }}>{label}</span>
        </button>
      ))}
    </div>
    <div onClick={() => nav("Portfolio")} style={{ background: `${C.gold}18`, border: `1px solid ${C.goldL}44`, borderRadius: 12, padding: "14px 16px", marginBottom: 18, cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
      <span style={{ fontSize: 22 }}>🗳</span>
      <div style={{ flex: 1 }}><div style={{ color: C.goldL, fontWeight: 700, fontSize: 13, marginBottom: 2 }}>Active Sale Vote — Maitama Residency</div><div style={{ color: C.dim, fontSize: 11 }}>2 of 14 investors voted · Your vote needed</div></div>
      <span style={{ color: C.goldL, fontSize: 14 }}>→</span>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <div style={{ color: C.creamD, fontSize: 11, fontFamily: "monospace", letterSpacing: 1 }}>MY INVESTMENTS</div>
      <button onClick={() => nav("Portfolio")} style={{ background: "none", border: "none", color: C.brownL, fontSize: 12, cursor: "pointer" }}>View all →</button>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {INVESTMENTS.map(p => (<div key={p.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 4, height: 52, borderRadius: 2, background: p.col, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <div style={{ color: C.white, fontWeight: 600, fontSize: 14 }}>{p.name}</div>
            <div style={{ color: p.col, fontWeight: 700, fontSize: 13 }}>{p.monthly}</div>
          </div>
          <div style={{ color: C.muted, fontSize: 11, marginBottom: 6 }}>{p.loc} · {p.equity} · <span style={{ color: C.greenG }}>{p.gain}</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1 }}><Bar pct={p.funded} col={p.col} /></div>
            {p.voteActive && <Chip text="VOTE OPEN" col={C.goldL} />}
            {p.canTrigger && <Chip text="CAN SELL" col={C.greenG} />}
          </div>
        </div>
      </div>))}
    </div>
  </div>);
}
