import { useState } from "react";
import { C } from "../../constants/theme";

export default function AddFundsWidget() {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState("transfer");
  const [amount, setAmount] = useState("");
  const [done, setDone] = useState(false);
  const fmt = v => { const n = v.replace(/\D/g, ""); return n ? parseInt(n).toLocaleString() : ""; };
  const confirm = () => { setDone(true); setTimeout(() => { setDone(false); setOpen(false); setAmount(""); }, 2500); };

  return (<>
    <div onClick={() => setOpen(true)} style={{ background: `linear-gradient(135deg,${C.brownD}22,${C.brown}18)`, border: `1px solid ${C.brown}44`, borderRadius: 12, padding: "12px 16px", marginBottom: 16, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.brownL}22`, border: `1px solid ${C.brownL}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>+</div>
        <div>
          <div style={{ color: C.white, fontWeight: 700, fontSize: 13 }}>Add Funds to Wallet</div>
          <div style={{ color: C.muted, fontSize: 11 }}>Bank transfer · Instant card top-up</div>
        </div>
      </div>
      <span style={{ color: C.brownL, fontSize: 18 }}>→</span>
    </div>

    {open && (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.9)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setOpen(false)}>
        <div onClick={e => e.stopPropagation()} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "20px 20px 0 0", padding: "24px 20px 50px", width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>✅</div>
              <div style={{ color: C.greenG, fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Funds Request Sent!</div>
              <div style={{ color: C.dim, fontSize: 12 }}>Your wallet will be credited once payment is confirmed.</div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ color: C.white, fontSize: 16, fontWeight: 700 }}>Add Funds</div>
                <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: C.muted, fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {[["transfer", "🏦", "Bank Transfer"], ["card", "💳", "Card Top-Up"]].map(([id, icon, lbl]) => (
                  <button key={id} onClick={() => setMethod(id)} style={{ flex: 1, background: method === id ? `${C.brown}33` : C.bg, border: `2px solid ${method === id ? C.brownL : C.border}`, borderRadius: 10, padding: "10px 6px", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ fontSize: 18, marginBottom: 3 }}>{icon}</div>
                    <div style={{ color: method === id ? C.brownL : C.muted, fontSize: 11, fontWeight: method === id ? 700 : 400 }}>{lbl}</div>
                  </button>
                ))}
              </div>

              {method === "transfer" && (
                <div>
                  <div style={{ color: C.creamD, fontSize: 10, fontFamily: "monospace", letterSpacing: 1, marginBottom: 10 }}>PROPVEST WALLET ACCOUNT</div>
                  <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
                    {[["Bank Name", "PropVest Microfinance Bank"], ["Account Name", "STAYSMART PROPVEST / Chukwuemeka A. Johnson"], ["Account Number", "0123456789"], ["Sort Code", "058-152-XXX"], ["Reference", "USR-001-FUND"]].map(([l, v], i, arr) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none", background: i % 2 === 0 ? "transparent" : `${C.border}15` }}>
                        <span style={{ color: C.muted, fontSize: 11 }}>{l}</span>
                        <span style={{ color: l === "Account Number" ? C.brownL : l === "Reference" ? C.tealG : C.white, fontSize: l === "Account Number" ? 15 : 12, fontWeight: l === "Account Number" || l === "Reference" ? 700 : 500, fontFamily: l === "Account Number" ? "monospace" : "inherit", letterSpacing: l === "Account Number" ? 3 : 0 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: `${C.goldL}10`, border: `1px solid ${C.goldL}22`, borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
                    <div style={{ color: C.goldL, fontSize: 10, lineHeight: 1.6 }}>⚠ Always include your <span style={{ fontWeight: 700 }}>reference code (USR-001-FUND)</span> when making the transfer. Funds are credited within 30 minutes on business days.</div>
                  </div>
                  <div style={{ color: C.dim, fontSize: 11, marginBottom: 8 }}>Amount to Transfer</div>
                  <div style={{ position: "relative", marginBottom: 16 }}>
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.brownL, fontSize: 18, fontWeight: 700 }}>₦</div>
                    <input type="text" placeholder="0" value={amount} onChange={e => setAmount(fmt(e.target.value))} style={{ width: "100%", background: C.bg, border: `2px solid ${amount ? C.brown : C.border}`, borderRadius: 10, padding: "13px 14px 13px 40px", color: C.white, fontSize: 22, fontWeight: 700, outline: "none", boxSizing: "border-box", fontFamily: "monospace" }} />
                  </div>
                  <button onClick={confirm} disabled={!amount} style={{ width: "100%", background: amount ? `linear-gradient(135deg,${C.brownD},${C.brown})` : C.border, border: "none", borderRadius: 12, padding: 14, color: amount ? C.white : C.muted, fontSize: 14, fontWeight: 700, cursor: amount ? "pointer" : "not-allowed" }}>I've Made This Transfer →</button>
                </div>
              )}

              {method === "card" && (
                <div>
                  <div style={{ color: C.creamD, fontSize: 10, fontFamily: "monospace", letterSpacing: 1, marginBottom: 10 }}>CARD TOP-UP (INSTANT)</div>
                  <div style={{ color: C.dim, fontSize: 11, marginBottom: 8 }}>Amount</div>
                  <div style={{ position: "relative", marginBottom: 14 }}>
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.brownL, fontSize: 18, fontWeight: 700 }}>₦</div>
                    <input type="text" placeholder="0" value={amount} onChange={e => setAmount(fmt(e.target.value))} style={{ width: "100%", background: C.bg, border: `2px solid ${amount ? C.brown : C.border}`, borderRadius: 10, padding: "13px 14px 13px 40px", color: C.white, fontSize: 22, fontWeight: 700, outline: "none", boxSizing: "border-box", fontFamily: "monospace" }} />
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    {[10000, 25000, 50000, 100000].map(q => (
                      <button key={q} onClick={() => setAmount(q.toLocaleString())} style={{ flex: 1, background: amount === q.toLocaleString() ? `${C.brown}33` : C.bg, border: `1px solid ${amount === q.toLocaleString() ? C.brown : C.border}`, borderRadius: 8, padding: "7px 2px", color: amount === q.toLocaleString() ? C.brownL : C.dim, fontSize: 10, cursor: "pointer", fontFamily: "monospace" }}>₦{q / 1000}K</button>
                    ))}
                  </div>
                  <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 14 }}>🔒</span>
                    <div style={{ color: C.muted, fontSize: 10, lineHeight: 1.5 }}>Card payments processed via Paystack · PCI-DSS compliant · No card data stored by PropVest</div>
                  </div>
                  <div style={{ background: `${C.brown}10`, border: `1px solid ${C.brown}22`, borderRadius: 10, padding: "8px 12px", marginBottom: 14, color: C.dim, fontSize: 10 }}>Surcharge: 1.5% on card payments (waived for transfers)</div>
                  <button onClick={confirm} disabled={!amount} style={{ width: "100%", background: amount ? `linear-gradient(135deg,${C.brownD},${C.brown})` : C.border, border: "none", borderRadius: 12, padding: 14, color: amount ? C.white : C.muted, fontSize: 14, fontWeight: 700, cursor: amount ? "pointer" : "not-allowed" }}>Pay {amount ? "₦" + amount : ""} with Card →</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )}
  </>);
}
