import { useState } from "react";
import { C, nfmt } from "../../constants/theme";
import { INVESTMENTS, OFF_PLAN, DEV_PROPS } from "../../constants/data";
import Bar from "../../components/ui/Bar";
import Chip from "../../components/ui/Chip";
import Dashboard from "../dashboard/Dashboard";
import Properties from "../properties/Properties";
import Portfolio from "../portfolio/Portfolio";
import OffPlan from "../offplan/OffPlan";
import Withdraw from "../withdraw/Withdraw";
import Documents from "../documents/Documents";
import Profile from "../profile/Profile";

const ADMIN_KYC = [
  { id: "USR-020", name: "Adaeze Okonkwo", submitted: "Apr 12, 2026", status: "Pending", score: 82, docs: ["NIN", "Address", "Selfie", "Income", "BVN"] },
  { id: "USR-021", name: "Babatunde Fashola", submitted: "Apr 11, 2026", status: "In Review", score: 91, docs: ["NIN", "Address", "Selfie", "Income", "BVN"] },
  { id: "USR-022", name: "Chioma Eze", submitted: "Apr 10, 2026", status: "Pending", score: 74, docs: ["NIN", "Address", "Selfie"] },
  { id: "USR-023", name: "Damilola Adesanya", submitted: "Apr 09, 2026", status: "Approved", score: 88, docs: ["NIN", "Address", "Selfie", "Income", "BVN"] },
  { id: "USR-024", name: "Emeka Uchenna", submitted: "Apr 08, 2026", status: "Approved", score: 95, docs: ["NIN", "Address", "Selfie", "Income", "BVN"] },
];

const ADMIN_PROPS = [
  { name: "Maitama Residency", type: "Residential", category: "rental", propStatus: "On Rent", status: "Active", funded: 100, investors: 10, pooled: 120000000, target: 120000000, monthly: 2600000, annualRent: 31200000, saleValue: 0, soldDate: null, totalGenerated: 28080000, col: "#A0522D" },
  { name: "Victoria Island Apt", type: "Apartment", category: "rental", propStatus: "Funding", status: "Funding", funded: 100, investors: 10, pooled: 85000000, target: 85000000, monthly: 2880000, annualRent: 34560000, saleValue: 0, soldDate: null, totalGenerated: 5760000, col: "#7A3B1E" },
  { name: "Gwarinpa Courts", type: "Residential", category: "rental", propStatus: "On Rent", status: "Active", funded: 100, investors: 10, pooled: 80000000, target: 80000000, monthly: 1740000, annualRent: 20880000, saleValue: 0, soldDate: null, totalGenerated: 12960000, col: "#C4956A" },
  { name: "Wuse II Plaza", type: "Commercial", category: "lease", propStatus: "On Lease", status: "Funding", funded: 50, investors: 5, pooled: 100000000, target: 200000000, monthly: 4560000, annualRent: 54720000, saleValue: 0, soldDate: null, totalGenerated: 9120000, col: "#3A4A5A" },
  { name: "Ikeja Business Hub", type: "Commercial", category: "lease", propStatus: "Funding", status: "Funding", funded: 40, investors: 4, pooled: 51200000, target: 128000000, monthly: 3840000, annualRent: 46080000, saleValue: 0, soldDate: null, totalGenerated: 0, col: "#0E7490" },
  { name: "Lekki Land Plot", type: "Land", category: "resale", propStatus: "Up for Sale", status: "Near Full", funded: 80, investors: 8, pooled: 32000000, target: 40000000, monthly: 0, annualRent: 0, saleValue: 52000000, soldDate: null, totalGenerated: 0, col: "#40916C" },
  { name: "Abuja Airport Rd Plot", type: "Land", category: "resale", propStatus: "Up for Sale", status: "Funding", funded: 30, investors: 3, pooled: 15000000, target: 50000000, monthly: 0, annualRent: 0, saleValue: 68000000, soldDate: null, totalGenerated: 0, col: "#52B788" },
  { name: "Ibeju-Lekki Acres", type: "Land", category: "resale", propStatus: "Funding", status: "Funding", funded: 70, investors: 7, pooled: 25200000, target: 36000000, monthly: 0, annualRent: 0, saleValue: 48000000, soldDate: null, totalGenerated: 0, col: "#2D6A4F" },
  { name: "Katampe Flip Project", type: "Resale Flip", category: "sold", propStatus: "Sold", status: "Sold", funded: 100, investors: 8, pooled: 57600000, target: 72000000, monthly: 0, annualRent: 0, saleValue: 94000000, soldDate: "Feb 2026", totalGenerated: 36400000, col: "#B8860B" },
  { name: "Chevron Drive Terrace", type: "Residential", category: "sold", propStatus: "Sold", status: "Sold", funded: 100, investors: 10, pooled: 96000000, target: 96000000, monthly: 0, annualRent: 0, saleValue: 138000000, soldDate: "Nov 2025", totalGenerated: 42000000, col: "#D4A017" },
];

const PAYOUT_PROPS = [
  {
    id: 1, name: "Maitama Residency", type: "Residential", monthlyRent: 2600000, mgmtFee: 260000, wht: 234000, netDist: 2106000,
    investors: [{ name: "C. Johnson", id: "USR-001", equity: "10%", gross: 260000, net: 210600, bank: "Zenith", status: "Pending" }, { name: "A. Bello", id: "USR-002", equity: "10%", gross: 260000, net: 210600, bank: "Access", status: "Pending" }, { name: "O. Adeyemi", id: "USR-003", equity: "10%", gross: 260000, net: 210600, bank: "GTBank", status: "Paid" }, { name: "F. Hassan", id: "USR-004", equity: "10%", gross: 260000, net: 210600, bank: "UBA", status: "Pending" }, { name: "T. Nnamdi", id: "USR-005", equity: "10%", gross: 260000, net: 210600, bank: "First Bank", status: "Pending" }]
  },
  {
    id: 2, name: "Victoria Island Apt", type: "Apartment", monthlyRent: 2880000, mgmtFee: 288000, wht: 259200, netDist: 2332800,
    investors: [{ name: "O. Adesanya", id: "USR-015", equity: "10%", gross: 28800, net: 233280, bank: "Access", status: "Pending" }, { name: "P. Chukwu", id: "USR-016", equity: "10%", gross: 233280, net: 233280, bank: "Zenith", status: "Pending" }, { name: "M. Olawale", id: "USR-017", equity: "10%", gross: 233280, net: 233280, bank: "GTBank", status: "Paid" }]
  },
  {
    id: 3, name: "Gwarinpa Courts", type: "Residential", monthlyRent: 1740000, mgmtFee: 174000, wht: 156600, netDist: 1409400,
    investors: [{ name: "B. Fashola", id: "USR-021", equity: "10%", gross: 174000, net: 140940, bank: "UBA", status: "Pending" }, { name: "C. Eze", id: "USR-022", equity: "10%", gross: 174000, net: 140940, bank: "First Bank", status: "Pending" }]
  },
  {
    id: 4, name: "Wuse II Plaza", type: "Commercial", monthlyRent: 4560000, mgmtFee: 456000, wht: 410400, netDist: 3693600,
    investors: [{ name: "D. Adesanya", id: "USR-023", equity: "10%", gross: 456000, net: 369360, bank: "Zenith", status: "Pending" }, { name: "E. Uchenna", id: "USR-024", equity: "10%", gross: 456000, net: 369360, bank: "Access", status: "Paid" }]
  },
];

const ROLE_PERMISSIONS = {
  manager: ["overview", "users", "kyc", "properties", "finance", "compliance", "staff", "roles"],
  accountant: ["overview", "finance", "compliance"],
  support: ["overview", "users", "kyc"],
};

const ALL_PERMISSIONS = [
  { id: "overview", label: "Overview Dashboard", icon: "⊞", desc: "View activity feed and property pool stats" },
  { id: "users", label: "User Management", icon: "👥", desc: "View, edit and suspend investor accounts" },
  { id: "kyc", label: "KYC Approvals", icon: "👤", desc: "Review and approve/reject KYC submissions" },
  { id: "properties", label: "Property Management", icon: "🏘", desc: "Add, edit and manage property listings" },
  { id: "finance", label: "Finance & Distributions", icon: "₦", desc: "View financials and process distributions" },
  { id: "compliance", label: "Compliance & Filings", icon: "⚖", desc: "View regulatory status and filings" },
  { id: "staff", label: "Staff Portal", icon: "🎯", desc: "Access manager, accountant and support views" },
  { id: "roles", label: "Roles & Access Control", icon: "🔐", desc: "Assign roles and manage staff permissions" },
  { id: "impersonate", label: "User Impersonation", icon: "👁", desc: "View the platform as any investor" },
];

const STAFF_MEMBERS = [
  { id: "STF-001", name: "Adaeze Nwosu", email: "a.nwosu@propvest.ng", role: "manager", status: "Active", joined: "Jan 2024", phone: "+234 801 234 5678", permissions: [...ROLE_PERMISSIONS.manager] },
  { id: "STF-002", name: "Babatunde Adeyemi", email: "b.adeyemi@propvest.ng", role: "accountant", status: "Active", joined: "Mar 2024", phone: "+234 802 345 6789", permissions: [...ROLE_PERMISSIONS.accountant] },
  { id: "STF-003", name: "Chiamaka Obi", email: "c.obi@propvest.ng", role: "support", status: "Active", joined: "Jun 2024", phone: "+234 803 456 7890", permissions: [...ROLE_PERMISSIONS.support] },
  { id: "STF-004", name: "Danladi Musa", email: "d.musa@propvest.ng", role: "compliance", status: "Suspended", joined: "Sep 2024", phone: "+234 804 567 8901", permissions: ["overview", "finance", "compliance"] },
];

const ADMIN_ACTIVITY = [
  { time: "09:14", msg: "Distribution sent to 142 users — Maitama Residency ₦2.6M", col: "#52B788" },
  { time: "08:55", msg: "New property submitted: Wuse II Commercial Plaza, Abuja", col: "#D4A017" },
  { time: "08:32", msg: "KYC approved: Babatunde Fashola — Score 91/100", col: "#A0522D" },
  { time: "07:58", msg: "Sale vote triggered: Lekki Land Plot — 1 vote received", col: "#D4A017" },
  { time: "Yesterday", msg: "SEC Q1 activity report auto-generated and submitted", col: "#6366F1" },
];

const COMPLIANCE_STATUS = [
  { label: "SEC Registration", status: "Active", col: "#52B788" },
  { label: "CAC Filing", status: "Current", col: "#52B788" },
  { label: "FIRS Returns", status: "Due Apr 30", col: "#D4A017" },
  { label: "NDPC Audit", status: "Submitted", col: "#52B788" },
  { label: "WHT Returns", status: "Filed", col: "#52B788" },
  { label: "BVN API", status: "Active", col: "#52B788" },
];

