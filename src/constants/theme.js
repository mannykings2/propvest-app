// Color palette used across the entire app
export const C = {
  bg: "#0B0D11", card: "#13161C", cardH: "#181B22", border: "#1E222D",
  brown: "#A0522D", brownD: "#7A3B1E", brownL: "#C4956A",
  cream: "#EDE8E0", creamD: "#B8AFA6",
  green: "#2D6A4F", greenL: "#40916C", greenG: "#52B788",
  red: "#7B2D2D", redL: "#E07070",
  gold: "#B8860B", goldL: "#D4A017",
  white: "#FDFAF6", muted: "#6B7280", dim: "#9CA3AF",
  indigo: "#3730A3", indigoL: "#6366F1", indigoG: "#A5B4FC",
  teal: "#0F4C5C", tealL: "#0E7490", tealG: "#22D3EE",
};

// Format a number as Naira string
export const nfmt = (n) =>
  "₦" + (n >= 1000000 ? (n / 1000000).toFixed(1) + "M" : n.toLocaleString());
