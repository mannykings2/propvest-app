import { useState } from "react";
import { C } from "../../constants/theme";
import { OFF_PLAN } from "../../constants/data";
import Bar from "../../components/ui/Bar";
import Chip from "../../components/ui/Chip";
import RenderView from "./RenderView";
export default function OffPlan(){
  const [view,setView]=useState("list");
  const [sel,setSel]=useState(null);
  const [plan,setPlan]=useState(null);
  
  const [modal,setModal]=useState(false);
  const [agreed,setAgreed]=useState(false);
  const [processing,setProcessing]=useState(false);

  const stageCol={Foundation:C.muted,Superstructure:C.goldL,Roofing:C.brownL,Finishing:C.greenG};
  const stagePct={Foundation:20,Superstructure:45,Roofing:70,Finishing:90};

  const [finishType,setFinishType]=useState(null);
  const [renderView,setRenderView]=useState(0);
  const [opSearch,setOpSearch]=useState("");
  const [opFilterLoc,setOpFilterLoc]=useState("All");
  const [opFilterType,setOpFilterType]=useState("All");
  const [opFilterStage,setOpFilterStage]=useState("All");
  const [opShowFilters,setOpShowFilters]=useState(false);
  const open=(p)=>{setSel(p);setPlan(p.plans[0]);setFinishType(p.finishTypes[0]);setRenderView(0);setView("detail");};
  const filteredOffPlan=OFF_PLAN.filter(p=>{
    const q=opSearch.toLowerCase();
    if(q&&!p.name.toLowerCase().includes(q)&&!p.loc.toLowerCase().includes(q)&&!p.type.toLowerCase().includes(q)&&!p.developer.toLowerCase().includes(q)) return false;
    if(opFilterLoc!=="All"&&!p.loc.toLowerCase().includes(opFilterLoc.toLowerCase())) return false;
    if(opFilterType!=="All"&&p.type!==opFilterType) return false;
    if(opFilterStage!=="All"&&p.stage!==opFilterStage) return false;
    return true;
  });
  const opActiveFilters=[opFilterLoc,opFilterType,opFilterStage].filter(v=>v!=="All").length;
  const activePrice=(p)=>finishType?finishType.price:p.price;
  const down=(p)=>Math.round(activePrice(p)*(p.downPct/100));
  const balance=(p,pl)=>activePrice(p)-down(p);
  const interest=(p,pl)=>Math.round(balance(p,pl)*(pl.rate/100));
  const total=(p,pl)=>balance(p,pl)+interest(p,pl);
  const monthly=(p,pl)=>Math.round(total(p,pl)/pl.months);

  const confirm=()=>{setProcessing(true);setTimeout(()=>{setProcessing(false);setView("success");},2200);};

  if(view==="success"&&sel&&plan) return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 16px",textAlign:"center"}}>
      <div style={{width:76,height:76,borderRadius:"50%",background:`${C.teal}33`,border:`2px solid ${C.tealG}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,marginBottom:22}}>🏗</div>
      <div style={{color:C.white,fontSize:22,fontWeight:700,marginBottom:6}}>Purchase Confirmed!</div>
      <div style={{color:C.tealG,fontSize:18,fontWeight:700,marginBottom:4}}>{sel.name}</div>
      <div style={{color:C.dim,fontSize:13,marginBottom:20}}>{sel.loc} · {sel.type}</div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 22px",marginBottom:20,width:"100%",maxWidth:360,textAlign:"left"}}>
        {[["Down Payment",`₦${down(sel).toLocaleString()}`],["Subscription Fee (2%)",`₦${Math.round(activePrice(sel)*0.02).toLocaleString()}`],["Monthly Instalment",`₦${monthly(sel,plan).toLocaleString()}`],["Duration",plan.label],["Total Payable",`₦${(down(sel)+total(sel,plan)).toLocaleString()}`],["Completion Est.",sel.completion],["Developer",sel.developer]].map(([l,v])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.border}`}}><span style={{color:l==="Subscription Fee (2%)"?C.goldL:C.muted,fontSize:12}}>{l}</span><span style={{color:l==="Subscription Fee (2%)"?C.goldL:C.white,fontSize:13,fontWeight:600}}>{v}</span></div>))}
      </div>
      <div style={{background:`${C.green}18`,border:`1px solid ${C.greenL}33`,borderRadius:10,padding:"12px 16px",marginBottom:24,width:"100%",maxWidth:360,textAlign:"left"}}>
        <div style={{color:C.greenG,fontSize:12,marginBottom:4}}>📱 What happens next</div>
        <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>Down payment processed today. Monthly instalments auto-debited on the same date. You'll receive construction progress updates every month and your title deed on completion.</div>
      </div>
      <button onClick={()=>{setView("list");setSel(null);setPlan(null);}} style={{background:C.tealL,border:"none",borderRadius:10,padding:"13px 28px",color:C.white,fontSize:14,fontWeight:600,cursor:"pointer"}}>Back to Off-Plan</button>
    </div>
  );

  if(view==="confirm"&&sel&&plan){
    const refundAmt=Math.round((down(sel)+total(sel,plan)*((plan.months-1)/plan.months))*0.85);
    const deductAmt=Math.round((down(sel)+total(sel,plan)*((plan.months-1)/plan.months))*0.15);
    const subFee=Math.round(activePrice(sel)*0.02);
    const dueToday=down(sel)+subFee;
    return(
    <div>
      <button onClick={()=>setView("detail")} style={{background:"none",border:"none",color:C.tealG,fontSize:13,cursor:"pointer",marginBottom:18}}>← Back</button>
      <div style={{color:C.white,fontSize:18,fontWeight:700,marginBottom:4}}>Confirm Purchase</div>
      <div style={{color:C.muted,fontSize:13,marginBottom:20}}>{sel.name} · {plan.label} instalment plan</div>

      {/* Payment breakdown */}
      <div style={{background:C.card,border:`1px solid ${C.tealL}44`,borderRadius:14,overflow:"hidden",marginBottom:16}}>
          <div style={{background:C.teal,padding:"12px 16px"}}><span style={{color:C.white,fontWeight:700,fontSize:13}}>Payment Breakdown</span></div>
          {[
            ["Property Price",`₦${activePrice(sel).toLocaleString()}`,C.white,false],
            [`Down Payment (${sel.downPct}%)`,`₦${down(sel).toLocaleString()}`,C.tealG,false],
            ["Subscription Fee (2%)",`₦${subFee.toLocaleString()}`,C.goldL,false],
            ["Balance to Finance",`₦${balance(sel,plan).toLocaleString()}`,C.brownL,false],
            [`Interest (${plan.rate}%)`,`₦${interest(sel,plan).toLocaleString()}`,plan.rate===0?C.greenG:C.redL,false],
            ["Total Financed",`₦${total(sel,plan).toLocaleString()}`,C.white,true],
            [`Monthly Instalment (${plan.months} months)`,`₦${monthly(sel,plan).toLocaleString()}`,C.tealG,true],
            ["Total Payable (incl. sub fee)",`₦${(down(sel)+total(sel,plan)+subFee).toLocaleString()}`,C.goldL,true],
          ].map(([l,v,c,hi],i,arr)=>(<div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",background:hi?`${C.teal}18`:l==="Subscription Fee (2%)"?`${C.goldL}08`:i%2===1?`${C.border}20`:"transparent"}}><span style={{color:l==="Subscription Fee (2%)"?C.goldL:C.muted,fontSize:12}}>{l}</span><span style={{color:c,fontSize:hi?14:13,fontWeight:hi?700:500}}>{v}</span></div>))}
          <div style={{background:`${C.goldL}12`,borderTop:`1px solid ${C.goldL}33`,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:C.goldL,fontWeight:700,fontSize:13}}>Due Today</div>
              <div style={{color:C.muted,fontSize:10,marginTop:2}}>Down payment + 2% subscription fee</div>
            </div>
            <div style={{color:C.goldL,fontSize:20,fontWeight:700,fontFamily:"monospace"}}>₦{dueToday.toLocaleString()}</div>
          </div>
        </div>

      {/* TERMS & CONDITIONS */}
      <div style={{background:"#0A1A0A",border:`2px solid ${C.tealL}66`,borderRadius:14,overflow:"hidden",marginBottom:16}}>
        <div style={{background:`linear-gradient(135deg,${C.teal},#0A3040)`,padding:"12px 16px",display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:16}}>📋</span>
          <span style={{color:C.white,fontWeight:700,fontSize:13}}>Terms & Conditions — Off-Plan Instalment</span>
        </div>
        <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:12}}>

          {/* Clause 1 — Payment */}
          <div style={{borderLeft:`3px solid ${C.tealG}`,paddingLeft:12}}>
            <div style={{color:C.tealG,fontWeight:700,fontSize:12,marginBottom:4}}>1. Payment Schedule</div>
            <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
              Monthly instalments of <span style={{color:C.white,fontWeight:600}}>₦{monthly(sel,plan).toLocaleString()}</span> are due on the same calendar date each month for <span style={{color:C.white,fontWeight:600}}>{plan.months} consecutive months</span>. Payments are automatically debited from your linked PropVest wallet or bank account on the due date.
            </div>
          </div>

          {/* Clause 2 — Grace Period */}
          <div style={{borderLeft:`3px solid ${C.goldL}`,paddingLeft:12}}>
            <div style={{color:C.goldL,fontWeight:700,fontSize:12,marginBottom:4}}>2. Grace Period — 20 Days</div>
            <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
              If your instalment is not received by the due date, you are granted a <span style={{color:C.goldL,fontWeight:700}}>20-day grace period</span> to make the outstanding payment. During this period your subscription remains active and no penalty is applied. PropVest will send reminders via SMS, email, and push notification on Days 1, 7, 14, and 20.
            </div>
          </div>

          {/* Clause 3 — Default & Refund */}
          <div style={{borderLeft:`3px solid ${C.redL}`,paddingLeft:12}}>
            <div style={{color:C.redL,fontWeight:700,fontSize:12,marginBottom:4}}>3. Default & Automatic Termination</div>
            <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
              If payment is <span style={{color:C.redL,fontWeight:700}}>not received within the 20-day grace period</span>, your off-plan subscription will be <span style={{color:C.redL,fontWeight:700}}>automatically terminated</span>. PropVest will process a refund of all amounts paid to date minus a <span style={{color:C.redL,fontWeight:700}}>15% administrative and reservation fee</span>.
            </div>
          </div>

          {/* Refund calculation box */}
          <div style={{background:"rgba(139,48,48,.15)",border:`1px solid ${C.redL}33`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{color:C.redL,fontSize:11,fontWeight:700,marginBottom:8}}>📊 Example — If Default Occurs at Midpoint</div>
            {[
              ["Total Paid to Date (example)","Amount paid before default",C.white],
              ["Reservation Fee Deducted","15% of total paid",C.redL],
              ["Refund to Your Wallet","85% of total paid",C.greenG],
            ].map(([l,sub,c])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"5px 0",borderBottom:`1px solid rgba(255,255,255,.06)`}}>
              <div><div style={{color:c,fontSize:12,fontWeight:600}}>{l}</div><div style={{color:C.muted,fontSize:10}}>{sub}</div></div>
            </div>))}
            <div style={{marginTop:8,padding:"8px 0",borderTop:`1px solid ${C.redL}33`}}>
              <div style={{color:C.dim,fontSize:10,lineHeight:1.6}}>Refund is processed within <span style={{color:C.white,fontWeight:600}}>7 business days</span> of termination. The 15% fee covers property reservation costs, legal documentation, developer holding fees, and PropVest administrative costs.</div>
            </div>
          </div>

          {/* Clause 4 — Reinstatement */}
          <div style={{borderLeft:`3px solid ${C.indigoL}`,paddingLeft:12}}>
            <div style={{color:C.indigoG,fontWeight:700,fontSize:12,marginBottom:4}}>4. Reinstatement Option</div>
            <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
              Within the 20-day grace period, you may contact PropVest support to request a <span style={{color:C.indigoG,fontWeight:600}}>plan restructure</span> — extending your payment duration or reducing monthly amounts — subject to developer approval. Reinstatement after termination requires a new subscription at current market price.
            </div>
          </div>

          {/* Clause 5 — Escrow */}
          <div style={{borderLeft:`3px solid ${C.brownL}`,paddingLeft:12}}>
            <div style={{color:C.brownL,fontWeight:700,fontSize:12,marginBottom:4}}>5. Escrow Protection</div>
            <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
              All instalment payments are held in a <span style={{color:C.brownL,fontWeight:600}}>PropVest-managed escrow account</span> and only released to the developer upon verified construction milestone completion. If the developer fails to deliver, 100% of your funds are refunded with no deduction.
            </div>
          </div>
        </div>
      </div>

      {/* Agreement checkbox */}
      <div onClick={()=>setAgreed(!agreed)} style={{background:agreed?`${C.teal}22`:`${C.border}30`,border:`1px solid ${agreed?C.tealG:C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:18,cursor:"pointer",display:"flex",gap:12,alignItems:"flex-start",transition:"all .2s"}}>
        <div style={{width:20,height:20,borderRadius:5,border:`2px solid ${agreed?C.tealG:C.muted}`,background:agreed?C.tealG:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,transition:"all .2s"}}>
          {agreed&&<span style={{color:C.white,fontSize:13,fontWeight:700}}>✓</span>}
        </div>
        <div style={{color:agreed?C.white:C.dim,fontSize:12,lineHeight:1.6}}>
          I have read and agree to the <span style={{color:C.tealG,fontWeight:600}}>Terms & Conditions</span> above. I understand that missed instalments after the <span style={{color:C.goldL,fontWeight:600}}>20-day grace period</span> will result in termination with a <span style={{color:C.redL,fontWeight:600}}>15% deduction</span> from my total refund.
        </div>
      </div>

      <button onClick={()=>agreed&&confirm()} disabled={processing||!agreed} style={{width:"100%",background:!agreed?C.card:processing?C.card:`linear-gradient(135deg,${C.teal},${C.tealL})`,border:`1px solid ${agreed?C.tealG:C.border}`,borderRadius:12,padding:15,color:agreed?C.white:C.muted,fontSize:14,fontWeight:700,cursor:!agreed||processing?"not-allowed":"pointer",transition:"all .2s"}}>
        {processing?(<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><span style={{display:"inline-block",width:14,height:14,border:`2px solid ${C.tealG}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Processing...</span>):!agreed?"Please accept Terms & Conditions":`Confirm — Pay ₦${(down(sel)+Math.round(activePrice(sel)*0.02)).toLocaleString()} Today`}
      </button>
      <div style={{color:C.muted,fontSize:10,textAlign:"center",marginTop:8,lineHeight:1.5}}>By confirming you accept the PropVest Off-Plan T&C · Governed by Nigerian law</div>
    </div>
  );}

  if(view==="detail"&&sel) return(
    <div>
      <button onClick={()=>setView("list")} style={{background:"none",border:"none",color:C.tealG,fontSize:13,cursor:"pointer",marginBottom:18}}>← Back</button>
      {/* 3D Render Gallery */}
      <div style={{borderRadius:16,overflow:"hidden",marginBottom:18,border:`1px solid ${C.border}`}}>
        {/* Main render view */}
        <div style={{height:200,position:"relative",background:sel.renders?sel.renders[renderView].col:"#0F2A2E",overflow:"hidden"}}>
          {sel.renders&&(
            <RenderView render={sel.renders[renderView]} name={sel.name}/>
          )}
          <div style={{position:"absolute",top:12,left:12,background:"rgba(0,0,0,.5)",borderRadius:8,padding:"4px 10px",color:C.white,fontSize:10,fontWeight:600,backdropFilter:"blur(4px)"}}>{sel.renders?sel.renders[renderView].label:"3D Render"}</div>
          <div style={{position:"absolute",top:12,right:12}}><Chip text={sel.stage.toUpperCase()} col={stageCol[sel.stage]||C.goldL}/></div>
          <div style={{position:"absolute",bottom:12,right:12,background:"rgba(0,0,0,.5)",borderRadius:20,padding:"3px 8px",color:"#22D3EE",fontSize:9,fontWeight:700,backdropFilter:"blur(4px)"}}>🔮 3D RENDER</div>
        </div>
        {/* View switcher */}
        <div style={{background:C.card,borderTop:`1px solid ${C.border}`,display:"flex"}}>
          {(sel.renders||[]).map((r,i)=>(
            <button key={r.view} onClick={()=>setRenderView(i)} style={{flex:1,background:"none",border:"none",borderBottom:`2px solid ${renderView===i?C.tealG:"transparent"}`,padding:"9px 4px",cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:12,marginBottom:2}}>{r.view==="Exterior"?"🏠":r.view==="Interior"?"🛋":"📐"}</div>
              <div style={{color:renderView===i?C.tealG:C.muted,fontSize:9,fontFamily:"monospace",fontWeight:renderView===i?700:400}}>{r.view}</div>
            </button>
          ))}
        </div>
        {/* Description bar */}
        <div style={{background:`${C.teal}10`,borderTop:`1px solid ${C.border}`,padding:"8px 14px"}}>
          <div style={{color:C.dim,fontSize:10,lineHeight:1.5}}>{sel.renders?sel.renders[renderView].desc:sel.name}</div>
        </div>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {[["Price",`₦${(activePrice(sel)/1000000).toFixed(1)}M`,C.white],["Down",`${sel.downPct}%`,C.tealG],["Completion",sel.completion,C.goldL]].map(([l,v,c])=>(<div key={l} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 6px",textAlign:"center"}}><div style={{color:C.muted,fontSize:9,fontFamily:"monospace",marginBottom:5}}>{l}</div><div style={{color:c,fontWeight:700,fontSize:13}}>{v}</div></div>))}
      </div>

      {/* Construction progress */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1}}>CONSTRUCTION STAGE</span><Chip text={sel.stage} col={stageCol[sel.stage]||C.goldL}/></div>
        <Bar pct={stagePct[sel.stage]||20} col={stageCol[sel.stage]||C.goldL} h={8}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
          {["Foundation","Superstructure","Roofing","Finishing"].map((s,i)=>(<span key={s} style={{color:s===sel.stage?stageCol[sel.stage]:C.muted,fontSize:9,fontFamily:"monospace"}}>{i+1}.{s.slice(0,4)}</span>))}
        </div>
      </div>

      {/* Features */}
      <div style={{marginBottom:16}}>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>FEATURES</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {sel.features.map(f=>(<span key={f} style={{background:`${C.teal}33`,border:`1px solid ${C.tealL}44`,borderRadius:20,padding:"5px 12px",color:C.tealG,fontSize:11}}>✓ {f}</span>))}
        </div>
      </div>

      {/* Developer */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 16px",marginBottom:20,display:"flex",gap:10,alignItems:"center"}}>
        <span style={{fontSize:20}}>🏗</span>
        <div><div style={{color:C.white,fontWeight:600,fontSize:13}}>{sel.developer}</div><div style={{color:C.dim,fontSize:11}}>PropVest Verified Developer</div></div>
        <Chip text="VERIFIED" col={C.greenG}/>
      </div>

      {/* Finish type selector */}
      {sel.finishTypes&&(
      <div style={{marginBottom:20}}>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>FINISH TYPE</div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          {sel.finishTypes.map(ft=>(
            <button key={ft.id} onClick={()=>setFinishType(ft)} style={{flex:1,background:finishType?.id===ft.id?`linear-gradient(135deg,${C.teal},${C.tealL})`:C.card,border:`2px solid ${finishType?.id===ft.id?C.tealG:C.border}`,borderRadius:10,padding:"11px 4px",cursor:"pointer",textAlign:"center",transition:"all .2s"}}>
              <div style={{fontSize:finishType?.id===ft.id?11:10,color:finishType?.id===ft.id?C.white:C.dim,fontWeight:700,marginBottom:3}}>{ft.id==="carcass"?"🧱":ft.id==="semi"?"🔨":"✨"} {ft.label}</div>
              <div style={{color:finishType?.id===ft.id?C.tealG:C.muted,fontSize:10,fontFamily:"monospace",fontWeight:700}}>₦{(ft.price/1000000).toFixed(1)}M</div>
            </button>
          ))}
        </div>
        {finishType&&(
          <div style={{background:C.card,border:`1px solid ${C.tealL}33`,borderRadius:12,padding:"14px 16px"}}>
            <div style={{color:C.tealG,fontSize:12,fontWeight:700,marginBottom:6}}>{finishType.id==="carcass"?"🧱":finishType.id==="semi"?"🔨":"✨"} {finishType.label} — ₦{(finishType.price/1000000).toFixed(1)}M</div>
            <div style={{color:C.dim,fontSize:11,lineHeight:1.6,marginBottom:10}}>{finishType.desc}</div>
            <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>WHAT'S INCLUDED</div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {finishType.includes.map(item=>(
                <div key={item} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{color:C.tealG,fontSize:11,marginTop:1,flexShrink:0}}>✓</span>
                  <span style={{color:C.dim,fontSize:11}}>{item}</span>
                </div>
              ))}
            </div>
            {finishType.id!=="carcass"&&(
              <div style={{marginTop:10,background:`${C.teal}15`,border:`1px solid ${C.tealL}22`,borderRadius:8,padding:"7px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:C.muted,fontSize:10}}>Extra vs Carcass</span>
                <span style={{color:C.tealG,fontSize:11,fontWeight:700}}>+₦{((finishType.price-sel.finishTypes[0].price)/1000000).toFixed(1)}M</span>
              </div>
            )}
          </div>
        )}
      </div>
      )}

      {/* Plan selector */}
      <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>PAYMENT PLAN</div>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {sel.plans.map(pl=>(<button key={pl.id} onClick={()=>setPlan(pl)} style={{flex:1,background:plan?.id===pl.id?`${C.teal}`:C.card,border:`1px solid ${plan?.id===pl.id?C.tealG:C.border}`,borderRadius:10,padding:"10px 4px",cursor:"pointer",transition:"all .2s",textAlign:"center"}}>
          <div style={{color:plan?.id===pl.id?C.white:C.white,fontWeight:700,fontSize:12}}>{pl.label}</div>
          <div style={{color:plan?.id===pl.id?C.tealG:C.muted,fontSize:10,marginTop:2}}>{pl.rate===0?"0% interest":`+${pl.rate}% interest`}</div>
        </button>))}
      </div>

      {plan&&(
        <div style={{background:`${C.teal}22`,border:`1px solid ${C.tealL}44`,borderRadius:12,padding:"16px",marginBottom:20}}>
          <div style={{color:C.tealG,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>PAYMENT SUMMARY</div>
          <div style={{display:"flex",gap:10,marginBottom:10}}>
            <div style={{flex:1,textAlign:"center"}}><div style={{color:C.dim,fontSize:10,marginBottom:4}}>Down Payment</div><div style={{color:C.tealG,fontWeight:700,fontSize:16}}>₦{down(sel).toLocaleString()}</div><div style={{color:C.dim,fontSize:10}}>Today</div></div>
            <div style={{width:1,background:C.border}}/>
            <div style={{flex:1,textAlign:"center"}}><div style={{color:C.dim,fontSize:10,marginBottom:4}}>Monthly</div><div style={{color:C.white,fontWeight:700,fontSize:16}}>₦{monthly(sel,plan).toLocaleString()}</div><div style={{color:C.dim,fontSize:10}}>{plan.label}</div></div>
            <div style={{width:1,background:C.border}}/>
            <div style={{flex:1,textAlign:"center"}}><div style={{color:C.dim,fontSize:10,marginBottom:4}}>Total</div><div style={{color:C.goldL,fontWeight:700,fontSize:16}}>₦{(down(sel)+total(sel,plan)).toLocaleString()}</div><div style={{color:C.dim,fontSize:10}}>All-in</div></div>
          </div>
          {plan.rate===0&&<div style={{background:`${C.green}22`,borderRadius:8,padding:"8px 12px",textAlign:"center"}}><span style={{color:C.greenG,fontSize:12,fontWeight:600}}>🎉 Zero interest on this plan!</span></div>}
        </div>
      )}

      <button onClick={()=>{setView("confirm");setAgreed(false);}} style={{width:"100%",background:`linear-gradient(135deg,${C.teal},${C.tealL})`,border:"none",borderRadius:12,padding:15,color:C.white,fontSize:14,fontWeight:700,cursor:"pointer"}}>Proceed to Purchase →</button>
    </div>
  );

  return(<div>
    <div style={{background:`linear-gradient(135deg,${C.teal},${C.tealL})`,borderRadius:16,padding:"22px 24px",marginBottom:16,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:-20,top:-20,width:150,height:150,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
      <div style={{color:C.tealG,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:6}}>OFF-PLAN PROPERTIES</div>
      <div style={{color:C.white,fontSize:22,fontWeight:700,marginBottom:6}}>Buy Direct. Pay Installmentally.</div>
      <div style={{color:C.tealG,fontSize:13,opacity:.9,lineHeight:1.6}}>Purchase a property before or during construction at today's price, with flexible instalment plans. You lock in the price now and complete payment as the project is built.</div>
    </div>

    {/* What is Off-Plan */}
    <div style={{background:C.card,border:`1px solid ${C.tealL}33`,borderRadius:12,padding:"14px 16px",marginBottom:12}}>
      <div style={{color:C.tealG,fontSize:11,fontWeight:700,marginBottom:8}}>🏗 What is Off-Plan?</div>
      <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
        Off-plan means you are buying a property that has not yet been completed. You commit to the purchase at an agreed price, pay a down payment today, and spread the remaining balance over a chosen instalment period. Once the property is completed and handed over, the full title deed is transferred to you.
      </div>
      <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:6}}>
        {[["📍","Lock in today's price before completion drives it up"],["📆","Flexible payment plans — spread cost over 6 to 36 months"],["📢","You will receive regular construction progress updates throughout the project"],["🔒","All payments held in PropVest escrow, released only at verified milestones"]].map(([icon,text])=>(
          <div key={text} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
            <span style={{fontSize:12,marginTop:1,flexShrink:0}}>{icon}</span>
            <span style={{color:C.dim,fontSize:11,lineHeight:1.5}}>{text}</span>
          </div>
        ))}
      </div>
    </div>

    {/* 2% fee notice */}
    <div style={{background:`${C.goldL}10`,border:`1px solid ${C.goldL}33`,borderRadius:10,padding:"11px 14px",marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}>
      <span style={{fontSize:14,flexShrink:0}}>⚠</span>
      <div style={{color:C.dim,fontSize:11,lineHeight:1.6}}>A <span style={{color:C.goldL,fontWeight:700}}>2% subscription fee</span> is charged at the point of subscription. This covers <span style={{color:C.white,fontWeight:600}}>legal documentation, title verification and PropVest platform service fees</span>. This fee is non-refundable and is deducted from your first payment.</div>
    </div>

    {/* ── SEARCH & FILTER ── */}
    <div style={{marginBottom:16}}>
      <div style={{position:"relative",marginBottom:8}}>
        <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.muted,fontSize:14}}>🔍</div>
        <input
          type="text"
          placeholder="Search by name, location, type or developer..."
          value={opSearch}
          onChange={e=>setOpSearch(e.target.value)}
          style={{width:"100%",background:C.card,border:`2px solid ${opSearch?C.tealL:C.border}`,borderRadius:10,padding:"11px 40px 11px 38px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box"}}
        />
        {opSearch&&(
          <button onClick={()=>setOpSearch("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:C.muted,fontSize:16,cursor:"pointer",lineHeight:1}}>×</button>
        )}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>setOpShowFilters(!opShowFilters)} style={{background:opShowFilters||opActiveFilters>0?`${C.teal}22`:C.card,border:`1px solid ${opShowFilters||opActiveFilters>0?C.tealL:C.border}`,borderRadius:8,padding:"7px 12px",color:opShowFilters||opActiveFilters>0?C.tealG:C.muted,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          <span>⚙</span><span>Filters{opActiveFilters>0?` (${opActiveFilters})`:""}</span>
        </button>
        <div style={{color:C.muted,fontSize:11}}>{filteredOffPlan.length} of {OFF_PLAN.length} projects</div>
      </div>

      {opShowFilters&&(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px",marginTop:10}}>
          <div style={{marginBottom:12}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>STATE / LOCATION</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["All","FCT Abuja","Lagos"].map(s=>(
                <button key={s} onClick={()=>setOpFilterLoc(s)} style={{background:opFilterLoc===s?`${C.teal}33`:C.bg,border:`1px solid ${opFilterLoc===s?C.tealL:C.border}`,borderRadius:20,padding:"4px 12px",color:opFilterLoc===s?C.tealG:C.muted,fontSize:11,cursor:"pointer",fontWeight:opFilterLoc===s?700:400}}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>PROPERTY TYPE</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["All","4-Bed Detached","2-Bed Apartment","3-Bed Terrace"].map(t=>(
                <button key={t} onClick={()=>setOpFilterType(t)} style={{background:opFilterType===t?`${C.teal}33`:C.bg,border:`1px solid ${opFilterType===t?C.tealL:C.border}`,borderRadius:20,padding:"4px 12px",color:opFilterType===t?C.tealG:C.muted,fontSize:11,cursor:"pointer",fontWeight:opFilterType===t?700:400}}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:10}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>CONSTRUCTION STAGE</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["All","Foundation","Superstructure","Roofing","Finishing"].map(s=>(
                <button key={s} onClick={()=>setOpFilterStage(s)} style={{background:opFilterStage===s?`${C.teal}33`:C.bg,border:`1px solid ${opFilterStage===s?C.tealL:C.border}`,borderRadius:20,padding:"4px 12px",color:opFilterStage===s?stageCol[s]||C.tealG:C.muted,fontSize:11,cursor:"pointer",fontWeight:opFilterStage===s?700:400}}>{s}</button>
              ))}
            </div>
          </div>
          {opActiveFilters>0&&(
            <button onClick={()=>{setOpFilterLoc("All");setOpFilterType("All");setOpFilterStage("All");}} style={{width:"100%",background:"none",border:`1px solid ${C.redL}44`,borderRadius:8,padding:"7px",color:C.redL,fontSize:11,cursor:"pointer",marginTop:4}}>✕ Clear all filters</button>
          )}
        </div>
      )}
    </div>

    {filteredOffPlan.length===0?(
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"32px 16px",textAlign:"center"}}>
        <div style={{fontSize:32,marginBottom:10}}>🔍</div>
        <div style={{color:C.white,fontSize:14,fontWeight:600,marginBottom:6}}>No projects found</div>
        <div style={{color:C.muted,fontSize:12,marginBottom:16}}>Try adjusting your search or filters</div>
        <button onClick={()=>{setOpSearch("");setOpFilterLoc("All");setOpFilterType("All");setOpFilterStage("All");}} style={{background:`${C.teal}22`,border:`1px solid ${C.tealL}44`,borderRadius:8,padding:"8px 16px",color:C.tealG,fontSize:12,cursor:"pointer"}}>Clear search & filters</button>
      </div>
    ):(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {filteredOffPlan.map(p=>(<div key={p.id} onClick={()=>open(p)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px",cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.tealL;e.currentTarget.style.background=C.cardH;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card;}}>
        <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:12}}>
          <div style={{width:56,height:56,borderRadius:12,background:`${C.teal}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{p.img}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><div style={{color:C.white,fontWeight:700,fontSize:15}}>{p.name}</div><Chip text={p.stage} col={stageCol[p.stage]||C.goldL}/></div>
            <div style={{color:C.muted,fontSize:12,marginBottom:4}}>{p.loc} · {p.type}</div>
            <div style={{color:C.tealG,fontWeight:700,fontSize:15}}>₦{(p.price/1000000).toFixed(0)}M <span style={{color:C.dim,fontSize:11,fontWeight:400}}>full price</span></div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginBottom:12}}>
          {[`${p.downPct}% down`,`From ₦${Math.round(p.price*p.downPct/100/1000000*10)/10}M`,`${p.plans[0].label} plan available`].map((t,i)=>(<span key={i} style={{background:`${C.teal}22`,border:`1px solid ${C.tealL}33`,borderRadius:20,padding:"4px 10px",color:C.tealG,fontSize:10}}>✓ {t}</span>))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:C.dim,fontSize:11}}>Completion: <span style={{color:C.goldL,fontWeight:600}}>{p.completion}</span></div>
          <div style={{color:C.tealG,fontSize:12,fontWeight:600}}>View plans →</div>
        </div>
      </div>))}
    </div>
    )}
  </div>);
}

