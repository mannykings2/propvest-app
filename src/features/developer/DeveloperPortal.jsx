import { useState } from "react";
import { C, nfmt } from "../../constants/theme";
import { DEV_PROPS } from "../../constants/data";
import Bar from "../../components/ui/Bar";
import Chip from "../../components/ui/Chip";
import Stat from "../../components/ui/Stat";
export default function DeveloperPortal(){
  const [view,setView]=useState("overview");
  const [selProp,setSelProp]=useState(null);
  const [subTab,setSubTab]=useState("overview");
  const [listing,setListing]=useState(false);
  const [listStep,setListStep]=useState(1);
  const [listSubmitted,setListSubmitted]=useState(false);
  const [form,setForm]=useState({
    name:"",location:"",type:"Residential",projectType:"",
    price:"",description:"",
    completionDate:"",agreementUploaded:false,prototypeUploaded:false,
    docs:{titleDoc:false,surveyPlan:false,approvalDoc:false,deedOfAssignment:false,envImpact:false},
  });
  const f=(k,v)=>setForm(prev=>({...prev,[k]:v}));
  const fd=(k)=>setForm(prev=>({...prev,docs:{...prev.docs,[k]:!prev.docs[k]}}));

  const PROP_TYPES=["Residential","Apartment","Commercial","Land","Resale Flip","Mixed Use"];
  const REQUIRED_DOCS=[
    {id:"titleDoc",       label:"Certificate of Occupancy / Title Document",  required:true},
    {id:"surveyPlan",     label:"Approved Survey Plan",                        required:true},
    {id:"approvalDoc",    label:"Building Plan Approval (State/FCDA)",          required:true},
    {id:"deedOfAssignment",label:"Deed of Assignment / Contract of Sale",      required:false},
    {id:"envImpact",      label:"Environmental Impact Assessment (if applicable)",required:false},
  ];

  const open=(p)=>{setSelProp(p);setSubTab("overview");setView("property");};
  const resetListing=()=>{setListing(false);setListStep(1);setListSubmitted(false);setForm({name:"",location:"",type:"Residential",projectType:"",price:"",description:"",completionDate:"",agreementUploaded:false,prototypeUploaded:false,docs:{titleDoc:false,surveyPlan:false,approvalDoc:false,deedOfAssignment:false,envImpact:false}});};

  // ── LISTING FLOW ──
  if(listing){
    if(listSubmitted) return(
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 16px",textAlign:"center"}}>
        <div style={{fontSize:52,marginBottom:16}}>✅</div>
        <div style={{color:C.indigoG,fontSize:20,fontWeight:700,marginBottom:8}}>Submission Received</div>
        <div style={{color:C.dim,fontSize:13,marginBottom:6,lineHeight:1.6}}>Your property listing has been submitted for PropVest due diligence review.</div>
        <div style={{background:`${C.indigo}18`,border:`1px solid ${C.indigoL}33`,borderRadius:12,padding:"14px 18px",marginBottom:24,width:"100%",maxWidth:340}}>
          {[["Property",form.name],["Type",form.projectType==="offplan"?"Off-Plan":"Finished Property"],["Review ETA","3–5 business days"],["Assigned Ref","DEV-"+(Math.floor(Math.random()*9000)+1000)]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}><span style={{color:C.muted,fontSize:12}}>{l}</span><span style={{color:C.white,fontSize:12,fontWeight:600}}>{v}</span></div>
          ))}
        </div>
        <button onClick={resetListing} style={{background:`linear-gradient(135deg,${C.indigo},${C.indigoL})`,border:"none",borderRadius:12,padding:"13px 28px",color:C.white,fontSize:14,fontWeight:600,cursor:"pointer"}}>Back to Portal</button>
      </div>
    );
    return(
      <div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
          <button onClick={resetListing} style={{background:"none",border:"none",color:C.indigoG,fontSize:13,cursor:"pointer"}}>← Cancel</button>
          <div style={{color:C.white,fontSize:16,fontWeight:700}}>List a New Property</div>
        </div>
        {/* Step indicators */}
        <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:22}}>
          {[1,2,3].map((n,i)=>{const done=listStep>n,active=listStep===n;return(<div key={n} style={{display:"flex",alignItems:"center",flex:n<3?1:"auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:done?C.greenG:active?C.indigoL:C.card,border:`2px solid ${done?C.greenG:active?C.indigoL:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:done||active?C.white:C.muted,flexShrink:0}}>{done?"✓":n}</div>
              <span style={{color:active?C.white:C.muted,fontSize:10,fontWeight:active?600:400}}>{["Basic Info","Project Type","Documents"][i]}</span>
            </div>
            {n<3&&<div style={{flex:1,height:1,background:done?C.greenG:C.border,margin:"0 8px"}}/>}
          </div>);})}
        </div>

        {/* STEP 1: Basic Info */}
        {listStep===1&&(<div>
          <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:14}}>BASIC PROPERTY INFORMATION</div>
          {[["Property Name","name","text","e.g. Sunrise Garden Estate"],["Location / Address","location","text","e.g. Katampe Extension, FCT Abuja"],["Listing Price (₦)","price","text","e.g. 45,000,000"]].map(([lbl,key,type,ph])=>(
            <div key={key} style={{marginBottom:14}}>
              <div style={{color:C.dim,fontSize:11,marginBottom:5}}>{lbl}</div>
              <input type={type} placeholder={ph} value={form[key]} onChange={e=>f(key,e.target.value)} style={{width:"100%",background:C.card,border:`2px solid ${form[key]?C.indigoL:C.border}`,borderRadius:10,padding:"11px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
            </div>
          ))}
          <div style={{marginBottom:14}}>
            <div style={{color:C.dim,fontSize:11,marginBottom:5}}>Property Type</div>
            <select value={form.type} onChange={e=>f("type",e.target.value)} style={{width:"100%",background:C.card,border:`2px solid ${C.border}`,borderRadius:10,padding:"11px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",cursor:"pointer"}}>
              {PROP_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{marginBottom:20}}>
            <div style={{color:C.dim,fontSize:11,marginBottom:5}}>Brief Description</div>
            <textarea rows={3} placeholder="Describe the property, key features, selling points..." value={form.description} onChange={e=>f("description",e.target.value)} style={{width:"100%",background:C.card,border:`2px solid ${form.description?C.indigoL:C.border}`,borderRadius:10,padding:"11px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",resize:"vertical",fontFamily:"inherit"}}/>
          </div>
          <button onClick={()=>form.name&&form.location&&form.price?setListStep(2):null} style={{width:"100%",background:form.name&&form.location&&form.price?`linear-gradient(135deg,${C.indigo},${C.indigoL})`:C.card,border:"none",borderRadius:12,padding:15,color:form.name&&form.location&&form.price?C.white:C.muted,fontSize:14,fontWeight:700,cursor:form.name&&form.location&&form.price?"pointer":"not-allowed"}}>Continue →</button>
        </div>)}

        {/* STEP 2: Project Type */}
        {listStep===2&&(<div>
          <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:14}}>PROJECT TYPE</div>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
            {[["finished","🏠","Finished Property","The property is fully built and ready for immediate occupation or rental. Investors can start earning immediately."],["offplan","🏗","Off-Plan Project","Property is under construction or planning. Investors commit to the project based on plans and milestones."]].map(([id,icon,title,desc])=>(
              <div key={id} onClick={()=>f("projectType",id)} style={{background:form.projectType===id?`${C.indigoL}18`:C.card,border:`2px solid ${form.projectType===id?C.indigoL:C.border}`,borderRadius:14,padding:"16px 18px",cursor:"pointer",transition:"all .2s"}}>
                <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <span style={{fontSize:24}}>{icon}</span>
                  <div style={{flex:1}}>
                    <div style={{color:form.projectType===id?C.white:C.dim,fontWeight:700,fontSize:14,marginBottom:4}}>{title}</div>
                    <div style={{color:C.muted,fontSize:11,lineHeight:1.6}}>{desc}</div>
                  </div>
                  <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${form.projectType===id?C.indigoL:C.border}`,background:form.projectType===id?C.indigoL:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
                    {form.projectType===id&&<div style={{width:8,height:8,borderRadius:"50%",background:C.white}}/>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Off-plan extra fields */}
          {form.projectType==="offplan"&&(
            <div style={{background:`${C.teal}10`,border:`1px solid ${C.tealL}33`,borderRadius:12,padding:"16px",marginBottom:20}}>
              <div style={{color:C.tealG,fontSize:11,fontWeight:700,marginBottom:12}}>🏗 Off-Plan Details Required</div>
              <div style={{marginBottom:12}}>
                <div style={{color:C.dim,fontSize:11,marginBottom:5}}>Expected Completion Date</div>
                <input type="text" placeholder="e.g. Q4 2027 or December 2027" value={form.completionDate} onChange={e=>f("completionDate",e.target.value)} style={{width:"100%",background:C.card,border:`2px solid ${form.completionDate?C.tealL:C.border}`,borderRadius:10,padding:"11px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:12}}>
                <div style={{color:C.dim,fontSize:11,marginBottom:6}}>Off-Plan Agreement / Purchase Agreement</div>
                <div onClick={()=>f("agreementUploaded",!form.agreementUploaded)} style={{background:form.agreementUploaded?`${C.greenG}15`:C.card,border:`2px dashed ${form.agreementUploaded?C.greenG:C.border}`,borderRadius:10,padding:"14px 16px",cursor:"pointer",textAlign:"center"}}>
                  {form.agreementUploaded?(
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                      <span style={{fontSize:16}}>✅</span>
                      <span style={{color:C.greenG,fontSize:12,fontWeight:600}}>OffPlan_Agreement.pdf — Uploaded</span>
                      <span style={{color:C.muted,fontSize:10}}>tap to remove</span>
                    </div>
                  ):(
                    <div>
                      <div style={{fontSize:22,marginBottom:4}}>📄</div>
                      <div style={{color:C.indigoG,fontSize:12,fontWeight:600}}>Upload Off-Plan Agreement</div>
                      <div style={{color:C.muted,fontSize:10,marginTop:2}}>PDF, DOC — max 10MB</div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div style={{color:C.dim,fontSize:11,marginBottom:6}}>Architectural Design / Prototype / Render</div>
                <div onClick={()=>f("prototypeUploaded",!form.prototypeUploaded)} style={{background:form.prototypeUploaded?`${C.greenG}15`:C.card,border:`2px dashed ${form.prototypeUploaded?C.greenG:C.border}`,borderRadius:10,padding:"14px 16px",cursor:"pointer",textAlign:"center"}}>
                  {form.prototypeUploaded?(
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                      <span style={{fontSize:16}}>✅</span>
                      <span style={{color:C.greenG,fontSize:12,fontWeight:600}}>Architectural_Design.pdf — Uploaded</span>
                      <span style={{color:C.muted,fontSize:10}}>tap to remove</span>
                    </div>
                  ):(
                    <div>
                      <div style={{fontSize:22,marginBottom:4}}>🏛</div>
                      <div style={{color:C.indigoG,fontSize:12,fontWeight:600}}>Upload Prototype / Renders</div>
                      <div style={{color:C.muted,fontSize:10,marginTop:2}}>PDF, PNG, JPG — floor plans, renders, brochure</div>
                    </div>
                  )}
                </div>
                {form.projectType==="offplan"&&!form.agreementUploaded&&<div style={{color:C.goldL,fontSize:10,marginTop:6}}>⚠ Off-plan agreement is required before submission.</div>}
              </div>
            </div>
          )}

          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setListStep(1)} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14,color:C.dim,fontSize:13,cursor:"pointer"}}>← Back</button>
            <button onClick={()=>form.projectType&&(form.projectType==="finished"||(form.completionDate&&form.agreementUploaded))?setListStep(3):null} style={{flex:2,background:form.projectType&&(form.projectType==="finished"||(form.completionDate&&form.agreementUploaded))?`linear-gradient(135deg,${C.indigo},${C.indigoL})`:C.card,border:"none",borderRadius:12,padding:14,color:form.projectType&&(form.projectType==="finished"||(form.completionDate&&form.agreementUploaded))?C.white:C.muted,fontSize:14,fontWeight:700,cursor:"pointer"}}>Continue →</button>
          </div>
        </div>)}

        {/* STEP 3: Documents */}
        {listStep===3&&(<div>
          <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:6}}>REQUIRED DOCUMENTS</div>
          <div style={{color:C.dim,fontSize:11,marginBottom:14,lineHeight:1.5}}>Upload all required legal documents for PropVest due diligence. Missing required documents will delay your listing approval.</div>

          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
            {REQUIRED_DOCS.map(doc=>(
              <div key={doc.id} onClick={()=>fd(doc.id)} style={{background:form.docs[doc.id]?`${C.greenG}10`:C.card,border:`1px solid ${form.docs[doc.id]?C.greenG+"44":C.border}`,borderRadius:10,padding:"13px 14px",cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
                <div style={{width:36,height:36,borderRadius:8,background:form.docs[doc.id]?`${C.greenG}22`:`${C.border}50`,border:`1px solid ${form.docs[doc.id]?C.greenG+"44":C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                  {form.docs[doc.id]?"✅":"📄"}
                </div>
                <div style={{flex:1}}>
                  <div style={{color:form.docs[doc.id]?C.white:C.dim,fontSize:12,fontWeight:form.docs[doc.id]?600:400,marginBottom:2}}>{doc.label}</div>
                  <div style={{color:form.docs[doc.id]?C.greenG:C.muted,fontSize:10}}>{form.docs[doc.id]?"Uploaded — tap to remove":`${doc.required?"Required":"Optional"} · PDF, DOC, JPG`}</div>
                </div>
                {doc.required&&!form.docs[doc.id]&&<div style={{background:`${C.redL}22`,border:`1px solid ${C.redL}44`,borderRadius:6,padding:"2px 7px",color:C.redL,fontSize:9,fontWeight:700,flexShrink:0}}>REQ</div>}
              </div>
            ))}
          </div>

          {/* Summary before submit */}
          <div style={{background:`${C.indigo}15`,border:`1px solid ${C.indigoL}33`,borderRadius:12,padding:"14px 16px",marginBottom:18}}>
            <div style={{color:C.indigoG,fontSize:11,fontWeight:700,marginBottom:10}}>Submission Summary</div>
            {[["Property",form.name],["Type",form.type+" · "+(form.projectType==="offplan"?"Off-Plan":"Finished")],["Location",form.location],["Price","₦"+parseInt((form.price||"0").replace(/,/g,"")).toLocaleString()],form.projectType==="offplan"?["Completion",form.completionDate]:null,["Docs Uploaded",Object.values(form.docs).filter(Boolean).length+"/"+REQUIRED_DOCS.length]].filter(Boolean).map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.border}`}}><span style={{color:C.muted,fontSize:11}}>{l}</span><span style={{color:C.white,fontSize:11,fontWeight:600}}>{v}</span></div>
            ))}
          </div>

          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setListStep(2)} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14,color:C.dim,fontSize:13,cursor:"pointer"}}>← Back</button>
            <button onClick={()=>{const reqDone=REQUIRED_DOCS.filter(d=>d.required).every(d=>form.docs[d.id]);if(reqDone)setListSubmitted(true);}} style={{flex:2,background:`linear-gradient(135deg,${C.indigo},${C.indigoL})`,border:"none",borderRadius:12,padding:14,color:C.white,fontSize:14,fontWeight:700,cursor:"pointer"}}>Submit for Review →</button>
          </div>
        </div>)}
      </div>
    );
  }

  // ── PROPERTY DETAIL VIEW ──
  if(view==="property"&&selProp){
    const p=selProp;const pct=Math.round((p.pooled/p.target)*100);
    const PROP_DOCS=[
      {name:"Certificate of Occupancy",type:"Legal",uploaded:true,date:"12 Jan 2025"},
      {name:"Approved Survey Plan",type:"Legal",uploaded:true,date:"12 Jan 2025"},
      {name:"Building Plan Approval",type:"Approval",uploaded:true,date:"15 Jan 2025"},
      {name:"Deed of Assignment",type:"Legal",uploaded:p.id===1,date:"20 Jan 2025"},
      ...(p.status==="FUNDING"?[{name:"Off-Plan Agreement",type:"Off-Plan",uploaded:true,date:"10 Jan 2025"},{name:"Architectural Prototype / Renders",type:"Off-Plan",uploaded:false,date:null}]:[]),
    ];
    const tcol={Legal:C.indigoG,Approval:C.brownL,"Off-Plan":C.tealG};
    return(<div>
      <button onClick={()=>{setView("overview");setSelProp(null);}} style={{background:"none",border:"none",color:C.indigoG,fontSize:13,cursor:"pointer",marginBottom:18}}>← Back</button>
      <div style={{background:`linear-gradient(135deg,${C.indigo},${C.indigoL})`,borderRadius:16,padding:"20px 22px",marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div><div style={{color:C.white,fontSize:18,fontWeight:700,marginBottom:3}}>{p.name}</div><div style={{color:C.indigoG,fontSize:12}}>{p.location} · {p.type}</div></div>
          <Chip text={p.status} col={p.status==="LIVE"?C.greenG:C.goldL}/>
        </div>
        <div style={{color:C.indigoG,fontSize:11,marginBottom:6,opacity:.8}}>SPV: {p.spv}</div>
        <div style={{background:"rgba(255,255,255,.15)",borderRadius:4,height:6,overflow:"hidden",marginBottom:6}}><div style={{width:`${pct}%`,height:"100%",background:C.indigoG}}/></div>
        <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:C.indigoG,fontSize:11}}>{nfmt(p.pooled)} pooled</span><span style={{color:C.white,fontSize:11,fontWeight:700}}>{pct}% of {nfmt(p.target)}</span></div>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto"}}>
        {[["overview","⊞ Overview"],["subscribers","👥 Co-Investors"],["docs","📄 Documents"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setSubTab(id)} style={{flexShrink:0,background:subTab===id?C.indigo:C.card,border:`1px solid ${subTab===id?C.indigoL:C.border}`,borderRadius:10,padding:"9px 14px",color:subTab===id?C.white:C.muted,fontSize:12,fontWeight:subTab===id?600:400,cursor:"pointer"}}>{lbl}</button>
        ))}
      </div>

      {subTab==="overview"&&(<div>
        <div style={{display:"flex",gap:10,marginBottom:16}}><Stat label="INVESTORS" val={p.investors} col={C.indigoG}/><Stat label="POOLED" val={nfmt(p.pooled)} col={C.goldL}/></div>
        <div style={{display:"flex",gap:10,marginBottom:16}}><Stat label="MONTHLY RENT" val={p.monthly_rent>0?nfmt(p.monthly_rent):"Pending"} col={C.greenG}/><Stat label="DISTRIBUTED" val={p.distributed>0?nfmt(p.distributed):"—"} col={C.brownL}/></div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:16}}>
          <div style={{padding:"12px 16px",background:C.border}}><span style={{color:C.white,fontWeight:600,fontSize:13}}>Property Details</span></div>
          {[["Status",p.status],["Occupancy",p.occupancy],["SPV",p.spv],["Target",nfmt(p.target)],["Remaining",nfmt(p.target-p.pooled)]].map(([l,v],i)=>(<div key={l} style={{display:"flex",justifyContent:"space-between",padding:"11px 16px",borderTop:`1px solid ${C.border}`,background:i%2===0?"transparent":`${C.border}20`}}><span style={{color:C.muted,fontSize:12}}>{l}</span><span style={{color:C.white,fontSize:12,fontWeight:500}}>{v}</span></div>))}
        </div>
        <div style={{background:`${C.indigo}18`,border:`1px solid ${C.indigoL}33`,borderRadius:10,padding:"12px 14px"}}><div style={{color:C.indigoG,fontSize:11,fontWeight:600,marginBottom:4}}>🔒 NDPA 2023 Compliance</div><div style={{color:C.dim,fontSize:11,lineHeight:1.6}}>Subscriber data is anonymised by default. Full details only visible if the subscriber consented during KYC.</div></div>
      </div>)}

      {subTab==="subscribers"&&(<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1}}>{p.subscribers.length} CO-INVESTORS</div><Chip text="ANONYMISED" col={C.indigoL}/></div>
        <div style={{background:"linear-gradient(135deg,#1A1A3A,#1E1E4A)",border:`1px solid ${C.indigoL}33`,borderRadius:12,padding:"14px 18px",marginBottom:16,display:"flex",gap:20}}>
          <div><div style={{color:C.dim,fontSize:10,fontFamily:"monospace",marginBottom:4}}>TOTAL STAKED</div><div style={{color:C.indigoG,fontSize:16,fontWeight:700}}>{nfmt(p.pooled)}</div></div>
          <div style={{width:1,background:C.border}}/>
          <div><div style={{color:C.dim,fontSize:10,fontFamily:"monospace",marginBottom:4}}>AVG STAKE</div><div style={{color:C.goldL,fontSize:16,fontWeight:700}}>{nfmt(Math.round(p.pooled/p.subscribers.length))}</div></div>
          <div style={{width:1,background:C.border}}/>
          <div><div style={{color:C.dim,fontSize:10,fontFamily:"monospace",marginBottom:4}}>FUNDED</div><div style={{color:C.greenG,fontSize:16,fontWeight:700}}>{pct}%</div></div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"0.7fr 1fr 0.8fr 0.8fr",padding:"10px 14px",background:C.border}}>{["ID","Name","Stake","Amount"].map(h=>(<div key={h} style={{color:C.muted,fontSize:10,fontFamily:"monospace",letterSpacing:.8}}>{h}</div>))}</div>
          {p.subscribers.map((s,i)=>(<div key={s.id} style={{display:"grid",gridTemplateColumns:"0.7fr 1fr 0.8fr 0.8fr",padding:"11px 14px",borderTop:`1px solid ${C.border}`,background:i%2===0?"transparent":`${C.border}20`}}>
            <div style={{color:C.dim,fontSize:11,fontFamily:"monospace"}}>{s.id}</div><div style={{color:C.white,fontSize:12,fontWeight:500}}>{s.name}</div><div style={{color:C.indigoG,fontSize:12,fontWeight:600}}>{s.stake}</div><div style={{color:C.goldL,fontSize:12}}>{s.amount}</div>
          </div>))}
        </div>
        <div style={{background:`${C.gold}18`,border:`1px solid ${C.goldL}33`,borderRadius:10,padding:"10px 14px",marginTop:14}}><div style={{color:C.goldL,fontSize:11,lineHeight:1.6}}>⚠ Names are partially anonymised. Full identity details require PropVest admin approval.</div></div>
      </div>)}

      {subTab==="docs"&&(<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1}}>PROPERTY DOCUMENTS</div>
          <div style={{color:C.greenG,fontSize:10,fontWeight:700}}>{PROP_DOCS.filter(d=>d.uploaded).length}/{PROP_DOCS.length} uploaded</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
          {PROP_DOCS.map(d=>(
            <div key={d.name} style={{background:C.card,border:`1px solid ${d.uploaded?C.greenG+"33":C.redL+"33"}`,borderRadius:10,padding:"12px 14px",display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:36,height:36,borderRadius:8,background:d.uploaded?`${C.greenG}18`:`${C.redL}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                {d.uploaded?"✅":"❌"}
              </div>
              <div style={{flex:1}}>
                <div style={{color:C.white,fontSize:12,fontWeight:600,marginBottom:2}}>{d.name}</div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <div style={{background:`${tcol[d.type]||C.muted}22`,border:`1px solid ${tcol[d.type]||C.muted}44`,borderRadius:4,padding:"1px 6px",color:tcol[d.type]||C.muted,fontSize:9,fontWeight:700}}>{d.type}</div>
                  {d.uploaded?<span style={{color:C.muted,fontSize:10}}>Uploaded {d.date}</span>:<span style={{color:C.redL,fontSize:10}}>Not yet uploaded</span>}
                </div>
              </div>
              {d.uploaded?<button style={{background:C.border,border:"none",borderRadius:7,padding:"5px 10px",color:C.dim,fontSize:10,cursor:"pointer"}}>View</button>:<button style={{background:`${C.indigoL}22`,border:`1px solid ${C.indigoL}44`,borderRadius:7,padding:"5px 10px",color:C.indigoG,fontSize:10,cursor:"pointer"}}>Upload</button>}
            </div>
          ))}
        </div>
        <div style={{background:`${C.indigo}15`,border:`1px solid ${C.indigoL}33`,borderRadius:10,padding:"10px 14px"}}>
          <div style={{color:C.indigoG,fontSize:10,fontWeight:700,marginBottom:4}}>📋 Document Requirements</div>
          <div style={{color:C.dim,fontSize:10,lineHeight:1.6}}>All required documents must be verified by PropVest legal team before your property is made live to investors. Missing documents will place your listing on hold.</div>
        </div>
      </div>)}
    </div>);
  }

  // ── OVERVIEW ──
  return(<div>
    <div style={{background:`linear-gradient(135deg,${C.indigo},${C.indigoL})`,borderRadius:16,padding:"22px 24px",marginBottom:22,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:-20,top:-20,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{width:38,height:38,borderRadius:10,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏗</div>
        <div><div style={{color:C.white,fontSize:15,fontWeight:700}}>Sunrise Properties Ltd</div><div style={{color:C.indigoG,fontSize:11}}>Verified Developer · PropVest Partner</div></div>
        <div style={{marginLeft:"auto"}}><Chip text="VERIFIED ✓" col={C.greenG}/></div>
      </div>
      <div style={{display:"flex",gap:20}}>
        <div><div style={{color:C.indigoG,fontSize:10,fontFamily:"monospace",marginBottom:3}}>LISTED</div><div style={{color:C.white,fontWeight:700,fontSize:18}}>{DEV_PROPS.length}</div></div>
        <div style={{width:1,background:"rgba(255,255,255,.15)"}}/>
        <div><div style={{color:C.indigoG,fontSize:10,fontFamily:"monospace",marginBottom:3}}>TOTAL POOLED</div><div style={{color:C.white,fontWeight:700,fontSize:18}}>₦122M</div></div>
        <div style={{width:1,background:"rgba(255,255,255,.15)"}}/>
        <div><div style={{color:C.indigoG,fontSize:10,fontFamily:"monospace",marginBottom:3}}>INVESTORS</div><div style={{color:C.white,fontWeight:700,fontSize:18}}>36</div></div>
      </div>
    </div>
    <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:14}}>MY LISTED PROPERTIES</div>
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {DEV_PROPS.map(p=>{const pct=Math.round((p.pooled/p.target)*100);return(<div key={p.id} onClick={()=>open(p)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 20px",cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.indigoL;e.currentTarget.style.background=C.cardH;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card;}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div><div style={{color:C.white,fontWeight:700,fontSize:15,marginBottom:2}}>{p.name}</div><div style={{color:C.muted,fontSize:12}}>{p.location} · {p.spv}</div></div><Chip text={p.status} col={p.status==="LIVE"?C.greenG:C.goldL}/></div>
        <div style={{display:"flex",gap:16,marginBottom:12}}><div><span style={{color:C.muted,fontSize:11}}>Investors: </span><span style={{color:C.indigoG,fontWeight:700,fontSize:13}}>{p.investors}</span></div><div><span style={{color:C.muted,fontSize:11}}>Pooled: </span><span style={{color:C.goldL,fontWeight:600,fontSize:13}}>{nfmt(p.pooled)}</span></div><div><span style={{color:C.muted,fontSize:11}}>Target: </span><span style={{color:C.brownL,fontWeight:600,fontSize:13}}>{nfmt(p.target)}</span></div></div>
        <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1}}><div style={{background:C.border,borderRadius:4,height:6,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:C.indigoL,borderRadius:4}}/></div></div><span style={{color:C.indigoG,fontSize:11,fontFamily:"monospace",fontWeight:700}}>{pct}%</span></div>
        <div style={{marginTop:10,color:C.dim,fontSize:11}}>View subscribers, analytics & documents →</div>
      </div>);})}
    </div>
    <div onClick={()=>setListing(true)} style={{marginTop:20,background:C.card,border:`2px dashed ${C.indigoL}44`,borderRadius:14,padding:"20px",textAlign:"center",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.indigoL} onMouseLeave={e=>e.currentTarget.style.borderColor=C.indigoL+"44"}>
      <div style={{fontSize:28,marginBottom:8}}>＋</div>
      <div style={{color:C.indigoG,fontWeight:600,fontSize:14,marginBottom:4}}>List a New Property</div>
      <div style={{color:C.muted,fontSize:12}}>Submit for PropVest due diligence review</div>
    </div>
  </div>);
}

