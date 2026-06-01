// Shows the before/after valuation for a single investment
export default function ValuationRow({ inv }) {
  const propGain = inv.totalPropValue - inv.purchasePropValue;
  const propGainPct = ((propGain / inv.purchasePropValue) * 100).toFixed(1);
  const slotGain = inv.currentVal - inv.myInvested;
  const slotGainPct = ((slotGain / inv.myInvested) * 100).toFixed(1);
  const fmtM = n => "₦" + (n / 1000000).toFixed(1) + "M";
  const fmt = n => "₦" + n.toLocaleString();
  return (
    <div style={{ background: "#0F1318", border: "1px solid #1E222D", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ background: "#13161C", padding: "8px 14px", borderBottom: "1px solid #1E222D", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#B8AFA6", fontSize: 9, fontFamily: "monospace", letterSpacing: 1 }}>VALUATION CHANGE</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: "#9CA3AF", fontSize: 9 }}>Since {inv.purchaseDate}</span>
          <span style={{ background: "rgba(82,183,136,.15)", border: "1px solid rgba(82,183,136,.4)", borderRadius: 20, padding: "2px 8px", color: "#52B788", fontSize: 9, fontWeight: 700 }}>+{propGainPct}%</span>
        </div>
      </div>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid #1E222D" }}>
        <div style={{ color: "#6B7280", fontSize: 8, fontFamily: "monospace", letterSpacing: 1, marginBottom: 7 }}>FULL PROPERTY</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1, background: "#131820", borderRadius: 8, padding: "8px 10px" }}>
            <div style={{ color: "#6B7280", fontSize: 8, fontFamily: "monospace", marginBottom: 4 }}>AT INVESTMENT</div>
            <div style={{ color: "#9CA3AF", fontSize: 14, fontWeight: 700, fontFamily: "monospace" }}>{fmtM(inv.purchasePropValue)}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", color: "#52B788", fontSize: 14, fontWeight: 700, padding: "0 4px" }}>→</div>
          <div style={{ flex: 1, background: "rgba(82,183,136,.06)", border: "1px solid rgba(82,183,136,.2)", borderRadius: 8, padding: "8px 10px" }}>
            <div style={{ color: "#52B788", fontSize: 8, fontFamily: "monospace", marginBottom: 4 }}>CURRENT VALUE</div>
            <div style={{ color: "#52B788", fontSize: 14, fontWeight: 700, fontFamily: "monospace" }}>{fmtM(inv.totalPropValue)}</div>
            <div style={{ color: "#52B788", fontSize: 8, marginTop: 2 }}>+{fmtM(propGain)}</div>
          </div>
        </div>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div style={{ color: "#6B7280", fontSize: 8, fontFamily: "monospace", letterSpacing: 1, marginBottom: 7 }}>YOUR SLOT ({inv.equity} EQUITY)</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1, background: "#131820", borderRadius: 8, padding: "8px 10px" }}>
            <div style={{ color: "#6B7280", fontSize: 8, fontFamily: "monospace", marginBottom: 4 }}>AT INVESTMENT</div>
            <div style={{ color: "#9CA3AF", fontSize: 14, fontWeight: 700, fontFamily: "monospace" }}>{fmt(inv.myInvested)}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", color: inv.col, fontSize: 14, fontWeight: 700, padding: "0 4px" }}>→</div>
          <div style={{ flex: 1, background: "rgba(82,183,136,.06)", border: "1px solid rgba(82,183,136,.2)", borderRadius: 8, padding: "8px 10px" }}>
            <div style={{ color: "#52B788", fontSize: 8, fontFamily: "monospace", marginBottom: 4 }}>CURRENT VALUE</div>
            <div style={{ color: inv.col, fontSize: 14, fontWeight: 700, fontFamily: "monospace" }}>{fmt(inv.currentVal)}</div>
            <div style={{ color: "#52B788", fontSize: 8, marginTop: 2 }}>+{fmt(slotGain)} ({slotGainPct}%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
