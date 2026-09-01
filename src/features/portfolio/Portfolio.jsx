import { useState } from "react";
import { C } from "../../constants/theme";
import { INVESTMENTS, HISTORY } from "../../constants/data";
import Bar from "../../components/ui/Bar";
import Chip from "../../components/ui/Chip";
import ValuationRow from "./ValuationRow";
export default function Portfolio(){
  const [investments,setInvestments]=useState(INVESTMENTS);
  const [modal,setModal]=useState(null);
  const [triggered,setTriggered]=useState(false);
  const [voteResult,setVoteResult]=useState(null);

  const castVote=(invId,vote)=>{
    setInvestments(prev=>prev.map(inv=>inv.id===invId?{...inv,myVote:vote,voteFor:vote==="for"?inv.voteFor+1:inv.voteFor,voteAgainst:vote==="against"?inv.voteAgainst+1:inv.voteAgainst}:inv));
    setVoteResult(vote);
    setTimeout(()=>{setModal(null);setVoteResult(null);},2500);
  };

  const triggerSale=(invId)=>{
    setTriggered(true);
    setTimeout(()=>{setInvestments(prev=>prev.map(inv=>inv.id===invId?{...inv,voteActive:true,canTrigger:false}:inv));setTriggered(false);setModal(null);},2000);
  };

  const totalInvested=investments.reduce((s,i)=>s+i.myInvested,0);
  const totalCurrent=investments.reduce((s,i)=>s+i.currentVal,0);
  const totalGain=totalCurrent-totalInvested;
  const gainPct=((totalGain/totalInvested)*100).toFixed(1);
  const totalPropPool=investments.reduce((s,i)=>s+i.totalPropValue,0);
  const avgEquity=(investments.reduce((s,i)=>s+parseFloat(i.equity),0)/investments.length).toFixed(2);

  return(<div>
    {/* ── PORTFOLIO OVERVIEW ── */}
    <div style={{borderRadius:18,overflow:"hidden",marginBottom:20,border:`1px solid ${C.brown}44`}}>
      {/* Top hero band */}
      <div style={{background:`linear-gradient(135deg,${C.brownD},${C.brown})`,padding:"20px 20px 16px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-24,top:-24,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
        <div style={{position:"absolute",right:40,bottom:-20,width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,.04)"}}/>
        <div style={{color:C.cream,fontSize:9,fontFamily:"monospace",letterSpacing:1.2,opacity:.75,marginBottom:10}}>MY PORTFOLIO · APRIL 2026</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div>
            <div style={{color:C.cream,fontSize:10,opacity:.7,marginBottom:3}}>Current Value</div>
            <div style={{color:C.white,fontSize:28,fontWeight:700,fontFamily:"monospace",lineHeight:1}}>{"₦"+totalCurrent.toLocaleString()}</div>
            <div style={{color:C.cream,fontSize:11,opacity:.7,marginTop:4}}>
              <span style={{textDecoration:"line-through",marginRight:6,opacity:.6}}>{"₦"+totalInvested.toLocaleString()}</span>
              <span style={{background:"rgba(82,183,136,.25)",borderRadius:20,padding:"2px 8px",color:"#7FFFD4",fontWeight:700}}>+{gainPct}%</span>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{color:C.cream,fontSize:9,fontFamily:"monospace",opacity:.7,marginBottom:3}}>TOTAL GAIN</div>
            <div style={{color:"#7FFFD4",fontSize:18,fontWeight:700,fontFamily:"monospace"}}>+{"₦"+totalGain.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{background:`${C.card}`,borderTop:`1px solid ${C.brown}33`,display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
        {[
          ["INVESTED","₦"+totalInvested.toLocaleString(),C.creamD],
          ["PROPERTIES",investments.length,C.brownL],
          ["ALL PROPS VAL","₦"+(totalPropPool/1000000).toFixed(0)+"M",C.goldL],
          ["AVG EQUITY",avgEquity+"%",C.brownL],
        ].map(([l,v,c],i)=>(
          <div key={l} style={{padding:"12px 10px",borderRight:i<3?`1px solid ${C.border}`:"none",textAlign:"center"}}>
            <div style={{color:C.muted,fontSize:7,fontFamily:"monospace",letterSpacing:.8,marginBottom:4}}>{l}</div>
            <div style={{color:c,fontSize:12,fontWeight:700,fontFamily:"monospace"}}>{v}</div>
          </div>
        ))}
      </div>

      {/* Income strip */}
      <div style={{background:`${C.brownD}22`,borderTop:`1px solid ${C.brown}22`,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:14}}>💰</span>
          <div>
            <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:.8}}>MONTHLY RENTAL INCOME</div>
            <div style={{color:C.greenG,fontSize:15,fontWeight:700,fontFamily:"monospace"}}>₦142,500</div>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:.8}}>AVG YIELD</div>
          <div style={{color:C.goldL,fontSize:15,fontWeight:700,fontFamily:"monospace"}}>13.8%</div>
        </div>
      </div>
    </div>

    {/* ── RENTAL INVESTMENTS ── */}
    {investments.filter(i=>i.incomeType==="rental").length>0&&(
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <div style={{width:4,height:20,background:C.brown,borderRadius:2}}/>
        <div style={{color:C.brownL,fontSize:11,fontWeight:700,fontFamily:"monospace",letterSpacing:1}}>RENTAL INCOME INVESTMENTS</div>
        <div style={{background:`${C.brown}22`,border:`1px solid ${C.brown}44`,borderRadius:20,padding:"2px 10px",color:C.brownL,fontSize:10,fontWeight:700}}>{investments.filter(i=>i.incomeType==="rental").length} active</div>
      </div>
      <div style={{background:`${C.brown}08`,border:`1px solid ${C.brown}22`,borderRadius:10,padding:"8px 12px",marginBottom:12,display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:12}}>💰</span>
        <div style={{color:C.dim,fontSize:10,lineHeight:1.5}}>These investments pay <span style={{color:C.brownL,fontWeight:600}}>monthly rental income</span> directly to your wallet. Standard hold period is <span style={{color:C.brownL,fontWeight:600}}>3 years</span> before resale.</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {investments.filter(i=>i.incomeType==="rental").map(inv=>(
        <div key={inv.id} style={{background:C.card,border:`1px solid ${inv.voteActive?C.goldL+"66":C.border}`,borderRadius:14,padding:"18px",transition:"border-color .3s",borderLeft:`4px solid ${inv.col}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <div style={{color:C.white,fontWeight:700,fontSize:15}}>{inv.name}</div>
                <div style={{background:`${inv.col}22`,border:`1px solid ${inv.col}55`,borderRadius:4,padding:"1px 7px",fontSize:9,color:inv.col,fontWeight:700}}>RENTAL</div>
              </div>
              <div style={{color:C.muted,fontSize:12}}>{inv.loc} · {inv.equity} equity · {inv.holdYears}-yr hold</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",marginBottom:2}}>INVESTED → NOW</div>
              <div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"flex-end"}}>
                <div style={{color:C.dim,fontSize:12,fontFamily:"monospace",textDecoration:"line-through"}}>{"₦"+inv.myInvested.toLocaleString()}</div>
                <div style={{color:inv.col,fontWeight:700,fontSize:14,fontFamily:"monospace"}}>{"₦"+inv.currentVal.toLocaleString()}</div>
              </div>
              <div style={{color:C.greenG,fontSize:11,fontWeight:600,textAlign:"right"}}>{inv.gain} ↑</div>
            </div>
          </div>

          {/* Monthly rental income highlight */}
          <div style={{background:`${C.greenG}12`,border:`1px solid ${C.greenG}33`,borderRadius:10,padding:"10px 14px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:3}}>MONTHLY RENTAL INCOME</div>
              <div style={{color:C.greenG,fontWeight:700,fontSize:16,fontFamily:"monospace"}}>{"₦"+inv.monthlyRental.toLocaleString()}<span style={{color:C.dim,fontSize:10,fontWeight:400}}> / slot / mo</span></div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:3}}>3-YEAR TOTAL RENTAL</div>
              <div style={{color:C.greenG,fontWeight:700,fontSize:13,fontFamily:"monospace"}}>{"₦"+(inv.monthlyRental*36).toLocaleString()}</div>
            </div>
          </div>

          {/* Property value + my investment row */}
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <div style={{flex:1,background:`${C.goldL}12`,border:`1px solid ${C.goldL}33`,borderRadius:10,padding:"10px 12px"}}>
              <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:4}}>TOTAL PROPERTY VALUE</div>
              <div style={{color:C.goldL,fontWeight:700,fontSize:14,fontFamily:"monospace"}}>{"₦"+(inv.totalPropValue/1000000).toFixed(0)+"M"}</div>
              <div style={{color:C.dim,fontSize:9,marginTop:2}}>{inv.totalSlots} total slots · {inv.voteTotal} co-owners</div>
            </div>
            <div style={{flex:1,background:`${inv.col}18`,border:`1px solid ${inv.col}44`,borderRadius:10,padding:"10px 12px"}}>
              <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:4}}>MY INVESTMENT</div>
              <div style={{color:inv.col,fontWeight:700,fontSize:14,fontFamily:"monospace"}}>{"₦"+inv.myInvested.toLocaleString()}</div>
              <div style={{color:C.dim,fontSize:9,marginTop:2}}>{inv.slots} slot{inv.slots>1?"s":""} · {inv.equity} equity</div>
            </div>
          </div>

          <div style={{marginBottom:12}}><Bar pct={inv.funded} col={inv.col} h={5}/></div>
          <ValuationRow inv={inv}/>

          {/* Hold period timeline */}
          <div style={{background:`${C.border}40`,borderRadius:10,padding:"10px 12px",marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:1}}>HOLD PERIOD · {inv.holdYears} YEARS</div>
              <div style={{background:`${inv.col}22`,border:`1px solid ${inv.col}44`,borderRadius:20,padding:"1px 8px",color:inv.col,fontSize:9,fontWeight:700}}>{inv.holdYears}yr hold</div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:6}}>
              <div>
                <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:2}}>STARTED</div>
                <div style={{color:C.dim,fontSize:11,fontWeight:600}}>{inv.purchaseDate}</div>
              </div>
              <div style={{flex:1,margin:"0 10px",paddingBottom:4}}>
                <div style={{position:"relative",height:6,background:C.border,borderRadius:3,overflow:"hidden"}}>
                  <div style={{width:Math.min(100,Math.max(0,Math.round(((new Date("2026-04-14")-new Date(inv.purchaseDate.split(" ").reverse().join("-")))/(new Date(inv.saleEligibleDate||inv.lockEnd)-new Date(inv.purchaseDate.split(" ").reverse().join("-"))))*100)))+"%",height:"100%",background:`linear-gradient(90deg,${inv.col},${inv.col}AA)`,borderRadius:3}}/>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:2}}>ENDS</div>
                <div style={{color:inv.saleEligibleDate&&new Date(inv.saleEligibleDate.split(" ").reverse().join("-"))<=new Date("2026-04-14")?C.greenG:inv.col,fontSize:11,fontWeight:600}}>{inv.saleEligibleDate||inv.lockEnd}</div>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div style={{background:`${C.border}50`,borderRadius:6,padding:"4px 8px"}}><div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:1}}>SPV</div><div style={{color:C.indigoG,fontSize:9,fontWeight:600}}>{inv.spv.replace("PropVest ","")}</div></div>
              {inv.saleEligibleDate&&new Date(inv.saleEligibleDate.split(" ").reverse().join("-"))<=new Date("2026-04-14")
                ?<div style={{background:`${C.greenG}18`,border:`1px solid ${C.greenG}33`,borderRadius:6,padding:"4px 8px",color:C.greenG,fontSize:9,fontWeight:700}}>✅ Sale eligible</div>
                :<div style={{background:`${C.border}50`,borderRadius:6,padding:"4px 8px"}}><div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:1}}>SALE ELIGIBLE</div><div style={{color:C.dim,fontSize:9,fontWeight:600}}>{inv.saleEligibleDate||"After "+inv.holdYears+"yrs"}</div></div>
              }
            </div>
          </div>

          {inv.voteActive&&(
            <div style={{background:`${C.gold}15`,border:`1px solid ${C.goldL}33`,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:C.goldL,fontWeight:600,fontSize:12}}>🗳 Active Sale Vote</span><span style={{color:C.dim,fontSize:11}}>{inv.voteFor+inv.voteAgainst}/{inv.voteTotal} voted</span></div>
              <div style={{display:"flex",gap:4,marginBottom:8,borderRadius:4,overflow:"hidden"}}>
                <div style={{flex:inv.voteFor||0.5,background:C.greenG,height:8,transition:"flex .5s"}}/>
                <div style={{flex:inv.voteAgainst||0.5,background:C.redL,height:8,transition:"flex .5s"}}/>
                <div style={{flex:inv.voteTotal-inv.voteFor-inv.voteAgainst,background:C.border,height:8}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{color:C.greenG,fontSize:11}}>{inv.voteFor} for sale</span>
                <span style={{color:C.dim,fontSize:11}}>{inv.voteTotal-inv.voteFor-inv.voteAgainst} not voted</span>
                <span style={{color:C.redL,fontSize:11}}>{inv.voteAgainst} against</span>
              </div>
              {inv.myVote&&<div style={{color:C.dim,fontSize:11,marginTop:8,textAlign:"center"}}>Your vote: <span style={{color:inv.myVote==="for"?C.greenG:C.redL,fontWeight:700}}>{inv.myVote==="for"?"FOR SALE":"AGAINST SALE"}</span></div>}
            </div>
          )}

          {/* Sale eligibility notice for rental */}
          {inv.voteActive&&inv.myVote?(
            <div style={{background:`${C.green}22`,border:`1px solid ${C.greenL}44`,borderRadius:10,padding:"11px",textAlign:"center"}}><span style={{color:C.greenG,fontSize:12}}>✓ Vote submitted · Awaiting result</span></div>
          ):inv.voteActive&&!inv.myVote?(
            <button onClick={()=>setModal({type:"vote",inv})} style={{width:"100%",background:`linear-gradient(135deg,#2A1A00,${C.gold})`,border:`1px solid ${C.goldL}`,borderRadius:10,padding:"11px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>🗳 Cast Your Vote</button>
          ):inv.canTrigger?(
            <div>
              <button onClick={()=>setModal({type:"trigger",inv})} style={{width:"100%",background:"linear-gradient(135deg,#1A3A1A,#2A5A2A)",border:`1px solid ${C.greenG}`,borderRadius:10,padding:"11px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",marginBottom:8}}>🔔 Trigger Sale Vote</button>
              <div style={{background:`${C.greenG}10`,border:`1px solid ${C.greenG}22`,borderRadius:8,padding:"8px 12px",textAlign:"center"}}>
                <span style={{color:C.greenG,fontSize:10,fontWeight:600}}>✅ Sale eligible — {inv.holdYears}-year hold completed</span>
              </div>
            </div>
          ):(
            <div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span style={{color:C.muted,fontSize:11,fontWeight:600}}>🔒 Sale Option Locked</span>
                  <span style={{background:`${inv.col}22`,border:`1px solid ${inv.col}44`,borderRadius:20,padding:"2px 8px",color:inv.col,fontSize:9,fontWeight:700}}>{inv.holdYears}-YEAR HOLD</span>
                </div>
                <div style={{color:C.dim,fontSize:11,lineHeight:1.6,marginBottom:6}}>
                  The sale option for rental properties is only activated after the <span style={{color:C.white,fontWeight:600}}>{inv.holdYears}-year hold period</span> is complete. This ensures co-owners receive the full benefit of rental income before any resale decision is made.
                </div>
                <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:`1px solid ${C.border}`}}>
                  <span style={{color:C.muted,fontSize:10}}>Sale eligible from</span>
                  <span style={{color:inv.col,fontWeight:700,fontSize:11}}>{inv.saleEligibleDate||"After "+inv.holdYears+" years"}</span>
                </div>
              </div>
              <div style={{background:C.border,borderRadius:10,padding:"11px",textAlign:"center"}}>
                <span style={{color:C.muted,fontSize:12}}>🔒 Lock-in until {inv.lockEnd}</span>
              </div>
            </div>
          )}
        </div>
        ))}
      </div>
    </div>
    )}

    {/* ── RESALE / CAPITAL GAIN INVESTMENTS ── */}
    {investments.filter(i=>i.incomeType==="resale").length>0&&(
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <div style={{width:4,height:20,background:C.greenL,borderRadius:2}}/>
        <div style={{color:C.greenG,fontSize:11,fontWeight:700,fontFamily:"monospace",letterSpacing:1}}>RESALE / CAPITAL GAIN INVESTMENTS</div>
        <div style={{background:`${C.greenL}22`,border:`1px solid ${C.greenL}44`,borderRadius:20,padding:"2px 10px",color:C.greenG,fontSize:10,fontWeight:700}}>{investments.filter(i=>i.incomeType==="resale").length} active</div>
      </div>
      <div style={{background:`${C.greenL}08`,border:`1px solid ${C.greenL}22`,borderRadius:10,padding:"8px 12px",marginBottom:12,display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:12}}>📈</span>
        <div style={{color:C.dim,fontSize:10,lineHeight:1.5}}>No monthly income. All returns are realised at <span style={{color:C.greenG,fontWeight:600}}>exit through resale</span>. Your gain accrues as the property appreciates over the hold period.</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {investments.filter(i=>i.incomeType==="resale").map(inv=>(
          <div key={inv.id} style={{background:C.card,border:`1px solid ${inv.voteActive?C.goldL+"66":C.border}`,borderRadius:14,padding:"18px",transition:"border-color .3s",borderLeft:`4px solid ${C.greenL}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <div style={{color:C.white,fontWeight:700,fontSize:15}}>{inv.name}</div>
                  <div style={{background:`${C.greenL}22`,border:`1px solid ${C.greenL}44`,borderRadius:4,padding:"1px 7px",fontSize:9,color:C.greenG,fontWeight:700}}>RESALE</div>
                </div>
                <div style={{color:C.muted,fontSize:12}}>{inv.loc} · {inv.equity} equity</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",marginBottom:2}}>INVESTED → NOW</div>
              <div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"flex-end"}}>
                <div style={{color:C.dim,fontSize:12,fontFamily:"monospace",textDecoration:"line-through"}}>{"₦"+inv.myInvested.toLocaleString()}</div>
                <div style={{color:C.greenG,fontWeight:700,fontSize:14,fontFamily:"monospace"}}>{"₦"+inv.currentVal.toLocaleString()}</div>
              </div>
              <div style={{color:C.greenG,fontSize:11,fontWeight:600,textAlign:"right"}}>{inv.gain} ↑</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              <div style={{flex:1,background:`${C.goldL}12`,border:`1px solid ${C.goldL}33`,borderRadius:10,padding:"10px 12px"}}>
                <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:4}}>TOTAL PROPERTY VALUE</div>
                <div style={{color:C.goldL,fontWeight:700,fontSize:14,fontFamily:"monospace"}}>{"₦"+(inv.totalPropValue/1000000).toFixed(0)+"M"}</div>
                <div style={{color:C.dim,fontSize:9,marginTop:2}}>{inv.totalSlots} slots · {inv.voteTotal} co-owners</div>
              </div>
              <div style={{flex:1,background:`${C.greenL}18`,border:`1px solid ${C.greenL}44`,borderRadius:10,padding:"10px 12px"}}>
                <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:4}}>MY INVESTMENT</div>
                <div style={{color:C.greenL,fontWeight:700,fontSize:14,fontFamily:"monospace"}}>{"₦"+inv.myInvested.toLocaleString()}</div>
                <div style={{color:C.dim,fontSize:9,marginTop:2}}>{inv.slots} slot · {inv.equity} equity</div>
              </div>
            </div>
            <div style={{marginBottom:10}}><Bar pct={inv.funded} col={C.greenL} h={5}/></div>
            <ValuationRow inv={inv}/>
            {/* Hold period timeline */}
            <div style={{background:`${C.border}40`,borderRadius:10,padding:"10px 12px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:1}}>HOLD PERIOD · {inv.holdYears||3} YEARS</div>
                <div style={{background:`${C.greenL}22`,border:`1px solid ${C.greenL}44`,borderRadius:20,padding:"1px 8px",color:C.greenG,fontSize:9,fontWeight:700}}>Capital Gain</div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:6}}>
                <div>
                  <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:2}}>STARTED</div>
                  <div style={{color:C.dim,fontSize:11,fontWeight:600}}>{inv.purchaseDate}</div>
                </div>
                <div style={{flex:1,margin:"0 10px",paddingBottom:4}}>
                  <div style={{position:"relative",height:6,background:C.border,borderRadius:3,overflow:"hidden"}}>
                    <div style={{width:Math.min(100,Math.max(0,Math.round(((new Date("2026-04-14")-new Date(inv.purchaseDate.split(" ").reverse().join("-")))/(new Date(inv.lockEnd)-new Date(inv.purchaseDate.split(" ").reverse().join("-"))))*100)))+"%",height:"100%",background:`linear-gradient(90deg,${C.greenL},${C.greenG})`,borderRadius:3}}/>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:2}}>ENDS</div>
                  <div style={{color:new Date(inv.lockEnd)<=new Date("2026-04-14")?C.greenG:C.greenL,fontSize:11,fontWeight:600}}>{inv.lockEnd}</div>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{background:`${C.border}50`,borderRadius:6,padding:"4px 8px"}}><div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:1}}>SPV</div><div style={{color:C.indigoG,fontSize:9,fontWeight:600}}>{inv.spv.replace("PropVest ","")}</div></div>
                {new Date(inv.lockEnd)<=new Date("2026-04-14")
                  ?<div style={{background:`${C.greenG}18`,border:`1px solid ${C.greenG}33`,borderRadius:6,padding:"4px 8px",color:C.greenG,fontSize:9,fontWeight:700}}>✅ Sale eligible</div>
                  :<div style={{background:`${C.border}50`,borderRadius:6,padding:"4px 8px"}}><div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:1}}>LOCK-IN ENDS</div><div style={{color:C.dim,fontSize:9,fontWeight:600}}>{inv.lockEnd}</div></div>
                }
              </div>
            </div>
            {inv.canTrigger&&!inv.voteActive&&(
              <button onClick={()=>setModal({type:"trigger",inv})} style={{width:"100%",background:"linear-gradient(135deg,#1A3A1A,#2A5A2A)",border:`1px solid ${C.greenG}`,borderRadius:10,padding:"11px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>🔔 Trigger Sale Vote</button>
            )}
            {!inv.canTrigger&&!inv.voteActive&&(
              <div style={{background:C.border,borderRadius:10,padding:"11px",textAlign:"center"}}><span style={{color:C.muted,fontSize:12}}>🔒 Lock-in until {inv.lockEnd}</span></div>
            )}
          </div>
        ))}
      </div>
    </div>
    )}

    <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>INCOME HISTORY</div>
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.3fr 0.8fr 0.8fr",padding:"10px 14px",background:C.border}}>{["Date","Property","Gross","Net"].map(h=>(<div key={h} style={{color:C.muted,fontSize:10,fontFamily:"monospace",letterSpacing:.8}}>{h}</div>))}</div>
      {HISTORY.map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1.3fr 0.8fr 0.8fr",padding:"12px 14px",borderTop:`1px solid ${C.border}`,background:i%2===0?"transparent":`${C.border}30`}}>
        <div style={{color:C.dim,fontSize:11}}>{r.date}</div><div style={{color:C.white,fontSize:11}}>{r.prop}</div><div style={{color:C.muted,fontSize:11}}>{r.gross}</div><div style={{color:C.greenG,fontWeight:700,fontSize:12}}>{r.net}</div>
      </div>))}
    </div>

    {modal&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>{setModal(null);setVoteResult(null);}}>
        <div onClick={e=>e.stopPropagation()} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"20px 20px 0 0",padding:"28px 24px 44px",width:"100%",maxWidth:480}}>
          {modal.type==="trigger"&&(!triggered?(
            <div>
              <div style={{color:C.white,fontSize:18,fontWeight:700,marginBottom:4}}>Trigger Sale Vote</div>
              <div style={{color:C.muted,fontSize:13,marginBottom:20}}>{modal.inv.name}</div>
              <div style={{background:`${C.green}18`,border:`1px solid ${C.greenL}33`,borderRadius:10,padding:"14px 16px",marginBottom:16}}>
                <div style={{color:C.greenG,fontWeight:600,fontSize:13,marginBottom:6}}>✓ Lock-in Period Expired</div>
                <div style={{color:C.dim,fontSize:12,lineHeight:1.6}}>You are eligible to request a sale vote. All {modal.inv.voteTotal} co-investors will be notified by push notification and email.</div>
              </div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,marginBottom:16,overflow:"hidden"}}>
                {[["Your equity",modal.inv.equity],["Current value","₦"+modal.inv.currentVal.toLocaleString()],["Total co-investors",modal.inv.voteTotal],["Votes needed to proceed",">50% — "+(Math.floor(modal.inv.voteTotal/2)+1)+" of "+modal.inv.voteTotal+" votes"],["If vote passes","Independent NIESV valuation"]].map(([l,v],i)=>(<div key={l} style={{display:"flex",justifyContent:"space-between",padding:"11px 14px",borderBottom:i<4?`1px solid ${C.border}`:"none",background:i%2===0?"transparent":`${C.border}20`}}><span style={{color:C.muted,fontSize:12}}>{l}</span><span style={{color:C.white,fontSize:12,fontWeight:500}}>{v}</span></div>))}
              </div>
              <div style={{background:`${C.gold}15`,border:`1px solid ${C.goldL}33`,borderRadius:10,padding:"12px 14px",marginBottom:20}}>
                <div style={{color:C.goldL,fontSize:11,lineHeight:1.6}}>⚠ A sale requires <strong>over 50%</strong> of co-owners ({Math.floor(modal.inv.voteTotal/2)+1} of {modal.inv.voteTotal} votes) in favour. If not reached, you may offer your equity to co-owners at cost + 50% of your gain. PropVest appoints an independent NIESV valuer if the vote passes.</div>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setModal(null)} style={{flex:1,background:C.border,border:"none",borderRadius:10,padding:13,color:C.dim,fontSize:13,cursor:"pointer"}}>Cancel</button>
                <button onClick={()=>triggerSale(modal.inv.id)} style={{flex:2,background:"linear-gradient(135deg,#1A3A1A,#2A5A2A)",border:`1px solid ${C.greenG}`,borderRadius:10,padding:13,color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>🔔 Confirm Trigger</button>
              </div>
            </div>
          ):(
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{fontSize:44,marginBottom:14}}>✅</div>
              <div style={{color:C.greenG,fontSize:18,fontWeight:700,marginBottom:6}}>Sale Vote Triggered!</div>
              <div style={{color:C.dim,fontSize:13}}>All {modal.inv.voteTotal} co-investors notified.</div>
            </div>
          ))}

          {modal.type==="vote"&&(!voteResult?(
            <div>
              <div style={{color:C.white,fontSize:18,fontWeight:700,marginBottom:4}}>Cast Your Vote</div>
              <div style={{color:C.muted,fontSize:13,marginBottom:20}}>{modal.inv.name} — Sale Decision</div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,marginBottom:16,overflow:"hidden"}}>
                {[["Your equity",modal.inv.equity],["Current value","₦"+modal.inv.currentVal.toLocaleString()],["Your gain",modal.inv.gain],["Votes so far",`${modal.inv.voteFor+modal.inv.voteAgainst} of ${modal.inv.voteTotal}`],["For sale",`${modal.inv.voteFor} votes`],["Against",`${modal.inv.voteAgainst} votes`]].map(([l,v],i)=>(<div key={l} style={{display:"flex",justifyContent:"space-between",padding:"11px 14px",borderBottom:i<5?`1px solid ${C.border}`:"none",background:i%2===0?"transparent":`${C.border}20`}}><span style={{color:C.muted,fontSize:12}}>{l}</span><span style={{color:C.white,fontSize:12,fontWeight:500}}>{v}</span></div>))}
              </div>
              <div style={{display:"flex",gap:4,marginBottom:12,borderRadius:4,overflow:"hidden"}}>
                <div style={{flex:modal.inv.voteFor||0.5,background:`${C.greenG}44`,height:8}}/>
                <div style={{flex:modal.inv.voteAgainst||0.5,background:`${C.redL}44`,height:8}}/>
                <div style={{flex:modal.inv.voteTotal-modal.inv.voteFor-modal.inv.voteAgainst,background:C.border,height:8}}/>
              </div>
              <div style={{color:C.dim,fontSize:12,marginBottom:16,lineHeight:1.6}}>A sale decision requires <span style={{color:C.white,fontWeight:600}}>over 50% of co-owners</span> ({Math.floor(modal.inv.voteTotal/2)+1} of {modal.inv.voteTotal} votes) in favour. If the threshold is met, PropVest commissions an independent NIESV valuation and lists the property at the best achievable price. Proceeds are distributed proportionally to all co-owners.</div>
              <div style={{background:`${C.gold}12`,border:`1px solid ${C.goldL}33`,borderRadius:10,padding:"10px 14px",marginBottom:16}}>
                <div style={{color:C.goldL,fontWeight:700,fontSize:11,marginBottom:4}}>🔄 If No Sale Decision is Reached</div>
                <div style={{color:C.dim,fontSize:11,lineHeight:1.6}}>If a vote does not reach the 50% threshold or no vote is triggered, any co-owner wishing to exit may <span style={{color:C.white,fontWeight:600}}>offer their equity to existing co-owners first</span>, at a price of <span style={{color:C.goldL,fontWeight:600}}>50% of their total gain so far</span> — meaning you offer your slot at cost price plus half your unrealised gain. Co-owners have 30 days to accept before the slot is opened to new investors.</div>
              </div>
              <div style={{display:"flex",gap:10,marginBottom:12}}>
                <button onClick={()=>castVote(modal.inv.id,"against")} style={{flex:1,background:`${C.red}33`,border:`1px solid ${C.redL}44`,borderRadius:10,padding:"14px",color:C.redL,fontSize:13,fontWeight:700,cursor:"pointer"}}>🛡 Against Sale</button>
                <button onClick={()=>castVote(modal.inv.id,"for")} style={{flex:1,background:"linear-gradient(135deg,#1A3A1A,#2A5A2A)",border:`1px solid ${C.greenG}`,borderRadius:10,padding:"14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>🏷 For Sale</button>
              </div>
              <button onClick={()=>setModal(null)} style={{width:"100%",background:"none",border:"none",color:C.muted,fontSize:12,cursor:"pointer"}}>Decide later</button>
            </div>
          ):(
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{fontSize:44,marginBottom:14}}>{voteResult==="for"?"🏷":"🛡"}</div>
              <div style={{color:voteResult==="for"?C.greenG:C.redL,fontSize:18,fontWeight:700,marginBottom:6}}>{voteResult==="for"?"Voted For Sale":"Voted Against Sale"}</div>
              <div style={{color:C.dim,fontSize:13}}>Your vote is recorded. PropVest will notify you of the final result.</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>);
}