export default function AdminDashboard(){
  const [aTab,setATab]=useState("overview");
  const [selKyc,setSelKyc]=useState(null);
  const [kycList,setKycList]=useState(ADMIN_KYC);
  const [kycAction,setKycAction]=useState(null);
  const [selProp,setSelProp]=useState(null);       // selected property for view/edit
  const [propMode,setPropMode]=useState("view");   // "view" | "edit"
  const [showAddListing,setShowAddListing]=useState(false);
  const [newListing,setNewListing]=useState({name:"",type:"Residential",location:"",status:"Funding",investors:0,pooled:0,funded:0,monthly:0,totalGenerated:0,saleValue:0,col:"#A0522D"});
  const [staffRole,setStaffRole]=useState("manager");
  const [userViewId,setUserViewId]=useState(null);
  const [userViewTab,setUserViewTab]=useState("Dashboard");
  const [staffMembers,setStaffMembers]=useState(STAFF_MEMBERS);
  const [addingStaff,setAddingStaff]=useState(false);
  const [newStaff,setNewStaff]=useState({name:"",email:"",role:"support",phone:"",permissions:[]});
  const [editPermStaff,setEditPermStaff]=useState(null);
  const [newStaffPerms,setNewStaffPerms]=useState(ROLE_PERMISSIONS.support);
  // Finance payout states
  const [selPayProp,setSelPayProp]=useState(null);
  const [payStatus,setPayStatus]=useState({});
  const [finProcessing,setFinProcessing]=useState(false);
  const [finProcessed,setFinProcessed]=useState(false);
  const [selectedInvs,setSelectedInvs]=useState([]);
  // Charge settings
  const [charges,setCharges]=useState({mgmtFee:10,wht:9,withdrawal:50,resaleMin:2,resaleMax:5,offplanCancel:15});
  const [editingCharges,setEditingCharges]=useState(false);
  const [chargeEdit,setChargeEdit]=useState({});
  // Finance helpers
  const toggleInv=(id)=>setSelectedInvs(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const selectAll=(invs)=>setSelectedInvs(invs.map(i=>i.id));
  const clearAll=()=>setSelectedInvs([]);
  const processPayout=()=>{setFinProcessing(true);setTimeout(()=>{setFinProcessing(false);setFinProcessed(true);},2000);};
  const finTotalGross=PAYOUT_PROPS.reduce((s,p)=>s+p.monthlyRent,0);
  const finTotalNet=PAYOUT_PROPS.reduce((s,p)=>s+p.netDist,0);
  const finTotalFees=PAYOUT_PROPS.reduce((s,p)=>s+p.mgmtFee,0);
  const finTotalWHT=PAYOUT_PROPS.reduce((s,p)=>s+p.wht,0);
  const finTotalPending=PAYOUT_PROPS.reduce((s,p)=>s+p.investors.filter(i=>i.status==="Pending").length,0);
  const finTotalInvestors=PAYOUT_PROPS.reduce((s,p)=>s+p.investors.length,0);

  const actionKyc=(id,action)=>{
    setKycList(prev=>prev.map(u=>u.id===id?{...u,status:action==="approve"?"Approved":"Rejected"}:u));
    setKycAction(action);
    setTimeout(()=>{setSelKyc(null);setKycAction(null);},1800);
  };

  const pending=kycList.filter(u=>u.status==="Pending"||u.status==="In Review").length;

  const ADMIN_TABS=[
    ["overview","⊞","Overview"],
    ["users","👥","Users"],
    ["kyc","👤","KYC"],
    ["properties","🏘","Properties"],
    ["finance","₦","Finance"],
    ["compliance","⚖","Compliance"],
    ["staff","🎯","Staff"],
    ["roles","🔐","Roles"],
  ];

  const USERS_LIST=[
    {id:"USR-001",name:"Chukwuemeka Adeola Johnson",email:"c.johnson@email.com",investments:3,wallet:284000,kyc:"Verified",joined:"Nov 2022"},
    {id:"USR-002",name:"Amina Suleiman Bello",email:"a.bello@email.com",investments:2,wallet:142500,kyc:"Verified",joined:"Jan 2023"},
    {id:"USR-003",name:"Oluwaseun Adeyemi",email:"o.adeyemi@email.com",investments:1,wallet:95000,kyc:"Verified",joined:"Mar 2023"},
    {id:"USR-004",name:"Fatima Umar Hassan",email:"f.hassan@email.com",investments:4,wallet:612000,kyc:"Verified",joined:"Feb 2023"},
    {id:"USR-005",name:"Tunde Okafor Nnamdi",email:"t.nnamdi@email.com",investments:1,wallet:38500,kyc:"Pending",joined:"Mar 2026"},
  ];

  // Simulated user screens list for impersonation
  const USER_SCREENS=["Dashboard","Properties","Portfolio","OffPlan","Withdraw","Documents","Profile"];
  const USER_SCREEN_ICONS={Dashboard:"⊞",Properties:"🏘",Portfolio:"📊",OffPlan:"🏗",Withdraw:"🏦",Documents:"📄",Profile:"👤"};

  // ── Staff role data ──
  const SUPPORT_TICKETS=[
    {id:"TKT-001",user:"Amina Bello",issue:"Monthly rental not credited",status:"Open",priority:"High",date:"13 Apr 2026"},
    {id:"TKT-002",user:"Oluwaseun Adeyemi",issue:"Cannot access investment documents",status:"In Progress",priority:"Medium",date:"12 Apr 2026"},
    {id:"TKT-003",user:"Fatima Hassan",issue:"Withdrawal delayed beyond 30 mins",status:"Resolved",priority:"High",date:"11 Apr 2026"},
    {id:"TKT-004",user:"Chukwuemeka Johnson",issue:"BVN mismatch on re-verification",status:"Open",priority:"High",date:"10 Apr 2026"},
    {id:"TKT-005",user:"Tunde Nnamdi",issue:"How to change investment slot count",status:"Closed",priority:"Low",date:"09 Apr 2026"},
  ];

  const MONTHLY_ACCOUNTS=[
    {month:"Feb 2026",rent:"₦16,800,000",fees:"₦1,680,000",dist:"₦15,120,000",wht:"₦1,512,000",net:"₦13,608,000"},
    {month:"Jan 2026",rent:"₦16,200,000",fees:"₦1,620,000",dist:"₦14,580,000",wht:"₦1,458,000",net:"₦13,122,000"},
    {month:"Dec 2025",rent:"₦15,900,000",fees:"₦1,590,000",dist:"₦14,310,000",wht:"₦1,431,000",net:"₦12,879,000"},
  ];

  const priCol={High:C.redL,Medium:C.goldL,Low:C.dim};
  const stsCol={Open:C.redL,"In Progress":C.goldL,Resolved:C.greenG,Closed:C.muted};

  // ── If in user impersonation view ──
  if(userViewId){
    const u=USERS_LIST.find(u=>u.id===userViewId);
    const ScreenComp={Dashboard,Properties,Portfolio,OffPlan,Withdraw,Documents,Profile}[userViewTab]||Dashboard;
    return(
      <div>
        {/* Impersonation banner */}
        <div style={{background:"linear-gradient(135deg,#3A1A1A,#5A2A2A)",border:`1px solid ${C.redL}55`,borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{color:C.redL,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:2}}>⚠ ADMIN IMPERSONATION MODE</div>
            <div style={{color:C.white,fontSize:12,fontWeight:600}}>{u.name}</div>
            <div style={{color:C.muted,fontSize:10}}>{u.id} · Read-only view</div>
          </div>
          <button onClick={()=>{setUserViewId(null);setATab("users");}} style={{background:C.redL,border:"none",borderRadius:8,padding:"6px 12px",color:C.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>Exit View</button>
        </div>
        {/* Mini tab bar for user screens */}
        <div style={{display:"flex",gap:4,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
          {USER_SCREENS.map(t=>(
            <button key={t} onClick={()=>setUserViewTab(t)} style={{flexShrink:0,background:userViewTab===t?`${C.brown}33`:C.card,border:`1px solid ${userViewTab===t?C.brown:C.border}`,borderRadius:8,padding:"6px 10px",color:userViewTab===t?C.brownL:C.muted,fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
              <span>{USER_SCREEN_ICONS[t]}</span>
              <span>{t==="OffPlan"?"Off-Plan":t}</span>
            </button>
          ))}
        </div>
        {/* Render the user screen */}
        <ScreenComp nav={()=>{}}/>
      </div>
    );
  }

  const onRent=ADMIN_PROPS.filter(p=>p.category==="rental"&&p.propStatus==="On Rent");
  const onLease=ADMIN_PROPS.filter(p=>p.category==="lease"&&p.propStatus==="On Lease");
  const upForSale=ADMIN_PROPS.filter(p=>p.propStatus==="Up for Sale");
  const sold=ADMIN_PROPS.filter(p=>p.category==="sold");
  const totalRentGenerated=ADMIN_PROPS.reduce((s,p)=>s+p.totalGenerated,0);
  const totalSaleGenerated=sold.reduce((s,p)=>s+p.saleValue,0);
  const totalGenerated=totalRentGenerated+totalSaleGenerated;
  const totalAUM=ADMIN_PROPS.reduce((s,p)=>s+p.pooled,0);
  const monthlyRent=ADMIN_PROPS.filter(p=>p.monthly>0).reduce((s,p)=>s+p.monthly,0);

  return(<div>
    {/* Admin header */}
    <div style={{background:"linear-gradient(135deg,#1A1A2E,#2A2A4E)",border:"1px solid #3A3A6A",borderRadius:16,padding:"18px 22px",marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <div><div style={{color:C.white,fontSize:16,fontWeight:700,marginBottom:2}}>Operations Dashboard</div><div style={{color:"#A5B4FC",fontSize:11}}>Monday, 14 Apr 2026 · 09:34 AM</div></div>
        {pending>0&&<div style={{background:`${C.red}44`,border:`1px solid ${C.redL}66`,borderRadius:20,padding:"4px 12px",color:C.redL,fontSize:11,fontWeight:700}}>{pending} KYC Pending</div>}
      </div>
      <div style={{display:"flex",gap:16}}>
        {[["AUM","₦2.4B+","#A5B4FC"],["Users","312","#52B788"],["Properties","18","#C4956A"],["Pending KYC",pending,"#E07070"]].map(([l,v,c])=>(<div key={l}><div style={{color:"#A5B4FC",fontSize:9,fontFamily:"monospace",letterSpacing:.8,marginBottom:3}}>{l}</div><div style={{color:c,fontWeight:700,fontSize:18}}>{v}</div></div>))}
      </div>
    </div>

    {/* Admin sub-tabs */}
    <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
      {ADMIN_TABS.map(([id,icon,lbl])=>(
        <button key={id} onClick={()=>setATab(id)} style={{flexShrink:0,background:aTab===id?"#1A1A3A":C.card,border:`1px solid ${aTab===id?"#6366F1":C.border}`,borderRadius:10,padding:"8px 12px",color:aTab===id?"#A5B4FC":C.muted,fontSize:11,fontWeight:aTab===id?700:400,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
          <span>{icon}</span><span>{lbl}</span>
          {id==="kyc"&&pending>0&&<span style={{background:C.redL,borderRadius:10,padding:"1px 6px",fontSize:9,color:C.white,fontWeight:700}}>{pending}</span>}
        </button>
      ))}
    </div>

    {/* OVERVIEW */}
    {aTab==="overview"&&(<div>

      {/* ── PORTFOLIO SUMMARY ── */}
      <div style={{background:"linear-gradient(135deg,#1A1A2E,#2A2A4E)",border:"1px solid #3A3A6A",borderRadius:16,padding:"18px 20px",marginBottom:18}}>
        <div style={{color:"#A5B4FC",fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>TOTAL PORTFOLIO OVERVIEW</div>
        <div style={{display:"flex",gap:10,marginBottom:12}}>
          <div style={{flex:1}}>
            <div style={{color:"#A5B4FC",fontSize:9,fontFamily:"monospace",marginBottom:3}}>TOTAL AUM</div>
            <div style={{color:C.white,fontSize:20,fontWeight:700,fontFamily:"monospace"}}>{nfmt(totalAUM)}</div>
          </div>
          <div style={{flex:1}}>
            <div style={{color:"#A5B4FC",fontSize:9,fontFamily:"monospace",marginBottom:3}}>TOTAL GENERATED</div>
            <div style={{color:C.greenG,fontSize:20,fontWeight:700,fontFamily:"monospace"}}>{nfmt(totalGenerated)}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {[["🏠",onRent.length,"On Rent",C.brownL],["🏢",onLease.length,"On Lease",C.tealG],["🏷",upForSale.length,"For Sale",C.greenG],["✅",sold.length,"Sold",C.goldL]].map(([icon,count,lbl,col])=>(
            <div key={lbl} style={{flex:1,background:`${col}15`,border:`1px solid ${col}33`,borderRadius:10,padding:"8px 6px",textAlign:"center"}}>
              <div style={{fontSize:14,marginBottom:3}}>{icon}</div>
              <div style={{color:col,fontWeight:700,fontSize:17}}>{count}</div>
              <div style={{color:C.muted,fontSize:9,fontFamily:"monospace"}}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4 CATEGORY SECTIONS ── */}

      {/* ON RENT */}
      <div style={{marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:3,height:16,background:C.brownL,borderRadius:2}}/>
          <div style={{color:C.brownL,fontSize:10,fontWeight:700,fontFamily:"monospace",letterSpacing:1}}>PROPERTIES ON RENT ({onRent.length})</div>
          <div style={{marginLeft:"auto",color:C.brownL,fontSize:10,fontWeight:700}}>{nfmt(onRent.reduce((s,p)=>s+p.monthly,0))}/mo</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {onRent.map(p=>(
            <div key={p.name} style={{background:C.card,border:`1px solid ${C.brown}33`,borderRadius:12,padding:"13px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div><div style={{color:C.white,fontWeight:700,fontSize:13}}>{p.name}</div><div style={{color:C.muted,fontSize:10}}>{p.type} · {p.investors} co-owners</div></div>
                <Chip text={p.propStatus} col={C.brownL}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
                {[["Monthly Rent",nfmt(p.monthly),C.brownL],["Annual Rent",nfmt(p.annualRent),C.brownL],["Total Generated",nfmt(p.totalGenerated),C.greenG]].map(([l,v,c])=>(
                  <div key={l} style={{background:`${C.border}40`,borderRadius:8,padding:"7px 8px"}}>
                    <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:3}}>{l}</div>
                    <div style={{color:c,fontSize:12,fontWeight:700}}>{v}</div>
                  </div>
                ))}
              </div>
              <Bar pct={p.funded} col={C.brownL} h={4}/>
            </div>
          ))}
          {onRent.length===0&&<div style={{color:C.muted,fontSize:12,padding:"10px 0"}}>No properties currently on rent.</div>}
        </div>
      </div>

      {/* ON LEASE (Commercial) */}
      <div style={{marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:3,height:16,background:C.tealG,borderRadius:2}}/>
          <div style={{color:C.tealG,fontSize:10,fontWeight:700,fontFamily:"monospace",letterSpacing:1}}>PROPERTIES ON LEASE ({onLease.length})</div>
          <div style={{marginLeft:"auto",color:C.tealG,fontSize:10,fontWeight:700}}>{nfmt(onLease.reduce((s,p)=>s+p.monthly,0))}/mo</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {onLease.map(p=>(
            <div key={p.name} style={{background:C.card,border:`1px solid ${C.tealL}33`,borderRadius:12,padding:"13px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div><div style={{color:C.white,fontWeight:700,fontSize:13}}>{p.name}</div><div style={{color:C.muted,fontSize:10}}>{p.type} · {p.investors} co-owners · 5-yr lease</div></div>
                <Chip text={p.propStatus} col={C.tealG}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
                {[["Monthly Lease",nfmt(p.monthly),C.tealG],["Annual Lease",nfmt(p.annualRent),C.tealG],["Generated So Far",nfmt(p.totalGenerated),C.greenG]].map(([l,v,c])=>(
                  <div key={l} style={{background:`${C.border}40`,borderRadius:8,padding:"7px 8px"}}>
                    <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:3}}>{l}</div>
                    <div style={{color:c,fontSize:12,fontWeight:700}}>{v}</div>
                  </div>
                ))}
              </div>
              <Bar pct={p.funded} col={C.tealL} h={4}/>
            </div>
          ))}
          {onLease.length===0&&<div style={{color:C.muted,fontSize:12,padding:"10px 0"}}>No properties currently on commercial lease.</div>}
        </div>
      </div>

      {/* UP FOR SALE */}
      <div style={{marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:3,height:16,background:C.greenG,borderRadius:2}}/>
          <div style={{color:C.greenG,fontSize:10,fontWeight:700,fontFamily:"monospace",letterSpacing:1}}>UP FOR SALE ({upForSale.length})</div>
          <div style={{marginLeft:"auto",color:C.greenG,fontSize:10,fontWeight:700}}>Est. {nfmt(upForSale.reduce((s,p)=>s+p.saleValue,0))}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {upForSale.map(p=>(
            <div key={p.name} style={{background:C.card,border:`1px solid ${C.greenG}33`,borderRadius:12,padding:"13px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div><div style={{color:C.white,fontWeight:700,fontSize:13}}>{p.name}</div><div style={{color:C.muted,fontSize:10}}>{p.type} · {p.investors} co-owners</div></div>
                <Chip text={p.propStatus} col={C.greenG}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                {[["Pooled Investment",nfmt(p.pooled),C.goldL],["Est. Sale Value",nfmt(p.saleValue),C.greenG]].map(([l,v,c])=>(
                  <div key={l} style={{background:`${C.border}40`,borderRadius:8,padding:"8px 10px"}}>
                    <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:3}}>{l}</div>
                    <div style={{color:c,fontSize:13,fontWeight:700}}>{v}</div>
                  </div>
                ))}
              </div>
              {p.saleValue>p.pooled&&<div style={{background:`${C.greenG}10`,border:`1px solid ${C.greenG}22`,borderRadius:8,padding:"6px 10px",color:C.greenG,fontSize:10,fontWeight:600}}>Est. Capital Gain: {nfmt(p.saleValue-p.pooled)} (+{(((p.saleValue-p.pooled)/p.pooled)*100).toFixed(0)}%)</div>}
            </div>
          ))}
          {upForSale.length===0&&<div style={{color:C.muted,fontSize:12,padding:"10px 0"}}>No properties currently up for sale.</div>}
        </div>
      </div>

      {/* SOLD */}
      <div style={{marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:3,height:16,background:C.goldL,borderRadius:2}}/>
          <div style={{color:C.goldL,fontSize:10,fontWeight:700,fontFamily:"monospace",letterSpacing:1}}>SOLD PROPERTIES ({sold.length})</div>
          <div style={{marginLeft:"auto",color:C.goldL,fontSize:10,fontWeight:700}}>{nfmt(sold.reduce((s,p)=>s+p.saleValue,0))} total</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {sold.map(p=>(
            <div key={p.name} style={{background:C.card,border:`1px solid ${C.goldL}33`,borderRadius:12,padding:"13px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div><div style={{color:C.white,fontWeight:700,fontSize:13}}>{p.name}</div><div style={{color:C.muted,fontSize:10}}>{p.type} · Sold {p.soldDate} · {p.investors} co-owners</div></div>
                <Chip text="SOLD" col={C.goldL}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {[["Invested",nfmt(p.pooled),C.muted],["Sale Price",nfmt(p.saleValue),C.goldL],["Net Gain",nfmt(p.saleValue-p.pooled),C.greenG]].map(([l,v,c])=>(
                  <div key={l} style={{background:`${C.border}40`,borderRadius:8,padding:"7px 8px"}}>
                    <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:3}}>{l}</div>
                    <div style={{color:c,fontSize:12,fontWeight:700}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── REVENUE SUMMARY ── */}
      <div style={{background:"linear-gradient(135deg,#1A2A1A,#1E3A1E)",border:`1px solid ${C.greenL}44`,borderRadius:14,padding:"16px 18px",marginBottom:18}}>
        <div style={{color:C.greenG,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>TOTAL REVENUE GENERATED (ALL TIME)</div>
        <div style={{display:"flex",gap:10,marginBottom:12}}>
          <div style={{flex:1}}>
            <div style={{color:C.dim,fontSize:9,fontFamily:"monospace",marginBottom:3}}>RENTAL INCOME</div>
            <div style={{color:C.brownL,fontSize:18,fontWeight:700,fontFamily:"monospace"}}>{nfmt(totalRentGenerated)}</div>
          </div>
          <div style={{flex:1}}>
            <div style={{color:C.dim,fontSize:9,fontFamily:"monospace",marginBottom:3}}>SALE PROCEEDS</div>
            <div style={{color:C.goldL,fontSize:18,fontWeight:700,fontFamily:"monospace"}}>{nfmt(totalSaleGenerated)}</div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,.06)",borderRadius:10,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:C.dim,fontSize:10,fontFamily:"monospace"}}>COMBINED TOTAL</div>
          <div style={{color:C.greenG,fontSize:20,fontWeight:700,fontFamily:"monospace"}}>{nfmt(totalGenerated)}</div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>RECENT ACTIVITY</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {ADMIN_ACTIVITY.map((a,i)=>(<div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:a.col,flexShrink:0,marginTop:4}}/>
          <div style={{flex:1}}><div style={{color:C.white,fontSize:12,lineHeight:1.5}}>{a.msg}</div></div>
          <div style={{color:C.muted,fontSize:10,fontFamily:"monospace",flexShrink:0}}>{a.time}</div>
        </div>))}
      </div>
    </div>)}

    {/* USERS — with impersonation */}
    {aTab==="users"&&(<div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1}}>REGISTERED USERS ({USERS_LIST.length})</div>
        <div style={{color:"#A5B4FC",fontSize:10}}>Click to view as user →</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {USERS_LIST.map(u=>(
          <div key={u.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,overflow:"hidden"}}>
            <div style={{padding:"14px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div>
                  <div style={{color:C.white,fontWeight:700,fontSize:14,marginBottom:2}}>{u.name}</div>
                  <div style={{color:C.muted,fontSize:11}}>{u.id} · {u.email}</div>
                </div>
                <Chip text={u.kyc} col={u.kyc==="Verified"?C.greenG:C.redL}/>
              </div>
              <div style={{display:"flex",gap:14,marginBottom:10}}>
                <div><span style={{color:C.muted,fontSize:10}}>Investments: </span><span style={{color:C.brownL,fontWeight:600,fontSize:11}}>{u.investments}</span></div>
                <div><span style={{color:C.muted,fontSize:10}}>Wallet: </span><span style={{color:C.greenG,fontWeight:600,fontSize:11}}>₦{u.wallet.toLocaleString()}</span></div>
                <div><span style={{color:C.muted,fontSize:10}}>Joined: </span><span style={{color:C.dim,fontSize:11}}>{u.joined}</span></div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{setUserViewId(u.id);setUserViewTab("Dashboard");}} style={{flex:2,background:`linear-gradient(135deg,#1A1A3A,#2A2A4E)`,border:`1px solid #6366F144`,borderRadius:8,padding:"8px",color:"#A5B4FC",fontSize:11,fontWeight:700,cursor:"pointer"}}>👁 View as User</button>
                <button style={{flex:1,background:`${C.indigo}22`,border:`1px solid ${C.indigoL}33`,borderRadius:8,padding:"8px",color:"#A5B4FC",fontSize:11,cursor:"pointer"}}>Edit</button>
                <button style={{flex:1,background:`${C.redL}15`,border:`1px solid ${C.redL}33`,borderRadius:8,padding:"8px",color:C.redL,fontSize:11,cursor:"pointer"}}>Suspend</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>)}

    {/* KYC */}
    {aTab==="kyc"&&(<div>
      {selKyc?(
        <div>
          {kycAction?(<div style={{textAlign:"center",padding:"32px 16px"}}>
            <div style={{fontSize:44,marginBottom:14}}>{kycAction==="approve"?"✅":"❌"}</div>
            <div style={{color:kycAction==="approve"?C.greenG:C.redL,fontSize:18,fontWeight:700,marginBottom:6}}>{kycAction==="approve"?"KYC Approved":"KYC Rejected"}</div>
            <div style={{color:C.dim,fontSize:13}}>User has been notified.</div>
          </div>):(<div>
            <button onClick={()=>setSelKyc(null)} style={{background:"none",border:"none",color:"#A5B4FC",fontSize:13,cursor:"pointer",marginBottom:18}}>← Back to Queue</button>
            <div style={{background:"linear-gradient(135deg,#1A1A2E,#2A2A4E)",borderRadius:14,padding:"20px",marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                <div style={{width:48,height:48,borderRadius:"50%",background:C.brown,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:18,color:C.white,flexShrink:0}}>{selKyc.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                <div><div style={{color:C.white,fontWeight:700,fontSize:16}}>{selKyc.name}</div><div style={{color:"#A5B4FC",fontSize:12}}>{selKyc.id} · Submitted {selKyc.submitted}</div></div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{color:C.dim,fontSize:10,fontFamily:"monospace",marginBottom:4}}>ACCREDITATION SCORE</div><div style={{color:C.greenG,fontWeight:700,fontSize:24}}>{selKyc.score}<span style={{color:C.muted,fontSize:14}}>/100</span></div></div>
                <Chip text={selKyc.status} col={selKyc.status==="Approved"?C.greenG:selKyc.status==="Pending"?C.redL:C.goldL}/>
              </div>
            </div>
            <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>SUBMITTED DOCUMENTS</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
              {["NIN/ID Card","Proof of Address","Selfie / Biometric","Proof of Income","BVN Consent"].map((doc,i)=>{
                const submitted=i<selKyc.docs.length;
                return(<div key={doc} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{color:C.white,fontSize:13}}>{doc}</span>
                  <Chip text={submitted?"Uploaded":"Missing"} col={submitted?C.greenG:C.redL}/>
                </div>);
              })}
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:20}}>
              {[["Verification","NIBSS BVN + NIN"],["Risk Level",selKyc.score>85?"Low":selKyc.score>70?"Medium":"High"],["Completeness",`${selKyc.docs.length}/5 docs`]].map(([l,v])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}><span style={{color:C.muted,fontSize:12}}>{l}</span><span style={{color:C.white,fontSize:12,fontWeight:500}}>{v}</span></div>))}
            </div>
            {(selKyc.status==="Pending"||selKyc.status==="In Review")&&(
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>actionKyc(selKyc.id,"reject")} style={{flex:1,background:`${C.red}33`,border:`1px solid ${C.redL}44`,borderRadius:10,padding:13,color:C.redL,fontSize:13,fontWeight:700,cursor:"pointer"}}>❌ Reject</button>
                <button onClick={()=>actionKyc(selKyc.id,"approve")} style={{flex:2,background:"linear-gradient(135deg,#1A3A1A,#2A5A2A)",border:`1px solid ${C.greenG}`,borderRadius:10,padding:13,color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>✅ Approve KYC</button>
              </div>
            )}
          </div>)}
        </div>
      ):(<div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
          <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1}}>KYC QUEUE ({kycList.length})</div>
          {pending>0&&<div style={{color:C.redL,fontSize:11,fontWeight:700}}>{pending} need review</div>}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {kycList.map(u=>(<div key={u.id} onClick={()=>setSelKyc(u)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:C.brown,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,color:C.white}}>{u.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                <div><div style={{color:C.white,fontWeight:600,fontSize:14}}>{u.name}</div><div style={{color:C.muted,fontSize:11}}>{u.id} · {u.submitted}</div></div>
              </div>
              <Chip text={u.status} col={u.status==="Approved"?C.greenG:u.status==="In Review"?C.goldL:C.redL}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:C.dim,fontSize:11}}>{u.docs.length}/5 docs · Score: <span style={{color:C.greenG,fontWeight:600}}>{u.score}/100</span></span>
              {(u.status==="Pending"||u.status==="In Review")&&<span style={{color:"#A5B4FC",fontSize:12}}>Review →</span>}
            </div>
          </div>))}
        </div>
      </div>)}
    </div>)}

    {/* PROPERTIES */}
    {aTab==="properties"&&(<div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1}}>ALL PROPERTIES ({ADMIN_PROPS.length})</div>
        <button onClick={()=>setShowAddListing(true)} style={{background:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:8,padding:"7px 14px",color:C.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>+ Add Listing</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {ADMIN_PROPS.map(p=>{
          const sc={"On Rent":C.brownL,"On Lease":C.tealG,"Up for Sale":C.greenG,"Sold":C.goldL,"Funding":C.indigoG,"Active":C.greenG,"Near Full":C.goldL}[p.propStatus]||C.muted;
          return(<div key={p.name} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,overflow:"hidden"}}>
            <div style={{height:4,background:p.col}}/>
            <div style={{padding:"14px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div><div style={{color:C.white,fontWeight:700,fontSize:14,marginBottom:2}}>{p.name}</div><div style={{color:C.muted,fontSize:11}}>{p.type} · {p.investors} investors · {nfmt(p.pooled)} pooled</div></div>
                <Chip text={p.propStatus} col={sc}/>
              </div>
              <div style={{marginBottom:8}}><Bar pct={p.funded} col={p.col}/></div>
              <div style={{display:"flex",gap:8,marginBottom:10}}>
                {p.monthly>0&&<div style={{background:`${C.brownL}15`,border:`1px solid ${C.brownL}33`,borderRadius:7,padding:"5px 10px"}}><span style={{color:C.brownL,fontSize:11,fontWeight:700}}>{nfmt(p.monthly)}/mo</span></div>}
                {p.saleValue>0&&<div style={{background:`${C.greenG}15`,border:`1px solid ${C.greenG}33`,borderRadius:7,padding:"5px 10px"}}><span style={{color:C.greenG,fontSize:11,fontWeight:700}}>{nfmt(p.saleValue)} est. sale</span></div>}
                {p.totalGenerated>0&&<div style={{background:`${C.goldL}15`,border:`1px solid ${C.goldL}33`,borderRadius:7,padding:"5px 10px"}}><span style={{color:C.goldL,fontSize:11,fontWeight:700}}>{nfmt(p.totalGenerated)} generated</span></div>}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{setSelProp(p);setPropMode("edit");}} style={{flex:1,background:`${C.indigo}33`,border:`1px solid ${C.indigoL}44`,borderRadius:8,padding:"5px 12px",color:"#A5B4FC",fontSize:11,cursor:"pointer"}}>Edit</button>
                <button onClick={()=>{setSelProp(p);setPropMode("view");}} style={{flex:1,background:`${C.teal}33`,border:`1px solid ${C.tealL}44`,borderRadius:8,padding:"5px 12px",color:C.tealG,fontSize:11,cursor:"pointer"}}>View</button>
              </div>
            </div>
          </div>);
        })}
      </div>
    </div>)}

    {/* PROPERTY DETAIL / EDIT VIEW */}
    {selProp&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setSelProp(null)}>
        <div onClick={e=>e.stopPropagation()} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"20px 20px 0 0",padding:"24px 20px 48px",width:"100%",maxWidth:480,maxHeight:"85vh",overflowY:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <div style={{color:C.white,fontSize:16,fontWeight:700}}>{propMode==="edit"?"Edit Listing":"Property Detail"}</div>
            <button onClick={()=>setSelProp(null)} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
          </div>
          <div style={{height:4,background:selProp.col,borderRadius:2,marginBottom:16}}/>
          {[["Name",selProp.name],["Type",selProp.type],["Status",selProp.propStatus],["Investors",selProp.investors],["Pooled",nfmt(selProp.pooled)],["Funded",selProp.funded+"%"],["Monthly Income",selProp.monthly>0?nfmt(selProp.monthly):"—"],["Total Generated",nfmt(selProp.totalGenerated)]].map(([l,v],i,arr)=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none"}}>
              <span style={{color:C.muted,fontSize:12}}>{l}</span>
              {propMode==="edit"&&["Name","Type","Status"].includes(l)
                ?<input defaultValue={v} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 8px",color:C.white,fontSize:12,outline:"none",width:160,textAlign:"right"}}/>
                :<span style={{color:C.white,fontSize:12,fontWeight:600}}>{v}</span>
              }
            </div>
          ))}
          {propMode==="edit"&&(
            <button onClick={()=>setSelProp(null)} style={{width:"100%",marginTop:20,background:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:12,padding:14,color:C.white,fontSize:14,fontWeight:700,cursor:"pointer"}}>Save Changes ✓</button>
          )}
        </div>
      </div>
    )}

    {/* ADD LISTING MODAL */}
    {showAddListing&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.9)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setShowAddListing(false)}>
        <div onClick={e=>e.stopPropagation()} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"20px 20px 0 0",padding:"24px 20px 52px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}}>

          {/* Header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div style={{color:C.white,fontSize:16,fontWeight:700}}>Add New Listing</div>
            <button onClick={()=>setShowAddListing(false)} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
          </div>
          <div style={{color:C.muted,fontSize:11,marginBottom:20}}>New properties are created with "Funding" status and published once slots are configured.</div>

          {/* Colour accent picker */}
          <div style={{marginBottom:18}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>ACCENT COLOUR</div>
            <div style={{display:"flex",gap:8}}>
              {["#A0522D","#40916C","#0E7490","#3730A3","#B8860B","#7B2D2D"].map(col=>(
                <button key={col} onClick={()=>setNewListing(p=>({...p,col}))} style={{width:32,height:32,borderRadius:8,background:col,border:`3px solid ${newListing.col===col?"#fff":"transparent"}`,cursor:"pointer",flexShrink:0}}/>
              ))}
            </div>
          </div>

          {/* Form fields */}
          {[
            {label:"Property Name",       field:"name",        type:"text",   ph:"e.g. Maitama Residency"},
            {label:"Location",            field:"location",    type:"text",   ph:"e.g. FCT Abuja"},
          ].map(({label,field,type,ph})=>(
            <div key={field} style={{marginBottom:14}}>
              <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:6}}>{label.toUpperCase()}</div>
              <input
                type={type} placeholder={ph} value={newListing[field]}
                onChange={e=>setNewListing(p=>({...p,[field]:e.target.value}))}
                style={{width:"100%",background:C.bg,border:`2px solid ${newListing[field]?C.brown:C.border}`,borderRadius:10,padding:"11px 14px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box"}}
              />
            </div>
          ))}

          {/* Property Type */}
          <div style={{marginBottom:14}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>PROPERTY TYPE</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["Residential","Apartment","Commercial","Land","Resale Flip"].map(t=>(
                <button key={t} onClick={()=>setNewListing(p=>({...p,type:t}))} style={{background:newListing.type===t?`${C.brown}33`:C.bg,border:`1px solid ${newListing.type===t?C.brownL:C.border}`,borderRadius:20,padding:"5px 12px",color:newListing.type===t?C.brownL:C.muted,fontSize:11,cursor:"pointer",fontWeight:newListing.type===t?700:400}}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Income Type */}
          <div style={{marginBottom:14}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>INCOME TYPE</div>
            <div style={{display:"flex",gap:8}}>
              {[["rental","🏠","Rental Income"],["resale","📈","Resale / Capital Gain"]].map(([id,icon,lbl])=>(
                <button key={id} onClick={()=>setNewListing(p=>({...p,incomeType:id}))} style={{flex:1,background:newListing.incomeType===id?`${C.brown}22`:C.bg,border:`2px solid ${newListing.incomeType===id?C.brownL:C.border}`,borderRadius:10,padding:"10px 6px",cursor:"pointer",textAlign:"center"}}>
                  <div style={{fontSize:18,marginBottom:3}}>{icon}</div>
                  <div style={{color:newListing.incomeType===id?C.brownL:C.muted,fontSize:11,fontWeight:newListing.incomeType===id?700:400}}>{lbl}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Numeric fields */}
          {[
            {label:"Total Slots",         field:"totalSlots",  ph:"e.g. 10"},
            {label:"Price Per Slot (₦)",  field:"pooled",      ph:"e.g. 12000000"},
            {label:"Annual Yield (%)",    field:"yieldPct",    ph:"e.g. 12"},
            ...(newListing.incomeType==="rental"?[{label:"Monthly Income Per Slot (₦)",field:"monthly",ph:"e.g. 18500"}]:[]),
          ].map(({label,field,ph})=>(
            <div key={field} style={{marginBottom:14}}>
              <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:6}}>{label.toUpperCase()}</div>
              <input
                type="number" placeholder={ph} value={newListing[field]||""}
                onChange={e=>setNewListing(p=>({...p,[field]:parseFloat(e.target.value)||0}))}
                style={{width:"100%",background:C.bg,border:`2px solid ${newListing[field]?C.brown:C.border}`,borderRadius:10,padding:"11px 14px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"monospace"}}
              />
            </div>
          ))}

          {/* SPV Name */}
          <div style={{marginBottom:20}}>
            <div style={{color:C.creamD,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:6}}>SPV NAME</div>
            <input
              type="text" placeholder="e.g. PropVest Maitama Ltd" value={newListing.spv||""}
              onChange={e=>setNewListing(p=>({...p,spv:e.target.value}))}
              style={{width:"100%",background:C.bg,border:`2px solid ${newListing.spv?C.brown:C.border}`,borderRadius:10,padding:"11px 14px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box"}}
            />
          </div>

          {/* Preview strip */}
          <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:20}}>
            <div style={{height:4,background:newListing.col}}/>
            <div style={{padding:"12px 14px"}}>
              <div style={{color:C.white,fontWeight:700,fontSize:14,marginBottom:2}}>{newListing.name||"Property Name"}</div>
              <div style={{color:C.muted,fontSize:11,marginBottom:8}}>{newListing.location||"Location"} · {newListing.type}</div>
              <div style={{display:"flex",gap:8}}>
                <Chip text="FUNDING" col={C.indigoG}/>
                {newListing.incomeType==="rental"&&<Chip text="RENTAL" col={C.brownL}/>}
                {newListing.incomeType==="resale"&&<Chip text="RESALE" col={C.greenG}/>}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={()=>{
              if(!newListing.name||!newListing.location){return;}
              // In a real app this would POST to an API
              setShowAddListing(false);
              setNewListing({name:"",type:"Residential",location:"",status:"Funding",investors:0,pooled:0,funded:0,monthly:0,totalGenerated:0,saleValue:0,col:"#A0522D"});
            }}
            disabled={!newListing.name||!newListing.location}
            style={{width:"100%",background:newListing.name&&newListing.location?`linear-gradient(135deg,${C.brownD},${C.brown})`:C.border,border:"none",borderRadius:12,padding:15,color:newListing.name&&newListing.location?C.white:C.muted,fontSize:14,fontWeight:700,cursor:newListing.name&&newListing.location?"pointer":"not-allowed"}}
          >
            Create Listing →
          </button>
          <div style={{color:C.muted,fontSize:10,textAlign:"center",marginTop:8}}>Listing will be saved as "Funding" · Publish after slot configuration</div>
        </div>
      </div>
    )}

    {/* FINANCE */}
    {aTab==="finance"&&finProcessed&&selPayProp&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 16px",textAlign:"center"}}>
          <div style={{fontSize:52,marginBottom:14}}>✅</div>
          <div style={{color:C.greenG,fontSize:20,fontWeight:700,marginBottom:6}}>Payouts Processed!</div>
          <div style={{color:C.dim,fontSize:13,marginBottom:4}}>{selPayProp.name}</div>
          <div style={{color:C.muted,fontSize:12,marginBottom:20}}>{selectedInvs.length} investors paid · April 2026</div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",width:"100%",maxWidth:320,marginBottom:20}}>
            {[["Total Gross Rent",nfmt(selPayProp.monthlyRent)],["Mgmt Fee Deducted",nfmt(selPayProp.mgmtFee)],["WHT Deducted",nfmt(selPayProp.wht)],["Net Distributed",nfmt(selPayProp.investors.filter(i=>selectedInvs.includes(i.id)).reduce((s,i)=>s+i.net,0))]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}><span style={{color:C.muted,fontSize:12}}>{l}</span><span style={{color:C.white,fontSize:12,fontWeight:600}}>{v}</span></div>
            ))}
          </div>
          <button onClick={()=>{setFinProcessed(false);setSelPayProp(null);setSelectedInvs([]);}} style={{background:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:12,padding:"12px 28px",color:C.white,fontSize:13,fontWeight:600,cursor:"pointer"}}>← Back to Finance</button>
        </div>
    )}

    {aTab==="finance"&&!finProcessed&&selPayProp&&(
        <div>
          <button onClick={()=>{setSelPayProp(null);setSelectedInvs([]);}} style={{background:"none",border:"none",color:C.brownL,fontSize:13,cursor:"pointer",marginBottom:16}}>← Back</button>
          {/* Property header */}
          <div style={{background:"linear-gradient(135deg,#1A2A1A,#1E3A1E)",border:`1px solid ${C.greenL}44`,borderRadius:14,padding:"16px 18px",marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div><div style={{color:C.white,fontSize:16,fontWeight:700}}>{selPayProp.name}</div><div style={{color:C.muted,fontSize:11}}>{selPayProp.type} · April 2026 Distribution</div></div>
              <div style={{background:`${C.greenG}22`,border:`1px solid ${C.greenG}44`,borderRadius:8,padding:"4px 10px",color:C.greenG,fontSize:10,fontWeight:700}}>MONTHLY</div>
            </div>
            <div style={{display:"flex",gap:10}}>
              {[["Gross Rent",nfmt(selPayProp.monthlyRent),C.goldL],["Mgmt Fee","-"+nfmt(selPayProp.mgmtFee),C.redL],["WHT (9%)","-"+nfmt(selPayProp.wht),C.redL],["Net to Pay",nfmt(selPayProp.netDist),C.greenG]].map(([l,v,c])=>(
                <div key={l} style={{flex:1,background:"rgba(255,255,255,.04)",borderRadius:8,padding:"8px 6px",textAlign:"center"}}>
                  <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:3}}>{l}</div>
                  <div style={{color:c,fontSize:11,fontWeight:700}}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Investor payout list */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1}}>SELECT INVESTORS TO PAY ({selectedInvs.length}/{selPayProp.investors.length})</div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>selectAll(selPayProp.investors.filter(i=>i.status==="Pending"))} style={{background:`${C.greenG}18`,border:`1px solid ${C.greenG}33`,borderRadius:6,padding:"4px 8px",color:C.greenG,fontSize:10,cursor:"pointer"}}>Select Pending</button>
              <button onClick={clearAll} style={{background:`${C.border}`,border:"none",borderRadius:6,padding:"4px 8px",color:C.muted,fontSize:10,cursor:"pointer"}}>Clear</button>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
            {selPayProp.investors.map(inv=>{
              const sel=selectedInvs.includes(inv.id);
              const paid=inv.status==="Paid";
              return(
                <div key={inv.id} onClick={()=>!paid&&toggleInv(inv.id)} style={{background:sel?`${C.greenG}10`:paid?`${C.border}20`:C.card,border:`1px solid ${sel?C.greenG+"55":paid?C.border:C.border}`,borderRadius:11,padding:"12px 14px",cursor:paid?"default":"pointer",opacity:paid?.6:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${sel?C.greenG:C.border}`,background:sel?C.greenG:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        {sel&&<span style={{color:C.white,fontSize:11,fontWeight:700}}>✓</span>}
                        {paid&&<span style={{color:C.muted,fontSize:11}}>✓</span>}
                      </div>
                      <div>
                        <div style={{color:C.white,fontSize:12,fontWeight:600}}>{inv.name}</div>
                        <div style={{color:C.muted,fontSize:10}}>{inv.id} · {inv.bank} · {inv.equity}</div>
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{color:sel?C.greenG:C.white,fontSize:13,fontWeight:700}}>{nfmt(inv.net)}</div>
                      <div style={{color:C.muted,fontSize:9}}>gross {nfmt(inv.gross)}</div>
                      {paid&&<div style={{color:C.greenG,fontSize:9,fontWeight:700}}>Already paid ✓</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payout summary */}
          {selectedInvs.length>0&&(
            <div style={{background:C.card,border:`1px solid ${C.greenG}33`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
              <div style={{color:C.greenG,fontSize:11,fontWeight:700,marginBottom:8}}>Payout Summary — {selectedInvs.length} investors</div>
              {[["Total Net Payout",nfmt(selPayProp.investors.filter(i=>selectedInvs.includes(i.id)).reduce((s,i)=>s+i.net,0))],["Avg Per Investor",nfmt(Math.round(selPayProp.investors.filter(i=>selectedInvs.includes(i.id)).reduce((s,i)=>s+i.net,0)/selectedInvs.length))],["Payment Method","PropVest Wallet Credit"],["ETA","Instant · Within 5 minutes"]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.border}`}}><span style={{color:C.muted,fontSize:11}}>{l}</span><span style={{color:C.white,fontSize:11,fontWeight:600}}>{v}</span></div>
              ))}
            </div>
          )}
          <button onClick={processPayout} disabled={selectedInvs.length===0||finProcessing} style={{width:"100%",background:selectedInvs.length>0&&!finProcessing?`linear-gradient(135deg,#1A4A2A,${C.greenL})`:C.card,border:`1px solid ${selectedInvs.length>0&&!finProcessing?C.greenG:C.border}`,borderRadius:12,padding:15,color:selectedInvs.length>0&&!finProcessing?C.white:C.muted,fontSize:14,fontWeight:700,cursor:selectedInvs.length>0&&!finProcessing?"pointer":"not-allowed"}}>
            {finProcessing?(<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><span style={{display:"inline-block",width:14,height:14,border:`2px solid ${C.greenG}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>Processing payouts...</span>):`Pay ${selectedInvs.length} Investor${selectedInvs.length!==1?"s":""} → ${selectedInvs.length>0?nfmt(selPayProp.investors.filter(i=>selectedInvs.includes(i.id)).reduce((s,i)=>s+i.net,0)):""}`}
          </button>
        </div>
    )}

    {aTab==="finance"&&!finProcessed&&!selPayProp&&(
        <div>
          {/* Summary header */}
          <div style={{background:"linear-gradient(135deg,#1A2A1A,#1E3A1E)",border:`1px solid ${C.greenL}44`,borderRadius:14,padding:"18px 20px",marginBottom:18}}>
            <div style={{color:C.dim,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>APRIL 2026 · PENDING DISTRIBUTIONS</div>
            <div style={{display:"flex",gap:12,marginBottom:12}}>
              <div style={{flex:1}}>
                <div style={{color:C.dim,fontSize:9,fontFamily:"monospace",marginBottom:3}}>TOTAL GROSS RENT</div>
                <div style={{color:C.goldL,fontSize:22,fontWeight:700,fontFamily:"monospace"}}>{nfmt(finTotalGross)}</div>
              </div>
              <div style={{flex:1}}>
                <div style={{color:C.dim,fontSize:9,fontFamily:"monospace",marginBottom:3}}>NET TO DISTRIBUTE</div>
                <div style={{color:C.greenG,fontSize:22,fontWeight:700,fontFamily:"monospace"}}>{nfmt(finTotalNet)}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              {[["Properties",PAYOUT_PROPS.length,C.indigoG],["Investors",finTotalInvestors,C.brownL],["Pending",finTotalPending,C.redL],["Mgmt Fees",nfmt(finTotalFees),C.dim],["WHT",nfmt(finTotalWHT),C.dim]].map(([l,v,c])=>(
                <div key={l} style={{flex:1,background:"rgba(255,255,255,.04)",borderRadius:8,padding:"6px 4px",textAlign:"center"}}>
                  <div style={{color:c,fontSize:12,fontWeight:700}}>{v}</div>
                  <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>PROPERTIES DUE FOR PAYOUT</div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
            {PAYOUT_PROPS.map(p=>{
              const pendingCount=p.investors.filter(i=>i.status==="Pending").length;
              const paidCount=p.investors.filter(i=>i.status==="Paid").length;
              return(
                <div key={p.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,overflow:"hidden"}}>
                  <div style={{height:3,background:pendingCount>0?C.goldL:C.greenG}}/>
                  <div style={{padding:"14px 16px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div>
                        <div style={{color:C.white,fontWeight:700,fontSize:14,marginBottom:2}}>{p.name}</div>
                        <div style={{color:C.muted,fontSize:11}}>{p.type} · {p.investors.length} co-owners</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{color:C.greenG,fontSize:14,fontWeight:700}}>{nfmt(p.netDist)}</div>
                        <div style={{color:C.muted,fontSize:10}}>net distribution</div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:8,marginBottom:10}}>
                      {[["Gross",nfmt(p.monthlyRent),C.goldL],["Fee","-"+nfmt(p.mgmtFee),C.redL],["WHT","-"+nfmt(p.wht),C.redL]].map(([l,v,c])=>(
                        <div key={l} style={{flex:1,background:`${C.border}40`,borderRadius:7,padding:"6px 8px"}}>
                          <div style={{color:C.muted,fontSize:8,fontFamily:"monospace",marginBottom:2}}>{l}</div>
                          <div style={{color:c,fontSize:10,fontWeight:700}}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <div style={{display:"flex",gap:10}}>
                        {pendingCount>0&&<div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:6,height:6,borderRadius:"50%",background:C.goldL}}/><span style={{color:C.goldL,fontSize:11,fontWeight:700}}>{pendingCount} pending</span></div>}
                        {paidCount>0&&<div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:6,height:6,borderRadius:"50%",background:C.greenG}}/><span style={{color:C.greenG,fontSize:11}}>{paidCount} paid</span></div>}
                      </div>
                    </div>
                    <button onClick={()=>{setSelPayProp(p);selectAll(p.investors.filter(i=>i.status==="Pending"));}} style={{width:"100%",background:pendingCount>0?`linear-gradient(135deg,#1A3A1A,#2A5A2A)`:C.border,border:`1px solid ${pendingCount>0?C.greenG:C.border}`,borderRadius:10,padding:"10px",color:pendingCount>0?C.white:C.muted,fontSize:12,fontWeight:700,cursor:pendingCount>0?"pointer":"default"}}>
                      {pendingCount>0?`Pay ${pendingCount} Investor${pendingCount!==1?"s":""} →`:"All paid ✓"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Past distributions */}
          <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>PAST DISTRIBUTIONS</div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 0.8fr 0.8fr",padding:"10px 14px",background:C.border}}>
              {["Month","Gross","Investors","Net Paid"].map(h=>(<div key={h} style={{color:C.muted,fontSize:10,fontFamily:"monospace",letterSpacing:.8}}>{h}</div>))}
            </div>
            {[["Mar 2026","₦11.78M","38","₦10.6M"],["Feb 2026","₦11.78M","35","₦10.6M"],["Jan 2026","₦11.78M","33","₦10.6M"],["Dec 2025","₦9.2M","29","₦8.28M"]].map(([month,gross,invs,net],i)=>(
              <div key={month} style={{display:"grid",gridTemplateColumns:"1fr 1fr 0.8fr 0.8fr",padding:"11px 14px",borderTop:`1px solid ${C.border}`,background:i%2===0?"transparent":`${C.border}20`}}>
                <div style={{color:C.white,fontSize:12,fontWeight:500}}>{month}</div>
                <div style={{color:C.muted,fontSize:12}}>{gross}</div>
                <div style={{color:C.dim,fontSize:12}}>{invs}</div>
                <div style={{color:C.greenG,fontSize:12,fontWeight:700}}>{net}</div>
              </div>
            ))}
          </div>

          {/* ── CHARGE SETTINGS ── */}
          <div style={{marginTop:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1}}>CHARGE SETTINGS</div>
              {!editingCharges
                ?<button onClick={()=>{setChargeEdit({...charges});setEditingCharges(true);}} style={{background:`${C.brown}22`,border:`1px solid ${C.brownL}44`,borderRadius:7,padding:"5px 12px",color:C.brownL,fontSize:11,cursor:"pointer",fontWeight:600}}>✏ Edit</button>
                :<div style={{display:"flex",gap:6}}>
                  <button onClick={()=>setEditingCharges(false)} style={{background:C.border,border:"none",borderRadius:7,padding:"5px 10px",color:C.dim,fontSize:11,cursor:"pointer"}}>Cancel</button>
                  <button onClick={()=>{setCharges({...chargeEdit});setEditingCharges(false);}} style={{background:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:7,padding:"5px 12px",color:C.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>Save ✓</button>
                </div>
              }
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,overflow:"hidden"}}>
              {[
                {key:"mgmtFee",   label:"Management Fee",          unit:"%",  desc:"Deducted from gross rent before distribution"},
                {key:"wht",       label:"Withholding Tax (WHT)",   unit:"%",  desc:"Applied to gross rent per FIRS regulation"},
                {key:"withdrawal",label:"Withdrawal Fee",          unit:"₦",  desc:"Flat fee per withdrawal transaction"},
                {key:"resaleMin", label:"Resale Commission (min)", unit:"%",  desc:"Min commission on property slot resale"},
                {key:"resaleMax", label:"Resale Commission (max)", unit:"%",  desc:"Max commission on property slot resale"},
                {key:"offplanCancel",label:"Off-Plan Cancellation Fee",unit:"%",desc:"Admin fee retained on off-plan subscription cancellation"},
              ].map(({key,label,unit,desc},i,arr)=>(
                <div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 16px",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",background:i%2===0?"transparent":`${C.border}18`}}>
                  <div style={{flex:1}}>
                    <div style={{color:C.white,fontSize:12,fontWeight:600,marginBottom:2}}>{label}</div>
                    <div style={{color:C.muted,fontSize:10}}>{desc}</div>
                  </div>
                  {editingCharges
                    ?<div style={{display:"flex",alignItems:"center",gap:4}}>
                      {unit==="₦"&&<span style={{color:C.brownL,fontSize:13,fontWeight:700}}>₦</span>}
                      <input type="number" value={chargeEdit[key]} onChange={e=>setChargeEdit(prev=>({...prev,[key]:parseFloat(e.target.value)||0}))} style={{width:64,background:"#1A1A2E",border:`2px solid ${C.indigoL}44`,borderRadius:8,padding:"6px 8px",color:C.white,fontSize:13,fontWeight:700,outline:"none",textAlign:"center",fontFamily:"monospace"}}/>
                      {unit==="%"&&<span style={{color:C.brownL,fontSize:13,fontWeight:700}}>%</span>}
                    </div>
                    :<div style={{background:`${C.brownL}18`,border:`1px solid ${C.brownL}33`,borderRadius:8,padding:"6px 14px",color:C.brownL,fontSize:14,fontWeight:700,fontFamily:"monospace",minWidth:60,textAlign:"center"}}>{unit==="₦"?"₦":""}{charges[key]}{unit==="%"?"%":""}</div>
                  }
                </div>
              ))}
            </div>
            <div style={{background:`${C.goldL}10`,border:`1px solid ${C.goldL}22`,borderRadius:10,padding:"10px 14px",marginTop:10}}>
              <div style={{color:C.goldL,fontSize:10,lineHeight:1.6}}>⚠ Changes take effect on the next distribution cycle. Existing pending payouts use the rates at the time they were generated.</div>
            </div>
          </div>

        </div>
    )}

    {/* COMPLIANCE */}
    {aTab==="compliance"&&(<div>
      <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:14}}>REGULATORY STATUS</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
        {COMPLIANCE_STATUS.map(({label,status,col})=>(<div key={label} style={{background:C.card,border:`1px solid ${col}33`,borderRadius:12,padding:"14px"}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:col,marginBottom:8}}/>
          <div style={{color:C.white,fontWeight:600,fontSize:13,marginBottom:3}}>{label}</div>
          <div style={{color:col,fontSize:11,fontWeight:700}}>{status}</div>
        </div>))}
      </div>
      <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:12}}>RECENT FILINGS</div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,overflow:"hidden",marginBottom:20}}>
        {[["SEC Q1 Activity Report","31 Mar 2026","Submitted",C.greenG],["FIRS Monthly WHT Return","28 Feb 2026","Filed",C.greenG],["CAC Annual Return (2025)","15 Jan 2026","Filed",C.greenG],["NDPC Data Audit Report","01 Dec 2025","Submitted",C.greenG],["FIRS Q1 Return","Due 30 Apr 2026","Upcoming",C.goldL]].map(([filing,date,status,col],i,arr)=>(<div key={filing} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",background:i%2===0?"transparent":`${C.border}20`}}>
          <div><div style={{color:C.white,fontSize:12,marginBottom:2}}>{filing}</div><div style={{color:C.muted,fontSize:11}}>{date}</div></div>
          <Chip text={status} col={col}/>
        </div>))}
      </div>
      <div style={{background:`${C.indigo}18`,border:`1px solid ${C.indigoL}33`,borderRadius:10,padding:"12px 14px"}}>
        <div style={{color:"#A5B4FC",fontWeight:600,fontSize:12,marginBottom:4}}>⚖ NDPA 2023 Compliance</div>
        <div style={{color:C.dim,fontSize:11,lineHeight:1.6}}>PropVest is compliant with the Nigeria Data Protection Act 2023. Annual DPO audit submitted. All user data processing activities logged and available for regulatory review.</div>
      </div>
    </div>)}

    {/* ── STAFF ROLES ── */}
    {aTab==="staff"&&(<div>
      <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:14}}>STAFF MANAGEMENT PORTAL</div>

      {/* Role selector */}
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[["manager","🏢","Manager"],["accountant","📊","Accountant"],["support","🎧","Customer Care"]].map(([id,icon,lbl])=>(
          <button key={id} onClick={()=>setStaffRole(id)} style={{flex:1,padding:"10px 6px",borderRadius:10,border:`2px solid ${staffRole===id?"#A5B4FC":C.border}`,background:staffRole===id?"#1A1A3A":C.card,color:staffRole===id?"#A5B4FC":C.muted,fontWeight:700,fontSize:11,cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:18,marginBottom:3}}>{icon}</div>
            <div>{lbl}</div>
          </button>
        ))}
      </div>

      {/* MANAGER VIEW */}
      {staffRole==="manager"&&(<div>
        <div style={{background:"linear-gradient(135deg,#1A1A2E,#2A2A4E)",border:"1px solid #6366F144",borderRadius:14,padding:"16px 18px",marginBottom:16}}>
          <div style={{color:"#A5B4FC",fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>MANAGER · OPERATIONS OVERVIEW</div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[["Active Properties","18","#C4956A"],["Total Investors","312","#52B788"],["Slots Available","34","#A5B4FC"],["Pending Actions","7","#E07070"]].map(([l,v,c])=>(
              <div key={l} style={{flex:"1 1 40%",background:"rgba(255,255,255,.04)",borderRadius:10,padding:"10px 12px"}}>
                <div style={{color:"#A5B4FC",fontSize:8,fontFamily:"monospace",marginBottom:3}}>{l}</div>
                <div style={{color:c,fontWeight:700,fontSize:20}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>PROPERTY APPROVALS</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
          {[["Abuja Northern Bypass Land","Land · ₦60M","Pending Approval"],["Lekki Phase 3 Apartments","Apartment · ₦95M","Under Review"],["Ikeja GRA Office Complex","Commercial · ₦280M","Approved"]].map(([name,detail,status])=>(
            <div key={name} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{color:C.white,fontSize:13,fontWeight:600}}>{name}</div><div style={{color:C.muted,fontSize:11}}>{detail}</div></div>
              <Chip text={status} col={status==="Approved"?C.greenG:status==="Under Review"?C.goldL:C.brownL}/>
            </div>
          ))}
        </div>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>PENDING MANAGER ACTIONS</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[["Approve Wuse II rent increase","Finance","High"],["Review Lekki Land exit request","Portfolio","Medium"],["Sign SPV formation docs — Ikeja Hub","Legal","High"],["Confirm Q2 valuation schedule","Operations","Low"]].map(([task,cat,pri])=>(
            <div key={task} style={{background:C.card,border:`1px solid ${priCol[pri]}33`,borderRadius:10,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{color:C.white,fontSize:12}}>{task}</div><div style={{color:C.muted,fontSize:10,marginTop:2}}>{cat}</div></div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <Chip text={pri} col={priCol[pri]}/>
                <button style={{background:`${C.greenG}22`,border:`1px solid ${C.greenG}33`,borderRadius:6,padding:"3px 8px",color:C.greenG,fontSize:10,cursor:"pointer"}}>Done</button>
              </div>
            </div>
          ))}
        </div>
      </div>)}

      {/* ACCOUNTANT VIEW */}
      {staffRole==="accountant"&&(<div>
        <div style={{background:"linear-gradient(135deg,#1A2A1A,#1E3A1E)",border:`1px solid ${C.greenL}44`,borderRadius:14,padding:"16px 18px",marginBottom:16}}>
          <div style={{color:C.greenG,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>ACCOUNTANT · FINANCIAL OVERVIEW</div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[["AUM","₦2.4B",C.greenG],["Undistributed","₦840K",C.goldL],["WHT Liability","₦1.5M",C.redL],["Mgmt Fees (YTD)","₦12.6M",C.greenG]].map(([l,v,c])=>(
              <div key={l} style={{flex:"1 1 40%",background:"rgba(255,255,255,.04)",borderRadius:10,padding:"10px 12px"}}>
                <div style={{color:C.dim,fontSize:8,fontFamily:"monospace",marginBottom:3}}>{l}</div>
                <div style={{color:c,fontWeight:700,fontSize:18}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>MONTHLY ACCOUNTS</div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,overflow:"hidden",marginBottom:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",padding:"8px 12px",background:C.border}}>
            {["Month","Rent","Fees","Dist.","Net"].map(h=>(<div key={h} style={{color:C.muted,fontSize:9,fontFamily:"monospace"}}>{h}</div>))}
          </div>
          {MONTHLY_ACCOUNTS.map((r,i)=>(<div key={r.month} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",padding:"10px 12px",borderTop:`1px solid ${C.border}`,background:i%2===0?"transparent":`${C.border}20`}}>
            <div style={{color:C.white,fontSize:10,fontWeight:600}}>{r.month}</div>
            <div style={{color:C.muted,fontSize:10}}>{r.rent}</div>
            <div style={{color:C.redL,fontSize:10}}>{r.fees}</div>
            <div style={{color:C.greenG,fontSize:10}}>{r.dist}</div>
            <div style={{color:C.greenG,fontSize:10,fontWeight:700}}>{r.net}</div>
          </div>))}
        </div>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>UPCOMING OBLIGATIONS</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[["FIRS WHT Return — March 2026","Due 30 Apr 2026","Upcoming",C.goldL],["SPV Annual Audit — Maitama","Due 15 May 2026","Scheduled",C.indigoG],["Q2 Investor Distributions","Due 30 Jun 2026","Pending",C.brownL],["CAC Annual Returns","Due 30 Jun 2026","Pending",C.brownL]].map(([task,due,status,col])=>(
            <div key={task} style={{background:C.card,border:`1px solid ${col}33`,borderRadius:10,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{color:C.white,fontSize:12}}>{task}</div><div style={{color:C.muted,fontSize:10,marginTop:2}}>{due}</div></div>
              <Chip text={status} col={col}/>
            </div>
          ))}
        </div>
      </div>)}

      {/* CUSTOMER CARE VIEW */}
      {staffRole==="support"&&(<div>
        <div style={{background:"linear-gradient(135deg,#0F2A2E,#1A3A4E)",border:`1px solid ${C.tealL}44`,borderRadius:14,padding:"16px 18px",marginBottom:16}}>
          <div style={{color:C.tealG,fontSize:9,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>CUSTOMER CARE · SUPPORT OVERVIEW</div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[["Open Tickets","2",C.redL],["In Progress","1",C.goldL],["Resolved Today","3",C.greenG],["Avg Response","4.2 hrs",C.tealG]].map(([l,v,c])=>(
              <div key={l} style={{flex:"1 1 40%",background:"rgba(255,255,255,.04)",borderRadius:10,padding:"10px 12px"}}>
                <div style={{color:C.dim,fontSize:8,fontFamily:"monospace",marginBottom:3}}>{l}</div>
                <div style={{color:c,fontWeight:700,fontSize:18}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>SUPPORT TICKETS</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {SUPPORT_TICKETS.map(t=>(
            <div key={t.id} style={{background:C.card,border:`1px solid ${stsCol[t.status]}33`,borderRadius:12,padding:"13px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                    <div style={{color:C.white,fontSize:12,fontWeight:600}}>{t.issue}</div>
                  </div>
                  <div style={{color:C.muted,fontSize:10}}>{t.id} · {t.user} · {t.date}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                  <Chip text={t.status} col={stsCol[t.status]}/>
                  <Chip text={t.priority} col={priCol[t.priority]}/>
                </div>
              </div>
              {(t.status==="Open"||t.status==="In Progress")&&(
                <div style={{display:"flex",gap:6,marginTop:8}}>
                  <button onClick={()=>{setUserViewId(USERS_LIST.find(u=>u.name.includes(t.user.split(" ")[0]))?.id||USERS_LIST[0].id);setUserViewTab("Portfolio");}} style={{flex:1,background:"#1A1A3A",border:`1px solid #6366F144`,borderRadius:7,padding:"6px",color:"#A5B4FC",fontSize:10,cursor:"pointer"}}>👁 View Account</button>
                  <button style={{flex:1,background:`${C.greenG}18`,border:`1px solid ${C.greenG}33`,borderRadius:7,padding:"6px",color:C.greenG,fontSize:10,cursor:"pointer"}}>✓ Resolve</button>
                  <button style={{flex:1,background:`${C.goldL}18`,border:`1px solid ${C.goldL}33`,borderRadius:7,padding:"6px",color:C.goldL,fontSize:10,cursor:"pointer"}}>↑ Escalate</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>)}
    </div>)}

    {/* ── ROLES TAB ── */}
    {aTab==="roles"&&(<div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{color:C.creamD,fontSize:11,fontFamily:"monospace",letterSpacing:1}}>TEAM & ROLE MANAGEMENT</div>
        <button onClick={()=>{setNewStaffPerms([...ROLE_PERMISSIONS.support]);setAddingStaff(true);}} style={{background:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:8,padding:"7px 14px",color:C.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>+ Add Staff</button>
      </div>

      {/* Role count badges */}
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {[["manager","🏢","Manager","#6366F1"],["accountant","📊","Accountant","#52B788"],["support","🎧","Customer Care","#0E7490"]].map(([id,icon,lbl,col])=>(
          <div key={id} style={{background:`${col}18`,border:`1px solid ${col}44`,borderRadius:8,padding:"6px 12px",display:"flex",alignItems:"center",gap:5}}>
            <span style={{fontSize:12}}>{icon}</span>
            <span style={{color:col,fontSize:10,fontWeight:700}}>{lbl}</span>
            <span style={{background:`${col}33`,borderRadius:10,padding:"1px 6px",color:col,fontSize:9,fontWeight:700}}>{staffMembers.filter(s=>s.role===id).length}</span>
          </div>
        ))}
      </div>

      {/* Staff cards */}
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
        {staffMembers.map(s=>{
          const rd={manager:["🏢","#6366F1","Manager"],accountant:["📊","#52B788","Accountant"],support:["🎧","#0E7490","Customer Care"]}[s.role]||["👤","#9CA3AF","Staff"];
          const perms=s.permissions||[];
          return(
            <div key={s.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
              <div style={{height:3,background:rd[1]}}/>
              <div style={{padding:"14px 14px 12px"}}>
                {/* Header row */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:`${rd[1]}22`,border:`2px solid ${rd[1]}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{rd[0]}</div>
                    <div>
                      <div style={{color:C.white,fontWeight:700,fontSize:13,marginBottom:2}}>{s.name}</div>
                      <div style={{color:C.muted,fontSize:10}}>{s.id} · {s.email}</div>
                      <div style={{color:C.dim,fontSize:9,marginTop:1}}>Joined {s.joined} · {s.phone}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                    <div style={{background:`${rd[1]}22`,border:`1px solid ${rd[1]}44`,borderRadius:20,padding:"2px 8px",color:rd[1],fontSize:9,fontWeight:700}}>{rd[2]}</div>
                    <div style={{background:s.status==="Active"?`${C.greenG}18`:`${C.goldL}18`,border:`1px solid ${s.status==="Active"?C.greenG:C.goldL}44`,borderRadius:20,padding:"2px 8px",color:s.status==="Active"?C.greenG:C.goldL,fontSize:9,fontWeight:700}}>{s.status}</div>
                  </div>
                </div>

                {/* Permissions preview chips */}
                <div style={{marginBottom:10}}>
                  <div style={{color:C.muted,fontSize:9,fontFamily:"monospace",letterSpacing:0.8,marginBottom:6}}>ACCESS PERMISSIONS ({perms.length}/{ALL_PERMISSIONS.length})</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {ALL_PERMISSIONS.map(p=>{
                      const has=perms.includes(p.id);
                      return(
                        <div key={p.id} style={{background:has?`${rd[1]}18`:`${C.border}50`,border:`1px solid ${has?rd[1]+"44":C.border}`,borderRadius:6,padding:"2px 7px",display:"flex",alignItems:"center",gap:4}}>
                          <span style={{fontSize:9}}>{p.icon}</span>
                          <span style={{color:has?rd[1]:C.muted,fontSize:9,fontWeight:has?700:400}}>{p.label}</span>
                          {has&&<span style={{color:rd[1],fontSize:8}}>✓</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action row */}
                <div style={{display:"flex",gap:8}}>
                  <select value={s.role} onChange={e=>{const newRole=e.target.value;setStaffMembers(prev=>prev.map(m=>m.id===s.id?{...m,role:newRole,permissions:[...ROLE_PERMISSIONS[newRole]]}:m));}} style={{flex:2,background:"#1A1A2E",border:`1px solid #6366F144`,borderRadius:8,padding:"7px 10px",color:"#A5B4FC",fontSize:11,outline:"none",cursor:"pointer"}}>
                    <option value="manager">🏢 Manager</option>
                    <option value="accountant">📊 Accountant</option>
                    <option value="support">🎧 Customer Care</option>
                  </select>
                  <button onClick={()=>setEditPermStaff({...s})} style={{flex:1,background:"#1A1A3A",border:`1px solid #6366F144`,borderRadius:8,padding:"7px",color:"#A5B4FC",fontSize:10,cursor:"pointer",fontWeight:600}}>🔐 Perms</button>
                  <button onClick={()=>setStaffMembers(prev=>prev.map(m=>m.id===s.id?{...m,status:m.status==="Active"?"Suspended":"Active"}:m))} style={{flex:1,background:s.status==="Active"?`${C.redL}18`:`${C.greenG}18`,border:`1px solid ${s.status==="Active"?C.redL:C.greenG}33`,borderRadius:8,padding:"7px",color:s.status==="Active"?C.redL:C.greenG,fontSize:10,cursor:"pointer",fontWeight:600}}>{s.status==="Active"?"Suspend":"Restore"}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Permissions Modal */}
      {editPermStaff&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setEditPermStaff(null)}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"20px 20px 0 0",padding:"24px 20px 44px",width:"100%",maxWidth:480,maxHeight:"85vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
              <div style={{color:C.white,fontSize:16,fontWeight:700}}>Edit Permissions</div>
              <button onClick={()=>setEditPermStaff(null)} style={{background:"none",border:"none",color:C.muted,fontSize:20,cursor:"pointer",lineHeight:1}}>×</button>
            </div>
            <div style={{color:C.muted,fontSize:12,marginBottom:4}}>{editPermStaff.name}</div>
            <div style={{color:C.dim,fontSize:11,marginBottom:16}}>Toggle what this staff member can access in the admin portal.</div>

            {/* Quick presets */}
            <div style={{color:C.dim,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:8}}>QUICK PRESETS</div>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              {[["manager","🏢 Manager","#6366F1"],["accountant","📊 Accountant","#52B788"],["support","🎧 Support","#0E7490"]].map(([role,lbl,col])=>(
                <button key={role} onClick={()=>setEditPermStaff(prev=>({...prev,permissions:[...ROLE_PERMISSIONS[role]]}))} style={{flex:1,background:`${col}18`,border:`1px solid ${col}44`,borderRadius:8,padding:"7px 4px",color:col,fontSize:10,fontWeight:700,cursor:"pointer"}}>{lbl}</button>
              ))}
            </div>

            {/* Permission toggles */}
            <div style={{color:C.dim,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>INDIVIDUAL PERMISSIONS ({editPermStaff.permissions.length}/{ALL_PERMISSIONS.length})</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
              {ALL_PERMISSIONS.map(p=>{
                const has=editPermStaff.permissions.includes(p.id);
                const toggle=()=>setEditPermStaff(prev=>({...prev,permissions:has?prev.permissions.filter(x=>x!==p.id):[...prev.permissions,p.id]}));
                return(
                  <div key={p.id} onClick={toggle} style={{background:has?`${C.indigoL}12`:`${C.border}30`,border:`1px solid ${has?C.indigoL+"44":C.border}`,borderRadius:10,padding:"11px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .15s"}}>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <span style={{fontSize:16,width:24,textAlign:"center"}}>{p.icon}</span>
                      <div>
                        <div style={{color:has?C.white:C.dim,fontSize:12,fontWeight:has?600:400,marginBottom:2}}>{p.label}</div>
                        <div style={{color:C.muted,fontSize:10,lineHeight:1.4}}>{p.desc}</div>
                      </div>
                    </div>
                    <div style={{width:36,height:20,borderRadius:10,background:has?C.indigoL:C.border,position:"relative",flexShrink:0,transition:"background .2s"}}>
                      <div style={{position:"absolute",top:3,left:has?18:3,width:14,height:14,borderRadius:"50%",background:C.white,transition:"left .2s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setEditPermStaff(null)} style={{flex:1,background:C.border,border:"none",borderRadius:10,padding:13,color:C.dim,fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>{setStaffMembers(prev=>prev.map(m=>m.id===editPermStaff.id?{...m,permissions:editPermStaff.permissions}:m));setEditPermStaff(null);}} style={{flex:2,background:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:10,padding:13,color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Save Permissions ✓</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {addingStaff&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setAddingStaff(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"20px 20px 0 0",padding:"24px 20px 44px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{color:C.white,fontSize:16,fontWeight:700,marginBottom:4}}>Add Staff Member</div>
            <div style={{color:C.muted,fontSize:12,marginBottom:18}}>They will receive an email invite to set up their access.</div>
            {[["Full Name","name","text","e.g. Aminu Bello"],["Email Address","email","email","staff@propvest.ng"],["Phone","phone","tel","+234 800 000 0000"]].map(([lbl,field,type,ph])=>(
              <div key={field} style={{marginBottom:12}}>
                <div style={{color:C.dim,fontSize:11,marginBottom:5}}>{lbl}</div>
                <input type={type} placeholder={ph} value={newStaff[field]} onChange={e=>setNewStaff(prev=>({...prev,[field]:e.target.value}))} style={{width:"100%",background:C.bg,border:`2px solid ${C.border}`,borderRadius:10,padding:"11px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
              </div>
            ))}
            <div style={{marginBottom:14}}>
              <div style={{color:C.dim,fontSize:11,marginBottom:5}}>Role</div>
              <select value={newStaff.role} onChange={e=>{const r=e.target.value;setNewStaff(prev=>({...prev,role:r}));setNewStaffPerms([...ROLE_PERMISSIONS[r]]);}} style={{width:"100%",background:C.bg,border:`2px solid ${C.border}`,borderRadius:10,padding:"11px 12px",color:C.white,fontSize:13,outline:"none",boxSizing:"border-box",cursor:"pointer"}}>
                <option value="manager">🏢 Manager</option>
                <option value="accountant">📊 Accountant</option>
                <option value="support">🎧 Customer Care</option>
              </select>
            </div>
            <div style={{color:C.dim,fontSize:10,fontFamily:"monospace",letterSpacing:1,marginBottom:10}}>ACCESS PERMISSIONS</div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:20}}>
              {ALL_PERMISSIONS.map(p=>{
                const has=newStaffPerms.includes(p.id);
                const toggle=()=>setNewStaffPerms(prev=>has?prev.filter(x=>x!==p.id):[...prev,p.id]);
                return(
                  <div key={p.id} onClick={toggle} style={{background:has?`${C.indigoL}12`:`${C.border}30`,border:`1px solid ${has?C.indigoL+"44":C.border}`,borderRadius:8,padding:"9px 12px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:13}}>{p.icon}</span>
                      <div style={{color:has?C.white:C.dim,fontSize:11,fontWeight:has?600:400}}>{p.label}</div>
                    </div>
                    <div style={{width:32,height:18,borderRadius:9,background:has?C.indigoL:C.border,position:"relative",flexShrink:0}}>
                      <div style={{position:"absolute",top:2,left:has?15:2,width:14,height:14,borderRadius:"50%",background:C.white,transition:"left .2s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setAddingStaff(false)} style={{flex:1,background:C.border,border:"none",borderRadius:10,padding:13,color:C.dim,fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>{if(newStaff.name&&newStaff.email){setStaffMembers(prev=>[...prev,{id:"STF-"+(100+prev.length+1),name:newStaff.name,email:newStaff.email,role:newStaff.role,status:"Active",joined:"Apr 2026",phone:newStaff.phone,permissions:[...newStaffPerms]}]);setNewStaff({name:"",email:"",role:"support",phone:""});setNewStaffPerms([...ROLE_PERMISSIONS.support]);setAddingStaff(false);}}} style={{flex:2,background:`linear-gradient(135deg,${C.brownD},${C.brown})`,border:"none",borderRadius:10,padding:13,color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Send Invite →</button>
            </div>
          </div>
        </div>
      )}
    </div>)}
  </div>);
}


// ── APP SHELL ─────────────────────────────────────────────
