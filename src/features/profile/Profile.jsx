import { useState } from "react";
import { C } from "../../constants/theme";
export default function Profile(){
  const [editField,setEditField]=useState(null);
  const [editVal,setEditVal]=useState("");
  const [saved,setSaved]=useState(false);

  const save=()=>{setSaved(true);setTimeout(()=>{setSaved(false);setEditField(null);},1500);};

  const USER={
    name:"Chukwuemeka Adeola Johnson",
    email:"c.johnson@email.com",
    phone:"+234 812 345 6789",
    dob:"14 March 1988",
    gender:"Male",
    address:"12 Gana Street, Maitama, FCT Abuja, Nigeria",
    stateOfOrigin:"Anambra State",
    nationality:"Nigerian",
    bvn:"22•••••••91",
    nin:"•••••••••12",
    bankAccount:"Access Bank · ••••••4821",
    taxId:"TIN-2209-4872",
    occupation:"Senior Manager",
    employer:"Zenith Capital Ltd",
    netWorth:"₦50M – ₦100M bracket",
    annualIncome:"₦8M – ₦15M bracket",
    investorClass:"Accredited Investor",
    kycDate:"10 Nov 2025",
    kycScore:"94 / 100",
    nextKyc:"10 Nov 2026",
    accrStatus:"VERIFIED",
  };

  const Section=({title,col,children})=>(
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <div style={{width:3,height:16,background:col||C.brown,borderRadius:2}}/>
        <div style={{color:col||C.brownL,fontSize:10,fontWeight:700,fontFamily:"monospace",letterSpacing:1}}>{title}</div>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
        {children}
      </div>
    </div>
  );

  const Row=({label,value,masked,editable,col})=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderBottom:`1px solid ${C.border}`}}>
      <span style={{color:C.muted,fontSize:12}}>{label}</span>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{color:col||C.white,fontSize:12,fontWeight:500,fontFamily:masked?"monospace":"inherit"}}>{value}</span>
        {editable&&<button onClick={()=>{setEditField(label);setEditVal(value);}} style={{background:"none",color:C.brownL,fontSize:10,cursor:"pointer",padding:"2px 6px",borderRadius:4,border:`1px solid ${C.brownL}44`}}>Edit</button>}
      </div>
    </div>
  );

  const LastRow=({label,value,col})=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px"}}>
      <span style={{color:C.muted,fontSize:12}}>{label}</span>
      <span style={{color:col||C.white,fontSize:12,fontWeight:500}}>{value}</span>
    </div>
  );

  return(
    <div style={{paddingBottom:8}}>

      {/* Avatar & name card */}
      <div style={{background:`linear-gradient(135deg,${C.brownD},${C.brown})`,borderRadius:16,padding:"22px 20px",marginBottom:20,display:"flex",gap:16,alignItems:"center"}}>
        <div style={{width:68,height:68,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"3px solid rgba(255,255,255,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0,overflow:"hidden"}}>
          👤
        </div>
        <div style={{flex:1}}>
          <div style={{color:C.white,fontSize:17,fontWeight:700,marginBottom:3}}>{USER.name}</div>
          <div style={{color:C.cream,fontSize:12,marginBottom:6}}>{USER.email}</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <div style={{background:"rgba(255,255,255,.15)",borderRadius:20,padding:"3px 10px",color:C.white,fontSize:9,fontWeight:700,letterSpacing:0.8}}>✅ KYC VERIFIED</div>
            <div style={{background:"rgba(255,255,255,.15)",borderRadius:20,padding:"3px 10px",color:C.cream,fontSize:9,fontWeight:700,letterSpacing:0.8}}>{USER.investorClass.toUpperCase()}</div>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{color:C.cream,fontSize:9,fontFamily:"monospace",marginBottom:3}}>KYC SCORE</div>
          <div style={{color:C.white,fontSize:20,fontWeight:700}}>{USER.kycScore}</div>
        </div>
      </div>

      {/* Personal Info */}
      <Section title="PERSONAL INFORMATION" col={C.brown}>
        <Row label="Full Name" value={USER.name}/>
        <Row label="Date of Birth" value={USER.dob}/>
        <Row label="Gender" value={USER.gender}/>
        <Row label="Nationality" value={USER.nationality}/>
        <LastRow label="State of Origin" value={USER.stateOfOrigin}/>
      </Section>

      {/* Contact */}
      <Section title="CONTACT DETAILS" col={C.brownL}>
        <Row label="Phone" value={USER.phone} editable/>
        <Row label="Email" value={USER.email} editable/>
        <LastRow label="Address" value={USER.address}/>
      </Section>

      {/* Address full */}
      <div style={{background:`${C.brown}12`,border:`1px solid ${C.brown}33`,borderRadius:12,padding:"14px 16px",marginBottom:20}}>
        <div style={{color:C.brownL,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>📍 RESIDENTIAL ADDRESS</div>
        <div style={{color:C.white,fontSize:13,fontWeight:600,marginBottom:4}}>{USER.address}</div>
        <div style={{color:C.muted,fontSize:11}}>Residential · Verified via utility bill</div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}>
          <button onClick={()=>setEditField("Address")} style={{background:C.brown,border:"none",borderRadius:8,padding:"6px 14px",color:C.white,fontSize:11,fontWeight:600,cursor:"pointer"}}>Update Address</button>
        </div>
      </div>

      {/* Identity & BVN */}
      <Section title="IDENTITY VERIFICATION" col="3A3A6A">
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:C.muted,fontSize:12}}>BVN</span>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:C.indigoG,fontSize:12,fontFamily:"monospace",letterSpacing:2}}>{USER.bvn}</span>
            <div style={{background:`${C.indigoG}22`,border:`1px solid ${C.indigoG}44`,borderRadius:20,padding:"1px 8px",color:C.indigoG,fontSize:9,fontWeight:700}}>✓ VERIFIED</div>
          </div>
        </div>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:C.muted,fontSize:12}}>NIN</span>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:C.indigoG,fontSize:12,fontFamily:"monospace",letterSpacing:2}}>{USER.nin}</span>
            <div style={{background:`${C.indigoG}22`,border:`1px solid ${C.indigoG}44`,borderRadius:20,padding:"1px 8px",color:C.indigoG,fontSize:9,fontWeight:700}}>✓ VERIFIED</div>
          </div>
        </div>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:C.muted,fontSize:12}}>Government ID</span>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:C.white,fontSize:12}}>National ID Card</span>
            <div style={{background:`${C.greenG}22`,border:`1px solid ${C.greenG}44`,borderRadius:20,padding:"1px 8px",color:C.greenG,fontSize:9,fontWeight:700}}>✓ VERIFIED</div>
          </div>
        </div>
        <div style={{padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:C.muted,fontSize:12}}>Facial Biometrics</span>
          <div style={{background:`${C.greenG}22`,border:`1px solid ${C.greenG}44`,borderRadius:20,padding:"1px 8px",color:C.greenG,fontSize:9,fontWeight:700}}>✓ MATCHED</div>
        </div>
      </Section>

      {/* Photograph */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:20}}>
        <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>VERIFICATION PHOTOGRAPH</div>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <div style={{width:80,height:80,borderRadius:12,background:`linear-gradient(135deg,${C.brownD},${C.brown})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0,border:`2px solid ${C.brownL}44`}}>👤</div>
          <div style={{flex:1}}>
            <div style={{color:C.white,fontSize:12,fontWeight:600,marginBottom:3}}>KYC Selfie Photo</div>
            <div style={{color:C.muted,fontSize:11,marginBottom:6}}>Captured during verification · 10 Nov 2025</div>
            <div style={{display:"flex",gap:6}}>
              <div style={{background:`${C.greenG}18`,border:`1px solid ${C.greenG}33`,borderRadius:6,padding:"3px 8px",color:C.greenG,fontSize:9,fontWeight:700}}>✓ Biometric Match</div>
              <div style={{background:`${C.indigoG}18`,border:`1px solid ${C.indigoG}33`,borderRadius:6,padding:"3px 8px",color:C.indigoG,fontSize:9,fontWeight:700}}>✓ Liveness Check</div>
            </div>
          </div>
        </div>
        <div style={{marginTop:12,padding:"8px 12px",background:`${C.border}40`,borderRadius:8,color:C.muted,fontSize:10,lineHeight:1.5}}>
          Photo is stored encrypted and only used for identity re-verification. Not shared with third parties.
        </div>
      </div>

      {/* Financial accreditation */}
      <Section title="FINANCIAL ACCREDITATION" col={C.goldL}>
        <Row label="Occupation" value={USER.occupation}/>
        <Row label="Employer" value={USER.employer}/>
        <Row label="Net Worth Bracket" value={USER.netWorth} col={C.goldL}/>
        <Row label="Annual Income" value={USER.annualIncome} col={C.goldL}/>
        <Row label="Tax ID (TIN)" value={USER.taxId} col={C.dim}/>
        <LastRow label="Linked Bank Account" value={USER.bankAccount}/>
      </Section>

      {/* KYC status */}
      <Section title="KYC STATUS" col={C.greenG}>
        <Row label="Verification Date" value={USER.kycDate} col={C.greenG}/>
        <Row label="KYC Score" value={USER.kycScore} col={C.greenG}/>
        <Row label="Investor Classification" value={USER.investorClass} col={C.brownL}/>
        <Row label="Next Re-verification" value={USER.nextKyc} col={C.goldL}/>
        <div style={{padding:"12px 14px"}}>
          <div style={{background:`${C.greenG}12`,border:`1px solid ${C.greenG}33`,borderRadius:10,padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:C.greenG,fontSize:11,fontWeight:700,marginBottom:2}}>✅ FULLY ACCREDITED</div>
              <div style={{color:C.dim,fontSize:10}}>All checks passed · PropVest verified investor</div>
            </div>
            <div style={{color:C.greenG,fontSize:22,fontWeight:700}}>94</div>
          </div>
        </div>
      </Section>

      {/* Edit modal */}
      {editField&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setEditField(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"20px 20px 0 0",padding:"24px 20px 40px",width:"100%",maxWidth:480}}>
            {saved?(
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{fontSize:40,marginBottom:12}}>✅</div>
                <div style={{color:C.greenG,fontSize:16,fontWeight:700}}>Saved Successfully</div>
              </div>
            ):(
              <>
                <div style={{color:C.white,fontSize:16,fontWeight:700,marginBottom:4}}>Update {editField}</div>
                <div style={{color:C.muted,fontSize:12,marginBottom:16}}>Changes require PropVest verification before taking effect.</div>
                <input value={editVal} onChange={e=>setEditVal(e.target.value)} style={{width:"100%",background:C.bg,border:`2px solid ${C.brown}`,borderRadius:10,padding:"13px 14px",color:C.white,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:14}}/>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setEditField(null)} style={{flex:1,background:C.border,border:"none",borderRadius:10,padding:13,color:C.dim,fontSize:13,cursor:"pointer"}}>Cancel</button>
                  <button onClick={save} style={{flex:2,background:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:10,padding:13,color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Save Changes</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

