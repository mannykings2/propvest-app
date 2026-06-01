import { useState } from "react";
import { C } from "../../constants/theme";
import Chip from "../../components/ui/Chip";
export default function Documents(){
  const [showStatement,setShowStatement]=useState(false);
  const [stmtPeriod,setStmtPeriod]=useState("Q1 2026");
  const [printing,setPrinting]=useState(false);
  const [emailSent,setEmailSent]=useState({});
  const sendEmail=(name)=>{setEmailSent(prev=>({...prev,[name]:"sending"}));setTimeout(()=>setEmailSent(prev=>({...prev,[name]:"sent"})),1600);};

  const docs=[
    {name:"Co-Ownership Deed — Maitama Residency",type:"Legal",date:"15 Nov 2025",icon:"📋"},
    {name:"SPV Certificate — PropVest Maitama Ltd",type:"SPV",date:"15 Nov 2025",icon:"🏢"},
    {name:"Co-Ownership Deed — Victoria Island Apt",type:"Legal",date:"02 Jan 2026",icon:"📋"},
    {name:"Property Title — Maitama (C of O)",type:"Title",date:"15 Nov 2025",icon:"🏛"},
    {name:"Off-Plan Agreement — Katampe Villa",type:"Off-Plan",date:"14 Feb 2026",icon:"🏗"},
    {name:"Instalment Schedule — Katampe Villa",type:"Financial",date:"14 Feb 2026",icon:"📊",emailOnly:true},
    {name:"Income Statement — Feb 2026",type:"Financial",date:"15 Feb 2026",icon:"📊",emailOnly:true},
    {name:"KYC Approval Certificate",type:"Compliance",date:"10 Nov 2025",icon:"✅",emailOnly:true},
    {name:"Withdrawal Receipt — 14 Feb 2026",type:"Financial",date:"14 Feb 2026",icon:"🏦",emailOnly:true},
  ];
  const tc={Legal:C.brown,Title:C.brownD,Financial:C.greenG,Compliance:C.goldL,SPV:C.indigoL,"Off-Plan":C.tealG};

  const STMT_DATA={
    "Q1 2026":{period:"January – March 2026",rows:[
      {month:"Jan 2026",prop:"Maitama Residency",gross:"₦20,556",mgmtFee:"₦2,056",wht:"₦1,850",net:"₦18,500"},
      {month:"Jan 2026",prop:"Victoria Island Apt",gross:"₦26,667",mgmtFee:"₦2,667",wht:"₦2,400",net:"₦24,000"},
      {month:"Feb 2026",prop:"Maitama Residency",gross:"₦20,556",mgmtFee:"₦2,056",wht:"₦1,850",net:"₦18,500"},
      {month:"Feb 2026",prop:"Victoria Island Apt",gross:"₦26,667",mgmtFee:"₦2,667",wht:"₦2,400",net:"₦24,000"},
      {month:"Mar 2026",prop:"Maitama Residency",gross:"₦20,556",mgmtFee:"₦2,056",wht:"₦1,850",net:"₦18,500"},
      {month:"Mar 2026",prop:"Victoria Island Apt",gross:"₦26,667",mgmtFee:"₦2,667",wht:"₦2,400",net:"₦24,000"},
    ],totalGross:"₦141,669",totalFees:"₦14,169",totalWHT:"₦12,750",totalNet:"₦127,500"},
    "Q4 2025":{period:"October – December 2025",rows:[
      {month:"Oct 2025",prop:"Maitama Residency",gross:"₦20,556",mgmtFee:"₦2,056",wht:"₦1,850",net:"₦18,500"},
      {month:"Nov 2025",prop:"Maitama Residency",gross:"₦20,556",mgmtFee:"₦2,056",wht:"₦1,850",net:"₦18,500"},
      {month:"Dec 2025",prop:"Maitama Residency",gross:"₦20,556",mgmtFee:"₦2,056",wht:"₦1,850",net:"₦18,500"},
    ],totalGross:"₦61,668",totalFees:"₦6,168",totalWHT:"₦5,550",totalNet:"₦55,500"},
  };

  const printStatement=()=>{
    setPrinting(true);
    setTimeout(()=>{
      const el=document.getElementById("fin-statement");
      if(el){
        const w=window.open("","_blank","width=800,height=600");
        w.document.write(`<html><head><title>Financial Statement</title><style>body{font-family:Arial,sans-serif;padding:32px;color:#111;background:#fff;}h1{font-size:20px;font-weight:700;margin-bottom:4px;}h2{font-size:14px;color:#555;font-weight:400;margin-bottom:24px;}table{width:100%;border-collapse:collapse;font-size:12px;}th{background:#f0f0f0;padding:8px 10px;text-align:left;font-weight:700;border-bottom:2px solid #ddd;}td{padding:7px 10px;border-bottom:1px solid #eee;}.total{font-weight:700;background:#f8f8f8;}.green{color:#1a6e3a;}.logo{font-size:24px;font-weight:900;color:#A0522D;margin-bottom:2px;}.sub{font-size:11px;color:#888;margin-bottom:20px;}.divider{border:none;border-top:2px solid #eee;margin:20px 0;}</style></head><body>`+el.innerHTML+`</body></html>`);
        w.document.close();
        w.print();
      }
      setPrinting(false);
    },300);
  };

  return(
    <div>
      <div style={{marginBottom:18}}><div style={{color:C.white,fontSize:20,fontWeight:700,marginBottom:4}}>Document Vault</div><div style={{color:C.muted,fontSize:13}}>Legal, financial & compliance documents</div></div>

      {/* Generate Statement CTA */}
      <div style={{background:`linear-gradient(135deg,${C.brownD},${C.brown})`,borderRadius:14,padding:"16px 18px",marginBottom:18,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{color:C.white,fontSize:14,fontWeight:700,marginBottom:3}}>📊 Financial Statement</div>
          <div style={{color:C.cream,fontSize:11,opacity:.85}}>Generate & print your income statement</div>
        </div>
        <button onClick={()=>setShowStatement(true)} style={{background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:10,padding:"10px 16px",color:C.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>Generate →</button>
      </div>

      {/* Document list */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {/* Email-only notice */}
        <div style={{background:`${C.indigoL}12`,border:`1px solid ${C.indigoL}33`,borderRadius:10,padding:"9px 14px",marginBottom:10,display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:13}}>✉️</span>
          <div style={{color:C.indigoG,fontSize:11,lineHeight:1.5}}><span style={{fontWeight:700}}>KYC Certificate, Withdrawal Receipts, Income Statements & Instalment Schedules</span> are sent to your registered email only and cannot be downloaded directly.</div>
        </div>

        {docs.map((d,i)=>{
          const status=emailSent[d.name];
          return(
          <div key={i} style={{background:C.card,border:`1px solid ${d.emailOnly?C.indigoL+"33":C.border}`,borderRadius:12,padding:"13px 16px",display:"flex",alignItems:"center",gap:12,transition:"all .2s",...(!d.emailOnly&&{cursor:"pointer"})}}>
            <span style={{fontSize:20,flexShrink:0}}>{d.icon}</span>
            <div style={{flex:1}}>
              <div style={{color:C.white,fontSize:13,marginBottom:5}}>{d.name}</div>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <Chip text={d.type} col={tc[d.type]||C.brown}/>
                <span style={{color:C.muted,fontSize:11}}>{d.date}</span>
                {d.emailOnly&&<span style={{background:`${C.indigoL}18`,border:`1px solid ${C.indigoL}33`,borderRadius:4,padding:"1px 6px",color:C.indigoG,fontSize:9,fontWeight:700}}>✉ EMAIL ONLY</span>}
              </div>
            </div>
            {d.emailOnly?(
              <button onClick={()=>status!=="sending"&&status!=="sent"&&sendEmail(d.name)} style={{background:status==="sent"?`${C.greenG}22`:status==="sending"?C.card:`${C.indigoL}22`,border:`1px solid ${status==="sent"?C.greenG:C.indigoL}44`,borderRadius:8,padding:"6px 10px",color:status==="sent"?C.greenG:C.indigoG,fontSize:10,fontWeight:700,cursor:status?"default":"pointer",flexShrink:0,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4}}>
                {status==="sending"?(<><span style={{display:"inline-block",width:10,height:10,border:`2px solid ${C.indigoG}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Sending</>):status==="sent"?"✓ Sent":"✉ Send"}
              </button>
            ):(
              <span style={{color:C.brownL,fontSize:12,flexShrink:0}}>↓ PDF</span>
            )}
          </div>
          );
        })}
      </div>

      {/* Financial Statement Modal */}
      {showStatement&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setShowStatement(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"20px 20px 0 0",padding:"24px 20px 44px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}}>
            {/* Header */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div><div style={{color:C.white,fontSize:16,fontWeight:700}}>Financial Statement</div><div style={{color:C.muted,fontSize:11,marginTop:2}}>Rental income summary for your records</div></div>
              <button onClick={()=>setShowStatement(false)} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
            </div>

            {/* Period selector */}
            <div style={{display:"flex",gap:8,marginBottom:18}}>
              {Object.keys(STMT_DATA).map(p=>(
                <button key={p} onClick={()=>setStmtPeriod(p)} style={{flex:1,background:stmtPeriod===p?`${C.brown}33`:C.bg,border:`2px solid ${stmtPeriod===p?C.brownL:C.border}`,borderRadius:10,padding:"9px",color:stmtPeriod===p?C.brownL:C.muted,fontSize:12,fontWeight:stmtPeriod===p?700:400,cursor:"pointer"}}>{p}</button>
              ))}
            </div>

            {/* Printable statement */}
            <div id="fin-statement" style={{background:C.bg,borderRadius:12,padding:"18px",marginBottom:16,border:`1px solid ${C.border}`}}>
              {/* Logo & header */}
              <div style={{marginBottom:14}}>
                <div style={{color:C.brownL,fontSize:18,fontWeight:900,marginBottom:2}}>PropVest</div>
                <div style={{color:C.muted,fontSize:10,marginBottom:12}}>StaySmart PropVest · RC 1234567 · Lagos, Nigeria</div>
                <div style={{color:C.white,fontSize:13,fontWeight:700,marginBottom:2}}>Investor Income Statement</div>
                <div style={{color:C.muted,fontSize:11,marginBottom:2}}>Investor: Chukwuemeka Adeola Johnson · USR-001</div>
                <div style={{color:C.muted,fontSize:11}}>Period: {STMT_DATA[stmtPeriod].period}</div>
              </div>
              <div style={{borderTop:`1px solid ${C.border}`,marginBottom:12}}/>

              {/* Table header */}
              <div style={{display:"grid",gridTemplateColumns:"0.8fr 1.2fr 0.8fr 0.7fr 0.7fr 0.8fr",background:C.border,borderRadius:6,padding:"7px 10px",marginBottom:4}}>
                {["Month","Property","Gross","Fee","WHT","Net"].map(h=>(<div key={h} style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:.5}}>{h}</div>))}
              </div>
              {STMT_DATA[stmtPeriod].rows.map((r,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"0.8fr 1.2fr 0.8fr 0.7fr 0.7fr 0.8fr",padding:"7px 10px",borderBottom:`1px solid ${C.border}`,background:i%2===0?"transparent":`${C.border}20`}}>
                  <div style={{color:C.dim,fontSize:10}}>{r.month}</div>
                  <div style={{color:C.white,fontSize:10,fontWeight:500}}>{r.prop}</div>
                  <div style={{color:C.goldL,fontSize:10}}>{r.gross}</div>
                  <div style={{color:C.redL,fontSize:10}}>{r.mgmtFee}</div>
                  <div style={{color:C.redL,fontSize:10}}>{r.wht}</div>
                  <div style={{color:C.greenG,fontSize:10,fontWeight:700}}>{r.net}</div>
                </div>
              ))}
              {/* Totals row */}
              <div style={{display:"grid",gridTemplateColumns:"0.8fr 1.2fr 0.8fr 0.7fr 0.7fr 0.8fr",padding:"9px 10px",background:`${C.greenG}12`,border:`1px solid ${C.greenG}33`,borderRadius:"0 0 6px 6px",marginTop:4}}>
                <div style={{color:C.white,fontSize:10,fontWeight:700,gridColumn:"1/3"}}>TOTALS</div>
                <div style={{color:C.goldL,fontSize:10,fontWeight:700}}>{STMT_DATA[stmtPeriod].totalGross}</div>
                <div style={{color:C.redL,fontSize:10,fontWeight:700}}>{STMT_DATA[stmtPeriod].totalFees}</div>
                <div style={{color:C.redL,fontSize:10,fontWeight:700}}>{STMT_DATA[stmtPeriod].totalWHT}</div>
                <div style={{color:C.greenG,fontSize:11,fontWeight:700}}>{STMT_DATA[stmtPeriod].totalNet}</div>
              </div>

              <div style={{borderTop:`1px solid ${C.border}`,marginTop:14,paddingTop:10}}>
                <div style={{color:C.muted,fontSize:9,lineHeight:1.5}}>This statement is generated by PropVest and reflects distributions credited to your PropVest wallet. Management fee (10%) and Withholding Tax (9%) are deducted at source. For queries contact support@staysmartpropvest.com · Generated {new Date().toLocaleDateString("en-GB")}</div>
              </div>
            </div>

            {/* Print button */}
            <button onClick={printStatement} disabled={printing} style={{width:"100%",background:printing?C.card:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:12,padding:14,color:C.white,fontSize:14,fontWeight:700,cursor:printing?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {printing?(<><span style={{display:"inline-block",width:14,height:14,border:`2px solid ${C.brownL}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Preparing...</>):<>🖨 Print / Save as PDF</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

