import { C } from "../../constants/theme";

// A small badge/tag component
export default function Chip({ text, col = C.brown }) {
  return (
    <span style={{
      background: col + "22", color: col,
      border: `1px solid ${col}44`, borderRadius: 4,
      padding: "2px 8px", fontSize: 10,
      fontFamily: "monospace", letterSpacing: 1, fontWeight: 700,
    }}>
      {text}
    </span>
  );
}
