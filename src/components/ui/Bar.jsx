import { C } from "../../constants/theme";

// A simple horizontal progress bar
export default function Bar({ pct, col = C.brown, h = 6 }) {
  return (
    <div style={{ background: C.border, borderRadius: 4, height: h, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: col, borderRadius: 4, transition: "width .6s" }} />
    </div>
  );
}
