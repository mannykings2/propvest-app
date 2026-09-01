import { useState } from "react";
import { C } from "../../constants/theme";
import { BANKS } from "../../constants/data";
export default function Withdraw(){
  const [step,setStep]=useState(1);const [amount,setAmount]=useState("");const [bank,setBank]=useState("");const [acctNo,setAcctNo]=useState("");const [acctName,setAcctName]=useState("");const [verifying,setVerifying]=useState(false);const [verified,setVerified]=useState(false);const [processing,setProcessing]=useState(false);
  const MAIN_WALLET=156000;       // deposited funds (add money)
  const RENTAL_BAL=198500;        // investment earnings — rental
  const EQUITY_BAL=85500;         // investment earnings — equity sales
  const EARNINGS=RENTAL_BAL+EQUITY_BAL;
  const BALANCE=MAIN_WALLET+EARNINGS; // total available to withdraw to bank
  const amt=parseFloat(amount.replace(/,/g,""))||0;const fee=amt>0?50:0;const payout=amt-fee;
  const fmt=v=>{const n=v.replace(/\D/g,"");return n?parseInt(n).toLocaleString():"";};
  const [earningsView,setEarningsView]=useState(false);
  const [transferAmt,setTransferAmt]=useState("");
  const [transferDone,setTransferDone]=useState(false);
  const [transferring,setTransferring]=useState(false);
  const tAmt=parseFloat(transferAmt.replace(/,/g,""))||0;
  const doTransfer=()=>{setTransferring(true);setTimeout(()=>{setTransferring(false);setTransferDone(true);},1800);};
  const verify=()=>{if(acctNo.length!==10||!bank)return;setVerifying(true);setTimeout(()=>{setVerifying(false);setVerified(true);setAcctName("CHUKWUEMEKA ADEOLA JOHNSON");},1800);};
  const process=()=>{setProcessing(true);setTimeout(()=>{setProcessing(false);setStep(4);},2200);};
  const reset=()=>{setStep(1);setAmount("");setBank("");setAcctNo("");setAcctName("");setVerified(false);};
  if(step===4)return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 16px",textAlign:"center"}}>
    <div style={{width:76,height:76,borderRadius:"50%",background:`${C.green}33`,border:`2px solid ${C.greenG}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:22}}>✓</div>
    <div style={{color:C.white,fontSize:24,fontWeight:700,marginBottom:6}}>Withdrawal Initiated</div>
    <div style={{color:C.greenG,fontSize:30,fontWeight:700,marginBottom:6}}>₦{amt.toLocaleString()}</div>
    <div style={{color:C.dim,fontSize:13,marginBottom:4}}>Sent to {bank}</div>
    <div style={{color:C.creamD,fontSize:13,fontWeight:600,marginBottom:3}}>{acctName}</div>
    <div style={{color:C.muted,fontSize:12,fontFamily:"monospace",letterSpacing:2,marginBottom:28}}>{acctNo}</div>
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 22px",marginBottom:20,width:"100%",maxWidth:320}}>
      <div style={{color:C.dim,fontSize:12,marginBottom:8}}>Estimated arrival</div>
      <div style={{color:C.white,fontWeight:700,fontSize:16}}>Within 30 minutes</div>
      <div style={{color:C.muted,fontSize:11,marginTop:4}}>Bank hours: Mon–Fri 8am–5pm</div>
    </div>
    <button onClick={reset} style={{background:C.brown,border:"none",borderRadius:10,padding:"13px 28px",color:C.white,fontSize:14,fontWeight:600,cursor:"pointer"}}>Make Another Withdrawal</button>
  </div>);
  return(<div>
    <div style={{marginBottom:16}}><div style={{color:C.white,fontSize:20,fontWeight:700,marginBottom:4}}>Wallet & Earnings</div><div style={{color:C.muted,fontSize:13}}>Manage your funds and transfer to bank</div></div>

    {/* ── MAIN WALLET ── */}
    <div style={{background:"linear-gradient(135deg,#1A1A2E,#2A2A3E)",border:`1px solid ${C.indigoL}33`,borderRadius:14,padding:"16px 18px",marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <div>
          <div style={{color:"#A5B4FC",fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:4}}>MAIN WALLET</div>
          <div style={{color:C.white,fontSize:26,fontWeight:700,fontFamily:"monospace"}}>₦{MAIN_WALLET.toLocaleString()}</div>
          <div style={{color:C.muted,fontSize:11,marginTop:3}}>Deposited funds · Available to invest or withdraw</div>
        </div>
        <div style={{background:`${C.indigoL}22`,border:`1px solid ${C.indigoL}44`,borderRadius:8,padding:"5px 10px",color:"#A5B4FC",fontSize:10,fontWeight:700}}>MAIN</div>
      </div>
    </div>

    {/* ── INVESTMENT EARNINGS ── */}
    <div style={{background:"linear-gradient(135deg,#1A2A1A,#1E3A1E)",border:`1px solid ${C.brownL}44`,borderRadius:14,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"16px 18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div>
            <div style={{color:C.brownL,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:4}}>INVESTMENT EARNINGS</div>
            <div style={{color:C.brownL,fontSize:26,fontWeight:700,fontFamily:"monospace"}}>₦{EARNINGS.toLocaleString()}</div>
            <div style={{color:C.muted,fontSize:11,marginTop:3}}>Rental income + sale proceeds · Cannot be used directly</div>
          </div>
          <div style={{background:`${C.brown}22`,border:`1px solid ${C.brownL}44`,borderRadius:8,padding:"5px 10px",color:C.brownL,fontSize:10,fontWeight:700}}>EARNINGS</div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <div style={{flex:1,background:"rgba(160,82,45,.12)",border:`1px solid ${C.brown}33`,borderRadius:9,padding:"9px 10px"}}>
            <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:3}}><span style={{fontSize:9}}>🏠</span><div style={{color:C.brownL,fontSize:8,fontFamily:"monospace"}}>RENTAL INCOME</div></div>
            <div style={{color:C.brownL,fontSize:14,fontWeight:700}}>₦{RENTAL_BAL.toLocaleString()}</div>
            <div style={{color:C.muted,fontSize:9,marginTop:2}}>Last: 14 Feb 2026</div>
          </div>
          <div style={{flex:1,background:"rgba(64,145,108,.12)",border:`1px solid ${C.greenL}33`,borderRadius:9,padding:"9px 10px"}}>
            <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:3}}><span style={{fontSize:9}}>📈</span><div style={{color:C.greenG,fontSize:8,fontFamily:"monospace"}}>SALE PROCEEDS</div></div>
            <div style={{color:C.greenG,fontSize:14,fontWeight:700}}>₦{EQUITY_BAL.toLocaleString()}</div>
            <div style={{color:C.muted,fontSize:9,marginTop:2}}>From slot sale</div>
          </div>
        </div>
        {/* Transfer to wallet CTA */}
        {!earningsView&&!transferDone&&(
          <button onClick={()=>setEarningsView(true)} style={{width:"100%",background:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:10,padding:"11px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>
            Transfer Earnings to Main Wallet →
          </button>
        )}
        {transferDone&&(
          <div style={{background:`${C.greenG}15`,border:`1px solid ${C.greenG}44`,borderRadius:10,padding:"10px 14px",textAlign:"center"}}>
            <div style={{color:C.greenG,fontWeight:700,fontSize:13}}>✅ ₦{tAmt.toLocaleString()} transferred to Main Wallet!</div>
            <div style={{color:C.muted,fontSize:11,marginTop:3}}>Funds are now in your main wallet and ready to use</div>
          </div>
        )}
        {earningsView&&!transferDone&&(
          <div>
            <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>AMOUNT TO TRANSFER TO MAIN WALLET</div>
            <div style={{position:"relative",marginBottom:10}}>
              <div style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:C.brownL,fontSize:18,fontWeight:700}}>₦</div>
              <input type="text" placeholder="0" value={transferAmt} onChange={e=>{const n=e.target.value.replace(/\D/g,"");setTransferAmt(n?parseInt(n).toLocaleString():"");}} style={{width:"100%",background:"#0A0A0A",border:`2px solid ${tAmt>0?C.brownL:C.border}`,borderRadius:10,padding:"12px 14px 12px 38px",color:C.white,fontSize:22,fontWeight:700,outline:"none",boxSizing:"border-box",fontFamily:"monospace"}}/>
            </div>
            <div style={{display:"flex",gap:6,marginBottom:10}}>
              {[[50000,"₦50K"],[100000,"₦100K"],[RENTAL_BAL,"All Rental"],[EARNINGS,"All Earnings"]].map(([q,l])=>(
                <button key={l} onClick={()=>setTransferAmt(q.toLocaleString())} style={{flex:1,background:tAmt===q?`${C.brown}33`:C.card,border:`1px solid ${tAmt===q?C.brownL:C.border}`,borderRadius:7,padding:"6px 2px",color:tAmt===q?C.brownL:C.dim,fontSize:9,cursor:"pointer",fontWeight:tAmt===q?700:400,textAlign:"center"}}>{l}</button>
              ))}
            </div>
            {tAmt>EARNINGS&&<div style={{color:C.redL,fontSize:11,marginBottom:8}}>⚠ Exceeds earnings balance of ₦{EARNINGS.toLocaleString()}</div>}
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{setEarningsView(false);setTransferAmt("");}} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:9,padding:11,color:C.dim,fontSize:12,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>tAmt>0&&tAmt<=EARNINGS&&doTransfer()} disabled={transferring||tAmt<=0||tAmt>EARNINGS} style={{flex:2,background:tAmt>0&&tAmt<=EARNINGS?`linear-gradient(135deg,${C.brownD},${C.brown})`:C.card,border:"none",borderRadius:9,padding:11,color:tAmt>0&&tAmt<=EARNINGS?C.white:C.muted,fontSize:13,fontWeight:700,cursor:tAmt>0&&tAmt<=EARNINGS?"pointer":"not-allowed"}}>
                {transferring?(<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><span style={{display:"inline-block",width:12,height:12,border:`2px solid ${C.brownL}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Transferring...</span>):"Transfer to Wallet →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Divider */}
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
      <div style={{flex:1,height:1,background:C.border}}/>
      <div style={{color:C.muted,fontSize:10,fontFamily:"monospace"}}>WITHDRAW MAIN WALLET TO BANK</div>
      <div style={{flex:1,height:1,background:C.border}}/>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:24}}>
      {[["1","Amount"],["2","Bank"],["3","Confirm"]].map(([n,lbl],i)=>{const active=step===i+1,done=step>i+1;return(<div key={n} style={{display:"flex",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:26,height:26,borderRadius:"50%",background:done?C.greenG:active?C.brown:C.card,border:`2px solid ${done?C.greenG:active?C.brown:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:done||active?C.white:C.muted,flexShrink:0,transition:"all .3s"}}>{done?"✓":n}</div><span style={{color:active?C.white:C.muted,fontSize:11,fontWeight:active?600:400}}>{lbl}</span></div>{i<2&&<div style={{width:24,height:1,background:done?C.greenG:C.border,margin:"0 6px",transition:"background .3s"}}/>}</div>);})}
    </div>
    {step===1&&(<div>
      <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>WITHDRAWAL AMOUNT</div>
      <div style={{position:"relative",marginBottom:14}}><div style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",color:C.brownL,fontSize:20,fontWeight:700}}>₦</div><input type="text" placeholder="0" value={amount} onChange={e=>setAmount(fmt(e.target.value))} style={{width:"100%",background:C.card,border:`2px solid ${amt>0?C.brown:C.border}`,borderRadius:12,padding:"16px 16px 16px 42px",color:C.white,fontSize:28,fontWeight:700,outline:"none",boxSizing:"border-box",fontFamily:"monospace"}}/></div>
      <div style={{color:C.muted,fontSize:11,marginBottom:8}}>Quick select:</div>
      <div style={{display:"flex",gap:8,marginBottom:18}}>{[10000,50000,100000,200000].map(q=>(<button key={q} onClick={()=>setAmount(q.toLocaleString())} style={{flex:1,background:amount===q.toLocaleString()?`${C.brown}33`:C.card,border:`1px solid ${amount===q.toLocaleString()?C.brown:C.border}`,borderRadius:8,padding:"9px 2px",color:amount===q.toLocaleString()?C.brownL:C.dim,fontSize:11,cursor:"pointer",fontFamily:"monospace"}}>₦{q/1000}K</button>))}</div>
      {amt>0&&(<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:16}}>{[["Withdrawal amount",`₦${amt.toLocaleString()}`,C.white],["Transaction fee",`-₦${fee}`,C.redL],["You'll receive",`₦${payout.toLocaleString()}`,C.greenG]].map(([l,v,c],i,arr)=>(<div key={l} style={{display:"flex",justifyContent:"space-between",paddingBottom:i<arr.length-1?8:0,marginBottom:i<arr.length-1?8:0,borderBottom:i===arr.length-2?`1px solid ${C.border}`:"none"}}><span style={{color:C.muted,fontSize:13}}>{l}</span><span style={{color:c,fontWeight:i===arr.length-1?700:500,fontSize:i===arr.length-1?15:13}}>{v}</span></div>))}</div>)}
      {amt>MAIN_WALLET&&(<div style={{background:`${C.red}22`,border:`1px solid ${C.redL}44`,borderRadius:10,padding:"10px 14px",marginBottom:14}}><div style={{color:C.redL,fontSize:12}}>⚠ Exceeds main wallet balance of ₦{MAIN_WALLET.toLocaleString()}</div></div>)}
      <button onClick={()=>amt>=1000&&amt<=MAIN_WALLET&&setStep(2)} style={{width:"100%",background:amt>=1000&&amt<=MAIN_WALLET?`linear-gradient(135deg,${C.brownD},${C.brown})`:C.card,border:`1px solid ${amt>=1000&&amt<=MAIN_WALLET?C.brown:C.border}`,borderRadius:12,padding:15,color:amt>=1000&&amt<=MAIN_WALLET?C.white:C.muted,fontSize:14,fontWeight:600,cursor:amt>=1000&&amt<=MAIN_WALLET?"pointer":"not-allowed"}}>Continue →</button>
      <div style={{color:C.muted,fontSize:11,textAlign:"center",marginTop:8}}>Min: ₦1,000 · Max: ₦{MAIN_WALLET.toLocaleString()} (main wallet)</div>
    </div>)}
    {step===2&&(<div>
      <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:14}}>BANK ACCOUNT DETAILS</div>
      <div style={{marginBottom:14}}><div style={{color:C.dim,fontSize:12,marginBottom:7}}>Select your bank</div><select value={bank} onChange={e=>{setBank(e.target.value);setVerified(false);setAcctName("");}} style={{width:"100%",background:C.card,border:`2px solid ${bank?C.brown:C.border}`,borderRadius:12,padding:"13px 14px",color:bank?C.white:C.muted,fontSize:14,outline:"none",cursor:"pointer",boxSizing:"border-box",appearance:"none"}}><option value="">-- Choose your bank --</option>{BANKS.map(b=><option key={b} value={b}>{b}</option>)}</select></div>
      <div style={{marginBottom:14}}><div style={{color:C.dim,fontSize:12,marginBottom:7}}>Account number (10 digits)</div><div style={{position:"relative"}}><input type="text" maxLength={10} placeholder="0123456789" value={acctNo} onChange={e=>{const v=e.target.value.replace(/\D/g,"");setAcctNo(v);setVerified(false);setAcctName("");}} style={{width:"100%",background:C.card,border:`2px solid ${acctNo.length===10?(verified?C.greenG:C.brown):C.border}`,borderRadius:12,padding:"13px 42px 13px 14px",color:C.white,fontSize:20,fontFamily:"monospace",letterSpacing:3,outline:"none",boxSizing:"border-box"}}/>{verified&&<div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",color:C.greenG,fontSize:16}}>✓</div>}{acctNo.length===10&&!verified&&<div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",width:8,height:8,borderRadius:"50%",background:C.goldL}}/>}</div><div style={{color:C.muted,fontSize:11,marginTop:5}}>{acctNo.length}/10</div></div>
      {acctNo.length===10&&bank&&!verified&&(<button onClick={verify} disabled={verifying} style={{width:"100%",background:verifying?C.card:C.brownD,border:`1px solid ${C.brown}`,borderRadius:10,padding:13,color:C.white,fontSize:14,cursor:verifying?"not-allowed":"pointer",marginBottom:14}}>{verifying?(<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><span style={{display:"inline-block",width:13,height:13,border:`2px solid ${C.brownL}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Verifying...</span>):"Verify Account"}</button>)}
      {verified&&(<div style={{background:`${C.green}22`,border:`1px solid ${C.greenG}44`,borderRadius:12,padding:"14px 16px",marginBottom:18}}><div style={{color:C.greenG,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:5}}>VERIFIED ✓</div><div style={{color:C.white,fontWeight:700,fontSize:15}}>{acctName}</div><div style={{color:C.dim,fontSize:12,marginTop:3}}>{bank} · {acctNo}</div></div>)}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:18}}><div style={{color:C.brownL,fontSize:11,marginBottom:4}}>🔒 NIBSS verified · CBN-licensed gateway · Zero credential storage</div></div>
      <div style={{display:"flex",gap:10}}><button onClick={()=>setStep(1)} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14,color:C.dim,fontSize:13,cursor:"pointer"}}>← Back</button><button onClick={()=>verified&&setStep(3)} style={{flex:2,background:verified?`linear-gradient(135deg,${C.brownD},${C.brown})`:C.card,border:`1px solid ${verified?C.brown:C.border}`,borderRadius:12,padding:14,color:verified?C.white:C.muted,fontSize:13,fontWeight:600,cursor:verified?"pointer":"not-allowed"}}>Review →</button></div>
    </div>)}
    {step===3&&(<div>
      <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:14}}>CONFIRM WITHDRAWAL</div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",marginBottom:18}}>{[["Amount",`₦${amt.toLocaleString()}`,C.white],["Fee",`-₦${fee}`,C.redL],["Net Payout",`₦${payout.toLocaleString()}`,C.greenG],["Bank",bank,C.dim],["Account",acctNo,C.dim],["Name",acctName,C.white],["Arrival","~30 minutes",C.goldL]].map(([l,v,c],i,arr)=>(<div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 16px",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",background:i%2===1?`${C.border}30`:"transparent"}}><span style={{color:C.muted,fontSize:13}}>{l}</span><span style={{color:c,fontSize:13,fontWeight:l==="Net Payout"?700:500}}>{v}</span></div>))}</div>
      <div style={{background:`${C.gold}18`,border:`1px solid ${C.goldL}33`,borderRadius:10,padding:"12px 14px",marginBottom:18}}><div style={{color:C.goldL,fontSize:11,lineHeight:1.5}}>⚠ Verify account details. Withdrawals cannot be reversed once processed.</div></div>
      <div style={{display:"flex",gap:10}}><button onClick={()=>setStep(2)} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14,color:C.dim,fontSize:13,cursor:"pointer"}}>← Back</button><button onClick={process} disabled={processing} style={{flex:2,background:processing?C.card:`linear-gradient(135deg,#1A4A2A,${C.greenL})`,border:`1px solid ${C.greenG}`,borderRadius:12,padding:14,color:C.white,fontSize:13,fontWeight:700,cursor:processing?"not-allowed":"pointer"}}>{processing?(<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><span style={{display:"inline-block",width:13,height:13,border:`2px solid ${C.greenG}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Processing...</span>):`Withdraw ₦${payout.toLocaleString()}`}</button></div>
    </div>)}

  </div>);
}

