// Renders SVG architectural illustrations for off-plan properties
export default function RenderView({ render, name }) {
  const s=render.shape;
  const col=render.col;
  const acc=render.accent;
  if(s==="detached") return(
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a3a5a"/><stop offset="100%" stopColor="#0d1f30"/></linearGradient></defs>
      <rect width="400" height="200" fill="url(#sky)"/>
      {/* Ground */}
      <rect x="0" y="160" width="400" height="40" fill="#1a1a0a"/>
      <rect x="0" y="158" width="400" height="4" fill="#2a3a1a" opacity="0.6"/>
      {/* Main body */}
      <rect x="60" y="90" width="220" height="75" fill={col}/>
      <rect x="60" y="90" width="220" height="75" fill="none" stroke={acc} strokeWidth="1" opacity="0.4"/>
      {/* Roof */}
      <polygon points="50,90 200,40 350,90" fill={acc} opacity="0.85"/>
      <polygon points="50,90 200,40 350,90" fill="none" stroke={acc} strokeWidth="1.5" opacity="0.6"/>
      {/* Windows */}
      {[[80,110,40,35],[150,110,40,35],[230,110,40,35]].map(([x,y,w,h],i)=>(<g key={i}><rect x={x} y={y} width={w} height={h} fill="#7dd3e0" opacity="0.6"/><line x1={x+w/2} y1={y} x2={x+w/2} y2={y+h} stroke="#0d1f30" strokeWidth="1"/><line x1={x} y1={y+h/2} x2={x+w} y2={y+h/2} stroke="#0d1f30" strokeWidth="1"/></g>))}
      {/* Door */}
      <rect x="155" y="122" width="32" height="43" fill="#3a2a1a"/>
      <circle cx="181" cy="144" r="2" fill={acc}/>
      {/* Garage */}
      <rect x="295" y="105" width="60" height="60" fill={col} opacity="0.8"/>
      <rect x="295" y="105" width="60" height="60" fill="none" stroke={acc} strokeWidth="1" opacity="0.4"/>
      <rect x="297" y="107" width="56" height="35" fill="#1a1a1a" opacity="0.6"/>
      {/* Trees */}
      {[[20,140],[370,140],[40,145]].map(([x,y],i)=>(<g key={i}><circle cx={x} cy={y-15} r="12" fill="#1a3a1a"/><rect x={x-2} y={y-3} width="4" height="15" fill="#2a1a0a"/></g>))}
      {/* Depth shadow */}
      <rect x="60" y="165" width="280" height="4" fill="rgba(0,0,0,.3)" rx="2"/>
    </svg>
  );
  if(s==="apartment") return(
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <defs><linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a1a2e"/><stop offset="100%" stopColor="#0d2040"/></linearGradient></defs>
      <rect width="400" height="200" fill="url(#sky2)"/>
      <rect x="0" y="170" width="400" height="30" fill="#111"/>
      {/* Main tower */}
      <rect x="110" y="20" width="180" height="155" fill={col}/>
      <rect x="110" y="20" width="180" height="155" fill="none" stroke={acc} strokeWidth="1" opacity="0.3"/>
      {/* Balconies & windows grid */}
      {[0,1,2,3,4].map(row=>([0,1,2].map(col2=>(
        <g key={row*10+col2}>
          <rect x={120+col2*56} y={30+row*28} width={40} height={20} fill={acc} opacity="0.25"/>
          <rect x={120+col2*56} y={30+row*28} width={40} height={20} fill="none" stroke={acc} strokeWidth="0.8" opacity="0.6"/>
          <rect x={118+col2*56} y={48+row*28} width={44} height={4} fill={acc} opacity="0.4"/>
        </g>
      ))))}
      {/* Lobby */}
      <rect x="155" y="145" width="90" height="30" fill="#0a2030"/>
      <rect x="175" y="145" width="50" height="25" fill={acc} opacity="0.15"/>
      {/* Side wings */}
      <rect x="60" y="70" width="55" height="100" fill={col} opacity="0.7"/>
      <rect x="285" y="70" width="55" height="100" fill={col} opacity="0.7"/>
      {/* Pool at base */}
      <rect x="90" y="175" width="220" height="8" rx="4" fill="#0088aa" opacity="0.5"/>
    </svg>
  );
  if(s==="terrace") return(
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <defs><linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2a1a0a"/><stop offset="100%" stopColor="#0d0d0d"/></linearGradient></defs>
      <rect width="400" height="200" fill="url(#sky3)"/>
      <rect x="0" y="160" width="400" height="40" fill="#111"/>
      {/* 3 terrace units */}
      {[0,1,2].map(i=>(<g key={i}>
        <rect x={30+i*115} y={85} width={100} height={78} fill={col}/>
        <rect x={30+i*115} y={85} width={100} height={78} fill="none" stroke={acc} strokeWidth="1" opacity="0.4"/>
        <polygon points={`${25+i*115},85 ${80+i*115},45 ${135+i*115},85`} fill={acc} opacity="0.8"/>
        <rect x={45+i*115} y={105} width={28} height={22} fill="#7dd3e0" opacity="0.5"/>
        <rect x={85+i*115} y={105} width={28} height={22} fill="#7dd3e0" opacity="0.5"/>
        <rect x={58+i*115} y={123} width={20} height={40} fill="#1a0a00"/>
        <line x1={130+i*115} y1={85} x2={130+i*115} y2={163} stroke={acc} strokeWidth="1" opacity="0.3"/>
      </g>))}
      {/* Road */}
      <rect x="0" y="163" width="400" height="12" fill="#1a1a1a"/>
      <line x1="0" y1="169" x2="400" y2="169" stroke="#333" strokeWidth="1" strokeDasharray="20,10"/>
    </svg>
  );
  if(s==="floorplan") return(
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <rect width="400" height="200" fill="#0a0a0a"/>
      {/* Outer walls */}
      <rect x="40" y="20" width="320" height="160" fill="none" stroke={acc} strokeWidth="3"/>
      {/* Rooms */}
      <line x1="200" y1="20" x2="200" y2="120" stroke={acc} strokeWidth="2"/>
      <line x1="40" y1="120" x2="360" y2="120" stroke={acc} strokeWidth="2"/>
      <line x1="280" y1="20" x2="280" y2="120" stroke={acc} strokeWidth="2"/>
      {/* Labels */}
      {[["Living",100,75],["Master Bed",240,65],["Bed 2",320,65],["Kitchen",130,150],["Dining",260,150]].map(([l,x,y])=>(
        <text key={l} x={x} y={y} fill={acc} fontSize="10" textAnchor="middle" fontFamily="monospace" opacity="0.7">{l}</text>
      ))}
      {/* Door arcs */}
      <path d="M 200 120 Q 220 100 240 120" fill="none" stroke={acc} strokeWidth="1" opacity="0.5"/>
      <path d="M 40 120 Q 60 100 80 120" fill="none" stroke={acc} strokeWidth="1" opacity="0.5"/>
      {/* Compass */}
      <text x="350" y="175" fill={acc} fontSize="9" fontFamily="monospace" opacity="0.6">N ↑</text>
      <rect x="40" y="20" width="320" height="160" fill="none" stroke={acc} strokeWidth="3" rx="2"/>
    </svg>
  );
  // Interior
  return(
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <defs><linearGradient id="room" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={col}/><stop offset="100%" stopColor="#0a0a0a"/></linearGradient></defs>
      <rect width="400" height="200" fill="url(#room)"/>
      {/* Floor */}
      <rect x="0" y="150" width="400" height="50" fill="#1a1510"/>
      {/* Wall accent */}
      <rect x="0" y="0" width="400" height="30" fill={acc} opacity="0.08"/>
      {/* Sofa */}
      <rect x="80" y="120" width="180" height="35" rx="8" fill={acc} opacity="0.3"/>
      <rect x="80" y="110" width="180" height="18" rx="8" fill={acc} opacity="0.25"/>
      {[80,220].map(x=>(<rect key={x} x={x} y={110} width={22} height={45} rx="6" fill={acc} opacity="0.3"/>))}
      {/* Window */}
      <rect x="280" y="40" width="80" height="80" fill="#7dd3e0" opacity="0.15"/>
      <rect x="280" y="40" width="80" height="80" fill="none" stroke={acc} strokeWidth="2" opacity="0.5"/>
      <line x1="320" y1="40" x2="320" y2="120" stroke={acc} strokeWidth="1" opacity="0.4"/>
      <line x1="280" y1="80" x2="360" y2="80" stroke={acc} strokeWidth="1" opacity="0.4"/>
      {/* Coffee table */}
      <rect x="140" y="155" width="80" height="30" rx="4" fill="#2a1a0a"/>
      {/* Ceiling light */}
      <ellipse cx="200" cy="15" rx="30" ry="8" fill={acc} opacity="0.2"/>
      <line x1="200" y1="15" x2="200" y2="5" stroke={acc} strokeWidth="2" opacity="0.4"/>
    </svg>
  );
}

