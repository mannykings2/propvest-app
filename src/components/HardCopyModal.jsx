import { useState } from "react";
import { C } from "../constants/theme";
export default function HardCopyModal({onClose}){
  const [step,setStep]=useState(1);
  const [docType,setDocType]=useState([]);
  const [courier,setCourier]=useState("");
  const [address,setAddress]=useState({line1:"",city:"",state:"",phone:""});
  const [submitted,setSubmitted]=useState(false);
  const [submitting,setSubmitting]=useState(false);

  const DOCS=[
    {id:"deed",label:"Co-Ownership Deed",icon:"📋",desc:"Original signed deed for your property"},
    {id:"spv",label:"SPV Certificate",icon:"🏢",desc:"Company certificate for the SPV entity"},
    {id:"title",label:"Property Title / C of O",icon:"🏛",desc:"Certified copy of title document"},
    {id:"agreement",label:"Off-Plan Agreement",icon:"🏗",desc:"Signed instalment purchase agreement"},
    {id:"kyc",label:"KYC Approval Letter",icon:"✅",desc:"Official KYC accreditation letter"},
    {id:"statement",label:"Income Statement",icon:"📊",desc:"Printed quarterly income statement"},
  ];
  const COURIERS=[
    {id:"dhl",label:"DHL Express",icon:"🟡",time:"1–2 business days",fee:"₦4,500"},
    {id:"gigl",label:"GIG Logistics",icon:"🔵",time:"2–3 business days",fee:"₦2,000"},
    {id:"redstar",label:"Red Star Express",icon:"🔴",time:"2–4 business days",fee:"₦1,800"},
    {id:"self",label:"PropVest Rider",icon:"🟢",time:"Same day (Lagos/Abuja)",fee:"₦1,500"},
  ];

  const [payMethod,setPayMethod]=useState("");
  const toggleDoc=(id)=>setDocType(prev=>prev.includes(id)?prev.filter(d=>d!==id):[...prev,id]);
  const fa=(k,v)=>setAddress(prev=>({...prev,[k]:v}));
  const selCourier=COURIERS.find(c=>c.id===courier);
  const canNext1=docType.length>0;
  const canNext2=!!courier;
  const canNext3=address.line1&&address.city&&address.state&&address.phone;
  const canSubmit=canNext3&&!!payMethod;
  const submit=()=>{setSubmitting(true);setTimeout(()=>{setSubmitting(false);setSubmitted(true);},2000);};

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"20px 20px 0 0",padding:"24px 20px 50px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}}>
        {submitted?(
          <div style={{textAlign:"center",padding:"28px 0"}}>
            <div style={{fontSize:52,marginBottom:14}}>📦</div>
            <div style={{color:C.tealG,fontSize:20,fontWeight:700,marginBottom:6}}>Request Submitted!</div>
            <div style={{color:C.dim,fontSize:12,lineHeight:1.6,marginBottom:20}}>Your documents will be dispatched within 1 business day via {selCourier?selCourier.label:"courier"}. You'll receive a tracking number by SMS and email.</div>
            <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px",marginBottom:20,textAlign:"left"}}>
              {[["Documents",docType.length+" item(s)"],["Courier",selCourier?selCourier.label:"—"],["Delivery to",address.line1+", "+address.city],["ETA",selCourier?selCourier.time:"—"],["Delivery Fee",selCourier?selCourier.fee:"—"],["Paid via",payMethod==="wallet"?"PropVest Wallet":payMethod==="card"?"Debit/Credit Card":"Bank Transfer"]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.muted,fontSize:11}}>{l}</span>
                  <span style={{color:C.white,fontSize:11,fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={onClose} style={{background:`linear-gradient(135deg,${C.teal},${C.tealL})`,border:"none",borderRadius:12,padding:"12px 28px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Done</button>
          </div>
        ):(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{color:C.white,fontSize:16,fontWeight:700}}>Request Hard Copy</div>
              <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
            </div>
            <div style={{color:C.muted,fontSize:11,marginBottom:18}}>Physical documents delivered to your door</div>
            <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:20}}>
              {[1,2,3,4].map((n,i)=>{const done=step>n,active=step===n;return(<div key={n} style={{display:"flex",alignItems:"center",flex:n<4?1:"auto"}}>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:22,height:22,borderRadius:"50%",background:done?C.tealG:active?C.tealL:C.card,border:`2px solid ${done?C.tealG:active?C.tealL:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:done||active?C.white:C.muted,flexShrink:0}}>{done?"✓":n}</div>
                  <span style={{color:active?C.white:C.muted,fontSize:9,fontWeight:active?600:400}}>{["Docs","Courier","Address","Payment"][i]}</span>
                </div>
                {n<4&&<div style={{flex:1,height:1,background:done?C.tealG:C.border,margin:"0 5px"}}/>}
              </div>);})}
            </div>

            {step===1&&(
              <div>
                <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>SELECT DOCUMENTS TO REQUEST</div>
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
                  {DOCS.map(d=>{
                    const isSel=docType.includes(d.id);
                    return(
                      <div key={d.id} onClick={()=>toggleDoc(d.id)} style={{background:isSel?`${C.tealG}10`:C.bg,border:`1px solid ${isSel?C.tealG+"44":C.border}`,borderRadius:11,padding:"12px 14px",cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
                        <div style={{width:38,height:38,borderRadius:9,background:isSel?`${C.tealG}22`:`${C.border}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{d.icon}</div>
                        <div style={{flex:1}}>
                          <div style={{color:isSel?C.white:C.dim,fontSize:12,fontWeight:isSel?700:400,marginBottom:2}}>{d.label}</div>
                          <div style={{color:C.muted,fontSize:10}}>{d.desc}</div>
                        </div>
                        <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${isSel?C.tealG:C.border}`,background:isSel?C.tealG:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          {isSel&&<span style={{color:C.white,fontSize:11,fontWeight:700}}>✓</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={()=>canNext1&&setStep(2)} style={{width:"100%",background:canNext1?`linear-gradient(135deg,${C.teal},${C.tealL})`:C.border,border:"none",borderRadius:12,padding:14,color:canNext1?C.white:C.muted,fontSize:14,fontWeight:700,cursor:canNext1?"pointer":"not-allowed"}}>
                  Continue ({docType.length} selected) →
                </button>
              </div>
            )}

            {step===2&&(
              <div>
                <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>CHOOSE COURIER SERVICE</div>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
                  {COURIERS.map(c=>{
                    const isSel=courier===c.id;
                    return(
                      <div key={c.id} onClick={()=>setCourier(c.id)} style={{background:isSel?`${C.tealG}10`:C.bg,border:`2px solid ${isSel?C.tealG:C.border}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
                        <div style={{fontSize:22,flexShrink:0}}>{c.icon}</div>
                        <div style={{flex:1}}>
                          <div style={{color:isSel?C.white:C.dim,fontSize:13,fontWeight:700,marginBottom:2}}>{c.label}</div>
                          <div style={{color:C.muted,fontSize:10}}>⏱ {c.time}</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{color:isSel?C.tealG:C.goldL,fontSize:13,fontWeight:700}}>{c.fee}</div>
                          <div style={{color:C.muted,fontSize:9}}>delivery fee</div>
                        </div>
                        <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${isSel?C.tealG:C.border}`,background:isSel?C.tealG:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          {isSel&&<div style={{width:8,height:8,borderRadius:"50%",background:C.white}}/>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setStep(1)} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14,color:C.dim,fontSize:13,cursor:"pointer"}}>← Back</button>
                  <button onClick={()=>canNext2&&setStep(3)} style={{flex:2,background:canNext2?`linear-gradient(135deg,${C.teal},${C.tealL})`:C.border,border:"none",borderRadius:12,padding:14,color:canNext2?C.white:C.muted,fontSize:14,fontWeight:700,cursor:canNext2?"pointer":"not-allowed"}}>Continue →</button>
                </div>
              </div>
            )}

            {step===3&&(
              <div>
                <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>DELIVERY ADDRESS</div>
                {[["Address Line 1","line1","e.g. 12 Aminu Kano Crescent, Wuse II"],["City / Town","city","e.g. Abuja"],["State","state","e.g. FCT"],["Phone Number","phone","e.g. 0801 234 5678"]].map(([lbl,key,ph])=>(
                  <div key={key} style={{marginBottom:12}}>
                    <div style={{color:C.dim,fontSize:11,marginBottom:5}}>{lbl}</div>
                    <input type="text" placeholder={ph} value={address[key]} onChange={e=>fa(key,e.target.value)} style={{width:"100%",background:C.bg,border:`2px solid ${address[key]?C.tealL:C.border}`,borderRadius:10,padding:"11px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                  </div>
                ))}
                {selCourier&&(
                  <div style={{background:`${C.teal}10`,border:`1px solid ${C.tealL}33`,borderRadius:10,padding:"10px 14px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{color:C.tealG,fontSize:11,fontWeight:700}}>{selCourier.label}</div><div style={{color:C.muted,fontSize:10}}>⏱ {selCourier.time}</div></div>
                    <div style={{color:C.goldL,fontSize:14,fontWeight:700}}>{selCourier.fee}</div>
                  </div>
                )}
                <div style={{background:`${C.goldL}10`,border:`1px solid ${C.goldL}22`,borderRadius:10,padding:"9px 12px",marginBottom:16}}>
                  <div style={{color:C.goldL,fontSize:10,lineHeight:1.6}}>⚠ Delivery fee is charged separately at dispatch. PropVest will notify you before the rider is assigned.</div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setStep(2)} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14,color:C.dim,fontSize:13,cursor:"pointer"}}>← Back</button>
                  <button onClick={()=>canNext3&&setStep(4)} style={{flex:2,background:canNext3?`linear-gradient(135deg,${C.teal},${C.tealL})`:C.border,border:"none",borderRadius:12,padding:14,color:canNext3?C.white:C.muted,fontSize:14,fontWeight:700,cursor:canNext3?"pointer":"not-allowed"}}>Continue →</button>
                </div>
              </div>
            )}

            {step===4&&(
              <div>
                <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>PAYMENT METHOD</div>
                <div style={{color:C.dim,fontSize:11,lineHeight:1.5,marginBottom:14}}>Select how you'd like to pay the delivery fee of <span style={{color:C.goldL,fontWeight:700}}>{selCourier?selCourier.fee:"—"}</span>.</div>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
                  {[
                    {id:"wallet",icon:"👛",label:"PropVest Wallet",desc:"Deducted instantly from your wallet balance (₦284,000 available)",col:C.brownL},
                    {id:"card",icon:"💳",label:"Debit / Credit Card",desc:"Processed via Paystack · 1.5% card surcharge applies",col:C.indigoG},
                    {id:"transfer",icon:"🏦",label:"Bank Transfer",desc:"Manual transfer — request held until payment confirmed",col:C.tealG},
                  ].map(m=>{
                    const isSel=payMethod===m.id;
                    return(
                      <div key={m.id} onClick={()=>setPayMethod(m.id)} style={{background:isSel?`${m.col}15`:C.bg,border:`2px solid ${isSel?m.col:C.border}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
                        <div style={{width:40,height:40,borderRadius:10,background:`${m.col}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{m.icon}</div>
                        <div style={{flex:1}}>
                          <div style={{color:isSel?m.col:C.white,fontSize:13,fontWeight:700,marginBottom:3}}>{m.label}</div>
                          <div style={{color:C.muted,fontSize:10,lineHeight:1.4}}>{m.desc}</div>
                        </div>
                        <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${isSel?m.col:C.border}`,background:isSel?m.col:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          {isSel&&<div style={{width:8,height:8,borderRadius:"50%",background:C.white}}/>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order summary */}
                <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",marginBottom:14}}>
                  <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>ORDER SUMMARY</div>
                  {[
                    ["Documents",docType.length+" item(s)"],
                    ["Courier",selCourier?selCourier.label:"—"],
                    ["Deliver to",address.city+", "+address.state],
                    ["Delivery Fee",selCourier?selCourier.fee:"—"],
                    ["Payment via",payMethod===("wallet")?"PropVest Wallet":payMethod==="card"?"Debit/Credit Card":payMethod==="transfer"?"Bank Transfer":"—"],
                  ].map(([l,v])=>(
                    <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.border}`}}>
                      <span style={{color:C.muted,fontSize:11}}>{l}</span>
                      <span style={{color:C.white,fontSize:11,fontWeight:600}}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setStep(3)} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14,color:C.dim,fontSize:13,cursor:"pointer"}}>← Back</button>
                  <button onClick={()=>canSubmit&&!submitting&&submit()} disabled={submitting||!canSubmit} style={{flex:2,background:canSubmit?`linear-gradient(135deg,${C.teal},${C.tealL})`:C.border,border:"none",borderRadius:12,padding:14,color:canSubmit?C.white:C.muted,fontSize:14,fontWeight:700,cursor:canSubmit?"pointer":"not-allowed"}}>
                    {submitting?(<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span style={{display:"inline-block",width:13,height:13,border:`2px solid ${C.tealG}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Submitting...</span>):"Submit Request →"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

