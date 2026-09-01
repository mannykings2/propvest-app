import { useState } from "react";
import { C } from "../../constants/theme";
import Chip from "../../components/ui/Chip";
export default function Support(){
  const [view,setView]=useState("home"); // home | new | ticket | faq | chat
  const [tickets,setTickets]=useState([
    {id:"TKT-001",subject:"Monthly rental not credited",category:"Rental Income",status:"In Progress",date:"13 Apr 2026",msgs:[{from:"user",text:"My April rental distribution has not appeared in my wallet as of today.",time:"09:12"},{from:"agent",text:"Hi Chukwuemeka, I can see your account. The April distribution for Maitama Residency was processed this morning. It should reflect within 2 hours.",time:"10:04"}]},
    {id:"TKT-002",subject:"Cannot download co-ownership deed",category:"Documents",status:"Resolved",date:"08 Apr 2026",msgs:[{from:"user",text:"The download button for my Maitama deed is not working.",time:"14:30"},{from:"agent",text:"This has been fixed. Please try again — the document is now available.",time:"15:45"}]},
  ]);
  const [newTicket,setNewTicket]=useState({subject:"",category:"Rental Income",detail:""});
  const [chatMsg,setChatMsg]=useState("");
  const [selTicket,setSelTicket]=useState(null);
  const [chatMsgs,setChatMsgs]=useState([
    {from:"agent",text:"👋 Hi! I'm from PropVest Support. How can I help you today?",time:"Now"}
  ]);
  const [chatTyping,setChatTyping]=useState(false);

  const CATEGORIES=["Rental Income","Distribution","Investment / Slots","KYC / Verification","Documents","Withdrawal","Off-Plan","Other"];
  const stCol={Open:C.brownL,"In Progress":C.goldL,Resolved:C.greenG,Closed:C.muted};

  const submitTicket=()=>{
    if(!newTicket.subject||!newTicket.detail) return;
    const t={id:"TKT-"+(100+tickets.length+1),subject:newTicket.subject,category:newTicket.category,status:"Open",date:"14 Apr 2026",msgs:[{from:"user",text:newTicket.detail,time:"Just now"}]};
    setTickets(prev=>[t,...prev]);
    setNewTicket({subject:"",category:"Rental Income",detail:""});
    setView("home");
  };

  const sendChat=()=>{
    if(!chatMsg.trim()) return;
    const msg=chatMsg.trim();
    setChatMsgs(prev=>[...prev,{from:"user",text:msg,time:"Just now"}]);
    setChatMsg("");
    setChatTyping(true);
    setTimeout(()=>{
      setChatTyping(false);
      const replies=["Thank you for reaching out. Let me check your account.","I understand. Can you give me your investment ID or property name?","I can see your account details. Let me look into this for you.","I've flagged this to the relevant team. You'll get an update within 2 hours."];
      setChatMsgs(prev=>[...prev,{from:"agent",text:replies[Math.floor(Math.random()*replies.length)],time:"Just now"}]);
    },1800);
  };

  const FAQ=[
    {q:"When are rental distributions paid?",a:"Rental distributions are processed on the 14th of every month and credited to your PropVest wallet within 24 hours. You will receive a push notification and email confirmation."},
    {q:"How do I exit a rental investment?",a:"Rental investments have a 3-year minimum hold (5 years for commercial). After the hold period, you can trigger a co-owner sale vote or offer your slot to existing co-owners at cost + 50% of your unrealised gain."},
    {q:"What is the minimum investment?",a:"Rental properties start from ₦3.6M per slot. Resale/land plots start from ₦4M. Each property has a maximum of 10 co-owners."},
    {q:"How is my investment protected?",a:"Every investment is held under a CAC-registered SPV. A binding co-ownership deed defines your equity and rights. Funds are held in escrow and only released on verified milestones."},
    {q:"How do I withdraw my wallet balance?",a:"Go to the Withdraw tab, enter your amount, select your bank, verify your account number, and confirm. Funds arrive within 30 minutes on business days."},
    {q:"What happens if a property vote for sale fails?",a:"If the sale vote does not reach 50%+ majority, you may offer your equity to co-owners first at cost + 50% of your gain. Co-owners have 30 days to accept, after which the slot opens to new investors."},
  ];

  if(view==="faq") return(
    <div>
      <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:C.brownL,fontSize:13,cursor:"pointer",marginBottom:18}}>← Back</button>
      <div style={{color:C.white,fontSize:18,fontWeight:700,marginBottom:4}}>Frequently Asked Questions</div>
      <div style={{color:C.muted,fontSize:13,marginBottom:20}}>Quick answers to common questions</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {FAQ.map((f,i)=>(
          <details key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
            <summary style={{padding:"14px 16px",cursor:"pointer",color:C.white,fontSize:13,fontWeight:600,listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              {f.q}<span style={{color:C.brownL,fontSize:16}}>+</span>
            </summary>
            <div style={{padding:"0 16px 14px",color:C.dim,fontSize:12,lineHeight:1.7,borderTop:`1px solid ${C.border}`}}>{f.a}</div>
          </details>
        ))}
      </div>
    </div>
  );

  if(view==="chat") return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 180px)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:C.brownL,fontSize:13,cursor:"pointer"}}>←</button>
        <div style={{width:36,height:36,borderRadius:"50%",background:`${C.brown}33`,border:`1px solid ${C.brownL}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🎧</div>
        <div><div style={{color:C.white,fontWeight:700,fontSize:13}}>PropVest Support</div><div style={{color:C.greenG,fontSize:10}}>● Online · Avg response 4 mins</div></div>
      </div>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,marginBottom:12,paddingRight:4}}>
        {chatMsgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}>
            <div style={{maxWidth:"80%",background:m.from==="user"?`linear-gradient(135deg,${C.brownD},${C.brown})`:C.card,border:m.from==="user"?"none":`1px solid ${C.border}`,borderRadius:m.from==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"10px 14px"}}>
              <div style={{color:C.white,fontSize:12,lineHeight:1.5}}>{m.text}</div>
              <div style={{color:m.from==="user"?C.cream:C.muted,fontSize:9,marginTop:4,textAlign:"right"}}>{m.time}</div>
            </div>
          </div>
        ))}
        {chatTyping&&<div style={{display:"flex",gap:4,padding:"10px 14px",background:C.card,border:`1px solid ${C.border}`,borderRadius:"16px 16px 16px 4px",width:60}}>
          {[0,1,2].map(i=>(<div key={i} style={{width:6,height:6,borderRadius:"50%",background:C.muted,animation:`bounce .9s ${i*0.2}s infinite`}}/>))}
        </div>}
      </div>
      <div style={{display:"flex",gap:8}}>
        <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Type a message..." style={{flex:1,background:C.card,border:`2px solid ${chatMsg?C.brown:C.border}`,borderRadius:12,padding:"11px 14px",color:C.white,fontSize:13,outline:"none"}}/>
        <button onClick={sendChat} disabled={!chatMsg.trim()} style={{background:chatMsg.trim()?`linear-gradient(135deg,${C.brownD},${C.brown})`:C.card,border:"none",borderRadius:12,padding:"11px 16px",color:C.white,fontSize:16,cursor:chatMsg.trim()?"pointer":"not-allowed"}}>→</button>
      </div>
    </div>
  );

  if(view==="new") return(
    <div>
      <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:C.brownL,fontSize:13,cursor:"pointer",marginBottom:18}}>← Back</button>
      <div style={{color:C.white,fontSize:18,fontWeight:700,marginBottom:4}}>New Support Ticket</div>
      <div style={{color:C.muted,fontSize:13,marginBottom:20}}>Our team responds within 4 hours on business days.</div>
      <div style={{marginBottom:14}}>
        <div style={{color:C.dim,fontSize:11,marginBottom:6}}>Category</div>
        <select value={newTicket.category} onChange={e=>setNewTicket(p=>({...p,category:e.target.value}))} style={{width:"100%",background:C.card,border:`2px solid ${C.border}`,borderRadius:10,padding:"11px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",cursor:"pointer"}}>
          {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{color:C.dim,fontSize:11,marginBottom:6}}>Subject</div>
        <input value={newTicket.subject} onChange={e=>setNewTicket(p=>({...p,subject:e.target.value}))} placeholder="Brief description of your issue" style={{width:"100%",background:C.card,border:`2px solid ${newTicket.subject?C.brown:C.border}`,borderRadius:10,padding:"11px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
      </div>
      <div style={{marginBottom:20}}>
        <div style={{color:C.dim,fontSize:11,marginBottom:6}}>Details</div>
        <textarea value={newTicket.detail} onChange={e=>setNewTicket(p=>({...p,detail:e.target.value}))} rows={5} placeholder="Describe your issue in detail..." style={{width:"100%",background:C.card,border:`2px solid ${newTicket.detail?C.brown:C.border}`,borderRadius:10,padding:"11px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",resize:"vertical",fontFamily:"inherit"}}/>
      </div>
      <button onClick={submitTicket} disabled={!newTicket.subject||!newTicket.detail} style={{width:"100%",background:newTicket.subject&&newTicket.detail?`linear-gradient(135deg,${C.brownD},${C.brown})`:C.card,border:`1px solid ${newTicket.subject&&newTicket.detail?C.brown:C.border}`,borderRadius:12,padding:15,color:newTicket.subject&&newTicket.detail?C.white:C.muted,fontSize:14,fontWeight:700,cursor:newTicket.subject&&newTicket.detail?"pointer":"not-allowed"}}>Submit Ticket →</button>
    </div>
  );

  if(view==="ticket"&&selTicket) return(
    <div>
      <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:C.brownL,fontSize:13,cursor:"pointer",marginBottom:18}}>← Back</button>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
        <div><div style={{color:C.white,fontSize:16,fontWeight:700,marginBottom:3}}>{selTicket.subject}</div><div style={{color:C.muted,fontSize:11}}>{selTicket.id} · {selTicket.date} · {selTicket.category}</div></div>
        <Chip text={selTicket.status} col={stCol[selTicket.status]}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
        {selTicket.msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}>
            {m.from==="agent"&&<div style={{width:28,height:28,borderRadius:"50%",background:`${C.brown}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0,marginRight:8,alignSelf:"flex-end"}}>🎧</div>}
            <div style={{maxWidth:"80%",background:m.from==="user"?`linear-gradient(135deg,${C.brownD},${C.brown})`:C.card,border:m.from==="user"?"none":`1px solid ${C.border}`,borderRadius:m.from==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"10px 14px"}}>
              <div style={{color:m.from==="agent"?C.brownL:C.white,fontSize:9,fontFamily:"monospace",marginBottom:4}}>{m.from==="agent"?"PropVest Support":"You"} · {m.time}</div>
              <div style={{color:C.white,fontSize:12,lineHeight:1.5}}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>
      {selTicket.status!=="Closed"&&<div style={{background:`${C.green}12`,border:`1px solid ${C.greenL}33`,borderRadius:10,padding:"10px 14px",color:C.dim,fontSize:11}}>Our team is reviewing your ticket. Expected response: within 4 hours.</div>}
    </div>
  );

  return(
    <div>
      {/* Hero */}
      <div style={{background:`linear-gradient(135deg,${C.brownD},${C.brown})`,borderRadius:16,padding:"22px 20px",marginBottom:20}}>
        <div style={{fontSize:28,marginBottom:8}}>🎧</div>
        <div style={{color:C.white,fontSize:18,fontWeight:700,marginBottom:4}}>How can we help?</div>
        <div style={{color:C.cream,fontSize:12,marginBottom:16}}>Our support team is available Mon–Fri 8am–6pm WAT</div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setView("chat")} style={{flex:1,background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:10,padding:"11px",color:C.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>💬 Live Chat</button>
          <button onClick={()=>setView("new")} style={{flex:1,background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:10,padding:"11px",color:C.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>📝 New Ticket</button>
          <button onClick={()=>setView("faq")} style={{flex:1,background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:10,padding:"11px",color:C.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>❓ FAQ</button>
        </div>
      </div>

      {/* Quick links */}
      <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>COMMON TOPICS</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
        {[["💰","Rental Distributions","When and how income is paid"],["📤","Withdrawals","Transfer wallet to bank"],["📋","Documents","Access deeds and statements"],["🗳","Sale Votes","How co-owner decisions work"],["🔐","KYC & Verification","Identity and accreditation"],["📈","Exit / Resale","How to exit an investment"]].map(([icon,title,sub])=>(
          <div key={title} onClick={()=>setView("faq")} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.brown} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
            <div style={{fontSize:18,marginBottom:4}}>{icon}</div>
            <div style={{color:C.white,fontSize:11,fontWeight:600,marginBottom:2}}>{title}</div>
            <div style={{color:C.muted,fontSize:10}}>{sub}</div>
          </div>
        ))}
      </div>

      {/* My tickets */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1}}>MY TICKETS</div>
        <button onClick={()=>setView("new")} style={{background:"none",border:"none",color:C.brownL,fontSize:12,cursor:"pointer"}}>+ New</button>
      </div>
      {tickets.length===0?(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"24px",textAlign:"center"}}>
          <div style={{color:C.muted,fontSize:13}}>No tickets yet</div>
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {tickets.map(t=>(
            <div key={t.id} onClick={()=>{setSelTicket(t);setView("ticket");}} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"13px 14px",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.brown} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <div style={{color:C.white,fontSize:13,fontWeight:600}}>{t.subject}</div>
                <Chip text={t.status} col={stCol[t.status]}/>
              </div>
              <div style={{color:C.muted,fontSize:11}}>{t.id} · {t.category} · {t.date}</div>
            </div>
          ))}
        </div>
      )}

      {/* Contact info */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginTop:20}}>
        <div style={{color:C.creamD,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>OTHER WAYS TO REACH US</div>
        {[["✉️","support@staysmartpropvest.com","Email"],["📞","+234 800 PROPVEST","Phone (Business Hours)"],["💬","@PropVestNG","WhatsApp Business"]].map(([icon,val,lbl])=>(
          <div key={lbl} style={{display:"flex",gap:10,alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
            <span style={{fontSize:16,width:24,textAlign:"center"}}>{icon}</span>
            <div><div style={{color:C.white,fontSize:12,fontWeight:500}}>{val}</div><div style={{color:C.muted,fontSize:10}}>{lbl}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const USER_TABS=["Dashboard","Properties","Portfolio","OffPlan","Withdraw"];
const ADMIN_NAV=[["overview","⊞","Overview"],["kyc","👤","KYC"],["properties","🏘","Props"],["finance","₦","Finance"],["compliance","⚖","Comply"]];

