import { useState } from "react";
import { C } from "./constants/theme";
import Dashboard from "./features/dashboard/Dashboard";
import Properties from "./features/properties/Properties";
import Portfolio from "./features/portfolio/Portfolio";
import OffPlan from "./features/offplan/OffPlan";
import Withdraw from "./features/withdraw/Withdraw";
import Documents from "./features/documents/Documents";
import DeveloperPortal from "./features/developer/DeveloperPortal";
import AdminDashboard from "./features/admin/AdminDashboard";
import Profile from "./features/profile/Profile";
import Support from "./features/support/Support";
import HardCopyModal from "./components/HardCopyModal";

const USER_TABS = ["Dashboard", "Properties", "Portfolio", "OffPlan", "Withdraw"];

export default function PropVestApp() {
  const [mode, setMode] = useState("user"); // user | developer | admin
  const [tab, setTab] = useState("Dashboard");
  const [showMore, setShowMore] = useState(false);
  const [showHardCopy, setShowHardCopy] = useState(false);

  const switchMode = (m) => {
    setMode(m);
    if (m === "developer") setTab("DevPortal");
    else if (m === "admin") setTab("AdminMain");
    else setTab("Dashboard");
  };

  const screens = { Dashboard, Properties, Portfolio, OffPlan, Withdraw, Support, Documents, Profile, DevPortal: DeveloperPortal, AdminMain: AdminDashboard };
  const Screen = screens[tab] || Dashboard;
  const icons = { Dashboard: "⊞", Properties: "🏘", Portfolio: "📊", OffPlan: "🏗", Withdraw: "🏦", Support: "🎧", Documents: "📄", Profile: "👤", DevPortal: "🏗", AdminMain: "⚙" };
  const modeCol = { user: C.brownD, developer: C.indigo, admin: "#1A3A1A" };

  return (<>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{background:#0B0D11;}select option{background:#13161C;color:#FDFAF6;}@keyframes spin{to{transform:rotate(360deg)}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#2A2E3A;border-radius:2px}`}</style>
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans',sans-serif", color: C.white, display: "flex", justifyContent: "center", paddingBottom: 72 }}>
      <div style={{ width: "100%", maxWidth: 480, position: "relative" }}>

        {/* Header */}
        <div style={{ position: "sticky", top: 0, zIndex: 100, background: `${C.bg}F2`, backdropFilter: "blur(14px)", borderBottom: `1px solid ${mode === "admin" ? C.greenL + "33" : C.border}`, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${C.brownD},${C.brown})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: C.white }}>P</div>
            <div>
              <div style={{ color: C.white, fontWeight: 700, fontSize: 14, lineHeight: 1 }}>PropVest</div>
              <div style={{ color: mode === "admin" ? C.greenG : C.muted, fontSize: 9, fontFamily: "monospace", letterSpacing: .5 }}>{mode === "admin" ? "ADMIN PORTAL" : mode === "developer" ? "DEVELOPER" : "STAYSMART"}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 2, gap: 1 }}>
              {[["user", "👤"], ["developer", "🏗"], ["admin", "⚙"]].map(([m, ico]) => (
                <button key={m} onClick={() => switchMode(m)} style={{ background: mode === m ? modeCol[m] : "transparent", border: "none", borderRadius: 16, padding: "4px 8px", color: mode === m ? C.white : C.muted, fontSize: 12, fontWeight: mode === m ? 700 : 400, cursor: "pointer", whiteSpace: "nowrap" }} title={m.charAt(0).toUpperCase() + m.slice(1)}>{ico}</button>
              ))}
            </div>
            <div style={{ background: `${C.green}33`, border: `1px solid ${C.greenL}44`, borderRadius: 20, padding: "3px 9px", fontSize: 10, color: C.greenG, fontFamily: "monospace" }}>SEC ✓</div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ padding: "22px 18px 12px", animation: "fadeUp .25s ease" }} key={tab + mode}>
          {tab === "Withdraw" && (<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><div style={{ width: 34, height: 34, borderRadius: 10, background: `${C.green}33`, border: `1px solid ${C.greenL}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏦</div><div style={{ color: C.tealG, fontSize: 10, fontFamily: "monospace", letterSpacing: 1 }}>DIRECT BANK TRANSFER · NIBSS VERIFIED</div></div>)}
          {tab === "OffPlan" && (<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><div style={{ width: 34, height: 34, borderRadius: 10, background: `${C.teal}33`, border: `1px solid ${C.tealL}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏗</div><div style={{ color: C.tealG, fontSize: 10, fontFamily: "monospace", letterSpacing: 1 }}>OFF-PLAN · INSTALMENT PURCHASE</div></div>)}
          {mode === "developer" && (<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}><div style={{ width: 34, height: 34, borderRadius: 10, background: `${C.indigo}44`, border: `1px solid ${C.indigoL}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏗</div><div style={{ color: C.indigoG, fontSize: 10, fontFamily: "monospace", letterSpacing: 1 }}>VERIFIED DEVELOPER PORTAL</div></div>)}
          {mode === "admin" && (<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}><div style={{ width: 34, height: 34, borderRadius: 10, background: `${C.green}33`, border: `1px solid ${C.greenL}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚙</div><div style={{ color: C.greenG, fontSize: 10, fontFamily: "monospace", letterSpacing: 1 }}>PROPVEST ADMIN · OPERATIONS CENTRE</div></div>)}
          <Screen nav={setTab} />
        </div>

        {/* More bottom sheet */}
        {showMore && mode === "user" && (
          <div style={{ position: "fixed", inset: 0, zIndex: 150, display: "flex", flexDirection: "column", justifyContent: "flex-end" }} onClick={() => setShowMore(false)}>
            <div onClick={e => e.stopPropagation()} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "20px 20px 0 0", padding: "20px 20px 88px", width: "100%", maxWidth: 480, margin: "0 auto", boxShadow: "0 -8px 40px rgba(0,0,0,.6)" }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border, margin: "0 auto 18px" }} />
              <div style={{ color: C.creamD, fontSize: 10, fontFamily: "monospace", letterSpacing: 1, marginBottom: 14 }}>MORE OPTIONS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["🎧", "Support", "Your tickets, live chat & help", "Support", C.brownL], ["📄", "Documents", "Deeds, statements & legal docs", "Documents", C.indigoG], ["👤", "Profile", "Personal info, KYC & verification", "Profile", C.goldL]].map(([icon, label, desc, screen, col]) => (
                  <button key={screen} onClick={() => { setTab(screen); setShowMore(false); }} style={{ background: tab === screen ? `${col}18` : C.bg, border: `1px solid ${tab === screen ? col + "44" : C.border}`, borderRadius: 14, padding: "14px 16px", cursor: "pointer", display: "flex", gap: 14, alignItems: "center", textAlign: "left" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${col}22`, border: `1px solid ${col}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: tab === screen ? col : C.white, fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{label}</div>
                      <div style={{ color: C.muted, fontSize: 11 }}>{desc}</div>
                    </div>
                    {tab === screen && <div style={{ width: 6, height: 6, borderRadius: "50%", background: col, flexShrink: 0 }} />}
                    <span style={{ color: C.muted, fontSize: 16, flexShrink: 0 }}>→</span>
                  </button>
                ))}
                <button onClick={() => { setShowMore(false); setShowHardCopy(true); }} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", cursor: "pointer", display: "flex", gap: 14, alignItems: "center", textAlign: "left" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${C.tealG}22`, border: `1px solid ${C.tealL}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📦</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: C.white, fontWeight: 700, fontSize: 14, marginBottom: 3 }}>Request Hard Copy</div>
                    <div style={{ color: C.muted, fontSize: 11 }}>Get physical documents delivered to you</div>
                  </div>
                  <span style={{ color: C.muted, fontSize: 16, flexShrink: 0 }}>→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hard Copy Request Modal */}
        {showHardCopy && <HardCopyModal onClose={() => setShowHardCopy(false)} />}

        {/* Bottom nav */}
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: `${C.card}F8`, backdropFilter: "blur(16px)", borderTop: `1px solid ${mode === "admin" ? C.greenL + "44" : mode === "developer" ? C.indigoL + "44" : C.border}`, display: "flex", zIndex: 100 }}>
          {mode === "developer" && (<div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "13px 8px 14px", gap: 3, position: "relative" }}><div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: C.indigoL, borderRadius: 1 }} /><span style={{ fontSize: 16 }}>🏗</span><span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: .4, color: C.indigoG, fontWeight: 600 }}>DEVELOPER PORTAL</span></div>)}
          {mode === "admin" && (<div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "13px 8px 14px", gap: 3, position: "relative" }}><div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: C.greenG, borderRadius: 1 }} /><span style={{ fontSize: 16 }}>⚙</span><span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: .4, color: C.greenG, fontWeight: 600 }}>ADMIN PORTAL</span></div>)}
          {mode === "user" && (<>
            {USER_TABS.map(t => {
              const active = tab === t;
              const col = t === "Withdraw" ? C.greenG : t === "OffPlan" ? C.tealG : C.brownL;
              return (
                <button key={t} onClick={() => { setTab(t); setShowMore(false); }} style={{ flex: 1, background: "none", border: "none", padding: "11px 2px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, position: "relative" }}>
                  {active && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: col, borderRadius: 1 }} />}
                  <span style={{ fontSize: 14, opacity: active ? 1 : .4 }}>{icons[t]}</span>
                  <span style={{ fontSize: 8, fontFamily: "monospace", letterSpacing: .3, color: active ? col : C.muted, fontWeight: active ? 600 : 400 }}>{t === "OffPlan" ? "OFF-PLAN" : t.toUpperCase()}</span>
                </button>
              );
            })}
            <button onClick={() => setShowMore(!showMore)} style={{ flex: 1, background: "none", border: "none", padding: "11px 2px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, position: "relative" }}>
              {["Support", "Documents", "Profile"].includes(tab) && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: C.brownL, borderRadius: 1 }} />}
              <span style={{ fontSize: 14, opacity: showMore || ["Support", "Documents", "Profile"].includes(tab) ? 1 : .4 }}>⋯</span>
              <span style={{ fontSize: 8, fontFamily: "monospace", letterSpacing: .3, color: showMore || ["Support", "Documents", "Profile"].includes(tab) ? C.brownL : C.muted, fontWeight: showMore || ["Support", "Documents", "Profile"].includes(tab) ? 600 : 400 }}>MORE</span>
            </button>
          </>)}
        </div>
      </div>
    </div>
  </>);
}
