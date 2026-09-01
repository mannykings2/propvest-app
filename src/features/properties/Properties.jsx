import { useState } from "react";
import { C } from "../../constants/theme";
import Bar from "../../components/ui/Bar";
import Chip from "../../components/ui/Chip";
import PropCard from "./PropCard";
export default function Properties(){
  const PROPS=[
    // ── RENTAL INCOME properties ──
    {id:1,name:"Maitama Residency",loc:"FCT Abuja",type:"Residential",yieldPct:12,entry:12000000,totalSlots:10,slotsLeft:0,funded:100,tag:"LIVE",spv:"PropVest Maitama Ltd",investors:10,pooled:120000000,totalValue:120000000,monthly:18500,annualRent:2220000,incomeType:"rental",holdYears:3},
    {id:2,name:"Victoria Island Apt",loc:"Lagos Island",type:"Apartment",yieldPct:14,entry:8500000,totalSlots:10,slotsLeft:0,funded:100,tag:"LIVE",spv:"PropVest VI Apt Ltd",investors:10,pooled:85000000,totalValue:85000000,monthly:24000,annualRent:2880000,incomeType:"rental",holdYears:3},
    {id:4,name:"Wuse II Plaza",loc:"FCT Abuja",type:"Commercial",yieldPct:16,entry:20000000,totalSlots:10,slotsLeft:5,funded:50,tag:"FUNDING",spv:"PropVest Wuse Plaza Ltd",investors:5,pooled:100000000,totalValue:200000000,monthly:38000,annualRent:4560000,incomeType:"rental",holdYears:5},
    {id:5,name:"Gwarinpa Courts",loc:"FCT Abuja",type:"Residential",yieldPct:11,entry:8000000,totalSlots:10,slotsLeft:0,funded:100,tag:"LIVE",spv:"PropVest Gwarinpa Ltd",investors:10,pooled:80000000,totalValue:80000000,monthly:14500,annualRent:1740000,incomeType:"rental",holdYears:3},
    {id:6,name:"Ikeja Business Hub",loc:"Lagos",type:"Commercial",yieldPct:18,entry:12800000,totalSlots:10,slotsLeft:6,funded:40,tag:"NEW",spv:"PropVest Ikeja Ltd",investors:4,pooled:51200000,totalValue:128000000,monthly:32000,annualRent:3840000,incomeType:"rental",holdYears:5},
    // ── RESALE / CAPITAL GAIN only properties ──
    {id:3,name:"Lekki Land Plot",loc:"Lekki, Lagos",type:"Land",yieldPct:20,entry:4000000,totalSlots:10,slotsLeft:2,funded:80,tag:"NEAR FULL",spv:"PropVest Lekki Land Ltd",investors:8,pooled:32000000,totalValue:40000000,monthly:0,incomeType:"resale"},
    {id:7,name:"Abuja Airport Road Plot",loc:"FCT Abuja",type:"Land",yieldPct:25,entry:5000000,totalSlots:10,slotsLeft:7,funded:30,tag:"NEW",spv:"PropVest Airport Rd Ltd",investors:3,pooled:15000000,totalValue:50000000,monthly:0,incomeType:"resale"},
    {id:8,name:"Ibeju-Lekki Acres",loc:"Ibeju-Lekki, Lagos",type:"Land",yieldPct:35,entry:3600000,totalSlots:10,slotsLeft:3,funded:70,tag:"FUNDING",spv:"PropVest Ibeju Ltd",investors:7,pooled:25200000,totalValue:36000000,monthly:0,incomeType:"resale"},
    {id:9,name:"Katampe Flip Project",loc:"FCT Abuja",type:"Resale Flip",yieldPct:28,entry:7200000,totalSlots:10,slotsLeft:2,funded:80,tag:"LIVE",spv:"PropVest Katampe Flip Ltd",investors:8,pooled:57600000,totalValue:72000000,monthly:0,incomeType:"resale"},
  ];
  const [sel,setSel]=useState(null);
  const [slots,setSlots]=useState(1);
  const [invested,setInvested]=useState(false);
  const [holdAgreed,setHoldAgreed]=useState(false);
  const [propTab,setPropTab]=useState("rental");
  const [search,setSearch]=useState("");
  const [filterState,setFilterState]=useState("All");
  const [filterType,setFilterType]=useState("All");
  const [filterYield,setFilterYield]=useState("All");
  const [filterSlots,setFilterSlots]=useState("All");
  const [showFilters,setShowFilters]=useState(false);

  const fmt=n=>"₦"+n.toLocaleString();
  const fmtM=n=>n>=1000000000?"₦"+(n/1000000000).toFixed(1)+"B":"₦"+(n/1000000).toFixed(0)+"M";
  const equity=p=>((slots/p.totalSlots)*100).toFixed(1);
  const totalCost=p=>p.entry*slots;
  const monthlyReturn=p=>p.monthly>0?p.monthly*slots:0;
  const annualReturn=p=>Math.round(totalCost(p)*(p.yieldPct/100));
  const maxSlots=p=>Math.min(p.slotsLeft,5);

  if(invested&&sel){return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 16px",textAlign:"center"}}>
      <div style={{width:76,height:76,borderRadius:"50%",background:`${C.brown}33`,border:`2px solid ${C.brownL}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,marginBottom:22}}>🏘</div>
      <div style={{color:C.white,fontSize:22,fontWeight:700,marginBottom:6}}>You're a Co-Owner!</div>
      <div style={{color:C.brownL,fontSize:18,fontWeight:700,marginBottom:4}}>{sel.name}</div>
      <div style={{color:C.muted,fontSize:13,marginBottom:20}}>{sel.loc} · {sel.type}</div>
      {sel.incomeType==="resale"&&(
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 22px",marginBottom:20,width:"100%",maxWidth:360,textAlign:"left"}}>
        {[[`Property Value`,fmtM(sel.totalValue)],[`Slots Purchased`,`${slots} of ${sel.totalSlots}`],[`Total Invested`,fmt(totalCost(sel))],[`Your Equity`,equity(sel)+"%"],[`Est. Capital Growth`,sel.yieldPct+"%/yr"],[`Income Type`,"Capital Gain at Exit"],[`SPV`,sel.spv]].map(([l,v],i)=>(<div key={l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:i<6?`1px solid ${C.border}`:"none"}}><span style={{color:C.muted,fontSize:12}}>{l}</span><span style={{color:C.white,fontSize:13,fontWeight:600}}>{v}</span></div>))}
      </div>
      )}
      <div style={{background:`${C.green}18`,border:`1px solid ${C.greenL}33`,borderRadius:10,padding:"12px 16px",marginBottom:24,width:"100%",maxWidth:360,textAlign:"left"}}>
        <div style={{color:C.greenG,fontSize:12,marginBottom:4}}>📄 Next Steps</div>
        <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>Your co-ownership deed will be sent to your registered email within 24 hours. Income distributions will begin on the next cycle date.</div>
      </div>
      <button onClick={()=>{setInvested(false);setSel(null);setSlots(1);setHoldAgreed(false);}} style={{background:C.brown,border:"none",borderRadius:10,padding:"13px 28px",color:C.white,fontSize:14,fontWeight:600,cursor:"pointer"}}>Back to Properties</button>
    </div>
  );}

  if(sel){const p=sel;return(<div>
    <button onClick={()=>{setSel(null);setSlots(1);setHoldAgreed(false);}} style={{background:"none",border:"none",color:C.brownL,fontSize:13,cursor:"pointer",marginBottom:18}}>← Back</button>

    {/* Hero */}
    <div style={{background:`linear-gradient(160deg,${C.brownD},${C.brown})`,borderRadius:16,height:155,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
      <div style={{textAlign:"center"}}><div style={{color:C.white,fontSize:18,fontWeight:700,marginBottom:4}}>{p.name}</div><div style={{color:C.cream,fontSize:12}}>{p.loc} · {p.type}</div></div>
      <div style={{position:"absolute",top:14,right:14}}><Chip text={p.tag} col={p.tag==="NEAR FULL"?C.goldL:p.tag==="NEW"?C.greenG:C.brownL}/></div>
    </div>

    {/* Quick stats */}
    <div style={{display:"flex",gap:8,marginBottom:16}}>
      {[[`${p.yieldPct}%`,"Ann. Yield",C.greenG],[fmt(p.entry),"Per Slot",C.brownL],[fmtM(p.totalValue),"Total Value",C.goldL],[`${p.slotsLeft}/${p.totalSlots}`,"Slots Left",C.dim]].map(([v,l,c])=>(<div key={l} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 6px",textAlign:"center"}}><div style={{color:c,fontWeight:700,fontSize:12,marginBottom:3}}>{v}</div><div style={{color:C.muted,fontSize:9,fontFamily:"monospace"}}>{l}</div></div>))}
    </div>

    {/* SPV */}
    <div style={{background:`${C.indigo}22`,border:`1px solid ${C.indigoL}44`,borderRadius:10,padding:"12px 16px",marginBottom:16,display:"flex",gap:10,alignItems:"center"}}>
      <span style={{fontSize:18}}>🏢</span>
      <div><div style={{color:C.indigoG,fontSize:11,fontWeight:700,marginBottom:2}}>SPV — {p.spv}</div><div style={{color:C.dim,fontSize:11}}>Property held under CAC-registered Special Purpose Vehicle</div></div>
    </div>

    {/* Funding progress */}
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:16}}>
      <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>FUNDING PROGRESS</div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
        <span style={{color:C.white,fontSize:13}}>{p.funded}% funded</span>
        <span style={{color:C.muted,fontSize:12}}>{p.investors} investors · {p.slotsLeft} slots remaining</span>
      </div>
      <Bar pct={p.funded} col={C.brown}/>
    </div>

    {/* ── RENTAL TERMS (rental properties only) ── */}
    {p.incomeType==="rental"&&(
    <div style={{background:"#080F08",border:`2px solid ${C.greenG}44`,borderRadius:14,overflow:"hidden",marginBottom:16}}>
      <div style={{background:`linear-gradient(135deg,#0D2010,${C.green})`,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:14}}>🏠</span>
          <span style={{color:C.white,fontSize:12,fontWeight:700}}>Rental Terms</span>
        </div>
        <div style={{background:`${C.greenG}22`,border:`1px solid ${C.greenG}55`,borderRadius:20,padding:"2px 10px",color:C.greenG,fontSize:9,fontWeight:700,letterSpacing:1}}>RENTAL INCOME</div>
      </div>
      <div style={{padding:"14px 16px"}}>

        {/* Tenant commitment notice */}
        <div style={{background:`${C.greenG}12`,border:`1px solid ${C.greenG}33`,borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",gap:10,alignItems:"flex-start"}}>
          <span style={{fontSize:16,flexShrink:0}}>⏱</span>
          <div>
            <div style={{color:C.greenG,fontWeight:700,fontSize:11,marginBottom:3}}>Rental Commencement Guarantee</div>
            <div style={{color:C.dim,fontSize:11,lineHeight:1.6}}>
              PropVest guarantees that this property will be <span style={{color:C.white,fontWeight:600}}>tenanted and generating rental income within 3 months</span> of all slots being fully purchased.
              {p.type==="Commercial"&&<span style={{color:C.goldL}}> Commercial properties require a <strong>minimum 5-year hold period</strong> to align with business lease durations of 2–5 years.</span>}
            </div>
          </div>
        </div>

        {/* Full property rent breakdown */}
        <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>FULL PROPERTY RENTAL BREAKDOWN</div>
        <div style={{display:"flex",flexDirection:"column",gap:0,borderRadius:10,overflow:"hidden",border:`1px solid ${C.border}`,marginBottom:14}}>
          {[
            ["Total Property Monthly Rent","₦"+Math.round(p.annualRent/12).toLocaleString(),C.greenG],
            ["Total Property Annual Rent","₦"+p.annualRent.toLocaleString(),C.greenG],
            ["Your Monthly Share ("+p.yieldPct+"% yield)","₦"+p.monthly.toLocaleString(),C.brownL],
            ["Your Annual Share","₦"+(p.monthly*12).toLocaleString(),C.brownL],
            ["Mgmt Fee Deducted","10% of rental collected",C.muted],
            ["Net Monthly to Your Wallet","₦"+Math.round(p.monthly*0.9).toLocaleString(),C.white],
          ].map(([l,v,c],i,arr)=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",background:i%2===0?"transparent":`${C.border}20`}}>
              <span style={{color:C.muted,fontSize:11}}>{l}</span>
              <span style={{color:c,fontSize:i===5?13:11,fontWeight:i===5?700:500}}>{v}</span>
            </div>
          ))}
        </div>

        {/* Tenancy structure */}
        <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>TENANCY STRUCTURE</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[
            ["Lease Type",p.type==="Commercial"?"Commercial Lease":"Residential Tenancy"],
            ["Lease Duration",p.type==="Commercial"?"2–5 Years (min 5yr hold)":"1 Year (renewable)"],
            ["Minimum Hold Period",p.type==="Commercial"?"5 Years":"3 Years"],
            ["Tenant Sourcing","PropVest & licensed agents"],
            ["Rent Collection","PropVest manages directly"],
          ].map(([l,v])=>(
            <div key={l} style={{flex:"1 1 45%",background:`${C.border}40`,borderRadius:8,padding:"8px 10px"}}>
              <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",marginBottom:3}}>{l.toUpperCase()}</div>
              <div style={{color:C.dim,fontSize:11,fontWeight:600}}>{v}</div>
            </div>
          ))}
        </div>

        {/* Sale activation note */}
        <div style={{marginTop:12,background:`${C.redL}10`,border:`1px solid ${C.redL}30`,borderRadius:8,padding:"9px 12px",display:"flex",gap:8,alignItems:"flex-start"}}>
          <span style={{fontSize:12,flexShrink:0}}>⏳</span>
          <div style={{color:C.dim,fontSize:10,lineHeight:1.6}}>
            <span style={{color:C.white,fontWeight:600}}>Sale option is locked for {p.holdYears} years</span> from the date of your investment. A vote to sell this property cannot be triggered until the hold period expires. This protects all co-owners' rental income stream.
            {p.type==="Commercial"&&<span style={{color:C.goldL}}> Commercial properties require a full 5-year hold to respect business lease commitments.</span>}
          </div>
        </div>
      </div>
    </div>
    )}

    {/* ── PROPERTY VALUATION ── */}
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",marginBottom:16}}>
      <div style={{background:`linear-gradient(135deg,${C.brownD},${C.brown})`,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:C.white,fontSize:12,fontWeight:700}}>📊 Property Valuation</span>
        <span style={{background:`${C.goldL}22`,border:`1px solid ${C.goldL}55`,borderRadius:20,padding:"2px 10px",color:C.goldL,fontSize:9,fontWeight:700,letterSpacing:1}}>UPDATES QUARTERLY</span>
      </div>
      <div style={{padding:"14px 16px"}}>
        <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:4}}>
          <span style={{color:C.goldL,fontSize:26,fontWeight:700,fontFamily:"monospace"}}>{fmtM(p.totalValue)}</span>
          <span style={{color:C.greenG,fontSize:11,fontWeight:700}}>Current Valuation</span>
        </div>
        <div style={{display:"flex",gap:16,marginBottom:12}}>
          <div><span style={{color:C.muted,fontSize:10}}>Last updated: </span><span style={{color:C.dim,fontSize:10,fontWeight:600}}>01 Apr 2025</span></div>
          <div><span style={{color:C.muted,fontSize:10}}>Next review: </span><span style={{color:C.dim,fontSize:10,fontWeight:600}}>01 Jul 2025</span></div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[["Per Slot",fmtM(p.entry),C.brownL],["Total Slots",p.totalSlots,C.white],["Pooled So Far",fmtM(p.pooled),C.greenG]].map(([l,v,c])=>(
            <div key={l} style={{flex:1,minWidth:80,background:`${C.border}40`,borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
              <div style={{color:c,fontWeight:700,fontSize:13}}>{v}</div>
              <div style={{color:C.muted,fontSize:9,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:10,padding:"8px 10px",background:`${C.gold}10`,border:`1px solid ${C.goldL}30`,borderRadius:8}}>
          <div style={{color:C.dim,fontSize:10,lineHeight:1.6}}>
            Property valuations are conducted quarterly by an independent NIESV-certified valuer. Updates are reflected in your portfolio dashboard and notified to all co-owners.
          </div>
        </div>
      </div>
    </div>

    {/* ── SLOT SELECTOR ── */}
    <div style={{background:`linear-gradient(135deg,${C.brownD}22,${C.brown}18)`,border:`2px solid ${C.brown}66`,borderRadius:14,padding:"18px 16px",marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div>
          <div style={{color:C.white,fontSize:14,fontWeight:700}}>Select Number of Slots</div>
          <div style={{color:C.dim,fontSize:11,marginTop:2}}>You can buy up to {maxSlots(p)} slot{maxSlots(p)>1?"s":""} on this property</div>
        </div>
        <div style={{background:`${C.brown}33`,border:`1px solid ${C.brownL}`,borderRadius:10,padding:"6px 14px",color:C.brownL,fontSize:18,fontWeight:700}}>{slots}×</div>
      </div>

      {/* Slot buttons */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {Array.from({length:maxSlots(p)},(_,i)=>i+1).map(n=>(
          <button key={n} onClick={()=>setSlots(n)} style={{flex:1,padding:"12px 0",borderRadius:10,border:`2px solid ${slots===n?C.brownL:C.border}`,background:slots===n?`${C.brown}33`:C.card,color:slots===n?C.brownL:C.dim,fontWeight:700,fontSize:14,cursor:"pointer",transition:"all .2s"}}>
            {n}
          </button>
        ))}
      </div>

      {/* Multi-slot note */}
      {slots>1&&(
        <div style={{background:`${C.gold}18`,border:`1px solid ${C.goldL}44`,borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",gap:8,alignItems:"flex-start"}}>
          <span style={{fontSize:14}}>💡</span>
          <div style={{color:C.dim,fontSize:11,lineHeight:1.6}}>
            Buying <span style={{color:C.goldL,fontWeight:700}}>{slots} slots</span> gives you <span style={{color:C.goldL,fontWeight:700}}>{equity(p)}% equity</span> in this property — a proportionally larger share of all rental income and capital gains. All {slots} slots are held under the same co-ownership deed.
          </div>
        </div>
      )}

      {/* Investment summary — resale only */}
      {p.incomeType==="resale"&&(
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
        <div style={{background:C.greenL,padding:"8px 14px"}}><span style={{color:C.white,fontSize:12,fontWeight:700}}>Investment Summary — {slots} Slot{slots>1?"s":""}</span></div>
        {[
          ["Total Property Value",fmtM(p.totalValue),C.goldL],
          ["Slots",`${slots} of ${p.totalSlots} total`,C.white],
          ["Slot Investment",fmt(totalCost(p)),C.greenL],
          ["Service Fee (2%)",fmt(Math.round(totalCost(p)*0.02)),C.goldL],
          ["Your Equity Share",equity(p)+"%",C.greenG],
          ["Est. Capital Growth (p.a.)",p.yieldPct+"%",C.greenG],
          ["Income Type","Capital Gain at Exit",C.goldL],
        ].map(([l,v,c],i,arr)=>(<div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",background:l==="Service Fee (2%)"?`${C.goldL}08`:i%2===0?"transparent":`${C.border}18`}}>
          <span style={{color:l==="Service Fee (2%)"?C.goldL:C.muted,fontSize:12}}>{l}</span>
          <span style={{color:c,fontSize:13,fontWeight:600}}>{v}</span>
        </div>))}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:`${C.greenG}10`,borderTop:`1px solid ${C.border}`}}>
          <span style={{color:C.white,fontSize:13,fontWeight:700}}>Total Due Today</span>
          <span style={{color:C.greenG,fontSize:15,fontWeight:700}}>{fmt(Math.round(totalCost(p)*1.02))}</span>
        </div>
      </div>
      )}
    </div>

    {/* ── CO-INVESTMENT TERMS — resale only ── */}
    {p.incomeType==="resale"&&(
    <div style={{background:"#0A0F0A",border:`2px solid ${C.greenL}55`,borderRadius:14,overflow:"hidden",marginBottom:14}}>
      <div style={{background:`linear-gradient(135deg,#0D2010,#153020)`,padding:"10px 16px",display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:14}}>🔒</span>
        <span style={{color:C.white,fontSize:12,fontWeight:700}}>Co-Investment Terms — Resale / Capital Gain</span>
      </div>
      <div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:10}}>

        <div style={{borderLeft:`3px solid ${C.greenG}`,paddingLeft:12}}>
          <div style={{color:C.greenG,fontWeight:700,fontSize:11,marginBottom:3}}>1. Minimum Hold Period — 12 Months</div>
          <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
            Your co-investment is subject to a <span style={{color:C.white,fontWeight:600}}>minimum hold period of 12 months</span> from the date your co-ownership deed is executed. Early exit requests within this window will not be processed.
          </div>
        </div>

        <div style={{borderLeft:`3px solid ${C.goldL}`,paddingLeft:12}}>
          <div style={{color:C.goldL,fontWeight:700,fontSize:11,marginBottom:3}}>2. Exit After Lock-In</div>
          <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
            After 12 months, you may request an exit via the PropVest platform. PropVest will facilitate a slot transfer to a new co-investor or trigger a co-owner vote for full property resale, subject to a <span style={{color:C.goldL,fontWeight:600}}>2–5% resale commission</span>.
          </div>
        </div>

        <div style={{borderLeft:`3px solid ${C.brownL}`,paddingLeft:12}}>
          <div style={{color:C.brownL,fontWeight:700,fontSize:11,marginBottom:3}}>2b. Equity Pre-Offer to Co-Owners</div>
          <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
            If a full sale vote does not reach <span style={{color:C.white,fontWeight:600}}>over 50% of co-owners</span>, any co-owner wishing to exit must first offer their equity to existing co-owners. The offer price is set at <span style={{color:C.brownL,fontWeight:600}}>your original investment + 50% of your total unrealised gain</span> at the time of the offer. Co-owners have <span style={{color:C.white,fontWeight:600}}>30 days</span> to accept before the slot is made available to new investors.
          </div>
        </div>

        <div style={{borderLeft:`3px solid ${C.indigoL}`,paddingLeft:12}}>
          <div style={{color:C.indigoG,fontWeight:700,fontSize:11,marginBottom:3}}>2c. Sale Vote Threshold</div>
          <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
            A vote to sell the full property must receive <span style={{color:C.white,fontWeight:600}}>more than 50%</span> of total co-owner votes in favour to be passed. With {p.totalSlots} co-owners, this means <span style={{color:C.indigoG,fontWeight:600}}>{Math.floor(p.totalSlots/2)+1} votes or more</span> are required. A tied vote is not sufficient — the majority must be in favour.
          </div>
        </div>

        <div style={{borderLeft:`3px solid ${C.greenL}`,paddingLeft:12}}>
          <div style={{color:C.greenG,fontWeight:700,fontSize:11,marginBottom:3}}>3. Capital Gain Investment</div>
          <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
            This is a <span style={{color:C.white,fontWeight:600}}>Resale / Capital Gain investment</span>. No monthly income is paid. All returns are realised entirely at exit through property appreciation and resale proceeds distributed to co-owners.
          </div>
        </div>

        <div style={{background:`${C.greenG}10`,border:`1px solid ${C.greenG}33`,borderRadius:10,padding:"12px 14px"}}>
          <div style={{color:C.greenG,fontSize:11,fontWeight:700,marginBottom:8}}>📊 Capital Gain Projection — {slots} Slot{slots>1?"s":""}</div>
          {[
            ["Your Investment",fmt(totalCost(p))],
            ["Est. Capital Growth (p.a.)",p.yieldPct+"%"],
            ["Est. Value After 2 Years",fmt(Math.round(totalCost(p)*(1+p.yieldPct/100*2)))],
            ["Est. Value After 3 Years",fmt(Math.round(totalCost(p)*(1+p.yieldPct/100*3)))],
            ["Est. Total Gain (3yr)",fmt(Math.round(totalCost(p)*p.yieldPct/100*3))],
          ].map(([l,v],i,arr)=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:i<arr.length-1?"1px solid rgba(255,255,255,.06)":"none"}}>
              <span style={{color:C.dim,fontSize:10}}>{l}</span>
              <span style={{color:i===arr.length-1?C.greenG:C.white,fontSize:11,fontWeight:i===arr.length-1?700:500}}>{v}</span>
            </div>
          ))}
          <div style={{color:C.muted,fontSize:9,marginTop:8,lineHeight:1.5}}>Projections are estimates based on historical appreciation rates. Actual returns may vary. No income is guaranteed before exit.</div>
        </div>

        <div style={{borderLeft:`3px solid ${C.indigoL}`,paddingLeft:12}}>
          <div style={{color:C.indigoG,fontWeight:700,fontSize:11,marginBottom:3}}>4. Legal Binding</div>
          <div style={{color:C.dim,fontSize:11,lineHeight:1.7}}>
            By proceeding, you agree that your co-ownership deed constitutes a legally binding contract under Nigerian law and that the 12-month hold period is a contractual obligation. PropVest reserves the right to enforce this term.
          </div>
        </div>

        <div style={{background:`${C.redL}12`,border:`1px solid ${C.redL}33`,borderRadius:8,padding:"9px 12px",display:"flex",gap:8,alignItems:"flex-start"}}>
          <span style={{fontSize:12,flexShrink:0}}>⚠️</span>
          <div style={{color:C.dim,fontSize:10,lineHeight:1.6}}>Real estate is an illiquid asset class. Do not invest funds you may need access to within 12 months. PropVest cannot guarantee a buyer for your slot before the hold period expires.</div>
        </div>
      </div>
    </div>
    )}

    {/* Agreement checkbox — resale requires acceptance, rental goes straight to invest */}
    {p.incomeType==="resale"?(
    <>
    <div onClick={()=>setHoldAgreed(!holdAgreed)} style={{background:holdAgreed?`${C.greenL}18`:`${C.border}30`,border:`1px solid ${holdAgreed?C.greenL:C.border}`,borderRadius:12,padding:"13px 15px",marginBottom:14,cursor:"pointer",display:"flex",gap:12,alignItems:"flex-start",transition:"all .2s"}}>
      <div style={{width:20,height:20,borderRadius:5,border:`2px solid ${holdAgreed?C.greenL:C.muted}`,background:holdAgreed?C.greenL:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,transition:"all .2s"}}>
        {holdAgreed&&<span style={{color:C.white,fontSize:13,fontWeight:700}}>✓</span>}
      </div>
      <div style={{color:holdAgreed?C.white:C.dim,fontSize:12,lineHeight:1.6}}>
        I understand this is a <span style={{color:C.greenL,fontWeight:600}}>Resale / Capital Gain investment</span> with no monthly income. I accept the <span style={{color:C.greenL,fontWeight:600}}>12-month minimum hold period</span> and agree to the PropVest Co-Investment Terms.
      </div>
    </div>
    {holdAgreed&&(
      <div style={{marginBottom:12}}>
        <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>PAYMENT METHOD</div>
        <div style={{background:`${C.greenG}12`,border:`2px solid ${C.greenG}`,borderRadius:12,padding:"13px 16px",display:"flex",gap:12,alignItems:"center"}}>
          <div style={{width:40,height:40,borderRadius:10,background:`${C.greenG}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>👛</div>
          <div style={{flex:1}}>
            <div style={{color:C.greenG,fontWeight:700,fontSize:13,marginBottom:2}}>PropVest Wallet</div>
            <div style={{color:C.dim,fontSize:11}}>Available balance: <span style={{color:C.greenG,fontWeight:700}}>₦284,000</span></div>
          </div>
          <div style={{width:20,height:20,borderRadius:"50%",background:C.greenG,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:C.white}}/>
          </div>
        </div>
        <div style={{background:`${C.goldL}10`,border:`1px solid ${C.goldL}22`,borderRadius:8,padding:"8px 12px",marginTop:8}}>
          <div style={{color:C.goldL,fontSize:10,lineHeight:1.5}}>⚠ <span style={{color:C.white,fontWeight:700}}>{fmt(Math.round(totalCost(p)*1.02))}</span> will be deducted from your wallet upon confirmation. Wallet is currently the only supported payment method for co-investments.</div>
        </div>
      </div>
    )}
    <button onClick={()=>{if(holdAgreed)setInvested(true);}} disabled={!holdAgreed} style={{width:"100%",background:holdAgreed?`linear-gradient(135deg,#1A3A1A,${C.greenL})`:C.card,border:`1px solid ${holdAgreed?C.greenL:C.border}`,borderRadius:12,padding:15,color:holdAgreed?C.white:C.muted,fontSize:14,fontWeight:700,cursor:holdAgreed?"pointer":"not-allowed",transition:"all .2s"}}>
      {holdAgreed?`Confirm & Pay ${fmt(Math.round(totalCost(p)*1.02))} from Wallet →`:"Accept Terms to Continue"}
    </button>
    <div style={{color:C.muted,fontSize:10,textAlign:"center",marginTop:8,lineHeight:1.5}}>Funds held in escrow · Co-ownership deed issued within 24 hrs · 12-month lock-in applies</div>
    </>
    ):(
    <>
    {/* Rental service fee notice */}
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
      <div style={{background:`${C.brown}18`,padding:"8px 14px"}}><span style={{color:C.brownL,fontSize:11,fontWeight:700}}>Investment Summary — {slots} Slot{slots>1?"s":""}</span></div>
      {[
        ["Slot Investment",fmt(totalCost(p)),C.white],
        ["Service Fee (2%)",fmt(Math.round(totalCost(p)*0.02)),C.goldL],
      ].map(([l,v,c],i,arr)=>(<div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none"}}>
        <span style={{color:l==="Service Fee (2%)"?C.goldL:C.muted,fontSize:12}}>{l}</span>
        <span style={{color:c,fontSize:13,fontWeight:600}}>{v}</span>
      </div>))}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:`${C.brown}12`,borderTop:`1px solid ${C.border}`}}>
        <span style={{color:C.white,fontSize:13,fontWeight:700}}>Total Due Today</span>
        <span style={{color:C.brownL,fontSize:15,fontWeight:700}}>{fmt(Math.round(totalCost(p)*1.02))}</span>
      </div>
    </div>
    <div style={{background:`${C.goldL}10`,border:`1px solid ${C.goldL}22`,borderRadius:8,padding:"8px 12px",marginBottom:12}}>
      <div style={{color:C.goldL,fontSize:10,lineHeight:1.5}}>⚠ A <span style={{fontWeight:700}}>2% service fee</span> covers legal documentation, SPV registration and PropVest platform services. This is a one-time charge deducted at subscription.</div>
    </div>
    <div style={{marginBottom:12}}>
      <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>PAYMENT METHOD</div>
      <div style={{background:`${C.brownL}15`,border:`2px solid ${C.brownL}`,borderRadius:12,padding:"13px 16px",display:"flex",gap:12,alignItems:"center"}}>
        <div style={{width:40,height:40,borderRadius:10,background:`${C.brownL}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>👛</div>
        <div style={{flex:1}}>
          <div style={{color:C.brownL,fontWeight:700,fontSize:13,marginBottom:2}}>PropVest Wallet</div>
          <div style={{color:C.dim,fontSize:11}}>Available balance: <span style={{color:C.greenG,fontWeight:700}}>₦284,000</span></div>
        </div>
        <div style={{width:20,height:20,borderRadius:"50%",background:C.brownL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:C.white}}/>
        </div>
      </div>
      <div style={{background:`${C.goldL}10`,border:`1px solid ${C.goldL}22`,borderRadius:8,padding:"8px 12px",marginTop:8}}>
        <div style={{color:C.goldL,fontSize:10,lineHeight:1.5}}>⚠ <span style={{color:C.white,fontWeight:700}}>{fmt(Math.round(totalCost(p)*1.02))}</span> will be deducted from your wallet upon confirmation. Wallet is currently the only supported payment method for co-investments.</div>
      </div>
    </div>
    <button onClick={()=>setInvested(true)} style={{width:"100%",background:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:12,padding:15,color:C.white,fontSize:14,fontWeight:700,cursor:"pointer"}}>
      Confirm & Pay {fmt(Math.round(totalCost(p)*1.02))} from Wallet →
    </button>
    <div style={{color:C.muted,fontSize:10,textAlign:"center",marginTop:8,lineHeight:1.5}}>Funds held in escrow · Co-ownership deed issued within 24 hrs · 3-year hold period applies</div>
    </>
    )}
  </div>);}

    const rentalProps=PROPS.filter(p=>p.incomeType==="rental");
  const resaleProps=PROPS.filter(p=>p.incomeType==="resale");
  const baseProps=propTab==="rental"?rentalProps:resaleProps;
  const activeProps=baseProps.filter(p=>{
    const q=search.toLowerCase();
    if(q&&!p.name.toLowerCase().includes(q)&&!p.loc.toLowerCase().includes(q)&&!p.type.toLowerCase().includes(q)) return false;
    if(filterState!=="All"&&!p.loc.toLowerCase().includes(filterState.toLowerCase())) return false;
    if(filterType!=="All"&&p.type!==filterType) return false;
    if(filterYield!=="All"){
      if(filterYield==="<15"&&p.yieldPct>=15) return false;
      if(filterYield==="15-25"&&(p.yieldPct<15||p.yieldPct>25)) return false;
      if(filterYield===">25"&&p.yieldPct<=25) return false;
    }
    if(filterSlots==="Available"&&p.slotsLeft===0) return false;
    if(filterSlots==="Full"&&p.slotsLeft>0) return false;
    return true;
  });
  const activeFilterCount=[filterState,filterType,filterYield,filterSlots].filter(v=>v!=="All").length;

  return(<div>
    <div style={{marginBottom:16}}>
      <div style={{color:C.white,fontSize:20,fontWeight:700,marginBottom:4}}>Available Properties</div>
      <div style={{color:C.muted,fontSize:13}}>SEC-verified · Each held under its own SPV</div>
    </div>

    <div style={{display:"flex",gap:0,marginBottom:20,background:C.card,borderRadius:12,padding:4,border:`1px solid ${C.border}`}}>
      <button onClick={()=>setPropTab("rental")} style={{flex:1,padding:"10px 6px",borderRadius:9,border:"none",background:propTab==="rental"?`linear-gradient(135deg,${C.brownD},${C.brown})`:"transparent",color:propTab==="rental"?C.white:C.muted,fontWeight:700,fontSize:13,cursor:"pointer",transition:"all .2s"}}>
        🏠 Rental Income
        <div style={{fontSize:10,fontWeight:400,marginTop:2,color:propTab==="rental"?C.cream:C.muted}}>{rentalProps.length} properties · Monthly payouts</div>
      </button>
      <button onClick={()=>setPropTab("resale")} style={{flex:1,padding:"10px 6px",borderRadius:9,border:"none",background:propTab==="resale"?`linear-gradient(135deg,#1A3A1A,${C.greenL})`:"transparent",color:propTab==="resale"?C.white:C.muted,fontWeight:700,fontSize:13,cursor:"pointer",transition:"all .2s"}}>
        📈 Resale / Capital Gain
        <div style={{fontSize:10,fontWeight:400,marginTop:2,color:propTab==="resale"?C.cream:C.muted}}>{resaleProps.length} properties · Profit at exit</div>
      </button>
    </div>

    {/* ── SEARCH & FILTER ── */}
    <div style={{marginBottom:14}}>
      {/* Search bar */}
      <div style={{position:"relative",marginBottom:8}}>
        <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.muted,fontSize:14}}>🔍</div>
        <input
          type="text"
          placeholder="Search by name, location or type..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
          style={{width:"100%",background:C.card,border:`2px solid ${search?C.brownL:C.border}`,borderRadius:10,padding:"11px 40px 11px 38px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box"}}
        />
        {search&&(
          <button onClick={()=>setSearch("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:C.muted,fontSize:16,cursor:"pointer",lineHeight:1}}>×</button>
        )}
      </div>

      {/* Filter toggle */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>setShowFilters(!showFilters)} style={{background:showFilters||activeFilterCount>0?`${C.brown}22`:C.card,border:`1px solid ${showFilters||activeFilterCount>0?C.brownL:C.border}`,borderRadius:8,padding:"7px 12px",color:showFilters||activeFilterCount>0?C.brownL:C.muted,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          <span>⚙</span>
          <span>Filters{activeFilterCount>0?` (${activeFilterCount})`:""}</span>
        </button>
        <div style={{color:C.muted,fontSize:11}}>{activeProps.length} of {baseProps.length} properties</div>
      </div>

      {/* Filter panel */}
      {showFilters&&(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px",marginTop:10}}>
          {/* State filter */}
          <div style={{marginBottom:12}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>STATE / LOCATION</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["All","FCT Abuja","Lagos","Lekki"].map(s=>(
                <button key={s} onClick={()=>setFilterState(s)} style={{background:filterState===s?`${C.brown}33`:C.bg,border:`1px solid ${filterState===s?C.brownL:C.border}`,borderRadius:20,padding:"4px 12px",color:filterState===s?C.brownL:C.muted,fontSize:11,cursor:"pointer",fontWeight:filterState===s?700:400}}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Property type */}
          <div style={{marginBottom:12}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>PROPERTY TYPE</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["All","Residential","Apartment","Commercial","Land","Resale Flip"].map(t=>(
                <button key={t} onClick={()=>setFilterType(t)} style={{background:filterType===t?`${C.brown}33`:C.bg,border:`1px solid ${filterType===t?C.brownL:C.border}`,borderRadius:20,padding:"4px 12px",color:filterType===t?C.brownL:C.muted,fontSize:11,cursor:"pointer",fontWeight:filterType===t?700:400}}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Yield range */}
          <div style={{marginBottom:12}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>ANNUAL YIELD</div>
            <div style={{display:"flex",gap:6}}>
              {[["All","All"],["<15","Under 15%"],["15-25","15–25%"],[">25","Over 25%"]].map(([v,l])=>(
                <button key={v} onClick={()=>setFilterYield(v)} style={{flex:1,background:filterYield===v?`${C.greenG}22`:C.bg,border:`1px solid ${filterYield===v?C.greenG:C.border}`,borderRadius:8,padding:"6px 4px",color:filterYield===v?C.greenG:C.muted,fontSize:10,cursor:"pointer",fontWeight:filterYield===v?700:400,textAlign:"center"}}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Slots availability */}
          <div style={{marginBottom:10}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>SLOT AVAILABILITY</div>
            <div style={{display:"flex",gap:6}}>
              {[["All","All slots"],["Available","Has slots"],["Full","Fully funded"]].map(([v,l])=>(
                <button key={v} onClick={()=>setFilterSlots(v)} style={{flex:1,background:filterSlots===v?`${C.indigoL}22`:C.bg,border:`1px solid ${filterSlots===v?C.indigoL:C.border}`,borderRadius:8,padding:"6px 4px",color:filterSlots===v?C.indigoG:C.muted,fontSize:10,cursor:"pointer",fontWeight:filterSlots===v?700:400,textAlign:"center"}}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {activeFilterCount>0&&(
            <button onClick={()=>{setFilterState("All");setFilterType("All");setFilterYield("All");setFilterSlots("All");}} style={{width:"100%",background:"none",border:`1px solid ${C.redL}44`,borderRadius:8,padding:"7px",color:C.redL,fontSize:11,cursor:"pointer",marginTop:4}}>
              ✕ Clear all filters
            </button>
          )}
        </div>
      )}
    </div>

    {propTab==="rental"?(
      <div style={{background:`${C.brown}15`,border:`1px solid ${C.brown}44`,borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}>
        <span style={{fontSize:16}}>💰</span>
        <div style={{color:C.dim,fontSize:11,lineHeight:1.6}}>Earn <span style={{color:C.white,fontWeight:600}}>monthly rental income</span> distributed to your wallet throughout the hold period, plus capital gains when the property is eventually sold.</div>
      </div>
    ):(
      <div style={{background:`${C.greenL}12`,border:`1px solid ${C.greenL}33`,borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}>
        <span style={{fontSize:16}}>📈</span>
        <div style={{color:C.dim,fontSize:11,lineHeight:1.6}}><span style={{color:C.white,fontWeight:600}}>No monthly income.</span> All returns are realised at exit through land appreciation or property resale. Typically higher total return potential.</div>
      </div>
    )}

    {activeProps.length===0?(
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"32px 16px",textAlign:"center"}}>
        <div style={{fontSize:32,marginBottom:10}}>🔍</div>
        <div style={{color:C.white,fontSize:14,fontWeight:600,marginBottom:6}}>No properties found</div>
        <div style={{color:C.muted,fontSize:12,marginBottom:16}}>Try adjusting your search or filters</div>
        <button onClick={()=>{setSearch("");setFilterState("All");setFilterType("All");setFilterYield("All");setFilterSlots("All");}} style={{background:`${C.brown}22`,border:`1px solid ${C.brownL}44`,borderRadius:8,padding:"8px 16px",color:C.brownL,fontSize:12,cursor:"pointer"}}>Clear search & filters</button>
      </div>
    ):(
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {activeProps.map(p=><PropCard key={p.id} p={p} onSelect={(p)=>{setSel(p);setSlots(1);setHoldAgreed(false);}} propTab={propTab}/>)}
      </div>
    )}
  </div>);}
